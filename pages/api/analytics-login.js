// pages/api/analytics-login.js
import { lagAnalyticsToken } from '../../lib/analyticsAuth';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const { passord } = req.body || {};
  const riktigPassord = process.env.ANALYTICS_PASSWORD;

  if (!riktigPassord || !passord || passord !== riktigPassord) {
    return res.status(401).json({ feil: 'Feil passord' });
  }

  const token = lagAnalyticsToken(riktigPassord);
  const maxAge = 60 * 60 * 24 * 30; // 30 dager
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';

  res.setHeader(
    'Set-Cookie',
    `hp_analytics_auth=${token}; HttpOnly${secure}; SameSite=Lax; Path=/; Max-Age=${maxAge}`
  );
  return res.status(200).json({ ok: true });
}
