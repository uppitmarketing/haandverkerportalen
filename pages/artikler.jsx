// pages/artikler.jsx
import Layout from '../components/Layout';
import { ARTIKLER } from '../lib/artikler';
import styles from '../styles/Info.module.css';

export default function Artikler() {
  return (
    <Layout
      title="Guider og artikler"
      description="Nyttige guider om håndverkertjenester i Norge – priser, hvordan velge riktig håndverker, og hvilke krav som gjelder."
      canonical="/artikler"
    >
      <div className={styles.page}>
        <div className="container--narrow">
          <h1 className={styles.title}>Guider og artikler</h1>
          <p className={styles.lead}>Nyttig informasjon om håndverkertjenester, priser og tips.</p>
          <div className={styles.artikkelListe}>
            {ARTIKLER.map(a => (
              <a key={a.slug} href={`/artikler/${a.slug}`} className={styles.artikkelKort}>
                <span className={styles.artikkelBransje}>{a.bransje}</span>
                <h2 className={styles.artikkelTittel}>{a.tittel}</h2>
                <p className={styles.artikkelIngress}>{a.ingress}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
