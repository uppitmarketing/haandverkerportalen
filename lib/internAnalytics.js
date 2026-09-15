// lib/internAnalytics.js
// Delt hjelpefunksjon for å logge hendelser til vår egen page_views-tabell
// (samme mekanisme som sidevisningssporingen i _app.jsx). Brukes for både
// vanlige sidevisninger og syntetiske hendelser (guide-bruk, utgående klikk),
// som skilles fra ekte sider med et "/_"-prefiks på stien.
import { supabase } from './supabase';

export function sporInternHendelse(path) {
  supabase.from('page_views').insert({ path }).then(() => {}, () => {});
}

// Logger fritekstsøk som ikke traff noen bransje i ordboken (BRANSJE_SOKEORD),
// slik at vi kan se hvilke ord/uttrykk som mangler og utvide ordboken deretter.
export function loggSokUtenTreff(tekst, kilde = 'guide') {
  const trimmet = tekst.trim();
  if (trimmet.length < 3) return;
  supabase.from('sok_uten_treff').insert({ tekst: trimmet, kilde }).then(() => {}, () => {});
}

// Logger fritekstsøk som FAKTISK traff en bransje, med hvilken bransje det
// ble til - gir et bilde av hvordan folk formulerer behovene sine i praksis,
// ikke bare hvilke ord som mangler i ordboken (se loggSokUtenTreff over).
export function loggSokTreff(tekst, bransjeSlug, kilde = 'guide') {
  const trimmet = tekst.trim();
  if (trimmet.length < 3) return;
  supabase.from('sok_treff').insert({ tekst: trimmet, bransje_slug: bransjeSlug, kilde }).then(() => {}, () => {});
}
