// pages/[naering]/[kommune].jsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BedriftKort from '../../components/BedriftKort';
import Annonse from '../../components/Annonse';
import { NAERINGSKODER, getBedrifterByKategoriOgKommune, getNaeringBySlug } from '../../lib/db';
import { getAnnonsorForBransje } from '../../lib/annonsorer';
import { safeJsonLd } from '../../lib/jsonLd';
import styles from '../../styles/Kategori.module.css';

const BASE_URL = 'https://haandverkerportalen.no';

// Bransje-spesifikt innhold – unngår at alle 2856 bransje×kommune-sider
// deler ordrett samme prisavsnitt og tips (leser som tynt/duplisert innhold for søkemotorer).
const BRANSJE_INNSIKT = {
  elektriker: {
    prisTekst: 'Timeprisen for elektrikere ligger normalt mellom 600 og 1200 kroner inkl. mva, avhengig av bedrift og type oppdrag. Enkle jobber som bytte av kontakter koster mindre enn nytt sikringsskap eller større installasjonsarbeid.',
    punkter: [
      'Sjekk at foretaket er registrert som elektroforetak',
      'Elektroarbeid skal utføres av eller under tilsyn av kvalifisert personell',
      'Be om referanser fra tidligere oppdrag',
      'Krev skriftlig tilbud med spesifisert pris',
    ],
  },
  rorlegger: {
    prisTekst: 'Prisen på rørleggerarbeid varierer mye med type jobb — fra enkle reparasjoner til full baderomsrenovering. Akutte utrykninger på kveld og helg koster normalt mer enn planlagte oppdrag i vanlig arbeidstid.',
    punkter: [
      'Sjekk godkjenning for våtromsarbeid ved baderomsjobber',
      'Be om referanser, spesielt for større prosjekter',
      'Spør om forsikring og garanti på utført arbeid',
      'Innhent minst tre tilbud før du bestemmer deg',
    ],
  },
  tomrer: {
    prisTekst: 'Timeprisen for tømrere ligger normalt mellom 600 og 1200 kroner inkl. mva. Større prosjekter som tilbygg eller full renovering prises ofte som en kombinasjon av timepris og materialkostnader, eller som fastpris.',
    punkter: [
      'Be om skriftlig tilbud med spesifisert pris',
      'Avklar hvem som står for eventuell byggesøknad',
      'Sjekk referanser fra lignende prosjekter',
      'Innhent minst tre tilbud på større jobber',
    ],
  },
  byggmester: {
    prisTekst: 'Prisen på et byggeprosjekt avhenger sterkt av størrelse, kompleksitet og om det kreves byggesøknad eller ansvarsrett. Be alltid om et detaljert kostnadsoverslag før du starter.',
    punkter: [
      'Sjekk om bedriften har sentral godkjenning hos DiBK for større prosjekter',
      'Avklar ansvarsforhold og eventuell byggesøknad tidlig',
      'Krev skriftlig, spesifisert tilbud',
      'Innhent flere tilbud på større prosjekter',
    ],
  },
  maler: {
    prisTekst: 'Prisen på malerarbeid avhenger av flatestørrelse, antall strøk, og om jobben er innvendig eller utvendig. Spør alltid om prisen inkluderer materialer eller om det kommer i tillegg.',
    punkter: [
      'Be om referanser og se eksempler på tidligere arbeid',
      'Avklar om tilbudet inkluderer maling og materialer',
      'Sjekk erfaring med akkurat den overflaten du skal ha behandlet',
      'Innhent flere tilbud før du bestemmer deg',
    ],
  },
  taklegger: {
    prisTekst: 'Prisen på takarbeid avhenger av takets størrelse, helningsgrad og om det er en akutt lekkasjereparasjon eller planlagt tekking. Akutte oppdrag koster normalt mer enn planlagte.',
    punkter: [
      'Sjekk erfaring med høydearbeid og at sikkerhetsrutiner følges',
      'Spør om garanti på tekking og tetting',
      'Be om referanser fra lignende tak',
      'Innhent flere tilbud på større jobber',
    ],
  },
  gulvlegger: {
    prisTekst: 'Prisen på gulvlegging avhenger av flatestørrelse, materialvalg og om gammelt gulv må fjernes først. Be om at tilbudet spesifiserer både arbeid og materialer.',
    punkter: [
      'Be om referanser og se eksempler på tidligere arbeid',
      'Avklar om prisen inkluderer forarbeid og fjerning av gammelt gulv',
      'Sjekk garantivilkår på utført arbeid',
      'Innhent flere tilbud før du bestemmer deg',
    ],
  },
  grunnarbeid: {
    prisTekst: 'Prisen på grunnarbeid avhenger sterkt av grunnforhold, maskinbehov og omfanget av jobben. Enkle jobber koster vesentlig mindre enn graving og klargjøring av større tomter.',
    punkter: [
      'Sjekk erfaring med maskinpark og grunnforhold i området',
      'Avklar ansvar for eventuell grunnundersøkelse',
      'Be om referanser fra lignende prosjekter',
      'Innhent flere tilbud før du bestemmer deg',
    ],
  },
};

