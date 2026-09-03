// pages/index.jsx
import Head from 'next/head';
import Layout from '../components/Layout';
import HandverkerNaerDeg from '../components/HandverkerNaerDeg';
import HandverkerGuide from '../components/HandverkerGuide';
import { NAERINGSKODER, getAntallPerNaering, getBedrifterNaerDeg } from '../lib/db';
import { ARTIKLER, getLesetid } from '../lib/artikler';
import { safeJsonLd } from '../lib/jsonLd';
import styles from '../styles/Home.module.css';

const GUIDE_LABEL = {
  'hva-koster-elektriker': 'Prisguide',
  'velge-rorlegger': 'Kjøpsguide',
  'hva-koster-tomrer': 'Prisguide',
  'krav-handverkere': 'Trygghet',
};

const GUIDE_IKON = {
  'hva-koster-elektriker': 'pris',
  'velge-rorlegger': 'valg',
  'hva-koster-tomrer': 'pris',
  'krav-handverkere': 'trygghet',
};

const FAQ = [
  {
    sp: 'Er tjenesten virkelig gratis for meg?',
    sv: 'Ja — 100 % gratis å søke og se kontaktinfo, uten skjulte kostnader.',
  },
  {
    sp: 'Hvordan vet jeg at bedriften er ekte?',
    sv: 'Alle bedrifter er hentet direkte fra Brønnøysundregistrene.',
  },
  {
    sp: 'Må jeg registrere meg for å søke?',
    sv: 'Nei. Ingen konto, ingen innlogging — bare søk og ta kontakt.',
  },
];

