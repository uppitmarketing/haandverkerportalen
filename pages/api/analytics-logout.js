// pages/api/analytics-logout.js
export default function handler(req, res) {
  res.setHeader('Set-Cookie', 'hp_analytics_auth=; HttpOnly; Path=/; Max-Age=0');
  res.writeHead(302, { Location: '/admin/analytics' });
  res.end();
}
