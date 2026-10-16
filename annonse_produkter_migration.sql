-- Kjør én gang i Supabase SQL editor
-- Produkter fra annonsørenes Google Shopping-feed (fylles av guleholmen_feed_sync.js)
create table if not exists annonse_produkter (
  id text primary key,                 -- {partner}:{item_group_id}
  partner text not null,
  tittel text not null,
  bilde_url text not null,
  lenke text not null,
  pris numeric not null,               -- ordinær pris, NOK
  salgspris numeric,                   -- null = ingen rabatt
  rabatt_prosent integer,
  kategori text,
  oppdatert timestamptz not null default now()
);

create index if not exists annonse_produkter_partner_idx on annonse_produkter (partner);

alter table annonse_produkter enable row level security;

-- Nettsiden (anon) kan bare lese. Skriving gjøres av sync-scriptet med service-nøkkelen.
drop policy if exists "annonse_produkter_les" on annonse_produkter;
create policy "annonse_produkter_les" on annonse_produkter for select using (true);