const FALLBACK_INNSIKT = {
  prisTekst: 'Prisen varierer med jobbens omfang og kompleksitet. Innhent alltid minst tre tilbud før du bestemmer deg.',
  punkter: [
    'Sjekk at bedriften er aktiv i Brønnøysundregistrene',
    'Be om referanser fra tidligere oppdrag',
    'Krev skriftlig tilbud med spesifisert pris',
    'Kontroller nødvendige sertifiseringer for jobben',
  ],
};

export default function KategoriSide({ bedrifter, naering, kommune, total, annonsor }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Laster...">
        <div style={{ padding: '80px 40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>⏳</div>
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
  const innsikt = BRANSJE_INNSIKT[naering.slug] || FALLBACK_INNSIKT;

  const faq = [
    {
      sp: `Hvor mange ${naering.visningsnavn.toLowerCase()}er er det i ${kommune}?`,
      sv: `Det er registrert ${total} bedrifter innen ${naering.visningsnavn.toLowerCase()} i ${kommune} ifølge Brønnøysundregistrene.`,
    },
    {
      sp: `Er bedriftene på HåndverkerPortalen godkjente?`,
      sv: `Alle bedrifter er hentet direkte fra Brønnøysundregistrene og er registrerte norske foretak. Vi anbefaler alltid å sjekke referanser og innhente flere tilbud.`,
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
      description={`Finn ${naering.visningsnavn.toLowerCase()} i ${kommune}. ${total} registrerte bedrifter. Verifisert mot Brønnøysundregistrene.`}
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

      <div className="container">
        <Annonse annonsor={annonsor} variant="bred" bransjeSlug={naering.slug} />
      </div>

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

      <section className={styles.seoTekst}>
        <div className="container--narrow">
          <h2>Hva koster en {naering.visningsnavn.toLowerCase()} i {kommune}?</h2>
          <p>{innsikt.prisTekst}</p>
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

      <section className={styles.relaterte}>
        <div className="container">
          <h2 className={styles.secTitle}>Andre bransjer i {kommune}</h2>
          <div className={styles.relaterteGrid}>
            {NAERINGSKODER.filter(n => n.slug !== naering.slug).slice(0, 4).map(n => (
              <a key={n.slug} href={`/${n.slug}/${kommuneSlugUrl}`} className={styles.relKort}>
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
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { naering: naeringSlug, kommune: kommuneSlug } = params;
  const { bedrifter, naering, kommuneNavn, total } = await getBedrifterByKategoriOgKommune(naeringSlug, kommuneSlug);

  if (!naering || !kommuneNavn) return { notFound: true };

  const annonsor = await getAnnonsorForBransje(naering.slug);

  return {
    props: { bedrifter, naering, kommune: kommuneNavn, total, annonsor },
    revalidate: 86400,
  };
}
