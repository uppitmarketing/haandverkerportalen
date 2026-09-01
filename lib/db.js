// lib/db.js
import { supabase } from './supabase';

export const NAERINGSKODER = [
  { kode: '43.210', slug: 'elektriker',  visningsnavn: 'Elektriker',   icon: '⚡' },
  { kode: '43.221', slug: 'rorlegger',   visningsnavn: 'Rørlegger',    icon: '🔧' },
  { kode: '43.320', slug: 'tomrer',      visningsnavn: 'Tømrer',       icon: '🪚' },
  { kode: '41.000', slug: 'byggmester',  visningsnavn: 'Byggmester',   icon: '🏗️' },
  { kode: '43.340', slug: 'maler',       visningsnavn: 'Maler',        icon: '🖌️' },
  { kode: '43.910', slug: 'taklegger',   visningsnavn: 'Taklegger',    icon: '🏚️' },
  { kode: '43.330', slug: 'gulvlegger',  visningsnavn: 'Gulvlegger',   icon: '🪵' },
  { kode: '43.120', slug: 'grunnarbeid', visningsnavn: 'Grunnarbeid',  icon: '🌍' },
];

export const KOMMUNER = [
  { nummer: '0301', navn: 'Oslo', slug: 'oslo', fylke: 'Oslo' },
  { nummer: '1101', navn: 'Eigersund', slug: 'eigersund', fylke: 'Rogaland' },
  { nummer: '1103', navn: 'Stavanger', slug: 'stavanger', fylke: 'Rogaland' },
  { nummer: '1106', navn: 'Haugesund', slug: 'haugesund', fylke: 'Rogaland' },
  { nummer: '1108', navn: 'Sandnes', slug: 'sandnes', fylke: 'Rogaland' },
  { nummer: '1111', navn: 'Sokndal', slug: 'sokndal', fylke: 'Rogaland' },
  { nummer: '1112', navn: 'Lund', slug: 'lund', fylke: 'Rogaland' },
  { nummer: '1114', navn: 'Bjerkreim', slug: 'bjerkreim', fylke: 'Rogaland' },
  { nummer: '1119', navn: 'Hå', slug: 'ha', fylke: 'Rogaland' },
  { nummer: '1120', navn: 'Klepp', slug: 'klepp', fylke: 'Rogaland' },
  { nummer: '1121', navn: 'Time', slug: 'time', fylke: 'Rogaland' },
  { nummer: '1122', navn: 'Gjesdal', slug: 'gjesdal', fylke: 'Rogaland' },
  { nummer: '1124', navn: 'Sola', slug: 'sola', fylke: 'Rogaland' },
  { nummer: '1127', navn: 'Randaberg', slug: 'randaberg', fylke: 'Rogaland' },
  { nummer: '1130', navn: 'Strand', slug: 'strand', fylke: 'Rogaland' },
  { nummer: '1133', navn: 'Hjelmeland', slug: 'hjelmeland', fylke: 'Rogaland' },
  { nummer: '1134', navn: 'Suldal', slug: 'suldal', fylke: 'Rogaland' },
  { nummer: '1135', navn: 'Sauda', slug: 'sauda', fylke: 'Rogaland' },
  { nummer: '1144', navn: 'Kvitsøy', slug: 'kvitsoy', fylke: 'Rogaland' },
  { nummer: '1145', navn: 'Bokn', slug: 'bokn', fylke: 'Rogaland' },
  { nummer: '1146', navn: 'Tysvær', slug: 'tysvaer', fylke: 'Rogaland' },
  { nummer: '1149', navn: 'Karmøy', slug: 'karmoy', fylke: 'Rogaland' },
  { nummer: '1151', navn: 'Utsira', slug: 'utsira', fylke: 'Rogaland' },
  { nummer: '1160', navn: 'Vindafjord', slug: 'vindafjord', fylke: 'Rogaland' },
  { nummer: '1505', navn: 'Kristiansund', slug: 'kristiansund', fylke: 'Møre og Romsdal' },
  { nummer: '1506', navn: 'Molde', slug: 'molde', fylke: 'Møre og Romsdal' },
  { nummer: '1508', navn: 'Ålesund', slug: 'alesund', fylke: 'Møre og Romsdal' },
  { nummer: '1511', navn: 'Vanylven', slug: 'vanylven', fylke: 'Møre og Romsdal' },
  { nummer: '1514', navn: 'Sande', slug: 'sande', fylke: 'Møre og Romsdal' },
  { nummer: '1515', navn: 'Herøy (Møre og Romsdal)', slug: 'heroy-more-og-romsdal', fylke: 'Møre og Romsdal' },
  { nummer: '1516', navn: 'Ulstein', slug: 'ulstein', fylke: 'Møre og Romsdal' },
  { nummer: '1517', navn: 'Hareid', slug: 'hareid', fylke: 'Møre og Romsdal' },
  { nummer: '1520', navn: 'Ørsta', slug: 'orsta', fylke: 'Møre og Romsdal' },
  { nummer: '1525', navn: 'Stranda', slug: 'stranda', fylke: 'Møre og Romsdal' },
  { nummer: '1528', navn: 'Sykkylven', slug: 'sykkylven', fylke: 'Møre og Romsdal' },
  { nummer: '1531', navn: 'Sula', slug: 'sula', fylke: 'Møre og Romsdal' },
  { nummer: '1532', navn: 'Giske', slug: 'giske', fylke: 'Møre og Romsdal' },
  { nummer: '1535', navn: 'Vestnes', slug: 'vestnes', fylke: 'Møre og Romsdal' },
  { nummer: '1539', navn: 'Rauma', slug: 'rauma', fylke: 'Møre og Romsdal' },
  { nummer: '1547', navn: 'Aukra', slug: 'aukra', fylke: 'Møre og Romsdal' },
  { nummer: '1554', navn: 'Averøy', slug: 'averoy', fylke: 'Møre og Romsdal' },
  { nummer: '1557', navn: 'Gjemnes', slug: 'gjemnes', fylke: 'Møre og Romsdal' },
  { nummer: '1560', navn: 'Tingvoll', slug: 'tingvoll', fylke: 'Møre og Romsdal' },
  { nummer: '1563', navn: 'Sunndal', slug: 'sunndal', fylke: 'Møre og Romsdal' },
  { nummer: '1566', navn: 'Surnadal', slug: 'surnadal', fylke: 'Møre og Romsdal' },
  { nummer: '1573', navn: 'Smøla', slug: 'smola', fylke: 'Møre og Romsdal' },
  { nummer: '1576', navn: 'Aure', slug: 'aure', fylke: 'Møre og Romsdal' },
  { nummer: '1577', navn: 'Volda', slug: 'volda', fylke: 'Møre og Romsdal' },
  { nummer: '1578', navn: 'Fjord', slug: 'fjord', fylke: 'Møre og Romsdal' },
  { nummer: '1579', navn: 'Hustadvika', slug: 'hustadvika', fylke: 'Møre og Romsdal' },
  { nummer: '1580', navn: 'Haram', slug: 'haram', fylke: 'Møre og Romsdal' },
  { nummer: '1804', navn: 'Bodø', slug: 'bodo', fylke: 'Nordland' },
  { nummer: '1806', navn: 'Narvik', slug: 'narvik', fylke: 'Nordland' },
  { nummer: '1811', navn: 'Bindal', slug: 'bindal', fylke: 'Nordland' },
  { nummer: '1812', navn: 'Sømna', slug: 'somna', fylke: 'Nordland' },
  { nummer: '1813', navn: 'Brønnøy', slug: 'bronnoy', fylke: 'Nordland' },
  { nummer: '1815', navn: 'Vega', slug: 'vega', fylke: 'Nordland' },
  { nummer: '1816', navn: 'Vevelstad', slug: 'vevelstad', fylke: 'Nordland' },
  { nummer: '1818', navn: 'Herøy (Nordland)', slug: 'heroy-nordland', fylke: 'Nordland' },
  { nummer: '1820', navn: 'Alstahaug', slug: 'alstahaug', fylke: 'Nordland' },
  { nummer: '1822', navn: 'Leirfjord', slug: 'leirfjord', fylke: 'Nordland' },
  { nummer: '1824', navn: 'Vefsn', slug: 'vefsn', fylke: 'Nordland' },
  { nummer: '1825', navn: 'Grane', slug: 'grane', fylke: 'Nordland' },
  { nummer: '1826', navn: 'Hattfjelldal', slug: 'hattfjelldal', fylke: 'Nordland' },
  { nummer: '1827', navn: 'Dønna', slug: 'donna', fylke: 'Nordland' },
  { nummer: '1828', navn: 'Nesna', slug: 'nesna', fylke: 'Nordland' },
  { nummer: '1832', navn: 'Hemnes', slug: 'hemnes', fylke: 'Nordland' },
  { nummer: '1833', navn: 'Rana', slug: 'rana', fylke: 'Nordland' },
  { nummer: '1834', navn: 'Lurøy', slug: 'luroy', fylke: 'Nordland' },
  { nummer: '1835', navn: 'Træna', slug: 'traena', fylke: 'Nordland' },
  { nummer: '1836', navn: 'Rødøy', slug: 'rodoy', fylke: 'Nordland' },
  { nummer: '1837', navn: 'Meløy', slug: 'meloy', fylke: 'Nordland' },
  { nummer: '1838', navn: 'Gildeskål', slug: 'gildeskal', fylke: 'Nordland' },
  { nummer: '1839', navn: 'Beiarn', slug: 'beiarn', fylke: 'Nordland' },
  { nummer: '1840', navn: 'Saltdal', slug: 'saltdal', fylke: 'Nordland' },
  { nummer: '1841', navn: 'Fauske', slug: 'fauske', fylke: 'Nordland' },
  { nummer: '1845', navn: 'Sørfold', slug: 'sorfold', fylke: 'Nordland' },
  { nummer: '1848', navn: 'Steigen', slug: 'steigen', fylke: 'Nordland' },
  { nummer: '1851', navn: 'Lødingen', slug: 'lodingen', fylke: 'Nordland' },
  { nummer: '1853', navn: 'Evenes', slug: 'evenes', fylke: 'Nordland' },
  { nummer: '1856', navn: 'Røst', slug: 'rost', fylke: 'Nordland' },
  { nummer: '1857', navn: 'Værøy', slug: 'vaeroy', fylke: 'Nordland' },
  { nummer: '1859', navn: 'Flakstad', slug: 'flakstad', fylke: 'Nordland' },
  { nummer: '1860', navn: 'Vestvågøy', slug: 'vestvagoy', fylke: 'Nordland' },
  { nummer: '1865', navn: 'Vågan', slug: 'vagan', fylke: 'Nordland' },
  { nummer: '1866', navn: 'Hadsel', slug: 'hadsel', fylke: 'Nordland' },
  { nummer: '1867', navn: 'Bø', slug: 'bo', fylke: 'Nordland' },
  { nummer: '1868', navn: 'Øksnes', slug: 'oksnes', fylke: 'Nordland' },
  { nummer: '1870', navn: 'Sortland', slug: 'sortland', fylke: 'Nordland' },
  { nummer: '1871', navn: 'Andøy', slug: 'andoy', fylke: 'Nordland' },
  { nummer: '1874', navn: 'Moskenes', slug: 'moskenes', fylke: 'Nordland' },
  { nummer: '1875', navn: 'Hamarøy', slug: 'hamaroy', fylke: 'Nordland' },
  { nummer: '3101', navn: 'Halden', slug: 'halden', fylke: 'Østfold' },
  { nummer: '3103', navn: 'Moss', slug: 'moss', fylke: 'Østfold' },
  { nummer: '3105', navn: 'Sarpsborg', slug: 'sarpsborg', fylke: 'Østfold' },
  { nummer: '3107', navn: 'Fredrikstad', slug: 'fredrikstad', fylke: 'Østfold' },
  { nummer: '3110', navn: 'Hvaler', slug: 'hvaler', fylke: 'Østfold' },
  { nummer: '3112', navn: 'Råde', slug: 'rade', fylke: 'Østfold' },
  { nummer: '3114', navn: 'Våler (Østfold)', slug: 'valer-ostfold', fylke: 'Østfold' },
  { nummer: '3116', navn: 'Skiptvet', slug: 'skiptvet', fylke: 'Østfold' },
  { nummer: '3118', navn: 'Indre Østfold', slug: 'indre-ostfold', fylke: 'Østfold' },
  { nummer: '3120', navn: 'Rakkestad', slug: 'rakkestad', fylke: 'Østfold' },
  { nummer: '3122', navn: 'Marker', slug: 'marker', fylke: 'Østfold' },
  { nummer: '3124', navn: 'Aremark', slug: 'aremark', fylke: 'Østfold' },
  { nummer: '3201', navn: 'Bærum', slug: 'baerum', fylke: 'Akershus' },
  { nummer: '3203', navn: 'Asker', slug: 'asker', fylke: 'Akershus' },
  { nummer: '3205', navn: 'Lillestrøm', slug: 'lillestrom', fylke: 'Akershus' },
  { nummer: '3207', navn: 'Nordre Follo', slug: 'nordre-follo', fylke: 'Akershus' },
  { nummer: '3209', navn: 'Ullensaker', slug: 'ullensaker', fylke: 'Akershus' },
  { nummer: '3212', navn: 'Nesodden', slug: 'nesodden', fylke: 'Akershus' },
  { nummer: '3214', navn: 'Frogn', slug: 'frogn', fylke: 'Akershus' },
  { nummer: '3216', navn: 'Vestby', slug: 'vestby', fylke: 'Akershus' },
  { nummer: '3218', navn: 'Ås', slug: 'as', fylke: 'Akershus' },
  { nummer: '3220', navn: 'Enebakk', slug: 'enebakk', fylke: 'Akershus' },
  { nummer: '3222', navn: 'Lørenskog', slug: 'lorenskog', fylke: 'Akershus' },
  { nummer: '3224', navn: 'Rælingen', slug: 'raelingen', fylke: 'Akershus' },
  { nummer: '3226', navn: 'Aurskog-Høland', slug: 'aurskog-holand', fylke: 'Akershus' },
  { nummer: '3228', navn: 'Nes', slug: 'nes', fylke: 'Akershus' },
  { nummer: '3230', navn: 'Gjerdrum', slug: 'gjerdrum', fylke: 'Akershus' },
  { nummer: '3232', navn: 'Nittedal', slug: 'nittedal', fylke: 'Akershus' },
  { nummer: '3234', navn: 'Lunner', slug: 'lunner', fylke: 'Akershus' },
  { nummer: '3236', navn: 'Jevnaker', slug: 'jevnaker', fylke: 'Akershus' },
  { nummer: '3238', navn: 'Nannestad', slug: 'nannestad', fylke: 'Akershus' },
  { nummer: '3240', navn: 'Eidsvoll', slug: 'eidsvoll', fylke: 'Akershus' },
  { nummer: '3242', navn: 'Hurdal', slug: 'hurdal', fylke: 'Akershus' },
  { nummer: '3301', navn: 'Drammen', slug: 'drammen', fylke: 'Buskerud' },
  { nummer: '3303', navn: 'Kongsberg', slug: 'kongsberg', fylke: 'Buskerud' },
  { nummer: '3305', navn: 'Ringerike', slug: 'ringerike', fylke: 'Buskerud' },
  { nummer: '3310', navn: 'Hole', slug: 'hole', fylke: 'Buskerud' },
  { nummer: '3312', navn: 'Lier', slug: 'lier', fylke: 'Buskerud' },
  { nummer: '3314', navn: 'Øvre Eiker', slug: 'ovre-eiker', fylke: 'Buskerud' },
  { nummer: '3316', navn: 'Modum', slug: 'modum', fylke: 'Buskerud' },
  { nummer: '3318', navn: 'Krødsherad', slug: 'krodsherad', fylke: 'Buskerud' },
  { nummer: '3320', navn: 'Flå', slug: 'fla', fylke: 'Buskerud' },
  { nummer: '3322', navn: 'Nesbyen', slug: 'nesbyen', fylke: 'Buskerud' },
  { nummer: '3324', navn: 'Gol', slug: 'gol', fylke: 'Buskerud' },
  { nummer: '3326', navn: 'Hemsedal', slug: 'hemsedal', fylke: 'Buskerud' },
  { nummer: '3328', navn: 'Ål', slug: 'al', fylke: 'Buskerud' },
  { nummer: '3330', navn: 'Hol', slug: 'hol', fylke: 'Buskerud' },
  { nummer: '3332', navn: 'Sigdal', slug: 'sigdal', fylke: 'Buskerud' },
  { nummer: '3334', navn: 'Flesberg', slug: 'flesberg', fylke: 'Buskerud' },
  { nummer: '3336', navn: 'Rollag', slug: 'rollag', fylke: 'Buskerud' },
  { nummer: '3338', navn: 'Nore og Uvdal', slug: 'nore-og-uvdal', fylke: 'Buskerud' },
  { nummer: '3401', navn: 'Kongsvinger', slug: 'kongsvinger', fylke: 'Innlandet' },
  { nummer: '3403', navn: 'Hamar', slug: 'hamar', fylke: 'Innlandet' },
  { nummer: '3405', navn: 'Lillehammer', slug: 'lillehammer', fylke: 'Innlandet' },
  { nummer: '3407', navn: 'Gjøvik', slug: 'gjoevik', fylke: 'Innlandet' },
  { nummer: '3411', navn: 'Ringsaker', slug: 'ringsaker', fylke: 'Innlandet' },
  { nummer: '3412', navn: 'Løten', slug: 'loten', fylke: 'Innlandet' },
  { nummer: '3413', navn: 'Stange', slug: 'stange', fylke: 'Innlandet' },
  { nummer: '3414', navn: 'Nord-Odal', slug: 'nord-odal', fylke: 'Innlandet' },
  { nummer: '3415', navn: 'Sør-Odal', slug: 'sor-odal', fylke: 'Innlandet' },
  { nummer: '3416', navn: 'Eidskog', slug: 'eidskog', fylke: 'Innlandet' },
  { nummer: '3417', navn: 'Grue', slug: 'grue', fylke: 'Innlandet' },
  { nummer: '3418', navn: 'Åsnes', slug: 'asnes', fylke: 'Innlandet' },
  { nummer: '3419', navn: 'Våler (Innlandet)', slug: 'valer-innlandet', fylke: 'Innlandet' },
  { nummer: '3420', navn: 'Elverum', slug: 'elverum', fylke: 'Innlandet' },
  { nummer: '3421', navn: 'Trysil', slug: 'trysil', fylke: 'Innlandet' },
  { nummer: '3422', navn: 'Åmot', slug: 'amot', fylke: 'Innlandet' },
  { nummer: '3423', navn: 'Stor-Elvdal', slug: 'stor-elvdal', fylke: 'Innlandet' },
  { nummer: '3424', navn: 'Rendalen', slug: 'rendalen', fylke: 'Innlandet' },
  { nummer: '3425', navn: 'Engerdal', slug: 'engerdal', fylke: 'Innlandet' },
  { nummer: '3426', navn: 'Tolga', slug: 'tolga', fylke: 'Innlandet' },
  { nummer: '3427', navn: 'Tynset', slug: 'tynset', fylke: 'Innlandet' },
  { nummer: '3428', navn: 'Alvdal', slug: 'alvdal', fylke: 'Innlandet' },
  { nummer: '3429', navn: 'Folldal', slug: 'folldal', fylke: 'Innlandet' },
  { nummer: '3430', navn: 'Os', slug: 'os', fylke: 'Innlandet' },
  { nummer: '3431', navn: 'Dovre', slug: 'dovre', fylke: 'Innlandet' },
  { nummer: '3432', navn: 'Lesja', slug: 'lesja', fylke: 'Innlandet' },
  { nummer: '3433', navn: 'Skjåk', slug: 'skjak', fylke: 'Innlandet' },
  { nummer: '3434', navn: 'Lom', slug: 'lom', fylke: 'Innlandet' },
  { nummer: '3435', navn: 'Vågå', slug: 'vaga', fylke: 'Innlandet' },
  { nummer: '3436', navn: 'Nord-Fron', slug: 'nord-fron', fylke: 'Innlandet' },
  { nummer: '3437', navn: 'Sel', slug: 'sel', fylke: 'Innlandet' },
  { nummer: '3438', navn: 'Sør-Fron', slug: 'sor-fron', fylke: 'Innlandet' },
  { nummer: '3439', navn: 'Ringebu', slug: 'ringebu', fylke: 'Innlandet' },
  { nummer: '3440', navn: 'Øyer', slug: 'oyer', fylke: 'Innlandet' },
  { nummer: '3441', navn: 'Gausdal', slug: 'gausdal', fylke: 'Innlandet' },
  { nummer: '3442', navn: 'Østre Toten', slug: 'ostre-toten', fylke: 'Innlandet' },
  { nummer: '3443', navn: 'Vestre Toten', slug: 'vestre-toten', fylke: 'Innlandet' },
  { nummer: '3446', navn: 'Gran', slug: 'gran', fylke: 'Innlandet' },
  { nummer: '3447', navn: 'Søndre Land', slug: 'sondre-land', fylke: 'Innlandet' },
  { nummer: '3448', navn: 'Nordre Land', slug: 'nordre-land', fylke: 'Innlandet' },
  { nummer: '3449', navn: 'Sør-Aurdal', slug: 'sor-aurdal', fylke: 'Innlandet' },
  { nummer: '3450', navn: 'Etnedal', slug: 'etnedal', fylke: 'Innlandet' },
  { nummer: '3451', navn: 'Nord-Aurdal', slug: 'nord-aurdal', fylke: 'Innlandet' },
  { nummer: '3452', navn: 'Vestre Slidre', slug: 'vestre-slidre', fylke: 'Innlandet' },
  { nummer: '3453', navn: 'Øystre Slidre', slug: 'oystre-slidre', fylke: 'Innlandet' },
  { nummer: '3454', navn: 'Vang', slug: 'vang', fylke: 'Innlandet' },
  { nummer: '3901', navn: 'Horten', slug: 'horten', fylke: 'Vestfold' },
  { nummer: '3903', navn: 'Holmestrand', slug: 'holmestrand', fylke: 'Vestfold' },
  { nummer: '3905', navn: 'Tønsberg', slug: 'tonsberg', fylke: 'Vestfold' },
  { nummer: '3907', navn: 'Sandefjord', slug: 'sandefjord', fylke: 'Vestfold' },
  { nummer: '3909', navn: 'Larvik', slug: 'larvik', fylke: 'Vestfold' },
  { nummer: '3911', navn: 'Færder', slug: 'faerder', fylke: 'Vestfold' },
  { nummer: '4001', navn: 'Porsgrunn', slug: 'porsgrunn', fylke: 'Telemark' },
  { nummer: '4003', navn: 'Skien', slug: 'skien', fylke: 'Telemark' },
  { nummer: '4005', navn: 'Notodden', slug: 'notodden', fylke: 'Telemark' },
  { nummer: '4010', navn: 'Siljan', slug: 'siljan', fylke: 'Telemark' },
  { nummer: '4012', navn: 'Bamble', slug: 'bamble', fylke: 'Telemark' },
  { nummer: '4014', navn: 'Kragerø', slug: 'kragero', fylke: 'Telemark' },
  { nummer: '4016', navn: 'Drangedal', slug: 'drangedal', fylke: 'Telemark' },
  { nummer: '4018', navn: 'Nome', slug: 'nome', fylke: 'Telemark' },
  { nummer: '4020', navn: 'Midt-Telemark', slug: 'midt-telemark', fylke: 'Telemark' },
  { nummer: '4022', navn: 'Seljord', slug: 'seljord', fylke: 'Telemark' },
  { nummer: '4024', navn: 'Hjartdal', slug: 'hjartdal', fylke: 'Telemark' },
  { nummer: '4026', navn: 'Tinn', slug: 'tinn', fylke: 'Telemark' },
  { nummer: '4028', navn: 'Kviteseid', slug: 'kviteseid', fylke: 'Telemark' },
  { nummer: '4030', navn: 'Nissedal', slug: 'nissedal', fylke: 'Telemark' },
  { nummer: '4032', navn: 'Fyresdal', slug: 'fyresdal', fylke: 'Telemark' },
  { nummer: '4034', navn: 'Tokke', slug: 'tokke', fylke: 'Telemark' },
  { nummer: '4036', navn: 'Vinje', slug: 'vinje', fylke: 'Telemark' },
  { nummer: '4201', navn: 'Risør', slug: 'risor', fylke: 'Agder' },
  { nummer: '4202', navn: 'Grimstad', slug: 'grimstad', fylke: 'Agder' },
  { nummer: '4203', navn: 'Arendal', slug: 'arendal', fylke: 'Agder' },
  { nummer: '4204', navn: 'Kristiansand', slug: 'kristiansand', fylke: 'Agder' },
  { nummer: '4205', navn: 'Lindesnes', slug: 'lindesnes', fylke: 'Agder' },
  { nummer: '4206', navn: 'Farsund', slug: 'farsund', fylke: 'Agder' },
  { nummer: '4207', navn: 'Flekkefjord', slug: 'flekkefjord', fylke: 'Agder' },
  { nummer: '4211', navn: 'Gjerstad', slug: 'gjerstad', fylke: 'Agder' },
  { nummer: '4212', navn: 'Vegårshei', slug: 'vegarshei', fylke: 'Agder' },
  { nummer: '4213', navn: 'Tvedestrand', slug: 'tvedestrand', fylke: 'Agder' },
  { nummer: '4214', navn: 'Froland', slug: 'froland', fylke: 'Agder' },
  { nummer: '4215', navn: 'Lillesand', slug: 'lillesand', fylke: 'Agder' },
  { nummer: '4216', navn: 'Birkenes', slug: 'birkenes', fylke: 'Agder' },
  { nummer: '4217', navn: 'Åmli', slug: 'amli', fylke: 'Agder' },
  { nummer: '4218', navn: 'Iveland', slug: 'iveland', fylke: 'Agder' },
  { nummer: '4219', navn: 'Evje og Hornnes', slug: 'evje-og-hornnes', fylke: 'Agder' },
  { nummer: '4220', navn: 'Bygland', slug: 'bygland', fylke: 'Agder' },
  { nummer: '4221', navn: 'Valle', slug: 'valle', fylke: 'Agder' },
  { nummer: '4222', navn: 'Bykle', slug: 'bykle', fylke: 'Agder' },
  { nummer: '4223', navn: 'Vennesla', slug: 'vennesla', fylke: 'Agder' },
  { nummer: '4224', navn: 'Åseral', slug: 'aseral', fylke: 'Agder' },
  { nummer: '4225', navn: 'Lyngdal', slug: 'lyngdal', fylke: 'Agder' },
  { nummer: '4226', navn: 'Hægebostad', slug: 'haegebostad', fylke: 'Agder' },
  { nummer: '4227', navn: 'Kvinesdal', slug: 'kvinesdal', fylke: 'Agder' },
  { nummer: '4228', navn: 'Sirdal', slug: 'sirdal', fylke: 'Agder' },
  { nummer: '4601', navn: 'Bergen', slug: 'bergen', fylke: 'Vestland' },
  { nummer: '4602', navn: 'Kinn', slug: 'kinn', fylke: 'Vestland' },
  { nummer: '4611', navn: 'Etne', slug: 'etne', fylke: 'Vestland' },
  { nummer: '4612', navn: 'Sveio', slug: 'sveio', fylke: 'Vestland' },
  { nummer: '4613', navn: 'Bømlo', slug: 'bomlo', fylke: 'Vestland' },
  { nummer: '4614', navn: 'Stord', slug: 'stord', fylke: 'Vestland' },
  { nummer: '4615', navn: 'Fitjar', slug: 'fitjar', fylke: 'Vestland' },
  { nummer: '4616', navn: 'Tysnes', slug: 'tysnes', fylke: 'Vestland' },
  { nummer: '4617', navn: 'Kvinnherad', slug: 'kvinnherad', fylke: 'Vestland' },
  { nummer: '4618', navn: 'Ullensvang', slug: 'ullensvang', fylke: 'Vestland' },
  { nummer: '4619', navn: 'Eidfjord', slug: 'eidfjord', fylke: 'Vestland' },
  { nummer: '4620', navn: 'Ulvik', slug: 'ulvik', fylke: 'Vestland' },
  { nummer: '4621', navn: 'Voss', slug: 'voss', fylke: 'Vestland' },
  { nummer: '4622', navn: 'Kvam', slug: 'kvam', fylke: 'Vestland' },
  { nummer: '4623', navn: 'Samnanger', slug: 'samnanger', fylke: 'Vestland' },
  { nummer: '4624', navn: 'Bjørnafjorden', slug: 'bjornafjorden', fylke: 'Vestland' },
  { nummer: '4625', navn: 'Austevoll', slug: 'austevoll', fylke: 'Vestland' },
  { nummer: '4626', navn: 'Øygarden', slug: 'oygarden', fylke: 'Vestland' },
  { nummer: '4627', navn: 'Askøy', slug: 'askoy', fylke: 'Vestland' },
  { nummer: '4628', navn: 'Vaksdal', slug: 'vaksdal', fylke: 'Vestland' },
  { nummer: '4629', navn: 'Modalen', slug: 'modalen', fylke: 'Vestland' },
  { nummer: '4630', navn: 'Osterøy', slug: 'osteroy', fylke: 'Vestland' },
  { nummer: '4631', navn: 'Alver', slug: 'alver', fylke: 'Vestland' },
  { nummer: '4632', navn: 'Austrheim', slug: 'austrheim', fylke: 'Vestland' },
  { nummer: '4633', navn: 'Fedje', slug: 'fedje', fylke: 'Vestland' },
  { nummer: '4634', navn: 'Masfjorden', slug: 'masfjorden', fylke: 'Vestland' },
  { nummer: '4635', navn: 'Gulen', slug: 'gulen', fylke: 'Vestland' },
  { nummer: '4636', navn: 'Solund', slug: 'solund', fylke: 'Vestland' },
  { nummer: '4637', navn: 'Hyllestad', slug: 'hyllestad', fylke: 'Vestland' },
  { nummer: '4638', navn: 'Høyanger', slug: 'hoyanger', fylke: 'Vestland' },
  { nummer: '4639', navn: 'Vik', slug: 'vik', fylke: 'Vestland' },
  { nummer: '4640', navn: 'Sogndal', slug: 'sogndal', fylke: 'Vestland' },
  { nummer: '4641', navn: 'Aurland', slug: 'aurland', fylke: 'Vestland' },
  { nummer: '4642', navn: 'Lærdal', slug: 'laerdal', fylke: 'Vestland' },
  { nummer: '4643', navn: 'Årdal', slug: 'ardal', fylke: 'Vestland' },
  { nummer: '4644', navn: 'Luster', slug: 'luster', fylke: 'Vestland' },
  { nummer: '4645', navn: 'Askvoll', slug: 'askvoll', fylke: 'Vestland' },
  { nummer: '4646', navn: 'Fjaler', slug: 'fjaler', fylke: 'Vestland' },
  { nummer: '4647', navn: 'Sunnfjord', slug: 'sunnfjord', fylke: 'Vestland' },
  { nummer: '4648', navn: 'Bremanger', slug: 'bremanger', fylke: 'Vestland' },
  { nummer: '4649', navn: 'Stad', slug: 'stad', fylke: 'Vestland' },
  { nummer: '4650', navn: 'Gloppen', slug: 'gloppen', fylke: 'Vestland' },
  { nummer: '4651', navn: 'Stryn', slug: 'stryn', fylke: 'Vestland' },
  { nummer: '5001', navn: 'Trondheim', slug: 'trondheim', fylke: 'Trøndelag' },
  { nummer: '5006', navn: 'Steinkjer', slug: 'steinkjer', fylke: 'Trøndelag' },
  { nummer: '5007', navn: 'Namsos', slug: 'namsos', fylke: 'Trøndelag' },
  { nummer: '5014', navn: 'Frøya', slug: 'froya', fylke: 'Trøndelag' },
  { nummer: '5020', navn: 'Osen', slug: 'osen', fylke: 'Trøndelag' },
  { nummer: '5021', navn: 'Oppdal', slug: 'oppdal', fylke: 'Trøndelag' },
  { nummer: '5022', navn: 'Rennebu', slug: 'rennebu', fylke: 'Trøndelag' },
  { nummer: '5025', navn: 'Røros', slug: 'roros', fylke: 'Trøndelag' },
  { nummer: '5026', navn: 'Holtålen', slug: 'holtalen', fylke: 'Trøndelag' },
  { nummer: '5027', navn: 'Midtre Gauldal', slug: 'midtre-gauldal', fylke: 'Trøndelag' },
  { nummer: '5028', navn: 'Melhus', slug: 'melhus', fylke: 'Trøndelag' },
  { nummer: '5029', navn: 'Skaun', slug: 'skaun', fylke: 'Trøndelag' },
  { nummer: '5031', navn: 'Malvik', slug: 'malvik', fylke: 'Trøndelag' },
  { nummer: '5032', navn: 'Selbu', slug: 'selbu', fylke: 'Trøndelag' },
  { nummer: '5033', navn: 'Tydal', slug: 'tydal', fylke: 'Trøndelag' },
  { nummer: '5034', navn: 'Meråker', slug: 'meraker', fylke: 'Trøndelag' },
  { nummer: '5035', navn: 'Stjørdal', slug: 'stjordal', fylke: 'Trøndelag' },
  { nummer: '5036', navn: 'Frosta', slug: 'frosta', fylke: 'Trøndelag' },
  { nummer: '5037', navn: 'Levanger', slug: 'levanger', fylke: 'Trøndelag' },
  { nummer: '5038', navn: 'Verdal', slug: 'verdal', fylke: 'Trøndelag' },
  { nummer: '5041', navn: 'Snåsa', slug: 'snasa', fylke: 'Trøndelag' },
  { nummer: '5042', navn: 'Lierne', slug: 'lierne', fylke: 'Trøndelag' },
  { nummer: '5043', navn: 'Røyrvik', slug: 'royrvik', fylke: 'Trøndelag' },
  { nummer: '5044', navn: 'Namsskogan', slug: 'namsskogan', fylke: 'Trøndelag' },
  { nummer: '5045', navn: 'Grong', slug: 'grong', fylke: 'Trøndelag' },
  { nummer: '5046', navn: 'Høylandet', slug: 'hoylandet', fylke: 'Trøndelag' },
  { nummer: '5047', navn: 'Overhalla', slug: 'overhalla', fylke: 'Trøndelag' },
  { nummer: '5049', navn: 'Flatanger', slug: 'flatanger', fylke: 'Trøndelag' },
  { nummer: '5052', navn: 'Leka', slug: 'leka', fylke: 'Trøndelag' },
  { nummer: '5053', navn: 'Inderøy', slug: 'inderoy', fylke: 'Trøndelag' },
  { nummer: '5054', navn: 'Indre Fosen', slug: 'indre-fosen', fylke: 'Trøndelag' },
  { nummer: '5055', navn: 'Heim', slug: 'heim', fylke: 'Trøndelag' },
  { nummer: '5056', navn: 'Hitra', slug: 'hitra', fylke: 'Trøndelag' },
  { nummer: '5057', navn: 'Ørland', slug: 'orland', fylke: 'Trøndelag' },
  { nummer: '5058', navn: 'Åfjord', slug: 'afjord', fylke: 'Trøndelag' },
  { nummer: '5059', navn: 'Orkland', slug: 'orkland', fylke: 'Trøndelag' },
  { nummer: '5060', navn: 'Nærøysund', slug: 'naeroysund', fylke: 'Trøndelag' },
  { nummer: '5061', navn: 'Rindal', slug: 'rindal', fylke: 'Trøndelag' },
  { nummer: '5501', navn: 'Tromsø', slug: 'tromso', fylke: 'Troms' },
  { nummer: '5503', navn: 'Harstad', slug: 'harstad', fylke: 'Troms' },
  { nummer: '5510', navn: 'Kvæfjord', slug: 'kvaefjord', fylke: 'Troms' },
  { nummer: '5512', navn: 'Tjeldsund', slug: 'tjeldsund', fylke: 'Troms' },
  { nummer: '5514', navn: 'Ibestad', slug: 'ibestad', fylke: 'Troms' },
  { nummer: '5516', navn: 'Gratangen', slug: 'gratangen', fylke: 'Troms' },
  { nummer: '5518', navn: 'Lavangen', slug: 'lavangen', fylke: 'Troms' },
  { nummer: '5520', navn: 'Bardu', slug: 'bardu', fylke: 'Troms' },
  { nummer: '5522', navn: 'Salangen', slug: 'salangen', fylke: 'Troms' },
  { nummer: '5524', navn: 'Målselv', slug: 'malselv', fylke: 'Troms' },
  { nummer: '5526', navn: 'Sørreisa', slug: 'sorreisa', fylke: 'Troms' },
  { nummer: '5528', navn: 'Dyrøy', slug: 'dyroy', fylke: 'Troms' },
  { nummer: '5530', navn: 'Senja', slug: 'senja', fylke: 'Troms' },
  { nummer: '5532', navn: 'Balsfjord', slug: 'balsfjord', fylke: 'Troms' },
  { nummer: '5534', navn: 'Karlsøy', slug: 'karlsoy', fylke: 'Troms' },
  { nummer: '5536', navn: 'Lyngen', slug: 'lyngen', fylke: 'Troms' },
  { nummer: '5538', navn: 'Storfjord', slug: 'storfjord', fylke: 'Troms' },
  { nummer: '5540', navn: 'Kåfjord', slug: 'kafjord', fylke: 'Troms' },
  { nummer: '5542', navn: 'Skjervøy', slug: 'skjervoy', fylke: 'Troms' },
  { nummer: '5544', navn: 'Nordreisa', slug: 'nordreisa', fylke: 'Troms' },
  { nummer: '5546', navn: 'Kvænangen', slug: 'kvaenangen', fylke: 'Troms' },
  { nummer: '5601', navn: 'Alta', slug: 'alta', fylke: 'Finnmark' },
  { nummer: '5603', navn: 'Hammerfest', slug: 'hammerfest', fylke: 'Finnmark' },
  { nummer: '5605', navn: 'Sør-Varanger', slug: 'sor-varanger', fylke: 'Finnmark' },
  { nummer: '5607', navn: 'Vadsø', slug: 'vadso', fylke: 'Finnmark' },
  { nummer: '5610', navn: 'Karasjok', slug: 'karasjok', fylke: 'Finnmark' },
  { nummer: '5612', navn: 'Kautokeino', slug: 'kautokeino', fylke: 'Finnmark' },
  { nummer: '5614', navn: 'Loppa', slug: 'loppa', fylke: 'Finnmark' },
  { nummer: '5616', navn: 'Hasvik', slug: 'hasvik', fylke: 'Finnmark' },
  { nummer: '5618', navn: 'Måsøy', slug: 'masoy', fylke: 'Finnmark' },
  { nummer: '5620', navn: 'Nordkapp', slug: 'nordkapp', fylke: 'Finnmark' },
  { nummer: '5622', navn: 'Porsanger', slug: 'porsanger', fylke: 'Finnmark' },
  { nummer: '5624', navn: 'Lebesby', slug: 'lebesby', fylke: 'Finnmark' },
  { nummer: '5626', navn: 'Gamvik', slug: 'gamvik', fylke: 'Finnmark' },
  { nummer: '5628', navn: 'Tana', slug: 'tana', fylke: 'Finnmark' },
  { nummer: '5630', navn: 'Berlevåg', slug: 'berlevag', fylke: 'Finnmark' },
  { nummer: '5632', navn: 'Båtsfjord', slug: 'batsfjord', fylke: 'Finnmark' },
  { nummer: '5634', navn: 'Vardø', slug: 'vardo', fylke: 'Finnmark' },
  { nummer: '5636', navn: 'Nesseby', slug: 'nesseby', fylke: 'Finnmark' },
];

