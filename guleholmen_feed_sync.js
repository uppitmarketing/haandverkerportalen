// guleholmen_feed_sync.js – henter Guleholmens Google Shopping-feed og lagrer et
// lite utvalg rabatterte arbeidsklær i annonse_produkter, som annonsen på
// bedriftsprofilene viser. Kjøres daglig fra .github/workflows/guleholmen-feed.yml
// (feeden oppdateres hver 24. time hos Guleholmen).
//
// Feeden har én rad per størrelse/farge (~1800 rader for ~250 produkter), så radene
// grupperes på item_group_id. Bare produkter som er relevante for håndverkere,
// er på lager, er WRKS-merket og har en reell rabatt kommer med.
//
// DRY_RUN=1 skriver ut utvalget uten å endre noe.
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fetch from 'node-fetch';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, { realtime: { transport: ws } });

const DRY_RUN = process.env.DRY_RUN === '1';
const PARTNER = 'guleholmen';
const FEED_URL = 'https://guleholmen.mystore4.no/twinxml/google_shopping.php';
const USER_AGENT = 'HaandverkerPortalen-sync (+https://haandverkerportalen.no/om-oss)';

// Kategorier (product_type) som passer håndverkere. Fritidstøy, ull, fiskeri,
// nyheter og høstsalg-samlekategorien er bevisst utelatt.
const KATEGORIER = new Set([
  'Arbeidsbukser', 'WRKS Arbeidsklær', 'Synlighetstøy', 'Sko/Støvler', 'Overdeler', 'Jakker',
]);
const MIN_RABATT_PROSENT = 15;
const MERKE = 'WRKS';         // bare Guleholmens eget merke, ikke videreselgte merker (Treksta, Dunlop ...)
const ANTALL_UTVALG = 16;     // karusellen på nettsiden blar gjennom alle, i tilfeldig rekkefølge
const MAKS_PER_KATEGORI = 6;  // spre utvalget over flere typer plagg
const MIN_FORVENTET_RADER = 200; // sikkerhetsnett mot tom/halv feed

function hent(item, tag) {
  const m = item.match(new RegExp(`<g:${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</g:${tag}>`));
  return m ? m[1].trim() : '';
}

function parsePris(tekst) {
  const tall = parseFloat(tekst.replace(/[^\d.]/g, ''));
  return Number.isFinite(tall) ? tall : null;
}

// "Wrks, Varg Vest, Imperial Blue (M)" -> "Varg Vest". Merkeprefiks, farge og
// størrelse fjernes; samme modell i flere farger er separate produkter i feeden
// og slås sammen på dette navnet.
function rensTittel(tittel) {
  const utenStr = tittel.replace(/\s*\([^()]*\)\s*$/, '');
  const deler = utenStr.split(',').map(d => d.trim()).filter(Boolean);
  if (deler.length > 1 && /^(wrks|treksta|dunlop)$/i.test(deler[0])) deler.shift();
  return (deler[0] || utenStr).replace(/[\s-]+$/, '').trim();
}

function bildeLiten(url) {
  // Feeden gir 1200x1200 (200+ KB); CDN-et skalerer på forespørsel via filnavnet.
  return url.replace(/\/w1200h1200\.(png|jpg|jpeg|webp)$/i, '/w400h400.$1');
}

async function hentProdukter() {
  const res = await fetch(FEED_URL, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`Feed HTTP ${res.status}`);
  const xml = await res.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  if (items.length < MIN_FORVENTET_RADER) {
    throw new Error(`Bare ${items.length} rader i feeden (forventet minst ${MIN_FORVENTET_RADER}) – avbryter uten å endre noe`);
  }

  const grupper = new Map();
  const navnSett = new Set();
  for (const item of items) {
    if (hent(item, 'availability') !== 'in_stock') continue;
    const kategori = hent(item, 'product_type');
    if (!KATEGORIER.has(kategori)) continue;
    if (hent(item, 'brand').toUpperCase() !== MERKE) continue;
    const pris = parsePris(hent(item, 'price'));
    const salgspris = parsePris(hent(item, 'sale_price'));
    const lenke = hent(item, 'link');
    const bilde = hent(item, 'image_link');
    const gruppe = hent(item, 'item_group_id');
    if (!pris || !salgspris || salgspris >= pris || !lenke || !bilde || !gruppe) continue;
    const rabatt = Math.round((1 - salgspris / pris) * 100);
    if (rabatt < MIN_RABATT_PROSENT) continue;
    if (!/^https:\/\/www\.guleholmen\.no\//.test(lenke)) continue;
    const tittel = rensTittel(hent(item, 'title'));
    if (grupper.has(gruppe) || navnSett.has(tittel)) continue; // første ledige variant representerer produktet
    navnSett.add(tittel);
    grupper.set(gruppe, {
      id: `${PARTNER}:${gruppe}`,
      partner: PARTNER,
      tittel,
      bilde_url: bildeLiten(bilde),
      lenke,
      pris,
      salgspris,
      rabatt_prosent: rabatt,
      kategori,
    });
  }
  return { antallRader: items.length, kandidater: [...grupper.values()] };
}

function velgUtvalg(kandidater) {
  const sortert = [...kandidater].sort((a, b) => b.rabatt_prosent - a.rabatt_prosent);
  const perKategori = new Map();
  const utvalg = [];
  for (const p of sortert) {
    const n = perKategori.get(p.kategori) || 0;
    if (n >= MAKS_PER_KATEGORI) continue;
    perKategori.set(p.kategori, n + 1);
    utvalg.push(p);
    if (utvalg.length === ANTALL_UTVALG) break;
  }
  return utvalg;
}

async function main() {
  console.log(`🛍️  Guleholmen-feed${DRY_RUN ? ' (TØRRKJØRING)' : ''} – ${new Date().toISOString()}`);
  const { antallRader, kandidater } = await hentProdukter();
  const utvalg = velgUtvalg(kandidater);
  console.log(`${antallRader} rader i feeden, ${kandidater.length} rabatterte produkter i relevante kategorier.`);
  utvalg.forEach(p => console.log(`  -${p.rabatt_prosent}%  ${p.pris} → ${p.salgspris} kr  [${p.kategori}]  ${p.tittel}`));

  // Færre enn 4 gir ikke et fullt produktrutenett - la nettsiden falle tilbake til
  // kampanjebanneren i stedet for å vise et halvtomt utvalg.
  if (utvalg.length < 4) {
    console.warn(`Bare ${utvalg.length} aktuelle produkter – fjerner utvalget så banneren brukes.`);
  }
  if (DRY_RUN) {
    console.log('TØRRKJØRING: ingenting endret.');
    return;
  }

  const lagres = utvalg.length >= 4 ? utvalg : [];
  const naa = new Date().toISOString();
  if (lagres.length) {
    const { error } = await supabase
      .from('annonse_produkter')
      .upsert(lagres.map(p => ({ ...p, oppdatert: naa })), { onConflict: 'id' });
    if (error) throw error;
  }
  // Fjern produkter som ikke lenger er i utvalget (utsolgt, ikke lenger på tilbud)
  let slett = supabase.from('annonse_produkter').delete().eq('partner', PARTNER);
  if (lagres.length) slett = slett.not('id', 'in', `(${lagres.map(p => `"${p.id}"`).join(',')})`);
  const { error: slettFeil } = await slett;
  if (slettFeil) throw slettFeil;
  console.log(`Lagret ${lagres.length} produkter.`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
