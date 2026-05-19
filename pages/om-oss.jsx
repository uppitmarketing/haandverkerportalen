// pages/om-oss.jsx
import Layout from '../components/Layout';
import styles from '../styles/Info.module.css';

export default function OmOss() {
  return (
    <Layout title="Om HåndverkerPortalen" description="HåndverkerPortalen er Norges håndverkerregister med data fra Brønnøysundregistrene.">
      <div className={styles.page}>
        <div className="container--narrow">
          <h1 className={styles.title}>Om HåndverkerPortalen</h1>
          <p className={styles.lead}>HåndverkerPortalen er et gratis søkeverktøy for å finne håndverkerbedrifter i hele Norge.</p>
          <h2>Hva er HåndverkerPortalen?</h2>
          <p>Vi samler og presenterer data fra Brønnøysundregistrene (Enhetsregisteret) for å gjøre det enkelt å finne riktig håndverker i din kommune. Alle bedrifter er verifisert mot offentlige registre.</p>
          <h2>Datakilder</h2>
          <p>All bedriftsinformasjon hentes fra <a href="https://www.brreg.no" target="_blank" rel="noopener noreferrer">Brønnøysundregistrene</a> via deres åpne API. Data er lisensiert under <a href="https://data.norge.no/nlod/" target="_blank" rel="noopener noreferrer">Norsk lisens for offentlige data (NLOD)</a>.</p>
          <h2>Kontakt</h2>
          <p>Har du spørsmål eller tilbakemeldinger? Ta kontakt via <a href="mailto:post@uppit.no">post@uppit.no</a></p>
          <p style={{marginTop: 8}}>HåndverkerPortalen drives av <a href="https://uppit.no" target="_blank" rel="noopener noreferrer">Uppit AS</a>.</p>
        </div>
      </div>
    </Layout>
  );
}
