// lib/artikler.js
// Innholdskilde for guider/artikler. Statisk innhold – ingen ekstern CMS ennå.

export const ARTIKLER = [
  {
    slug: 'hva-koster-elektriker',
    tittel: 'Hva koster en elektriker?',
    ingress: 'Timepriser, hva som påvirker kostnaden og konkrete tips til å spare penger på elektrikertjenester.',
    bransje: 'Elektriker',
    bransjeSlug: 'elektriker',
    publisert: '2026-08-28',
    oppdatert: '2026-08-28',
    seksjoner: [
      {
        heading: 'Typisk timepris for elektriker',
        avsnitt: [
          'Timeprisen til en elektriker i Norge ligger normalt mellom 600 og 1200 kroner inkl. mva, avhengig av bedrift, sted og type oppdrag. Enkle jobber som bytte av kontakter eller montering av lysarmatur ligger gjerne i den lavere enden, mens akutte oppdrag på kveld og helg koster mer.',
          'Mange elektrikere tar også en oppmøtepris eller minstepris per besøk, ofte tilsvarende 1–2 timer arbeid, selv om selve jobben tar kortere tid.',
        ],
      },
      {
        heading: 'Hva påvirker prisen?',
        avsnitt: ['Flere faktorer spiller inn på hva en elektrikerjobb ender opp med å koste:'],
        liste: [
          'Omfang og kompleksitet – nytt sikringsskap koster mer enn å bytte en stikkontakt',
          'Tidspunkt – kveld, helg og helligdager gir ofte tillegg',
          'Reisevei – bedrifter tar ofte kjøregodtgjørelse utenfor sentrale strøk',
          'Materialer – kabler, brytere og utstyr kommer i tillegg til arbeidstiden',
          'Om det kreves anmelding til nettselskapet, f.eks. ved nytt sikringsskap eller økt effekt',
        ],
      },
      {
        heading: 'Fastpris eller timepris?',
        avsnitt: [
          'For avgrensede jobber – som installasjon av varmepumpe, ladepunkt for elbil eller nytt sikringsskap – tilbyr mange elektrikere fastpris. Da vet du kostnaden på forhånd, og risikoen for overraskelser ligger hos bedriften.',
          'For mer uforutsigbare oppdrag, som feilsøking eller renovering, er timepris mer vanlig, siden omfanget kan være vanskelig å fastslå før arbeidet er i gang.',
        ],
      },
      {
        heading: 'Slik sparer du penger',
        avsnitt: ['Noen enkle grep kan gjøre elektrikerjobben rimeligere uten at du går på akkord med kvaliteten:'],
        liste: [
          'Innhent minst tre tilbud før du bestemmer deg',
          'Be om fastpris der det er mulig, ikke bare et anslag',
          'Samle flere mindre jobber til ett besøk for å unngå gjentatt oppmøtepris',
          'Unngå akutte kveldsutrykninger når jobben kan vente til vanlig arbeidstid',
          'Sjekk at bedriften er registrert og aktiv i Brønnøysundregistrene før du bestiller',
        ],
      },
    ],
    faq: [
      {
        sp: 'Hva koster det å bytte sikringsskap?',
        sv: 'Å bytte et sikringsskap koster typisk mellom 8 000 og 20 000 kroner inkl. mva, avhengig av skapets størrelse og hvor omfattende arbeidet er. Be alltid om fastpris på denne typen jobb.',
      },
      {
        sp: 'Må elektrikeren være registrert noe sted?',
        sv: 'Ja. Elektroinstallasjonsarbeid skal utføres av et registrert elektroforetak. Du kan sjekke at bedriften er aktiv og registrert med riktig næringskode i Brønnøysundregistrene før du bestiller.',
      },
      {
        sp: 'Er det billigere å bestille elektriker på dagtid i ukedager?',
        sv: 'Ja, de fleste elektrikere har lavest pris på vanlig arbeidstid i ukedager. Kveld, helg og helligdager gir normalt tillegg i timeprisen.',
      },
      {
        sp: 'Trenger jeg flere tilbud før jeg velger elektriker?',
        sv: 'Det anbefales alltid å innhente minst tre tilbud, spesielt på større jobber. Det gir deg et realistisk prisbilde og gjør det lettere å oppdage om et tilbud er unormalt høyt eller lavt.',
      },
    ],
  },

  {
    slug: 'velge-rorlegger',
    tittel: 'Slik velger du riktig rørlegger',
    ingress: 'Konkrete tips og råd til å finne en pålitelig rørlegger i ditt område – og unngå de vanligste fallgruvene.',
    bransje: 'Rørlegger',
    bransjeSlug: 'rorlegger',
    publisert: '2026-08-28',
    oppdatert: '2026-08-28',
    seksjoner: [
      {
        heading: 'Sjekk at rørleggeren er godkjent',
        avsnitt: [
          'Våtromsarbeid og rørleggerarbeid som berører sanitæranlegg bør utføres av foretak med godkjenning for våtrom, gjerne med tilknytning til en bransjeorganisasjon som Norsk Rørleggerbedrifters Landsforening (NRL) eller tilsvarende våtromsnorm (som Fagrådet for våtrom).',
          'Sjekk alltid at bedriften er registrert og aktiv i Brønnøysundregistrene. Det er et minimum, men gir deg trygghet for at du har med et reelt, ansvarlig foretak å gjøre.',
        ],
      },
      {
        heading: 'Innhent flere tilbud',
        avsnitt: [
          'Prisen på rørleggerarbeid varierer mye mellom bedrifter, og det lønner seg å hente inn minst tre tilbud før du bestemmer deg – spesielt på større jobber som baderomsrenovering eller rørlegging i nybygg.',
          'Be om at tilbudene er spesifisert, slik at du kan sammenligne arbeid, materialer og eventuelle forbehold direkte mot hverandre.',
        ],
      },
      {
        heading: 'Spør om referanser',
        avsnitt: [
          'En seriøs rørlegger stiller gjerne opp med referanser fra tidligere kunder, spesielt for større jobber. Se også etter anmeldelser og hvor lenge bedriften har vært i drift – stiftelsesår og antall ansatte finner du på bedriftens profilside her på HåndverkerPortalen.',
        ],
      },
      {
        heading: 'Forsikring og garantier',
        avsnitt: [
          'Spør om bedriften har ansvarsforsikring, og hva slags garanti som gjelder på utført arbeid. Ved våtromsarbeid er dette spesielt viktig, siden feil kan føre til fukt- og vannskader som er kostbare å utbedre i ettertid.',
        ],
      },
      {
        heading: 'Varselsignaler å se etter',
        avsnitt: ['Vær ekstra oppmerksom hvis du opplever noe av følgende:'],
        liste: [
          'Bedriften krever full forskuddsbetaling før arbeidet er påbegynt',
          'Du får ikke skriftlig tilbud eller kontrakt',
          'Prisen er vesentlig lavere enn alle andre tilbud, uten god forklaring',
          'Bedriften er ikke registrert eller står oppført som ikke aktiv',
        ],
      },
    ],
    faq: [
      {
        sp: 'Hvordan vet jeg om en rørlegger er seriøs?',
        sv: 'Sjekk at bedriften er registrert og aktiv i Brønnøysundregistrene, be om referanser, og se etter godkjenning for våtromsarbeid. Et seriøst foretak gir deg alltid skriftlig tilbud.',
      },
      {
        sp: 'Hvor mange tilbud bør jeg innhente?',
        sv: 'Minst tre tilbud er en god tommelfingerregel, spesielt for større jobber som baderomsrenovering. Det gir deg et realistisk prisbilde å sammenligne mot.',
      },
      {
        sp: 'Trenger jeg godkjent våtromsforetak for alt rørleggerarbeid?',
        sv: 'Nei, men for arbeid som berører membran og tetting i våtrom er det sterkt anbefalt å bruke et foretak med våtromsgodkjenning, siden feil kan gi kostbare fukt- og vannskader.',
      },
    ],
  },

  {
    slug: 'hva-koster-tomrer',
    tittel: 'Hva koster en tømrer?',
    ingress: 'Alt du trenger å vite om timepriser, fastpris og hva som påvirker kostnaden på tømrerarbeid.',
    bransje: 'Tømrer',
    bransjeSlug: 'tomrer',
    publisert: '2026-08-28',
    oppdatert: '2026-08-28',
    seksjoner: [
      {
        heading: 'Typisk timepris for tømrer',
        avsnitt: [
          'Timeprisen for en tømrer ligger normalt mellom 600 og 1200 kroner inkl. mva, på linje med andre håndverksfag. Mindre, enkle oppdrag som montering av lister eller mindre reparasjoner ligger gjerne i den lavere enden av skalaen.',
          'Større prosjekter som tilbygg, takarbeid eller full renovering prises ofte som en kombinasjon av timepris og materialkostnader, eller som fastpris for hele prosjektet.',
        ],
      },
      {
        heading: 'Hva påvirker prisen?',
        avsnitt: ['Kostnaden på et tømrerprosjekt varierer med:'],
        liste: [
          'Prosjektets størrelse og kompleksitet',
          'Om det kreves byggesøknad eller ansvarsrett',
          'Materialvalg – kvalitet og type trevirke, isolasjon og kledning',
          'Tilgjengelighet på tomten og reisevei for bedriften',
          'Sesong – vår og høst er ofte travleste periode med lengre ventetid',
        ],
      },
      {
        heading: 'Fastpris på større prosjekter',
        avsnitt: [
          'Ved tilbygg, påbygg eller andre større prosjekter er det vanlig å be om fastpris eller et detaljert kostnadsoverslag, gjerne basert på tegninger. Dette gir bedre forutsigbarhet enn ren timepris, men krever at prosjektet er godt spesifisert på forhånd.',
        ],
      },
      {
        heading: 'Slik får du et riktig prisbilde',
        avsnitt: ['For å unngå overraskelser underveis:'],
        liste: [
          'Be om skriftlig tilbud med spesifisert pris, ikke bare et muntlig anslag',
          'Avklar hvem som står for eventuell byggesøknad',
          'Spør om det er satt av tid til uforutsette forhold, spesielt ved rehabilitering',
          'Innhent minst tre tilbud på større prosjekter',
        ],
      },
    ],
    faq: [
      {
        sp: 'Hva koster et tilbygg på 20 kvadratmeter?',
        sv: 'Prisen varierer mye med standard, grunnarbeid og ferdigstillelsesgrad, men de fleste tilbygg av denne størrelsen havner i sekssifret beløp inkl. materialer. Be om et konkret tilbud fra flere tømrerfirmaer basert på dine tegninger.',
      },
      {
        sp: 'Trenger jeg byggesøknad for tømrerarbeid?',
        sv: 'Det avhenger av tiltaket. Mindre arbeid som er unntatt søknadsplikt kan gjøres uten, mens tilbygg og større endringer normalt krever søknad til kommunen. En erfaren tømrer eller ansvarlig søker kan avklare dette for ditt prosjekt.',
      },
      {
        sp: 'Hvor lang ventetid må jeg regne med?',
        sv: 'I rushperioder, typisk vår og høst, kan ventetiden hos tømrerfirmaer være flere uker. Ta kontakt i god tid, og spør flere bedrifter om ledig kapasitet.',
      },
    ],
  },

  {
    slug: 'krav-handverkere',
    tittel: 'Krav til håndverkere i Norge',
    ingress: 'Hvilke registreringer, godkjenninger og sertifiseringer bør du sjekke før du velger håndverker?',
    bransje: 'Generelt',
    bransjeSlug: null,
    publisert: '2026-08-28',
    oppdatert: '2026-08-28',
    seksjoner: [
      {
        heading: 'Registrering i Brønnøysundregistrene',
        avsnitt: [
          'Alle norske foretak, inkludert håndverksbedrifter, skal være registrert i Enhetsregisteret hos Brønnøysundregistrene med organisasjonsnummer og riktig næringskode. Dette er grunnleggende dokumentasjon på at du har med et reelt, registrert foretak å gjøre – ikke svart arbeid.',
          'Du finner denne informasjonen på hver bedrifts profilside her på HåndverkerPortalen, samt en direktelenke til Brreg.no for å verifisere status selv.',
        ],
      },
      {
        heading: 'Sentral godkjenning',
        avsnitt: [
          'For enkelte typer byggearbeid kan bedrifter søke om sentral godkjenning hos Direktoratet for byggkvalitet (DiBK). Dette er en frivillig ordning som viser at bedriften har den kompetansen og de kvalitetssikringsrutinene som kreves for oppgaven de søker godkjenning for.',
          'Sentral godkjenning er ikke et krav for alt håndverksarbeid, men er relevant å sjekke ved større byggeprosjekter der det kreves ansvarsrett.',
        ],
      },
      {
        heading: 'Fagbrev og kompetanse',
        avsnitt: [
          'Mange håndverksfag i Norge, som elektriker og rørlegger, er lærefag med fagbrev. For elektroarbeid er det i tillegg lovpålagt at installasjonsarbeid utføres av eller under tilsyn av kvalifisert personell tilknyttet et registrert elektroforetak.',
          'For andre fag, som tømrer og maler, finnes det tilsvarende fagbrev, men kravene til hvem som faktisk kan utføre arbeidet er mindre strenge enn for elektro. Det er likevel et godt tegn om bedriften har fagutdannede ansatte.',
        ],
      },
      {
        heading: 'Forsikring',
        avsnitt: [
          'Et seriøst håndverksforetak bør ha ansvarsforsikring som dekker eventuelle skader som oppstår i forbindelse med arbeidet. Det er lurt å spørre om dette før du inngår avtale, spesielt på større eller mer risikofylte oppdrag.',
        ],
      },
      {
        heading: 'MVA-registrering',
        avsnitt: [
          'Foretak med omsetning over grensen for merverdiavgiftsplikt skal være registrert i mva-registeret. Du finner denne statusen på bedriftens profilside. Er bedriften mva-registrert, skal mva legges til på fakturaen i henhold til gjeldende sats.',
        ],
      },
    ],
    faq: [
      {
        sp: 'Hvordan sjekker jeg om en håndverker er seriøs?',
        sv: 'Sjekk at bedriften er registrert og aktiv i Brønnøysundregistrene, spør om forsikring og fagbrev, og innhent gjerne referanser fra tidligere kunder før du inngår avtale.',
      },
      {
        sp: 'Er sentral godkjenning påkrevd for alle håndverkere?',
        sv: 'Nei, sentral godkjenning fra DiBK er en frivillig ordning. Den er mest relevant ved større byggeprosjekter som krever ansvarsrett, ikke for enklere håndverksoppdrag.',
      },
      {
        sp: 'Må håndverkeren være mva-registrert?',
        sv: 'Bare foretak med omsetning over grensen for merverdiavgiftsplikt skal være mva-registrert. Du kan se status for hver bedrift på profilsiden deres her på HåndverkerPortalen.',
      },
    ],
  },
];

export function getArtikkelBySlug(slug) {
  return ARTIKLER.find(a => a.slug === slug) || null;
}

export function getAlleArtikkelSlugs() {
  return ARTIKLER.map(a => a.slug);
}

export function getLesetid(artikkel) {
  const ord = artikkel.seksjoner.reduce((sum, s) => {
    const avsnittOrd = (s.avsnitt || []).join(' ').split(/\s+/).length;
    const listeOrd = (s.liste || []).join(' ').split(/\s+/).length;
    return sum + avsnittOrd + listeOrd;
  }, 0);
  return Math.max(2, Math.round(ord / 200));
}
