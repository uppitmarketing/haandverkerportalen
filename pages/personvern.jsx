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
          <h2 className={styles.heading}>Hvilke bedrifter vises på portalen?</h2>
          <p className={styles.tekst}>HåndverkerPortalen viser kun aksjeselskaper (AS) registrert i Brønnøysundregistrene. Enkeltpersonforetak (ENK) er fjernet fra registeret, da disse er direkte knyttet til en fysisk person og dermed regnes som personopplysninger.</p>
          <h2 className={styles.heading}>Sletting av data</h2>
          <p className={styles.tekst}>Ønsker du at din bedrift skal fjernes fra HåndverkerPortalen, kan du be om dette ved å sende en e-post til <a className={styles.lenke} href="mailto:petter@uppit.no">petter@uppit.no</a>. Vi behandler henvendelser om sletting fortløpende.</p>
          <h2 className={styles.heading}>Informasjonskapsler</h2>
          <p className={styles.tekst}>Vi bruker kun teknisk nødvendige informasjonskapsler. Ingen sporingskapsler eller reklamekapsler.</p>
          <h2 className={styles.heading}>Kontakt</h2>
          <p className={styles.tekst}>Spørsmål? Kontakt oss på <a className={styles.lenke} href="mailto:petter@uppit.no">petter@uppit.no</a></p>
        </div>
      </div>
    </Layout>
  );
}
