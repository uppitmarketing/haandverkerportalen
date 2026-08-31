// pages/admin/analytics.jsx
import { useState } from 'react';
import Head from 'next/head';
import { getSupabaseAdmin } from '../../lib/supabaseAdmin';
import { erGyldigToken } from '../../lib/analyticsAuth';
import styles from '../../styles/Analytics.module.css';

const PERIODER = [
  { key: '24h', label: 'Siste 24 timer' },
  { key: '7d', label: 'Siste 7 dager' },
  { key: 'all', label: 'Totalt' },
];

export default function AnalyticsSide({
  innlogget, sider, totalVisninger, totalBotVisninger, totalUnikeSider, periode, oppsettFeil,
}) {
  const [passord, setPassord] = useState('');
  const [feil, setFeil] = useState('');
  const [laster, setLaster] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLaster(true);
    setFeil('');
    const res = await fetch('/api/analytics-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passord }),
    });
    setLaster(false);
    if (res.ok) {
      window.location.reload();
    } else {
      setFeil('Feil passord');
    }
  }

  return (
    <>
      <Head>
        <title>Analytics – HåndverkerPortalen</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {!innlogget ? (
        <div className={styles.loginWrap}>
          <form onSubmit={handleLogin} className={styles.loginBoks}>
            <h1 className={styles.loginTitle}>Analytics</h1>
            <input
              type="password"
              value={passord}
              onChange={e => setPassord(e.target.value)}
              placeholder="Passord"
              className={styles.loginInput}
              autoFocus
            />
            <button type="submit" className={styles.loginBtn} disabled={laster}>
              {laster ? 'Sjekker...' : 'Logg inn'}
            </button>
            {feil && <p className={styles.loginFeil}>{feil}</p>}
          </form>
        </div>
      ) : (
        <div className={styles.page}>
          <div className={styles.header}>
            <h1 className={styles.title}>Analytics</h1>
            <a href="/api/analytics-logout" className={styles.loggUt}>Logg ut</a>
          </div>

          {oppsettFeil ? (
            <div className={styles.tabellBoks}>
              <p className={styles.tomt}>
                Klarte ikke å hente data ({oppsettFeil}). Sjekk at SQL-scriptet er kjørt i Supabase
                og at <code>SUPABASE_SERVICE_ROLE_KEY</code> er satt.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.perioder}>
                {PERIODER.map(p => (
                  <a
                    key={p.key}
                    href={`/admin/analytics?periode=${p.key}`}
                    className={`${styles.periodeBtn} ${periode === p.key ? styles.periodeAktiv : ''}`}
                  >
                    {p.label}
                  </a>
                ))}
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statNum}>{totalVisninger.toLocaleString('no')}</div>
                  <div className={styles.statLabel}>Ekte sidevisninger</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNum}>{totalUnikeSider.toLocaleString('no')}</div>
                  <div className={styles.statLabel}>Unike sider besøkt</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNum}>{totalBotVisninger.toLocaleString('no')}</div>
                  <div className={styles.statLabel}>Bot-/crawler-besøk</div>
                </div>
              </div>

              <div className={styles.tabellBoks}>
                {sider.length === 0 ? (
                  <p className={styles.tomt}>Ingen sidevisninger registrert i denne perioden.</p>
                ) : (
                  <table className={styles.tabell}>
                    <thead>
                      <tr>
                        <th>Side</th>
                        <th>Visninger</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sider.map(s => (
                        <tr key={s.visningssti}>
                          <td>
                            {s.visningssti.includes('*') ? (
                              <span>{s.visningssti}</span>
                            ) : (
                              <a href={s.visningssti} target="_blank" rel="noopener noreferrer">{s.visningssti}</a>
                            )}
                          </td>
                          <td>{s.antall.toLocaleString('no')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ req, query }) {
  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/hp_analytics_auth=([^;]+)/);
  const cookieToken = match ? match[1] : null;
  const passord = process.env.ANALYTICS_PASSWORD;

  const innlogget = erGyldigToken(cookieToken, passord);
  const gyldigePerioder = PERIODER.map(p => p.key);
  const periode = gyldigePerioder.includes(query.periode) ? query.periode : 'all';

  if (!innlogget) {
    return {
      props: {
        innlogget: false, sider: [], totalVisninger: 0, totalBotVisninger: 0,
        totalUnikeSider: 0, periode, oppsettFeil: null,
      },
    };
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    let fra = null;
    if (periode === '24h') fra = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    if (periode === '7d') fra = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabaseAdmin.rpc('page_view_counts', { fra });
    if (error) throw new Error(error.message);

    const alle = data || [];
    const ekte = alle.filter(r => !r.er_bot);
    const bots = alle.filter(r => r.er_bot);

    const totalVisninger = ekte.reduce((sum, r) => sum + Number(r.antall), 0);
    const totalBotVisninger = bots.reduce((sum, r) => sum + Number(r.antall), 0);
    const sider = ekte.slice(0, 300);

    return {
      props: {
        innlogget: true,
        sider,
        totalVisninger,
        totalBotVisninger,
        totalUnikeSider: ekte.length,
        periode,
        oppsettFeil: null,
      },
    };
  } catch (err) {
    return {
      props: {
        innlogget: true, sider: [], totalVisninger: 0, totalBotVisninger: 0,
        totalUnikeSider: 0, periode, oppsettFeil: err.message || 'Ukjent feil',
      },
    };
  }
}
