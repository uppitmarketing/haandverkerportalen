// lib/bransjeSokeord.js
// Delt ordbok for fritekst -> næringskode, brukt av både søkesiden og
// "Etter prosjekt"-fritekstfeltet i håndverker-guiden.
export const BRANSJE_SOKEORD = {
  'elektriker': '43.210', 'elektro': '43.210', 'elektrisk': '43.210',
  'rørlegger': '43.221', 'rorlegger': '43.221', 'vvs': '43.221', 'rør': '43.221',
  'varmepumpe': '43.222', 'varmepumper': '43.222', 'kuldeanlegg': '43.222', 'kuldemontør': '43.222',
  'ventilasjon': '43.223', 'ventilasjonsanlegg': '43.223',
  'tømrer': '43.320', 'tomrer': '43.320', 'snekker': '43.320', 'tømrere': '43.320',
  'maler': '43.340', 'malerfirma': '43.340', 'glass': '43.340', 'glassmester': '43.340',
  'byggmester': '41.000', 'bygg': '41.000', 'byggefirma': '41.000', 'entreprenør': '41.000',
  'taklegger': '43.410', 'tak': '43.410', 'taket': '43.410',
  'gulvlegger': '43.330', 'gulv': '43.330', 'parkett': '43.330',
  'grunnarbeid': '43.120', 'graving': '43.120', 'grunnentreprenør': '43.120',
  'murer': '43.910', 'muring': '43.910', 'murerarbeid': '43.910', 'pipe': '43.910', 'skorstein': '43.910',
};

// Ordboksøk ord for ord — tolerant for ekstra ord rundt (hele setninger fungerer),
// men krever eksakt match på et av nøkkelordene (ingen fuzzy/typo-toleranse).
export function finnNaeringskodeFraTekst(tekst) {
  if (!tekst) return null;
  const ord = tekst.toLowerCase().trim().split(/\s+/);
  for (const w of ord) {
    if (BRANSJE_SOKEORD[w]) return BRANSJE_SOKEORD[w];
  }
  return null;
}
