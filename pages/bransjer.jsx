// pages/bransjer.jsx
import Layout from '../components/Layout';
import { NAERINGSKODER } from '../lib/db';
import styles from '../styles/NaeringIndex.module.css';

export default function BransjerSide() {
  return (
    <Layout
      title="Alle håndverksbransjer"
      description="Oversikt over alle håndverksbransjer i Norge. Finn elektriker, rørlegger, tømrer, maler og mer."
    >
      <section className={styles.hero}>
        <div className="container">
          <nav className="breadcrumb">
            <a href="/">Forside</a>
            <span className="breadcrumb__sep">/</span>
            <span>Bransjer</span>
          </nav>
          <h1 className={styles.heroTitle}>Alle bransjer</h1>
          <p className={styles.heroDesc}>Velg bransje for å finne håndverkere i din kommune.</p>
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
                </div>
                <span className={styles.kommuneArr}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
