// pages/bedrift/[slug].jsx
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import BedriftKort from '../../components/BedriftKort';
import Annonse from '../../components/Annonse';
import AnnonseBww from '../../components/AnnonseBww';
import AnnonseToolsinvent from '../../components/AnnonseToolsinvent';
import { getBedriftBySlug, getRelaterteBedrifter, getNaeringByKode, getAlleBedriftSlugs } from '../../lib/db';
import { getAnnonsorForBransje } from '../../lib/annonsorer';
import styles from '../../styles/Bedrift.module.css';
import { genererBeskrivelse, genererBedriftFaq } from '../../lib/genererBeskrivelse';
import { safeJsonLd } from '../../lib/jsonLd';
import { sporHendelse } from '../../lib/gtag';
import { sporInternHendelse } from '../../lib/internAnalytics';
import Kart from '../../components/Kart';
import { Globe, Check, Hourglass, Star } from 'lucide-react';
import { BransjeIkon } from '../../components/icons';
import { getBransjeFlertall } from '../../lib/bransjeInnsikt';

const BASE_URL = 'https://haandverkerportalen.no';

// Kartlegger til spesifikke schema.org-typer der de finnes, ellers en generisk håndverkertype
const SCHEMA_TYPE = {
  '43.210': 'Electrician',
  '43.221': 'Plumber',
  '43.222': 'HVACBusiness',
  '43.223': 'HVACBusiness',
  '41.000': 'GeneralContractor',
  '43.340': 'HousePainter',
  '43.410': 'RoofingContractor',
};

