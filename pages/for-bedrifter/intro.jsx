// pages/for-bedrifter/intro.jsx
import { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabase';
import styles from '../../styles/FremhevetIntro.module.css';

const MAKS_PLASSER = 10;
const FRIST = new Date('2026-10-01T00:00:00+02:00');

export default function FremhevetIntroTilbud({ antallPameldt }) {
  const [steg, setSteg] = useState(1);

  const [bedriftsnavn, setBedriftsnavn] = useState('');
  const [orgNr, setOrgNr] = useState('');
  const [epost, setEpost] = useState('');
  const [telefon, setTelefon] = useState('');

  const [nettside, setNettside] = useState('');
  const [beskrivelse, setBeskrivelse] = useState('');
  const [spesialiteter, setSpesialiteter] = useState('');

  const [oppslag, setOppslag] = useState({ status: 'idle', treff: null }); // idle | soker | funnet | ikke_funnet
  const oppslagTimer = useRef(null);

  const [status, setStatus] = useState('idle'); // idle | sender | sendt | feilet
  const [stegFeil, setStegFeil] = useState('');

  const fristPassert = new Date() >= FRIST;
  const plasserIgjen = Math.max(0, MAKS_PLASSER - antallPameldt);
  const tilbudetErAktivt = !fristPassert && plasserIgjen > 0;

  useEffect(() => {
    clearTimeout(oppslagTimer.current);
    const siffer = orgNr.replace(/\D/g, '');
    if (siffer.length !== 9) {
      setOppslag({ status: 'idle', treff: null });
      return;
    }
    oppslagTimer.current = setTimeout(async () => {
      setOppslag({ status: 'soker', treff: null });
      const { data } = await supabase
        .from('bedrifter')
        .select('navn, naeringskode_tekst, kommune')
        .eq('organisasjonsnummer', siffer)
        .maybeSingle();

      if (data) {
        setOppslag({ status: 'funnet', treff: data });
        setBedriftsnavn(prev => prev.trim() ? prev : data.navn);
      } else {
        setOppslag({ status: 'ikke_funnet', treff: null });
      }
    }, 500);
    return () => clearTimeout(oppslagTimer.current);
  }, [orgNr]);

  function handleNeste(e) {
    e.preventDefault();
    if (!bedriftsnavn.trim() || !orgNr.trim() || !epost.trim() || !telefon.trim()) {
      setStegFeil('Fyll ut alle feltene før du går videre.');
      return;
    }
    setStegFeil('');
    setSteg(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sender');
    const { error } = await supabase.from('fremhevet_intro_pamelding').insert({
      bedriftsnavn: bedriftsnavn.trim(),
      org_nr: orgNr.trim(),
      epost: epost.trim(),
      telefon: telefon.trim(),
      nettside: nettside.trim() || null,
      beskrivelse: beskrivelse.trim() || null,
      spesialiteter: spesialiteter.trim() || null,
    });

    setStatus(error ? 'feilet' : 'sendt');
  }

  return (
    <Layout
      title="Gratis fremhevet profil – introtilbud"
      description="De 10 første bedriftene som melder seg på i september får Fremhevet profil helt gratis, for alltid."
      canonical="/for-bedrifter/intro"
    >
      <div className={`container ${styles.side}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Introtilbud – kun september 2026
        </div>
        <h1 className={styles.title}>Gratis Fremhevet profil, for alltid</h1>
        <p className={styles.lead}>
          <span className={styles.leadStrong}>De 10 første bedriftene</span> som melder seg på i september får
          Fremhevet profil helt gratis, uten bindingstid og uten at det noensinne begynner å koste noe.
        </p>
        {tilbudetErAktivt ? (
          <p className={styles.plasser}><strong>{plasserIgjen}</strong> av {MAKS_PLASSER} plasser igjen.</p>
        ) : (
          <p className={styles.plasser}>Tilbudet er dessverre avsluttet.</p>
        )}

        <div className={styles.grid}>
          <div>
            <ul className={styles.liste}>
              <li className={styles.listeItem}>Vises øverst i din bransje og kommune</li>
              <li className={styles.listeItem}>Legg til telefon og e-post</li>
              <li className={styles.listeItem}>Logo og bilder</li>
              <li className={styles.listeItem}>Beskrivelse av tjenester og spesialiteter</li>
            </ul>
            <a href="/for-bedrifter/eksempel" className={styles.demoLenke}>Se hvordan en fremhevet profil ser ut →</a>
            <p className={styles.finskrift}>
              Gjelder til og med 30. september 2026, eller til alle 10 plassene er fylt — det som kommer først.
              Vi bekrefter org.nr mot Brønnøysundregistrene og setter opp profilen basert på det du fyller inn her.
              Ordinær pris for Fremhevet profil er 499 kr/mnd; de 10 første beholder gratis profil så lenge de er
              kunde hos oss.
            </p>
          </div>

          <div className={styles.boks}>
            {status === 'sendt' ? (
              <div className={styles.sendtBoks}>
                <strong>Takk for påmeldingen! ✓</strong>
                <p>Vi bekrefter org.nr og setter opp profilen din basert på det du sendte inn. Har du en logo, send den gjerne til petter@uppit.no.</p>
              </div>
            ) : !tilbudetErAktivt ? (
              <div className={styles.avsluttetBoks}>
                <strong>Alle plassene er tatt</strong>
                <p>Følg med på <a href="/annonsering" className={styles.demoLenke}>annonsering</a> for ordinære priser, eller ta kontakt for å høre om nye tilbud.</p>
              </div>
            ) : (
              <>
                <div className={styles.stegIndikator}>
                  <span className={steg === 1 ? styles.stegAktiv : styles.stegFerdig}>1. Bedriften din</span>
                  <span className={styles.stegStrek} />
                  <span className={steg === 2 ? styles.stegAktiv : ''}>2. Innhold til profilen</span>
                </div>

                {steg === 1 ? (
                  <form onSubmit={handleNeste} className={styles.skjema}>
                    <div className={styles.felt}>
                      <label className={styles.label}>Org.nr</label>
                      <input
                        type="text" placeholder="9 siffer" value={orgNr} inputMode="numeric"
                        onChange={e => setOrgNr(e.target.value)} className={styles.input} required
                      />
                      {oppslag.status === 'soker' && <p className={styles.oppslagInfo}>Sjekker Brønnøysundregistrene...</p>}
                      {oppslag.status === 'funnet' && (
                        <p className={styles.oppslagFunnet}>
                          ✓ Fant {oppslag.treff.navn} · {oppslag.treff.naeringskode_tekst} · {oppslag.treff.kommune}
                        </p>
                      )}
                      {oppslag.status === 'ikke_funnet' && (
                        <p className={styles.oppslagIkkeFunnet}>Fant ikke org.nr i registeret vårt — dobbeltsjekk gjerne, men du kan sende inn likevel.</p>
                      )}
                    </div>
                    <div className={styles.felt}>
                      <label className={styles.label}>Bedriftsnavn</label>
                      <input
                        type="text" placeholder="Din Bedrift AS" value={bedriftsnavn}
                        onChange={e => setBedriftsnavn(e.target.value)} className={styles.input} required
                      />
                    </div>
                    <div className={styles.felt}>
                      <label className={styles.label}>E-post</label>
                      <input
                        type="email" placeholder="din@bedrift.no" value={epost}
                        onChange={e => setEpost(e.target.value)} className={styles.input} required
                      />
                    </div>
                    <div className={styles.felt}>
                      <label className={styles.label}>Telefon</label>
                      <input
                        type="tel" placeholder="Telefonnummer" value={telefon}
                        onChange={e => setTelefon(e.target.value)} className={styles.input} required
                      />
                    </div>
                    {stegFeil && <p className={styles.feil}>{stegFeil}</p>}
                    <button type="submit" className={styles.knapp}>Neste →</button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.skjema}>
                    <div className={styles.felt}>
                      <label className={styles.label}>Nettside (valgfritt)</label>
                      <input
                        type="text" placeholder="www.dinbedrift.no" value={nettside}
                        onChange={e => setNettside(e.target.value)} className={styles.input}
                      />
                    </div>
                    <div className={styles.felt}>
                      <label className={styles.label}>Kort beskrivelse av bedriften</label>
                      <textarea
                        placeholder="Hva gjør dere, hvor lenge har dere holdt på, hva er dere gode på?"
                        value={beskrivelse} onChange={e => setBeskrivelse(e.target.value)}
                        className={styles.textarea} rows={3}
                      />
                    </div>
                    <div className={styles.felt}>
                      <label className={styles.label}>Spesialiteter / type oppdrag</label>
                      <input
                        type="text" placeholder="F.eks. baderomsrenovering, tilbygg, garasjer" value={spesialiteter}
                        onChange={e => setSpesialiteter(e.target.value)} className={styles.input}
                      />
                    </div>
                    <p className={styles.finskriftLite}>Har du en logo? Send den til petter@uppit.no, så legger vi den inn.</p>
                    <div className={styles.stegKnapper}>
                      <button type="button" className={styles.tilbakeKnapp} onClick={() => setSteg(1)}>← Tilbake</button>
                      <button type="submit" className={styles.knapp} disabled={status === 'sender'}>
                        {status === 'sender' ? 'Sender...' : 'Meld meg på gratis →'}
                      </button>
                    </div>
                    {status === 'feilet' && <p className={styles.feil}>Noe gikk galt — prøv igjen.</p>}
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data, error } = await supabase.rpc('count_fremhevet_intro_pamelding');
  return {
    props: { antallPameldt: error ? 0 : (data || 0) },
    revalidate: 60,
  };
}
