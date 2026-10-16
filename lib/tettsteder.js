// lib/tettsteder.js
// Tettsteder/poststeder i en kommune, hentet fra adressene til bedriftene vi
// allerede har (poststed fra Brønnøysundregistrene). Brukes i ingressen slik at
// søk på stedsnavn som ikke er kommuner («rørlegger sofiemyr») treffer riktig side.
const SMAA_ORD = new Set(['og', 'i', 'på', 'ved', 'av', 'til', 'over', 'under', 'for']);

// «ØVRE ERVIK» -> «Øvre Ervik», «SØR-FRON» -> «Sør-Fron»
export function pent(poststed) {
  return poststed
    .toLowerCase()
    .split(/(\s+|-)/)
    .map((del, i) => (i > 0 && SMAA_ORD.has(del) ? del : del.charAt(0).toUpperCase() + del.slice(1)))
    .join('');
}

export function finnTettsteder(bedrifter, kommuneNavn, maks = 5) {
  const antall = new Map();
  for (const b of bedrifter) {
    const sted = b.poststed?.trim();
    if (!sted) continue;
    const navn = pent(sted);
    if (navn.toLowerCase() === kommuneNavn.toLowerCase()) continue; // hovedstedet har samme navn som kommunen
    antall.set(navn, (antall.get(navn) || 0) + 1);
  }
  return Array.from(antall.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'no'))
    .slice(0, maks)
    .map(([navn]) => navn);
}

// ['A', 'B', 'C'] -> «A, B og C»
export function nummerertListe(ord) {
  if (ord.length <= 1) return ord.join('');
  return `${ord.slice(0, -1).join(', ')} og ${ord[ord.length - 1]}`;
}
