// lib/db.js
import { supabase } from './supabase';

export const NAERINGSKODER = [
  { kode: '43.210', slug: 'elektriker',  visningsnavn: 'Elektriker',   icon: '⚡' },
  { kode: '43.221', slug: 'rorlegger',   visningsnavn: 'Rørlegger',    icon: '🔧' },
  { kode: '43.320', slug: 'tomrer',      visningsnavn: 'Tømrer',       icon: '🪚' },
  { kode: '41.000', slug: 'byggmester',  visningsnavn: 'Byggmester',   icon: '🏗️' },
  { kode: '43.340', slug: 'maler',       visningsnavn: 'Maler',        icon: '🖌️' },
  { kode: '43.910', slug: 'taklegger',   visningsnavn: 'Taklegger',    icon: '🏚️' },
  { kode: '43.330', slug: 'gulvlegger',  visningsnavn: 'Gulvlegger',   icon: '🪵' },
  { kode: '43.120', slug: 'grunnarbeid', visningsnavn: 'Grunnarbeid',  icon: '🌍' },
];

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
  { nummer: '5035', navn: 'Stjørdal',     slug: 'stjordal' },
  { nummer: '5037', navn: 'Levanger',     slug: 'levanger' },
  { nummer: '1804', navn: 'Bodø',         slug: 'bodo' },
  { nummer: '1806', navn: 'Narvik',       slug: 'narvik' },
  { nummer: '1833', navn: 'Rana',         slug: 'rana' },
  { nummer: '5401', navn: 'Tromsø',       slug: 'tromso' },
  { nummer: '5402', navn: 'Harstad',      slug: 'harstad' },
  { nummer: '5501', navn: 'Alta',         slug: 'alta' },
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
  // Håndter underkoder for rørlegger
  if (['43.221','43.222','43.223'].includes(kode)) {
    return NAERINGSKODER.find(n => n.slug === 'rorlegger');
  }
  return NAERINGSKODER.find(n => n.kode === kode) || null;
}

export function getKommuneBySlug(slug) {
  return KOMMUNER.find(k => k.slug === slug) || null;
}

export async function getBedrifterByKategoriOgKommune(naeringslug, kommuneslug) {
  const naering = getNaeringBySlug(naeringslug);
  if (!naering) return { bedrifter: [], naering: null, kommune: null, kommuneNavn: null, total: 0 };

  const kommune = getKommuneBySlug(kommuneslug);
  if (!kommune) return { bedrifter: [], naering, kommune: null, kommuneNavn: null, total: 0 };

  // Håndter underkoder
  const koder = naeringslug === 'rorlegger'
    ? ['43.221', '43.222', '43.223']
    : [naering.kode];

  let alleBedrifter = [];
  let totalCount = 0;

  for (const kode of koder) {
    const { data, count } = await supabase
      .from('bedrifter')
      .select('*', { count: 'exact' })
      .eq('naeringskode', kode)
      .eq('kommunenummer', kommune.nummer)
      .eq('er_aktiv', true)
      .order('navn')
      .limit(200);

    if (data) alleBedrifter = [...alleBedrifter, ...data];
    totalCount += count || 0;
  }

  // Sorter samlet liste
  alleBedrifter.sort((a, b) => a.navn.localeCompare(b.navn, 'no'));

  return {
    bedrifter: alleBedrifter,
    naering,
    kommune: kommune.navn,
    kommuneNavn: kommune.navn,
    total: totalCount,
  };
}

export async function getBedriftBySlug(slug) {
  const { data, error } = await supabase
    .from('bedrifter')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getRelaterteBedrifter(naeringskode, kommunenummer, excludeSlug) {
  // Håndter underkoder for rørlegger
  const koder = ['43.221','43.222','43.223'].includes(naeringskode)
    ? ['43.221','43.222','43.223']
    : [naeringskode];

  const { data } = await supabase
    .from('bedrifter')
    .select('*')
    .in('naeringskode', koder)
    .eq('kommunenummer', kommunenummer)
    .eq('er_aktiv', true)
    .neq('slug', excludeSlug)
    .order('navn')
    .limit(3);

  return data || [];
}

export async function sokBedrifter({ navn, naeringskode, kommunenavn }) {
  let query = supabase
    .from('bedrifter')
    .select('*')
    .eq('er_aktiv', true)
    .order('navn')
    .limit(50);

  if (navn) query = query.ilike('navn', `%${navn}%`);
  if (naeringskode) {
    // Håndter underkoder for rørlegger
    const koder = ['43.221','43.222','43.223'].includes(naeringskode)
      ? ['43.221','43.222','43.223']
      : [naeringskode];
    query = query.in('naeringskode', koder);
  }
  if (kommunenavn) {
    query = query.or(`kommune.ilike.${kommunenavn},poststed.ilike.${kommunenavn}`);
  }

  const { data } = await query;
  return data || [];
}

export async function getAntallPerNaering() {
  const result = {};

  await Promise.all(
    NAERINGSKODER.map(async (n) => {
      const koder = n.slug === 'rorlegger'
        ? ['43.221', '43.222', '43.223']
        : [n.kode];

      let total = 0;
      for (const kode of koder) {
        const { count } = await supabase
          .from('bedrifter')
          .select('*', { count: 'exact', head: true })
          .eq('naeringskode', kode)
          .eq('er_aktiv', true);
        total += count || 0;
      }
      result[n.kode] = total;
    })
  );

  return result;
}

export async function getAlleBedriftSlugs() {
  const { data } = await supabase
    .from('bedrifter')
    .select('slug')
    .eq('er_aktiv', true);
  return (data || []).map(b => b.slug);
}
