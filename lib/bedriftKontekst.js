// lib/bedriftKontekst.js
// Setter en bedrift i kontekst av de andre i samme bransje og kommune, ut fra data
// vi allerede har (antall ansatte, stiftelsesår, poststed, DSB/F-gass). Gjør hver
// bedriftsside ulik de andre med fakta som stemmer, ikke med tilfeldig variasjon.
// Hvert utsagn lages bare hvis datagrunnlaget er godt nok.
import { pent } from './tettsteder';

const MIN_MED_ANSATTE = 3; // rangering gir ikke mening med færre enn dette
const MIN_MED_AAR = 3;
const MAKS_NABOER = 3;

function aarFra(dato) {
  const aar = dato ? parseInt(String(dato).substring(0, 4), 10) : NaN;
  return Number.isNaN(aar) ? null : aar;
}

// bedrift: raden på siden. peers: alle i samme bransje og kommune (inkl. bedriften selv).
// flertall: f.eks. «elektrikere». Returnerer { setninger: [...], naboer: [{ navn, slug }], poststed }
export function lagKontekst(bedrift, peers, flertall) {
  const kommune = bedrift.kommune ? pent(bedrift.kommune) : null;
  const setninger = [];
  if (!kommune || !peers.length) return { setninger, naboer: [], poststed: null };

  // 1. Hvor mange i kommunen
  setninger.push(`${bedrift.navn} er en av ${peers.length} ${flertall} i ${kommune} i oversikten vår.`);

  // 2. Rangering etter antall ansatte
  const egneAnsatte = bedrift.antall_ansatte;
  const medAnsatte = peers.filter(p => typeof p.antall_ansatte === 'number' && p.antall_ansatte > 0);
  if (egneAnsatte > 0 && medAnsatte.length >= MIN_MED_ANSATTE) {
    const plass = 1 + medAnsatte.filter(p => p.antall_ansatte > egneAnsatte).length;
    const delt = medAnsatte.filter(p => p.antall_ansatte === egneAnsatte && p.organisasjonsnummer !== bedrift.organisasjonsnummer).length > 0;
    if (plass === 1 && !delt) {
      setninger.push(`Med ${egneAnsatte} ansatte har den flest ansatte av de ${medAnsatte.length} som har oppgitt antall.`);
    } else {
      setninger.push(`Med ${egneAnsatte} ansatte ligger den på ${delt ? 'delt ' : ''}plass ${plass} av ${medAnsatte.length} etter antall ansatte (blant dem som har oppgitt det).`);
    }
  }

  // 3. Rangering etter alder
  const egetAar = aarFra(bedrift.stiftelsesdato);
  const medAar = peers.filter(p => aarFra(p.stiftelsesdato) !== null);
  if (egetAar && medAar.length >= MIN_MED_AAR) {
    const eldre = medAar.filter(p => aarFra(p.stiftelsesdato) < egetAar).length;
    const likeGamle = medAar.filter(p => aarFra(p.stiftelsesdato) === egetAar && p.organisasjonsnummer !== bedrift.organisasjonsnummer).length;
    if (eldre === 0 && likeGamle === 0) {
      setninger.push(`Etablert i ${egetAar} er den den eldste av ${medAar.length} med kjent stiftelsesår.`);
    } else if (eldre + 1 <= Math.ceil(medAar.length / 4)) {
      setninger.push(`Etablert i ${egetAar} er den blant de eldste, som nr. ${eldre + 1} av ${medAar.length} med kjent stiftelsesår.`);
    } else if (eldre >= Math.floor(medAar.length * 0.9)) {
      setninger.push(`Etablert i ${egetAar} er den blant de nyeste av ${medAar.length} med kjent stiftelsesår.`);
    }
  }

  // 4. Andre på samme poststed (nærmeste naboer), ikke når poststedet er selve kommunen
  const poststed = bedrift.poststed ? pent(bedrift.poststed) : null;
  let naboer = [];
  if (poststed && poststed.toLowerCase() !== kommune.toLowerCase()) {
    const likePoststed = peers.filter(p =>
      p.organisasjonsnummer !== bedrift.organisasjonsnummer && p.poststed && pent(p.poststed) === poststed
    );
    if (likePoststed.length > 0) {
      naboer = likePoststed.slice(0, MAKS_NABOER).map(p => ({ navn: p.navn, slug: p.slug }));
      setninger.push(`${likePoststed.length} andre ${flertall} har adresse i ${poststed}.`);
    }
  }

  return { setninger, naboer, poststed };
}
