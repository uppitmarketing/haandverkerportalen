// pages/bransjer.jsx
import Head from 'next/head';
import Layout from '../components/Layout';
import { NAERINGSKODER, getAntallPerNaering } from '../lib/db';
import { safeJsonLd } from '../lib/jsonLd';
import styles from '../styles/NaeringIndex.module.css';

const BASE_URL = 'https://haandverkerportalen.no';

const FAQ = [
  {
    sp: 'Hvilke håndverkerbransjer dekker HåndverkerPortalen?',
    sv: 'Vi dekker elektriker, rørlegger, tømrer, byggmester, maler, taklegger, gulvlegger og grunnarbeid — alle hentet direkte fra Brønnøysundregistrene.',
  },
  {
    sp: 'Er tjenesten gratis?',
    sv: 'Ja, det er 100 % gratis å søke opp bedrifter og se kontaktinformasjon, uten registrering.',
  },
];

export default function BransjerSide({ antallPerNaering }) {
  const totalBedrifter = Object.values(antallPerNaering).reduce((a, b) => a + b, 0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(item => ({
      '@type': 'Question',
      name: item.sp,
      acceptedAnswer: { '@type': 'Answer', text: item.sv },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Forside', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Bransjer', item: `${BASE_URL}/bransjer` },
    ],
  };

  return (
    <Layout
      title="Alle håndverksbransjer"
      description={`Oversikt over alle håndverksbransjer i Norge. ${totalBedrifter.toLocaleString('no')} registrerte bedrifter — finn elektriker, rørlegger, tømrer, maler og mer.`}
      canonical="/bransjer"
    >
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      </Head>

      <section className={styles.hero}>
        <div className="container">
          <nav className="breadcrumb">
            <a href="/">Forside</a>
            <span className="breadcrumb__sep">/</span>
            <span>Bransjer</span>
          </nav>
          <h1 className={styles.heroTitle}>Alle bransjer</h1>
          <p className={styles.heroDesc}>
            Velg bransje for å finne håndverkere i din kommune. Totalt <strong>{totalBedrifter.toLocaleString('no')} registrerte bedrifter</strong> i hele Norge, sjekket mot Brønnøysundregistrene.
          </p>
        </div>
      </section>
      <div className="container">
        <div className={styles.section}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {NAERINGSKODER.map(n => (
              <a key={n.slug} href={`/${n.slug}`} className={styles.kommuneKort}>
                <span style={{ fontSize: 24 }}>{n.icon}</span>
                <div className={styles.kommuneInfo}>
                  <div className={styles.kommuneNavn}>{n.visningsnavn}</div>
                  <div className={styles.kommuneFylke}>{(antallPerNaering[n.kode] || 0).toLocaleString('no')} bedrifter</div>
                </div>
                <span className={styles.kommuneArr}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.faq}>
        <div className="container--narrow">
          <h2 className={styles.faqTitle}>Vanlige spørsmål</h2>
          <div className={styles.faqListe}>
            {FAQ.map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqSpm}>{item.sp}</summary>
                <p className={styles.faqSvar}>{item.sv}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const antallPerNaering = await getAntallPerNaering();
  return {
    props: { antallPerNaering },
    revalidate: 86400,
  };
}
