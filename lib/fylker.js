// lib/fylker.js
// Fylkene slik de står i KOMMUNER (gjeldende inndeling fra 1. januar 2024).
// Oslo er både kommune og fylke og har bare én side (/{bransje}/oslo), så det
// lages ingen fylkesside for Oslo.
//
// historikk: forklarer navnene folk fortsatt søker på (Viken, Hordaland osv.)
export const FYLKER = [
  { navn: 'Akershus', slug: 'akershus', historikk: 'Akershus var en del av Viken fylke fra 2020 til 2023, og er igjen eget fylke fra 1. januar 2024.' },
  { navn: 'Buskerud', slug: 'buskerud', historikk: 'Buskerud var en del av Viken fylke fra 2020 til 2023, og er igjen eget fylke fra 1. januar 2024.' },
  { navn: 'Østfold', slug: 'ostfold', historikk: 'Østfold var en del av Viken fylke fra 2020 til 2023, og er igjen eget fylke fra 1. januar 2024.' },
  { navn: 'Vestfold', slug: 'vestfold', historikk: 'Vestfold var en del av Vestfold og Telemark fylke fra 2020 til 2023, og er igjen eget fylke fra 1. januar 2024.' },
  { navn: 'Telemark', slug: 'telemark', historikk: 'Telemark var en del av Vestfold og Telemark fylke fra 2020 til 2023, og er igjen eget fylke fra 1. januar 2024.' },
  { navn: 'Troms', slug: 'troms', historikk: 'Troms var en del av Troms og Finnmark fylke fra 2020 til 2023, og er igjen eget fylke fra 1. januar 2024.' },
  { navn: 'Finnmark', slug: 'finnmark', historikk: 'Finnmark var en del av Troms og Finnmark fylke fra 2020 til 2023, og er igjen eget fylke fra 1. januar 2024.' },
  { navn: 'Innlandet', slug: 'innlandet', historikk: 'Innlandet ble opprettet i 2020 ved sammenslåing av Hedmark og Oppland.' },
  { navn: 'Vestland', slug: 'vestland', historikk: 'Vestland ble opprettet i 2020 ved sammenslåing av Hordaland og Sogn og Fjordane.' },
  { navn: 'Agder', slug: 'agder', historikk: 'Agder ble opprettet i 2020 ved sammenslåing av Aust-Agder og Vest-Agder.' },
  { navn: 'Trøndelag', slug: 'trondelag', historikk: 'Trøndelag ble i 2018 slått sammen av Sør-Trøndelag og Nord-Trøndelag.' },
  { navn: 'Møre og Romsdal', slug: 'more-og-romsdal', historikk: null },
  { navn: 'Nordland', slug: 'nordland', historikk: null },
  { navn: 'Rogaland', slug: 'rogaland', historikk: null },
];

export function getFylkeBySlug(slug) {
  return FYLKER.find(f => f.slug === slug) || null;
}

export function getFylkeByNavn(navn) {
  return FYLKER.find(f => f.navn === navn) || null;
}
