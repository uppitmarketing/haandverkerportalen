// pages/for-bedrifter/intro.jsx
import { useState } from 'react';
import Layout from '../../components/Layout';
import { supabase } from '../../lib/supabase';
import styles from '../../styles/FremhevetIntro.module.css';

const MAKS_PLASSER = 10;
const FRIST = new Date('2026-10-01T00:00:00+02:00');

export default function FremhevetIntroTilbud({ antallPameldt }) {
  const [bedriftsnavn, setBedriftsnavn] = useState('');
  const [orgNr, setOrgNr] = useState('');
  const [epost, setEpost] = useState('');
  const [telefon, setTelefon] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sender | sendt | feilet

  const fristPassert = new Date() >= FRIST;
  const plasserIgjen = Math.max(0, MAKS_PLASSER - antallPameldt);
  const tilbudetErAktivt = !fristPassert && plasserIgjen > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!bedriftsnavn.trim() || !orgNr.trim() || !epost.trim()) return;

    setStatus('sender');
    const { error } = await supabase.from('fremhevet_intro_pamelding').insert({
      bedriftsnavn: bedriftsnavn.trim(),
      org_nr: orgNr.trim(),
      epost: epost.trim(),
      telefon: telefon.trim() || null,
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
              Vi tar kontakt på e-posten du oppgir for å bekrefte org.nr og sette opp profilen. Ordinær pris for
              Fremhevet profil er 499 kr/mnd; de 10 første beholder gratis profil så lenge de er kunde hos oss.
            </p>
          </div>

          <div className={styles.boks}>
            {status === 'sendt' ? (
              <div className={styles.sendtBoks}>
                <strong>Takk for påmeldingen! ✓</strong>
                <p>Vi sjekker org.nr mot Brønnøysundregistrene og tar kontakt på e-post innen kort tid.</p>
              </div>
            ) : !tilbudetErAktivt ? (
              <div className={styles.avsluttetBoks}>
                <strong>Alle plassene er tatt</strong>
                <p>Følg med på <a href="/annonsering" className={styles.demoLenke}>annonsering</a> for ordinære priser, eller ta kontakt for å høre om nye tilbud.</p>
              </div>
            ) : (
              <>
                <div className={styles.boksTittel}>Meld deg på</div>
                <div className={styles.boksSub}>Tar under ett minutt.</div>
                <form onSubmit={handleSubmit} className={styles.skjema}>
                  <div className={styles.felt}>
                    <label className={styles.label}>Bedriftsnavn</label>
                    <input
                      type="text" placeholder="Din Bedrift AS" value={bedriftsnavn}
                      onChange={e => setBedriftsnavn(e.target.value)} className={styles.input} required
                    />
                  </div>
                  <div className={styles.felt}>
                    <label className={styles.label}>Org.nr</label>
                    <input
                      type="text" placeholder="9 siffer" value={orgNr} pattern="[0-9]{9}"
                      onChange={e => setOrgNr(e.target.value)} className={styles.input} required
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
                    <label className={styles.label}>Telefon (valgfritt)</label>
                    <input
                      type="tel" placeholder="Telefonnummer" value={telefon}
                      onChange={e => setTelefon(e.target.value)} className={styles.input}
                    />
                  </div>
                  <button type="submit" className={styles.knapp} disabled={status === 'sender'}>
                    {status === 'sender' ? 'Sender...' : 'Meld meg på gratis →'}
                  </button>
                  {status === 'feilet' && <p className={styles.feil}>Noe gikk galt — prøv igjen.</p>}
                </form>
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
