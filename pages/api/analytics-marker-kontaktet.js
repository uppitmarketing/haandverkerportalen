// pages/api/analytics-marker-kontaktet.js
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

  const { id, kontaktet } = req.body || {};
  if (!id || typeof kontaktet !== 'boolean') {
    return res.status(400).json({ feil: 'Ugyldig forespørsel' });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from('fremhevet_intro_pamelding')
      .update({ kontaktet })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ feil: error.message });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ feil: err.message || 'Ukjent feil' });
  }
}
