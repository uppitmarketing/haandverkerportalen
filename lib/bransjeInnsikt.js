// lib/bransjeInnsikt.js
// Bransje-spesifikt SEO-innhold delt mellom bransje-oversikten (/rorlegger)
// og bransje×kommune-sidene (/rorlegger/bergen) – unngår at alle disse
// sidene deler ordrett samme prisavsnitt og tips.

export const BRANSJE_INNSIKT = {
  elektriker: {
    prisTekst: 'Timeprisen for elektrikere ligger normalt mellom 600 og 1200 kroner inkl. mva, avhengig av bedrift og type oppdrag. Enkle jobber som bytte av kontakter koster mindre enn nytt sikringsskap eller større installasjonsarbeid.',
    punkter: [
      'Sjekk at foretaket er registrert som elektroforetak',
      'Elektroarbeid skal utføres av eller under tilsyn av kvalifisert personell',
      'Be om referanser fra tidligere oppdrag',
      'Krev skriftlig tilbud med spesifisert pris',
    ],
  },
  rorlegger: {
    prisTekst: 'Prisen på rørleggerarbeid varierer mye med type jobb — fra enkle reparasjoner til full baderomsrenovering. Akutte utrykninger på kveld og helg koster normalt mer enn planlagte oppdrag i vanlig arbeidstid.',
    punkter: [
      'Sjekk godkjenning for våtromsarbeid ved baderomsjobber',
      'Be om referanser, spesielt for større prosjekter',
      'Spør om forsikring og garanti på utført arbeid',
      'Innhent minst tre tilbud før du bestemmer deg',
    ],
  },
  tomrer: {
    prisTekst: 'Timeprisen for tømrere ligger normalt mellom 600 og 1200 kroner inkl. mva. Større prosjekter som tilbygg eller full renovering prises ofte som en kombinasjon av timepris og materialkostnader, eller som fastpris.',
    punkter: [
      'Be om skriftlig tilbud med spesifisert pris',
      'Avklar hvem som står for eventuell byggesøknad',
      'Sjekk referanser fra lignende prosjekter',
      'Innhent minst tre tilbud på større jobber',
    ],
  },
  byggmester: {
    prisTekst: 'Prisen på et byggeprosjekt avhenger sterkt av størrelse, kompleksitet og om det kreves byggesøknad eller ansvarsrett. Be alltid om et detaljert kostnadsoverslag før du starter.',
    punkter: [
      'Sjekk om bedriften har sentral godkjenning hos DiBK for større prosjekter',
      'Avklar ansvarsforhold og eventuell byggesøknad tidlig',
      'Krev skriftlig, spesifisert tilbud',
      'Innhent flere tilbud på større prosjekter',
    ],
  },
  maler: {
    prisTekst: 'Prisen på malerarbeid avhenger av flatestørrelse, antall strøk, og om jobben er innvendig eller utvendig. Spør alltid om prisen inkluderer materialer eller om det kommer i tillegg.',
    punkter: [
      'Be om referanser og se eksempler på tidligere arbeid',
      'Avklar om tilbudet inkluderer maling og materialer',
      'Sjekk erfaring med akkurat den overflaten du skal ha behandlet',
      'Innhent flere tilbud før du bestemmer deg',
    ],
  },
  taklegger: {
    prisTekst: 'Prisen på takarbeid avhenger av takets størrelse, helningsgrad og om det er en akutt lekkasjereparasjon eller planlagt tekking. Akutte oppdrag koster normalt mer enn planlagte.',
    punkter: [
      'Sjekk erfaring med høydearbeid og at sikkerhetsrutiner følges',
      'Spør om garanti på tekking og tetting',
      'Be om referanser fra lignende tak',
      'Innhent flere tilbud på større jobber',
    ],
  },
  gulvlegger: {
    prisTekst: 'Prisen på gulvlegging avhenger av flatestørrelse, materialvalg og om gammelt gulv må fjernes først. Be om at tilbudet spesifiserer både arbeid og materialer.',
    punkter: [
      'Be om referanser og se eksempler på tidligere arbeid',
      'Avklar om prisen inkluderer forarbeid og fjerning av gammelt gulv',
      'Sjekk garantivilkår på utført arbeid',
      'Innhent flere tilbud før du bestemmer deg',
    ],
  },
  grunnarbeid: {
    prisTekst: 'Prisen på grunnarbeid avhenger sterkt av grunnforhold, maskinbehov og omfanget av jobben. Enkle jobber koster vesentlig mindre enn graving og klargjøring av større tomter.',
    punkter: [
      'Sjekk erfaring med maskinpark og grunnforhold i området',
      'Avklar ansvar for eventuell grunnundersøkelse',
      'Be om referanser fra lignende prosjekter',
      'Innhent flere tilbud før du bestemmer deg',
    ],
  },
  varmepumpe: {
    prisTekst: 'Prisen på montering av varmepumpe avhenger av type anlegg (luft-luft, luft-vann eller berg/jordvarme), boligens størrelse og hvor komplisert installasjonen er. Selve varmepumpen utgjør ofte mesteparten av prisen, arbeidet kommer i tillegg.',
    punkter: [
      'Sjekk at montøren er sertifisert for kuldemedium (F-gass-forskriften)',
      'Be om skriftlig tilbud som skiller pris på utstyr og montering',
      'Spør om garanti på både anlegg og utført arbeid',
      'Innhent flere tilbud, spesielt for større anlegg',
    ],
  },
  ventilasjon: {
    prisTekst: 'Prisen på ventilasjonsarbeid avhenger av boligtype, om det er nytt anlegg eller oppgradering av eksisterende, og hvor tilgjengelige kanalene er. Balansert ventilasjon med varmegjenvinning koster mer enn enkle avtrekksløsninger.',
    punkter: [
      'Be om dokumentasjon på luftmengder og at anlegget er dimensjonert riktig',
      'Sjekk erfaring med akkurat din boligtype',
      'Avklar om service og filterbytte er inkludert',
      'Innhent flere tilbud før du bestemmer deg',
    ],
  },
  murer: {
    prisTekst: 'Prisen på murerarbeid avhenger av type oppdrag — pipe, grunnmur, fasade eller restaurering av gammelt murverk krever ulik kompetanse og tidsbruk. Tradisjonshåndverk og restaurering tar ofte lengre tid enn nybygg.',
    punkter: [
      'Be om å se eksempler på tidligere murerarbeid, gjerne av samme type',
      'Avklar om prisen inkluderer stillas og opprydding',
      'Sjekk erfaring med akkurat den type mur/stein du skal ha arbeid utført på',
      'Innhent flere tilbud på større prosjekter',
    ],
  },
};

