// components/NettsideForslag.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import styles from './NettsideForslag.module.css';

export default function NettsideForslag({ bedrift }) {
  const [nettside, setNettside] = useState('');
  const [epost, setEpost] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sender | sendt | feilet

  const harAlleredeNettside = Boolean(bedrift.hjemmeside);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nettside.trim()) return;

    setStatus('sender');
    const { error } = await supabase.from('nettside_forslag').insert({
      bedrift_slug: bedrift.slug,
      bedrift_navn: bedrift.navn,
      foreslatt_nettside: nettside.trim(),
      epost: epost.trim() || null,
    });

    setStatus(error ? 'feilet' : 'sendt');
  }

  if (status === 'sendt') {
    return (
      <div className={styles.boks}>
        <strong>Takk! ✓</strong>
        <p>Vi gjennomgår forslaget og oppdaterer profilen snart.</p>
      </div>
    );
  }

  return (
    <div className={styles.boks}>
      <strong>Er du eier?</strong>
      <p>
        {harAlleredeNettside
          ? 'Stemmer ikke nettsiden vår? Foreslå riktig lenke — gratis.'
          : 'Legg til nettsiden din gratis, så blir profilen mer synlig.'}
      </p>
      <form onSubmit={handleSubmit} className={styles.skjema}>
        <input
          type="text"
          placeholder="www.dinbedrift.no"
          value={nettside}
          onChange={e => setNettside(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Din e-post (valgfritt)"
          value={epost}
          onChange={e => setEpost(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.knapp} disabled={status === 'sender'}>
          {status === 'sender' ? 'Sender...' : 'Send inn gratis →'}
        </button>
        {status === 'feilet' && <p className={styles.feil}>Noe gikk galt — prøv igjen.</p>}
      </form>
    </div>
  );
}
