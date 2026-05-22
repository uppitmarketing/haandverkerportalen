// pages/sok.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BedriftKort from '../components/BedriftKort';
import { NAERINGSKODER, KOMMUNER, sokBedrifter } from '../lib/db';
import styles from '../styles/Sok.module.css';

const BRANSJE_SOKEORD = {
  'elektriker': '43.210', 'elektro': '43.210', 'elektrisk': '43.210',
  'rørlegger': '43.221', 'rorlegger': '43.221', 'vvs': '43.221', 'rør': '43.221',
  'tømrer': '43.320', 'tomrer': '43.320', 'snekker': '43.320', 'tømrere': '43.320',
  'maler': '43.340', 'malerfirma': '43.340', 'glass': '43.340', 'glassmester': '43.340',
  'byggmester': '41.000', 'bygg': '41.000', 'byggefirma': '41.000', 'entreprenør': '41.000',
  'taklegger': '43.910', 'tak': '43.910', 'taket': '43.910',
  'gulvlegger': '43.330', 'gulv': '43.330', 'parkett': '43.330',
  'grunnarbeid': '43.120', 'graving': '43.120', 'grunnentreprenør': '43.120',
};

function parseFrektekst(tekst) {
  if (!tekst) return { navn: '', naeringskode: '', kommunenummer: '' };
  const ord = tekst.toLowerCase().trim().split(/\s+/);
  let funnetKode = '';
  let funnetKommune = '';
  const gjenværendeOrd = [];

  for (const ord_item of ord) {
    if (!funnetKode && BRANSJE_SOKEORD[ord_item]) {
      funnetKode = BRANSJE_SOKEORD[ord_item];
      continue;
    }
    const kommune = KOMMUNER.find(k =>
      k.navn.toLowerCase() === ord_item ||
      k.slug === ord_item ||
      k.navn.toLowerCase().replace(/\s/g, '') === ord_item
    );
    if (!funnetKommune && kommune) {
      funnetKommune = kommune.nummer;
      continue;
    }
    gjenværendeOrd.push(ord_item);
  }

  return {
    naeringskode: funnetKode,
    kommunenummer: funnetKommune,
    navn: gjenværendeOrd.join(' '),
  };
}

export default function SokSide() {
  const router = useRouter();
  const { q } = router.query;

  const [query, setQuery] = useState('');
  const [resultater, setResultater] = useState([]);
  const [laster, setLaster] = useState(false);
  const [sokt, setSokt] = useState(false);
  const [parsed, setParsed] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (q) {
      setQuery(q);
      utforSok(q);
    }
  }, [router.isReady]);

  async function utforSok(q_val) {
    setLaster(true);
    setSokt(true);
    const p = parseFrektekst(q_val);
    setParsed(p);
    const data = await sokBedrifter({
      navn: p.navn || '',
      naeringskode: p.naeringskode || '',
      kommunenummer: p.kommunenummer || '',
    });
    setResultater(data);
    setLaster(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    router.push({ pathname: '/sok', query: { q: query } }, undefined, { shallow: false });
    utforSok(query);
  }

  const funnetBransje = parsed?.naeringskode
    ? NAERINGSKODER.find(n => n.kode === parsed.naeringskode)
    : null;
  const funnetKommune = parsed?.kommunenummer
    ? KOMMUNER.find(k => k.nummer === parsed.kommunenummer)
    : null;

  return (
    <Layout
      title="Søk etter håndverkere"
      description="Søk blant 45 000+ håndverkerbedrifter i Norge."
    >
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Søk etter håndverker</h1>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.mainField}>
              <input
                type="text"
                className={styles.mainInput}
                placeholder='F.eks. "elektriker oslo" eller "Hansen Elektro"'
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button type="submit" className={`btn btn--primary ${styles.searchBtn}`}>
                Søk →
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="container">
        {sokt && !laster && parsed && (funnetBransje || funnetKommune) && (
          <div className={styles.parsedInfo}>
            <span>Søkte etter:</span>
            {funnetBransje && <span className={styles.parsedTag}>{funnetBransje.icon} {funnetBransje.visningsnavn}</span>}
            {funnetKommune && <span className={styles.parsedTag}>📍 {funnetKommune.navn}</span>}
            {parsed.navn && <span className={styles.parsedTag}>🔤 "{parsed.navn}"</span>}
          </div>
        )}

        {laster && <div className={styles.status}>Søker...</div>}

        {!laster && sokt && resultater.length === 0 && (
          <div className={styles.ingenTreff}>
            <div className={styles.ingenIcon}>🔍</div>
            <h2>Ingen treff</h2>
            <p>Prøv et annet søk, f.eks. "elektriker oslo".</p>
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
            <p>Skriv inn et søk over – prøv f.eks. "elektriker oslo"</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
