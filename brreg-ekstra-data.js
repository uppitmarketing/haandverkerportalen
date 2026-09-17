// brreg-ekstra-data.js – delt henting av daglig leder (Brreg roller) og
// sentral godkjenning (DiBK sgregister). Brukes av både den vanlige
// månedlige synken (brreg_import_full.js) og engangs-etterslepet
// (backfill_dagligleder_dibk.js).
import fetch from 'node-fetch';

const BRREG_BASE = 'https://data.brreg.no/enhetsregisteret/api/enheter';
const DIBK_BASE = 'https://sgregister.dibk.no/api/enterprises';

export function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Henter daglig leder fra rolleregisteret - offentlig, ingen nøkkel.
export async function hentDagligLeder(orgnr) {
  try {
    const res = await fetch(`${BRREG_BASE}/${orgnr}/roller`, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    const gruppe = (data.rollegrupper || []).find(g => g.type?.kode === 'DAGL');
    const rolle = (gruppe?.roller || []).find(r => !r.avregistrert && r.person?.navn);
    if (!rolle) return null;
    const { fornavn, mellomnavn, etternavn } = rolle.person.navn;
    return [fornavn, mellomnavn, etternavn].filter(Boolean).join(' ');
  } catch {
    return null;
  }
}

// Henter sentral godkjenning fra DiBK - offentlig, ingen nøkkel. 404 betyr
// bare at foretaket ikke har godkjenning, ikke en feil.
export async function hentSentralGodkjenning(orgnr) {
  try {
    const res = await fetch(`${DIBK_BASE}/${orgnr}`, { headers: { Accept: 'application/json' } });
    if (res.status === 404) return { godkjenning: false, utlop: null, omrader: [] };
    if (!res.ok) return null;
    const data = await res.json();
    const status = data?.['dibk-sgdata']?.status;
    const omrader = data?.['dibk-sgdata']?.valid_approval_areas || [];
    return {
      godkjenning: status?.approved ?? false,
      utlop: status?.approval_period_to || null,
      omrader: omrader.map(o => ({ funksjon: o.function, fagomrade: o.subject_area, tiltaksklasse: o.grade })),
    };
  } catch {
    return null;
  }
}

// Henter begge for én bedrift og returnerer et objekt klart til å skrives
// til bedrifter-tabellen.
export async function hentEkstraData(orgnr) {
  const [dagligLeder, godkjenning] = await Promise.all([
    hentDagligLeder(orgnr),
    hentSentralGodkjenning(orgnr),
  ]);
  return {
    daglig_leder_navn: dagligLeder,
    sentral_godkjenning: godkjenning?.godkjenning ?? null,
    sentral_godkjenning_utlop: godkjenning?.utlop ?? null,
    sentral_godkjenning_omrader: godkjenning?.omrader ?? null,
    ekstra_data_hentet: new Date().toISOString(),
  };
}
