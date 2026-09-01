// lib/internAnalytics.js
// Delt hjelpefunksjon for å logge hendelser til vår egen page_views-tabell
// (samme mekanisme som sidevisningssporingen i _app.jsx). Brukes for både
// vanlige sidevisninger og syntetiske hendelser (guide-bruk, utgående klikk),
// som skilles fra ekte sider med et "/_"-prefiks på stien.
import { supabase } from './supabase';

export function sporInternHendelse(path) {
  supabase.from('page_views').insert({ path }).then(() => {}, () => {});
}
