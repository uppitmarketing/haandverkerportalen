// pages/[naering]/index.jsx
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { NAERINGSKODER, KOMMUNER, getNaeringBySlug } from '../../lib/db';
import styles from '../../styles/NaeringIndex.module.css';

export default function NaeringIndexSide({ naering, kommuner }) {
  const router = useRouter();
  if (router.isFallback) return <Layout title="Laster..."><div style={{padding:'80px 40px',textAlign:'center'}}>Laster...</div></Layout>;
  if (!naering) return <Layout title="Ikke funnet"><div style={{padding:'80px 40px',textAlign:'center'}}>Ikke funnet</div></Layout>;

  return (
    <Layout
      title={`${naering.visningsnavn} i Norge`}
      description={`Finn ${naering.visningsnavn.toLowerCase()} i din kommune. Oversikt over alle kommuner i Norge.`}
      canonical={`/${naering.slug}`}
    >
      <section className={styles.hero}>
        <div className="container">
          <nav className="breadcrumb">
            <a href="/">Forside</a>
            <span className="breadcrumb__sep">/</span>
            <span>{naering.visningsnavn}</span>
          </nav>
          <div className={styles.heroIcon}>{naering.icon}</div>
          <h1 className={styles.heroTitle}>{naering.visningsnavn} i Norge</h1>
          <p className={styles.heroDesc}>
            Velg din kommune for å se alle registrerte {naering.visningsnavn.toLowerCase()}er i ditt område.
          </p>
        </div>
      </section>

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
                <div className={styles.kommuneNavn}>{k.navn}</div>
                <div className={styles.kommuneFylke}>{k.fylke || ''}</div>
                <span className={styles.kommuneArr}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
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

  return {
    props: { naering, kommuner: KOMMUNER },
    revalidate: 86400,
  };
}
