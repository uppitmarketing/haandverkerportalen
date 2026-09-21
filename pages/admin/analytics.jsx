// pages/admin/analytics.jsx
import { useState } from 'react';
import Head from 'next/head';
import { getSupabaseAdmin } from '../../lib/supabaseAdmin';
import { erGyldigToken } from '../../lib/analyticsAuth';
import { NAERINGSKODER, getNaeringByKode } from '../../lib/db';
import { finnNaeringskodeFraTekst } from '../../lib/bransjeSokeord';
import { BransjeIkon } from '../../components/icons';
import styles from '../../styles/Analytics.module.css';

const PERIODER = [
  { key: 'today', label: 'I dag' },
  { key: '7d', label: 'Siste 7 dager' },
  { key: '30d', label: 'Siste 30 dager' },
  { key: 'all', label: 'Totalt' },
];

export default function AnalyticsSide({
  innlogget, sider, totalVisninger, totalBotVisninger, totalUnikeSider, periode,
  enheter, kilder, totalGuideBruk, guideBransjer, totalKlikk, toppKlikk,
  totalAnnonseVisninger, totalEkteVisninger, totalPlaceholderVisninger, totalBotAnnonseVisninger,
  totalAnnonseKlikk, annonseVisningAnnonsorer, annonseKlikkAnnonsorer, annonseOversikt, nettsideForslag,
  trafikkPerDag, totalForBedrifter, forBedrifterFraProfil, forBedrifterAndre, oppsettFeil,
  fremhevetIntro, sokUtenTreff, sokAlleredeLost, sokTreff,
  totalBedriftSideVisninger, visningerPerBransje, visningerPerKommune,
}) {
  const [passord, setPassord] = useState('');
  const [feil, setFeil] = useState('');
  const [laster, setLaster] = useState(false);
  const [behandlerId, setBehandlerId] = useState(null);
  const [behandlerIntroId, setBehandlerIntroId] = useState(null);
  const [tab, setTab] = useState('trafikk');

  const totalAnnonseCtr = totalAnnonseVisninger > 0
    ? Math.round((totalAnnonseKlikk / totalAnnonseVisninger) * 1000) / 10
    : 0;

  // BWW-visninger telles kun når kortet faktisk har vært synlig (IntersectionObserver),
  // mens det generiske systemet logger visning på hver sidelasting - CTR-en over blander
  // disse to helt ulike målemetodene, så BWW sin egen rate regnes ut separat her.
  const bwwVisninger = annonseVisningAnnonsorer.find(a => a.navn === 'Better WorkWear (pilot)')?.antall || 0;
  const bwwKlikk = annonseKlikkAnnonsorer.find(a => a.navn === 'Better WorkWear (pilot)')?.antall || 0;
  const bwwCtr = bwwVisninger > 0 ? Math.round((bwwKlikk / bwwVisninger) * 1000) / 10 : 0;

  const andelFraProfil = totalForBedrifter > 0 ? Math.round((forBedrifterFraProfil / totalForBedrifter) * 100) : 0;

  const antallOppgaver = nettsideForslag.length + fremhevetIntro.filter(p => !p.kontaktet && !p.konvertert).length;

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

  async function handleKontaktet(id, kontaktet) {
    setBehandlerIntroId(id);
    try {
      const res = await fetch('/api/analytics-marker-kontaktet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, kontaktet }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(`Klarte ikke å oppdatere: ${data.feil || res.statusText}`);
        setBehandlerIntroId(null);
        return;
      }
      window.location.reload();
    } catch {
      alert('Klarte ikke å nå serveren. Prøv igjen.');
      setBehandlerIntroId(null);
    }
  }

  async function handleKonverter(id) {
    if (!confirm('Konvertere denne bedriften til fremhevet profil nå?')) return;
    setBehandlerIntroId(id);
    try {
      const res = await fetch('/api/analytics-konverter-fremhevet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(`Klarte ikke å konvertere: ${data.feil || res.statusText}`);
        setBehandlerIntroId(null);
        return;
      }
      window.location.reload();
    } catch {
      alert('Klarte ikke å nå serveren. Prøv igjen.');
      setBehandlerIntroId(null);
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

              <div className={styles.tabs}>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${tab === 'oppgaver' ? styles.tabAktiv : ''}`}
                  onClick={() => setTab('oppgaver')}
                >
                  Oppgaver
                  {antallOppgaver > 0 && <span className={styles.tabBadge}>{antallOppgaver}</span>}
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${tab === 'trafikk' ? styles.tabAktiv : ''}`}
                  onClick={() => setTab('trafikk')}
                >
                  Trafikk
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${tab === 'bedrifter' ? styles.tabAktiv : ''}`}
                  onClick={() => setTab('bedrifter')}
                >
                  Bedrifter
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${tab === 'sok' ? styles.tabAktiv : ''}`}
                  onClick={() => setTab('sok')}
                >
                  Søk &amp; guide
                </button>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${tab === 'annonser' ? styles.tabAktiv : ''}`}
                  onClick={() => setTab('annonser')}
                >
                  Annonser
                </button>
              </div>

              {tab === 'oppgaver' && (
                <>
                  {nettsideForslag.length === 0 && fremhevetIntro.length === 0 ? (
                    <div className={styles.tabellBoks}>
                      <p className={styles.tomt}>Ingen oppgaver akkurat nå.</p>
                    </div>
                  ) : (
                    <>
                      {nettsideForslag.length > 0 && (
                        <div className={styles.tabellBoks} style={{ marginBottom: fremhevetIntro.length > 0 ? 20 : 0 }}>
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

                      {fremhevetIntro.length > 0 && (
                        <div className={styles.tabellBoks}>
                          <h2 className={styles.kildeTittel} style={{ padding: '10px 14px 0' }}>
                            Introtilbud – Fremhevet profil ({fremhevetIntro.length} påmeldt)
                          </h2>
                          <table className={styles.tabell}>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Bedrift</th>
                                <th>Org.nr</th>
                                <th>E-post</th>
                                <th>Telefon</th>
                                <th>Nettside</th>
                                <th>Spesialiteter</th>
                                <th>Beskrivelse</th>
                                <th>Dato</th>
                                <th>Kontaktet</th>
                                <th>Konverter</th>
                              </tr>
                            </thead>
                            <tbody>
                              {fremhevetIntro.map((p, i) => (
                                <tr key={p.id} style={i >= 10 ? { opacity: 0.5 } : undefined}>
                                  <td>{i + 1}{i >= 10 ? ' (utenfor de 10)' : ''}</td>
                                  <td>{p.bedriftsnavn}</td>
                                  <td>{p.org_nr}</td>
                                  <td>{p.epost}</td>
                                  <td>{p.telefon || '—'}</td>
                                  <td>{p.nettside || '—'}</td>
                                  <td>{p.spesialiteter || '—'}</td>
                                  <td style={{ maxWidth: 220, whiteSpace: 'normal' }}>{p.beskrivelse || '—'}</td>
                                  <td>{new Date(p.opprettet_at).toLocaleDateString('no')}</td>
                                  <td className={styles.handlingCelle}>
                                    {p.kontaktet ? (
                                      <button
                                        className={styles.avvisBtn}
                                        disabled={behandlerIntroId === p.id}
                                        onClick={() => handleKontaktet(p.id, false)}
                                      >
                                        {behandlerIntroId === p.id ? '...' : 'Kontaktet ✓ (angre)'}
                                      </button>
                                    ) : (
                                      <button
                                        className={styles.godkjennBtn}
                                        disabled={behandlerIntroId === p.id}
                                        onClick={() => handleKontaktet(p.id, true)}
                                      >
                                        {behandlerIntroId === p.id ? '...' : 'Marker som kontaktet'}
                                      </button>
                                    )}
                                  </td>
                                  <td className={styles.handlingCelle}>
                                    {p.konvertert ? (
                                      <span style={{ color: 'var(--green)', fontWeight: 600, fontSize: 11 }}>Konvertert ✓</span>
                                    ) : (
                                      <button
                                        className={styles.godkjennBtn}
                                        disabled={behandlerIntroId === p.id}
                                        onClick={() => handleKonverter(p.id)}
                                      >
                                        {behandlerIntroId === p.id ? '...' : 'Konverter til fremhevet →'}
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {tab === 'trafikk' && (
                <>
                  <div className={styles.dagPanel}>
                    <h2 className={styles.kildeTittel}>
                      Trafikk per dag ({(PERIODER.find(p => p.key === periode)?.label || 'Totalt').toLowerCase()})
                    </h2>
                    {trafikkPerDag.length === 0 ? (
                      <p className={styles.tomtLite}>Ingen data ennå.</p>
                    ) : (
                      trafikkPerDag.map(d => (
                        <div key={d.dato} className={styles.kildeRad}>
                          <span className={styles.kildeNavn}>{d.label}</span>
                          <div className={styles.kildeBar}>
                            <div className={styles.kildeBarFyll} style={{ width: `${d.andel}%` }} />
                          </div>
                          <span className={styles.kildeTall}>{d.antall.toLocaleString('no')}</span>
                        </div>
                      ))
                    )}
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

                  <details className={styles.tabellBoks}>
                    <summary className={styles.accordionSummary}>
                      Vis alle {sider.length.toLocaleString('no')} sider (rådata)
                    </summary>
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
                  </details>
                </>
              )}

              {tab === 'bedrifter' && (
                <>
                  <div className={styles.kildeSeksjon}>
                    <div className={styles.kildePanel}>
                      <h2 className={styles.kildeTittel}>Bedriftsside-visninger per bransje ({totalBedriftSideVisninger.toLocaleString('no')} totalt)</h2>
                      {visningerPerBransje.length === 0 ? (
                        <p className={styles.tomtLite}>Ingen visninger registrert ennå.</p>
                      ) : (
                        visningerPerBransje.map(b => (
                          <div key={b.navn} className={styles.kildeRad}>
                            <span className={styles.kildeNavn}>
                              <BransjeIkon slug={b.navn} size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
                              {b.visningsnavn}
                            </span>
                            <div className={styles.kildeBar}>
                              <div className={styles.kildeBarFyll} style={{ width: `${b.andel}%` }} />
                            </div>
                            <span className={styles.kildeTall}>{b.antall.toLocaleString('no')}</span>
                          </div>
                        ))
                      )}
                    </div>

                    <div className={styles.kildePanel}>
                      <h2 className={styles.kildeTittel}>Bedriftsside-visninger per kommune (topp 15)</h2>
                      {visningerPerKommune.length === 0 ? (
                        <p className={styles.tomtLite}>Ingen visninger registrert ennå.</p>
                      ) : (
                        visningerPerKommune.map(k => (
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
                      <h2 className={styles.kildeTittel}>Mest klikket til nettside ({totalKlikk.toLocaleString('no')} totalt)</h2>
                      {toppKlikk.length === 0 ? (
                        <p className={styles.tomtLite}>Ingen klikk registrert ennå.</p>
                      ) : (
                        toppKlikk.map(k => (
                          <div key={k.slug} className={styles.kildeRad}>
                            <a href={`/bedrift/${k.slug}`} target="_blank" rel="noopener noreferrer" className={styles.klikkNavn}>
                              {k.slug}
                            </a>
                            <span className={styles.kildeTall}>
                              {k.antall.toLocaleString('no')}
                              {k.ctr != null && (
                                <span style={{ color: 'var(--muted)', fontWeight: 400 }}> ({k.ctr}%)</span>
                              )}
                            </span>
                          </div>
                        ))
                      )}
                    </div>

                    <div className={styles.kildePanel}>
                      <h2 className={styles.kildeTittel}>For bedrifter-besøk ({totalForBedrifter.toLocaleString('no')} totalt)</h2>
                      <p className={styles.kildeSub}>Andel som kom fra en bedriftsprofil — sannsynlig bedriftseier</p>
                      {totalForBedrifter === 0 ? (
                        <p className={styles.tomtLite}>Ingen besøk registrert ennå.</p>
                      ) : (
                        <>
                          <div className={styles.kildeRad}>
                            <span className={styles.kildeNavn}>Fra bedriftsprofil</span>
                            <div className={styles.kildeBar}>
                              <div className={styles.kildeBarFyll} style={{ width: `${andelFraProfil}%` }} />
                            </div>
                            <span className={styles.kildeTall}>{forBedrifterFraProfil.toLocaleString('no')}</span>
                          </div>
                          <div className={styles.kildeRad}>
                            <span className={styles.kildeNavn}>Andre kilder</span>
                            <div className={styles.kildeBar}>
                              <div className={styles.kildeBarFyll} style={{ width: `${100 - andelFraProfil}%` }} />
                            </div>
                            <span className={styles.kildeTall}>{forBedrifterAndre.toLocaleString('no')}</span>
                          </div>
                          <p className={styles.kommentar}>
                            {andelFraProfil >= 50
                              ? `${andelFraProfil} % av besøkene kommer fra en bedriftsprofil — de fleste besøkende ser altså ut til å være bedriftseiere som sjekker sin egen oppføring, ikke kunder på jakt etter en håndverker.`
                              : `${andelFraProfil} % av besøkene kommer fra en bedriftsprofil (sannsynlig bedriftseier). Resten, ${100 - andelFraProfil} %, finner siden via andre veier — som forsiden eller søk.`}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}

              {tab === 'sok' && (
                <>
                  <div className={styles.kildeSeksjon}>
                    <div className={styles.kildePanel}>
                      <h2 className={styles.kildeTittel}>Guide-bruk ({totalGuideBruk.toLocaleString('no')} fullført)</h2>
                      {guideBransjer.length === 0 ? (
                        <p className={styles.tomtLite}>Ingen bruk registrert ennå.</p>
                      ) : (
                        guideBransjer.map(g => (
                          <div key={g.navn} className={styles.kildeRad}>
                            <span className={styles.kildeNavn}>
                              <BransjeIkon slug={g.navn} size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
                              {g.visningsnavn}
                            </span>
                            <div className={styles.kildeBar}>
                              <div className={styles.kildeBarFyll} style={{ width: `${g.andel}%` }} />
                            </div>
                            <span className={styles.kildeTall}>{g.antall.toLocaleString('no')}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {sokUtenTreff.length === 0 && sokTreff.length === 0 ? (
                    <div className={styles.tabellBoks}>
                      <p className={styles.tomt}>Ingen søkedata registrert ennå.</p>
                    </div>
                  ) : (
                    <>
                      {sokTreff.length > 0 && (
                        <div className={styles.tabellBoks} style={{ marginBottom: sokUtenTreff.length > 0 ? 20 : 0 }}>
                          <h2 className={styles.kildeTittel} style={{ padding: '10px 14px 0' }}>
                            Populære søkefraser med treff ({sokTreff.length} unike)
                          </h2>
                          <table className={styles.tabell}>
                            <thead>
                              <tr>
                                <th>Søketekst</th>
                                <th>Bransje</th>
                                <th>Antall</th>
                                <th>Sist sett</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sokTreff.map(s => (
                                <tr key={s.tekst + s.bransjeSlug}>
                                  <td>{s.tekst}</td>
                                  <td>{s.visningsnavn}</td>
                                  <td>{s.antall}</td>
                                  <td>{new Date(s.sistSett).toLocaleDateString('no')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {sokUtenTreff.length > 0 && (
                        <div className={styles.tabellBoks}>
                          <h2 className={styles.kildeTittel} style={{ padding: '10px 14px 0' }}>
                            Søk uten treff ({sokUtenTreff.length} unike{sokAlleredeLost > 0 ? `, ${sokAlleredeLost} løst siden loggført` : ''})
                          </h2>
                          <table className={styles.tabell}>
                            <thead>
                              <tr>
                                <th>Søketekst</th>
                                <th>Antall</th>
                                <th>Kilde</th>
                                <th>Sist sett</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sokUtenTreff.map(s => (
                                <tr key={s.tekst}>
                                  <td>{s.tekst}</td>
                                  <td>{s.antall}</td>
                                  <td>{s.kilder.join(', ')}</td>
                                  <td>{new Date(s.sistSett).toLocaleDateString('no')}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {tab === 'annonser' && (
                <>
                  <div className={styles.annonserTopp}>
                    <button type="button" className={styles.printBtn} onClick={() => window.print()}>
                      Eksporter til PDF
                    </button>
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <div className={styles.statNum}>{totalAnnonseVisninger.toLocaleString('no')}</div>
                      <div className={styles.statLabel}>Annonsevisninger totalt</div>
                    </div>
                    <div className={styles.stat}>
                      <div className={styles.statNum}>{totalAnnonseKlikk.toLocaleString('no')}</div>
                      <div className={styles.statLabel}>Annonseklikk totalt</div>
                    </div>
                    <div className={styles.stat}>
                      <div className={styles.statNum}>{totalAnnonseCtr}%</div>
                      <div className={styles.statLabel}>Klikkrate (blandet, alle slots)</div>
                    </div>
                    <div className={styles.stat}>
                      <div className={styles.statNum}>{bwwCtr}%</div>
                      <div className={styles.statLabel}>Better WorkWear – klikkrate (alle plasseringer)</div>
                    </div>
                  </div>

                  <div className={styles.tabellBoks} style={{ marginBottom: 20 }}>
                    <h2 className={styles.kildeTittel} style={{ padding: '10px 14px 0' }}>
                      Oversikt per annonse
                    </h2>
                    <p className={styles.kildeSub} style={{ padding: '0 14px' }}>
                      {totalEkteVisninger.toLocaleString('no')} ekte annonse · {totalPlaceholderVisninger.toLocaleString('no')} placeholder-visninger totalt
                      {totalBotAnnonseVisninger > 0 && ` · ${totalBotAnnonseVisninger.toLocaleString('no')} bot-/skraper-visninger ekskludert`}
                    </p>
                    {annonseOversikt.length === 0 ? (
                      <p className={styles.tomt}>Ingen annonsedata registrert ennå.</p>
                    ) : (
                      <table className={styles.tabell}>
                        <thead>
                          <tr>
                            <th>Annonse</th>
                            <th>Visninger</th>
                            <th>Klikk</th>
                            <th>CTR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {annonseOversikt.map(a => (
                            <tr key={a.navn}>
                              <td>{a.navn}</td>
                              <td>{a.visninger.toLocaleString('no')}</td>
                              <td>{a.klikk.toLocaleString('no')}</td>
                              <td>{a.ctr}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {annonseOversikt.length > 0 && (
                    <details className={styles.tabellBoks}>
                      <summary className={styles.accordionSummary}>
                        Se detaljert rapport – visninger og klikk per bransje →
                      </summary>
                      {annonseOversikt.map(a => (
                        <div key={a.navn} style={{ padding: '0 14px 16px' }}>
                          <h3 className={styles.kildeTittel} style={{ marginBottom: 8 }}>{a.navn}</h3>
                          {a.bransjeFordeling.length === 0 ? (
                            <p className={styles.tomtLite}>Ingen bransjedata registrert.</p>
                          ) : (
                            <table className={styles.tabell}>
                              <thead>
                                <tr>
                                  <th>Bransje</th>
                                  <th>Visninger</th>
                                  <th>Klikk</th>
                                  <th>CTR</th>
                                </tr>
                              </thead>
                              <tbody>
                                {a.bransjeFordeling.map(b => (
                                  <tr key={b.slug}>
                                    <td>
                                      <BransjeIkon slug={b.slug} size={13} style={{ verticalAlign: -2, marginRight: 4 }} />
                                      {b.visningsnavn}
                                    </td>
                                    <td>{b.visninger.toLocaleString('no')}</td>
                                    <td>{b.klikk.toLocaleString('no')}</td>
                                    <td>{b.ctr}%</td>
                                  </tr>
                                ))}
                                <tr style={{ fontWeight: 700 }}>
                                  <td>Totalt</td>
                                  <td>{a.visninger.toLocaleString('no')}</td>
                                  <td>{a.klikk.toLocaleString('no')}</td>
                                  <td>{a.ctr}%</td>
                                </tr>
                              </tbody>
                            </table>
                          )}
                        </div>
                      ))}
                    </details>
                  )}
                </>
              )}
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
    totalAnnonseVisninger: 0, totalEkteVisninger: 0, totalPlaceholderVisninger: 0, totalBotAnnonseVisninger: 0,
    totalAnnonseKlikk: 0, annonseVisningAnnonsorer: [], annonseKlikkAnnonsorer: [], annonseOversikt: [], nettsideForslag: [],
    trafikkPerDag: [], totalForBedrifter: 0, forBedrifterFraProfil: 0, forBedrifterAndre: 0,
    fremhevetIntro: [],
    sokUtenTreff: [],
    sokAlleredeLost: 0,
    sokTreff: [],
    totalBedriftSideVisninger: 0,
    visningerPerBransje: [],
    visningerPerKommune: [],
    oppsettFeil: null,
  };

  if (!innlogget) {
    return { props: tomProps };
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    let fra = null;
    if (periode === 'today') {
      const start = new Date();
      start.setUTCHours(0, 0, 0, 0);
      fra = start.toISOString();
    }
    if (periode === '7d') fra = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    if (periode === '30d') fra = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [sideRes, hendelseRes, kildeRes, forslagRes, dagRes, forBedrifterRes, introRes, sokUtenTreffRes, sokTreffRes] = await Promise.all([
      supabaseAdmin.rpc('page_view_counts', { fra }),
      supabaseAdmin.rpc('syntetiske_hendelser_counts', { fra }),
      supabaseAdmin.rpc('page_view_besokskilder', { fra }),
      supabaseAdmin.from('nettside_forslag').select('*').eq('status', 'venter').order('created_at', { ascending: false }),
      supabaseAdmin.rpc('page_views_per_dag', { fra }),
      supabaseAdmin.rpc('for_bedrifter_kilder', { fra }),
      supabaseAdmin.from('fremhevet_intro_pamelding').select('*').order('opprettet_at', { ascending: true }),
      supabaseAdmin.from('sok_uten_treff').select('*').order('opprettet_at', { ascending: false }).limit(1000),
      supabaseAdmin.from('sok_treff').select('*').order('opprettet_at', { ascending: false }).limit(1000),
    ]);

    if (sideRes.error) throw new Error(sideRes.error.message);
    if (hendelseRes.error) throw new Error(hendelseRes.error.message);
    if (kildeRes.error) throw new Error(kildeRes.error.message);
    if (forslagRes.error) throw new Error(forslagRes.error.message);
    if (dagRes.error) throw new Error(dagRes.error.message);
    if (forBedrifterRes.error) throw new Error(forBedrifterRes.error.message);
    if (introRes.error) throw new Error(introRes.error.message);
    if (sokUtenTreffRes.error) throw new Error(sokUtenTreffRes.error.message);
    if (sokTreffRes.error) throw new Error(sokTreffRes.error.message);

    const nettsideForslag = forslagRes.data || [];
    const fremhevetIntro = introRes.data || [];

    const sokUtenTreffKart = new Map();
    for (const rad of sokUtenTreffRes.data || []) {
      const nokkel = rad.tekst.trim().toLowerCase();
      const eksisterende = sokUtenTreffKart.get(nokkel);
      if (eksisterende) {
        eksisterende.antall += 1;
        eksisterende.kilder.add(rad.kilde);
        if (rad.opprettet_at > eksisterende.sistSett) eksisterende.sistSett = rad.opprettet_at;
      } else {
        sokUtenTreffKart.set(nokkel, {
          tekst: rad.tekst.trim(),
          antall: 1,
          kilder: new Set([rad.kilde]),
          sistSett: rad.opprettet_at,
        });
      }
    }
    const alleUnikeSok = Array.from(sokUtenTreffKart.values()).map(s => ({ ...s, kilder: Array.from(s.kilder) }));
    const sokUtenTreff = alleUnikeSok
      .filter(s => !finnNaeringskodeFraTekst(s.tekst))
      .sort((a, b) => b.antall - a.antall)
      .slice(0, 100);
    const sokAlleredeLost = alleUnikeSok.length - sokUtenTreff.length;

    const sokTreffKart = new Map();
    for (const rad of sokTreffRes.data || []) {
      const nokkel = rad.tekst.trim().toLowerCase() + '|' + (rad.bransje_slug || '');
      const eksisterende = sokTreffKart.get(nokkel);
      if (eksisterende) {
        eksisterende.antall += 1;
        if (rad.opprettet_at > eksisterende.sistSett) eksisterende.sistSett = rad.opprettet_at;
      } else {
        const naering = NAERINGSKODER.find(n => n.slug === rad.bransje_slug);
        sokTreffKart.set(nokkel, {
          tekst: rad.tekst.trim(),
          bransjeSlug: rad.bransje_slug,
          visningsnavn: naering?.visningsnavn || rad.bransje_slug || '—',
          antall: 1,
          sistSett: rad.opprettet_at,
        });
      }
    }
    const sokTreff = Array.from(sokTreffKart.values())
      .sort((a, b) => b.antall - a.antall)
      .slice(0, 100);

    const dagRader = dagRes.data || [];
    const maxDag = Math.max(1, ...dagRader.map(d => Number(d.antall)));
    const trafikkPerDag = [...dagRader]
      .sort((a, b) => new Date(b.dato) - new Date(a.dato))
      .map(d => ({
        dato: d.dato,
        antall: Number(d.antall),
        andel: Math.round((Number(d.antall) / maxDag) * 100),
        label: new Date(d.dato).toLocaleDateString('no', { day: 'numeric', month: 'short' }),
      }));

    const forBedrifterRader = forBedrifterRes.data || [];
    const forBedrifterFraProfil = forBedrifterRader.find(r => r.fra_bedriftsprofil)?.antall ?? 0;
    const forBedrifterAndre = forBedrifterRader.find(r => !r.fra_bedriftsprofil)?.antall ?? 0;
    const totalForBedrifter = Number(forBedrifterFraProfil) + Number(forBedrifterAndre);

    const alle = sideRes.data || [];
    const ekte = alle.filter(r => !r.er_bot);
    const bots = alle.filter(r => r.er_bot);

    const ekteSider = ekte.filter(r => !r.visningssti.startsWith('/_'));

    // Syntetiske hendelser (annonser, guide-bruk, utgående klikk) hentes fra
    // en egen funksjon, avgrenset til "/_"-prefikset. De konkurrerer ellers
    // om samme rad-budsjett i page_view_counts som alle ~35 000 bedriftssidene
    // - med "Totalt" valgt overstiger antall distinkte stier fort API-ets
    // rad-grense, og sortert etter antall synker sjeldne hendelser (som en
    // fersk annonsørs første klikk) rett ut av resultatet uten feilmelding.
    const alleHendelser = hendelseRes.data || [];
    const ekteHendelser = alleHendelser.filter(r => !r.er_bot);
    const guideRader = ekteHendelser.filter(r => r.visningssti.startsWith('/_guide/'));
    const klikkRader = ekteHendelser.filter(r => r.visningssti.startsWith('/_klikk/bedrift/'));

    const totalVisninger = ekteSider.reduce((sum, r) => sum + Number(r.antall), 0);
    const totalBotVisninger = bots.reduce((sum, r) => sum + Number(r.antall), 0);
    const sider = ekteSider.slice(0, 300);

    // Bedriftsside-visninger: /bedrift/{slug} bærer ikke bransje/kommune i
    // stien selv, så vi må slå det opp mot bedrifter-tabellen i batcher.
    const bedriftSlugTilVisninger = new Map();
    for (const r of ekteSider) {
      if (!r.visningssti.startsWith('/bedrift/')) continue;
      const slug = r.visningssti.split('/')[2];
      if (!slug) continue;
      bedriftSlugTilVisninger.set(slug, (bedriftSlugTilVisninger.get(slug) || 0) + Number(r.antall));
    }

    const bedriftInfoPerSlug = new Map();
    const alleBedriftSlugs = Array.from(bedriftSlugTilVisninger.keys());
    for (let i = 0; i < alleBedriftSlugs.length; i += 500) {
      const batch = alleBedriftSlugs.slice(i, i + 500);
      const { data: bedriftData, error: bedriftErr } = await supabaseAdmin
        .from('bedrifter')
        .select('slug, naeringskode, kommune')
        .in('slug', batch);
      if (bedriftErr) throw new Error(bedriftErr.message);
      for (const rad of bedriftData || []) {
        bedriftInfoPerSlug.set(rad.slug, rad);
      }
    }

    const totalBedriftSideVisninger = Array.from(bedriftSlugTilVisninger.values()).reduce((sum, n) => sum + n, 0);

    const visningerPerBransje = (() => {
      const kart = new Map();
      for (const [slug, antall] of bedriftSlugTilVisninger.entries()) {
        const info = bedriftInfoPerSlug.get(slug);
        const naering = info ? getNaeringByKode(info.naeringskode) : null;
        const bransjeSlug = naering?.slug || 'ukjent';
        kart.set(bransjeSlug, (kart.get(bransjeSlug) || 0) + antall);
      }
      return Array.from(kart.entries())
        .map(([slug, antall]) => {
          const naering = NAERINGSKODER.find(n => n.slug === slug);
          return {
            navn: slug,
            visningsnavn: naering?.visningsnavn || slug,
            antall,
            andel: totalBedriftSideVisninger > 0 ? Math.round((antall / totalBedriftSideVisninger) * 1000) / 10 : 0,
          };
        })
        .sort((a, b) => b.antall - a.antall);
    })();

    const visningerPerKommune = (() => {
      const kart = new Map();
      for (const [slug, antall] of bedriftSlugTilVisninger.entries()) {
        const info = bedriftInfoPerSlug.get(slug);
        const kommune = info?.kommune || 'Ukjent';
        kart.set(kommune, (kart.get(kommune) || 0) + antall);
      }
      const total = totalBedriftSideVisninger;
      return Array.from(kart.entries())
        .map(([navn, antall]) => ({
          navn,
          antall,
          andel: total > 0 ? Math.round((antall / total) * 1000) / 10 : 0,
        }))
        .sort((a, b) => b.antall - a.antall)
        .slice(0, 15);
    })();

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
      .map(r => {
        const slug = r.visningssti.split('/')[3];
        const antall = Number(r.antall);
        const visninger = bedriftSlugTilVisninger.get(slug) || 0;
        const ctr = visninger > 0 ? Math.round((antall / visninger) * 1000) / 10 : null;
        return { slug, antall, ctr };
      });

    // Annonse-stier: /_annonse/{visning|klikk}/{annonse|placeholder}/{bred|kompakt}/{bransje}
    const annonseVisningRader = ekteHendelser.filter(r => r.visningssti.startsWith('/_annonse/visning/'));
    const annonseKlikkRader = ekteHendelser.filter(r => r.visningssti.startsWith('/_annonse/klikk/'));

    const totalAnnonseVisninger = annonseVisningRader.reduce((sum, r) => sum + Number(r.antall), 0);
    const totalEkteVisninger = annonseVisningRader
      .filter(r => r.visningssti.split('/')[3] === 'annonse')
      .reduce((sum, r) => sum + Number(r.antall), 0);
    const totalPlaceholderVisninger = totalAnnonseVisninger - totalEkteVisninger;

    const totalAnnonseKlikk = annonseKlikkRader.reduce((sum, r) => sum + Number(r.antall), 0);

    // Synlig i rapporten slik at eksklusjonen er etterprøvbar, ikke bare
    // usynlig - viktig når tallene skal danne grunnlag for annonsesalg.
    const botHendelser = alleHendelser.filter(r => r.er_bot);
    const totalBotAnnonseVisninger = botHendelser
      .filter(r => r.visningssti.startsWith('/_annonse/visning/'))
      .reduce((sum, r) => sum + Number(r.antall), 0);

    const grupperAnnonseEtterAnnonsor = (rader) => {
      const total = rader.reduce((sum, r) => sum + Number(r.antall), 0);
      const kart = new Map();
      for (const r of rader) {
        const variant = r.visningssti.split('/')[4];
        const navn = variant === 'bww' ? 'Better WorkWear (pilot)' : 'Generisk annonsørsystem';
        kart.set(navn, (kart.get(navn) || 0) + Number(r.antall));
      }
      return Array.from(kart.entries())
        .map(([navn, antall]) => ({
          navn,
          antall,
          andel: total > 0 ? Math.round((antall / total) * 1000) / 10 : 0,
        }))
        .sort((a, b) => b.antall - a.antall);
    };
    const annonseVisningAnnonsorer = grupperAnnonseEtterAnnonsor(annonseVisningRader);
    const annonseKlikkAnnonsorer = grupperAnnonseEtterAnnonsor(annonseKlikkRader);

    // Oversikt per annonse: visninger, klikk og bransjefordeling samlet i én
    // rad per faktisk annonse, sortert etter flest visninger. Annonsør-ID
    // (6. stisegment, lagt til i Annonse.jsx) skiller navngitte annonsører
    // fra hverandre i stedet for å slå alt sammen til "generisk".
    // BWW og Toolsinvent kjører nå på flere plasseringer (sidepanel og bred
    // banner) - 7. stisegment holder hvilken, lagt til i AnnonseBww.jsx og
    // AnnonseToolsinvent.jsx. Eldre data uten dette segmentet er fra før den
    // brede plasseringen fantes, og regnes derfor som sidepanel (kompakt).
    const annonseNokkel = (visningssti) => {
      const deler = visningssti.split('/');
      const variant = deler[4];
      if (variant === 'bww' || variant === 'toolsinvent') {
        const plassering = deler[6] || 'kompakt';
        return `${variant}:${plassering}`;
      }
      const tilstand = deler[3];
      if (tilstand === 'placeholder') return 'placeholder';
      const annonsorId = deler[6];
      return annonsorId ? `annonsor:${annonsorId}` : 'legacy';
    };

    const tomAnnonseRad = () => ({ visninger: 0, klikk: 0, bransjeVisninger: new Map(), bransjeKlikk: new Map() });

    const annonseKart = new Map();
    for (const r of annonseVisningRader) {
      const nokkel = annonseNokkel(r.visningssti);
      const bransjeSlug = r.visningssti.split('/')[5];
      if (!annonseKart.has(nokkel)) annonseKart.set(nokkel, tomAnnonseRad());
      const rad = annonseKart.get(nokkel);
      const antall = Number(r.antall);
      rad.visninger += antall;
      rad.bransjeVisninger.set(bransjeSlug, (rad.bransjeVisninger.get(bransjeSlug) || 0) + antall);
    }
    for (const r of annonseKlikkRader) {
      const nokkel = annonseNokkel(r.visningssti);
      const bransjeSlug = r.visningssti.split('/')[5];
      if (!annonseKart.has(nokkel)) annonseKart.set(nokkel, tomAnnonseRad());
      const rad = annonseKart.get(nokkel);
      const antall = Number(r.antall);
      rad.klikk += antall;
      rad.bransjeKlikk.set(bransjeSlug, (rad.bransjeKlikk.get(bransjeSlug) || 0) + antall);
    }

    const annonsorIder = Array.from(annonseKart.keys())
      .filter(k => k.startsWith('annonsor:'))
      .map(k => k.slice('annonsor:'.length));

    const annonsorNavnPerId = new Map();
    if (annonsorIder.length > 0) {
      const { data: annonsorData, error: annonsorErr } = await supabaseAdmin
        .from('annonsorer')
        .select('id, navn')
        .in('id', annonsorIder);
      if (annonsorErr) throw new Error(annonsorErr.message);
      for (const rad of annonsorData || []) {
        annonsorNavnPerId.set(String(rad.id), rad.navn);
      }
    }

    const annonseNavnForNokkel = (nokkel) => {
      if (nokkel === 'bww:kompakt') return 'Better WorkWear (pilot) – sidepanel';
      if (nokkel === 'bww:bred') return 'Better WorkWear (pilot) – bred banner';
      if (nokkel === 'toolsinvent:kompakt') return 'Toolsinvent (pilot) – sidepanel';
      if (nokkel === 'toolsinvent:bred') return 'Toolsinvent (pilot) – bred banner';
      if (nokkel === 'placeholder') return 'Ingen annonsør (tom plassholder)';
      if (nokkel === 'legacy') return 'Generisk annonsørsystem (data før annonsør-ID)';
      const id = nokkel.slice('annonsor:'.length);
      return annonsorNavnPerId.get(id) || `Annonsør #${id}`;
    };

    const annonseOversikt = Array.from(annonseKart.entries())
      .map(([nokkel, rad]) => {
        const alleBransjeSlugs = new Set([...rad.bransjeVisninger.keys(), ...rad.bransjeKlikk.keys()]);
        const bransjeFordeling = Array.from(alleBransjeSlugs)
          .map(slug => {
            const naering = NAERINGSKODER.find(n => n.slug === slug);
            const visninger = rad.bransjeVisninger.get(slug) || 0;
            const klikk = rad.bransjeKlikk.get(slug) || 0;
            return {
              slug,
              visningsnavn: naering?.visningsnavn || slug,
              visninger,
              klikk,
              ctr: visninger > 0 ? Math.round((klikk / visninger) * 1000) / 10 : 0,
            };
          })
          .sort((a, b) => b.visninger - a.visninger);
        return {
          navn: annonseNavnForNokkel(nokkel),
          visninger: rad.visninger,
          klikk: rad.klikk,
          ctr: rad.visninger > 0 ? Math.round((rad.klikk / rad.visninger) * 1000) / 10 : 0,
          bransjeFordeling,
        };
      })
      .sort((a, b) => b.visninger - a.visninger);

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
        totalBotAnnonseVisninger,
        totalAnnonseKlikk,
        annonseVisningAnnonsorer,
        annonseKlikkAnnonsorer,
        annonseOversikt,
        nettsideForslag,
        trafikkPerDag,
        totalForBedrifter,
        forBedrifterFraProfil: Number(forBedrifterFraProfil),
        forBedrifterAndre: Number(forBedrifterAndre),
        fremhevetIntro,
        sokUtenTreff,
        sokAlleredeLost,
        sokTreff,
        totalBedriftSideVisninger,
        visningerPerBransje,
        visningerPerKommune,
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
