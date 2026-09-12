// pages/sitemap.xml.js
import { createClient } from '@supabase/supabase-js';
import { NAERINGSKODER, KOMMUNER } from '../lib/db';
import { ARTIKLER } from '../lib/artikler';

const BASE_URL = 'https://haandverkerportalen.no';
const PAGE_SIZE = 1000;

function generateSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <changefreq>${changefreq || 'weekly'}</changefreq>
    <priority>${priority || '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`;
}

async function hentBransjeKommuneAntall(supabase) {
  const map = new Map();
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .rpc('bransje_kommune_antall')
      .range(from, from + PAGE_SIZE - 1);

    if (error) return null; // RPC-funksjonen finnes kanskje ikke ennå
    if (!data || data.length === 0) break;

    for (const rad of data) {
      const key = `${rad.naeringskode}|${rad.kommunenummer}`;
      map.set(key, (map.get(key) || 0) + Number(rad.antall));
    }

    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return map;
}

function finnAntall(antallMap, naering, kommune) {
  return antallMap.get(`${naering.kode}|${kommune.nummer}`) || 0;
}

async function hentAlleSlugs(supabase) {
  const alle = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from('bedrifter')
      .select('slug')
      .eq('er_aktiv', true)
      .range(from, from + PAGE_SIZE - 1);

    if (error || !data || data.length === 0) break;
    alle.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  return alle;
}

export async function getServerSideProps({ res }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const bedrifter = await hentAlleSlugs(supabase);
  const antallMap = await hentBransjeKommuneAntall(supabase);

  // Faller tilbake til uten filtrering hvis RPC-funksjonen ikke er satt opp i Supabase ennå
  const bransjeKommuneUrls = antallMap
    ? NAERINGSKODER.flatMap(n =>
        KOMMUNER.map(k => ({ naering: n, kommune: k, antall: finnAntall(antallMap, n, k) }))
      )
        .filter(({ antall }) => antall > 0)
        .map(({ naering, kommune, antall }) => ({
          url: `/${naering.slug}/${kommune.slug}`,
          priority: antall >= 50 ? '0.8' : antall >= 10 ? '0.6' : '0.4',
          changefreq: 'weekly',
        }))
    : NAERINGSKODER.flatMap(n =>
        KOMMUNER.map(k => ({ url: `/${n.slug}/${k.slug}`, priority: '0.7', changefreq: 'weekly' }))
      );

  const urls = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/sok', priority: '0.8', changefreq: 'weekly' },
    { url: '/bransjer', priority: '0.8', changefreq: 'weekly' },
    { url: '/om-oss', priority: '0.4', changefreq: 'monthly' },
    { url: '/for-bedrifter', priority: '0.6', changefreq: 'monthly' },
    { url: '/annonsering', priority: '0.5', changefreq: 'monthly' },
    { url: '/artikler', priority: '0.6', changefreq: 'weekly' },

    ...NAERINGSKODER.map(n => ({
      url: `/${n.slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    })),

    ...ARTIKLER.map(a => ({
      url: `/artikler/${a.slug}`,
      priority: '0.6',
      changefreq: 'monthly',
    })),

    ...bransjeKommuneUrls,

    ...bedrifter.map(b => ({
      url: `/bedrift/${b.slug}`,
      priority: '0.5',
      changefreq: 'monthly',
    })),
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(generateSitemap(urls));
  res.end();

  return { props: {} };
}

export default function Sitemap() { return null; }