export const POPULAERE_SOK = [
  { label: 'Elektriker Oslo',        href: '/elektriker/oslo' },
  { label: 'Rørlegger Bergen',       href: '/rorlegger/bergen' },
  { label: 'Tømrer Kristiansand',    href: '/tomrer/kristiansand' },
  { label: 'Maler Stavanger',        href: '/maler/stavanger' },
];

export function getNaeringBySlug(slug) {
  return NAERINGSKODER.find(n => n.slug === slug) || null;
}

export function getNaeringByKode(kode) {
  // Håndter underkoder for rørlegger
  if (['43.221','43.222','43.223'].includes(kode)) {
    return NAERINGSKODER.find(n => n.slug === 'rorlegger');
  }
  return NAERINGSKODER.find(n => n.kode === kode) || null;
}

export function getKommuneBySlug(slug) {
  return KOMMUNER.find(k => k.slug === slug) || null;
}

// Nøytral standardsortering: bedrifter med opplyst nettside vises først (lettere å
// undersøke før man tar kontakt), alfabetisk innad i hver gruppe. Dette er et
// reachability-signal, ikke en kvalitetsvurdering eller betalt plassering.
function sorterHjemmesideForst(a, b) {
  const aHar = a.hjemmeside ? 0 : 1;
  const bHar = b.hjemmeside ? 0 : 1;
  if (aHar !== bHar) return aHar - bHar;
  return a.navn.localeCompare(b.navn, 'no');
}

