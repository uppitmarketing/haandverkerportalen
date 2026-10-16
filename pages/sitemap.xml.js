// pages/sitemap.xml.js
// Sitemap-indeks. Selve URL-ene ligger i fire filer, delt etter sidetype slik at
// Search Console viser indekseringen per type (bedrifter, bransje/sted, fylke, statisk).
import { lagSupabase, lagIndex, skrivXml, hentBransjeKommuneRader, hentBedrifter, dato, senesteDato } from '../lib/sitemap';

export async function getServerSideProps({ res }) {
  const supabase = lagSupabase();
  const rader = await hentBransjeKommuneRader(supabase);
  const sistBransjeSted = rader ? senesteDato(rader.map(r => dato(r.sist_endret))) : null;

  const { data: nyeste } = await supabase
    .from('bedrifter')
    .select('innhold_endret')
    .order('innhold_endret', { ascending: false })
    .limit(1);
  const sistBedrift = dato(nyeste?.[0]?.innhold_endret);

  skrivXml(res, lagIndex([
    { url: '/sitemap-statisk.xml' },
    { url: '/sitemap-bransje-kommune.xml', lastmod: sistBransjeSted },
    { url: '/sitemap-bransje-fylke.xml', lastmod: sistBransjeSted },
    { url: '/sitemap-bedrifter.xml', lastmod: sistBedrift },
  ]));

  return { props: {} };
}

export default function Sitemap() { return null; }
