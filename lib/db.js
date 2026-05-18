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

// Hent bedrifter for en kategori + kommune
export async function getBedrifterByKategoriOgKommune(naeringslug, kommuneslug) {
  const naering = getNaeringBySlug(naeringslug);
  if (!naering) return { bedrifter: [], naering: null, kommune: null, total: 0 };

  // Konverter kommuneslug til kommunenavn for oppslag
  const kommuneNavn = kommuneslug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace(/Og/g, 'og');

  const { data, error, count } = await supabase
    .from('bedrifter')
    .select('*', { count: 'exact' })
    .eq('naeringskode', naering.kode)
    .ilike('kommune', `%${kommuneNavn}%`)
    .eq('er_aktiv', true)
    .order('navn');

  if (error) { console.error(error); return { bedrifter: [], naering, kommune: kommuneNavn, total: 0 }; }

  return {
    bedrifter: data || [],
    naering,
    kommune: data?.[0]?.kommune || kommuneNavn,
    kommuneNavn: data?.[0]?.kommune || kommuneNavn,
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

// Hent antall bedrifter per næringskode (for kategori-kortene)
export async function getAntallPerNaering() {
  const { data } = await supabase
    .from('bedrifter')
    .select('naeringskode')
    .eq('er_aktiv', true);

  if (!data) return {};

  return data.reduce((acc, row) => {
    acc[row.naeringskode] = (acc[row.naeringskode] || 0) + 1;
    return acc;
  }, {});
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
