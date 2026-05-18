// components/BedriftKort.jsx
import Link from 'next/link';
import styles from './BedriftKort.module.css';

export default function BedriftKort({ bedrift }) {
  const { navn, slug, naeringskode_tekst, adresse, poststed,
    postnummer, antall_ansatte, organisasjonsform,
    stiftelsesdato, hjemmeside, er_aktiv, konkurs } = bedrift;

  const status = konkurs ? 'Konkurs' : er_aktiv ? 'Aktiv' : 'Inaktiv';
  const statusClass = er_aktiv && !konkurs ? 'tag--green' : 'tag--red';
  const stiftetAar = stiftelsesdato?.substring(0, 4);

  return (
    <Link href={`/bedrift/${slug}`} className={styles.card}>
      <div className={styles.accent} />
      <div className={styles.top}>
        <div className={styles.navn}>{navn}</div>
        <span className={`tag ${statusClass}`}>{status}</span>
      </div>
      {naeringskode_tekst && (
        <div className={styles.naerTag}>{naeringskode_tekst}</div>
      )}
      <ul className={styles.meta}>
        <li>
          <span>📍</span>
          <span>{adresse ? `${adresse}, ` : ''}{postnummer} {poststed}</span>
        </li>
        <li>
          <span>👥</span>
          <span>
            {antall_ansatte != null ? `${antall_ansatte} ansatte` : 'Ukjent antall'}
            {organisasjonsform ? ` · ${organisasjonsform}` : ''}
            {stiftetAar ? ` · Est. ${stiftetAar}` : ''}
          </span>
        </li>
        {hjemmeside && (
          <li>
            <span>🌐</span>
            <span className={styles.nettside}>
              {hjemmeside.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
          </li>
        )}
      </ul>
      <div className={styles.footer}>
        <span className={styles.orgnr}>org.nr {bedrift.organisasjonsnummer}</span>
        <span className={styles.arrow}>Se profil →</span>
      </div>
    </Link>
  );
}