export const FALLBACK_INNSIKT = {
  prisTekst: 'Prisen varierer med jobbens omfang og kompleksitet. Innhent alltid minst tre tilbud før du bestemmer deg.',
  punkter: [
    'Sjekk at bedriften er aktiv i Brønnøysundregistrene',
    'Be om referanser fra tidligere oppdrag',
    'Krev skriftlig tilbud med spesifisert pris',
    'Kontroller nødvendige sertifiseringer for jobben',
  ],
};

export function getBransjeInnsikt(slug) {
  return BRANSJE_INNSIKT[slug] || FALLBACK_INNSIKT;
}

// Korrekte flertallsformer – "visningsnavn.toLowerCase() + 'er'" gir feil
// resultat for fag som allerede ender på "-er" (f.eks. "rørleggerer").
const BRANSJE_FLERTALL = {
  elektriker: 'elektrikere',
  rorlegger: 'rørleggere',
  tomrer: 'tømrere',
  byggmester: 'byggmestere',
  maler: 'malere',
  taklegger: 'takleggere',
  gulvlegger: 'gulvleggere',
  grunnarbeid: 'grunnarbeidere',
  varmepumpe: 'varmepumpemontører',
  ventilasjon: 'ventilasjonsmontører',
  murer: 'murere',
};

export function getBransjeFlertall(slug, visningsnavn) {
  return BRANSJE_FLERTALL[slug] || `${visningsnavn.toLowerCase()}er`;
}
