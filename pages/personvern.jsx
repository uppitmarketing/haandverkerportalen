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
          <h2>Hvilke data samler vi inn?</h2>
          <p>Vi samler ikke inn personopplysninger fra besøkende. Bedriftsinformasjon på siden er hentet fra offentlige registre (Brønnøysundregistrene) og er underlagt Norsk lisens for offentlige data (NLOD).</p>
          <h2>Informasjonskapsler</h2>
          <p>Vi bruker kun teknisk nødvendige informasjonskapsler for å drifte nettsiden. Vi bruker ingen sporingskapsler eller reklamekapsler.</p>
          <h2>Kontakt</h2>
          <p>Spørsmål om personvern? Kontakt oss på <a href="mailto:post@uppit.no">post@uppit.no</a></p>
        </div>
      </div>
    </Layout>
  );
}
