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
  {
    slug: 'priser-og-betaling-rettigheter',
    tittel: 'Priser og betaling: dette har du krav på',
    ingress: 'De tre lovlige prismodellene, hva en avtale bør inneholde, og hvordan du betaler trygt for håndverkertjenester.',
    bransje: 'Generelt',
    bransjeSlug: null,
    publisert: '2026-09-12',
    oppdatert: '2026-09-12',
    seksjoner: [
      {
        heading: 'De tre prismodellene',
        avsnitt: [
          'Håndverkertjenesteloven opererer med tre måter å prise et oppdrag på. Avtal alltid hvilken av dem som gjelder før arbeidet starter — det er den vanligste kilden til konflikt i etterkant.',
        ],
        liste: [
          'Fastpris — en avtalt, fast sluttsum som ikke kan økes i etterkant, uansett hvor lang tid jobben faktisk tar',
          'Prisoverslag — et anslag gitt før oppstart. Sluttregningen kan ikke overstige overslaget med mer enn 15 %, med mindre du uttrykkelig har godtatt en høyere pris underveis',
          'Regningsarbeid — hvis dere ikke har avtalt pris på forhånd, betaler du for faktisk medgått tid og materialer til vanlig markedspris',
        ],
      },
      {
        heading: 'Skriftlig avtale',
        avsnitt: [
          'En skriftlig avtale er den beste beskyttelsen din dersom noe går galt underveis. Muntlige avtaler er også bindende, men mye vanskeligere å dokumentere i ettertid.',
        ],
        liste: [
          'Pris eller prismodell',
          'Start- og ferdigstillelsesdato',
          'Betalingsplan',
          'Ansvarsfordeling — f.eks. hvem som søker eventuell byggetillatelse',
          'Hva som skjer ved forsinkelser',
        ],
      },
      {
        heading: 'Betaling — slik gjør du det trygt',
        avsnitt: [
          'Betal aldri kontant for håndverkertjenester. Bruk bankoverføring eller kort, både for din egen dokumentasjon og fordi kontantbetaling over 10 000 kroner kan gjøre deg medansvarlig dersom håndverkeren ikke oppgir beløpet til skatt.',
          'På større prosjekter er delbetaling knyttet til fremdrift tryggere enn å betale alt på forskudd. Betal aldri mer enn det som faktisk er utført på det tidspunktet.',
        ],
      },
      {
        heading: 'Dokumentasjon underveis',
        avsnitt: [
          'Ta bilder og gjerne video før, underveis og etter arbeidet — spesielt av ting som blir skjult senere, som rørføringer i vegg eller elektriske installasjoner. Dette er uvurderlig dersom det oppstår uenighet i etterkant.',
          'Dukker det opp behov for arbeid utover det dere opprinnelig avtalte, skal dette avtales skriftlig og prises særskilt før håndverkeren går videre — ikke godta at ekstraarbeid bare dukker opp på sluttregningen uten at dere har blitt enige om det først.',
        ],
      },
      {
        heading: 'Kilde og videre lesning',
        avsnitt: [
          'Denne guiden bygger på Forbrukerrådets sjekkliste for bruk av håndverker. Der finner du en enda mer detaljert gjennomgang, inkludert maler for jobbeskrivelse og kontrakt.',
        ],
        lenke: { tekst: 'Se Forbrukerrådets sjekkliste for bruk av håndverker', url: 'https://www.forbrukerradet.no/forside/bolig/bruk-av-handverker/sjekkliste-handverker/' },
      },
    ],
    faq: [
      {
        sp: 'Kan håndverkeren kreve mer enn prisoverslaget?',
        sv: 'Ja, men bare inntil 15 % mer enn det opprinnelige overslaget, med mindre du uttrykkelig har godtatt en høyere pris underveis. Dette følger av håndverkertjenesteloven.',
      },
      {
        sp: 'Er det greit å betale kontant?',
        sv: 'Nei, unngå kontant betaling for håndverkertjenester. Bruk bankoverføring eller kort — det gir deg dokumentasjon, og kontantbeløp over 10 000 kroner kan gjøre deg medansvarlig hvis håndverkeren ikke oppgir inntekten til skatt.',
      },
      {
        sp: 'Må jeg ha en skriftlig kontrakt?',
        sv: 'Det er ikke et lovkrav for alle jobber, men sterkt anbefalt. En skriftlig avtale gjør det mye enklere å dokumentere hva som faktisk ble avtalt dersom det oppstår uenighet senere.',
      },
      {
        sp: 'Hva gjør jeg hvis håndverkeren finner ekstraarbeid underveis?',
        sv: 'Krev at ekstraarbeidet avtales skriftlig og prises særskilt før håndverkeren fortsetter. Du skal ikke bli overrasket av ekstrakostnader på sluttregningen som dere ikke har blitt enige om underveis.',
      },
    ],
  },
  {
    slug: 'montere-varmepumpe',
    tittel: 'Montere varmepumpe: dette må du vite',
    ingress: 'Type varmepumpe, riktig størrelse, Enova-støtte og hva du bør sjekke hos montøren før du bestiller.',
    bransje: 'Varmepumpemontør',
    bransjeSlug: 'varmepumpe',
    publisert: '2026-09-12',
    oppdatert: '2026-09-12',
    seksjoner: [
      {
        heading: 'Hvilken type varmepumpe passer for deg?',
        avsnitt: ['De tre vanligste typene dekker ganske ulike behov:'],
        liste: [
          'Luft-luft — rimeligst og vanligst. Varmer opp ett eller noen få rom effektivt, men dekker sjelden hele boligens behov alene og gir ikke varmtvann',
          'Luft-vann — kobles til vannbårne radiatorer eller gulvvarme, og kan også levere varmtvann. Dyrere i innkjøp, men bedre egnet som hovedoppvarming for hele boligen',
          'Berg-/jordvarme — høyest investeringskostnad, men mest effektiv over tid. Krever boring av energibrønn eller nedgraving av kollektorslange, mest aktuelt for større boliger med høyt oppvarmingsbehov',
        ],
      },
      {
        heading: 'Riktig størrelse er avgjørende',
        avsnitt: [
          'En luft-luft varmepumpe dimensjoneres normalt ikke for å dekke hele effektbehovet på de aller kaldeste dagene i året — det ville gjort den unødvendig stor og dyr resten av tiden. Vanlig praksis er å dimensjonere for om lag 50–70 % av effektbehovet, som likevel dekker mesteparten av det samlede energibehovet gjennom året, siden de virkelig kalde dagene er relativt få.',
          'Be montøren gjøre en reell beregning basert på boligens størrelse, isolasjon og klimasone — ikke bare velge en standardstørrelse. En underdimensjonert pumpe sliter i kulda, en overdimensjonert er unødvendig dyr og kan gi dårligere komfort ved lav last.',
        ],
      },
      {
        heading: 'Enova-støtte',
        avsnitt: [
          'Enova gir i mange tilfeller støtte til bytte av oppvarmingsløsning, særlig ved overgang fra direkte elektrisk oppvarming til vannbåren varme eller varmepumpe. Støttesatsene og vilkårene endres jevnlig, så sjekk gjeldende ordninger før du bestiller — i noen tilfeller må søknaden sendes før arbeidet starter, ikke etterpå.',
          'Ta uansett vare på kvittering og dokumentasjon fra montøren — det trengs normalt for å søke støtte i etterkant.',
        ],
        lenke: { tekst: 'Se gjeldende støtteordninger på enova.no', url: 'https://www.enova.no/' },
      },
      {
        heading: 'Sjekk sertifiseringen til montøren',
        avsnitt: [
          'Arbeid med kjølemedium i varmepumper er regulert av F-gassforordningen. Montører som håndterer visse mengder kjølemedium skal ha egen sertifisering for dette, ofte omtalt som kuldemontør-sertifisering. Spør om dokumentasjon på dette før du bestiller, spesielt ved luft-vann- og berg-/jordvarmeanlegg.',
          'Dette kommer i tillegg til vanlig fagkompetanse og eventuell tilknytning til et registrert elektroforetak dersom arbeidet involverer elektrisk installasjon.',
        ],
      },
      {
        heading: 'Plassering av utedelen',
        avsnitt: [
          'Utedelen bør stå på et stabilt, opphøyd fundament — unngå at den graves ned i snø om vinteren. Sjekk avstand til nabogrense og eventuelle støygrenser i kommunen, og at den ikke plasseres rett under et tak uten snøfanger der snø eller is kan falle ned på den.',
          'Vurder også støy mot egne og naboers soverom. Selv moderne varmepumper lager noe lyd, og rett utenfor et soveromsvindu er sjelden en god plassering.',
        ],
      },
      {
        heading: 'Garanti — les det som gjelder kompressoren spesielt',
        avsnitt: [
          'Mange produsenter opererer med lengre garanti på selve kompressoren (ofte 5 år) enn på resten av anlegget (gjerne 2–3 år). Spør spesifikt om dette før kjøp.',
          'Feil installasjon kan i noen tilfeller gjøre garantien ugyldig — bruk en montør som er godkjent av eller kjent med kravene til akkurat det merket du velger.',
        ],
      },
    ],
    faq: [
      {
        sp: 'Hvor stor varmepumpe trenger jeg?',
        sv: 'Det avhenger av boligens størrelse, isolasjon og klimasone — be montøren gjøre en konkret beregning i stedet for å velge en standardstørrelse. En luft-luft varmepumpe dekker normalt ikke hele effektbehovet på de kaldeste dagene, men det er vanligvis heller ikke poenget.',
      },
      {
        sp: 'Får jeg støtte fra Enova til å montere varmepumpe?',
        sv: 'I mange tilfeller ja, spesielt ved overgang fra direkte elektrisk oppvarming. Støttesatsene endres jevnlig — sjekk gjeldende ordninger på enova.no før du bestiller, siden søknaden i noen tilfeller må sendes før arbeidet starter.',
      },
      {
        sp: 'Trenger montøren spesiell sertifisering?',
        sv: 'Ja. Arbeid med kjølemedium i varmepumper er regulert av F-gassforordningen, og montører som håndterer dette skal ha egen sertifisering. Spør om dokumentasjon før du bestiller.',
      },
      {
        sp: 'Hvor bør utedelen plasseres?',
        sv: 'På et stabilt, opphøyd fundament, med god avstand fra soverom av hensyn til støy, og ikke rett under et tak uten snøfanger. Sjekk også eventuelle støygrenser i kommunen din.',
      },
    ],
  },
  {
    slug: 'finne-rett-byggmester',
    tittel: 'Slik finner du rett byggmester',
    ingress: 'Sentral godkjenning, ansvarsrett og tiltaksklasse — dette bør du sjekke før du velger byggmester til nybygg, tilbygg eller renovering.',
    bransje: 'Byggmester',
    bransjeSlug: 'byggmester',
    publisert: '2026-09-16',
    oppdatert: '2026-09-16',
    seksjoner: [
      {
        heading: 'Sjekk sentral godkjenning og ansvarsrett',
        avsnitt: [
          'En byggmester påtar seg ofte ansvarsrett i byggesaken — det vil si formelt ansvar overfor kommunen for at arbeidet utføres i tråd med regelverket. Sentral godkjenning fra Direktoratet for byggkvalitet (DiBK) er en frivillig ordning som viser at foretaket har den kompetansen og de kvalitetssikringsrutinene som kreves for riktig tiltaksklasse (vanskelighetsgrad) og fagområde.',
          'Det er ikke et krav om sentral godkjenning for å erklære ansvarsrett, men det er et nyttig kvalitetstegn — du kan søke opp bedriften i DiBK sitt register for å se hva den faktisk er godkjent for.',
        ],
      },
      {
        heading: 'Innhent flere tilbud',
        avsnitt: [
          'Innhent minst tre tilbud før du bestemmer deg, spesielt på større prosjekter som nybygg eller tilbygg. Be om at tilbudene er spesifisert på samme måte, slik at du kan sammenligne arbeid, materialer og forbehold direkte mot hverandre.',
        ],
      },
      {
        heading: 'Spør om referanser',
        avsnitt: [
          'Be om referanser fra tilsvarende prosjekter, og spør gjerne om å få se et ferdig bygg. Stiftelsesår og antall ansatte finner du på bedriftens profilside her på HåndverkerPortalen — begge deler sier noe om erfaring og kapasitet.',
        ],
      },
      {
        heading: 'Forsikring og garantier — spesielt viktig ved nybygg',
        avsnitt: [
          'Sjekk at bedriften har ansvarsforsikring, og avklar hvilke garantier som gjelder på utført arbeid. Ved oppføring av bolig gjelder bustadoppføringslova, som gir deg en reklamasjonsrett på inntil 5 år etter overtakelse dersom det oppdages mangler — spør spesifikt om garantivilkårene før kontraktsinngåelse.',
        ],
      },
      {
        heading: 'Varselsignaler å se etter',
        avsnitt: ['Vær ekstra oppmerksom hvis du opplever noe av følgende:'],
        liste: [
          'Bedriften krever full forskuddsbetaling før arbeidet er påbegynt',
          'Du får ikke skriftlig kontrakt eller tilbud',
          'Prisen er vesentlig lavere enn alle andre tilbud, uten god forklaring',
          'Bedriften er ikke registrert eller står oppført som ikke aktiv',
        ],
      },
    ],
    faq: [
      {
        sp: 'Må en byggmester ha sentral godkjenning?',
        sv: 'Nei, sentral godkjenning fra DiBK er en frivillig ordning. Den er likevel et nyttig kvalitetstegn, siden den viser at foretaket har blitt vurdert opp mot krav til kompetanse og kvalitetssikring for en gitt tiltaksklasse.',
      },
      {
        sp: 'Hva er forskjellen på byggmester og entreprenør?',
        sv: 'Byggmester er tradisjonelt en tømrerfaglig bakgrunn med ansvar for hele byggeprosessen, mens "entreprenør" er en bredere betegnelse som kan dekke alt fra totalentreprenører til underentreprenører på ett enkelt fag. I praksis overlapper rollene mye, så sjekk alltid konkret hva bedriften faktisk tilbyr.',
      },
      {
        sp: 'Hvilken garanti har jeg krav på ved nybygg?',
        sv: 'Ved kjøp av bolig fra profesjonell part gjelder bustadoppføringslova, som gir deg reklamasjonsrett i inntil 5 år etter overtakelse. Vær samtidig oppmerksom på at kravet kan foreldes etter 3 år selv innenfor reklamasjonsfristen dersom det ikke følges opp. Be om at garantivilkårene fremgår tydelig av kontrakten før arbeidet starter.',
      },
    ],
  },
  {
    slug: 'finne-rett-maler',
    tittel: 'Slik finner du rett maler',
    ingress: 'Fagbrev, referanser og hva du bør avklare før du bestiller — slik unngår du dårlig malerarbeid og overraskelser på sluttregningen.',
    bransje: 'Maler',
    bransjeSlug: 'maler',
    publisert: '2026-09-16',
    oppdatert: '2026-09-16',
    seksjoner: [
      {
        heading: 'Sjekk fagbrev og medlemskap i bransjeorganisasjon',
        avsnitt: [
          'Det er ikke lovpålagt å ha fagbrev for å utføre malerarbeid, men fagutdannede malere har gjennomført svenneprøve i malerfaget og har dokumentert kompetanse på underlag, produktvalg og påføringsteknikk — avgjørende for et resultat som varer.',
          'Medlemskap i en bransjeorganisasjon som Malermestrenes Landsforbund (MLF) er et godt tilleggstegn, siden medlemsbedrifter forplikter seg til bransjestandarder og etiske retningslinjer.',
        ],
      },
      {
        heading: 'Innhent flere tilbud',
        avsnitt: [
          'Prisen på malerarbeid varierer med underlagets tilstand, antall strøk og produktvalg. Innhent minst tre tilbud, og be om at det fremgår tydelig hvilken forbehandling (sparkling, sliping, grunning) som inngår.',
        ],
      },
      {
        heading: 'Spør om referanser',
        avsnitt: [
          'Be om å se bilder eller referanser fra tilsvarende jobber, spesielt ved fasademaling eller andre værutsatte oppdrag der holdbarhet er avgjørende. Stiftelsesår og antall ansatte finner du på bedriftens profilside her på HåndverkerPortalen.',
        ],
      },
      {
        heading: 'Forsikring og garantier',
        avsnitt: [
          'Spør om bedriften har ansvarsforsikring, og hva slags garanti som gjelder dersom malingen flasser eller slår sprekker før forventet levetid. Seriøse malerfirmaer oppgir normalt garantitid på både arbeid og produkt.',
        ],
      },
      {
        heading: 'Varselsignaler å se etter',
        avsnitt: ['Vær ekstra oppmerksom hvis du opplever noe av følgende:'],
        liste: [
          'Bedriften krever full forskuddsbetaling før arbeidet er påbegynt',
          'Du får ikke skriftlig tilbud med spesifisert pris',
          'Prisen er vesentlig lavere enn alle andre tilbud, uten god forklaring',
          'Bedriften er ikke registrert eller står oppført som ikke aktiv',
        ],
      },
    ],
    faq: [
      {
        sp: 'Må en maler ha fagbrev?',
        sv: 'Nei, det er ikke et lovkrav. Fagbrev i malerfaget er likevel et godt tegn på kompetanse, spesielt på krevende underlag eller fasadearbeid der feil kan bli kostbare å utbedre.',
      },
      {
        sp: 'Hvor mange strøk maling trenger jeg?',
        sv: 'Det avhenger av underlag og fargevalg — normalt 2 strøk på nytt underlag, men mørke farger eller store fargeendringer kan kreve flere. En seriøs maler vurderer dette konkret og oppgir det i tilbudet.',
      },
      {
        sp: 'Hvor lenge bør fasademaling holde?',
        sv: 'Godt utført fasademaling holder normalt 10–15 år avhengig av værutsatthet, produktvalg og forbehandling. Spør malerfirmaet om forventet levetid og garanti for akkurat ditt prosjekt.',
      },
    ],
  },
  {
    slug: 'finne-rett-taklegger',
    tittel: 'Slik finner du rett taklegger',
    ingress: 'Fagbrev, fallsikring og hva som skiller et solid takarbeid fra et som lekker etter noen år.',
    bransje: 'Taklegger',
    bransjeSlug: 'taklegger',
    publisert: '2026-09-16',
    oppdatert: '2026-09-16',
    seksjoner: [
      {
        heading: 'Sjekk fagbrev i taktekkerfaget',
        avsnitt: [
          'Taktekker er et eget fagbrev, normalt oppnådd etter to til tre år som lærling i tillegg til videregående opplæring. Fagbrev er ikke et lovkrav, men takarbeid som utføres feil kan gi fuktskader som er svært kostbare å utbedre — kompetanse er derfor spesielt viktig på akkurat dette faget.',
          'Sjekk også at bedriften er registrert og aktiv i Brønnøysundregistrene, og spør gjerne hvor lenge de har drevet med taktekking spesifikt.',
        ],
      },
      {
        heading: 'Innhent flere tilbud',
        avsnitt: [
          'Be om minst tre tilbud, spesifisert med hvilket taktekkingsmateriale som er inkludert, omfang av undertak/beslag, og om gammel taktekking fjernes og leveres som avfall eller om det legges oppå eksisterende tak.',
        ],
      },
      {
        heading: 'Spør om referanser',
        avsnitt: [
          'Be om referanser fra tilsvarende tak, gjerne noen år tilbake i tid, slik at du kan høre hvordan arbeidet har holdt seg over tid — ikke bare rett etter ferdigstillelse.',
        ],
      },
      {
        heading: 'Sikkerhet og forsikring',
        avsnitt: [
          'Takarbeid er høyderisikoarbeid. Etter forskrift om utførelse av arbeid skal fallsikring benyttes der det er fare for fall på 2 meter eller mer, og kollektiv sikring (rekkverk, stillas, sikkerhetsnett) skal alltid prioriteres foran personlig fallsikringsutstyr der det er mulig. Spør om bedriften har ansvarsforsikring som dekker eventuelle skader på bygningen under arbeidet, i tillegg til garanti på selve taktekkingen.',
        ],
      },
      {
        heading: 'Varselsignaler å se etter',
        avsnitt: ['Vær ekstra oppmerksom hvis du opplever noe av følgende:'],
        liste: [
          'Bedriften krever full forskuddsbetaling før arbeidet er påbegynt',
          'Ingen bruk av synlig fallsikringsutstyr ved arbeid i høyden',
          'Du får ikke skriftlig tilbud eller garanti på arbeidet',
          'Bedriften er ikke registrert eller står oppført som ikke aktiv',
        ],
      },
    ],
    faq: [
      {
        sp: 'Hvor lenge bør et nytt tak holde?',
        sv: 'Det varierer mye med materialvalg — takstein kan vare 40–60 år, mens takbelegg (membran) typisk holder 20–30 år ved riktig utført arbeid og vedlikehold. Spør taktekkeren om forventet levetid for det materialet dere velger.',
      },
      {
        sp: 'Trenger jeg byggesøknad for å legge om taket?',
        sv: 'Vanlig omlegging av eksisterende tak er normalt unntatt søknadsplikt, men endringer i takform, takvinkel eller tilbygg av takopplett kan kreve søknad til kommunen. Sjekk med taktekkeren eller kommunen ved tvil.',
      },
      {
        sp: 'Hva bør garantien på takarbeid dekke?',
        sv: 'Be om skriftlig garanti som dekker både utført arbeid og eventuelle lekkasjer som oppstår som følge av feil montering, ikke bare materialgaranti fra produsenten.',
      },
    ],
  },
  {
    slug: 'finne-rett-gulvlegger',
    tittel: 'Slik finner du rett gulvlegger',
    ingress: 'Fagbrev, underlag og fuktsperre — dette bør du sjekke før du bestiller nytt gulv.',
    bransje: 'Gulvlegger',
    bransjeSlug: 'gulvlegger',
    publisert: '2026-09-16',
    oppdatert: '2026-09-16',
    seksjoner: [
      {
        heading: 'Sjekk fagbrev og erfaring med ditt gulvtype',
        avsnitt: [
          'Gulvlegger er et eget fagbrev, men bransjen spenner over svært ulike gulvtyper — parkett, laminat, fliser, belegg og støpte gulv krever til dels ulik kompetanse. Spør konkret om bedriften har erfaring med akkurat den gulvtypen du skal legge.',
          'Forum for Gulvbransjen driver blant annet nettstedet gulvfakta.no med nøytral fagkunnskap om gulv, som kan være nyttig å sjekke før du bestiller.',
        ],
      },
      {
        heading: 'Innhent flere tilbud',
        avsnitt: [
          'Be om minst tre tilbud, og sjekk at det fremgår om prisen inkluderer nødvendig forarbeid som avretting av undergulv, fuktmåling og eventuell fjerning av gammelt gulv.',
        ],
      },
      {
        heading: 'Spør om referanser',
        avsnitt: [
          'Be om referanser fra tilsvarende jobber, og spør gjerne hvordan gulvet har holdt seg over tid — spesielt ved fuktutsatte rom som bad og kjøkken der feil montering kan gi alvorlige følgeskader.',
        ],
      },
      {
        heading: 'Forsikring og garantier',
        avsnitt: [
          'Spør om bedriften har ansvarsforsikring, og hvilken garanti som gjelder dersom gulvet får sprekker, buler eller løsner. Ved fuktutsatte rom bør det også avklares hvem som har ansvaret dersom fukt likevel trenger gjennom.',
        ],
      },
      {
        heading: 'Varselsignaler å se etter',
        avsnitt: ['Vær ekstra oppmerksom hvis du opplever noe av følgende:'],
        liste: [
          'Bedriften vil ikke fuktmåle undergulvet før legging på bad eller kjøkken',
          'Du får ikke skriftlig tilbud med spesifisert pris',
          'Prisen er vesentlig lavere enn alle andre tilbud, uten god forklaring',
          'Bedriften er ikke registrert eller står oppført som ikke aktiv',
        ],
      },
    ],
    faq: [
      {
        sp: 'Må gulvlegger fuktmåle før legging på bad?',
        sv: 'Det bør alltid gjøres på våtrom og andre fuktutsatte områder, siden legging på et undergulv med for høy fuktighet kan gi buling, muggvekst eller løsning av gulvet i etterkant. En seriøs gulvlegger fuktmåler som en fast del av forarbeidet.',
      },
      {
        sp: 'Hva koster det å legge nytt gulv?',
        sv: 'Prisen varierer mye med gulvtype, størrelse på rommet og omfanget av forarbeid som avretting. Innhent tilbud fra flere bedrifter for et realistisk prisbilde til akkurat ditt prosjekt.',
      },
      {
        sp: 'Hvor lang garanti bør jeg få på nytt gulv?',
        sv: 'Be om skriftlig garanti på selve leggingen i tillegg til produsentens materialgaranti — de dekker ofte ulike ting, og det er leggefeil som oftest gir problemer i praksis.',
      },
    ],
  },
  {
    slug: 'finne-rett-grunnarbeider',
    tittel: 'Slik finner du rett bedrift for grunnarbeid',
    ingress: 'Maskinførerbevis, gravemelding og ansvar for skjulte kabler og rør — dette bør du avklare før gravingen starter.',
    bransje: 'Grunnarbeid',
    bransjeSlug: 'grunnarbeid',
    publisert: '2026-09-16',
    oppdatert: '2026-09-16',
    seksjoner: [
      {
        heading: 'Sjekk maskinførerbevis og erfaring',
        avsnitt: [
          'Alle som fører gravemaskin, hjullaster eller lignende masseforflyttingsmaskiner med motoreffekt over 15 kW (ca. 20,4 hk) skal ha dokumentert maskinførerbevis for riktig maskinklasse (M1–M6). Be gjerne om å se dokumentasjon dersom du er usikker.',
          'Spør også om bedriften har erfaring med akkurat den type oppdrag du trenger — grunnarbeid til nybygg, drenering og VA-arbeid krever til dels ulik kompetanse og utstyr.',
        ],
      },
      {
        heading: 'Innhent flere tilbud',
        avsnitt: [
          'Be om minst tre tilbud, og sjekk at det fremgår om massetransport, bortkjøring av overskuddsmasser og eventuell fjellsprengning er inkludert i prisen eller kommer i tillegg.',
        ],
      },
      {
        heading: 'Avklar ansvar for gravemelding',
        avsnitt: [
          'Før graving skal det alltid sendes en gravemelding til ledningseierne i området, for å kartlegge strøm-, vann-, avløps- og fiberkabler under bakken — også ved graving på egen eiendom. Avklar med bedriften hvem som har ansvaret for å sende denne meldingen før arbeidet starter, siden skader på skjulte ledninger kan bli svært kostbare.',
        ],
        lenke: { tekst: 'Se hvordan gravemelding fungerer hos Geomatikk', url: 'https://geomatikk.no/jeg-skal-grave/gravemelding-og-kabelpavisning/' },
      },
      {
        heading: 'Forsikring og ansvar',
        avsnitt: [
          'Spør om bedriften har ansvarsforsikring som dekker skader på egen eiendom, naboeiendom og infrastruktur under bakken. Ved graving nær bygninger bør det også avklares hvem som har ansvar dersom setningsskader oppstår.',
        ],
      },
      {
        heading: 'Varselsignaler å se etter',
        avsnitt: ['Vær ekstra oppmerksom hvis du opplever noe av følgende:'],
        liste: [
          'Bedriften vil starte graving uten å ha sendt gravemelding',
          'Du får ikke skriftlig tilbud med spesifisert pris',
          'Prisen er vesentlig lavere enn alle andre tilbud, uten god forklaring',
          'Bedriften er ikke registrert eller står oppført som ikke aktiv',
        ],
      },
    ],
    faq: [
      {
        sp: 'Trenger jeg gravemelding selv om jeg graver på egen tomt?',
        sv: 'Ja. Grunnen er ofte full av kabler og rør uavhengig av eiendomsgrenser, og du er selv ansvarlig for å undersøke dette før graving starter — også på egen eiendom.',
      },
      {
        sp: 'Hvem har ansvaret hvis en kabel graves over?',
        sv: 'Den som graver er normalt ansvarlig dersom gravemelding ikke er innhentet eller kabelpåvisning ikke er fulgt. Avklar derfor alltid med grunnarbeideren hvem som sender gravemelding og følger opp kabelpåvisningen før arbeidet starter.',
      },
      {
        sp: 'Trenger jeg byggesøknad for grunnarbeid?',
        sv: 'Det avhenger av tiltaket — enkelt terrenginngrep er ofte unntatt søknadsplikt, mens større inngrep, støttemurer over en viss høyde eller arbeid nær nabogrense kan kreve søknad til kommunen.',
      },
    ],
  },
  {
    slug: 'finne-rett-murer',
    tittel: 'Slik finner du rett murer',
    ingress: 'Fagbrev, fuktsikring og hva du bør avklare før mur- eller pussarbeid settes i gang.',
    bransje: 'Murer',
    bransjeSlug: 'murer',
    publisert: '2026-09-16',
    oppdatert: '2026-09-16',
    seksjoner: [
      {
        heading: 'Sjekk fagbrev i murer- og flisleggerfaget',
        avsnitt: [
          'Fagbrev i murer- og flisleggerfaget er ikke lovpålagt, men gir dokumentert kompetanse på materialvalg, fuktsikring og oppbygning — spesielt viktig ved grunnmur, pipe og fasadearbeid der feil kan gi frostskader eller fuktinntrenging som først vises år senere.',
          'Sjekk at bedriften er registrert og aktiv i Brønnøysundregistrene, og spør om erfaring med akkurat den typen murarbeid du trenger.',
        ],
      },
      {
        heading: 'Innhent flere tilbud',
        avsnitt: [
          'Be om minst tre tilbud, spesifisert med materialvalg og omfang. Murarbeid har ofte store prisforskjeller avhengig av steintype, puss og eventuell isolasjon.',
        ],
      },
      {
        heading: 'Spør om referanser',
        avsnitt: [
          'Be om referanser fra tilsvarende oppdrag, gjerne noen år tilbake i tid, slik at du kan høre om arbeidet har holdt seg gjennom flere sesonger med frost og fukt.',
        ],
      },
      {
        heading: 'Forsikring og garantier',
        avsnitt: [
          'Spør om bedriften har ansvarsforsikring, og hvilken garanti som gjelder dersom det oppstår sprekker eller fuktinntrenging etter arbeidet er utført.',
        ],
      },
      {
        heading: 'Varselsignaler å se etter',
        avsnitt: ['Vær ekstra oppmerksom hvis du opplever noe av følgende:'],
        liste: [
          'Bedriften krever full forskuddsbetaling før arbeidet er påbegynt',
          'Du får ikke skriftlig tilbud med spesifisert pris og materialvalg',
          'Prisen er vesentlig lavere enn alle andre tilbud, uten god forklaring',
          'Bedriften er ikke registrert eller står oppført som ikke aktiv',
        ],
      },
    ],
    faq: [
      {
        sp: 'Må en murer ha fagbrev?',
        sv: 'Nei, det er ikke et lovkrav. Fagbrev i murer- og flisleggerfaget er likevel et godt tegn på kompetanse, spesielt ved grunnmur og pipearbeid der feil kan gi kostbare fukt- og frostskader.',
      },
      {
        sp: 'Når på året bør murarbeid utføres?',
        sv: 'Mur- og pussarbeid utendørs bør normalt unngås i frostperioder, siden frost kan ødelegge herdeprosessen. Snakk med mureren om riktig tidspunkt for ditt prosjekt.',
      },
      {
        sp: 'Hvor lang garanti bør jeg få på murarbeid?',
        sv: 'Be om skriftlig garanti som dekker sprekkdannelse og fuktinntrenging som skyldes utførelsen, ikke bare materialgaranti fra leverandøren av murstein eller puss.',
      },
    ],
  },
  {
    slug: 'finne-rett-ventilasjonsmontor',
    tittel: 'Slik finner du rett ventilasjonsmontør',
    ingress: 'Fagbrev, dimensjonering og dokumentasjon — dette bør du sjekke før du bestiller nytt ventilasjonsanlegg.',
    bransje: 'Ventilasjonsmontør',
    bransjeSlug: 'ventilasjon',
    publisert: '2026-09-16',
    oppdatert: '2026-09-16',
    seksjoner: [
      {
        heading: 'Sjekk fagbrev som ventilasjonstekniker',
        avsnitt: [
          'Ventilasjonstekniker er et relativt nytt eget fagbrev (innført i 2021), som dekker installasjon, justering og feilsøking av ventilasjonsanlegg og tilhørende automatikk. VKE (Foreningen for ventilasjon, kulde og energi) er bransjeorganisasjonen for feltet, og medlemskap kan være et tilleggstegn på seriøsitet.',
          'Sjekk at bedriften er registrert og aktiv i Brønnøysundregistrene, og spør om erfaring med akkurat din boligtype eller byggstørrelse.',
        ],
      },
      {
        heading: 'Innhent flere tilbud',
        avsnitt: [
          'Be om minst tre tilbud, og sjekk at det fremgår om kanaltrekk, ventiler og aggregat er spesifisert hver for seg, ikke bare oppgitt som en samlet sum.',
        ],
      },
      {
        heading: 'Riktig dimensjonering er avgjørende',
        avsnitt: [
          'Et anlegg som er feil dimensjonert gir enten for dårlig luftskifte eller unødvendig høyt strømforbruk og støy. Be montøren gjøre en konkret beregning basert på boligens størrelse og bruk, ikke bare velge et standardaggregat.',
        ],
      },
      {
        heading: 'Dokumentasjon og garantier',
        avsnitt: [
          'Krev FDV-dokumentasjon (forvaltning, drift og vedlikehold) ved ferdigstillelse — den trenger du blant annet for å vite hvor ofte filtre skal byttes. Spør også om bedriften har ansvarsforsikring og hvilken garanti som gjelder på både arbeid og aggregat.',
        ],
      },
      {
        heading: 'Varselsignaler å se etter',
        avsnitt: ['Vær ekstra oppmerksom hvis du opplever noe av følgende:'],
        liste: [
          'Bedriften vil ikke gjøre en konkret dimensjoneringsberegning',
          'Du får ikke FDV-dokumentasjon ved ferdigstillelse',
          'Prisen er vesentlig lavere enn alle andre tilbud, uten god forklaring',
          'Bedriften er ikke registrert eller står oppført som ikke aktiv',
        ],
      },
    ],
    faq: [
      {
        sp: 'Hvor ofte bør ventilasjonsanlegget vedlikeholdes?',
        sv: 'De fleste boligaggregat trenger filterbytte 1–2 ganger i året, avhengig av bruk og luftkvalitet i området. Sjekk FDV-dokumentasjonen fra montøren for anbefalt intervall til ditt anlegg.',
      },
      {
        sp: 'Trenger jeg byggesøknad for å installere ventilasjonsanlegg?',
        sv: 'Vanlig installasjon i eksisterende bolig er normalt unntatt søknadsplikt, men større inngrep i bærende konstruksjoner for kanaltrekk kan kreve avklaring med kommunen. Snakk med montøren ved tvil.',
      },
      {
        sp: 'Hva er forskjellen på ventilasjonstekniker og kuldemontør?',
        sv: 'Ventilasjonstekniker jobber med luftbehandling og kanalanlegg, mens kuldemontør jobber med kjølemedium i kjøle- og varmepumpeanlegg og krever egen sertifisering etter F-gassforordningen. Enkelte bedrifter dekker begge fagfelt.',
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

// Guider knyttet til en bestemt bransje (f.eks. "Hva koster en elektriker?" for elektriker).
export function getArtiklerForBransje(bransjeSlug) {
  return ARTIKLER.filter(a => a.bransjeSlug === bransjeSlug);
}

// Bransjeuavhengige guider (rettigheter, betaling, hva du bør sjekke) - relevante uansett bransje.
export function getGenerelleArtikler() {
  return ARTIKLER.filter(a => a.bransjeSlug === null);
}

export function getLesetid(artikkel) {
  const ord = artikkel.seksjoner.reduce((sum, s) => {
    const avsnittOrd = (s.avsnitt || []).join(' ').split(/\s+/).length;
    const listeOrd = (s.liste || []).join(' ').split(/\s+/).length;
    return sum + avsnittOrd + listeOrd;
  }, 0);
  return Math.max(2, Math.round(ord / 200));
}
