// pages/[naering]/fylke/[fylke].jsx
// Fylkesside per bransje, f.eks. /tomrer/fylke/buskerud. Fanger søk på fylke
// («snekker buskerud») og lenker videre til kommunesidene og tilbake.
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import BedriftKort from '../../../components/BedriftKort';
import { KOMMUNER, getNaeringBySlug, getKommunerIFylkeForNaering, getStorsteBedrifterForKommuner } from '../../../lib/db';
import { getFylkeBySlug } from '../../../lib/fylker';
import { getBransjeFlertall } from '../../../lib/bransjeInnsikt';
import { getBransjeSynonymer, bransjeTittelNavn } from '../../../lib/bransjeSynonymer';
import { safeJsonLd } from '../../../lib/jsonLd';
import { BransjeIkon } from '../../../components/icons';
import styles from '../../../styles/Kategori.module.css';

const BASE_URL = 'https://haandverkerportalen.no';

export default function FylkeSide({ naering, fylke, kommuner, antallKommunerTotalt, total, storste }) {
  const router = useRouter();
  if (router.isFallback) return <Layout title="Laster..."><div style={{ padding: '80px 40px', textAlign: 'center' }}>Laster...</div></Layout>;
  if (!naering || !fylke) return <Layout title="Ikke funnet"><div style={{ padding: '80px 40px', textAlign: 'center' }}>Ikke funnet</div></Layout>;

  const flertall = getBransjeFlertall(naering.slug, naering.visningsnavn);
  const tittelNavn = bransjeTittelNavn(naering.slug, naering.visningsnavn);
  const tittelNavnLiten = tittelNavn.replace(naering.visningsnavn, naering.visningsnavn.toLowerCase());
  const tittel = `${tittelNavn} i ${fylke.navn}`;
  const synonymForklaring = getBransjeSynonymer(naering.slug).forklaring;
  const storsteKommune = kommuner[0] || null;
  const utenBedrifter = antallKommunerTotalt - kommuner.length;

  const faq = [
    {
      sp: `Hvor mange ${flertall} er det i ${fylke.navn}?`,
      sv: `${total} ${flertall} er registrert i ${fylke.navn}, fordelt på ${kommuner.length} kommuner, ifølge Brønnøysundregistrene.`,
    },
    ...(storsteKommune ? [{
      sp: `Hvilken kommune i ${fylke.navn} har flest ${flertall}?`,
      sv: `${storsteKommune.navn} har flest, med ${storsteKommune.antallBedrifter} registrerte ${flertall}${kommuner[1] ? `, etterfulgt av ${kommuner[1].navn} (${kommuner[1].antallBedrifter})` : ''}.`,
    }] : []),
    ...(fylke.historikk ? [{
      sp: `Hva har skjedd med fylkesinndelingen i ${fylke.navn}?`,
      sv: fylke.historikk,
    }] : []),
    {
      sp: `Hvordan finner jeg ${naering.visningsnavn.toLowerCase()} i min kommune?`,
      sv: `Velg kommunen din i listen over, så ser du alle registrerte ${flertall} der, med kontaktinformasjon og fakta fra Brønnøysundregistrene.`,
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
      { '@type': 'ListItem', position: 3, name: fylke.navn, item: `${BASE_URL}/${naering.slug}/fylke/${fylke.slug}` },
    ],
  };

  return (
    <Layout
      title={total > 0 ? `${tittel} – ${total} bedrifter` : tittel}
      description={`${total} registrerte ${flertall} i ${fylke.navn}, fordelt på ${kommuner.length} kommuner${storsteKommune ? ` – flest i ${storsteKommune.navn}` : ''}. Velg kommune og se kontaktinfo, verifisert mot Brønnøysundregistrene.`}
      canonical={`/${naering.slug}/fylke/${fylke.slug}`}
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
            <span>{fylke.navn}</span>
          </nav>
          <div className={styles.heroInner}>
            <div>
              <div className={styles.heroIcon}><BransjeIkon slug={naering.slug} size={28} /></div>
              <h1 className={styles.heroTitle}>{tittel}</h1>
              <p className={styles.heroDesc}>
                <strong>{total} registrerte bedrifter</strong> innen {tittelNavnLiten} i {fylke.navn}, fordelt på {kommuner.length} kommuner.
                {storsteKommune && <> Flest i {storsteKommune.navn}.</>}
                {' '}Data fra Brønnøysundregistrene.
              </p>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{total}</span>
                <span className={styles.heroStatLabel}>Bedrifter</span>
              </div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{kommuner.length}</span>
                <span className={styles.heroStatLabel}>Kommuner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bedrifterSection} style={{ paddingTop: 32 }}>
        <div className="container">
          <div className={styles.secHeader}>
            <h2 className={styles.secTitle}>{naering.visningsnavn} i kommunene i {fylke.navn}</h2>
            <span className={styles.antall}>{kommuner.length} kommuner</span>
          </div>
          <div className={styles.relaterteGrid} style={{ marginTop: 8 }}>
            {kommuner.map(k => (
              <a key={k.slug} href={`/${naering.slug}/${k.slug}`} className={styles.relKort}>
                <BransjeIkon slug={naering.slug} size={15} />
                <span>{naering.visningsnavn} i {k.navn} ({k.antallBedrifter})</span>
                <span>→</span>
              </a>
            ))}
          </div>
          {utenBedrifter > 0 && (
            <p style={{ marginTop: 14, fontSize: 13, color: 'var(--ink-3)' }}>
              {utenBedrifter} {utenBedrifter === 1 ? 'kommune' : 'kommuner'} i {fylke.navn} har ingen registrerte {flertall} i oversikten vår.
            </p>
          )}
        </div>
      </section>

      {storste.length > 0 && (
        <section className={styles.bedrifterSection}>
          <div className="container">
            <div className={styles.secHeader}>
              <h2 className={styles.secTitle}>Største {flertall} i {fylke.navn}</h2>
              <span className={styles.antall}>etter antall ansatte</span>
            </div>
            <div className={styles.grid}>
              {storste.map(b => <BedriftKort key={b.organisasjonsnummer} bedrift={b} />)}
            </div>
          </div>
        </section>
      )}

      <section className={styles.seoTekst}>
        <div className="container--narrow">
          <p>
            HåndverkerPortalen har <strong>{total} registrerte {flertall} i {fylke.navn}</strong>, ifølge Brønnøysundregistrene.
            {storsteKommune && <> {storsteKommune.navn} har flest med {storsteKommune.antallBedrifter} bedrifter.</>}
          </p>
          {fylke.historikk && <p>{fylke.historikk}</p>}
          {synonymForklaring && <p>{synonymForklaring}</p>}
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
    </Layout>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const naering = getNaeringBySlug(params.naering);
  const fylke = getFylkeBySlug(params.fylke);
  if (!naering || !fylke) return { notFound: true };

  const kommuner = (await getKommunerIFylkeForNaering(naering.slug, fylke.navn))
    .map(k => ({ navn: k.navn, slug: k.slug, nummer: k.nummer, antallBedrifter: k.antallBedrifter }));
  if (kommuner.length === 0) return { notFound: true };

  const total = kommuner.reduce((sum, k) => sum + k.antallBedrifter, 0);
  const storste = await getStorsteBedrifterForKommuner(naering.kode, kommuner.map(k => k.nummer), 6);
  const antallKommunerTotalt = KOMMUNER.filter(k => k.fylke === fylke.navn).length;

  return {
    props: { naering, fylke, kommuner, antallKommunerTotalt, total, storste },
    revalidate: 86400,
  };
}
