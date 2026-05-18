// lib/db.js
import { supabase } from './supabase';

export const NAERINGSKODER = [
  { kode: '43.210', slug: 'elektriker',  visningsnavn: 'Elektriker',   icon: '⚡' },
  { kode: '43.220', slug: 'rorlegger',   visningsnavn: 'Rørlegger',    icon: '🔧' },
  { kode: '43.320', slug: 'tomrer',      visningsnavn: 'Tømrer',       icon: '🪚' },
  { kode: '41.200', slug: 'byggmester',  visningsnavn: 'Byggmester',   icon: '🏗️' },
  { kode: '43.310', slug: 'maler',       visningsnavn: 'Maler',        icon: '🖌️' },
  { kode: '43.910', slug: 'taklegger',   visningsnavn: 'Taklegger',    icon: '🏚️' },
  { kode: '43.330', slug: 'gulvlegger',  visningsnavn: 'Gulvlegger',   icon: '🪵' },
  { kode: '43.341', slug: 'glassmester', visningsnavn: 'Glassmester',  icon: '🪟' },
  { kode: '43.390', slug: 'installasjon',visningsnavn: 'Installasjon', icon: '🛠️' },
  { kode: '43.120', slug: 'grunnarbeid', visningsnavn: 'Grunnarbeid',  icon: '🌍' },
];

// Komplett kommuneliste med slug → kommunenummer mapping
export const KOMMUNER = [
  { nummer: '0301', navn: 'Oslo',         slug: 'oslo' },
  { nummer: '3101', navn: 'Halden',       slug: 'halden' },
  { nummer: '3103', navn: 'Moss',         slug: 'moss' },
  { nummer: '3105', navn: 'Sarpsborg',    slug: 'sarpsborg' },
  { nummer: '3107', navn: 'Fredrikstad',  slug: 'fredrikstad' },
  { nummer: '3201', navn: 'Bærum',        slug: 'baerum' },
  { nummer: '3203', navn: 'Asker',        slug: 'asker' },
  { nummer: '3205', navn: 'Lillestrøm',   slug: 'lillestrom' },
  { nummer: '3207', navn: 'Nordre Follo', slug: 'nordre-follo' },
  { nummer: '3209', navn: 'Ullensaker',   slug: 'ullensaker' },
  { nummer: '3222', navn: 'Lørenskog',    slug: 'lorenskog' },
  { nummer: '3301', navn: 'Drammen',      slug: 'drammen' },
  { nummer: '3303', navn: 'Kongsberg',    slug: 'kongsberg' },
  { nummer: '3305', navn: 'Ringerike',    slug: 'ringerike' },
  { nummer: '3403', navn: 'Hamar',        slug: 'hamar' },
  { nummer: '3405', navn: 'Lillehammer',  slug: 'lillehammer' },
  { nummer: '3407', navn: 'Gjøvik',       slug: 'gjoevik' },
  { nummer: '3420', navn: 'Elverum',      slug: 'elverum' },
  { nummer: '3801', navn: 'Horten',       slug: 'horten' },
  { nummer: '3805', navn: 'Tønsberg',     slug: 'tonsberg' },
  { nummer: '3807', navn: 'Sandefjord',   slug: 'sandefjord' },
  { nummer: '3809', navn: 'Larvik',       slug: 'larvik' },
  { nummer: '3903', navn: 'Skien',        slug: 'skien' },
  { nummer: '3901', navn: 'Porsgrunn',    slug: 'porsgrunn' },
  { nummer: '4203', navn: 'Arendal',      slug: 'arendal' },
  { nummer: '4204', navn: 'Kristiansand', slug: 'kristiansand' },
  { nummer: '4202', navn: 'Grimstad',     slug: 'grimstad' },
  { nummer: '4223', navn: 'Vennesla',     slug: 'vennesla' },
  { nummer: '1101', navn: 'Eigersund',    slug: 'eigersund' },
  { nummer: '1103', navn: 'Stavanger',    slug: 'stavanger' },
  { nummer: '1106', navn: 'Haugesund',    slug: 'haugesund' },
  { nummer: '1108', navn: 'Sandnes',      slug: 'sandnes' },
  { nummer: '1124', navn: 'Sola',         slug: 'sola' },
  { nummer: '1149', navn: 'Karmøy',       slug: 'karmoy' },
  { nummer: '4601', navn: 'Bergen',       slug: 'bergen' },
  { nummer: '4620', navn: 'Voss',         slug: 'voss' },
  { nummer: '4626', navn: 'Askøy',        slug: 'askoy' },
  { nummer: '4630', navn: 'Alver',        slug: 'alver' },
  { nummer: '1505', navn: 'Kristiansund', slug: 'kristiansund' },
  { nummer: '1506', navn: 'Molde',        slug: 'molde' },
  { nummer: '1507', navn: 'Ålesund',      slug: 'alesund' },
  { nummer: '5001', navn: 'Trondheim',    slug: 'trondheim' },
  { nummer: '5006', navn: 'Steinkjer',    slug: 'steinkjer' },
  { nummer: '5007', navn: 'Namsos',       slug: 'namsos' },
  { nummer: '5035', navn: 'Stjørdal',     slug: 'stjordal' },
  { nummer: '5037', navn: 'Levanger',     slug: 'levanger' },
  { nummer: '5038', navn: 'Verdal',       slug: 'verdal' },
  { nummer: '1804', navn: 'Bodø',         slug: 'bodo' },
  { nummer: '1806', navn: 'Narvik',       slug: 'narvik' },
  { nummer: '1833', navn: 'Rana',         slug: 'rana' },
  { nummer: '5401', navn: 'Tromsø',       slug: 'tromso' },
  { nummer: '5402', navn: 'Harstad',      slug: 'harstad' },
  { nummer: '5501', navn: 'Alta',         slug: 'alta' },
  { nummer: '5503', navn: 'Hammerfest',   slug: 'hammerfest' },
];

