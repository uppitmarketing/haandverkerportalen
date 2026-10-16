// pages/sitemap-bedrifter.xml.js - /bedrift/{slug}
// Under 50 000 URL-er per fil er grensen; deles opp hvis vi nærmer oss den.
import { lagSupabase, lagUrlset, skrivXml, hentBedrifter, dato } from '../lib/sitemap';

export async function getServerSideProps({ res }) {
  const bedrifter = await hentBedrifter(lagSupabase());
  skrivXml(res, lagUrlset(bedrifter.map(b => ({ url: `/bedrift/${b.slug}`, lastmod: dato(b.innhold_endret) }))));
  return { props: {} };
}

export default function Sitemap() { return null; }
