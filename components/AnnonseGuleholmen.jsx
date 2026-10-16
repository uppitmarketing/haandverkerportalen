// components/AnnonseGuleholmen.jsx
// Guleholmen-annonse i den brede plassen under FAQ på bedriftsprofiler.
// Viser rabatterte WRKS-produkter i en karusell fra Guleholmens Google Shopping-feed
// (synkronisert daglig til annonse_produkter av guleholmen_feed_sync.js).
// Hvis utvalget mangler eller er for gammelt vises i stedet den statiske
// kampanjebanneren, slik at vi aldri viser utdaterte priser.
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { sporHendelse } from '../lib/gtag';
import { sporInternHendelse } from '../lib/internAnalytics';
import bwwStyles from './AnnonseBww.module.css';
import styles from './AnnonseGuleholmen.module.css';

// Hostet selv (ikke hotlinket) - se public/assets/annonsorer/guleholmen-hero.webp.
// Kampanjebildet er sesongbasert (Høstsalg) og må byttes manuelt når kampanjen går ut.
const FOTO_URL = '/assets/annonsorer/guleholmen-hero.webp';
const FOTO_BREDDE = 1717;
const FOTO_HOYDE = 916;

const MIN_PRODUKTER = 4; // færre enn dette gir ikke en meningsfull karusell - vis banner
// Feeden synkes daglig; er utvalget eldre enn dette (synk har stoppet) faller
// vi tilbake til banneren i stedet for å risikere en utdatert pris.
const HENTE_TIMEOUT_MS = 4000;
const MAKS_ALDER_MS = 72 * 60 * 60 * 1000;

const krFormat = new Intl.NumberFormat('nb-NO', { maximumFractionDigits: 0 });
const kr = (n) => `${krFormat.format(n)} kr`;

function byggLenke(url, bransjeSlug) {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'haandverkerportalen');
    u.searchParams.set('utm_medium', 'referral');
    u.searchParams.set('utm_campaign', 'guleholmen_pilot');
    u.searchParams.set('utm_content', bransjeSlug || 'ukjent');
    return u.toString();
  } catch {
    return url;
  }
}

function bannerLenke(bransjeSlug) {
  return byggLenke('https://www.guleholmen.no/categories/apningstilbud', bransjeSlug);
}

// Tilfeldig rekkefølge per visning, så ikke de samme fire alltid står først
function stokk(liste) {
  const kopi = [...liste];
  for (let i = kopi.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopi[i], kopi[j]] = [kopi[j], kopi[i]];
  }
  return kopi;
}

