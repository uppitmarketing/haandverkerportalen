// lib/bransjeSynonymer.js
// Ord folk faktisk søker på, som avviker fra bransjenavnet vi bruker (f.eks.
// «snekker» for tømrer). Brukes i title/H1/ingress på bransje/sted-sidene.
// Det lages ingen egne URL-er for synonymene - de leses bare inn i teksten.
//
// tittelTillegg: settes etter bransjenavnet i title og H1 («Tømrer og snekker i X»).
//                La stå tom hvis navnet er langt eller synonymet ikke er viktig nok.
// forklaring:    én setning i teksten under listen. Må være sann for alle bedriftene
//                på siden - beskriv ordbruk, ikke garantier om godkjenninger.
export const BRANSJE_SYNONYMER = {
  tomrer: {
    tittelTillegg: 'snekker',
    forklaring: 'Tømrer og snekker brukes ofte om det samme håndverket: bygging og reparasjon i tre, som terrasser, tak, vinduer, dører og kjøkken. Bedriftene under er registrert som tømrerfirma i Brønnøysundregistrene.',
  },
  rorlegger: {
    tittelTillegg: 'VVS',
    forklaring: 'Rørlegger, VVS-installatør og rørleggerfirma brukes ofte om det samme faget: vann, avløp og varme i bygg. Bedriftene under er registrert som rørleggerbedrifter (VVS) i Brønnøysundregistrene.',
  },
  maler: {
    tittelTillegg: 'malermester',
    forklaring: 'Maler, malermester og malerfirma brukes om det samme faget: maling, sparkling og tapetsering. Bedriftene under er registrert som malerbedrifter i Brønnøysundregistrene.',
  },
  byggmester: {
    tittelTillegg: 'entreprenør',
    forklaring: 'Byggmester, entreprenør og byggefirma brukes ofte om bedrifter som tar på seg bygging, tilbygg og rehabilitering. Bedriftene under er registrert som byggevirksomhet i Brønnøysundregistrene.',
  },
  grunnarbeid: {
    tittelTillegg: 'graving',
    forklaring: 'Grunnarbeid, graving og maskinentreprenør brukes om arbeid som graving, drenering og opparbeiding av tomter. Bedriftene under er registrert under grunnarbeid i Brønnøysundregistrene.',
  },
  elektriker: {
    forklaring: 'Elektriker og elektroinstallatør brukes om det samme faget. Alle bedriftene under er registrert i DSBs elvirksomhetsregister.',
  },
  varmepumpe: {
    forklaring: 'Varmepumpemontør, varmepumpe-installatør og kuldemontør brukes om bedrifter som monterer og vedlikeholder varmepumper og kuldeanlegg.',
  },
  ventilasjon: {
    forklaring: 'Ventilasjonsmontør og ventilasjonsfirma brukes om bedrifter som monterer og vedlikeholder ventilasjonsanlegg.',
  },
  taklegger: {
    forklaring: 'Taklegger, takdekker og takentreprenør brukes om bedrifter som legger og reparerer tak.',
  },
  gulvlegger: {
    forklaring: 'Gulvlegger og parkettlegger brukes om bedrifter som legger og pusser gulv.',
  },
  murer: {
    forklaring: 'Murer, murmester og murerfirma brukes om bedrifter som utfører murarbeid, pussing og flising.',
  },
};

export function getBransjeSynonymer(slug) {
  return BRANSJE_SYNONYMER[slug] || {};
}

// «Tømrer og snekker» - brukes i title og H1
export function bransjeTittelNavn(slug, visningsnavn) {
  const { tittelTillegg } = getBransjeSynonymer(slug);
  return tittelTillegg ? `${visningsnavn} og ${tittelTillegg}` : visningsnavn;
}
