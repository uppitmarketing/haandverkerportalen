// pages/personvern.jsx
import Layout from '../components/Layout';
import styles from '../styles/Info.module.css';

export default function Personvern() {
  return (
    <Layout title="Personvern – HåndverkerPortalen">
      <div className={styles.page}>
        <div className="container--narrow">
          <h1 className={styles.title}>Personvern</h1>
          <p className={styles.lead}>HåndverkerPortalen respekterer ditt personvern.</p>
          <h2 className={styles.heading}>Hvilke data samler vi inn?</h2>
          <p className={styles.tekst}>Vi samler ikke inn personopplysninger fra besøkende. Bedriftsinformasjon er hentet fra offentlige registre og er underlagt NLOD-lisensen.</p>
          <h2 className={styles.heading}>Informasjonskapsler</h2>
          <p className={styles.tekst}>Vi bruker kun teknisk nødvendige informasjonskapsler. Ingen sporingskapsler eller reklamekapsler.</p>
          <h2 className={styles.heading}>Kontakt</h2>
          <p className={styles.tekst}>Spørsmål? Kontakt oss på <a className={styles.lenke} href="mailto:petter@uppit.no">petter@uppit.no</a></p>
        </div>
      </div>
    </Layout>
  );
}