export const POPULAERE_SOK = [
  { label: 'Elektriker Oslo',        href: '/elektriker/oslo' },
  { label: 'Rørlegger Bergen',       href: '/rorlegger/bergen' },
  { label: 'Tømrer Kristiansand',    href: '/tomrer/kristiansand' },
  { label: 'Maler Stavanger',        href: '/maler/stavanger' },
];

export function getNaeringBySlug(slug) {
  return NAERINGSKODER.find(n => n.slug === slug) || null;
}

export function getNaeringByKode(kode) {
  return NAERINGSKODER.find(n => n.kode === kode) || null;
}

export function getKommuneBySlug(slug) {
  return KOMMUNER.find(k => k.slug === slug) || null;
}

// Hent bedrifter for en kategori + kommune
export async function getBedrifterByKategoriOgKommune(naeringslug, kommuneslug) {
  const naering = getNaeringBySlug(naeringslug);
  if (!naering) return { bedrifter: [], naering: null, kommune: null, kommuneNavn: null, total: 0 };

  const kommune = getKommuneBySlug(kommuneslug);
  if (!kommune) return { bedrifter: [], naering, kommune: null, kommuneNavn: null, total: 0 };

  const { data, error, count } = await supabase
    .from('bedrifter')
    .select('*', { count: 'exact' })
    .eq('naeringskode', naering.kode)
    .eq('kommunenummer', kommune.nummer)
    .eq('er_aktiv', true)
    .order('navn')
    .limit(200);

  if (error) {
    console.error('Supabase error:', error);
    return { bedrifter: [], naering, kommune: kommune.navn, kommuneNavn: kommune.navn, total: 0 };
  }

  return {
    bedrifter: data || [],
    naering,
    kommune: kommune.navn,
    kommuneNavn: kommune.navn,
    total: count || 0,
  };
}

// Hent én bedrift på slug
export async function getBedriftBySlug(slug) {
  const { data, error } = await supabase
    .from('bedrifter')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

// Hent relaterte bedrifter
export async function getRelaterteBedrifter(naeringskode, kommunenummer, excludeSlug) {
  const { data } = await supabase
    .from('bedrifter')
    .select('*')
    .eq('naeringskode', naeringskode)
    .eq('kommunenummer', kommunenummer)
    .eq('er_aktiv', true)
    .neq('slug', excludeSlug)
    .order('navn')
    .limit(3);

  return data || [];
}

// Søk på navn + valgfri bransje og kommune
export async function sokBedrifter({ navn, naeringskode, kommunenummer }) {
  let query = supabase
    .from('bedrifter')
    .select('*')
    .eq('er_aktiv', true)
    .order('navn')
    .limit(50);

  if (navn) query = query.ilike('navn', `%${navn}%`);
  if (naeringskode) query = query.eq('naeringskode', naeringskode);
  if (kommunenummer) query = query.eq('kommunenummer', kommunenummer);

  const { data } = await query;
  return data || [];
}

// Hent antall bedrifter per næringskode
export async function getAntallPerNaering() {
  const result = {};

  await Promise.all(
    NAERINGSKODER.map(async (n) => {
      const { count } = await supabase
        .from('bedrifter')
        .select('*', { count: 'exact', head: true })
        .eq('naeringskode', n.kode)
        .eq('er_aktiv', true);
      result[n.kode] = count || 0;
    })
  );

  return result;
}

// Hent alle slugs for statisk generering
export async function getAlleBedriftSlugs() {
  const { data } = await supabase
    .from('bedrifter')
    .select('slug')
    .eq('er_aktiv', true);
  return (data || []).map(b => b.slug);
}

// Hent alle unike naeringskode+kommune-kombinasjoner
export async function getAlleKategoriKommuneKombinasjoner() {
  const { data } = await supabase
    .from('bedrifter')
    .select('naeringskode, kommunenummer, kommune')
    .eq('er_aktiv', true);

  if (!data) return [];

  const sett = new Map();
  for (const row of data) {
    const key = `${row.naeringskode}-${row.kommunenummer}`;
    if (!sett.has(key)) {
      sett.set(key, { naeringskode: row.naeringskode, kommunenummer: row.kommunenummer, kommune: row.kommune });
    }
  }
  return Array.from(sett.values());
}
