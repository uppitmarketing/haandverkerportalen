// pages/sok.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BedriftKort from '../components/BedriftKort';
import { NAERINGSKODER, KOMMUNER, sokBedrifter } from '../lib/db';
import styles from '../styles/Sok.module.css';

export default function SokSide() {
  const router = useRouter();
  const { navn, kode, kommune } = router.query;

  const [resultater, setResultater] = useState([]);
  const [laster, setLaster] = useState(false);
  const [sokt, setSokt] = useState(false);

  const [navnInput, setNavnInput] = useState('');
  const [kodeInput, setKodeInput] = useState('');
  const [kommuneInput, setKommuneInput] = useState('');

  useEffect(() => {
    if (!router.isReady) return;
    if (navn) setNavnInput(navn);
    if (kode) setKodeInput(kode);
    if (kommune) setKommuneInput(kommune);
    if (navn || kode || kommune) {
      utforSok({ navn, kode, kommune });
    }
  }, [router.isReady, navn, kode, kommune]);

  async function utforSok(params) {
    setLaster(true);
    setSokt(true);
    const data = await sokBedrifter({
      navn: params.navn || '',
      naeringskode: params.kode || '',
      kommunenummer: params.kommune || '',
    });
    setResultater(data);
    setLaster(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    router.push({
      pathname: '/sok',
      query: {
        ...(navnInput && { navn: navnInput }),
        ...(kodeInput && { kode: kodeInput }),
        ...(kommuneInput && { kommune: kommuneInput }),
      }
    });
  }

  return (
    <Layout
      title="Søk etter håndverkere"
      description="Søk blant 45 000+ håndverkerbedrifter i Norge."
    >
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Søk etter håndverker</h1>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>Bedriftsnavn</label>
                <input
                  type="text"
                  placeholder="F.eks. Hansen Elektro..."
                  value={navnInput}
                  onChange={e => setNavnInput(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label>Bransje</label>
                <select value={kodeInput} onChange={e => setKodeInput(e.target.value)}>
                  <option value="">Alle bransjer</option>
                  {NAERINGSKODER.map(n => (
                    <option key={n.kode} value={n.kode}>{n.icon} {n.visningsnavn}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label>Kommune</label>
                <select value={kommuneInput} onChange={e => setKommuneInput(e.target.value)}>
                  <option value="">Alle kommuner</option>
                  {KOMMUNER.map(k => (
                    <option key={k.nummer} value={k.nummer}>{k.navn}</option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn--primary">Søk →</button>
          </form>
        </div>
      </section>

      <div className="container">
        {laster && (
          <div className={styles.status}>Søker...</div>
        )}

        {!laster && sokt && resultater.length === 0 && (
          <div className={styles.ingenTreff}>
            <div className={styles.ingenIcon}>🔍</div>
            <h2>Ingen treff</h2>
            <p>Prøv et annet søk eller fjern noen filtre.</p>
          </div>
        )}

        {!laster && resultater.length > 0 && (
          <>
            <div className={styles.treffHeader}>
              <span className={styles.antall}>{resultater.length} treff</span>
            </div>
            <div className={styles.grid}>
              {resultater.map(b => (
                <BedriftKort key={b.organisasjonsnummer} bedrift={b} />
              ))}
            </div>
          </>
        )}

        {!sokt && (
          <div className={styles.start}>
            <div className={styles.startIcon}>🔨</div>
            <p>Fyll inn søkekriterier over og trykk Søk</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
