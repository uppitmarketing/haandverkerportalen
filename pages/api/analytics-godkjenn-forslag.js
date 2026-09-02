// pages/api/analytics-godkjenn-forslag.js
import { getSupabaseAdmin } from '../../lib/supabaseAdmin';
import { erGyldigToken } from '../../lib/analyticsAuth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const cookieHeader = req.headers.cookie || '';
  const match = cookieHeader.match(/hp_analytics_auth=([^;]+)/);
  const cookieToken = match ? match[1] : null;
  const passord = process.env.ANALYTICS_PASSWORD;

  if (!erGyldigToken(cookieToken, passord)) {
    return res.status(401).json({ feil: 'Ikke innlogget' });
  }

  const { id, handling } = req.body || {};
  if (!id || !['godkjenn', 'avvis'].includes(handling)) {
    return res.status(400).json({ feil: 'Ugyldig forespørsel' });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { data: forslag, error: hentFeil } = await supabaseAdmin
      .from('nettside_forslag')
      .select('*')
      .eq('id', id)
      .single();

    if (hentFeil || !forslag) {
      return res.status(404).json({ feil: 'Fant ikke forslaget' });
    }

    if (handling === 'godkjenn') {
      const { error: oppdaterFeil } = await supabaseAdmin
        .from('bedrifter')
        .update({ hjemmeside: forslag.foreslatt_nettside })
        .eq('slug', forslag.bedrift_slug);

      if (oppdaterFeil) {
        return res.status(500).json({ feil: oppdaterFeil.message });
      }
    }

    const { error: statusFeil } = await supabaseAdmin
      .from('nettside_forslag')
      .update({ status: handling === 'godkjenn' ? 'godkjent' : 'avvist' })
      .eq('id', id);

    if (statusFeil) {
      return res.status(500).json({ feil: statusFeil.message });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ feil: err.message || 'Ukjent feil' });
  }
}
