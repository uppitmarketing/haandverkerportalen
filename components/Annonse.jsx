// components/Annonse.jsx
import styles from './Annonse.module.css';

export default function Annonse({ annonsor, variant = 'bred' }) {
  if (!annonsor) {
    return (
      <div className={variant === 'kompakt' ? styles.plassholderKompakt : styles.plassholder}>
        📢 Annonseplass ledig — <a href="/annonsering">se annonsemuligheter</a>
      </div>
    );
  }

  return (
    <a
      href={annonsor.lenke}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={variant === 'kompakt' ? styles.kortKompakt : styles.kortBred}
    >
      <div className={styles.bilde}>
        {annonsor.bilde_url ? (
          <img src={annonsor.bilde_url} alt={annonsor.alt_tekst || annonsor.navn} />
        ) : (
          <span className={styles.bildePlassholder}>{annonsor.navn.charAt(0)}</span>
        )}
      </div>
      <div className={styles.tekst}>
        <strong>{annonsor.navn}</strong>
        {annonsor.alt_tekst && <p>{annonsor.alt_tekst}</p>}
      </div>
      <span className={styles.merke}>Annonse</span>
    </a>
  );
}
