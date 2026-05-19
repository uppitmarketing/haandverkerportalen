// pages/sitemap.xml.js
import { createClient } from '@supabase/supabase-js';
import { NAERINGSKODER, KOMMUNER } from '../lib/db';

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

    ...NAERINGSKODER.flatMap(n =>
      KOMMUNER.map(k => ({
        url: `/${n.slug}/${k.slug}`,
        priority: '0.7',
        changefreq: 'weekly',
      }))
    ),

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
