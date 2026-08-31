// lib/annonsorer.js
import { supabase } from './supabase';

export async function getAnnonsorForBransje(bransjeSlug) {
  if (!bransjeSlug) return null;

  const { data } = await supabase
    .from('annonsorer')
    .select('*')
    .eq('bransje_slug', bransjeSlug)
    .eq('aktiv', true)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  return data || null;
}
