// lib/bransjeSokeord.js
// Delt ordbok for fritekst -> næringskode, brukt av både søkesiden og
// "Etter prosjekt"-fritekstfeltet i håndverker-guiden.
export const BRANSJE_SOKEORD = {
  'elektriker': '43.210', 'elektro': '43.210', 'elektrisk': '43.210',
  'stikkontakt': '43.210', 'sikringsskap': '43.210', 'sikring': '43.210',
  'downlights': '43.210', 'jording': '43.210', 'elbillader': '43.210',
  'ladestasjon': '43.210', 'wallbox': '43.210', 'smarthus': '43.210',
  'solcelle': '43.210', 'solcellepanel': '43.210', 'brannvarsling': '43.210',
  'brannalarm': '43.210', 'varmekabler': '43.210', 'utelys': '43.210',

  'rørlegger': '43.221', 'rorlegger': '43.221', 'vvs': '43.221', 'rør': '43.221',
  'kran': '43.221', 'wc': '43.221', 'toalett': '43.221', 'dusj': '43.221',
  'sluk': '43.221', 'lekkasje': '43.221', 'vannlekkasje': '43.221',
  'avløp': '43.221', 'avlop': '43.221', 'våtrom': '43.221', 'vatrom': '43.221', 'servant': '43.221',
  'bad': '43.221', 'baderom': '43.221', 'baderomsrenovering': '43.221',
  'varmtvannsbereder': '43.221', 'vannmåler': '43.221', 'vannmaler': '43.221',

  'varmepumpe': '43.222', 'varmepumper': '43.222', 'kuldeanlegg': '43.222', 'kuldemontør': '43.222',
  'luft-luft': '43.222', 'luftluft': '43.222', 'luft-vann': '43.222', 'bergvarme': '43.222',
  'jordvarme': '43.222', 'aircondition': '43.222', 'klimaanlegg': '43.222',

  'ventilasjon': '43.223', 'ventilasjonsanlegg': '43.223', 'avtrekk': '43.223',
  'kjøkkenvifte': '43.223', 'kjokkenvifte': '43.223', 'ventilasjonskanal': '43.223',

  'tømrer': '43.320', 'tomrer': '43.320', 'snekker': '43.320', 'tømrere': '43.320',
  'pergola': '43.320', 'terrasse': '43.320', 'platting': '43.320', 'veranda': '43.320',
  'altan': '43.320', 'carport': '43.320', 'gjerde': '43.320', 'garderobe': '43.320',
  'kjøkken': '43.320', 'kjokken': '43.320', 'vindu': '43.320', 'vinduer': '43.320',
  'dør': '43.320', 'dorer': '43.320', 'dører': '43.320', 'trapp': '43.320',
  'levegg': '43.320', 'bod': '43.320', 'anneks': '43.320', 'listverk': '43.320',

  'byggmester': '41.000', 'bygg': '41.000', 'byggefirma': '41.000', 'entreprenør': '41.000',
  'tilbygg': '41.000', 'påbygg': '41.000', 'pabygg': '41.000', 'nybygg': '41.000',
  'hytte': '41.000', 'renovering': '41.000', 'rehabilitering': '41.000', 'totalentreprise': '41.000',
  'oppussing': '41.000', 'loftsutbygging': '41.000', 'enebolig': '41.000',

  'maler': '43.340', 'malerfirma': '43.340', 'glass': '43.340', 'glassmester': '43.340',
  'tapet': '43.340', 'tapetsering': '43.340', 'beis': '43.340', 'sparkling': '43.340',

  'taklegger': '43.410', 'tak': '43.410', 'taket': '43.410',
  'takstein': '43.410', 'takrenne': '43.410', 'membran': '43.410', 'taktekking': '43.410',
  'taklekkasje': '43.410', 'takvindu': '43.410', 'snøfangere': '43.410', 'snofangere': '43.410',

  'gulvlegger': '43.330', 'gulv': '43.330', 'parkett': '43.330',
  'laminat': '43.330', 'vinyl': '43.330', 'flis': '43.330', 'fliser': '43.330', 'flislegging': '43.330',

  'grunnarbeid': '43.120', 'graving': '43.120', 'grunnentreprenør': '43.120',
  'masseutskifting': '43.120', 'planering': '43.120', 'drenering': '43.120', 'tomt': '43.120',
  'asfalt': '43.120', 'asfaltering': '43.120', 'kummer': '43.120',

  'murer': '43.910', 'muring': '43.910', 'murerarbeid': '43.910', 'pipe': '43.910', 'skorstein': '43.910',
  'fasade': '43.910', 'pussing': '43.910', 'brostein': '43.910',
  'belegningsstein': '43.910', 'steinlegging': '43.910',
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
