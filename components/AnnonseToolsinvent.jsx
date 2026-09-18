// components/AnnonseToolsinvent.jsx
// Toolsinvent-annonse, vist på elektrikersider i stedet for Better WorkWear
// (se rotasjon i pages/bedrift/[slug].jsx). Bruker samme stilark som
// AnnonseBww.jsx med vilje - annonsene skal se uniformt ut uansett annonsør,
// ikke ha sin egen fargeprofil.
import { useEffect, useRef } from 'react';
import { sporHendelse } from '../lib/gtag';
import { sporInternHendelse } from '../lib/internAnalytics';
import styles from './AnnonseBww.module.css';

// Hostet selv (ikke hotlinket) - se public/assets/annonsorer/toolsinvent-hero-elektriker.jpg.
const FOTO_URL = '/assets/annonsorer/toolsinvent-hero-elektriker.jpg';

function byggLenke(bransjeSlug) {
  const params = new URLSearchParams({
    utm_source: 'haandverkerportalen',
    utm_medium: 'referral',
    utm_campaign: 'toolsinvent_pilot',
    utm_content: bransjeSlug || 'ukjent',
  });
  return `https://nettbutikk.toolsinvent.no/?${params.toString()}`;
}

export default function AnnonseToolsinvent({ bransjeSlug }) {
  const kortRef = useRef(null);
  const harRapportertVisning = useRef(false);

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
            sporHendelse('ad_impression', { ad_partner: 'toolsinvent', ad_content: bransjeSlug || 'ukjent', page_location: window.location.href });
            sporInternHendelse(`/_annonse/visning/annonse/toolsinvent/${bransjeSlug || 'ukjent'}`);
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
    sporHendelse('ad_click', { ad_partner: 'toolsinvent', ad_content: bransjeSlug || 'ukjent', page_location: window.location.href });
    sporInternHendelse(`/_annonse/klikk/annonse/toolsinvent/${bransjeSlug || 'ukjent'}`);
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
        <img src={FOTO_URL} alt="Toolsinvent Spotless Pro i bruk" loading="lazy" />
        <div className={styles.overlay}>
          <div className={styles.overlayTittel}>Toolsinvent – Spotless Pro</div>
          <div className={styles.overlayUndertekst}>Fang opp støv og rusk når du borer i tak</div>
          <span className={styles.overlayCta}>
            Se mer her
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </div>
    </a>
  );
}
