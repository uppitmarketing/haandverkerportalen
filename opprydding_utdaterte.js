// opprydding_utdaterte.js – deaktiverer bedrifter som ikke lenger er håndverk i Brreg.
// Kjøres rett etter brreg_import_full.js i den månedlige GitHub Actions-jobben.
//
// Importen henter fra Brreg per næringskode og kommune, så en bedrift som bytter
// næringskode (f.eks. til 68.200 eiendom eller 00.000 uoppgitt) eller slettes
// dukker aldri opp igjen - den blir stående som aktiv med gammel kode. Dette
// scriptet sjekker alle aktive bedrifter mot Brreg og setter er_aktiv = false på
// dem som ikke lenger hører hjemme. Ingenting slettes, så det kan angres, og en
// bedrift som kommer tilbake under en av kodene våre aktiveres av importen igjen.
//
// DRY_RUN=1 skriver ut hva som ville blitt gjort, uten å endre noe.
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fetch from 'node-fetch';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, { realtime: { transport: ws } });

const DRY_RUN = process.env.DRY_RUN === '1';
const BRREG_BASE = 'https://data.brreg.no/enhetsregisteret/api/enheter';
const BATCH = 100;
const PARALLELT = 3;

// Hold i synk med NAERINGSKODER i brreg_import_full.js og lib/db.js
const HAANDVERKERKODER = new Set([
  '43.210', '43.221', '43.222', '43.223', '43.320', '41.000',
  '43.340', '43.410', '43.330', '43.120', '43.910',
]);

// Sikkerhetsnett: avbryt uten å skrive noe hvis tallene ser feil ut
const MIN_AKTIVE = 20000;          // databasen skal ha mange flere enn dette
const MAKS_MISLYKKET_ANDEL = 0.03; // for mange feilede Brreg-kall = ikke stol på resultatet
const MAKS_FLAGGET_ANDEL = 0.05;   // første kjøring flagger ~1,5 %; over 5 % tyder på feil

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function hentAktive() {
  const rader = [];
  let fra = 0;
  while (true) {
    const { data, error } = await supabase
      .from('bedrifter')
      .select('organisasjonsnummer, navn, naeringskode, er_fremhevet')
      .eq('er_aktiv', true)
      .order('organisasjonsnummer')
      .range(fra, fra + 999);
    if (error) throw error;
    if (!data || data.length === 0) break;
    rader.push(...data);
    fra += data.length;
  }
  return rader;
}

// Henter 100 enheter om gangen. Returnerer null hvis kallet feiler etter flere
// forsøk, slik at bedriftene i den batchen ikke feilaktig regnes som "borte".
async function hentBatch(orgnrListe) {
  const url = `${BRREG_BASE}?organisasjonsnummer=${orgnrListe.join(',')}&size=${BATCH}`;
  for (let forsok = 0; forsok < 3; forsok++) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        return json._embedded?.enheter || [];
      }
    } catch { /* prøv igjen */ }
    await sleep(1000 * (forsok + 1));
  }
  return null;
}

// Bekrefter hver "mangler"-bedrift enkeltvis før vi kaller den borte.
// Slettede enheter svarer 200 med slettedato satt (ikke 404), og utelates fra
// listeoppslaget. 404/410 regnes også som borte. Alt annet er usikkert og lar vi stå.
async function erBorteFraBrreg(orgnr) {
  try {
    const res = await fetch(`${BRREG_BASE}/${orgnr}`);
    if (res.status === 404 || res.status === 410) return true;
    if (!res.ok) return false;
    const enhet = await res.json();
    return Boolean(enhet.slettedato);
  } catch {
    return false;
  }
}

async function deaktiver(orgnrListe) {
  for (let i = 0; i < orgnrListe.length; i += 200) {
    const { error } = await supabase
      .from('bedrifter')
      .update({ er_aktiv: false })
      .in('organisasjonsnummer', orgnrListe.slice(i, i + 200));
    if (error) throw error;
  }
}

