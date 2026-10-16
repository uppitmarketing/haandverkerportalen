// pages/sitemap-bransje-fylke.xml.js - /{bransje}/fylke/{fylke}, bare med minst én bedrift
import { NAERINGSKODER, KOMMUNER } from '../lib/db';
import { FYLKER } from '../lib/fylker';
import { lagSupabase, lagUrlset, skrivXml, hentBransjeKommuneRader, dato, senesteDato } from '../lib/sitemap';

export async function getServerSideProps({ res }) {
  const rader = await hentBransjeKommuneRader(lagSupabase());

  const urls = [];
  if (rader) {
    for (const naering of NAERINGSKODER) {
      for (const fylke of FYLKER) {
        const nummer = new Set(KOMMUNER.filter(k => k.fylke === fylke.navn).map(k => k.nummer));
        const treff = rader.filter(r => r.naeringskode === naering.kode && nummer.has(r.kommunenummer) && Number(r.antall) > 0);
        if (treff.length === 0) continue;
        urls.push({
          url: `/${naering.slug}/fylke/${fylke.slug}`,
          lastmod: senesteDato(treff.map(r => dato(r.sist_endret))),
        });
      }
    }
  }

  skrivXml(res, lagUrlset(urls));
  return { props: {} };
}

export default function Sitemap() { return null; }
