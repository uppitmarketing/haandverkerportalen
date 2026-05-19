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

  const kommuner = KOMMUNER.map(k => ({
    ...k,
    fylke: getFylke(k.nummer),
  }));

  return {
    props: { naering, kommuner },
    revalidate: 86400,
  };
}

function getFylke(nummer) {
  const fylker = {
    '0301': 'Oslo',
    '3101': 'Østfold', '3103': 'Østfold', '3105': 'Østfold', '3107': 'Østfold',
    '3201': 'Akershus', '3203': 'Akershus', '3205': 'Akershus', '3207': 'Akershus',
    '3209': 'Akershus', '3222': 'Akershus',
    '3301': 'Buskerud', '3303': 'Buskerud', '3305': 'Buskerud',
    '3403': 'Innlandet', '3405': 'Innlandet', '3407': 'Innlandet', '3420': 'Innlandet',
    '3801': 'Vestfold', '3805': 'Vestfold', '3807': 'Vestfold', '3809': 'Vestfold',
    '3901': 'Telemark', '3903': 'Telemark',
    '4202': 'Agder', '4203': 'Agder', '4204': 'Agder', '4223': 'Agder',
    '1101': 'Rogaland', '1103': 'Rogaland', '1106': 'Rogaland', '1108': 'Rogaland',
    '1124': 'Rogaland', '1149': 'Rogaland',
    '4601': 'Vestland', '4620': 'Vestland', '4626': 'Vestland', '4630': 'Vestland',
    '1505': 'Møre og Romsdal', '1506': 'Møre og Romsdal', '1507': 'Møre og Romsdal',
    '5001': 'Trøndelag', '5006': 'Trøndelag', '5035': 'Trøndelag', '5037': 'Trøndelag',
    '1804': 'Nordland', '1806': 'Nordland', '1833': 'Nordland',
    '5401': 'Troms', '5402': 'Troms',
    '5501': 'Finnmark',
  };
  return fylker[nummer] || '';
}