export async function getBedrifterByKategoriOgKommune(naeringslug, kommuneslug) {
  const naering = getNaeringBySlug(naeringslug);
  if (!naering) return { bedrifter: [], naering: null, kommune: null, kommuneNavn: null, total: 0 };

  const kommune = getKommuneBySlug(kommuneslug);
  if (!kommune) return { bedrifter: [], naering, kommune: null, kommuneNavn: null, total: 0 };

  // Håndter underkoder
  const koder = naeringslug === 'rorlegger'
    ? ['43.221', '43.222', '43.223']
    : [naering.kode];

  let alleBedrifter = [];
  let totalCount = 0;

  for (const kode of koder) {
    const { data, count } = await supabase
      .from('bedrifter')
      .select('*', { count: 'exact' })
      .eq('naeringskode', kode)
      .eq('kommunenummer', kommune.nummer)
      .eq('er_aktiv', true)
      .order('har_hjemmeside', { ascending: false })
      .order('navn')
      .limit(200);

    if (data) alleBedrifter = [...alleBedrifter, ...data];
    totalCount += count || 0;
  }

  // Sorter samlet liste – nettside først, alfabetisk innad
  alleBedrifter.sort(sorterHjemmesideForst);

  return {
    bedrifter: alleBedrifter,
    naering,
    kommune: kommune.navn,
    kommuneNavn: kommune.navn,
    total: totalCount,
  };
}

