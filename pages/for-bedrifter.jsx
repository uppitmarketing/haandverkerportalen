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
          <h2>Gratis bedriftsprofil</h2>
          <p>Alle bedrifter registrert i Brønnøysundregistrene får automatisk en gratis profil på HåndverkerPortalen. Du trenger ikke gjøre noe.</p>
          <h2>Fremhevet profil</h2>
          <p>Med en fremhevet profil vises din bedrift øverst i søkeresultatene for din bransje og kommune. Du kan også legge til:</p>
          <ul>
            <li>Kontaktinformasjon (telefon, e-post)</li>
            <li>Bilder og logo</li>
            <li>Beskrivelse av tjenester</li>
            <li>Lenke til nettside</li>
          </ul>
          <h2>Annonsering</h2>
          <p>Vi tilbyr også bannerannonser og sponsede kategorier. Ta kontakt for priser og tilgjengelighet.</p>
          <div className={styles.cta}>
            <h3>Kom i gang</h3>
            <p>Send oss en e-post så hjelper vi deg i gang.</p>
            <a href="mailto:post@uppit.no" className="btn btn--primary">Kontakt oss →</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