function GuideIkon({ type }) {
  if (type === 'valg') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 4v5c0 5-3 8.5-7 9-4-.5-7-4-7-9V7l7-4z" stroke="#2563EB" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'trygghet') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2563EB" strokeWidth="1.8" />
        <path d="M8 9h8M8 12.5h5" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 16l1.3 1.3L11.5 15" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="#2563EB" strokeWidth="1.8" />
      <path d="M12 7v10M9.5 9.2c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7c0 2.2-5 1.1-5 3.3 0 1 1 1.7 2.5 1.7s2.5-.7 2.5-1.7" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Home({ antallPerNaering, standardBedrifter }) {
  const totalBedrifter = Object.values(antallPerNaering).reduce((a, b) => a + b, 0);
  const guider = ARTIKLER.slice(0, 4);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(item => ({
      '@type': 'Question',
      name: item.sp,
      acceptedAnswer: { '@type': 'Answer', text: item.sv },
    })),
  };

  return (
    <Layout>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
        />
      </Head>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroGlowA} />
        <div className={styles.heroGlowB} />
        <div className={styles.heroDots} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Gratis tjeneste · ingen registrering
          </div>
          <h1 className={styles.title}>Har du en jobb som<br />må <span>gjøres</span>?</h1>
          <p className={styles.sub}>
            Fortell oss hva du trenger og hvor — så viser vi deg håndverkere i ditt område.
          </p>
        </div>
      </section>

      {/* GUIDE (flyter opp over heroen) */}
      <HandverkerGuide />

      {/* TRUST STRIP */}
      <div className={styles.trustStrip}>
        <div className="container">
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck}>✓</span>
              <span className={styles.trustText}>Sjekket mot Brønnøysundregisteret</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck}>✓</span>
              <span className={styles.trustText}>100 % gratis, alltid</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck}>✓</span>
              <span className={styles.trustText}>Ingen spam, ingen forpliktelser</span>
            </div>
            <div className={styles.trustItem}>
              <span className={styles.trustCheck}>✓</span>
              <span className={styles.trustText}>Alle {totalBedrifter.toLocaleString('no')}+ bedrifter i 357 kommuner</span>
            </div>
          </div>
        </div>
      </div>

      {/* SLIK FUNGERER DET */}
      <section className={styles.stegSection}>
        <div className="container">
          <div className={styles.stegHeader}>
            <h2 className={styles.stegTitle}>Slik fungerer det</h2>
          </div>
          <div className={styles.stegRad}>
            <div className={styles.stegLinje} />
            <div className={styles.stegGrid}>
              <div className={styles.steg}>
                <div className={styles.stegNum}>1</div>
                <div className={styles.stegKort}>
                  <div className={styles.stegKortTitle}>Fortell oss hva du trenger</div>
                  <div className={styles.stegKortDesc}>Velg bransje og sted — tar under ett minutt.</div>
                </div>
              </div>
              <div className={styles.steg}>
                <div className={styles.stegNum}>2</div>
                <div className={styles.stegKort}>
                  <div className={styles.stegKortTitle}>Vi viser deg håndverkere nær deg</div>
                  <div className={styles.stegKortDesc}>Ekte, registrerte bedrifter — ingen useriøse aktører.</div>
                </div>
              </div>
              <div className={styles.steg}>
                <div className={styles.stegNum}>3</div>
                <div className={styles.stegKort}>
                  <div className={styles.stegKortTitle}>Ta kontakt direkte</div>
                  <div className={styles.stegKortDesc}>Ingen mellomledd, ingen gebyr. Du velger selv.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KATEGORIER */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.secHeader}>
            <h2 className={styles.secTitle}>Søk etter bransje</h2>
            <a href="/bransjer" className={styles.secLink}>Se alle →</a>
          </div>
          <div className={styles.katGrid}>
            {NAERINGSKODER.map(n => (
              <a key={n.slug} href={`/${n.slug}`} className={styles.kat}>
                <div className={styles.katIcon}>{n.icon}</div>
                <div className={styles.katInfo}>
                  <div className={styles.katName}>{n.visningsnavn}</div>
                  <div className={styles.katCount}>
                    {(antallPerNaering[n.kode] || 0).toLocaleString('no')} bedrifter
                  </div>
                </div>
                <span className={styles.katArr}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* GUIDER / PRISINNHOLD */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.secHeader}>
            <h2 className={styles.secTitle}>Lurer du på hva det bør koste?</h2>
            <a href="/artikler" className={styles.secLink}>Alle guider →</a>
          </div>
          <div className={styles.guiderGrid}>
            {guider.map(a => (
              <a key={a.slug} href={`/artikler/${a.slug}`} className={styles.guideKort}>
                <div className={styles.guideBar} />
                <div className={styles.guideIcon}><GuideIkon type={GUIDE_IKON[a.slug]} /></div>
                <div className={styles.guideLabel}>{GUIDE_LABEL[a.slug]}</div>
                <div className={styles.guideTittel}>{a.tittel}</div>
                <div className={styles.guideLesetid}>{getLesetid(a)} min lesetid</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HÅNDVERKERE NÆR DEG */}
      <HandverkerNaerDeg standardBedrifter={standardBedrifter} standardKommuneNavn="Oslo" />

      {/* FAQ */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.faqWrap}>
            <div className={styles.faqHeader}>
              <h2 className={styles.faqTitle}>Vanlige spørsmål</h2>
            </div>
            <div className={styles.faqListe}>
              {FAQ.map((item, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqSpm}>{item.sp}</summary>
                  <p className={styles.faqSvar}>{item.sv}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUNN: sekundær B2B-strip */}
      <div className={styles.bunnWrap}>
        <div className="container">
          <div className={styles.bunn}>
            <div className={styles.bunnTekst}>
              Er du håndverker selv? <strong>Få synlig profil på HåndverkerPortalen — gratis.</strong>
            </div>
            <a href="/for-bedrifter" className={styles.bunnBtn}>For bedrifter →</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const antallPerNaering = await getAntallPerNaering();
  const standardBedrifter = await getBedrifterNaerDeg('0301');

  return {
    props: {
      antallPerNaering,
      standardBedrifter,
    },
    revalidate: 86400,
  };
}
