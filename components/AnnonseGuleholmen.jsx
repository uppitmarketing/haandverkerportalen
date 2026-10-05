// components/AnnonseGuleholmen.jsx
// Guleholmen-annonse i den brede plassen under FAQ på bedriftsprofiler.
// Annonsøren leverer en ferdig kampanjebanner (tekst og knapp ligger i selve
// bildet), så den vises i full størrelse uten overlegg - i motsetning til
// AnnonseBww/AnnonseToolsinvent som legger tittel og CTA over et foto.
import { useEffect, useRef } from 'react';
import { sporHendelse } from '../lib/gtag';
import { sporInternHendelse } from '../lib/internAnalytics';
import styles from './AnnonseBww.module.css';

// Hostet selv (ikke hotlinket) - se public/assets/annonsorer/guleholmen-hero.webp.
// Kampanjebildet er sesongbasert (Høstsalg) og må byttes manuelt når kampanjen går ut.
const FOTO_URL = '/assets/annonsorer/guleholmen-hero.webp';
const FOTO_BREDDE = 1717;
const FOTO_HOYDE = 916;

function byggLenke(bransjeSlug) {
  const params = new URLSearchParams({
    utm_source: 'haandverkerportalen',
    utm_medium: 'referral',
    utm_campaign: 'guleholmen_pilot',
    utm_content: bransjeSlug || 'ukjent',
  });
  return `https://www.guleholmen.no/categories/apningstilbud?${params.toString()}`;
}

export default function AnnonseGuleholmen({ bransjeSlug, variant = 'bred' }) {
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
            sporHendelse('ad_impression', { ad_partner: 'guleholmen', ad_content: bransjeSlug || 'ukjent', ad_placement: variant, page_location: window.location.href });
            sporInternHendelse(`/_annonse/visning/annonse/guleholmen/${bransjeSlug || 'ukjent'}/${variant}`);
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
    sporHendelse('ad_click', { ad_partner: 'guleholmen', ad_content: bransjeSlug || 'ukjent', ad_placement: variant, page_location: window.location.href });
    sporInternHendelse(`/_annonse/klikk/annonse/guleholmen/${bransjeSlug || 'ukjent'}/${variant}`);
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
      <img
        src={FOTO_URL}
        width={FOTO_BREDDE}
        height={FOTO_HOYDE}
        alt="Guleholmen høstsalg – opptil 70 % rabatt på kvalitetsutstyr"
        loading="lazy"
        className={styles.kampanjebanner}
      />
    </a>
  );
}
