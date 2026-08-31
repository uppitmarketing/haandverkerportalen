// lib/jsonLd.js
// Escaper '<' slik at f.eks. en bedrifts navn/adresse (data vi ikke fullt ut
// kontrollerer) aldri kan inneholde en bokstavelig "</script>" og bryte ut
// av JSON-LD-taggen når den settes inn med dangerouslySetInnerHTML.
export function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
