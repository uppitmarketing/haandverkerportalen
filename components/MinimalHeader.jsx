// components/MinimalHeader.jsx
// Nedtonet toppstripe brukt i stedet for den vanlige Header-en på sider som
// skal føles mer frittstående - f.eks. fremhevede bedriftsprofiler. Ingen
// søk, bransjer/guider-lenker eller "For bedrifter"-knapp, kun en vei
// tilbake til portalen.
import Link from 'next/link';
import styles from './MinimalHeader.module.css';

export default function MinimalHeader() {
  return (
    <div className={styles.strip}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.back}>← Tilbake til søk</Link>
        <Link href="/" className={styles.brand}>
          Drevet av <b>HåndverkerPortalen</b>
        </Link>
      </div>
    </div>
  );
}
