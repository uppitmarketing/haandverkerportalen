// components/AnnonseBww.jsx
// Pilot-annonse for Better WorkWear, plassert nederst i kontaktboksen på
// bedriftsprofilsider. Vist på ett bestemt bedriftsslug til å begynne med
// (se BWW_PILOT_SLUGS i pages/bedrift/[slug].jsx) mens vi venter på
// tilbakemelding fra kunden. Ikke koblet til det generiske annonsørsystemet
// (lib/annonsorer.js) - egen, håndkodet pilot inntil videre.
import { useEffect, useRef } from 'react';
import { sporHendelse } from '../lib/gtag';
import { sporInternHendelse } from '../lib/internAnalytics';
import styles from './AnnonseBww.module.css';

// Næringskategori -> tittel. Merkenavnet står i selve tittelen for
// gjenkjennelse, siden vi ikke lenger viser logo. Fallback dekker alt annet.
const TITTEL = {
  elektriker: 'Better WorkWear – arbeidsklær for elektrikere',
  tomrer: 'Better WorkWear – arbeidsklær for tømrere',
  rorlegger: 'Better WorkWear – arbeidsklær for rørleggere',
  maler: 'Better WorkWear – arbeidsklær for malere',
  grunnarbeid: 'Better WorkWear – arbeidsklær for utendørsarbeid',
};
const FALLBACK_TITTEL = 'Better WorkWear – arbeidsklær for håndverkere';

const FOTO_URL = 'https://www.betterworkwear.no/media/wysiwyg/hero-test3.jpg';

function byggLenke(bransjeSlug) {
  const params = new URLSearchParams({
    utm_source: 'haandverkerportalen',
    utm_medium: 'referral',
    utm_campaign: 'bww_pilot',
    utm_content: bransjeSlug || 'ukjent',
  });
  return `https://www.betterworkwear.no/?${params.toString()}`;
}

export default function AnnonseBww({ bransjeSlug }) {
  const kortRef = useRef(null);
  const harRapportertVisning = useRef(false);

  const tittel = TITTEL[bransjeSlug] || FALLBACK_TITTEL;
  const lenke = byggLenke(bransjeSlug);

  useEffect(() => {
    const el = kortRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    let timer = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (harRapportertVisning.current) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          timer = setTimeout(() => {
            harRapportertVisning.current = true;
            sporHendelse('ad_impression', { ad_partner: 'bww', ad_content: bransjeSlug || 'ukjent', page_location: window.location.href });
            sporInternHendelse(`/_annonse/visning/annonse/bww/${bransjeSlug || 'ukjent'}`);
            observer.disconnect();
          }, 1000);
        } else if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(el);
    return () => { observer.disconnect(); if (timer) clearTimeout(timer); };
  }, [bransjeSlug]);

  function handleKlikk() {
    sporHendelse('ad_click', { ad_partner: 'bww', ad_content: bransjeSlug || 'ukjent', page_location: window.location.href });
    sporInternHendelse(`/_annonse/klikk/annonse/bww/${bransjeSlug || 'ukjent'}`);
  }

  return (
    <a
      ref={kortRef}
      href={lenke}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={styles.kort}
      onClick={handleKlikk}
    >
      <div className={styles.header}>
        <span className={styles.label}>Annonse</span>
      </div>
      <div className={styles.foto}>
        <img src={FOTO_URL} alt="Better WorkWear arbeidsklær" loading="lazy" />
      </div>
      <div className={styles.innhold}>
        <div className={styles.tittel}>{tittel}</div>
        <div className={styles.undertekst}>Faste priser og rabatt for bedrifter</div>
      </div>
      <div className={styles.merker}>Bulldog · L.Brador · Wrks · Snickers Workwear</div>
      <div className={styles.cta}>
        Se mer her
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </div>
    </a>
  );
}
