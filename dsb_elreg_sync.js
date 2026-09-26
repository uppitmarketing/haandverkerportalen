// dsb_elreg_sync.js – marker elektrobedrifter som er / ikke er registrert i DSBs elvirksomhetsregister
// Kjøres etter brreg_import_full.js i den månedlige GitHub Actions-jobben.
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import fetch from 'node-fetch';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, { realtime: { transport: ws } });

const DSB_SEARCH = 'https://elvirksomhetsregisteret.dsb.no/api/v1/electricianbusinesses/search';
const PAGE = 1000;
const MIN_FORVENTET = 3000; // sikkerhetsnett: avbryt hvis DSB returnerer mistenkelig få treff

async function hentDsb() {
  const alle = [];
  let skipped = 0, total = Infinity;
  while (skipped < total) {
    const res = await fetch(DSB_SEARCH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ skipped, hitsToReturn: PAGE }),
    });
    if (!res.ok) throw new Error(`DSB HTTP ${res.status}`);
    const data = await res.json();
    total = data.totalHits;
    if (!data.hits?.length) break;
    alle.push(...data.hits);
    skipped += data.hits.length;
  }
  return alle;
}

async function hentElektroFraDb() {
  const rader = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from('bedrifter')
      .select('organisasjonsnummer')
      .eq('naeringskode', '43.210')
      .order('organisasjonsnummer')
      .range(from, from + 999);
    if (error) throw error;
    rader.push(...data);
    if (data.length < 1000) break;
  }
  return rader.map(r => r.organisasjonsnummer);
}

async function oppdater(orgnrListe, verdi) {
  const naa = new Date().toISOString();
  for (let i = 0; i < orgnrListe.length; i += 200) {
    const { error } = await supabase
      .from('bedrifter')
      .update({ dsb_registrert: verdi, dsb_sjekket: naa })
      .in('organisasjonsnummer', orgnrListe.slice(i, i + 200));
    if (error) throw error;
  }
}

async function main() {
  console.log(`⚡ DSB elvirksomhetsregister-sync – ${new Date().toISOString()}`);
  const dsb = await hentDsb();
  if (dsb.length < MIN_FORVENTET) throw new Error(`Bare ${dsb.length} treff fra DSB – avbryter uten å endre noe`);

  // DSB-registeret har både foretaksnummer (organisationNumber) og underenhetsnummer (businessNumber)
  const registrert = new Set();
  for (const h of dsb) {
    if (h.organisationNumber) registrert.add(h.organisationNumber);
    if (h.businessNumber) registrert.add(h.businessNumber);
  }

  const elektro = await hentElektroFraDb();
  const ja = elektro.filter(o => registrert.has(o));
  const nei = elektro.filter(o => !registrert.has(o));

  await oppdater(ja, true);
  await oppdater(nei, false);

  console.log(`DSB: ${dsb.length} virksomheter. DB elektro: ${elektro.length}. Registrert: ${ja.length}. Ikke registrert: ${nei.length}.`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
