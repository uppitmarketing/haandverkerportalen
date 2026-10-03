-- Kjør én gang i Supabase SQL editor
alter table bedrifter add column if not exists kontakt_epost text;
alter table bedrifter add column if not exists kontakt_telefon text;

-- Fyll inn for bedrifter som allerede er konvertert til fremhevet profil
update bedrifter b
set kontakt_epost = p.epost, kontakt_telefon = p.telefon
from fremhevet_intro_pamelding p
where p.org_nr = b.organisasjonsnummer and p.konvertert = true;
