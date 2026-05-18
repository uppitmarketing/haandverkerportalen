// pages/[naering]/[kommune].jsx
import Layout from '../../components/Layout';
import BedriftKort from '../../components/BedriftKort';
import { NAERINGSKODER, getBedrifterByKategoriOgKommune, getNaeringBySlug } from '../../lib/db';
import styles from '../../styles/Kategori.module.css';

export default function KategoriSide({ bedrifter, naering, kommune, total }) {
  if (!naering) return <div>Ikke funnet</div>;

  const tittel = `${naering.visningsnavn} i ${kommune}`;

  return (
    <Layout
      title={tittel}
      description={`Finn ${naering.visningsnavn.toLowerCase()} i ${kommune}. ${total} registrerte bedrifter. Verifisert mot Brønnøysundregistrene.`}
      canonical={`/${naering.slug}/${kommune.toLowerCase().replace(/\s/g, '-')}`}
    >
      {/* HERO */}
      <section className={styles.hero}>
        <div className="container">
          <nav className="breadcrumb">
            <a href="/">Forside</a>
            <span className="breadcrumb__sep">/</span>
            <a href={`/${naering.slug}`}>{naering.visningsnavn}</a>
            <span className="breadcrumb__sep">/</span>
            <span>{kommune}</span>
          </nav>
          <div className={styles.heroInner}>
            <div>
              <div className={styles.heroIcon}>{naering.icon}</div>
              <h1 className={styles.heroTitle}>{naering.visningsnavn} i {kommune}</h1>
              <p className={styles.heroDesc}>
                <strong>{total} registrerte bedrifter</strong> innen {naering.visningsnavn.toLowerCase()} i {kommune}.
                Data fra Brønnøysundregistrene.
              </p>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{total}</span>
                <span className={styles.heroStatLabel}>Bedrifter</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{bedrifter.filter(b => b.er_aktiv).length}</span>
                <span className={styles.heroStatLabel}>Aktive</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{bedrifter.filter(b => b.hjemmeside).length}</span>
                <span className={styles.heroStatLabel}>Med nettside</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANNONSE */}
      <div className="container">
        <div className={styles.annonse}>
          📢 Annonseplass – {naering.visningsnavn} i {kommune}
        </div>
      </div>

      {/* BEDRIFTER */}
      <section className={styles.bedrifterSection}>
        <div className="container">
          <div className={styles.secHeader}>
            <h2 className={styles.secTitle}>Alle {naering.visningsnavn.toLowerCase()}er i {kommune}</h2>
            <span className={styles.antall}>{total} bedrifter</span>
          </div>
          {bedrifter.length > 0 ? (
            <div className={styles.grid}>
              {bedrifter.map(b => (
                <BedriftKort key={b.organisasjonsnummer} bedrift={b} />
              ))}
            </div>
          ) : (
            <div className={styles.tomt}>Ingen bedrifter funnet for denne kombinasjonen.</div>
          )}
        </div>
      </section>

      {/* SEO-TEKST */}
      <section className={styles.seoTekst}>
        <div className="container--narrow">
          <h2>Hva koster en {naering.visningsnavn.toLowerCase()} i {kommune}?</h2>
          <p>
            Priser for {naering.visningsnavn.toLowerCase()} i {kommune} varierer avhengig av oppdragets
            omfang og kompleksitet. Timeprisen ligger typisk mellom 600 og 1200 kroner inkl. mva.
            Innhent alltid minst tre tilbud før du bestemmer deg.
          </p>
          <h2>Slik finner du riktig {naering.visningsnavn.toLowerCase()}</h2>
          <ul>
            <li>Sjekk at bedriften er aktiv i Brønnøysundregistrene</li>
            <li>Be om referanser fra tidligere oppdrag</li>
            <li>Krev skriftlig tilbud med spesifisert pris</li>
            <li>Kontroller nødvendige sertifiseringer for jobben</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className="container--narrow">
          <h2 className={styles.faqTitle}>Vanlige spørsmål</h2>
          <div className={styles.faqListe}>
            {[
              {
                sp: `Hvor mange ${naering.visningsnavn.toLowerCase()}er er det i ${kommune}?`,
                sv: `Det er registrert ${total} bedrifter innen ${naering.visningsnavn.toLowerCase()} i ${kommune} ifølge Brønnøysundregistrene.`
              },
              {
                sp: `Er bedriftene på HåndverkerPortalen godkjente?`,
                sv: `Alle bedrifter er hentet direkte fra Brønnøysundregistrene og er registrerte norske foretak. Vi anbefaler alltid å sjekke referanser og innhente flere tilbud.`
              },
            ].map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqSpm}>{item.sp}</summary>
                <p className={styles.faqSvar}>{item.sv}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATERTE BRANSJER */}
      <section className={styles.relaterte}>
        <div className="container">
          <h2 className={styles.secTitle}>Andre bransjer i {kommune}</h2>
          <div className={styles.relaterteGrid}>
            {NAERINGSKODER.filter(n => n.slug !== naering.slug).slice(0, 4).map(n => (
              <a key={n.slug} href={`/${n.slug}/${kommune.toLowerCase().replace(/\s/g, '-')}`} className={styles.relKort}>
                <span>{n.icon}</span>
                <span>{n.visningsnavn} i {kommune}</span>
                <span>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Generer de viktigste kombinasjonene ved build, resten med fallback
  const viktigste = [
    ['elektriker', 'oslo'], ['elektriker', 'bergen'], ['elektriker', 'trondheim'],
    ['elektriker', 'kristiansand'], ['elektriker', 'stavanger'],
    ['rorlegger', 'oslo'], ['rorlegger', 'bergen'],
    ['tomrer', 'oslo'], ['tomrer', 'kristiansand'],
    ['maler', 'oslo'], ['byggmester', 'oslo'],
  ];

  const paths = viktigste.map(([naering, kommune]) => ({
    params: { naering, kommune }
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { naering: naeringSlug, kommune: kommuneSlug } = params;
  const { bedrifter, naering, kommuneNavn, total } = await getBedrifterByKategoriOgKommune(naeringSlug, kommuneSlug);

  if (!naering || !kommuneNavn) return { notFound: true };

  return {
    props: { bedrifter, naering, kommune: kommuneNavn, total },
    revalidate: 86400,
  };
}
