// pages/bedrift/[slug].jsx
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BedriftKort from '../../components/BedriftKort';
import { getBedriftBySlug, getRelaterteBedrifter, getNaeringByKode, getAlleBedriftSlugs } from '../../lib/db';
import styles from '../../styles/Bedrift.module.css';
import { genererBeskrivelse } from '../../lib/genererBeskrivelse';
import Kart from '../../components/Kart';

export default function BedriftSide({ bedrift, relaterte }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Laster...">
        <div style={{ padding: '80px 40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>⏳</div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Henter bedriftsinformasjon...</div>
        </div>
      </Layout>
    );
  }

  if (!bedrift) return (
    <Layout title="Ikke funnet">
      <div style={{ padding: '80px 40px', textAlign: 'center', color: '#6B7280' }}>
        Bedriften ble ikke funnet.
      </div>
    </Layout>
  );

  const naering = getNaeringByKode(bedrift.naeringskode);
  const stiftetAar = bedrift.stiftelsesdato?.substring(0, 4);
  const status = bedrift.konkurs ? 'Konkurs' : bedrift.er_aktiv ? 'Aktiv' : 'Inaktiv';
  const beskrivelse = genererBeskrivelse(bedrift);
  const kommuneSlug = bedrift.kommune?.toLowerCase()
    .replace(/\s/g, '-')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a');

  // Bygg adressestreng for kart
  const adresseKart = [bedrift.adresse, bedrift.postnummer, bedrift.poststed]
    .filter(Boolean)
    .join(', ');

  const kartUrl = adresseKart
    ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseKart)}#map=15`
    : null;

  const kartEmbedUrl = adresseKart
    ? `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adresseKart)}&format=json&limit=1`
    : null;

  // Riktig Brreg-URL
  const brregUrl = `https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=${bedrift.organisasjonsnummer}`;

  return (
    <Layout
      title={`${bedrift.navn} – ${naering?.visningsnavn || 'Håndverker'} i ${bedrift.kommune}`}
      description={`${bedrift.navn} er en ${naering?.visningsnavn?.toLowerCase() || 'håndverker'}-bedrift i ${bedrift.poststed}. Org.nr: ${bedrift.organisasjonsnummer}.`}
      canonical={`/bedrift/${bedrift.slug}`}
    >
      <section className={styles.hero}>
        <div className="container">
          <nav className="breadcrumb">
            <a href="/">Forside</a>
            <span className="breadcrumb__sep">/</span>
            {naering && <a href={`/${naering.slug}`}>{naering.visningsnavn}</a>}
            {naering && bedrift.kommune && (
              <>
                <span className="breadcrumb__sep">/</span>
                <a href={`/${naering.slug}/${kommuneSlug}`}>{bedrift.kommune}</a>
              </>
            )}
            <span className="breadcrumb__sep">/</span>
            <span>{bedrift.navn}</span>
          </nav>

          <div className={styles.heroInner}>
            <div className={styles.heroIcon}>{naering?.icon || '🏗️'}</div>
            <div>
              <div className={styles.tagger}>
                <span className={`tag ${bedrift.er_aktiv && !bedrift.konkurs ? 'tag--green' : 'tag--red'}`}>{status}</span>
                {naering && <span className="tag tag--blue">{naering.visningsnavn}</span>}
                {bedrift.mva_registrert && <span className="tag tag--muted">MVA-reg.</span>}
              </div>
              <h1 className={styles.navn}>{bedrift.navn}</h1>
              <p className={styles.adresse}>
                {bedrift.adresse ? `${bedrift.adresse}, ` : ''}{bedrift.postnummer} {bedrift.poststed}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className={styles.layout}>
          <main className={styles.main}>

            {beskrivelse && (
              <div className={styles.boks}>
                <p className={styles.beskrivelse}>{beskrivelse}</p>
              </div>
            )}
            <div className={styles.boks}>
              <h2 className={styles.boksTitle}>Om bedriften</h2>
              <dl className={styles.detaljer}>
                {[
                  ['Firmanavn', bedrift.navn],
                  ['Org.nummer', bedrift.organisasjonsnummer],
                  ['Organisasjonsform', bedrift.organisasjonsform],
                  ['Bransje', `${bedrift.naeringskode_tekst} (${bedrift.naeringskode})`],
                  ['Ansatte', bedrift.antall_ansatte != null ? bedrift.antall_ansatte : 'Ikke oppgitt'],
                  ['Stiftet', stiftetAar || '—'],
                  ['Status', status],
                ].map(([label, verdi]) => verdi ? (
                  <div key={label} className={styles.rad}>
                    <dt>{label}</dt>
                    <dd>{verdi}</dd>
                  </div>
                ) : null)}
              </dl>
            </div>

            <div className={styles.boks}>
              <h2 className={styles.boksTitle}>Adresse og kart</h2>
              <p className={styles.adresseTekst}>
                {bedrift.adresse && <span>{bedrift.adresse}<br /></span>}
                {bedrift.postnummer} {bedrift.poststed}<br />
                {bedrift.kommune} kommune
              </p>
              <Kart adresse={bedrift.adresse} postnummer={bedrift.postnummer} poststed={bedrift.poststed} />
            </div>

            <div className={styles.annonse}>
              📢 Annonseplass – relaterte tjenester
            </div>
          </main>

          <aside className={styles.aside}>
            <div className={styles.kontaktBoks}>
              <h2 className={styles.boksTitle}>Kontakt</h2>
              {bedrift.hjemmeside ? (
                <a
                  href={bedrift.hjemmeside.startsWith('http') ? bedrift.hjemmeside : `https://${bedrift.hjemmeside}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn--primary ${styles.kontaktBtn}`}
                >
                  🌐 Gå til nettside
                </a>
              ) : (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(bedrift.navn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.googleLenke}
                >
                  Finn nettside via Google →
                </a>
              )}
              <a
                href={brregUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn--outline ${styles.brregBtn}`}
              >
                Se på Brreg.no →
              </a>
              <div className={styles.erDuEier}>
                <strong>Er du eier?</strong>
                <p>Krev inn profilen og legg til kontaktinfo og bilder.</p>
                <a href="/for-bedrifter" className={styles.kreverLink}>Krev inn profil →</a>
              </div>
            </div>

            {relaterte.length > 0 && (
              <div>
                <h3 className={styles.relTitle}>
                  Andre {naering?.visningsnavn?.toLowerCase()}er i {bedrift.kommune}
                </h3>
                <div className={styles.relGrid}>
                  {relaterte.map(b => <BedriftKort key={b.organisasjonsnummer} bedrift={b} />)}
                </div>
                {naering && (
                  <a href={`/${naering.slug}/${kommuneSlug}`} className={styles.seAlle}>
                    Se alle i {bedrift.kommune} →
                  </a>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const bedrift = await getBedriftBySlug(params.slug);
  if (!bedrift) return { notFound: true };
  const relaterte = await getRelaterteBedrifter(bedrift.naeringskode, bedrift.kommunenummer, bedrift.slug);
  return {
    props: { bedrift, relaterte },
    revalidate: 86400,
  };
}
