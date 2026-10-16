// lib/bransjeBlokker.js
// Innholdsblokk per bransje, vist på alle bedriftssider i bransjen (se
// components/BransjeBlokk.jsx). UTKAST: ingenting vises før `godkjent: true`.
//
// Regler for innholdet:
// - Bygger på det som allerede står i guidene (lib/artikler.js) og lib/bransjeInnsikt.js,
//   slik at tall og krav ikke motsier hverandre.
// - Pris-rader med kilde 'estimat' er ikke hentet fra en guide og MÅ verifiseres
//   før godkjenning. Alle priser vises som veiledende, inkl. mva.
// - Krav og godkjenninger beskriver ordninger (DSB, DiBK, fagbrev, bransjenorm) uten
//   å love noe om enkeltbedrifter.
//
// Test: blokken vises bare for bedrifter i testgruppen (se skalViseBransjeBlokk).

export const BLOKK_OPPDATERT = 'oktober 2026';

export const BRANSJE_BLOKKER = {
  elektriker: {
    godkjent: false,
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
        { jobb: 'Timepris', pris: '600–1 200 kr', kilde: 'guide' },
        { jobb: 'Nytt sikringsskap', pris: '8 000–20 000 kr', kilde: 'guide' },
        { jobb: 'Installasjon av ladeboks (uten selve laderen)', pris: '8 000–20 000 kr', kilde: 'estimat' },
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
    sesong: 'Mange bestiller elektriker på høsten og vinteren (lys, varme og lading) og før sommerferien. Planlagte jobber lar seg ofte ordne raskere utenom disse periodene.',
    sesongKilde: 'estimat',
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
        sp: 'Hva koster det å installere ladeboks til elbil?',
        sv: 'Installasjonen koster ofte mellom 8 000 og 20 000 kroner inkl. mva, i tillegg til selve laderen. Prisen avhenger av avstanden til sikringsskapet og om skapet må utvides. Be om fastpris.',
      },
    ],
  },

  rorlegger: {
    godkjent: false,
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
      rader: [
        { jobb: 'Timepris', pris: '800–1 500 kr', kilde: 'estimat' },
        { jobb: 'Bytte varmtvannsbereder (inkl. bereder)', pris: '10 000–25 000 kr', kilde: 'estimat' },
        { jobb: 'Baderomsrenovering', pris: '100 000–250 000 kr', kilde: 'estimat' },
      ],
      merknad: 'Akutte utrykninger på kveld og helg koster normalt mer enn planlagte oppdrag. Større jobber prises ofte som fastpris.',
    },
    krav: [
      'Ved våtromsarbeid bør foretaket følge bransjenormen for våtrom (Byggebransjens våtromsnorm) og dokumentere utført arbeid. Normen er frivillig, men legges ofte til grunn ved forsikringsoppgjør.',
      'Tiltak som krever byggesøknad forutsetter foretak med ansvarsrett. Sentral godkjenning fra DiBK, for eksempel for sanitærinstallasjoner, forenkler dette.',
      'Rørleggerfaget har eget fagbrev.',
    ],
    sjekk: [
      'Godkjenning eller dokumentert kompetanse for våtromsarbeid',
      'Skriftlig, spesifisert tilbud – minst tre på større jobber',
      'Ansvarsforsikring og garanti på utført arbeid',
      'Referanser, spesielt for baderom',
      'Unngå full forskuddsbetaling før arbeidet er påbegynt',
    ],
    sesong: 'Lekkasjer kommer når de kommer, men planlagt baderomsrenovering har ofte flere ukers ventetid. Bestill gjerne 1–3 måneder i forveien.',
    sesongKilde: 'estimat',
    faq: [
      {
        sp: 'Er rørlegger og VVS-installatør det samme?',
        sv: 'I praksis brukes begge om de samme bedriftene. VVS står for varme, ventilasjon og sanitær, og de fleste rørleggerfirmaer jobber med sanitær og varme.',
      },
      {
        sp: 'Hva koster akutt rørleggerhjelp?',
        sv: 'Utrykninger på kveld, natt og helg koster normalt mer enn arbeid i vanlig arbeidstid, ofte som tillegg på timeprisen. Spør om pris og oppmøtegebyr på telefon før du bestiller.',
      },
      {
        sp: 'Hvordan vet jeg at våtromsarbeidet er gjort riktig?',
        sv: 'Be om dokumentasjon på utført arbeid, og at tetting og membran fotograferes før flisene legges. Mangler du dokumentasjon, kan det bli vanskelig å få erstatning ved en senere fuktskade.',
      },
    ],
  },

  tomrer: {
    godkjent: false,
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
        { jobb: 'Timepris', pris: '600–1 200 kr', kilde: 'guide' },
        { jobb: 'Tilbygg på ca. 20 m²', pris: 'sekssifret beløp inkl. materialer', kilde: 'guide' },
        { jobb: 'Terrasse', pris: 'fra ca. 1 500 kr per m² inkl. materialer', kilde: 'estimat' },
      ],
      merknad: 'Større prosjekter prises ofte som fastpris eller detaljert kostnadsoverslag basert på tegninger.',
    },
    krav: [
      'Tiltak som krever byggesøknad, som tilbygg og påbygg, forutsetter foretak med ansvarsrett.',
      'Sentral godkjenning fra DiBK er frivillig, men viser hva foretaket er vurdert for og forenkler søknad om ansvarsrett.',
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
    sesongKilde: 'guide',
    faq: [
      {
        sp: 'Er tømrer og snekker det samme?',
        sv: 'I dagligtale brukes begge om håndverket å bygge og reparere i tre. Tømrer er den formelle fagbetegnelsen, mens snekker ofte brukes om innvendig arbeid som innredning og kjøkken.',
      },
      {
        sp: 'Hva er ansvarsrett?',
        sv: 'Ansvarsrett er foretakets formelle ansvar overfor kommunen for at arbeidet i en byggesak utføres i tråd med regelverket. Byggesøknad for tilbygg forutsetter foretak med ansvarsrett.',
      },
      {
        sp: 'Når bør jeg bestille tømrer?',
        sv: 'Ta kontakt tidlig, gjerne 2–3 måneder i forveien for større prosjekter. Vår og høst er travlest, så utenom disse periodene er det ofte lettere å få tid.',
      },
    ],
  },

  maler: {
    godkjent: false,
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
      rader: [
        { jobb: 'Timepris', pris: '500–900 kr', kilde: 'estimat' },
        { jobb: 'Male en stue (ca. 30 m² veggflate, inkl. maling)', pris: '6 000–15 000 kr', kilde: 'estimat' },
        { jobb: 'Utvendig maling av enebolig', pris: '60 000–150 000 kr', kilde: 'estimat' },
      ],
      merknad: 'Prisen avhenger av flatens størrelse, underlagets tilstand, antall strøk og om maling og materialer er inkludert.',
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
    sesong: 'Utvendig maling gjøres på sommerhalvåret og er da travlest, så bestill tidlig. Innvendig maling kan gjøres hele året.',
    sesongKilde: 'estimat',
    faq: [
      {
        sp: 'Hva er inkludert i en malerpris?',
        sv: 'Det varierer, så be om at tilbudet spesifiserer det. Vanligvis inngår tildekking, forbehandling, maling og rydding, men maling og materialer kan også komme i tillegg.',
      },
      {
        sp: 'Når på året kan jeg male utvendig?',
        sv: 'Utvendig maling krever tørt vær og temperaturer over det produsenten oppgir, ofte rundt 5 grader. Derfor gjøres det mest på sommerhalvåret.',
      },
      {
        sp: 'Kan jeg male innvendig om vinteren?',
        sv: 'Ja, innvendig malerarbeid kan gjøres hele året, og mange malerfirmaer har mer ledig kapasitet utenom sommeren.',
      },
    ],
  },

  byggmester: {
    godkjent: false,
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
        { jobb: 'Tilbygg på ca. 20 m²', pris: 'sekssifret beløp inkl. materialer', kilde: 'guide' },
        { jobb: 'Rehabilitering av bad (totalentreprise)', pris: '100 000–250 000 kr', kilde: 'estimat' },
      ],
      merknad: 'Byggeprosjekter prises vanligvis som fastpris eller kostnadsoverslag etter tegninger. Be alltid om et detaljert, spesifisert tilbud.',
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
    sesong: 'Utendørs byggearbeid er mest effektivt på sommerhalvåret. Planlegg og hent tilbud 3–6 måneder i forveien, siden byggesøknad også tar tid.',
    sesongKilde: 'estimat',
    faq: [
      {
        sp: 'Hva er forskjellen på totalentreprise og delt entreprise?',
        sv: 'Ved totalentreprise har én aktør ansvaret for hele prosjektet. Ved delt entreprise kontrakterer du flere fag hver for seg og har selv samordningsansvaret.',
      },
      {
        sp: 'Hvor lang tid tar en byggesøknad?',
        sv: 'Saksbehandlingstiden varierer mellom kommuner og saker. Avklar med byggmesteren hvem som søker og hvor lang tid som er satt av, og søk i god tid før planlagt oppstart.',
      },
      {
        sp: 'Hva bør stå i en byggekontrakt?',
        sv: 'Pris eller prismodell, start og ferdigstillelse, betalingsplan, hvem som søker byggetillatelse og hvilke garantier som gjelder. Skriftlig kontrakt gjør det mye enklere å dokumentere hva som ble avtalt.',
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
