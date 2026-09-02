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
  enheter, kilder, totalGuideBruk, guideBransjer, totalKlikk, toppKlikk,
  totalAnnonseVisninger, totalEkteVisninger, totalPlaceholderVisninger, annonseVisningBransjer,
  totalAnnonseKlikk, annonseKlikkBransjer, nettsideForslag, leads, oppsettFeil,
}) {
  const [passord, setPassord] = useState('');
  const [feil, setFeil] = useState('');
  const [laster, setLaster] = useState(false);
  const [behandlerId, setBehandlerId] = useState(null);
  const [kopiert, setKopiert] = useState(false);

  function kopierEposter() {
    const tekst = leads.map(l => l.epost).join(', ');
    navigator.clipboard.writeText(tekst).then(() => {
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    });
  }

  async function handleForslag(id, handling) {
    setBehandlerId(id);
    try {
      const res = await fetch('/api/analytics-godkjenn-forslag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, handling }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(`Klarte ikke å behandle forslaget: ${data.feil || res.statusText}`);
        setBehandlerId(null);
        return;
      }
      window.location.reload();
    } catch {
      alert('Klarte ikke å nå serveren. Prøv igjen.');
      setBehandlerId(null);
    }
  }

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

              {nettsideForslag.length > 0 && (
                <div className={styles.tabellBoks} style={{ marginBottom: 20 }}>
                  <h2 className={styles.kildeTittel} style={{ padding: '10px 14px 0' }}>
                    Nye nettside-forslag ({nettsideForslag.length} venter)
                  </h2>
                  <table className={styles.tabell}>
                    <thead>
                      <tr>
                        <th>Bedrift</th>
                        <th>Foreslått nettside</th>
                        <th>E-post</th>
                        <th>Dato</th>
                        <th>Handling</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nettsideForslag.map(f => (
                        <tr key={f.id}>
                          <td><a href={`/bedrift/${f.bedrift_slug}`} target="_blank" rel="noopener noreferrer">{f.bedrift_navn}</a></td>
                          <td>{f.foreslatt_nettside}</td>
                          <td>{f.epost || '—'}</td>
                          <td>{new Date(f.created_at).toLocaleDateString('no')}</td>
                          <td className={styles.handlingCelle}>
                            <button
                              className={styles.godkjennBtn}
                              disabled={behandlerId === f.id}
                              onClick={() => handleForslag(f.id, 'godkjenn')}
                            >
                              {behandlerId === f.id ? '...' : 'Godkjenn'}
                            </button>
                            <button
                              className={styles.avvisBtn}
                              disabled={behandlerId === f.id}
                              onClick={() => handleForslag(f.id, 'avvis')}
                            >
                              Avvis
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {leads.length > 0 && (
                <div className={styles.tabellBoks} style={{ marginBottom: 20 }}>
                  <div className={styles.leadHeader}>
                    <h2 className={styles.kildeTittel} style={{ margin: 0 }}>
                      E-post-leads ({leads.length.toLocaleString('no')} unike)
                    </h2>
                    <button className={styles.godkjennBtn} onClick={kopierEposter}>
                      {kopiert ? 'Kopiert ✓' : 'Kopiér alle e-poster'}
                    </button>
                  </div>
                  <table className={styles.tabell}>
                    <thead>
                      <tr>
                        <th>E-post</th>
                        <th>Bedrift(er)</th>
                        <th>Sist aktiv</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(l => (
                        <tr key={l.epost}>
                          <td>{l.epost}</td>
                          <td>
                            {l.bedrifter.map((b, i) => (
                              <span key={b.slug}>
                                {i > 0 && ', '}
                                <a href={`/bedrift/${b.slug}`} target="_blank" rel="noopener noreferrer">{b.navn}</a>
                              </span>
                            ))}
                          </td>
                          <td>{new Date(l.sistAktiv).toLocaleDateString('no')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

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

              <div className={styles.kildeSeksjon}>
                <div className={styles.kildePanel}>
                  <h2 className={styles.kildeTittel}>Annonsevisninger</h2>
                  <p className={styles.kildeSub}>
                    {totalAnnonseVisninger.toLocaleString('no')} totalt · {totalEkteVisninger.toLocaleString('no')} ekte annonse · {totalPlaceholderVisninger.toLocaleString('no')} placeholder
                  </p>
                  {annonseVisningBransjer.length === 0 ? (
                    <p className={styles.tomtLite}>Ingen visninger registrert ennå.</p>
                  ) : (
                    annonseVisningBransjer.map(b => (
                      <div key={b.navn} className={styles.kildeRad}>
                        <span className={styles.kildeNavn}>{b.ikon} {b.visningsnavn}</span>
                        <div className={styles.kildeBar}>
                          <div className={styles.kildeBarFyll} style={{ width: `${b.andel}%` }} />
                        </div>
                        <span className={styles.kildeTall}>{b.antall.toLocaleString('no')}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className={styles.kildePanel}>
                  <h2 className={styles.kildeTittel}>Annonseklikk</h2>
                  <p className={styles.kildeSub}>{totalAnnonseKlikk.toLocaleString('no')} totalt</p>
                  {annonseKlikkBransjer.length === 0 ? (
                    <p className={styles.tomtLite}>Ingen klikk registrert ennå.</p>
                  ) : (
                    annonseKlikkBransjer.map(b => (
                      <div key={b.navn} className={styles.kildeRad}>
                        <span className={styles.kildeNavn}>{b.ikon} {b.visningsnavn}</span>
                        <div className={styles.kildeBar}>
                          <div className={styles.kildeBarFyll} style={{ width: `${b.andel}%` }} />
                        </div>
                        <span className={styles.kildeTall}>{b.antall.toLocaleString('no')}</span>
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

  const tomProps = {
    innlogget: false, sider: [], totalVisninger: 0, totalBotVisninger: 0,
    totalUnikeSider: 0, periode, enheter: [], kilder: [],
    totalGuideBruk: 0, guideBransjer: [], totalKlikk: 0, toppKlikk: [],
    totalAnnonseVisninger: 0, totalEkteVisninger: 0, totalPlaceholderVisninger: 0, annonseVisningBransjer: [],
    totalAnnonseKlikk: 0, annonseKlikkBransjer: [], nettsideForslag: [], leads: [], oppsettFeil: null,
  };

  if (!innlogget) {
    return { props: tomProps };
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    let fra = null;
    if (periode === '24h') fra = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    if (periode === '7d') fra = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [sideRes, kildeRes, forslagRes, alleForslagRes] = await Promise.all([
      supabaseAdmin.rpc('page_view_counts', { fra }),
      supabaseAdmin.rpc('page_view_besokskilder', { fra }),
      supabaseAdmin.from('nettside_forslag').select('*').eq('status', 'venter').order('created_at', { ascending: false }),
      supabaseAdmin.from('nettside_forslag').select('epost, bedrift_navn, bedrift_slug, created_at').order('created_at', { ascending: false }),
    ]);

    if (sideRes.error) throw new Error(sideRes.error.message);
    if (kildeRes.error) throw new Error(kildeRes.error.message);
    if (forslagRes.error) throw new Error(forslagRes.error.message);
    if (alleForslagRes.error) throw new Error(alleForslagRes.error.message);

    const nettsideForslag = forslagRes.data || [];

    // Leadbase: unike e-poster på tvers av alle innsendinger (uansett status),
    // med hvilke(n) bedrift(er) de er knyttet til og siste aktivitet.
    const leadKart = new Map();
    for (const f of alleForslagRes.data || []) {
      if (!f.epost) continue;
      if (!leadKart.has(f.epost)) {
        leadKart.set(f.epost, { epost: f.epost, bedrifter: [], sistAktiv: f.created_at });
      }
      const lead = leadKart.get(f.epost);
      if (!lead.bedrifter.some(b => b.slug === f.bedrift_slug)) {
        lead.bedrifter.push({ navn: f.bedrift_navn, slug: f.bedrift_slug });
      }
    }
    const leads = Array.from(leadKart.values()).sort((a, b) => new Date(b.sistAktiv) - new Date(a.sistAktiv));

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

    // Annonse-stier: /_annonse/{visning|klikk}/{annonse|placeholder}/{bred|kompakt}/{bransje}
    const annonseVisningRader = ekte.filter(r => r.visningssti.startsWith('/_annonse/visning/'));
    const annonseKlikkRader = ekte.filter(r => r.visningssti.startsWith('/_annonse/klikk/'));

    const grupperAnnonseEtterBransje = (rader) => {
      const total = rader.reduce((sum, r) => sum + Number(r.antall), 0);
      const kart = new Map();
      for (const r of rader) {
        const bransjeSlug = r.visningssti.split('/')[5];
        kart.set(bransjeSlug, (kart.get(bransjeSlug) || 0) + Number(r.antall));
      }
      return Array.from(kart.entries())
        .map(([slug, antall]) => {
          const naering = NAERINGSKODER.find(n => n.slug === slug);
          return {
            navn: slug,
            visningsnavn: naering?.visningsnavn || slug,
            ikon: naering?.icon || '📢',
            antall,
            andel: total > 0 ? Math.round((antall / total) * 1000) / 10 : 0,
          };
        })
        .sort((a, b) => b.antall - a.antall);
    };

    const totalAnnonseVisninger = annonseVisningRader.reduce((sum, r) => sum + Number(r.antall), 0);
    const totalEkteVisninger = annonseVisningRader
      .filter(r => r.visningssti.split('/')[3] === 'annonse')
      .reduce((sum, r) => sum + Number(r.antall), 0);
    const totalPlaceholderVisninger = totalAnnonseVisninger - totalEkteVisninger;
    const annonseVisningBransjer = grupperAnnonseEtterBransje(annonseVisningRader);

    const totalAnnonseKlikk = annonseKlikkRader.reduce((sum, r) => sum + Number(r.antall), 0);
    const annonseKlikkBransjer = grupperAnnonseEtterBransje(annonseKlikkRader);

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
        totalAnnonseVisninger,
        totalEkteVisninger,
        totalPlaceholderVisninger,
        annonseVisningBransjer,
        totalAnnonseKlikk,
        annonseKlikkBransjer,
        nettsideForslag,
        leads,
        oppsettFeil: null,
      },
    };
  } catch (err) {
    return {
      props: {
        ...tomProps,
        innlogget: true,
        oppsettFeil: err.message || 'Ukjent feil',
      },
    };
  }
}
