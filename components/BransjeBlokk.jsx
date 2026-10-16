// components/BransjeBlokk.jsx
// Bransjeinnhold på bedriftssider: oppdrag, priser, krav, sjekkliste, sesong og FAQ.
// Data i lib/bransjeBlokker.js. FAQ-en tas også inn i sidens FAQPage-schema.
import { BLOKK_OPPDATERT } from '../lib/bransjeBlokker';
import styles from './BransjeBlokk.module.css';

export default function BransjeBlokk({ blokk, bransjeNavn }) {
  const navn = bransjeNavn.toLowerCase();
  return (
    <section className={styles.blokk} aria-labelledby="bransjeblokk-tittel">
      <h2 id="bransjeblokk-tittel" className={styles.tittel}>Om {navn}: oppdrag, priser og krav</h2>
      <p className={styles.tekst}>{blokk.hva}</p>

      <h3 className={styles.under}>Typiske oppdrag</h3>
      <ul className={styles.oppdrag}>
        {blokk.oppdrag.map(o => <li key={o} className={styles.oppdragPunkt}>{o}</li>)}
      </ul>

      <h3 className={styles.under}>Hva koster det?</h3>
      <dl className={styles.priser}>
        {blokk.pris.rader.map(r => (
          <div key={r.jobb} className={styles.prisRad}>
            <dt>{r.jobb}</dt>
            <dd>{r.pris}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.merknad}>
        {blokk.pris.merknad} Veiledende priser inkl. mva, oppdatert {BLOKK_OPPDATERT}. Faktisk pris varierer med sted, omfang og bedrift, så innhent flere tilbud.
      </p>

      <h3 className={styles.under}>Krav og godkjenninger</h3>
      <ul className={styles.liste}>
        {blokk.krav.map(k => <li key={k}>{k}</li>)}
      </ul>

      <h3 className={styles.under}>Sjekk før du velger {navn}</h3>
      <ul className={styles.sjekkliste}>
        {blokk.sjekk.map(k => <li key={k}>{k}</li>)}
      </ul>

      <h3 className={styles.under}>Beste tid å bestille</h3>
      <p className={styles.tekst}>{blokk.sesong}</p>

      <h3 className={styles.under}>Spørsmål om {navn}</h3>
      <div className={styles.faq}>
        {blokk.faq.map(item => (
          <details key={item.sp} className={styles.faqItem}>
            <summary className={styles.faqSpm}>{item.sp}</summary>
            <p className={styles.faqSvar}>{item.sv}</p>
          </details>
        ))}
      </div>

      {blokk.guide && (
        <a href={`/artikler/${blokk.guide.slug}`} className={styles.guide}>
          Les guiden: {blokk.guide.tittel} →
        </a>
      )}
    </section>
  );
}
