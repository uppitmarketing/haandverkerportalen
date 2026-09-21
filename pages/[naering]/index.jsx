// pages/[naering]/index.jsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { NAERINGSKODER, KOMMUNER, getNaeringBySlug, getAntallPerNaering, getKommunerRangertForNaering } from '../../lib/db';
import { getBransjeInnsikt, getBransjeFlertall } from '../../lib/bransjeInnsikt';
import { getArtiklerForBransje, getGenerelleArtikler } from '../../lib/artikler';
import { safeJsonLd } from '../../lib/jsonLd';
import { BransjeIkon } from '../../components/icons';
import styles from '../../styles/NaeringIndex.module.css';

const BASE_URL = 'https://haandverkerportalen.no';

export default function NaeringIndexSide({ naering, kommuner, populaereKommuner, total }) {
  const router = useRouter();
  if (router.isFallback) return <Layout title="Laster..."><div style={{padding:'80px 40px',textAlign:'center'}}>Laster...</div></Layout>;
  if (!naering) return <Layout title="Ikke funnet"><div style={{padding:'80px 40px',textAlign:'center'}}>Ikke funnet</div></Layout>;

  const innsikt = getBransjeInnsikt(naering.slug);
  const navnFlertall = getBransjeFlertall(naering.slug, naering.visningsnavn);
  const relevanteArtikler = [...getArtiklerForBransje(naering.slug), ...getGenerelleArtikler()];

  const faq = [
    {
      sp: `Hvor mange ${navnFlertall} er registrert på HåndverkerPortalen?`,
      sv: `Vi har ${total.toLocaleString('no')} registrerte ${navnFlertall} fordelt over hele Norge, hentet direkte fra Brønnøysundregistrene.`,
    },
    {
      sp: `Er det gratis å søke opp ${navnFlertall}?`,
      sv: `Ja, det er 100 % gratis å søke og se kontaktinformasjon — ingen registrering eller skjulte kostnader.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
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
      { '@type': 'ListItem', position: 2, name: naering.visningsnavn, item: `${BASE_URL}/${naering.slug}` },
    ],
  };

  return (
    <Layout
      title={`${naering.visningsnavn} i Norge`}
      description={`Finn ${naering.visningsnavn.toLowerCase()} i din kommune. ${total} registrerte bedrifter i hele Norge.`}
      canonical={`/${naering.slug}`}
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
            <span>{naering.visningsnavn}</span>
          </nav>
          <div className={styles.heroIcon}><BransjeIkon slug={naering.slug} size={28} /></div>
          <h1 className={styles.heroTitle}>{naering.visningsnavn} i Norge</h1>
          <p className={styles.heroDesc}>
            Velg din kommune for å se alle registrerte {navnFlertall} i ditt område.
            {' '}Totalt <strong>{total.toLocaleString('no')} registrerte bedrifter</strong> i hele Norge.
          </p>
        </div>
      </section>

      {populaereKommuner.length > 0 && (
        <div className="container">
          <div className={styles.section} style={{ paddingBottom: 24 }}>
            <h2 className={styles.secTitle}>Mest populære byer for {navnFlertall}</h2>
            <div className={styles.kommuneGrid}>
              {populaereKommuner.map(k => (
                <a
                  key={k.slug}
                  href={`/${naering.slug}/${k.slug}`}
                  className={styles.kommuneKort}
                >
                  <div className={styles.kommuneInfo}>
                    <div className={styles.kommuneNavn}>{naering.visningsnavn} i {k.navn}</div>
                    <div className={styles.kommuneFylke}>{k.antallBedrifter} registrerte bedrifter</div>
                  </div>
                  <span className={styles.kommuneArr}>→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className={styles.section}>
          <h2 className={styles.secTitle}>Velg kommune</h2>
          <div className={styles.kommuneGrid}>
            {kommuner.map(k => (
              <a
                key={k.slug}
                href={`/${naering.slug}/${k.slug}`}
                className={styles.kommuneKort}
              >
                <div className={styles.kommuneInfo}>
                  <div className={styles.kommuneNavn}>{naering.visningsnavn} i {k.navn}</div>
                  <div className={styles.kommuneFylke}>{k.fylke || ''}</div>
                </div>
                <span className={styles.kommuneArr}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.seoTekst}>
        <div className="container--narrow">
          <h2>Hva koster en {naering.visningsnavn.toLowerCase()}?</h2>
          <p>{innsikt.prisTekst}</p>
          <h2>Slik finner du riktig {naering.visningsnavn.toLowerCase()}</h2>
          <ul>
            {innsikt.punkter.map((punkt, i) => <li key={i}>{punkt}</li>)}
          </ul>
        </div>
      </section>

      {relevanteArtikler.length > 0 && (
        <section className={styles.guider}>
          <div className="container--narrow">
            <h2 className={styles.secTitle}>Nyttige guider</h2>
            <div className={styles.guiderGrid}>
              {relevanteArtikler.map(a => (
                <a key={a.slug} href={`/artikler/${a.slug}`} className={styles.guideKort}>
                  <span>{a.tittel}</span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.faq}>
        <div className="container--narrow">
          <h2 className={styles.faqTitle}>Vanlige spørsmål</h2>
          <div className={styles.faqListe}>
            {faq.map((item, i) => (
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

export async function getStaticPaths() {
  const paths = NAERINGSKODER.map(n => ({ params: { naering: n.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const naering = getNaeringBySlug(params.naering);
  if (!naering) return { notFound: true };

  const antallPerNaering = await getAntallPerNaering();
  const total = antallPerNaering[naering.kode] || 0;
  const populaereKommuner = await getKommunerRangertForNaering(naering.slug);

  return {
    props: { naering, kommuner: KOMMUNER, populaereKommuner, total },
    revalidate: 86400,
  };
}
