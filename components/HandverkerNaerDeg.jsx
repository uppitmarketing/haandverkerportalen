// components/HandverkerNaerDeg.jsx
import { useState, useEffect } from 'react';
import BedriftKort from './BedriftKort';
import { matchKommuneFraNavn, getBedrifterNaerDeg } from '../lib/db';
import styles from './HandverkerNaerDeg.module.css';

export default function HandverkerNaerDeg({ standardBedrifter, standardKommuneNavn }) {
  const [bedrifter, setBedrifter] = useState(standardBedrifter);
  const [kommuneNavn, setKommuneNavn] = useState(standardKommuneNavn);
  const [status, setStatus] = useState('idle'); // idle | henter | feilet | funnet
  const [kanSpore, setKanSpore] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) return;

    if (!('permissions' in navigator)) {
      setKanSpore(true);
      return;
    }

    navigator.permissions
      .query({ name: 'geolocation' })
      .then(res => {
        setKanSpore(true);
        if (res.state === 'granted') hentPosisjon();
      })
      .catch(() => setKanSpore(true));
  }, []);

  function hentPosisjon() {
    setStatus('henter');
    navigator.geolocation.getCurrentPosition(onPosisjon, onFeil, {
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
        data?.address?.municipality ||
        data?.address?.city ||
        data?.address?.town ||
        data?.address?.village ||
        null;

      const kommune = matchKommuneFraNavn(stedNavn);
      if (!kommune) {
        setStatus('feilet');
        return;
      }

      const nye = await getBedrifterNaerDeg(kommune.nummer);
      if (nye.length === 0) {
        setStatus('feilet');
        return;
      }

      setBedrifter(nye);
      setKommuneNavn(kommune.navn);
      setStatus('funnet');
    } catch {
      setStatus('feilet');
    }
  }

  function onFeil() {
    setStatus('feilet');
  }

  if (bedrifter.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Håndverkere nær deg</h2>
            <p className={styles.sub}>
              {status === 'funnet'
                ? `Basert på din posisjon i ${kommuneNavn}`
                : `Populære håndverkere i ${kommuneNavn}`}
            </p>
          </div>

          {kanSpore && status === 'idle' && (
            <button onClick={hentPosisjon} className={styles.knapp}>
              📍 Vis nær meg
            </button>
          )}
          {status === 'henter' && <span className={styles.laster}>Finner posisjonen din...</span>}
        </div>

        <div className={styles.grid}>
          {bedrifter.map(b => (
            <BedriftKort key={b.organisasjonsnummer} bedrift={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
