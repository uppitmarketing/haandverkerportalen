// backfill_dagligleder_dibk.js – engangs-etterslep av daglig leder og
// sentral godkjenning for alle EKSISTERENDE bedrifter i basen.
//
// Kjøres IKKE av den vanlige månedlige cronjobben (brreg_import_full.js) -
// den håndterer bare nye bedrifter fremover. Dette skriptet henter inn
// data for de ~35 000 bedriftene som allerede lå i basen før denne
// funksjonen ble bygget.
//
// Trygt å avbryte og starte på nytt når som helst: skriptet spør alltid
// etter bedrifter der ekstra_data_hentet ennå er null, så det plukker
// automatisk opp igjen der det slapp.
//
// Kjør med: SUPABASE_URL=... SUPABASE_KEY=... node backfill_dagligleder_dibk.js
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { hentEkstraData, sleep } from './brreg-ekstra-data.js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, { realtime: { transport: ws } });

const BATCH_SIZE = 200;
const DELAY_MS = 300;

async function hentNesteBatch() {
  const { data, error } = await supabase
    .from('bedrifter')
    .select('organisasjonsnummer')
    .is('ekstra_data_hentet', null)
    .limit(BATCH_SIZE);
  if (error) throw error;
  return data || [];
}

async function main() {
  console.log(`🔎 Etterslep daglig leder + sentral godkjenning – ${new Date().toISOString()}\n`);
  const start = Date.now();
  let totalt = 0;
  let feilet = 0;

  for (;;) {
    const batch = await hentNesteBatch();
    if (batch.length === 0) break;

    for (const { organisasjonsnummer } of batch) {
      try {
        const ekstraData = await hentEkstraData(organisasjonsnummer);
        const { error } = await supabase
          .from('bedrifter')
          .update(ekstraData)
          .eq('organisasjonsnummer', organisasjonsnummer);
        if (error) throw error;
        totalt++;
      } catch (err) {
        feilet++;
        console.log(`  ✗ ${organisasjonsnummer}: ${err.message}`);
      }
      await sleep(DELAY_MS);
    }

    const minutter = ((Date.now() - start) / 60000).toFixed(1);
    console.log(`  … ${totalt} hentet (${feilet} feilet) – ${minutter} min`);
  }

  const minutter = ((Date.now() - start) / 60000).toFixed(1);
  console.log(`\n✅ Ferdig! ${totalt} bedrifter oppdatert, ${feilet} feilet, på ${minutter} min`);
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
