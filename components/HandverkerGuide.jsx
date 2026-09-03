// components/HandverkerGuide.jsx
import { useState, useEffect, useRef } from 'react';
import { NAERINGSKODER, KOMMUNER, matchKommuneFraNavn, getAntallForBransjeKommune } from '../lib/db';
import { sporInternHendelse } from '../lib/internAnalytics';
import styles from './HandverkerGuide.module.css';

const EKSEMPLER = {
  elektriker: 'strøm, sikringsskap, belysning',
  rorlegger: 'vann, avløp, bad',
  tomrer: 'snekring, ombygging, tilbygg',
  byggmester: 'nybygg, større prosjekter',
  maler: 'innvendig, utvendig, tapetsering',
  taklegger: 'tekking, taklekkasje',
  gulvlegger: 'parkett, laminat, flis',
  grunnarbeid: 'graving, drenering, tomt',
};

const POPULAERE_STEDER = ['oslo', 'bergen', 'trondheim', 'stavanger', 'drammen']
  .map(slug => KOMMUNER.find(k => k.slug === slug))
  .filter(Boolean);

function sporGuideValg(bransjeSlug, kommuneSlug) {
  sporInternHendelse(`/_guide/${bransjeSlug}/${kommuneSlug}`);
}

export default function HandverkerGuide() {
  const [steg, setSteg] = useState('behov'); // behov | sted | resultat
  const [valgtBehov, setValgtBehov] = useState(null);
  const [valgtKommune, setValgtKommune] = useState(null);
  const [stedTekst, setStedTekst] = useState('');
  const [forslag, setForslag] = useState([]);
  const [uthevet, setUthevet] = useState(-1);
  const [posisjonStatus, setPosisjonStatus] = useState('idle'); // idle | henter | feilet
  const [kanSpore, setKanSpore] = useState(false);
  const [antall, setAntall] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) setKanSpore(true);
  }, []);

  useEffect(() => {
    if (steg === 'sted' && inputRef.current) inputRef.current.focus();
  }, [steg]);

  function velgBehov(behov) {
    setValgtBehov(behov);
    setSteg('sted');
  }

  function oppdaterForslag(tekst) {
    setStedTekst(tekst);
    setUthevet(-1);
    const q = tekst.trim().toLowerCase();
    if (!q) { setForslag([]); return; }
    let treff = KOMMUNER.filter(k => k.navn.toLowerCase().startsWith(q));
    if (treff.length === 0) treff = KOMMUNER.filter(k => k.navn.toLowerCase().includes(q));
    setForslag(treff.slice(0, 6));
  }

  async function velgKommune(kommune) {
    setValgtKommune(kommune);
    setForslag([]);
    setSteg('resultat');
    setAntall(null);
    const nyttAntall = await getAntallForBransjeKommune(valgtBehov.slug, kommune.slug);
    setAntall(nyttAntall);
    sporGuideValg(valgtBehov.slug, kommune.slug);
  }

  function handleStedKeyDown(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setUthevet(i => Math.min(i + 1, forslag.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setUthevet(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (uthevet >= 0 && forslag[uthevet]) {
        velgKommune(forslag[uthevet]);
      } else {
        const treff = KOMMUNER.find(k => k.navn.toLowerCase() === stedTekst.trim().toLowerCase());
        if (treff) velgKommune(treff);
      }
    }
  }

  function brukPosisjon() {
    setPosisjonStatus('henter');
    navigator.geolocation.getCurrentPosition(onPosisjon, onPosisjonFeil, {
      enableHighAccuracy: false,
      timeout: 6000,
      maximumAge: 600000,
    });
  }

  async function onPosisjon(pos) {
    try {
      const { latitude, longitude } = pos.coords;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=no`
      );
      const data = await res.json();
      const stedNavn =
        data?.address?.municipality || data?.address?.city || data?.address?.town || data?.address?.village || null;
      const kommune = matchKommuneFraNavn(stedNavn);
      if (!kommune) { setPosisjonStatus('feilet'); return; }
      setPosisjonStatus('idle');
      velgKommune(kommune);
    } catch {
      setPosisjonStatus('feilet');
    }
  }

  function onPosisjonFeil() {
    setPosisjonStatus('feilet');
  }

  function tilbake() {
    if (steg === 'resultat') { setSteg('sted'); setValgtKommune(null); setAntall(null); }
    else if (steg === 'sted') { setSteg('behov'); setValgtBehov(null); setStedTekst(''); setForslag([]); }
  }

  function startPaNytt() {
    setSteg('behov');
    setValgtBehov(null);
    setValgtKommune(null);
    setStedTekst('');
    setForslag([]);
    setAntall(null);
    setPosisjonStatus('idle');
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.widget}>
          <div className={styles.top}>
            <div className={styles.topInner}>
              <h2 className={styles.h}>Hva trenger du hjelp med?</h2>
              <div className={styles.progress}>
                <span className={`${styles.dot} ${steg !== 'behov' ? styles.ferdig : styles.aktiv}`} />
                <span className={`${styles.dot} ${steg === 'resultat' ? styles.ferdig : steg === 'sted' ? styles.aktiv : ''}`} />
                <span className={`${styles.dot} ${steg === 'resultat' ? styles.aktiv : ''}`} />
              </div>
            </div>
          </div>

          <div className={styles.body}>
            {steg === 'behov' && (
              <div className={styles.behovGrid}>
                {NAERINGSKODER.map(n => (
                  <button key={n.slug} className={styles.behovKort} onClick={() => velgBehov(n)}>
                    <span className={styles.ic}>{n.icon}</span>
                    <span className={styles.navn}>{n.visningsnavn}</span>
                    <span className={styles.eks}>{EKSEMPLER[n.slug]}</span>
                  </button>
                ))}
              </div>
            )}

            {steg === 'sted' && (
              <div className={styles.narrow}>
                <button className={styles.tilbake} onClick={tilbake}>← Tilbake</button>
                <div className={styles.stegTittel}>Hvor trenger du hjelp?</div>
                {kanSpore && (
                  <>
                    <button className={styles.posisjonBtn} onClick={brukPosisjon} disabled={posisjonStatus === 'henter'}>
                      📍 {posisjonStatus === 'henter' ? 'Finner posisjonen din...' : 'Bruk min posisjon'}
                    </button>
                    {posisjonStatus === 'feilet' && (
                      <p className={styles.posisjonFeil}>Fikk ikke tilgang — skriv inn sted i stedet</p>
                    )}
                    <div className={styles.eller}>eller skriv inn selv</div>
                  </>
                )}
                <div className={styles.stedWrap}>
                  <input
                    ref={inputRef}
                    className={styles.stedInput}
                    placeholder="Skriv inn kommune..."
                    autoComplete="off"
                    value={stedTekst}
                    onChange={e => oppdaterForslag(e.target.value)}
                    onKeyDown={handleStedKeyDown}
                  />
                  {forslag.length > 0 && (
                    <div className={styles.forslag}>
                      {forslag.map((k, i) => (
                        <div
                          key={k.slug}
                          className={`${styles.forslagRad} ${i === uthevet ? styles.uthevet : ''}`}
                          onClick={() => velgKommune(k)}
                        >
                          {k.navn}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.stedChips}>
                  {POPULAERE_STEDER.map(k => (
                    <button key={k.slug} className={styles.stedChip} onClick={() => velgKommune(k)}>
                      {k.navn}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {steg === 'resultat' && valgtBehov && valgtKommune && (
              <div className={styles.narrow}>
                <button className={styles.tilbake} onClick={tilbake}>← Tilbake</button>
                <div className={styles.resultatWrap}>
                  <div className={styles.resultatIkon}>✓</div>
                  {antall === null ? (
                    <div className={styles.resultatTekst}>Teller opp…</div>
                  ) : (
                    <div className={styles.resultatTekst}>
                      Fant <span>{antall} {valgtBehov.visningsnavn.toLowerCase()}er</span> i {valgtKommune.navn}
                    </div>
                  )}
                  <p className={styles.resultatSub}>Alle er ekte, registrerte bedrifter — sjekket mot Brønnøysundregistrene.</p>
                  <a href={`/${valgtBehov.slug}/${valgtKommune.slug}`} className={styles.resultatBtn}>
                    Se {valgtBehov.visningsnavn.toLowerCase()}er i {valgtKommune.navn} →
                  </a>
                  <button className={styles.startPaNytt} onClick={startPaNytt}>Start på nytt</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.sokDirekte}>
          <a href="/sok">Vet du navnet på bedriften? Søk direkte →</a>
        </div>
      </div>
    </section>
  );
}
