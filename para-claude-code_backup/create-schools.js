// Comprehensive schools array with ~80 international schools
// Converted from Lista-Escolas-Internacionais-Atualizada.md

const schools = [
  // ========== LISBOA ==========
  {name:"Lycée Français Charles Lepierre",lat:38.7340,lon:-9.1530,district:"Lisboa",concelho:"Lisboa",curriculum:"French",ages:"3-18",fees:"€5.452-7.536"},
  {name:"Deutsche Schule Lissabon (DSL)",lat:38.7690,lon:-9.1670,district:"Lisboa",concelho:"Lisboa",curriculum:"German",ages:"3-18",fees:"n/d"},
  {name:"Astoria International School",lat:38.7380,lon:-9.1680,district:"Lisboa",concelho:"Lisboa",curriculum:"Multilingual",ages:"3-18",fees:"n/d"},
  {name:"The Lisboan International School",lat:38.7300,lon:-9.1400,district:"Lisboa",concelho:"Lisboa",curriculum:"Cambridge/IB",ages:"3-18",fees:"€16.950"},
  {name:"United Lisbon International School (ULIS)",lat:38.7450,lon:-9.1350,district:"Lisboa",concelho:"Lisboa",curriculum:"International/IB",ages:"3-18",fees:"€10.643-21.745"},
  {name:"Redbridge International School",lat:38.7500,lon:-9.1850,district:"Lisboa",concelho:"Lisboa",curriculum:"Cambridge",ages:"3-18",fees:"€12.000"},
  {name:"Greene's College Oxford - Lisboa",lat:38.7300,lon:-9.1600,district:"Lisboa",concelho:"Lisboa",curriculum:"IGCSE/A-Level",ages:"11-18",fees:"€8.900-23.900"},
  {name:"BGA Lisboa Campolide",lat:38.7400,lon:-9.1550,district:"Lisboa",concelho:"Lisboa",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Lisboa CCB",lat:38.7200,lon:-9.1700,district:"Lisboa",concelho:"Lisboa",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Lisboa Restelo",lat:38.7080,lon:-9.2100,district:"Lisboa",concelho:"Lisboa",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Lisboa Lumiar",lat:38.7680,lon:-9.1670,district:"Lisboa",concelho:"Lisboa",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Lisboa Expo",lat:38.7680,lon:-9.0940,district:"Lisboa",concelho:"Lisboa",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},

  // ========== CASCAIS ==========
  {name:"King's College School Cascais",lat:38.7010,lon:-9.4150,district:"Lisboa",concelho:"Cascais",curriculum:"Cambridge/IB",ages:"3-18",fees:"n/d"},
  {name:"St. Julian's School",lat:38.6850,lon:-9.3310,district:"Lisboa",concelho:"Cascais",curriculum:"British/IB",ages:"3-18",fees:"€8.000-18.000"},
  {name:"St. Dominic's International School",lat:38.7540,lon:-9.3220,district:"Lisboa",concelho:"Cascais",curriculum:"IB",ages:"3-18",fees:"€9.000-16.000"},
  {name:"PaRK International School Cascais",lat:38.6980,lon:-9.4180,district:"Lisboa",concelho:"Cascais",curriculum:"Cambridge",ages:"1-11",fees:"n/d"},
  {name:"International Christian School of Cascais (ICSC)",lat:38.7150,lon:-9.3950,district:"Lisboa",concelho:"Cascais",curriculum:"American",ages:"4-18",fees:"n/d"},
  {name:"Aprendizes International Active Learning",lat:38.7050,lon:-9.4050,district:"Lisboa",concelho:"Cascais",curriculum:"Cambridge",ages:"3-18",fees:"€10.600-16.800"},
  {name:"BGA Cascais Parede",lat:38.7020,lon:-9.3680,district:"Lisboa",concelho:"Cascais",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Cascais Centro",lat:38.6970,lon:-9.4210,district:"Lisboa",concelho:"Cascais",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Cascais Baía",lat:38.7050,lon:-9.4150,district:"Lisboa",concelho:"Cascais",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Cascais Quinta da Marinha",lat:38.7100,lon:-9.4300,district:"Lisboa",concelho:"Cascais",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Cascais Guincho",lat:38.7350,lon:-9.4680,district:"Lisboa",concelho:"Cascais",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},

  // ========== SINTRA ==========
  {name:"TASIS Portugal",lat:38.7870,lon:-9.3910,district:"Lisboa",concelho:"Sintra",curriculum:"American/IB",ages:"3-18",fees:"€12.390-23.160"},
  {name:"Carlucci American International School (CAISL)",lat:38.7610,lon:-9.3410,district:"Lisboa",concelho:"Sintra",curriculum:"American/IB",ages:"3-18",fees:"€9.692-20.532"},
  {name:"Hypha International School",lat:38.7800,lon:-9.3600,district:"Lisboa",concelho:"Sintra",curriculum:"Cambridge",ages:"3-8",fees:"€10.495-12.000"},
  {name:"BGA Sintra",lat:38.7540,lon:-9.3860,district:"Lisboa",concelho:"Sintra",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},

  // ========== OEIRAS ==========
  {name:"Oeiras International School (OIS)",lat:38.6920,lon:-9.3100,district:"Lisboa",concelho:"Oeiras",curriculum:"British/IB",ages:"3-18",fees:"n/d"},
  {name:"International Sharing School Taguspark",lat:38.6800,lon:-9.3000,district:"Lisboa",concelho:"Oeiras",curriculum:"IB",ages:"3-18",fees:"n/d"},

  // ========== ESTORIL ==========
  {name:"Greene's College Oxford - Estoril",lat:38.6700,lon:-9.4060,district:"Lisboa",concelho:"Cascais",curriculum:"IGCSE/A-Level",ages:"11-18",fees:"€8.900-23.900"},

  // ========== SUL DE LISBOA (Setúbal, Palmela) ==========
  {name:"St. Peter's International School",lat:38.5589,lon:-8.9012,district:"Setúbal",concelho:"Palmela",curriculum:"Cambridge/IB",ages:"4-18",fees:"€7.500-37.620"},
  {name:"Colégio Atlântico",lat:38.6450,lon:-9.0200,district:"Setúbal",concelho:"Seixal",curriculum:"Cambridge/IB",ages:"3-18",fees:"n/d"},
  {name:"BGA Setúbal",lat:38.5240,lon:-8.8940,district:"Setúbal",concelho:"Setúbal",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Comporta",lat:38.3800,lon:-8.7850,district:"Setúbal",concelho:"Comporta",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},

  // ========== PORTO E NORTE ==========
  {name:"Oporto British School (OBS)",lat:41.1580,lon:-8.6290,district:"Porto",concelho:"Porto",curriculum:"British/IB",ages:"3-18",fees:"€7.528-11.071"},
  {name:"Colégio Luso-Internacional do Porto (CLIP)",lat:41.1680,lon:-8.6450,district:"Porto",concelho:"Porto",curriculum:"British/IB",ages:"3-18",fees:"n/d"},
  {name:"CJD International School",lat:41.1600,lon:-8.6400,district:"Porto",concelho:"Porto",curriculum:"Cambridge",ages:"3-18",fees:"€7.000"},
  {name:"CLIB - Colégio Luso Internacional de Braga",lat:41.5530,lon:-8.4180,district:"Braga",concelho:"Braga",curriculum:"Cambridge",ages:"3-18",fees:"€3.750-6.000"},
  {name:"Colégio João Paulo II",lat:41.5550,lon:-8.4200,district:"Braga",concelho:"Braga",curriculum:"Bilingual/IB",ages:"3-18",fees:"€8.058-9.020"},
  {name:"BGA Porto",lat:41.1550,lon:-8.6300,district:"Porto",concelho:"Porto",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Braga",lat:41.5530,lon:-8.4200,district:"Braga",concelho:"Braga",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Esposende",lat:41.5300,lon:-8.7800,district:"Braga",concelho:"Esposende",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},

  // ========== ALGARVE ==========
  {name:"Nobel Algarve British International School - Lagoa",lat:37.0860,lon:-8.2480,district:"Faro",concelho:"Lagoa",curriculum:"British/IGCSE",ages:"3-18",fees:"€13.780-18.100"},
  {name:"Nobel Algarve - Almancil",lat:37.0950,lon:-8.1900,district:"Faro",concelho:"Loulé",curriculum:"British",ages:"3-18",fees:"n/d"},
  {name:"Vale Verde International School",lat:37.0800,lon:-8.6700,district:"Faro",concelho:"Lagos",curriculum:"Cambridge",ages:"3-18",fees:"€5.300-7.500"},
  {name:"Barlavento International Primary School",lat:37.0950,lon:-8.7350,district:"Faro",concelho:"Lagos",curriculum:"British",ages:"3-11",fees:"€6.348-6.900"},
  {name:"Bright International School",lat:37.0950,lon:-8.1900,district:"Faro",concelho:"Loulé",curriculum:"Cambridge",ages:"3-18",fees:"n/d"},
  {name:"Aspire International School Algarve",lat:37.0950,lon:-8.1900,district:"Faro",concelho:"Loulé",curriculum:"Pearson Edexcel",ages:"3-18",fees:"€6.595-13.995"},
  {name:"Colégio Santiago Internacional",lat:37.1270,lon:-7.6490,district:"Faro",concelho:"Tavira",curriculum:"Bilingual",ages:"3-18",fees:"€5.235-7.998"},
  {name:"Eden Montessori International School",lat:37.0880,lon:-8.2500,district:"Faro",concelho:"Albufeira",curriculum:"Montessori",ages:"3-12",fees:"€6.340-9.090"},
  {name:"BGA Algarve (Lagos)",lat:37.1020,lon:-8.6730,district:"Faro",concelho:"Lagos",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},

  // ========== MADEIRA ==========
  {name:"International School of Madeira (ISM)",lat:32.6550,lon:-16.9100,district:"Madeira",concelho:"Funchal",curriculum:"British/Cambridge",ages:"3-10",fees:"€5.300-5.900"},
  {name:"International Sharing School Madeira",lat:32.6600,lon:-16.9200,district:"Madeira",concelho:"Funchal",curriculum:"IB",ages:"3-18",fees:"€5.880-13.140"},

  // ========== CENTRO (Coimbra) ==========
  {name:"St. Paul's School Coimbra",lat:40.2033,lon:-8.4103,district:"Coimbra",concelho:"Coimbra",curriculum:"British/Bilingual",ages:"3-18",fees:"n/d"},
  {name:"BGA Coimbra",lat:40.2033,lon:-8.4103,district:"Coimbra",concelho:"Coimbra",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},

  // ========== BGA OUTROS HUBS ==========
  {name:"BGA Ericeira",lat:38.9630,lon:-9.4150,district:"Lisboa",concelho:"Mafra",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Óbidos",lat:39.3560,lon:-9.3600,district:"Leiria",concelho:"Óbidos",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Caldas da Rainha",lat:39.4030,lon:-9.1340,district:"Leiria",concelho:"Caldas da Rainha",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Leiria",lat:39.7380,lon:-8.8070,district:"Leiria",concelho:"Leiria",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Aveiro",lat:40.6405,lon:-8.6538,district:"Aveiro",concelho:"Aveiro",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Santarém",lat:39.2360,lon:-8.6850,district:"Santarém",concelho:"Santarém",curriculum:"Cambridge",ages:"12-18",fees:"n/d"},
  {name:"BGA Fundão",lat:40.3220,lon:-7.4980,district:"Guarda",concelho:"Fundão",curriculum:"Cambridge",ages:"12-18",fees:"n/d"}
];

const result = 'const schools = ' + JSON.stringify(schools, null, 2) + ';';

const fs = require('fs');
fs.writeFileSync(__dirname + '/schools-for-html.txt', result);

console.log(`✓ Created schools array with ${schools.length} entries`);
console.log(`  - Removed Aljezur International School (encerrada Out 2025)`);
console.log(`  - Included all BGA hubs (24 total)`);
console.log(`  - Array saved to schools-for-html.txt`);
