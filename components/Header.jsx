// components/Header.jsx
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const [sokApen, setSokApen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (sokApen) inputRef.current?.focus();
  }, [sokApen]);

  useEffect(() => {
    function handleClickUtenfor(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setSokApen(false);
    }
    function handleEscape(e) {
      if (e.key === 'Escape') setSokApen(false);
    }
    document.addEventListener('mousedown', handleClickUtenfor);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickUtenfor);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/sok?q=${encodeURIComponent(q.trim())}`);
    setSokApen(false);
    setQ('');
  }

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
        <div className={styles.right}>
          <div className={styles.sokWrap} ref={wrapRef}>
            <button
              type="button"
              className={styles.sokBtn}
              onClick={() => setSokApen(v => !v)}
              aria-label="Søk etter bedrift"
              aria-expanded={sokApen}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {sokApen && (
              <form onSubmit={handleSubmit} className={styles.sokForm}>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.sokInput}
                  placeholder="Bedriftsnavn..."
                  value={q}
                  onChange={e => setQ(e.target.value)}
                />
                <button type="submit" className={styles.sokSubmit}>Søk</button>
              </form>
            )}
          </div>
          <Link href="/for-bedrifter" className={`btn btn--primary ${styles.cta}`}>
            For bedrifter
          </Link>
        </div>
      </div>
    </header>
  );
}
