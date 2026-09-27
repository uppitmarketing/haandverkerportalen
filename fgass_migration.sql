-- Kjør én gang i Supabase SQL editor
alter table bedrifter add column if not exists fgass_sertifisert boolean;
alter table bedrifter add column if not exists fgass_kategori text;       -- f.eks. 'I' eller 'I,II'
alter table bedrifter add column if not exists fgass_sertifikatnr text;
alter table bedrifter add column if not exists fgass_sjekket timestamptz;
create index if not exists bedrifter_naering_fgass_idx on bedrifter (naeringskode, fgass_sertifisert);
