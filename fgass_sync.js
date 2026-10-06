// fgass_sync.js – marker F-gass-sertifiserte bedrifter fra Isovators offentlige
// register (utstedt på oppdrag fra Miljødirektoratet).
// Kjøres etter dsb_elreg_sync.js i den månedlige GitHub Actions-jobben.
//
// Kilde: Isovator har en samle-side ("alle") som gir hele landets liste i én
// tabell, i stedet for én side per fylke. Vi bruker den i stedet for å gå
// fylke for fylke - færre kall mot serveren deres, og den unngår en reell
// feil i Isovators egne fylkelenker (Møre og Romsdal, Østfold og Trøndelag
// er feil URL-kodet i menyen deres: "M3%b8re..." i stedet for "M%C3%B8re...").
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';
import ws from 'ws';
import fetch from 'node-fetch';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, { realtime: { transport: ws } });

const ISOVATOR_URL = 'https://www.isovator.no/sertifisering/f-gass-sertifisering-kulde-og-varmepumper/f-gass-sertifiserte-bedrifter/alle';
const USER_AGENT = 'HaandverkerPortalen-sync (+https://haandverkerportalen.no/om-oss)';
const MIN_FORVENTET = 300; // sikkerhetsnett: avbryt hvis Isovator returnerer mistenkelig få treff
const VARMEPUMPE_KODE = '43.222';
const UNDERENHET_DELAY_MS = 300;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Fagbrevet dekker montering (kat. I/II). Kat. III/IV gjelder bare gjenvinning
// og lekkasjekontroll, ikke installasjon - de skal ikke telle som "sertifisert
// for montering" selv om bedriften har et gyldig sertifikat i en annen kategori.
function erKvalifisertForMontering(kategoriTekst) {
  return kategoriTekst
    .split(',')
    .map(k => k.trim())
    .some(k => k === 'I' || k === 'II');
}

// Isovator sin egen liste har noen få rader med kategori skrevet som arabisk
// "1" i stedet for romertallet "I" - åpenbar inntastingsfeil, ikke en egen
// femte kategori (registeret opererer kun med I-IV).
function normaliserKategori(kategoriTekst) {
  return kategoriTekst === '1' ? 'I' : kategoriTekst;
}

