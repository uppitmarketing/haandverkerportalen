// lib/analyticsAuth.js
// Enkel, stateløs sesjonssjekk for analytics-dashboardet. Brukes kun
// server-side (API-route + getServerSideProps).
import crypto from 'crypto';

export function lagAnalyticsToken(passord) {
  return crypto.createHmac('sha256', passord).update('hp-analytics-session').digest('hex');
}

export function erGyldigToken(cookieToken, passord) {
  if (!cookieToken || !passord) return false;
  return cookieToken === lagAnalyticsToken(passord);
}
