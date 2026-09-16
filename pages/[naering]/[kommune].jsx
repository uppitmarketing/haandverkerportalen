// pages/[naering]/[kommune].jsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BedriftKort from '../../components/BedriftKort';
import Annonse from '../../components/Annonse';
import { NAERINGSKODER, KOMMUNER, getBedrifterByKategoriOgKommune, getNaeringBySlug } from '../../lib/db';
import { getAnnonsorForBransje } from '../../lib/annonsorer';
import { safeJsonLd } from '../../lib/jsonLd';
import { getBransjeInnsikt, getBransjeFlertall } from '../../lib/bransjeInnsikt';
import { getArtiklerForBransje, getGenerelleArtikler } from '../../lib/artikler';
import { BransjeIkon } from '../../components/icons';
import { Hourglass } from 'lucide-react';
import styles from '../../styles/Kategori.module.css';

const BASE_URL = 'https://haandverkerportalen.no';

export default function KategoriSide({ bedrifter, naering, kommune, fylke, total, annonsor }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Laster...">
        <div style={{ padding: '80px 40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><Hourglass size={32} /></div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Henter bedrifter...</div>
        </div>
      </Layout>
    );
  }

  if (!naering) return (
    <Layout title="Ikke funnet">
      <div style={{ padding: '80px 40px', textAlign: 'center' }}>Siden ble ikke funnet.</div>
    </Layout>
  );

  const tittel = `${naering.visningsnavn} i ${kommune}`;
  const kommuneSlugUrl = kommune.toLowerCase().replace(/\s/g, '-');
  const innsikt = getBransjeInnsikt(naering.slug);
  const flertall = getBransjeFlertall(naering.slug, naering.visningsnavn);
  const relevanteArtikler = [...getArtiklerForBransje(naering.slug), ...getGenerelleArtikler()];
  const naboKommuner = fylke ? KOMMUNER.filter(k => k.fylke === fylke && k.navn !== kommune).slice(0, 6) : [];

  const stiftelsesAar = bedrifter
    .map(b => b.stiftelsesdato ? parseInt(b.stiftelsesdato.substring(0, 4), 10) : null)
    .filter(aar => aar && !Number.isNaN(aar));
  const eldsteAar = stiftelsesAar.length ? Math.min(...stiftelsesAar) : null;

  const nyesteAar = stiftelsesAar.length ? Math.max(...stiftelsesAar) : null;

  const ansatteTall = bedrifter
    .map(b => b.antall_ansatte)
    .filter(n => typeof n === 'number' && n > 0);
  const storsteAntallAnsatte = ansatteTall.length ? Math.max(...ansatteTall) : null;
  const gjennomsnittAnsatte = ansatteTall.length
    ? Math.round((ansatteTall.reduce((sum, n) => sum + n, 0) / ansatteTall.length) * 10) / 10
    : null;

  const antallMedNettside = bedrifter.filter(b => b.har_hjemmeside).length;
  const andelMedNettside = bedrifter.length > 0 ? Math.round((antallMedNettside / bedrifter.length) * 100) : 0;

  let stedTekst = fylke ? `${kommune} ligger i ${fylke} fylke.` : '';
  if (eldsteAar) stedTekst += ` Den eldste bedriften i oversikten ble etablert i ${eldsteAar}${nyesteAar && nyesteAar !== eldsteAar ? `, og den nyeste i ${nyesteAar}` : ''}.`;
  if (storsteAntallAnsatte) stedTekst += ` Den største har ${storsteAntallAnsatte} ansatte${gjennomsnittAnsatte ? ` (snittet er ${gjennomsnittAnsatte})` : ''}.`;

  const faq = [
    {
      sp: `Hvor mange ${flertall} er det i ${kommune}?`,
      sv: `${total} ${flertall} er registrert i ${kommune} ifølge Brønnøysundregistrene.`,
    },
    {
      sp: `Er bedriftene på HåndverkerPortalen godkjente?`,
      sv: `Ja — alle bedrifter er hentet direkte fra Brønnøysundregistrene og er registrerte norske foretak. Vi anbefaler alltid å sjekke referanser og innhente flere tilbud.`,
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
      { '@type': 'ListItem', position: 3, name: kommune, item: `${BASE_URL}/${naering.slug}/${kommuneSlugUrl}` },
    ],
  };

  return (
    <Layout
      title={tittel}
      description={`Sammenlign ${total} registrerte ${flertall} i ${kommune}${storsteAntallAnsatte ? `, med opptil ${storsteAntallAnsatte} ansatte i de største` : ''}. Verifisert mot Brønnøysundregistrene — se kontaktinfo og ta kontakt gratis.`}
      canonical={`/${naering.slug}/${kommuneSlugUrl}`}
    >
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
        {total === 0 && <meta name="robots" content="noindex,follow" />}
      </Head>

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
              <div className={styles.heroIcon}><BransjeIkon slug={naering.slug} size={28} /></div>
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
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <Annonse annonsor={annonsor} variant="bred" bransjeSlug={naering.slug} />
      </div>

      <section className={styles.bedrifterSection}>
        <div className="container">
          <div className={styles.secHeader}>
            <h2 className={styles.secTitle}>Alle {flertall} i {kommune}</h2>
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

      <section className={styles.seoTekst}>
        <div className="container--narrow">
          <p>
            HåndverkerPortalen har <strong>{total} registrerte {flertall} i {kommune}</strong>, ifølge Brønnøysundregistrene.
          </p>
          {stedTekst && <p>{stedTekst}</p>}
          <h2>Hva koster en {naering.visningsnavn.toLowerCase()} i {kommune}?</h2>
          <p>
            {bedrifter.length > 0 && (
              <>Av {bedrifter.length} {flertall} i oversikten over har {antallMedNettside} ({andelMedNettside}%) egen nettside. </>
            )}
            {innsikt.prisTekst}
          </p>
          <h2>Slik finner du riktig {naering.visningsnavn.toLowerCase()}</h2>
          <ul>
            {innsikt.punkter.map((punkt, i) => <li key={i}>{punkt}</li>)}
          </ul>
        </div>
      </section>

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

      {relevanteArtikler.length > 0 && (
        <section className={styles.relaterte}>
          <div className="container">
            <h2 className={styles.secTitle}>Nyttige guider</h2>
            <div className={styles.relaterteGrid}>
              {relevanteArtikler.map(a => (
                <a key={a.slug} href={`/artikler/${a.slug}`} className={styles.relKort}>
                  <span>{a.tittel}</span>
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.relaterte}>
        <div className="container">
          <h2 className={styles.secTitle}>Andre bransjer i {kommune}</h2>
          <div className={styles.relaterteGrid}>
            {NAERINGSKODER.filter(n => n.slug !== naering.slug).slice(0, 4).map(n => (
              <a key={n.slug} href={`/${n.slug}/${kommuneSlugUrl}`} className={styles.relKort}>
                <BransjeIkon slug={n.slug} size={15} />
                <span>{n.visningsnavn} i {kommune}</span>
                <span>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {naboKommuner.length > 0 && (
        <section className={styles.relaterte}>
          <div className="container">
            <h2 className={styles.secTitle}>{naering.visningsnavn} i andre kommuner i {fylke}</h2>
            <div className={styles.relaterteGrid}>
              {naboKommuner.map(k => (
                <a key={k.slug} href={`/${naering.slug}/${k.slug}`} className={styles.relKort}>
                  <BransjeIkon slug={naering.slug} size={15} />
                  <span>{naering.visningsnavn} i {k.navn}</span>
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

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { naering: naeringSlug, kommune: kommuneSlug } = params;
  const { bedrifter, naering, kommuneNavn, fylke, total } = await getBedrifterByKategoriOgKommune(naeringSlug, kommuneSlug);

  if (!naering || !kommuneNavn) return { notFound: true };

  const annonsor = await getAnnonsorForBransje(naering.slug);

  return {
    props: { bedrifter, naering, kommune: kommuneNavn, fylke, total, annonsor },
    revalidate: 86400,
  };
}
