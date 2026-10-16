// lib/sitemap.js
// Felles hjelpere for sitemap-filene (pages/sitemap*.xml.js). Sitemapen er delt
// per sidetype slik at indekseringen kan følges separat i Search Console.
import { createClient } from '@supabase/supabase-js';

export const BASE_URL = 'https://haandverkerportalen.no';
const PAGE_SIZE = 1000;

export function lagSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// ISO-dato (ÅÅÅÅ-MM-DD). Bare dato, ikke klokkeslett: lastmod skal si når innholdet
// endret seg, og trenger ikke sekundnøyaktighet.
export function dato(tidspunkt) {
  if (!tidspunkt) return null;
  const d = new Date(tidspunkt);
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
}

export function senesteDato(datoer) {
  const gyldige = datoer.filter(Boolean).sort();
  return gyldige.length ? gyldige[gyldige.length - 1] : null;
}

export function lagUrlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, lastmod }) => `  <url>
    <loc>${BASE_URL}${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;
}

export function lagIndex(filer) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${filer.map(({ url, lastmod }) => `  <sitemap>
    <loc>${BASE_URL}${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

export function skrivXml(res, xml) {
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(xml);
  res.end();
}

// Rader per bransje og kommune: { naeringskode, kommunenummer, antall, sist_endret }.
// Bruker bransje_kommune_sitemap() (har lastmod). Er migrasjonen ikke kjørt ennå, brukes
// den gamle bransje_kommune_antall() uten lastmod; finnes ingen av dem returneres null.
async function hentRpc(supabase, navn) {
  const rader = [];
  let fra = 0;
  while (true) {
    const { data, error } = await supabase.rpc(navn).range(fra, fra + PAGE_SIZE - 1);
    if (error) return null;
    if (!data || data.length === 0) break;
    rader.push(...data);
    if (data.length < PAGE_SIZE) break;
    fra += PAGE_SIZE;
  }
  return rader;
}

export async function hentBransjeKommuneRader(supabase) {
  const ny = await hentRpc(supabase, 'bransje_kommune_sitemap');
  if (ny) return ny;
  const gammel = await hentRpc(supabase, 'bransje_kommune_antall');
  return gammel ? gammel.map(r => ({ ...r, sist_endret: null })) : null;
}

// Aktive bedriftssider (samme filter som listene: ikke utenfor DSB/F-gass).
// Faller tilbake til uten lastmod hvis kolonnen innhold_endret ikke finnes ennå.
export async function hentBedrifter(supabase) {
  for (const kolonner of ['slug, innhold_endret', 'slug']) {
    const alle = [];
    let fra = 0;
    let feil = false;
    while (true) {
      const { data, error } = await supabase
        .from('bedrifter')
        .select(kolonner)
        .eq('er_aktiv', true).not('dsb_registrert', 'is', false).not('fgass_sertifisert', 'is', false)
        .order('slug')
        .range(fra, fra + PAGE_SIZE - 1);
      if (error) { feil = true; break; }
      if (!data || data.length === 0) break;
      alle.push(...data);
      if (data.length < PAGE_SIZE) break;
      fra += PAGE_SIZE;
    }
    if (!feil) return alle;
  }
  return [];
}