export default function AnnonseGuleholmen({ bransjeSlug, variant = 'bred' }) {
  const kortRef = useRef(null);
  const harRapportertVisning = useRef(false);
  const sporRef = useRef(null);
  const harRapportertBlaing = useRef(false);
  const [kanBlaVenstre, setKanBlaVenstre] = useState(false);
  const [kanBlaHoyre, setKanBlaHoyre] = useState(true);
  // null = laster, [] = ingen gyldige produkter (vis banner)
  const [produkter, setProdukter] = useState(null);
  const modus = produkter === null ? 'laster' : produkter.length >= MIN_PRODUKTER ? 'produkter' : 'banner';

  useEffect(() => {
    let avbrutt = false;
    (async () => {
      try {
        // Henger spørringen (nett- eller låsproblem) vises banneren i stedet for en tom plass
        const timeout = new Promise((_, avvis) => setTimeout(() => avvis(new Error('timeout')), HENTE_TIMEOUT_MS));
        const { data, error } = await Promise.race([
          supabase
            .from('annonse_produkter')
            .select('id, tittel, bilde_url, lenke, pris, salgspris, rabatt_prosent, oppdatert')
            .eq('partner', 'guleholmen'),
          timeout,
        ]);
        if (error) throw error;
        const naa = Date.now();
        const ferske = (data || []).filter(p =>
          p.salgspris && p.salgspris < p.pris && naa - new Date(p.oppdatert).getTime() < MAKS_ALDER_MS
        );
        if (!avbrutt) setProdukter(stokk(ferske));
      } catch {
        if (!avbrutt) setProdukter([]);
      }
    })();
    return () => { avbrutt = true; };
  }, []);

  useEffect(() => {
    const el = kortRef.current;
    if (modus === 'laster' || !el || typeof IntersectionObserver === 'undefined') return;

    let timer = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (harRapportertVisning.current) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          timer = setTimeout(() => {
            harRapportertVisning.current = true;
            sporHendelse('ad_impression', { ad_partner: 'guleholmen', ad_content: bransjeSlug || 'ukjent', ad_placement: variant, ad_format: modus, page_location: window.location.href });
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
  }, [bransjeSlug, variant, modus]);

  function oppdaterBlaKnapper() {
    const spor = sporRef.current;
    if (!spor) return;
    setKanBlaVenstre(spor.scrollLeft > 4);
    setKanBlaHoyre(spor.scrollLeft + spor.clientWidth < spor.scrollWidth - 4);
    if (!harRapportertBlaing.current && spor.scrollLeft > 4) {
      harRapportertBlaing.current = true;
      sporHendelse('ad_interaction', { ad_partner: 'guleholmen', ad_content: bransjeSlug || 'ukjent', ad_placement: variant, ad_interaction: 'carousel_scroll', page_location: window.location.href });
    }
  }

  function bla(retning) {
    const spor = sporRef.current;
    if (!spor) return;
    const reduser = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    spor.scrollBy({ left: retning * spor.clientWidth * 0.9, behavior: reduser ? 'auto' : 'smooth' });
  }

  function handleKlikk(produktId) {
    sporHendelse('ad_click', { ad_partner: 'guleholmen', ad_content: bransjeSlug || 'ukjent', ad_placement: variant, ad_format: modus, ad_product: produktId || 'banner', page_location: window.location.href });
    sporInternHendelse(`/_annonse/klikk/annonse/guleholmen/${bransjeSlug || 'ukjent'}/${variant}`);
  }

  return (
    <div ref={kortRef} className={`${bwwStyles.kort} ${variant === 'liste' ? styles.liste : ''}`}>
      <div className={bwwStyles.header}>
        <span className={bwwStyles.label}>Annonse · Guleholmen.no</span>
      </div>

      {modus === 'laster' && <div className={styles.plassholder} aria-hidden="true" />}

      {modus === 'produkter' && (
        <>
          <p className={styles.ingress}>Arbeidsklær på tilbud</p>
          <div className={styles.karusell}>
            <ul className={styles.spor} ref={sporRef} onScroll={oppdaterBlaKnapper}>
              {produkter.map(p => (
                <li key={p.id} className={styles.rute}>
                  <a
                    href={byggLenke(p.lenke, bransjeSlug)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={styles.produkt}
                    onClick={() => handleKlikk(p.id)}
                  >
                    <span className={styles.bildeRamme}>
                      <img src={p.bilde_url} alt="" width={400} height={400} loading="lazy" className={styles.bilde} />
                      <span className={styles.rabatt}>-{p.rabatt_prosent} %</span>
                    </span>
                    <span className={styles.tittel}>{p.tittel}</span>
                    <span className={styles.priser}>
                      <span className={styles.salgspris}>{kr(p.salgspris)}</span>
                      <s className={styles.ordinaerpris}>{kr(p.pris)}</s>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`${styles.pil} ${styles.pilVenstre}`}
              onClick={() => bla(-1)}
              disabled={!kanBlaVenstre}
              aria-label="Forrige produkter"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              type="button"
              className={`${styles.pil} ${styles.pilHoyre}`}
              onClick={() => bla(1)}
              disabled={!kanBlaHoyre}
              aria-label="Neste produkter"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </>
      )}

      {modus === 'banner' && (
        <a
          href={bannerLenke(bransjeSlug)}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={styles.bannerLenke}
          onClick={() => handleKlikk(null)}
        >
          <img
            src={FOTO_URL}
            width={FOTO_BREDDE}
            height={FOTO_HOYDE}
            alt="Guleholmen høstsalg – opptil 70 % rabatt på kvalitetsutstyr"
            loading="lazy"
            className={bwwStyles.kampanjebanner}
          />
        </a>
      )}
    </div>
  );
}
