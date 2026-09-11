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

          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Introtilbud: Gratis Fremhevet profil, for alltid</h3>
            <p className={styles.ctaTekst}>De 10 første bedriftene som melder seg på i september får Fremhevet profil helt gratis — ingen bindingstid, koster aldri noe.</p>
            <a href="/for-bedrifter/intro" className="btn btn--primary">Meld deg på →</a>
          </div>

          <h2 className={styles.heading}>Gratis bedriftsprofil</h2>
          <p className={styles.tekst}>Alle bedrifter registrert i Brønnøysundregistrene får automatisk en gratis profil på HåndverkerPortalen.</p>
          <h2 className={styles.heading}>Fremhevet profil</h2>
          <p className={styles.tekst}>Med en fremhevet profil vises din bedrift øverst i søkeresultatene. Du kan også legge til:</p>
          <ul className={styles.liste}>
            <li className={styles.listeItem}>Kontaktinformasjon (telefon, e-post)</li>
            <li className={styles.listeItem}>Logo</li>
            <li className={styles.listeItem}>Beskrivelse av tjenester</li>
            <li className={styles.listeItem}>Spesialiteter og hvilke type oppdrag dere tar</li>
            <li className={styles.listeItem}>Lenke til nettside</li>
          </ul>
          <p className={styles.tekst}><a href="/for-bedrifter/eksempel" className={styles.lenke}>Se et eksempel på en fremhevet profil →</a></p>

          <h2 className={styles.heading}>Mer treffsikre søk</h2>
          <p className={styles.tekst}>
            Mange kunder søker etter prosjektet sitt, ikke faget — «bygge garasje», «pusse opp bad», «bytte vinduer».
            Ikke alle innenfor et fag tar alle typer jobber. Ved å registrere spesialitetene deres blir bedriften
            deres mer synlig nettopp for de søkene som faktisk passer det dere tilbyr, i stedet for å bli listet
            sammen med alle andre i samme bransje.
          </p>

          <h2 className={styles.heading}>Annonsering</h2>
          <p className={styles.tekst}>Vi tilbyr også bannerannonser og sponsede kategorier. Ta kontakt for priser.</p>
          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>Kom i gang</h3>
            <p className={styles.ctaTekst}>Send oss en e-post så hjelper vi deg i gang.</p>
            <a href="mailto:petter@uppit.no" className="btn btn--primary">Kontakt oss →</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
