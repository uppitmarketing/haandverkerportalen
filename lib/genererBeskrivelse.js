// lib/genererBeskrivelse.js

const BRANSJE_TEKST = {
  '43.210': 'elektriske installasjonstjenester',
  '43.221': 'rørleggerarbeid og VVS-tjenester',
  '43.222': 'kuldeanlegg, varmepumper og VVS-tjenester',
  '43.223': 'ventilasjonsarbeid og VVS-tjenester',
  '43.320': 'tømrerarbeid og snekkerarbeid',
  '41.000': 'bygge- og entreprenaørarbeid',
  '43.340': 'maler- og glassarbeid',
  '43.910': 'taklegging og takarbeid',
  '43.330': 'gulvlegging og parkett',
  '43.120': 'grunnarbeid og anleggsarbeid',
};

const FYLKE_FRA_KOMMUNE = {
  'Oslo': 'Oslo',
  'Halden': 'Østfold', 'Moss': 'Østfold', 'Sarpsborg': 'Østfold', 'Fredrikstad': 'Østfold',
  'Bærum': 'Akershus', 'Asker': 'Akershus', 'Lillestrøm': 'Akershus', 'Lørenskog': 'Akershus',
  'Drammen': 'Buskerud', 'Kongsberg': 'Buskerud',
  'Hamar': 'Innlandet', 'Lillehammer': 'Innlandet', 'Gjøvik': 'Innlandet',
  'Tønsberg': 'Vestfold', 'Sandefjord': 'Vestfold', 'Larvik': 'Vestfold',
  'Skien': 'Telemark', 'Porsgrunn': 'Telemark',
  'Arendal': 'Agder', 'Kristiansand': 'Agder', 'Grimstad': 'Agder', 'Vennesla': 'Agder',
  'Stavanger': 'Rogaland', 'Sandnes': 'Rogaland', 'Haugesund': 'Rogaland',
  'Bergen': 'Vestland', 'Voss': 'Vestland', 'Askøy': 'Vestland',
  'Ålesund': 'Møre og Romsdal', 'Molde': 'Møre og Romsdal', 'Kristiansund': 'Møre og Romsdal',
  'Trondheim': 'Trøndelag', 'Steinkjer': 'Trøndelag',
  'Bodø': 'Nordland', 'Narvik': 'Nordland',
  'Tromsø': 'Troms', 'Harstad': 'Troms',
  'Alta': 'Finnmark', 'Hammerfest': 'Finnmark',
};

export function genererBeskrivelse(bedrift) {
  if (!bedrift) return null;

  const bransjeTekst = BRANSJE_TEKST[bedrift.naeringskode];
  if (!bransjeTekst) return null;

  const kommune = bedrift.kommune
    ? bedrift.kommune.charAt(0) + bedrift.kommune.slice(1).toLowerCase()
    : null;
  if (!kommune) return null;

  const fylke = FYLKE_FRA_KOMMUNE[kommune] || null;
  const stiftetAar = bedrift.stiftelsesdato?.substring(0, 4);
  const harAnsatte = bedrift.antall_ansatte != null && bedrift.antall_ansatte > 0;
  const erMva = bedrift.mva_registrert;
  const orgform = bedrift.organisasjonsform === 'AS' ? 'aksjeselskap' :
                  bedrift.organisasjonsform === 'ENK' ? 'enkeltpersonforetak' :
                  bedrift.organisasjonsform === 'ANS' ? 'ansvarlig selskap' : null;

  // Bygg setning 1: hva og hvor
  let s1 = `${bedrift.navn} leverer ${bransjeTekst} i ${kommune} og omegn.`;

  // Bygg setning 2: fakta om selskapet
  const fakta = [];
  if (stiftetAar) fakta.push(`etablert i ${stiftetAar}`);
  if (harAnsatte) fakta.push(`${bedrift.antall_ansatte} ansatte`);
  if (orgform) fakta.push(`organisert som ${orgform}`);
  if (erMva) fakta.push('registrert i MVA-registeret');

  let s2 = fakta.length > 0
    ? `Selskapet er ${fakta.join(', ')}.`
    : null;

  // Bygg setning 3: regional kontekst
  let s3 = fylke && fylke !== kommune
    ? `De er lokalisert i ${fylke}-regionen.`
    : null;

  return [s1, s2, s3].filter(Boolean).join(' ');
}
