-- Kjør én gang i Supabase SQL editor
alter table bedrifter add column if not exists dsb_registrert boolean;
alter table bedrifter add column if not exists dsb_sjekket timestamptz;
create index if not exists bedrifter_naering_dsb_idx on bedrifter (naeringskode, dsb_registrert);
