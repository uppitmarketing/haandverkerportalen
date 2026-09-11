// pages/api/analytics-konverter-fremhevet.js
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

  const { id } = req.body || {};
  if (!id) {
    return res.status(400).json({ feil: 'Ugyldig forespørsel' });
  }

  try {
    const supabaseAdmin = getSupabaseAdmin();

    const { data: pamelding, error: hentFeil } = await supabaseAdmin
      .from('fremhevet_intro_pamelding')
      .select('*')
      .eq('id', id)
      .single();

    if (hentFeil || !pamelding) {
      return res.status(404).json({ feil: 'Fant ikke påmeldingen' });
    }

    const { data: bedrift, error: bedriftFeil } = await supabaseAdmin
      .from('bedrifter')
      .select('slug, hjemmeside')
      .eq('organisasjonsnummer', pamelding.org_nr)
      .maybeSingle();

    if (bedriftFeil) {
      return res.status(500).json({ feil: bedriftFeil.message });
    }
    if (!bedrift) {
      return res.status(404).json({ feil: `Fant ingen bedrift med org.nr ${pamelding.org_nr} i registeret` });
    }

    const { error: oppdaterFeil } = await supabaseAdmin
      .from('bedrifter')
      .update({
        er_fremhevet: true,
        egen_beskrivelse: pamelding.beskrivelse || null,
        spesialiteter: pamelding.spesialiteter || null,
        ...(pamelding.nettside && !bedrift.hjemmeside ? { hjemmeside: pamelding.nettside } : {}),
      })
      .eq('organisasjonsnummer', pamelding.org_nr);

    if (oppdaterFeil) {
      return res.status(500).json({ feil: oppdaterFeil.message });
    }

    await supabaseAdmin
      .from('fremhevet_intro_pamelding')
      .update({ konvertert: true, kontaktet: true })
      .eq('id', id);

    try {
      await res.revalidate(`/bedrift/${bedrift.slug}`);
    } catch {
      // Ikke kritisk – siden regenereres uansett innen 24t via ISR
    }

    return res.status(200).json({ ok: true, slug: bedrift.slug });
  } catch (err) {
    return res.status(500).json({ feil: err.message || 'Ukjent feil' });
  }
}
