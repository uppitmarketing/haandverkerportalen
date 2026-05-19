// pages/artikler.jsx
import Layout from '../components/Layout';
import styles from '../styles/Info.module.css';

const ARTIKLER = [
  { tittel: 'Hva koster en elektriker?', slug: 'hva-koster-elektriker', ingress: 'Timepriser, hva påvirker prisen og tips til å spare penger.', bransje: 'Elektriker' },
  { tittel: 'Slik velger du riktig rørlegger', slug: 'velge-rorlegger', ingress: 'Tips og råd til å finne en pålitelig rørlegger i ditt område.', bransje: 'Rørlegger' },
  { tittel: 'Hva koster en tømrer?', slug: 'hva-koster-tomrer', ingress: 'Alt du trenger å vite om priser og hva som påvirker dem.', bransje: 'Tømrer' },
  { tittel: 'Krav til håndverkere i Norge', slug: 'krav-handverkere', ingress: 'Hvilke sertifiseringer og godkjenninger bør du sjekke?', bransje: 'Generelt' },
];

export default function Artikler() {
  return (
    <Layout title="Guider og artikler" description="Nyttige guider om håndverkertjenester i Norge.">
      <div className={styles.page}>
        <div className="container--narrow">
          <h1 className={styles.title}>Guider og artikler</h1>
          <p className={styles.lead}>Nyttig informasjon om håndverkertjenester, priser og tips.</p>
          <div className={styles.artikkelListe}>
            {ARTIKLER.map(a => (
              <div key={a.slug} className={styles.artikkelKort}>
                <span className={styles.artikkelBransje}>{a.bransje}</span>
                <h2 className={styles.artikkelTittel}>{a.tittel}</h2>
                <p className={styles.artikkelIngress}>{a.ingress}</p>
                <span className={styles.artikkelKommer}>Kommer snart</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
