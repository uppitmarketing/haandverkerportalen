// pages/admin/analytics.jsx
import { useState } from 'react';
import Head from 'next/head';
import { getSupabaseAdmin } from '../../lib/supabaseAdmin';
import { erGyldigToken } from '../../lib/analyticsAuth';
import { NAERINGSKODER } from '../../lib/db';
import styles from '../../styles/Analytics.module.css';

const PERIODER = [
  { key: '24h', label: 'Siste 24 timer' },
  { key: '7d', label: 'Siste 7 dager' },
  { key: 'all', label: 'Totalt' },
];

export default function AnalyticsSide({
  innlogget, sider, totalVisninger, totalBotVisninger, totalUnikeSider, periode,
  enheter, kilder, totalGuideBruk, guideBransjer, totalKlikk, toppKlikk, oppsettFeil,
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

              <div className={styles.kildeSeksjon}>
                <div className={styles.kildePanel}>
                  <h2 className={styles.kildeTittel}>Enhet</h2>
                  {enheter.length === 0 ? (
                    <p className={styles.tomtLite}>Ingen data ennå.</p>
                  ) : (
                    enheter.map(e => (
                      <div key={e.navn} className={styles.kildeRad}>
                        <span className={styles.kildeNavn}>{e.navn}</span>
                        <div className={styles.kildeBar}>
                          <div className={styles.kildeBarFyll} style={{ width: `${e.andel}%` }} />
                        </div>
                        <span className={styles.kildeTall}>{e.antall.toLocaleString('no')}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className={styles.kildePanel}>
                  <h2 className={styles.kildeTittel}>Hvor de kommer fra</h2>
                  {kilder.length === 0 ? (
                    <p className={styles.tomtLite}>Ingen data ennå.</p>
                  ) : (
                    kilder.map(k => (
                      <div key={k.navn} className={styles.kildeRad}>
                        <span className={styles.kildeNavn}>{k.navn}</span>
                        <div className={styles.kildeBar}>
                          <div className={styles.kildeBarFyll} style={{ width: `${k.andel}%` }} />
                        </div>
                        <span className={styles.kildeTall}>{k.antall.toLocaleString('no')}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className={styles.kildeSeksjon}>
                <div className={styles.kildePanel}>
                  <h2 className={styles.kildeTittel}>Guide-bruk ({totalGuideBruk.toLocaleString('no')} fullført)</h2>
                  {guideBransjer.length === 0 ? (
                    <p className={styles.tomtLite}>Ingen bruk registrert ennå.</p>
                  ) : (
                    guideBransjer.map(g => (
                      <div key={g.navn} className={styles.kildeRad}>
                        <span className={styles.kildeNavn}>{g.ikon} {g.visningsnavn}</span>
                        <div className={styles.kildeBar}>
                          <div className={styles.kildeBarFyll} style={{ width: `${g.andel}%` }} />
                        </div>
                        <span className={styles.kildeTall}>{g.antall.toLocaleString('no')}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className={styles.kildePanel}>
                  <h2 className={styles.kildeTittel}>Mest klikket til nettside ({totalKlikk.toLocaleString('no')} totalt)</h2>
                  {toppKlikk.length === 0 ? (
                    <p className={styles.tomtLite}>Ingen klikk registrert ennå.</p>
                  ) : (
                    toppKlikk.map(k => (
                      <div key={k.slug} className={styles.kildeRad}>
                        <a href={`/bedrift/${k.slug}`} target="_blank" rel="noopener noreferrer" className={styles.klikkNavn}>
                          {k.slug}
                        </a>
                        <span className={styles.kildeTall}>{k.antall.toLocaleString('no')}</span>
                      </div>
                    ))
                  )}
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
        totalUnikeSider: 0, periode, enheter: [], kilder: [],
        totalGuideBruk: 0, guideBransjer: [], totalKlikk: 0, toppKlikk: [], oppsettFeil: null,
      },
    };
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    let fra = null;
    if (periode === '24h') fra = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    if (periode === '7d') fra = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [sideRes, kildeRes] = await Promise.all([
      supabaseAdmin.rpc('page_view_counts', { fra }),
      supabaseAdmin.rpc('page_view_besokskilder', { fra }),
    ]);

    if (sideRes.error) throw new Error(sideRes.error.message);
    if (kildeRes.error) throw new Error(kildeRes.error.message);

    const alle = sideRes.data || [];
    const ekte = alle.filter(r => !r.er_bot);
    const bots = alle.filter(r => r.er_bot);

    const ekteSider = ekte.filter(r => !r.visningssti.startsWith('/_'));
    const guideRader = ekte.filter(r => r.visningssti.startsWith('/_guide/'));
    const klikkRader = ekte.filter(r => r.visningssti.startsWith('/_klikk/bedrift/'));

    const totalVisninger = ekteSider.reduce((sum, r) => sum + Number(r.antall), 0);
    const totalBotVisninger = bots.reduce((sum, r) => sum + Number(r.antall), 0);
    const sider = ekteSider.slice(0, 300);

    const totalGuideBruk = guideRader.reduce((sum, r) => sum + Number(r.antall), 0);
    const guideBransjer = (() => {
      const kart = new Map();
      for (const r of guideRader) {
        const bransjeSlug = r.visningssti.split('/')[2];
        kart.set(bransjeSlug, (kart.get(bransjeSlug) || 0) + Number(r.antall));
      }
      return Array.from(kart.entries())
        .map(([slug, antall]) => {
          const naering = NAERINGSKODER.find(n => n.slug === slug);
          return {
            navn: slug,
            visningsnavn: naering?.visningsnavn || slug,
            ikon: naering?.icon || '🔧',
            antall,
            andel: totalGuideBruk > 0 ? Math.round((antall / totalGuideBruk) * 1000) / 10 : 0,
          };
        })
        .sort((a, b) => b.antall - a.antall);
    })();

    const totalKlikk = klikkRader.reduce((sum, r) => sum + Number(r.antall), 0);
    const toppKlikk = [...klikkRader]
      .sort((a, b) => Number(b.antall) - Number(a.antall))
      .slice(0, 15)
      .map(r => ({ slug: r.visningssti.split('/')[3], antall: Number(r.antall) }));

    const kildeRader = kildeRes.data || [];
    const totalKilder = kildeRader.reduce((sum, r) => sum + Number(r.antall), 0);

    const summer = (grupperPå) => {
      const kart = new Map();
      for (const r of kildeRader) {
        const nokkel = r[grupperPå];
        kart.set(nokkel, (kart.get(nokkel) || 0) + Number(r.antall));
      }
      return Array.from(kart.entries())
        .map(([navn, antall]) => ({
          navn,
          antall,
          andel: totalKilder > 0 ? Math.round((antall / totalKilder) * 1000) / 10 : 0,
        }))
        .sort((a, b) => b.antall - a.antall);
    };

    return {
      props: {
        innlogget: true,
        sider,
        totalVisninger,
        totalBotVisninger,
        totalUnikeSider: ekteSider.length,
        periode,
        enheter: summer('enhet'),
        kilder: summer('kilde'),
        totalGuideBruk,
        guideBransjer,
        totalKlikk,
        toppKlikk,
        oppsettFeil: null,
      },
    };
  } catch (err) {
    return {
      props: {
        innlogget: true, sider: [], totalVisninger: 0, totalBotVisninger: 0,
        totalUnikeSider: 0, periode, enheter: [], kilder: [],
        totalGuideBruk: 0, guideBransjer: [], totalKlikk: 0, toppKlikk: [],
        oppsettFeil: err.message || 'Ukjent feil',
      },
    };
  }
}
