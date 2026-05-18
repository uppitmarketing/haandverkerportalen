// components/Header.jsx
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          Håndverker<span>Portalen</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/bransjer" className={styles.navLink}>Bransjer</Link>
          <Link href="/artikler" className={styles.navLink}>Guider</Link>
          <Link href="/om-oss" className={styles.navLink}>Om oss</Link>
        </nav>
        <Link href="/for-bedrifter" className={`btn btn--primary ${styles.cta}`}>
          For bedrifter
        </Link>
      </div>
    </header>
  );
}