export default function BedriftSide({ bedrift, relaterte, annonsor }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <Layout title="Laster...">
        <div style={{ padding: '80px 40px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><Hourglass size={32} /></div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Henter bedriftsinformasjon...</div>
        </div>
      </Layout>
    );
  }

  if (!bedrift) return (
    <Layout title="Ikke funnet">
      <div style={{ padding: '80px 40px', textAlign: 'center', color: '#6B7280' }}>
        Bedriften ble ikke funnet.
      </div>
    </Layout>
  );

  const naering = getNaeringByKode(bedrift.naeringskode);
  const nettsideUrl = bedrift.hjemmeside
    ? (bedrift.hjemmeside.startsWith('http') ? bedrift.hjemmeside : `https://${bedrift.hjemmeside}`)
    : null;

  // Toolsinvent er kun relevant for elektrikere og rørleggere, og roterer
  // med Better WorkWear på disse sidene i stedet for å legges ved siden av -
  // delt etter organisasjonsnummer sin paritet, slik at hver bedrift alltid
  // viser samme annonse (stabilt på tvers av sidevisninger og ISR-cacher).
  const TOOLSINVENT_BRANSJER = ['elektriker', 'rorlegger'];
  const visToolsinvent = TOOLSINVENT_BRANSJER.includes(naering?.slug) && Number(bedrift.organisasjonsnummer) % 2 === 0;

  // Fagområdet alene (ikke funksjon/tiltaksklasse) er nok til å fungere som
  // en gjenkjennelig USP-badge ved siden av firmanavnet - fjerner duplikater
  // siden samme fagområde ofte har flere godkjenninger (utførende/prosjekterende).
  const godkjenningFagomrader = bedrift.sentral_godkjenning && Array.isArray(bedrift.sentral_godkjenning_omrader)
    ? [...new Set(bedrift.sentral_godkjenning_omrader.map(o => o.fagomrade).filter(Boolean))].slice(0, 3)
    : [];

  function sporNettsideKlikk() {
    sporHendelse('bedrift_outbound_click', {
      bedrift_navn: bedrift.navn,
      bedrift_orgnr: bedrift.organisasjonsnummer,
      bedrift_bransje: bedrift.naeringskode_tekst,
      bedrift_kommune: bedrift.kommune,
      link_url: bedrift.hjemmeside,
    });
    sporInternHendelse(`/_klikk/bedrift/${bedrift.slug}`);
  }
  const stiftetAar = bedrift.stiftelsesdato?.substring(0, 4);
  // DSB elvirksomhetsregister – kun relevant for elektro (43.210)
  const erElektro = bedrift.naeringskode === '43.210';
  const ikkeDsb = erElektro && bedrift.dsb_registrert === false;
  const dsbOk = erElektro && bedrift.dsb_registrert === true;
  const status = bedrift.konkurs ? 'Konkurs' : bedrift.er_aktiv ? 'Aktiv' : 'Inaktiv';
  const beskrivelse = genererBeskrivelse(bedrift);
  const faq = genererBedriftFaq(bedrift, naering?.visningsnavn);
  const kommuneSlug = bedrift.kommune?.toLowerCase()
    .replace(/\s/g, '-')
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a');

  // Bygg adressestreng for kart
  const adresseKart = [bedrift.adresse, bedrift.postnummer, bedrift.poststed]
    .filter(Boolean)
    .join(', ');

  const kartUrl = adresseKart
    ? `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseKart)}#map=15`
    : null;

  const kartEmbedUrl = adresseKart
    ? `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adresseKart)}&format=json&limit=1`
    : null;

  // Riktig Brreg-URL
  const brregUrl = `https://w2.brreg.no/enhet/sok/detalj.jsp?orgnr=${bedrift.organisasjonsnummer}`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ikkeDsb ? 'LocalBusiness' : (SCHEMA_TYPE[bedrift.naeringskode] || 'HomeAndConstructionBusiness'),
    name: bedrift.navn,
    identifier: bedrift.organisasjonsnummer,
    taxID: bedrift.organisasjonsnummer,
    address: {
      '@type': 'PostalAddress',
      ...(bedrift.adresse && { streetAddress: bedrift.adresse }),
      ...(bedrift.postnummer && { postalCode: bedrift.postnummer }),
      ...(bedrift.poststed && { addressLocality: bedrift.poststed }),
      addressCountry: 'NO',
    },
    ...(bedrift.hjemmeside && {
      url: bedrift.hjemmeside.startsWith('http') ? bedrift.hjemmeside : `https://${bedrift.hjemmeside}`,
    }),
    ...(bedrift.stiftelsesdato && { foundingDate: bedrift.stiftelsesdato }),
    ...(bedrift.antall_ansatte != null && { numberOfEmployees: bedrift.antall_ansatte }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/bedrift/${bedrift.slug}` },
  };

  const faqSchema = faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.sp,
      acceptedAnswer: { '@type': 'Answer', text: item.sv },
    })),
  } : null;

  return (
    <Layout
      title={ikkeDsb
        ? `${bedrift.navn} i ${bedrift.kommune}`
        : `${bedrift.navn} – ${naering?.visningsnavn || 'Håndverker'} i ${bedrift.kommune}`}
      description={ikkeDsb
        ? `${bedrift.navn} i ${bedrift.poststed} er ikke registrert i DSBs elvirksomhetsregister. Org.nr: ${bedrift.organisasjonsnummer}.`
        : `${bedrift.navn} er en ${naering?.visningsnavn?.toLowerCase() || 'håndverker'}-bedrift i ${bedrift.poststed}. Org.nr: ${bedrift.organisasjonsnummer}.`}
      canonical={`/bedrift/${bedrift.slug}`}
    >
      <Head>
        {ikkeDsb && <meta name="robots" content="noindex, follow" />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(localBusinessSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
          />
        )}
      </Head>

      <section className={styles.hero}>
        <div className="container">
          <nav className="breadcrumb">
            <a href="/">Forside</a>
            <span className="breadcrumb__sep">/</span>
            {naering && <a href={`/${naering.slug}`}>{naering.visningsnavn}</a>}
            {naering && bedrift.kommune && (
              <>
                <span className="breadcrumb__sep">/</span>
                <a href={`/${naering.slug}/${kommuneSlug}`}>{bedrift.kommune}</a>
              </>
            )}
            <span className="breadcrumb__sep">/</span>
            <span>{bedrift.navn}</span>
          </nav>

          <div className={styles.heroInner}>
            <div className={styles.heroIcon}>
              {bedrift.logo_url ? (
                <img src={bedrift.logo_url} alt={`${bedrift.navn} logo`} />
              ) : (
                <BransjeIkon slug={naering?.slug} size={34} />
              )}
            </div>
            <div>
              <div className={styles.tagger}>
                {bedrift.er_fremhevet && (
                  <span className={styles.badgeFremhevet}>
                    <Star size={10} fill="currentColor" strokeWidth={0} /> Fremhevet profil
                  </span>
                )}
                <span className={`tag ${bedrift.er_aktiv && !bedrift.konkurs ? 'tag--green' : 'tag--red'}`}>{status}</span>
                {naering && !ikkeDsb && <span className="tag tag--blue">{naering.visningsnavn}</span>}
                {dsbOk && <span className="tag tag--green">Registrert hos DSB</span>}
                {ikkeDsb && <span className="tag tag--red">Ikke i DSBs elvirksomhetsregister</span>}
                {bedrift.mva_registrert && <span className="tag tag--muted">MVA-reg.</span>}
              </div>
              <div className={styles.navnRad}>
                <h1 className={styles.navn}>{bedrift.navn}</h1>
                {godkjenningFagomrader.length > 0 && (
                  <div className={styles.godkjenningBadgeRad}>
                    {godkjenningFagomrader.map(fag => (
                      <span key={fag} className={styles.godkjenningBadge}>
                        <Check size={11} strokeWidth={3} /> {fag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className={styles.adresse}>
                {bedrift.adresse ? `${bedrift.adresse}, ` : ''}{bedrift.postnummer} {bedrift.poststed}
              </p>
            </div>
            {bedrift.er_fremhevet && (
              <div className={styles.heroStats}>
                {stiftetAar && (
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNum}>{stiftetAar}</span>
                    <span className={styles.heroStatLabel}>Etablert</span>
                  </div>
                )}
                {bedrift.antall_ansatte != null && (
                  <div className={styles.heroStat}>
                    <span className={styles.heroStatNum}>{bedrift.antall_ansatte}</span>
                    <span className={styles.heroStatLabel}>Ansatte</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {ikkeDsb && (
        <div className="container">
          <div className={styles.dsbVarsel} role="note">
            <strong>Ikke funnet i DSBs elvirksomhetsregister.</strong>{' '}
            Bedriften er registrert i Brønnøysundregistrene med næringskode for elektrisk
            installasjonsarbeid, men vi finner den ikke i elvirksomhetsregisteret. Bare registrerte
            virksomheter har lov til å utføre elektrisk arbeid.{' '}
            <a href="https://elvirksomhetsregisteret.dsb.no/" target="_blank" rel="noopener noreferrer">
              Sjekk selv hos DSB
            </a>{' '}
            før du bestiller.
          </div>
        </div>
      )}

      <div className="container">
        <div className={styles.layout}>
          <main className={styles.main}>

            {(bedrift.egen_beskrivelse || beskrivelse) && (
              <div className={`${styles.boks} ${styles.seksjonBeskrivelse}`}>
                <p className={styles.beskrivelse}>{bedrift.egen_beskrivelse || beskrivelse}</p>
                {bedrift.er_fremhevet && bedrift.spesialiteter && (
                  <div className={styles.tagRad}>
                    {bedrift.spesialiteter.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                      <span key={s} className={styles.spesialitetTag}>{s}</span>
                    ))}
                  </div>
                )}
                {nettsideUrl ? (
                  <a
                    href={nettsideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.beskrivelseLenke}
                    onClick={sporNettsideKlikk}
                  >
                    <Globe size={14} /> Gå til nettside
                  </a>
                ) : (
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(bedrift.navn)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.beskrivelseLenke}
                  >
                    Finn nettside via Google →
                  </a>
                )}
              </div>
            )}
            <div className={`${styles.boks} ${styles.seksjonFakta}`}>
              <h2 className={styles.boksTitle}>Om bedriften</h2>
              <dl className={styles.detaljer}>
                {[
                  ['Firmanavn', bedrift.navn],
                  ['Daglig leder', bedrift.daglig_leder_navn],
                  ['Org.nummer', bedrift.organisasjonsnummer],
                  ['Organisasjonsform', bedrift.organisasjonsform],
                  ['Bransje', `${bedrift.naeringskode_tekst} (${bedrift.naeringskode})`],
                  ['Ansatte', bedrift.antall_ansatte != null ? bedrift.antall_ansatte : 'Ikke oppgitt'],
                  ['Stiftet', stiftetAar || '—'],
                  ['Status', status],
                ].map(([label, verdi]) => verdi ? (
                  <div key={label} className={styles.rad}>
                    <dt>{label}</dt>
                    <dd>{verdi}</dd>
                  </div>
                ) : null)}
              </dl>
            </div>

            {bedrift.sentral_godkjenning && (
              <details className={`${styles.boks} ${styles.seksjonKvalifikasjoner} ${styles.kvalBoks}`}>
                <summary className={styles.kvalSummary}>
                  <span className={styles.kvalSummaryTekst}>
                    <Check size={13} strokeWidth={3} />
                    Sentral godkjenning (DiBK)
                    {bedrift.sentral_godkjenning_utlop && ` — gyldig til ${new Date(bedrift.sentral_godkjenning_utlop).toLocaleDateString('no')}`}
                  </span>
                  <span className={styles.kvalPil}>
                    <span className={styles.kvalPilLukket}>Les mer</span>
                    <span className={styles.kvalPilApen}>Vis mindre</span>
                  </span>
                </summary>
                <div className={styles.kvalInnhold}>
                  {Array.isArray(bedrift.sentral_godkjenning_omrader) && bedrift.sentral_godkjenning_omrader.length > 0 && (
                    <ul className={styles.forBedrifterListe}>
                      {bedrift.sentral_godkjenning_omrader.map((o, i) => (
                        <li key={i}>
                          <Check size={13} strokeWidth={3} /> {o.fagomrade} ({o.funksjon}, TK{o.tiltaksklasse})
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={`https://sgregister.dibk.no/enterprises/${bedrift.organisasjonsnummer}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.googleLenke}
                  >
                    Se godkjenningen hos DiBK →
                  </a>
                </div>
              </details>
            )}

            <div className={`${styles.boks} ${styles.seksjonAdresse}`}>
              <h2 className={styles.boksTitle}>Adresse og kart</h2>
              <p className={styles.adresseTekst}>
                {bedrift.adresse && <span>{bedrift.adresse}<br /></span>}
                {bedrift.postnummer} {bedrift.poststed}<br />
                {bedrift.kommune} kommune
              </p>
              <Kart adresse={bedrift.adresse} postnummer={bedrift.postnummer} poststed={bedrift.poststed} />
            </div>

            {faq.length > 0 && (
              <div className={`${styles.boks} ${styles.seksjonFaq}`}>
                <h2 className={styles.faqTitle}>Ofte stilte spørsmål</h2>
                <div className={styles.faqListe}>
                  {faq.map((item, i) => (
                    <details key={i} className={styles.faqItem}>
                      <summary className={styles.faqSpm}>{item.sp}</summary>
                      <p className={styles.faqSvar}>{item.sv}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.seksjonAnnonseBred}>
              {annonsor
                ? <Annonse annonsor={annonsor} variant="bred" bransjeSlug={naering?.slug} />
                : <AnnonseBww bransjeSlug={naering?.slug} variant="bred" />}
            </div>

            {!bedrift.er_fremhevet && relaterte.length > 0 && (
              <div className={styles.relaterteSection}>
                <h3 className={styles.relTitle}>
                  Andre {naering ? getBransjeFlertall(naering.slug, naering.visningsnavn) : ''} i {bedrift.kommune}
                </h3>
                <div className={styles.relGrid}>
                  {relaterte.map(b => <BedriftKort key={b.organisasjonsnummer} bedrift={b} />)}
                </div>
                {naering && (
                  <a href={`/${naering.slug}/${kommuneSlug}`} className={styles.seAlle}>
                    Se alle i {bedrift.kommune} →
                  </a>
                )}
              </div>
            )}
          </main>

          <aside className={styles.aside}>
            <div className={styles.kontaktBoks}>
              <h2 className={styles.boksTitle}>Kontakt</h2>
              {nettsideUrl ? (
                <a
                  href={nettsideUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn--primary ${styles.kontaktBtn}`}
                  onClick={sporNettsideKlikk}
                >
                  <Globe size={16} /> Gå til nettside
                </a>
              ) : (
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(bedrift.navn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.googleLenke}
                >
                  Finn nettside via Google →
                </a>
              )}
              <a
                href={brregUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn--outline ${styles.brregBtn}`}
              >
                Se på Brreg.no →
              </a>
              {!bedrift.er_fremhevet && (
                <div className={styles.forBedrifterBoks}>
                  <strong>Er dette bedriften din?</strong>
                  <p>Bli fremhevet øverst i søkeresultatene og vis frem det dere er best på.</p>
                  <ul className={styles.forBedrifterListe}>
                    <li><Check size={13} strokeWidth={3} /> Øverst i søkeresultatene</li>
                    <li><Check size={13} strokeWidth={3} /> Logo og beskrivelse</li>
                    <li><Check size={13} strokeWidth={3} /> Spesialiteter for mer treffsikre søk</li>
                  </ul>
                  <a href="/for-bedrifter" className={`btn btn--primary ${styles.forBedrifterBtn}`}>
                    Se hva vi tilbyr →
                  </a>
                </div>
              )}
            </div>
            <div className={styles.seksjonAnnonse}>
              {visToolsinvent
                ? <AnnonseToolsinvent bransjeSlug={naering?.slug} />
                : <AnnonseBww bransjeSlug={naering?.slug} />}
              {annonsor && (
                <Annonse annonsor={annonsor} variant="kompakt" bransjeSlug={naering?.slug} />
              )}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const bedrift = await getBedriftBySlug(params.slug);
  if (!bedrift) return { notFound: true };
  const relaterte = await getRelaterteBedrifter(bedrift.naeringskode, bedrift.kommunenummer, bedrift.slug);
  const naering = getNaeringByKode(bedrift.naeringskode);
  const annonsor = await getAnnonsorForBransje(naering?.slug);
  return {
    props: { bedrift, relaterte, annonsor },
    revalidate: 86400,
  };
}
