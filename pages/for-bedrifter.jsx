// pages/for-bedrifter.jsx
import Layout from '../components/Layout';
import styles from '../styles/Info.module.css';

export default function ForBedrifter() {
  return (
    <Layout title="For bedrifter – HåndverkerPortalen" description="Få din håndverkerbedrift fremhevet på HåndverkerPortalen.">
      <div className={styles.page}>
        <div className="container--narrow">
          <h1 className={styles.title}>For bedrifter</h1>
          <p className={styles.lead}>Er du håndverker? Nå ut til flere kunder i ditt område.</p>
          <h2 className={styles.heading}>Gratis bedriftsprofil</h2>
          <p className={styles.tekst}>Alle bedrifter registrert i Brønnøysundregistrene får automatisk en gratis profil på HåndverkerPortalen.</p>
          <h2 className={styles.heading}>Fremhevet profil</h2>
          <p className={styles.tekst}>Med en fremhevet profil vises din bedrift øverst i søkeresultatene. Du kan også legge til:</p>
          <ul className={styles.liste}>
            <li className={styles.listeItem}>Kontaktinformasjon (telefon, e-post)</li>
            <li className={styles.listeItem}>Bilder og logo</li>
            <li className={styles.listeItem}>Beskrivelse av tjenester</li>
            <li className={styles.listeItem}>Lenke til nettside</li>
          </ul>
          <h2 className={styles.heading}>Annonsering</h2>
          <p className={styles.tekst}>Vi tilbyr også bannerannonser og sponsede kategorier. Ta kontakt for priser.</p>
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Kom i gang</h3>
            <p className={styles.ctaTekst}>Send oss en e-post så hjelper vi deg i gang.</p>
            <a href="mailto:post@uppit.no" className="btn btn--primary">Kontakt oss →</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
