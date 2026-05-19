// brreg_import_full.js – full månedlig sync mot Brreg
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const BRREG_BASE = 'https://data.brreg.no/enhetsregisteret/api/enheter';
const PAGE_SIZE = 100;
const DELAY_MS = 250;

const NAERINGSKODER = [
  { kode: '43.210', navn: 'Elektriker' },
  { kode: '43.221', navn: 'Rørlegger' },
  { kode: '43.222', navn: 'Rørlegger/Kuldeanlegg' },
  { kode: '43.223', navn: 'Rørlegger/Ventilasjon' },
  { kode: '43.320', navn: 'Tømrer' },
  { kode: '41.000', navn: 'Byggmester' },
  { kode: '43.340', navn: 'Maler/Glassmester' },
  { kode: '43.910', navn: 'Taklegger' },
  { kode: '43.330', navn: 'Gulvlegger' },
  { kode: '43.120', navn: 'Grunnarbeid' },
];

const KOMMUNER = [
  { nummer: '0301', navn: 'Oslo' },
  { nummer: '3101', navn: 'Halden' },
  { nummer: '3103', navn: 'Moss' },
  { nummer: '3105', navn: 'Sarpsborg' },
  { nummer: '3107', navn: 'Fredrikstad' },
  { nummer: '3201', navn: 'Bærum' },
  { nummer: '3203', navn: 'Asker' },
  { nummer: '3205', navn: 'Lillestrøm' },
  { nummer: '3207', navn: 'Nordre Follo' },
  { nummer: '3209', navn: 'Ullensaker' },
  { nummer: '3222', navn: 'Lørenskog' },
  { nummer: '3301', navn: 'Drammen' },
  { nummer: '3303', navn: 'Kongsberg' },
  { nummer: '3305', navn: 'Ringerike' },
  { nummer: '3403', navn: 'Hamar' },
  { nummer: '3405', navn: 'Lillehammer' },
  { nummer: '3407', navn: 'Gjøvik' },
  { nummer: '3420', navn: 'Elverum' },
  { nummer: '3801', navn: 'Horten' },
  { nummer: '3805', navn: 'Tønsberg' },
  { nummer: '3807', navn: 'Sandefjord' },
  { nummer: '3809', navn: 'Larvik' },
  { nummer: '3903', navn: 'Skien' },
  { nummer: '3901', navn: 'Porsgrunn' },
  { nummer: '4203', navn: 'Arendal' },
  { nummer: '4204', navn: 'Kristiansand' },
  { nummer: '4202', navn: 'Grimstad' },
  { nummer: '4223', navn: 'Vennesla' },
  { nummer: '1101', navn: 'Eigersund' },
  { nummer: '1103', navn: 'Stavanger' },
  { nummer: '1106', navn: 'Haugesund' },
  { nummer: '1108', navn: 'Sandnes' },
  { nummer: '1124', navn: 'Sola' },
  { nummer: '1149', navn: 'Karmøy' },
  { nummer: '4601', navn: 'Bergen' },
  { nummer: '4620', navn: 'Voss' },
  { nummer: '4626', navn: 'Askøy' },
  { nummer: '4630', navn: 'Alver' },
  { nummer: '1505', navn: 'Kristiansund' },
  { nummer: '1506', navn: 'Molde' },
  { nummer: '1507', navn: 'Ålesund' },
  { nummer: '5001', navn: 'Trondheim' },
  { nummer: '5006', navn: 'Steinkjer' },
  { nummer: '5035', navn: 'Stjørdal' },
  { nummer: '5037', navn: 'Levanger' },
  { nummer: '1804', navn: 'Bodø' },
  { nummer: '1806', navn: 'Narvik' },
  { nummer: '1833', navn: 'Rana' },
  { nummer: '5401', navn: 'Tromsø' },
  { nummer: '5402', navn: 'Harstad' },
  { nummer: '5501', navn: 'Alta' },
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function lagSlug(navn, orgnr) {
  return navn.toLowerCase()
    .replace(/æ/g,'ae').replace(/ø/g,'o').replace(/å/g,'a')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')
    .substring(0, 60) + '-' + orgnr;
}

function mapEnhet(e) {
  const adr = e.forretningsadresse || e.postadresse || {};
  return {
    organisasjonsnummer:   e.organisasjonsnummer,
    navn:                  e.navn,
    organisasjonsform:     e.organisasjonsform?.kode || null,
    naeringskode:          e.naeringskode1?.kode || null,
    naeringskode_tekst:    e.naeringskode1?.beskrivelse || null,
    adresse:               adr.adresse?.[0] || null,
    postnummer:            adr.postnummer || null,
    poststed:              adr.poststed || null,
    kommunenummer:         adr.kommunenummer || null,
    kommune:               adr.kommune || null,
    hjemmeside:            e.hjemmeside || null,
    antall_ansatte:        e.antallAnsatte ?? null,
    stiftelsesdato:        e.stiftelsesdato || null,
    mva_registrert:        e.registrertIMvaregisteret ?? false,
    er_aktiv:              !e.konkurs && !e.underAvvikling && !e.underTvangsavviklingEllerTvangsopplosning,
    konkurs:               e.konkurs ?? false,
    under_avvikling:       e.underAvvikling ?? false,
    under_tvangsavvikling: e.underTvangsavviklingEllerTvangsopplosning ?? false,
    slug:                  lagSlug(e.navn, e.organisasjonsnummer),
    sist_importert:        new Date().toISOString(),
  };
}

async function hentAlleSider(naeringskode, kommunenummer) {
  const alle = [];
  let page = 0, totalPages = 1;
  while (page < totalPages) {
    const url = `${BRREG_BASE}?naeringskode=${naeringskode}&kommunenummer=${kommunenummer}&size=${PAGE_SIZE}&page=${page}&sort=navn,asc`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    alle.push(...(data?._embedded?.enheter || []));
    totalPages = data?.page?.totalPages || 1;
    page++;
    if (page < totalPages) await sleep(DELAY_MS);
  }
  return alle;
}

async function lagreBatch(enheter) {
  const mapped = enheter.map(mapEnhet);
  const { error } = await supabase.from('bedrifter').upsert(mapped, { onConflict: 'organisasjonsnummer' });
  if (error) throw error;
  return mapped.length;
}

async function main() {
  console.log(`🔨 Brreg månedlig sync – ${new Date().toISOString()}\n`);
  const start = Date.now();
  let totalt = 0;

  for (const naering of NAERINGSKODER) {
    console.log(`\n📂 ${naering.navn} (${naering.kode})`);
    for (const kommune of KOMMUNER) {
      try {
        const enheter = await hentAlleSider(naering.kode, kommune.nummer);
        if (!enheter.length) continue;
        let lagret = 0;
        for (let i = 0; i < enheter.length; i += 50)
          lagret += await lagreBatch(enheter.slice(i, i + 50));
        totalt += lagret;
        process.stdout.write(`  ✓ ${naering.navn} – ${kommune.navn}: ${lagret}\n`);
      } catch (err) {
        console.log(`  ✗ ${naering.navn} – ${kommune.navn}: ${err.message}`);
      }
      await sleep(DELAY_MS);
    }
  }

  console.log(`\n✅ Ferdig! ${totalt} bedrifter synkronisert på ${((Date.now()-start)/60000).toFixed(1)} min`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
