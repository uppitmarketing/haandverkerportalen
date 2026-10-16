-- Kjør én gang i Supabase SQL editor
--
-- innhold_endret = når innholdet på bedriftssiden sist faktisk ble endret.
-- Importen skriver hele raden hver måned (sist_importert endres alltid), så
-- lastmod i sitemap kan ikke hentes derfra. Triggeren under oppdaterer
-- innhold_endret bare når et felt som vises på siden har endret verdi.

alter table bedrifter add column if not exists innhold_endret timestamptz not null default now();

create or replace function sett_innhold_endret() returns trigger
language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.innhold_endret := now();
    return new;
  end if;

  if (new.navn, new.naeringskode, new.adresse, new.postnummer, new.poststed,
      new.kommunenummer, new.kommune, new.hjemmeside, new.antall_ansatte,
      new.stiftelsesdato, new.er_aktiv, new.konkurs, new.under_avvikling,
      new.under_tvangsavvikling, new.mva_registrert, new.dsb_registrert,
      new.fgass_sertifisert, new.fgass_kategori, new.er_fremhevet,
      new.kontakt_epost, new.kontakt_telefon)
     is distinct from
     (old.navn, old.naeringskode, old.adresse, old.postnummer, old.poststed,
      old.kommunenummer, old.kommune, old.hjemmeside, old.antall_ansatte,
      old.stiftelsesdato, old.er_aktiv, old.konkurs, old.under_avvikling,
      old.under_tvangsavvikling, old.mva_registrert, old.dsb_registrert,
      old.fgass_sertifisert, old.fgass_kategori, old.er_fremhevet,
      old.kontakt_epost, old.kontakt_telefon)
  then
    new.innhold_endret := now();
  else
    new.innhold_endret := old.innhold_endret;
  end if;
  return new;
end $$;

drop trigger if exists bedrifter_innhold_endret on bedrifter;
create trigger bedrifter_innhold_endret
  before insert or update on bedrifter
  for each row execute function sett_innhold_endret();

-- Antall bedrifter og siste endring per bransje og kommune, til sitemap
create or replace function bransje_kommune_sitemap()
returns table (naeringskode text, kommunenummer text, antall bigint, sist_endret timestamptz)
language sql stable as $$
  select b.naeringskode::text, b.kommunenummer::text, count(*), max(b.innhold_endret)
  from bedrifter b
  where b.er_aktiv
    and b.dsb_registrert is not false
    and b.fgass_sertifisert is not false
    and b.naeringskode is not null
    and b.kommunenummer is not null
  group by b.naeringskode, b.kommunenummer
$$;

grant execute on function bransje_kommune_sitemap() to anon, authenticated;
