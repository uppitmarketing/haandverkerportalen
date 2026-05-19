// components/Kart.jsx
import { useState, useEffect } from 'react';
import styles from './Kart.module.css';

export default function Kart({ adresse, postnummer, poststed }) {
  const [coords, setCoords] = useState(null);
  const [feil, setFeil] = useState(false);

  const adresseStreng = [adresse, postnummer, poststed, 'Norge']
    .filter(Boolean)
    .join(', ');

  useEffect(() => {
    if (!adresseStreng) return;

    fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adresseStreng)}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'no' } }
    )
      .then(r => r.json())
      .then(data => {
        if (data && data.length > 0) {
          setCoords({ lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) });
        } else {
          setFeil(true);
        }
      })
      .catch(() => setFeil(true));
  }, [adresseStreng]);

  if (feil) return null;

  if (!coords) {
    return <div className={styles.laster}>Laster kart...</div>;
  }

  const { lat, lon } = coords;
  const zoom = 15;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01},${lat - 0.007},${lon + 0.01},${lat + 0.007}&layer=mapnik&marker=${lat},${lon}`;
  const kartUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;

  return (
    <div className={styles.wrapper}>
      <iframe
        title="Kart"
        src={embedUrl}
        className={styles.kart}
        loading="lazy"
      />
      <a
        href={kartUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.lenke}
      >
        Åpne i OpenStreetMap →
      </a>
    </div>
  );
}
