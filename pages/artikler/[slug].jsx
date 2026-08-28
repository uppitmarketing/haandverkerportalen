// pages/artikler/[slug].jsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { ARTIKLER, getArtikkelBySlug, getAlleArtikkelSlugs } from '../../lib/artikler';
import { getNaeringBySlug } from '../../lib/db';
import styles from '../../styles/Artikkel.module.css';

const BASE_URL = 'https://haandverkerportalen.no';

export default function ArtikkelSide({ artikkel }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Laster...">
        <div style={{ padding: '80px 40px', textAlign: 'center', color: '#6B7280' }}>Laster...</div>
      </Layout>
    );
  }

  if (!artikkel) {
    return (
      <Layout title="Ikke funnet">
        <div style={{ padding: '80px 40px', textAlign: 'center' }}>Artikkelen ble ikke funnet.</div>
      </Layout>
    );
  }

  const naering = artikkel.bransjeSlug ? getNaeringBySlug(artikkel.bransjeSlug) : null;
  const canonicalPath = `/artikler/${artikkel.slug}`;
  const andreArtikler = ARTIKLER.filter(a => a.slug !== artikkel.slug).slice(0, 3);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: artikkel.faq.map(item => ({
      '@type': 'Question',
      name: item.sp,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.sv,
      },
    })),
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artikkel.tittel,
    description: artikkel.ingress,
    datePublished: artikkel.publisert,
    dateModified: artikkel.oppdatert || artikkel.publisert,
    author: { '@type': 'Organization', name: 'HåndverkerPortalen' },
    publisher: {
      '@type': 'Organization',
      name: 'HåndverkerPortalen',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}${canonicalPath}` },
  };

  return (
    <Layout
      title={artikkel.tittel}
      description={artikkel.ingress}
      canonical={canonicalPath}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <section className={styles.hero}>
        <div className="container--narrow">
          <nav className="breadcrumb">
            <a href="/">Forside</a>
            <span className="breadcrumb__sep">/</span>
            <a href="/artikler">Guider</a>
            <span className="breadcrumb__sep">/</span>
            <span>{artikkel.tittel}</span>
          </nav>
          <span className={styles.bransjeTag}>{artikkel.bransje}</span>
          <h1 className={styles.title}>{artikkel.tittel}</h1>
          <p className={styles.ingress}>{artikkel.ingress}</p>
          <div className={styles.meta}>
            Oppdatert {formatDato(artikkel.oppdatert || artikkel.publisert)}
          </div>
        </div>
      </section>

      <article className={styles.body}>
        <div className="container--narrow">
          {artikkel.seksjoner.map((seksjon, i) => (
            <div key={i}>
              <h2>{seksjon.heading}</h2>
              {seksjon.avsnitt?.map((p, j) => <p key={j}>{p}</p>)}
              {seksjon.liste && (
                <ul>
                  {seksjon.liste.map((item, k) => <li key={k}>{item}</li>)}
                </ul>
              )}
            </div>
          ))}

          {naering && (
            <div className={styles.cta}>
              <div className={styles.ctaText}>
                <strong>Trenger du {naering.visningsnavn.toLowerCase()}?</strong>
                Søk blant verifiserte {naering.visningsnavn.toLowerCase()}bedrifter i din kommune.
              </div>
              <a href={`/${naering.slug}`} className="btn btn--primary">
                Finn {naering.visningsnavn.toLowerCase()} →
              </a>
            </div>
          )}
        </div>
      </article>

      <section className={styles.faq}>
        <div className="container--narrow">
          <h2 className={styles.faqTitle}>Ofte stilte spørsmål</h2>
          <div className={styles.faqListe}>
            {artikkel.faq.map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqSpm}>{item.sp}</summary>
                <p className={styles.faqSvar}>{item.sv}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {andreArtikler.length > 0 && (
        <section className={styles.andreGuider}>
          <div className="container--narrow">
            <h2 className={styles.andreGuiderTitle}>Flere guider</h2>
            <div className={styles.andreGuiderGrid}>
              {andreArtikler.map(a => (
                <a key={a.slug} href={`/artikler/${a.slug}`} className={styles.andreGuiderKort}>
                  <span>{a.tittel}</span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

function formatDato(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('no', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function getStaticPaths() {
  const paths = getAlleArtikkelSlugs().map(slug => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const artikkel = getArtikkelBySlug(params.slug);
  if (!artikkel) return { notFound: true };
  return {
    props: { artikkel },
    revalidate: 86400,
  };
}
