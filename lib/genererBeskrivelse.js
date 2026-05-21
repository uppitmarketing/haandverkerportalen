// lib/genererBeskrivelse.js

const BRANSJE_TEKST = {
  '43.210': 'elektriske installasjonstjenester',
  '43.221': 'rørleggerarbeid og VVS-tjenester',
  '43.222': 'kuldeanlegg, varmepumper og VVS-tjenester',
  '43.223': 'ventilasjonsarbeid og VVS-tjenester',
  '43.320': 'tømrerarbeid og snekkerarbeid',
  '41.000': 'bygge- og entreprenørarbeid',
  '43.340': 'maler- og glassarbeid',
  '43.910': 'taklegging og takarbeid',
  '43.330': 'gulvlegging og parkett',
  '43.120': 'grunnarbeid og anleggsarbeid',
};

export function genererBeskrivelse(bedrift) {
  if (!bedrift) return null;

  const bransjeTekst = BRANSJE_TEKST[bedrift.naeringskode];
  if (!bransjeTekst) return null;

  const kommune = bedrift.kommune
    ? bedrift.kommune.charAt(0) + bedrift.kommune.slice(1).toLowerCase()
    : null;
  if (!kommune) return null;

  const stiftetAar = bedrift.stiftelsesdato?.substring(0, 4);
  const harAnsatte = bedrift.antall_ansatte != null && bedrift.antall_ansatte > 0;
  const erMva = bedrift.mva_registrert;
  const orgform = bedrift.organisasjonsform === 'AS' ? 'aksjeselskap' :
                  bedrift.organisasjonsform === 'ENK' ? 'enkeltpersonforetak' :
                  bedrift.organisasjonsform === 'ANS' ? 'ansvarlig selskap' : null;

  // Setning 1: hva og hvor
  let s1 = `${bedrift.navn} leverer ${bransjeTekst} i ${kommune} og omegn.`;

  // Setning 2: fakta om selskapet
  const fakta = [];
  if (stiftetAar) fakta.push(`etablert i ${stiftetAar}`);
  if (harAnsatte) fakta.push(`${bedrift.antall_ansatte} ansatte`);
  if (orgform) fakta.push(`organisert som ${orgform}`);
  if (erMva) fakta.push('registrert i MVA-registeret');

  let s2 = fakta.length > 0
    ? `Selskapet er ${fakta.join(', ')}.`
    : null;

  // Setning 3: lokal kontekst
  let s3 = `De holder til i ${kommune} kommune.`;

  return [s1, s2, s3].filter(Boolean).join(' ');
}
