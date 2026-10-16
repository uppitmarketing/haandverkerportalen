// components/AnnonseBww.jsx
// Better WorkWear-annonse, vist på alle bedriftsprofilsider. Ikke koblet
// til det generiske annonsørsystemet (lib/annonsorer.js) - egen,
// håndkodet integrasjon inntil videre.
import { useEffect, useRef } from 'react';
import { sporHendelse } from '../lib/gtag';
import { sporInternHendelse } from '../lib/internAnalytics';
import styles from './AnnonseBww.module.css';

// Næringskategori -> tittel. Avsenderen står i annonsens header («Annonse · Better
// WorkWear»), så tittelen kan bruke hele plassen på hvem annonsen er for.
const TITTEL = {
  elektriker: 'Arbeidsklær for elektrikere',
  tomrer: 'Arbeidsklær for tømrere',
  rorlegger: 'Arbeidsklær for rørleggere',
  maler: 'Arbeidsklær for malere',
  grunnarbeid: 'Arbeidsklær for utendørsarbeid',
};
const FALLBACK_TITTEL = 'Arbeidsklær for håndverkere';
const UNDERTEKST = 'Faste priser og rabatt for bedrifter';
const CTA = 'Se arbeidsklærne';

// Hostet selv (ikke hotlinket). Må lastes ned og committes på nytt manuelt hvis
// Better WorkWear bytter bilde. Standardbildet viser en anleggsplass; legg inn et
// bransjetilpasset bilde her (f.eks. rorlegger) så snart BWW leverer ett.
const FOTO_STANDARD = '/assets/annonsorer/bww-hero-elektriker.jpg';
const FOTO_PER_BRANSJE = {
  // rorlegger: '/assets/annonsorer/bww-hero-rorlegger.jpg',
};
// Versjon av annonsematerialet, sendes til GA4 så endringer i tekst/bilde kan sammenlignes
const MATERIELL_VERSJON = 'v2';

function byggLenke(bransjeSlug) {
  const params = new URLSearchParams({
    utm_source: 'haandverkerportalen',
    utm_medium: 'referral',
    utm_campaign: 'bww_pilot',
    utm_content: bransjeSlug || 'ukjent',
  });
  return `https://www.betterworkwear.no/?${params.toString()}`;
}

export default function AnnonseBww({ bransjeSlug, variant = 'kompakt' }) {
  const kortRef = useRef(null);
  const harRapportertVisning = useRef(false);
  const erBred = variant === 'bred';

  const tittel = TITTEL[bransjeSlug] || FALLBACK_TITTEL;
  const fotoUrl = FOTO_PER_BRANSJE[bransjeSlug] || FOTO_STANDARD;
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
            sporHendelse('ad_impression', { ad_partner: 'bww', ad_content: bransjeSlug || 'ukjent', ad_placement: variant, ad_version: MATERIELL_VERSJON, page_location: window.location.href });
            sporInternHendelse(`/_annonse/visning/annonse/bww/${bransjeSlug || 'ukjent'}/${variant}`);
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
  }, [bransjeSlug, variant]);

  function handleKlikk() {
    sporHendelse('ad_click', { ad_partner: 'bww', ad_content: bransjeSlug || 'ukjent', ad_placement: variant, ad_version: MATERIELL_VERSJON, page_location: window.location.href });
    sporInternHendelse(`/_annonse/klikk/annonse/bww/${bransjeSlug || 'ukjent'}/${variant}`);
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
        <span className={styles.label}>Annonse · Better WorkWear</span>
      </div>
      <div className={`${styles.foto} ${erBred ? styles.fotoBred : ''}`}>
        <img src={fotoUrl} alt="Arbeidsklær fra Better WorkWear" loading="lazy" />
        <div className={styles.overlay}>
          {erBred ? (
            <div className={styles.overlayBred}>
              <div className={styles.overlayTekstBred}>
                <div className={styles.overlayTittel}>{tittel}</div>
                <div className={styles.overlayUndertekst}>{UNDERTEKST}</div>
              </div>
              <span className={`${styles.overlayCta} ${styles.overlayCtaBred}`}>
                {CTA}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
          ) : (
            <>
              <div className={styles.overlayTittel}>{tittel}</div>
              <div className={styles.overlayUndertekst}>{UNDERTEKST}</div>
              <span className={styles.overlayCta}>
                {CTA}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </>
          )}
        </div>
      </div>
    </a>
  );
}
