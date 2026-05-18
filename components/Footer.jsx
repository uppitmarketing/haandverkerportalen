// components/Footer.jsx
import Link from 'next/link';
import { NAERINGSKODER } from '../lib/db';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>Håndverker<span>Portalen</span></div>
          <p className={styles.desc}>Norges håndverkerregister.<br />Data fra Brønnøysundregistrene.</p>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Bransjer</h4>
          <ul className={styles.links}>
            {NAERINGSKODER.slice(0, 5).map(n => (
              <li key={n.slug}><Link href={`/${n.slug}`}>{n.visningsnavn}</Link></li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Byer</h4>
          <ul className={styles.links}>
            <li><Link href="/elektriker/oslo">Elektriker i Oslo</Link></li>
            <li><Link href="/rorlegger/bergen">Rørlegger i Bergen</Link></li>
            <li><Link href="/tomrer/kristiansand">Tømrer i Kristiansand</Link></li>
            <li><Link href="/maler/stavanger">Maler i Stavanger</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Om portalen</h4>
          <ul className={styles.links}>
            <li><Link href="/om-oss">Om oss</Link></li>
            <li><Link href="/for-bedrifter">For bedrifter</Link></li>
            <li><Link href="/annonsering">Annonsering</Link></li>
            <li><Link href="/personvern">Personvern</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <span>© {new Date().getFullYear()} HåndverkerPortalen · Data fra Brønnøysundregistrene (NLOD) · Uppit AS</span>
        </div>
      </div>
    </footer>
  );
}
