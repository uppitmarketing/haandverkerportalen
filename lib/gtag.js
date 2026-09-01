// lib/gtag.js
// Sender egendefinerte hendelser til dataLayer (GTM er allerede installert i
// Layout.jsx). Krever et GA4-event-tag i GTM med en Custom Event-trigger som
// lytter på riktig event-navn – selve GTM-oppsettet gjøres i tagmanager.google.com,
// ikke i kodebasen.
export function sporHendelse(eventNavn, parametre = {}) {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  window.dataLayer.push({ event: eventNavn, ...parametre });
}