export async function getBedriftBySlug(slug) {
  const { data, error } = await supabase
    .from('bedrifter')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getRelaterteBedrifter(naeringskode, kommunenummer, excludeSlug) {
  // Håndter underkoder for rørlegger
  const koder = ['43.221','43.222','43.223'].includes(naeringskode)
    ? ['43.221','43.222','43.223']
    : [naeringskode];

  const { data } = await supabase
    .from('bedrifter')
    .select('*')
    .in('naeringskode', koder)
    .eq('kommunenummer', kommunenummer)
    .eq('er_aktiv', true)
    .neq('slug', excludeSlug)
    .order('har_hjemmeside', { ascending: false })
    .order('navn')
    .limit(3);

  return data || [];
}

export async function sokBedrifter({ navn, naeringskode, kommunenavn, originalTekst }) {
  const rørleggerKoder = ['43.221','43.222','43.223'];

  // Søk 1: bransje + sted
  let query1 = supabase
    .from('bedrifter')
    .select('*')
    .eq('er_aktiv', true)
    .order('har_hjemmeside', { ascending: false })
    .order('navn')
    .limit(50);

  if (naeringskode) {
    const koder = rørleggerKoder.includes(naeringskode) ? rørleggerKoder : [naeringskode];
    query1 = query1.in('naeringskode', koder);
  }
  if (kommunenavn) {
    query1 = query1.or(`kommune.ilike.${kommunenavn},poststed.ilike.${kommunenavn}`);
  }
  if (navn) query1 = query1.ilike('navn', `%${navn}%`);

  // Søk 2: direkte navn-søk på original tekst
  let query2 = supabase
    .from('bedrifter')
    .select('*')
    .eq('er_aktiv', true)
    .ilike('navn', `%${originalTekst || ''}%`)
    .order('har_hjemmeside', { ascending: false })
    .order('navn')
    .limit(20);

  const [res1, res2] = await Promise.all([query1, query2]);

  const alle = [...(res1.data || []), ...(res2.data || [])];

  // Dedupliser på organisasjonsnummer
  const sett = new Map();
  for (const b of alle) {
    if (!sett.has(b.organisasjonsnummer)) sett.set(b.organisasjonsnummer, b);
  }

  return Array.from(sett.values()).sort(sorterHjemmesideForst);
}

export async function getAntallPerNaering() {
  const result = {};

  await Promise.all(
    NAERINGSKODER.map(async (n) => {
      const koder = n.slug === 'rorlegger'
        ? ['43.221', '43.222', '43.223']
        : [n.kode];

      let total = 0;
      for (const kode of koder) {
        const { count } = await supabase
          .from('bedrifter')
          .select('*', { count: 'exact', head: true })
          .eq('naeringskode', kode)
          .eq('er_aktiv', true);
        total += count || 0;
      }
      result[n.kode] = total;
    })
  );

  return result;
}

export async function getAlleBedriftSlugs() {
  const { data } = await supabase
    .from('bedrifter')
    .select('slug')
    .eq('er_aktiv', true);
  return (data || []).map(b => b.slug);
}

// Matcher et fritekst-stedsnavn (f.eks. fra reverse-geokoding) mot vår kommuneliste
export function matchKommuneFraNavn(navn) {
  if (!navn) return null;
  return KOMMUNER.find(k => k.navn.localeCompare(navn, 'no', { sensitivity: 'base' }) === 0) || null;
}

// Henter inntil `totalMaks` bedrifter fra en kommune, spredt på flest mulig ulike bransjer
export async function getBedrifterNaerDeg(kommunenummer, totalMaks = 6) {
  const resultater = await Promise.all(
    NAERINGSKODER.map(async (naering) => {
      const koder = naering.slug === 'rorlegger'
        ? ['43.221', '43.222', '43.223']
        : [naering.kode];

      const { data } = await supabase
        .from('bedrifter')
        .select('*')
        .in('naeringskode', koder)
        .eq('kommunenummer', kommunenummer)
        .eq('er_aktiv', true)
        .order('har_hjemmeside', { ascending: false })
        .order('navn')
        .limit(1);

      return data && data[0] ? data[0] : null;
    })
  );

  return resultater.filter(Boolean).slice(0, totalMaks);
}

// Nylig stiftede, aktive bedrifter – gir forsiden et "levende database"-preg
export async function getNyligRegistrerte(limit = 6) {
  const { data } = await supabase
    .from('bedrifter')
    .select('*')
    .eq('er_aktiv', true)
    .not('stiftelsesdato', 'is', null)
    .order('stiftelsesdato', { ascending: false })
    .limit(limit);

  return data || [];
}

// De håndverkerbedriftene med flest registrerte ansatte
export async function getStorsteBedrifter(limit = 6) {
  const { data } = await supabase
    .from('bedrifter')
    .select('*')
    .eq('er_aktiv', true)
    .not('antall_ansatte', 'is', null)
    .order('antall_ansatte', { ascending: false })
    .limit(limit);

  return data || [];
}

// Lett antall-spørring (kun count, ingen rader) – brukt av håndverker-guiden på forsiden
export async function getAntallForBransjeKommune(naeringslug, kommuneslug) {
  const naering = getNaeringBySlug(naeringslug);
  const kommune = getKommuneBySlug(kommuneslug);
  if (!naering || !kommune) return 0;

  const koder = naeringslug === 'rorlegger'
    ? ['43.221', '43.222', '43.223']
    : [naering.kode];

  let total = 0;
  for (const kode of koder) {
    const { count } = await supabase
      .from('bedrifter')
      .select('*', { count: 'exact', head: true })
      .eq('naeringskode', kode)
      .eq('kommunenummer', kommune.nummer)
      .eq('er_aktiv', true);
    total += count || 0;
  }
  return total;
}