async function main() {
  console.log(`🧹 Opprydding av utdaterte bedrifter${DRY_RUN ? ' (TØRRKJØRING)' : ''} – ${new Date().toISOString()}`);

  const aktive = await hentAktive();
  if (aktive.length < MIN_AKTIVE) {
    throw new Error(`Bare ${aktive.length} aktive bedrifter i databasen – avbryter uten å endre noe`);
  }
  console.log(`${aktive.length} aktive bedrifter å sjekke.`);

  const batcher = [];
  for (let i = 0; i < aktive.length; i += BATCH) batcher.push(aktive.slice(i, i + BATCH));

  const brreg = new Map();
  const mislykkedeOrgnr = new Set();
  const kø = [...batcher];
  async function jobb() {
    while (kø.length) {
      const batch = kø.shift();
      const enheter = await hentBatch(batch.map(b => b.organisasjonsnummer));
      if (enheter === null) {
        batch.forEach(b => mislykkedeOrgnr.add(b.organisasjonsnummer));
      } else {
        enheter.forEach(e => brreg.set(e.organisasjonsnummer, e));
      }
      await sleep(150);
    }
  }
  await Promise.all(Array.from({ length: PARALLELT }, jobb));

  if (mislykkedeOrgnr.size / aktive.length > MAKS_MISLYKKET_ANDEL) {
    throw new Error(`${mislykkedeOrgnr.size} bedrifter kunne ikke sjekkes mot Brreg – avbryter uten å endre noe`);
  }

  const endretKode = [];
  const manglerKandidater = [];
  const nyeKoder = new Map();
  for (const b of aktive) {
    if (mislykkedeOrgnr.has(b.organisasjonsnummer)) continue;
    const e = brreg.get(b.organisasjonsnummer);
    if (!e) { manglerKandidater.push(b); continue; }
    const nyKode = e.naeringskode1?.kode || null;
    if (!HAANDVERKERKODER.has(nyKode)) {
      endretKode.push(b);
      nyeKoder.set(nyKode, (nyeKoder.get(nyKode) || 0) + 1);
    }
  }

  const borte = [];
  for (const b of manglerKandidater) {
    if (await erBorteFraBrreg(b.organisasjonsnummer)) borte.push(b);
    await sleep(100);
  }

  const alleFlaggede = [...endretKode, ...borte];
  const beskyttet = alleFlaggede.filter(b => b.er_fremhevet);
  const skalDeaktiveres = alleFlaggede.filter(b => !b.er_fremhevet);

  if (alleFlaggede.length / aktive.length > MAKS_FLAGGET_ANDEL) {
    throw new Error(`${alleFlaggede.length} bedrifter flagget (over ${MAKS_FLAGGET_ANDEL * 100} %) – ser feil ut, avbryter uten å endre noe`);
  }

  console.log(`Funnet i Brreg: ${brreg.size}. Kunne ikke sjekkes: ${mislykkedeOrgnr.size}.`);
  console.log(`Ikke lenger håndverk (byttet næringskode): ${endretKode.length}`);
  console.log(`  vanligste nye koder: ${[...nyeKoder.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, n]) => `${k}=${n}`).join(', ')}`);
  console.log(`Finnes ikke lenger i Brreg (bekreftet enkeltvis): ${borte.length} av ${manglerKandidater.length} kandidater`);
  if (beskyttet.length) {
    console.warn(`⚠️  ${beskyttet.length} fremhevede profiler ville blitt deaktivert – hoppet over, sjekk manuelt:`);
    beskyttet.forEach(b => console.warn(`   ${b.organisasjonsnummer} ${b.navn}`));
  }
  console.log(`Eksempler: ${skalDeaktiveres.slice(0, 8).map(b => b.navn).join('; ')}`);

  if (DRY_RUN) {
    console.log(`TØRRKJØRING: ville deaktivert ${skalDeaktiveres.length} bedrifter. Ingenting endret.`);
    return;
  }

  await deaktiver(skalDeaktiveres.map(b => b.organisasjonsnummer));
  console.log(`Deaktivert ${skalDeaktiveres.length} bedrifter (er_aktiv = false).`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
