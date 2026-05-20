// pages/index.jsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BedriftKort from '../components/BedriftKort';
import { NAERINGSKODER, POPULAERE_SOK, getAntallPerNaering } from '../lib/db';
import { supabase } from '../lib/supabase';
import styles from '../styles/Home.module.css';

export default function Home({ antallPerNaering, sisteOslo }) {
  const router = useRouter();
  const [navn, setNavn] = useState('');

  function handleSok(e) {
    e.preventDefault();
    if (navn) {
      router.push(`/sok?q=${encodeURIComponent(navn)}`);
    }
  }

  const totalBedrifter = Object.values(antallPerNaering).reduce((a, b) => a + b, 0);

  return (
    <Layout>
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>Norges håndverkerregister</p>
          <h1 className={styles.title}>
            Finn den <span>rette</span> håndverkeren
          </h1>
          <p className={styles.sub}>
            Søk blant {totalBedrifter.toLocaleString('no')}+ verifiserte bedrifter i hele Norge
          </p>

          <form onSubmit={handleSok} className={styles.searchWrap}>
            <div className={styles.searchBar}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Bedriftsnavn eller bransje..."
                value={navn}
                onChange={e => setNavn(e.target.value)}
              />
              <button type="submit" className={styles.searchBtn}>Søk →</button>
            </div>

            <div className={styles.popular}>
              <span className={styles.popLabel}>Populære:</span>
              {POPULAERE_SOK.map(s => (
                <a key={s.href} href={s.href} className={styles.popChip}>{s.label}</a>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* STATS */}
      <div className={styles.statsStrip}>
        <div className="container">
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>{totalBedrifter.toLocaleString('no')}+</div>
              <div className={styles.statLabel}>Bedrifter</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>357</div>
              <div className={styles.statLabel}>Kommuner</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>{NAERINGSKODER.length}</div>
              <div className={styles.statLabel}>Bransjer</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>100%</div>
              <div className={styles.statLabel}>Gratis</div>
            </div>
          </div>
        </div>
      </div>

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

      {/* SISTE FRA OSLO */}
      {sisteOslo.length > 0 && (
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <div className="container">
            <div className={styles.secHeader}>
              <h2 className={styles.secTitle}>Elektrikere i Oslo</h2>
              <a href="/elektriker/oslo" className={styles.secLink}>Se alle →</a>
            </div>
            <div className={styles.bedGrid}>
              {sisteOslo.map(b => (
                <BedriftKort key={b.organisasjonsnummer} bedrift={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <div className={styles.ctaWrap}>
        <div className="container">
          <div className={styles.cta}>
            <div>
              <p className={styles.ctaEy}>For bedrifter</p>
              <h2 className={styles.ctaTitle}>Er du håndverker?</h2>
              <p className={styles.ctaDesc}>Få din bedrift fremhevet øverst i søkeresultatene.</p>
            </div>
            <a href="/for-bedrifter" className="btn btn--primary">Få fremhevet profil →</a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const antallPerNaering = await getAntallPerNaering();

  const { data: sisteOslo } = await supabase
    .from('bedrifter')
    .select('*')
    .eq('naeringskode', '43.210')
    .eq('kommunenummer', '0301')
    .eq('er_aktiv', true)
    .order('navn')
    .limit(3);

  return {
    props: {
      antallPerNaering,
      sisteOslo: sisteOslo || [],
    },
    revalidate: 86400,
  };
}