async function hentIsovatorListe() {
  const res = await fetch(ISOVATOR_URL, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`Isovator HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  const rader = [];
  $('table.resultTable tr').each((i, tr) => {
    const celler = $(tr).find('td');
    if (celler.length < 8) return; // hopper over header-raden (<th>, ingen <td>)
    const navnOgSertNr = $(celler[0]).text().trim();
    const [navn, sertifikatnr] = navnOgSertNr.split(' / ').map(s => s?.trim());
    // Isovator skriver org.nr. til dels med mellomrom ("917 760 225") eller
    // med "MVA" bak - bare sifrene teller. Rader uten gyldig org.nr. kan ikke
    // matches (vi matcher aldri på navn) og hoppes over.
    const orgnr = $(celler[6]).text().replace(/\D/g, '');
    if (!/^\d{9}$/.test(orgnr)) return;
    const kategori = normaliserKategori($(celler[7]).text().trim());
    rader.push({ navn, sertifikatnr: sertifikatnr || null, orgnr, kategori });
  });

  // Samme organisasjonsnummer kan stå på flere rader (ett sertifikat per
  // avdeling, f.eks. 14 rader for samme konsern) - slå sammen til kategoriene
  // som faktisk finnes, slik at en gyldig kat. I/II lenger ned i lista ikke
  // går tapt fordi en tidligere rad for samme bedrift bare hadde kat. III/IV.
  const perOrgnr = new Map();
  for (const rad of rader) {
    if (!perOrgnr.has(rad.orgnr)) {
      perOrgnr.set(rad.orgnr, { navn: rad.navn, sertifikatnr: rad.sertifikatnr, kategorier: new Set() });
    }
    const gruppe = perOrgnr.get(rad.orgnr);
    rad.kategori.split(',').map(k => k.trim()).filter(Boolean).forEach(k => gruppe.kategorier.add(k));
  }

  // Tom kategori ('') betyr at Isovator har oppført bedriften uten å oppgi
  // kategori - den står i lista, så den skal ikke feilaktig vises som "ikke funnet".
  return Array.from(perOrgnr.entries()).map(([orgnr, gruppe]) => ({
    navn: gruppe.navn,
    sertifikatnr: gruppe.sertifikatnr,
    orgnr,
    kategori: Array.from(gruppe.kategorier).sort().join(','),
  }));
}

// Henter organisasjonsnummer + næringskode for alle aktive bedrifter, paginert
// med .range() til en helt tom side bekrefter at alt er hentet - Supabase/
// PostgREST kutter av antall rader per svar (samme lærdom som rammet
// getKommunerRangertForNaering tidligere).
async function hentAlleBedrifter() {
  const rader = [];
  let fra = 0;
  const sideStorrelse = 1000;
  while (true) {
    const { data, error } = await supabase
      .from('bedrifter')
      .select('organisasjonsnummer, naeringskode')
      .eq('er_aktiv', true)
      .range(fra, fra + sideStorrelse - 1);
    if (error) throw error;
    if (!data || data.length === 0) break;
    rader.push(...data);
    fra += data.length;
  }
  return rader;
}

// Isovator-lista kan inneholde underenheter (avdelinger) i stedet for
// hovedenheten som står i vår database. Slår opp overordnet enhet for
// oppføringer som ikke gir direkte treff - aldri på navn.
async function finnOverordnetEnhet(orgnr) {
  const res = await fetch(`https://data.brreg.no/enhetsregisteret/api/underenheter/${orgnr}`, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (res.status === 404) return null; // ikke en underenhet
  if (!res.ok) throw new Error(`Brreg underenheter HTTP ${res.status} for ${orgnr}`);
  const data = await res.json();
  return data.overordnetEnhet || null;
}

async function oppdaterBatch(oppdateringer) {
  for (let i = 0; i < oppdateringer.length; i += 200) {
    const batch = oppdateringer.slice(i, i + 200);
    await Promise.all(batch.map(({ organisasjonsnummer, ...felter }) =>
      supabase.from('bedrifter').update(felter).eq('organisasjonsnummer', organisasjonsnummer)
    ));
  }
}

async function main() {
  console.log(`🧊 F-gass-sync (Isovator) – ${new Date().toISOString()}`);

  const liste = await hentIsovatorListe();
  if (liste.length < MIN_FORVENTET) {
    throw new Error(`Bare ${liste.length} rader fra Isovator (forventet minst ${MIN_FORVENTET}) – avbryter uten å endre noe`);
  }
  console.log(`Hentet ${liste.length} rader fra Isovator.`);

  const bedrifter = await hentAlleBedrifter();
  const bedriftPerOrgnr = new Map(bedrifter.map(b => [b.organisasjonsnummer, b]));
  console.log(`${bedrifter.length} aktive bedrifter i databasen.`);

  let direkteTreff = 0;
  let underenhetTreff = 0;
  let ingenTreffILista = 0;

  // orgnr (i VÅR database) -> beste treff fra Isovator-lista
  const treffPerOrgnr = new Map();

  for (const rad of liste) {
    let maalOrgnr = null;

    if (bedriftPerOrgnr.has(rad.orgnr)) {
      maalOrgnr = rad.orgnr;
      direkteTreff++;
    } else {
      await sleep(UNDERENHET_DELAY_MS);
      let overordnet;
      try {
        overordnet = await finnOverordnetEnhet(rad.orgnr);
      } catch (err) {
        console.warn(`Underenhet-oppslag feilet for ${rad.orgnr} (${rad.navn}): ${err.message}`);
        continue;
      }
      const overordnetOrgnr = overordnet?.organisasjonsnummer;
      if (overordnetOrgnr && bedriftPerOrgnr.has(overordnetOrgnr)) {
        maalOrgnr = overordnetOrgnr;
        underenhetTreff++;
      } else {
        ingenTreffILista++;
        continue;
      }
    }

    // Flere ulike Isovator-rader (typisk avdelinger registrert som egne
    // underenheter) kan pakes til samme hovedenhet hos oss - slå sammen
    // kategoriene i stedet for å bare beholde den første, av samme grunn som
    // dedupliseringen i hentIsovatorListe().
    if (!treffPerOrgnr.has(maalOrgnr)) {
      treffPerOrgnr.set(maalOrgnr, { ...rad, kategoriSet: new Set(rad.kategori.split(',').map(k => k.trim()).filter(Boolean)) });
    } else {
      const eksisterende = treffPerOrgnr.get(maalOrgnr);
      rad.kategori.split(',').map(k => k.trim()).filter(Boolean).forEach(k => eksisterende.kategoriSet.add(k));
    }
  }
  for (const treff of treffPerOrgnr.values()) {
    treff.kategori = Array.from(treff.kategoriSet).sort().join(',');
  }

  console.log(`Treff: ${direkteTreff} direkte, ${underenhetTreff} via underenhet. ${ingenTreffILista} Isovator-rader uten treff i databasen.`);

  const naa = new Date().toISOString();
  const oppdateringer = [];

  for (const [orgnr, treff] of treffPerOrgnr.entries()) {
    const bedrift = bedriftPerOrgnr.get(orgnr);
    // Oppført uten kategori: kan ikke utelukke kat. I/II, så bedriften regnes
    // som sertifisert (uten å vise noen kategori) i stedet for å skjules.
    const kvalifisert = treff.kategori === '' || erKvalifisertForMontering(treff.kategori);
    if (kvalifisert) {
      oppdateringer.push({
        organisasjonsnummer: orgnr,
        fgass_sertifisert: true,
        fgass_kategori: treff.kategori || null,
        fgass_sertifikatnr: treff.sertifikatnr,
        fgass_sjekket: naa,
      });
    } else {
      // Bare kat. III/IV - lagre kategorien som info, men den teller ikke som
      // "sertifisert for montering" for varmepumpemontører.
      oppdateringer.push({
        organisasjonsnummer: orgnr,
        fgass_sertifisert: bedrift.naeringskode === VARMEPUMPE_KODE ? false : null,
        fgass_kategori: treff.kategori || null,
        fgass_sertifikatnr: treff.sertifikatnr,
        fgass_sjekket: naa,
      });
    }
  }

  let ikkeSertifisertVarmepumpe = 0;
  for (const bedrift of bedrifter) {
    if (bedrift.naeringskode !== VARMEPUMPE_KODE) continue;
    if (treffPerOrgnr.has(bedrift.organisasjonsnummer)) continue; // allerede håndtert over
    oppdateringer.push({
      organisasjonsnummer: bedrift.organisasjonsnummer,
      fgass_sertifisert: false,
      fgass_sjekket: naa,
    });
    ikkeSertifisertVarmepumpe++;
  }

  await oppdaterBatch(oppdateringer);

  const sertifisertKatIEllerII = oppdateringer.filter(o => o.fgass_sertifisert === true).length;
  console.log(`Oppdaterte ${oppdateringer.length} rader.`);
  console.log(`  - ${sertifisertKatIEllerII} satt til sertifisert (kat. I eller II).`);
  console.log(`  - ${ikkeSertifisertVarmepumpe} varmepumpemontører (${VARMEPUMPE_KODE}) uten treff i lista, satt til false.`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
