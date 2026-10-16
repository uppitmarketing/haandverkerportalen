// lib/bransjeBlokker.js
// Innholdsblokk per bransje, vist på alle bedriftssider i bransjen (se
// components/BransjeBlokk.jsx). UTKAST: ingenting vises før `godkjent: true`.
//
// Regler for innholdet:
// - Bare det som allerede står i guidene (lib/artikler.js) og lib/bransjeInnsikt.js,
//   slik at tall og krav ikke motsier hverandre. Ingen egne prisestimater: nye tall
//   skal ha en kilde og legges først inn i guiden.
// - Priser vises som veiledende, inkl. mva.
// - Krav og godkjenninger beskriver ordninger (DSB, DiBK, fagbrev, bransjenorm) uten
//   å love noe om enkeltbedrifter.
//
// Test: blokken vises bare for bedrifter i testgruppen (se skalViseBransjeBlokk).

export const BLOKK_OPPDATERT = 'oktober 2026';

export const BRANSJE_BLOKKER = {
  elektriker: {
    godkjent: true,
    guide: { slug: 'hva-koster-elektriker', tittel: 'Hva koster en elektriker?' },
    hva: 'Elektrikere installerer, vedlikeholder og feilsøker elektriske anlegg i boliger og bygg: fra stikkontakter og belysning til sikringsskap, elbil-lading og varmekabler.',
    oppdrag: [
      'Bytte og flytte stikkontakter og brytere',
      'Montere downlights, utelys og annen belysning',
      'Nytt eller utvidet sikringsskap',
      'Installere ladeboks til elbil',
      'Feilsøking – utfall av sikringer og jordfeil',
      'Varmekabler i bad og gulv',
      'El-tilkobling av varmepumpe og andre faste apparater',
    ],
    pris: {
      rader: [
        { jobb: 'Timepris', pris: '600–1 200 kr' },
        { jobb: 'Bytte sikringsskap', pris: '8 000–20 000 kr' },
      ],
      merknad: 'Mange tar oppmøtepris, ofte tilsvarende 1–2 timer. Kveld, helg og helligdager gir normalt tillegg.',
    },
    krav: [
      'Foretak som utfører elektrisk installasjonsarbeid skal være registrert i DSBs register over elvirksomheter.',
      'Etter nyinstallasjon og større endringer skal du få dokumentasjon, blant annet samsvarserklæring.',
      'Større endringer, som nytt sikringsskap eller økt effekt, kan kreve melding til nettselskapet.',
    ],
    sjekk: [
      'At foretaket står i DSBs elvirksomhetsregister (vi viser det på profilen)',
      'Skriftlig tilbud med spesifisert pris – fastpris på avgrensede jobber',
      'Referanser fra lignende oppdrag',
      'At du får samsvarserklæring og annen dokumentasjon etter jobben',
      'Ansvarsforsikring og garanti på utført arbeid',
    ],
    faq: [
      {
        sp: 'Hvordan sjekker jeg at en elektriker er registrert?',
        sv: 'Elektroforetak skal være registrert i DSBs register over elvirksomheter. På HåndverkerPortalen viser vi bare elektrikere som står i registeret, og det markeres på profilen. Du kan også søke opp foretaket direkte hos DSB.',
      },
      {
        sp: 'Hva er en samsvarserklæring?',
        sv: 'Dokumentasjon fra elektroforetaket på at installasjonen er utført i tråd med regelverket. Du skal få den etter nyinstallasjon og større endringer, og bør oppbevare den sammen med øvrig dokumentasjon om boligen.',
      },
      {
        sp: 'Er det billigere å bestille elektriker på dagtid i ukedager?',
        sv: 'Ja, de fleste elektrikere har lavest pris på vanlig arbeidstid i ukedager. Kveld, helg og helligdager gir normalt tillegg i timeprisen.',
      },
    ],
  },

  rorlegger: {
    godkjent: true,
    guide: { slug: 'velge-rorlegger', tittel: 'Slik velger du riktig rørlegger' },
    hva: 'Rørleggere installerer og reparerer vann-, avløps- og varmeanlegg i boliger og bygg: fra lekkasjer og blandebatterier til baderom, varmtvannsbereder og vannbåren gulvvarme.',
    oppdrag: [
      'Utbedre lekkasjer og skadde rør',
      'Bytte blandebatteri, sluk og stoppekran',
      'Montere eller bytte WC, servant og dusj',
      'Installere eller bytte varmtvannsbereder',
      'Rørlegging ved baderoms- og kjøkkenrenovering',
      'Feilsøking og utbedring av avløp',
      'Vannbåren gulvvarme',
    ],
    pris: {
      tekst: 'Prisen på rørleggerarbeid varierer mye med type jobb, fra enkle reparasjoner til full baderomsrenovering. Akutte utrykninger på kveld og helg koster normalt mer enn planlagte oppdrag i vanlig arbeidstid.',
    },
    krav: [
      'Våtromsarbeid og rørleggerarbeid som berører sanitæranlegg bør utføres av foretak med godkjenning for våtrom, gjerne med tilknytning til en bransjeorganisasjon som Norsk Rørleggerbedrifters Landsforening (NRL) eller tilsvarende våtromsnorm.',
      'Sentral godkjenning fra DiBK er en frivillig ordning som viser hva foretaket er vurdert for. Du kan se det i DiBKs register.',
      'Rørleggerfaget har eget fagbrev.',
    ],
    sjekk: [
      'Godkjenning eller dokumentert kompetanse for våtromsarbeid',
      'Skriftlig, spesifisert tilbud – minst tre på større jobber',
      'Ansvarsforsikring og garanti på utført arbeid',
      'Referanser, spesielt for baderom',
      'Unngå full forskuddsbetaling før arbeidet er påbegynt',
    ],
    faq: [
      {
        sp: 'Er rørlegger og VVS-installatør det samme?',
        sv: 'I praksis brukes begge om de samme bedriftene. VVS står for varme, ventilasjon og sanitær, og de fleste rørleggerfirmaer jobber med sanitær og varme.',
      },
      {
        sp: 'Hvordan vet jeg om en rørlegger er seriøs?',
        sv: 'Sjekk at bedriften er registrert og aktiv i Brønnøysundregistrene, be om referanser, og se etter godkjenning for våtromsarbeid. Et seriøst foretak gir deg alltid skriftlig tilbud.',
      },
      {
        sp: 'Trenger jeg godkjent våtromsforetak for alt rørleggerarbeid?',
        sv: 'Nei, men for arbeid som berører membran og tetting i våtrom er det sterkt anbefalt å bruke et foretak med våtromsgodkjenning, siden feil kan gi kostbare fukt- og vannskader.',
      },
    ],
  },

  tomrer: {
    godkjent: true,
    guide: { slug: 'hva-koster-tomrer', tittel: 'Hva koster en tømrer?' },
    hva: 'Tømrere bygger og reparerer i tre: fra terrasser, vinduer og dører til tak, tilbygg og innredning.',
    oppdrag: [
      'Terrasse, platting og levegg',
      'Tilbygg og påbygg',
      'Bytte vinduer og dører',
      'Utvendig kledning og panel',
      'Montering av kjøkken, garderobe og innredning',
      'Gulv, himling og listverk',
      'Carport, anneks og bod',
    ],
    pris: {
      rader: [
        { jobb: 'Timepris', pris: '600–1 200 kr' },
        { jobb: 'Tilbygg på 20 m²', pris: 'sekssifret beløp inkl. materialer' },
      ],
      merknad: 'Større prosjekter prises ofte som fastpris eller detaljert kostnadsoverslag basert på tegninger.',
    },
    krav: [
      'Mindre arbeid kan være unntatt søknadsplikt, mens tilbygg og større endringer normalt krever søknad til kommunen.',
      'Sentral godkjenning fra DiBK er en frivillig ordning som viser hva foretaket er vurdert for. Du kan se det i DiBKs register.',
      'Tømrerfaget har eget fagbrev.',
    ],
    sjekk: [
      'Skriftlig tilbud med spesifisert pris',
      'Hvem som står for eventuell byggesøknad og ansvarsrett',
      'Referanser fra lignende prosjekter',
      'Om det er satt av tid og penger til uforutsette forhold, spesielt ved rehabilitering',
      'Ansvarsforsikring og garanti',
    ],
    sesong: 'Vår og høst er travleste periode, og ventetiden kan være flere uker. Ta kontakt i god tid og spør flere bedrifter om ledig kapasitet.',
    faq: [
      {
        sp: 'Er tømrer og snekker det samme?',
        sv: 'I dagligtale brukes begge om håndverket å bygge og reparere i tre. Tømrer er den formelle fagbetegnelsen.',
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

  maler: {
    godkjent: true,
    guide: { slug: 'finne-rett-maler', tittel: 'Slik finner du rett maler' },
    hva: 'Malere utfører maling, sparkling og tapetsering, innvendig og utvendig, på alt fra enkeltrom til hele fasader.',
    oppdrag: [
      'Male stue, soverom og andre rom',
      'Male tak og himling',
      'Sparkle og tapetsere',
      'Utvendig maling av hus og kledning',
      'Male vinduer, dører og listverk',
      'Male kjøkkenfronter og skap',
      'Beise terrasse og gjerde',
    ],
    pris: {
      tekst: 'Prisen på malerarbeid avhenger av flatestørrelse, antall strøk, og om jobben er innvendig eller utvendig. Spør alltid om prisen inkluderer materialer eller om det kommer i tillegg.',
    },
    krav: [
      'Det er ikke lovpålagt å ha fagbrev for å male, men malerfaget har eget fagbrev som dokumenterer kompetanse på underlag og produkter.',
      'Medlemskap i en bransjeorganisasjon, som Malermestrenes Landsforbund, er et tilleggstegn.',
    ],
    sjekk: [
      'Hvilken forbehandling (sparkling, sliping, grunning) som inngår i prisen',
      'Om maling og materialer er inkludert',
      'Referanser og bilder fra tilsvarende jobber, spesielt fasader',
      'Garantitid på arbeid og produkt',
      'Skriftlig tilbud med spesifisert pris',
    ],
    faq: [
      {
        sp: 'Må en maler ha fagbrev?',
        sv: 'Nei, det er ikke et lovkrav. Fagbrev i malerfaget er likevel et godt tegn på kompetanse, spesielt på krevende underlag eller fasadearbeid der feil kan bli kostbare å utbedre.',
      },
      {
        sp: 'Hvor mange strøk maling trenger jeg?',
        sv: 'Det avhenger av underlag og fargevalg, normalt 2 strøk på nytt underlag, men mørke farger eller store fargeendringer kan kreve flere. En seriøs maler vurderer dette konkret og oppgir det i tilbudet.',
      },
      {
        sp: 'Hvor lenge bør fasademaling holde?',
        sv: 'Godt utført fasademaling holder normalt 10–15 år avhengig av værutsatthet, produktvalg og forbehandling. Spør malerfirmaet om forventet levetid og garanti for akkurat ditt prosjekt.',
      },
    ],
  },

  byggmester: {
    godkjent: true,
    guide: { slug: 'finne-rett-byggmester', tittel: 'Slik finner du rett byggmester' },
    hva: 'Byggmestere og byggefirmaer tar på seg bygging, tilbygg og rehabilitering, ofte med ansvar for hele byggeprosessen fra tegning og søknad til ferdig resultat.',
    oppdrag: [
      'Tilbygg og påbygg',
      'Totalrenovering av bolig',
      'Rehabilitering av bad og kjøkken',
      'Nybygg av bolig og fritidsbolig',
      'Loftsutbygging og ombygging',
      'Garasje, anneks og større uthus',
      'Fasaderehabilitering',
    ],
    pris: {
      rader: [
        { jobb: 'Tilbygg på 20 m²', pris: 'sekssifret beløp inkl. materialer' },
      ],
      merknad: 'Prisen på et byggeprosjekt avhenger sterkt av størrelse, kompleksitet og om det kreves byggesøknad eller ansvarsrett. Be alltid om et detaljert kostnadsoverslag før du starter.',
    },
    krav: [
      'Byggesøknad og ansvarsrett: foretaket påtar seg formelt ansvar overfor kommunen for at arbeidet utføres i tråd med regelverket.',
      'Sentral godkjenning fra DiBK er frivillig, men viser hvilke områder og tiltaksklasser foretaket er vurdert for. Du kan se det i DiBKs register.',
      'Ved oppføring av bolig gjelder bustadoppføringslova, med reklamasjonsrett på inntil 5 år etter overtakelse.',
    ],
    sjekk: [
      'Sentral godkjenning og hva bedriften er godkjent for',
      'Hvem som søker og tar ansvarsrett',
      'Skriftlig, spesifisert tilbud – minst tre på større prosjekter',
      'Ansvarsforsikring og garantivilkår før kontrakt',
      'Referanser, gjerne et ferdig bygg du kan se',
    ],
    faq: [
      {
        sp: 'Må en byggmester ha sentral godkjenning?',
        sv: 'Nei, sentral godkjenning fra DiBK er en frivillig ordning. Den er likevel et nyttig kvalitetstegn, siden den viser at foretaket har blitt vurdert opp mot krav til kompetanse og kvalitetssikring for en gitt tiltaksklasse.',
      },
      {
        sp: 'Hva er forskjellen på byggmester og entreprenør?',
        sv: 'Byggmester er tradisjonelt en tømrerfaglig bakgrunn med ansvar for hele byggeprosessen, mens entreprenør er en bredere betegnelse som kan dekke alt fra totalentreprenører til underentreprenører på ett enkelt fag. I praksis overlapper rollene mye, så sjekk alltid konkret hva bedriften faktisk tilbyr.',
      },
      {
        sp: 'Hvilken garanti har jeg krav på ved nybygg?',
        sv: 'Ved kjøp av bolig fra profesjonell part gjelder bustadoppføringslova, som gir deg reklamasjonsrett i inntil 5 år etter overtakelse. Be om at garantivilkårene fremgår tydelig av kontrakten før arbeidet starter.',
      },
    ],
  },
};

// Testgruppe: bare bedrifter med partall som siste siffer i org.nr får blokken,
// mens oddetall er kontrollgruppe. Slik kan effekten måles i Search Console med
// samme bransjer og samme tidsrom. GSC-regex (URL slutter på org.nr):
//   testgruppe: /bedrift/.*[02468]$     kontrollgruppe: /bedrift/.*[13579]$
export function erITestgruppe(orgnr) {
  const siste = Number(String(orgnr || '').slice(-1));
  return Number.isInteger(siste) && siste % 2 === 0;
}

// Returnerer blokken hvis den er godkjent og bedriften er i testgruppen, ellers null.
export function hentBransjeBlokk(bransjeSlug, orgnr) {
  const blokk = BRANSJE_BLOKKER[bransjeSlug];
  if (!blokk) return null;
  // Lokal utvikling viser utkast for alle bedrifter, slik at innholdet kan vurderes.
  if (process.env.NODE_ENV === 'development') return blokk;
  if (!blokk.godkjent) return null;
  if (!erITestgruppe(orgnr)) return null;
  return blokk;
}
