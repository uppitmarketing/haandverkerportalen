// pages/sitemap-statisk.xml.js - forside, bransjesider, guider og andre faste sider
import { NAERINGSKODER } from '../lib/db';
import { ARTIKLER } from '../lib/artikler';
import { lagSupabase, lagUrlset, skrivXml, hentBransjeKommuneRader, dato, senesteDato } from '../lib/sitemap';

export async function getServerSideProps({ res }) {
  const rader = await hentBransjeKommuneRader(lagSupabase());

  // Bransjesiden endres når en bedrift i bransjen endres
  const sistPerBransje = (kode) => rader
    ? senesteDato(rader.filter(r => r.naeringskode === kode).map(r => dato(r.sist_endret)))
    : null;

  const urls = [
    { url: '/' },
    { url: '/sok' },
    { url: '/bransjer' },
    { url: '/om-oss' },
    { url: '/for-bedrifter' },
    { url: '/annonsering' },
    { url: '/artikler' },
    ...NAERINGSKODER.map(n => ({ url: `/${n.slug}`, lastmod: sistPerBransje(n.kode) })),
    ...ARTIKLER.map(a => ({ url: `/artikler/${a.slug}`, lastmod: dato(a.oppdatert || a.publisert) })),
  ];

  skrivXml(res, lagUrlset(urls));
  return { props: {} };
}

export default function Sitemap() { return null; }
