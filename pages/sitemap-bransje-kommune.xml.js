// pages/sitemap-bransje-kommune.xml.js - /{bransje}/{kommune}, bare med minst én bedrift
import { NAERINGSKODER, KOMMUNER } from '../lib/db';
import { lagSupabase, lagUrlset, skrivXml, hentBransjeKommuneRader, dato } from '../lib/sitemap';

export async function getServerSideProps({ res }) {
  const rader = await hentBransjeKommuneRader(lagSupabase());

  // Faller tilbake til alle kombinasjoner (uten lastmod) hvis migrasjonen ikke er kjørt
  const urls = rader
    ? rader.flatMap(r => {
        const naering = NAERINGSKODER.find(n => n.kode === r.naeringskode);
        const kommune = KOMMUNER.find(k => k.nummer === r.kommunenummer);
        if (!naering || !kommune || Number(r.antall) <= 0) return [];
        return [{ url: `/${naering.slug}/${kommune.slug}`, lastmod: dato(r.sist_endret) }];
      })
    : NAERINGSKODER.flatMap(n => KOMMUNER.map(k => ({ url: `/${n.slug}/${k.slug}` })));

  skrivXml(res, lagUrlset(urls));
  return { props: {} };
}

export default function Sitemap() { return null; }
