// lib/kommuneKontekst.js
// Data-drevet tekst for bransje/sted-sider (/{bransje}/{kommune}): rangering i fylket og landet,
// størrelses- og aldersfordeling, sentral godkjenning og største bedrifter. Hver kommune får
// dermed ulik tekst ut fra egne tall, i stedet for samme pris- og sjekklisteavsnitt overalt.
// Fordelingene beregnes bare når alle bedriftene er med i listen (ikke ved avkortet liste).

function aarFra(dato) {
  const aar = dato ? parseInt(String(dato).substring(0, 4), 10) : NaN;
  return Number.isNaN(aar) ? null : aar;
}

function nummerertListe(ord) {
  if (ord.length <= 1) return ord.join('');
  return `${ord.slice(0, -1).join(', ')} og ${ord[ord.length - 1]}`;
}

// rang: { nasjonal, antallNasjonalt, fylke, antallFylke } (fra getStaticProps)
export function lagKommuneTall({ bedrifter, total, kommune, fylke, flertall, rang, naa = new Date() }) {
  const avsnitt = [];

  if (rang?.nasjonal) {
    avsnitt.push(
      `${kommune} er nr. ${rang.nasjonal} av ${rang.antallNasjonalt} kommuner i landet etter antall ${flertall} i oversikten vår` +
      (fylke && rang.fylke ? `, og nr. ${rang.fylke} av ${rang.antallFylke} i ${fylke}.` : '.')
    );
  }

  const komplett = bedrifter.length > 0 && bedrifter.length === total;

  if (komplett && total >= 3) {
    const ansatte = bedrifter.map(b => (typeof b.antall_ansatte === 'number' ? b.antall_ansatte : 0));
    const små = ansatte.filter(n => n >= 1 && n <= 4).length;
    const mellom = ansatte.filter(n => n >= 5 && n <= 19).length;
    const store = ansatte.filter(n => n >= 20).length;
    const ukjent = ansatte.filter(n => n === 0).length;
    const deler = [
      små && `${små} har 1–4 ansatte`,
      mellom && `${mellom} har 5–19 ansatte`,
      store && `${store} har 20 eller flere ansatte`,
    ].filter(Boolean);
    if (deler.length > 0) {
      avsnitt.push(`Etter størrelse: ${nummerertListe(deler)}.${ukjent ? ` For ${ukjent} er antall ansatte ikke oppgitt.` : ''}`);
    }

    const aar = naa.getFullYear();
    const stiftet = bedrifter.map(b => aarFra(b.stiftelsesdato)).filter(Boolean);
    const nye = stiftet.filter(a => a >= aar - 4).length;
    const gamle = stiftet.filter(a => a <= aar - 20).length;
    const aldersdeler = [
      nye && `${nye} er stiftet de siste fem årene`,
      gamle && `${gamle} har over 20 års historie`,
    ].filter(Boolean);
    if (aldersdeler.length > 0) avsnitt.push(`${aldersdeler.join(', mens ').replace(/^./, c => c.toUpperCase())}.`);

    const medGodkjenning = bedrifter.filter(b => b.sentral_godkjenning === true).length;
    avsnitt.push(
      medGodkjenning > 0
        ? `${medGodkjenning} av ${total} har sentral godkjenning hos DiBK, en frivillig ordning som viser hva foretaket er vurdert for.`
        : `Ingen av de ${total} har registrert sentral godkjenning hos DiBK, som er en frivillig ordning.`
    );
  }

  const storste = [...bedrifter]
    .filter(b => typeof b.antall_ansatte === 'number' && b.antall_ansatte > 0)
    .sort((a, b) => b.antall_ansatte - a.antall_ansatte || a.navn.localeCompare(b.navn, 'no'))
    .slice(0, 3)
    .map(b => ({ navn: b.navn, slug: b.slug, ansatte: b.antall_ansatte }));

  return { avsnitt, storste: storste.length >= 2 ? storste : [] };
}
