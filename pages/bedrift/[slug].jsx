// pages/bedrift/[slug].jsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BedriftKort from '../../components/BedriftKort';
import Annonse from '../../components/Annonse';
import { getBedriftBySlug, getRelaterteBedrifter, getNaeringByKode, getAlleBedriftSlugs } from '../../lib/db';
import { getAnnonsorForBransje } from '../../lib/annonsorer';
import styles from '../../styles/Bedrift.module.css';
import { genererBeskrivelse, genererBedriftFaq } from '../../lib/genererBeskrivelse';
import { safeJsonLd } from '../../lib/jsonLd';
import { sporHendelse } from '../../lib/gtag';
import { sporInternHendelse } from '../../lib/internAnalytics';
import Kart from '../../components/Kart';

const BASE_URL = 'https://haandverkerportalen.no';

// Kartlegger til spesifikke schema.org-typer der de finnes, ellers en generisk håndverkertype
const SCHEMA_TYPE = {
  '43.210': 'Electrician',
  '43.221': 'Plumber',
  '43.222': 'Plumber',
  '43.223': 'Plumber',
  '41.000': 'GeneralContractor',
  '43.340': 'HousePainter',
  '43.910': 'RoofingContractor',
};

export default function BedriftSide({ bedrift, relaterte, annonsor }) {
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
  const faq = genererBedriftFaq(bedrift, naering?.visningsnavn);
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

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': SCHEMA_TYPE[bedrift.naeringskode] || 'HomeAndConstructionBusiness',
    name: bedrift.navn,
    identifier: bedrift.organisasjonsnummer,
    taxID: bedrift.organisasjonsnummer,
    address: {
      '@type': 'PostalAddress',
      ...(bedrift.adresse && { streetAddress: bedrift.adresse }),
      ...(bedrift.postnummer && { postalCode: bedrift.postnummer }),
      ...(bedrift.poststed && { addressLocality: bedrift.poststed }),
      addressCountry: 'NO',
    },
    ...(bedrift.hjemmeside && {
      url: bedrift.hjemmeside.startsWith('http') ? bedrift.hjemmeside : `https://${bedrift.hjemmeside}`,
    }),
    ...(bedrift.stiftelsesdato && { foundingDate: bedrift.stiftelsesdato }),
    ...(bedrift.antall_ansatte != null && { numberOfEmployees: bedrift.antall_ansatte }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/bedrift/${bedrift.slug}` },
  };

  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.sp,
      acceptedAnswer: { '@type': 'Answer', text: item.sv },
    })),
  } : null;

  return (
    <Layout
      title={`${bedrift.navn} – ${naering?.visningsnavn || 'Håndverker'} i ${bedrift.kommune}`}
      description={`${bedrift.navn} er en ${naering?.visningsnavn?.toLowerCase() || 'håndverker'}-bedrift i ${bedrift.poststed}. Org.nr: ${bedrift.organisasjonsnummer}.`}
      canonical={`/bedrift/${bedrift.slug}`}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
          />
        )}
      </Head>

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

            {faq.length > 0 && (
              <div className={styles.boks}>
                <h2 className={styles.faqTitle}>Ofte stilte spørsmål</h2>
                <div className={styles.faqListe}>
                  {faq.map((item, i) => (
                    <details key={i} className={styles.faqItem}>
                      <summary className={styles.faqSpm}>{item.sp}</summary>
                      <p className={styles.faqSvar}>{item.sv}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <Annonse annonsor={annonsor} variant="bred" bransjeSlug={naering?.slug} />

            {relaterte.length > 0 && (
              <div className={styles.relaterteSection}>
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
                  onClick={() => {
                    sporHendelse('bedrift_outbound_click', {
                      bedrift_navn: bedrift.navn,
                      bedrift_orgnr: bedrift.organisasjonsnummer,
                      bedrift_bransje: bedrift.naeringskode_tekst,
                      bedrift_kommune: bedrift.kommune,
                      link_url: bedrift.hjemmeside,
                    });
                    sporInternHendelse(`/_klikk/bedrift/${bedrift.slug}`);
                  }}
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
              <div className={styles.forBedrifterBoks}>
                <strong>Er dette bedriften din?</strong>
                <p>Bli fremhevet øverst i søkeresultatene og vis frem det dere er best på.</p>
                <ul className={styles.forBedrifterListe}>
                  <li>✓ Øverst i søkeresultatene</li>
                  <li>✓ Bilder, logo og beskrivelse</li>
                  <li>✓ Spesialiteter for mer treffsikre søk</li>
                </ul>
                <a href="/for-bedrifter" className={`btn btn--primary ${styles.forBedrifterBtn}`}>
                  Se hva vi tilbyr →
                </a>
              </div>
            </div>
            <Annonse annonsor={annonsor} variant="kompakt" bransjeSlug={naering?.slug} />
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const bedrift = await getBedriftBySlug(params.slug);
  if (!bedrift) return { notFound: true };
  const relaterte = await getRelaterteBedrifter(bedrift.naeringskode, bedrift.kommunenummer, bedrift.slug);
  const naering = getNaeringByKode(bedrift.naeringskode);
  const annonsor = await getAnnonsorForBransje(naering?.slug);
  return {
    props: { bedrift, relaterte, annonsor },
    revalidate: 86400,
  };
}
