import { ZoneData } from '../types';

export const zonesData: ZoneData[] = [
  {
    id: 'borena',
    name: {
      om: 'Godina Booranaa',
      en: 'Borena Zone',
      am: 'ቦረና ዞን'
    },
    region: 'South',
    capital: 'Yabelo',
    riskLevel: 'critical',
    primaryRisk: 'drought',
    populationAtRisk: 420000,
    activeDispatches: 28,
    reliefStockPercent: 68,
    lastUpdated: '10 mins ago',
    coordinates: { x: 50, y: 88 },
    woredasAtRisk: ['Moyale', 'Dhas', 'Dillo', 'Teltele', 'Yabelo', 'Arero', 'Dubluk'],
    summary: {
      om: "Hongee cimaa mudateen nyaata beeyladaa fi bishaan dhugaatii hatattamaa fe'iisa bishaanii 28n qoodamaa jira.",
      en: 'Severe prolonged drought conditions. 28 water-trucking fleets and emergency fodder distribution actively operational.',
      am: 'በከፍተኛ የድርቅ ሁኔታ ምክንያት 28 የውሃ ማመላለሻ ቦቴዎች እና የእንስሳት መኖ ስርጭት ስራዎች እየተከናወኑ ይገኛሉ።'
    }
  },
  {
    id: 'guji',
    name: {
      om: 'Godina Gujii',
      en: 'Guji Zone',
      am: 'ጉጂ ዞን'
    },
    region: 'South',
    capital: 'Negele Borana',
    riskLevel: 'severe',
    primaryRisk: 'drought',
    populationAtRisk: 290000,
    activeDispatches: 16,
    reliefStockPercent: 74,
    lastUpdated: '35 mins ago',
    coordinates: { x: 62, y: 82 },
    woredasAtRisk: ['Liban', 'Wadera', 'Gorodola', 'Saba Boru', 'Goro Dola'],
    summary: {
      om: "Bishaan dhugaatii fi deeggarsi nyaata daa'immanii aanaalee horsiise bultootaa 5 keessatti raabsamaa jira.",
      en: 'Water supplies and child nutritional supplementary feeding distributed across 5 pastoral woredas.',
      am: 'የመጠጥ ውሃ እና የህጻናት የተመጣጠነ ምግብ ድጋፍ በ 5 የአርብቶ አደር ወረዳዎች ውስጥ እየተሰራጨ ነው።'
    }
  },
  {
    id: 'east_hararghe',
    name: {
      om: 'Godina Baha Harargee',
      en: 'East Hararghe Zone',
      am: 'ምስራቅ ሐረርጌ ዞን'
    },
    region: 'East',
    capital: 'Harar',
    riskLevel: 'severe',
    primaryRisk: 'drought',
    populationAtRisk: 340000,
    activeDispatches: 22,
    reliefStockPercent: 62,
    lastUpdated: '1 hour ago',
    coordinates: { x: 82, y: 44 },
    woredasAtRisk: ['Babile', 'Gursum', 'Fedis', 'Meyu Muleqe', 'Kumbi', 'Gola Oda'],
    summary: {
      om: 'Gargaarsi midhaan nyaataa kuntaala 14,000 ol aanaalee hongeen qabamaniif qoodamaa jira.',
      en: 'Over 14,000 quintals of grain relief dispatched to drought-impacted lowland farming households.',
      am: 'ከ 14,000 ኩንታል በላይ የእህል ድጋፍ በድርቅ ለተጎዱ አርሶ አደሮች እየተሰራጨ ነው።'
    }
  },
  {
    id: 'west_hararghe',
    name: {
      om: 'Godina Dhiha Harargee',
      en: 'West Hararghe Zone',
      am: 'ምዕራብ ሐረርጌ ዞን'
    },
    region: 'East',
    capital: 'Chiro',
    riskLevel: 'watch',
    primaryRisk: 'crop_pest',
    populationAtRisk: 180000,
    activeDispatches: 11,
    reliefStockPercent: 81,
    lastUpdated: '2 hours ago',
    coordinates: { x: 74, y: 42 },
    woredasAtRisk: ['Mieso', 'Doba', 'Chiro Zuria', 'Habro', 'Boke'],
    summary: {
      om: 'Hordoffiin ilbiisota midhaanii fi qophiin midhaan wabii nyaataa taasifamaa jira.',
      en: 'Crop pest surveillance underway alongside prepositioning of emergency food grain stocks.',
      am: 'የሰብል ተባይ ቅኝት እና የአስቸኳይ ጊዜ የእህል ክምችት ዝግጅት እየተካሄደ ነው።'
    }
  },
  {
    id: 'east_shewa',
    name: {
      om: 'Godina Baha Shawaa',
      en: 'East Shewa Zone',
      am: 'ምስራቅ ሸዋ ዞን'
    },
    region: 'Central',
    capital: 'Adama',
    riskLevel: 'severe',
    primaryRisk: 'flood',
    populationAtRisk: 210000,
    activeDispatches: 19,
    reliefStockPercent: 88,
    lastUpdated: '15 mins ago',
    coordinates: { x: 55, y: 48 },
    woredasAtRisk: ['Bora', 'Adama Zuria', 'Lume', 'Dugda', 'Fentale'],
    summary: {
      om: 'Lolaa Laga Awaash hordofuun hidhawwan lolaa ijaaramaa fi buqqaatotaaf dunkaanni qoodamaa jira.',
      en: 'Awash River flood surge alert. Sandbag dikes being reinforced; emergency tent kits distributed to vulnerable riverside kebeles.',
      am: 'የአዋሽ ወንዝ ሙላት ስጋትን ተከትሎ የጎርፍ መከላከያ ግንባታና የተፈናቃዮች ድንኳን ድጋፍ እየተከናወነ ነው።'
    }
  },
  {
    id: 'west_shewa',
    name: {
      om: 'Godina Dhiha Shawaa',
      en: 'West Shewa Zone',
      am: 'ምዕራብ ሸዋ ዞን'
    },
    region: 'Central',
    capital: 'Ambo',
    riskLevel: 'normal',
    primaryRisk: 'landslide',
    populationAtRisk: 65000,
    activeDispatches: 6,
    reliefStockPercent: 92,
    lastUpdated: '3 hours ago',
    coordinates: { x: 42, y: 45 },
    woredasAtRisk: ['Toke Kutaye', 'Ambo Zuria', 'Jeldu', 'Dendi'],
    summary: {
      om: 'Haalli jireenyaa fi omisha midhaanii tasgabbaa\'aa dha; eeggannoon sigiga lafaa gaarreen keessatti godhama.',
      en: 'Agricultural productivity stable; seasonal hillside landslide monitoring in place.',
      am: 'የግብርና ምርታማነት የተረጋጋ ሲሆን በተራራማ አካባቢዎች የመሬት መንሸራተት ቅኝት ይደረጋል።'
    }
  },
  {
    id: 'north_shewa',
    name: {
      om: 'Godina Kaaba Shawaa',
      en: 'North Shewa Zone',
      am: 'ሰሜን ሸዋ ዞን'
    },
    region: 'North',
    capital: 'Fiche',
    riskLevel: 'watch',
    primaryRisk: 'displacement',
    populationAtRisk: 120000,
    activeDispatches: 9,
    reliefStockPercent: 78,
    lastUpdated: '2 hours ago',
    coordinates: { x: 48, y: 35 },
    woredasAtRisk: ['Degem', 'Kuyu', 'Wara Jarso', 'Hidabu Abote'],
    summary: {
      om: 'Lammiilee daangaa irraa buqqa\'aniif deeggarsi meeshaa mana keessaa fi nyaataa kennamaa jira.',
      en: 'Emergency food rations and non-food household kits delivered to displaced households along border woredas.',
      am: 'ከድንበር አካባቢ ለተፈናቀሉ ወገኖች የምግብና የቁሳቁስ ድጋፍ እየተሰጠ ይገኛል።'
    }
  },
  {
    id: 'south_west_shewa',
    name: {
      om: 'Godina Kibba Dhiha Shawaa',
      en: 'South West Shewa Zone',
      am: 'ደቡብ ምዕራብ ሸዋ ዞን'
    },
    region: 'Central',
    capital: 'Waliso',
    riskLevel: 'normal',
    primaryRisk: 'flood',
    populationAtRisk: 45000,
    activeDispatches: 4,
    reliefStockPercent: 95,
    lastUpdated: '4 hours ago',
    coordinates: { x: 44, y: 52 },
    woredasAtRisk: ['Waliso', 'Wolonkomi', 'Sodo Daci', 'Ameya'],
    summary: {
      om: 'Kuusaan midhaan wabii hawaasaa guutuu dha; qophiin ittisa loolaa gannaaf godhamaa jira.',
      en: 'Community grain reserves fully stocked; rainy season drainage preparedness complete.',
      am: 'የህብረተሰብ እህል ክምችት በሙሉ አቅም የተዘጋጀ ሲሆን የክረምት ጎርፍ መከላከያ ዝግጅት ተጠናቋል።'
    }
  },
  {
    id: 'arsi',
    name: {
      om: 'Godina Arsii',
      en: 'Arsi Zone',
      am: 'አርሲ ዞን'
    },
    region: 'Central',
    capital: 'Asella',
    riskLevel: 'normal',
    primaryRisk: 'landslide',
    populationAtRisk: 55000,
    activeDispatches: 5,
    reliefStockPercent: 90,
    lastUpdated: '5 hours ago',
    coordinates: { x: 57, y: 55 },
    woredasAtRisk: ['Tiyo', 'Hitosa', 'Ziway Dugda', 'Shirka'],
    summary: {
      om: 'Gombisaan Buusaa Gonofaa aanaalee keessatti hundeeffame deeggarsa laachaa jira.',
      en: 'Traditional Buusaa Gonofaa communal granaries supporting social safety net beneficiaries.',
      am: 'በባህላዊ የቡሳ ጎኖፋ ጎተራዎች አማካይነት ለማህበራዊ ዋስትና ተጠቃሚዎች ድጋፍ እየተሰጠ ነው።'
    }
  },
  {
    id: 'west_arsi',
    name: {
      om: 'Godina Dhiha Arsii',
      en: 'West Arsi Zone',
      am: 'ምዕራብ አርሲ ዞን'
    },
    region: 'Central',
    capital: 'Shashamane',
    riskLevel: 'watch',
    primaryRisk: 'flood',
    populationAtRisk: 110000,
    activeDispatches: 8,
    reliefStockPercent: 83,
    lastUpdated: '1 hour ago',
    coordinates: { x: 54, y: 64 },
    woredasAtRisk: ['Shala', 'Siraro', 'Arsi Negele', 'Kofele'],
    summary: {
      om: 'Balaa loolaa haroo Shalaa fi Shaashamannee hordofuun meeshaaleen ittisa balaa bobba\'aniiru.',
      en: 'Monitoring flash flood vulnerabilities around Lake Shala; rapid rescue teams on standby.',
      am: 'በሻላ ሃይቅ ዙሪያ የፍላሽ ጎርፍ ስጋትን በመከታተል የነፍስ አድን ቡድኖች በተጠንቀቅ ላይ ናቸው።'
    }
  },
  {
    id: 'bale',
    name: {
      om: 'Godina Baalee',
      en: 'Bale Zone',
      am: 'ባሌ ዞን'
    },
    region: 'Southeast',
    capital: 'Robe',
    riskLevel: 'severe',
    primaryRisk: 'drought',
    populationAtRisk: 260000,
    activeDispatches: 18,
    reliefStockPercent: 71,
    lastUpdated: '45 mins ago',
    coordinates: { x: 67, y: 65 },
    woredasAtRisk: ['Raytu', 'Seweyna', 'Dawe Serer', 'Ginner', 'Sinana'],
    summary: {
      om: 'Aanaalee gammoojjii keessatti gargaarsi bishaanii fi talaallii beeyladaa bobba\'eera.',
      en: 'Water trucking fleets deployed and livestock drought vaccination underway in lowland woredas.',
      am: 'በቆላማ ወረዳዎች የውሃ ማመላለሻ እና የእንስሳት ክትባት ዘመቻ እየተካሄደ ነው።'
    }
  },
  {
    id: 'east_bale',
    name: {
      om: 'Godina Baha Baalee',
      en: 'East Bale Zone',
      am: 'ምስራቅ ባሌ ዞን'
    },
    region: 'Southeast',
    capital: 'Gindir',
    riskLevel: 'critical',
    primaryRisk: 'drought',
    populationAtRisk: 310000,
    activeDispatches: 24,
    reliefStockPercent: 58,
    lastUpdated: '20 mins ago',
    coordinates: { x: 76, y: 62 },
    woredasAtRisk: ['Ginir', 'Gololcha', 'Legehida', 'Kubayo', 'Sawena'],
    summary: {
      om: 'Hongee cimaa buusaa gonofaan furuuf deeggarsi addaa Finfinnee fi Adaamaa irraa fe\'ameera.',
      en: 'High emergency priority. Emergency food convoy dispatched from central Adama logistics hub.',
      am: 'ከፍተኛ የአደጋ ደረጃ። ከአዳማ ማዕከላዊ ሎጂስቲክስ ማዕከል ተጨማሪ የእህል እርዳታ ተልኳል።'
    }
  },
  {
    id: 'jimma',
    name: {
      om: 'Godina Jimmaa',
      en: 'Jimma Zone',
      am: 'ጅማ ዞን'
    },
    region: 'West',
    capital: 'Jimma',
    riskLevel: 'normal',
    primaryRisk: 'landslide',
    populationAtRisk: 50000,
    activeDispatches: 3,
    reliefStockPercent: 94,
    lastUpdated: '3 hours ago',
    coordinates: { x: 34, y: 56 },
    woredasAtRisk: ['Gera', 'Seka Chekorsa', 'Limu Kosa', 'Mana'],
    summary: {
      om: 'Haalli qonnaa gaarii dha; deeggarsi maanguddootaa fi ijoollee harka qalleeyyii itti fufeera.',
      en: 'Strong agricultural harvest; social protection subsidies for elderly and orphans active.',
      am: 'ጥሩ የግብርና ምርት፤ ለማህበራዊ ድጋፍ ለሚሹ አረጋውያንና ህጻናት ድጎማ እየተደረገ ነው።'
    }
  },
  {
    id: 'ilu_aba_bor',
    name: {
      om: 'Godina Iluu Abbaa Boor',
      en: 'Ilu Aba Bor Zone',
      am: 'ኢሉ አባ ቦር ዞን'
    },
    region: 'West',
    capital: 'Mattu',
    riskLevel: 'normal',
    primaryRisk: 'flood',
    populationAtRisk: 38000,
    activeDispatches: 2,
    reliefStockPercent: 96,
    lastUpdated: '6 hours ago',
    coordinates: { x: 24, y: 52 },
    woredasAtRisk: ['Mattu', 'Darimu', 'Alge Sachi', 'Yayyo'],
    summary: {
      om: 'Manni kuusaa meeshaa gargaarsaa Mattuu qophii guutuu irra jira.',
      en: 'Regional emergency hub warehouse at Mattu fully prepared for contingency relief.',
      am: 'በመቱ የሚገኘው የድንገተኛ አደጋ ማዕከል ሙሉ የክምችት ዝግጅት ላይ ይገኛል።'
    }
  },
  {
    id: 'buno_bedele',
    name: {
      om: 'Godina Buunnoo Beddellee',
      en: 'Buno Bedele Zone',
      am: 'ቡኖ በደሌ ዞን'
    },
    region: 'West',
    capital: 'Bedele',
    riskLevel: 'normal',
    primaryRisk: 'landslide',
    populationAtRisk: 32000,
    activeDispatches: 2,
    reliefStockPercent: 95,
    lastUpdated: '5 hours ago',
    coordinates: { x: 30, y: 48 },
    woredasAtRisk: ['Bedele', 'Chora', 'Gechi', 'Didesa'],
    summary: {
      om: 'Sagantaan wabii nyaataa aanaalee hunda keessatti haalaan raawwatamaa jira.',
      en: 'Productive safety net and food security safety net smoothly operational.',
      am: 'የምግብ ዋስትናና ሴፍቲኔት ፕሮግራም በሁሉም ወረዳዎች በተሳካ ሁኔታ እየተከናወነ ነው።'
    }
  },
  {
    id: 'east_wollega',
    name: {
      om: 'Godina Baha Wallaggaa',
      en: 'East Wollega Zone',
      am: 'ምስራቅ ወለጋ ዞን'
    },
    region: 'West',
    capital: 'Nekemte',
    riskLevel: 'severe',
    primaryRisk: 'displacement',
    populationAtRisk: 240000,
    activeDispatches: 17,
    reliefStockPercent: 70,
    lastUpdated: '1 hour ago',
    coordinates: { x: 32, y: 40 },
    woredasAtRisk: ['Sibu Sire', 'Guto Gida', 'Sasiga', 'Leka Dulecha', 'Kiremu'],
    summary: {
      om: 'Buqqaatota deebisanii dhaabuu fi nyaata hatattamaa dhiyeessuun xiyyeeffannaan hojjetamaa jira.',
      en: 'Intensive rehabilitation of displaced families with food rations and livelihood restocking kits.',
      am: 'ተፈናቃዮችን በዘላቂነት ለማቋቋምና የምግብ እርዳታ ለማድረስ ከፍተኛ ትኩረት ተሰጥቷል።'
    }
  },
  {
    id: 'west_wollega',
    name: {
      om: 'Godina Dhiha Wallaggaa',
      en: 'West Wollega Zone',
      am: 'ምዕራብ ወለጋ ዞን'
    },
    region: 'West',
    capital: 'Gimbi',
    riskLevel: 'severe',
    primaryRisk: 'displacement',
    populationAtRisk: 220000,
    activeDispatches: 15,
    reliefStockPercent: 73,
    lastUpdated: '1 hour ago',
    coordinates: { x: 20, y: 42 },
    woredasAtRisk: ['Gimbi', 'Begi', 'Mendi', 'Boji Chokorsa', 'Lalo Asabi'],
    summary: {
      om: 'Gargaarsi yaalaa fi nyaataa aanaalee dhihaa keessatti dhaabbilee gargaarsaa waliin qindaa\'eera.',
      en: 'Emergency medical aid and food distribution coordinated with humanitarian partners.',
      am: 'የህክምናና የምግብ እርዳታ ከሰብአዊ ድርጅቶች ጋር በቅንጅት እየተከናወነ ይገኛል።'
    }
  },
  {
    id: 'horo_guduru',
    name: {
      om: 'Godina Horo Guduruu Wallaggaa',
      en: 'Horo Guduru Wollega Zone',
      am: 'ሆሮ ጉዱሩ ወለጋ ዞን'
    },
    region: 'West',
    capital: 'Shambu',
    riskLevel: 'watch',
    primaryRisk: 'displacement',
    populationAtRisk: 140000,
    activeDispatches: 10,
    reliefStockPercent: 79,
    lastUpdated: '2 hours ago',
    coordinates: { x: 36, y: 34 },
    woredasAtRisk: ['Shambu', 'Amuru', 'Jardega Jarte', 'Ababo'],
    summary: {
      om: 'Lammiilee deebi\'anii qe\'ee isaaniitti deebi\'aniif sanyiin filatamaa fi deeggarsi qonnaa kenname.',
      en: 'Returnee families supplied with certified seeds, fertilizers, and temporary shelter plastic sheets.',
      am: 'ወደ ቀያቸው ለተመለሱ ወገኖች ምርጥ ዘር፣ ማዳበሪያና የጊዜያዊ መጠለያ ፕላስቲክ ተሰራጭቷል።'
    }
  },
  {
    id: 'kelam_wollega',
    name: {
      om: 'Godina Qellem Wallaggaa',
      en: 'Kelem Wollega Zone',
      am: 'ቄለም ወለጋ ዞን'
    },
    region: 'West',
    capital: 'Dambi Dolo',
    riskLevel: 'watch',
    primaryRisk: 'displacement',
    populationAtRisk: 135000,
    activeDispatches: 8,
    reliefStockPercent: 82,
    lastUpdated: '2 hours ago',
    coordinates: { x: 15, y: 46 },
    woredasAtRisk: ['Dambi Dolo', 'Anfillo', 'Hawa Gelan', 'Yemalogi Welel'],
    summary: {
      om: 'Wabiin nyaataa fi deeggarsi fayyaa buqqaatotaaf qindoominaan kennamaa jira.',
      en: 'Food security and primary healthcare mobile clinic teams actively deployed.',
      am: 'የምግብ ዋስትና እና ተንቀሳቃሽ የጤና ክሊኒኮች ለተፈናቃዮች አገልግሎት እየሰጡ ነው።'
    }
  },
  {
    id: 'west_guji',
    name: {
      om: 'Godina Dhiha Gujii',
      en: 'West Guji Zone',
      am: 'ምዕራብ ጉጂ ዞን'
    },
    region: 'South',
    capital: 'Bule Hora',
    riskLevel: 'severe',
    primaryRisk: 'drought',
    populationAtRisk: 210000,
    activeDispatches: 14,
    reliefStockPercent: 76,
    lastUpdated: '1 hour ago',
    coordinates: { x: 52, y: 76 },
    woredasAtRisk: ['Bule Hora', 'Dugda Dawa', 'Melka Soda', 'Surro Barguda'],
    summary: {
      om: 'Bishaan dhugaatii fi deeggarsi horsiise bultootaaf kennamaa jira.',
      en: 'Clean water distribution and pastoralist safety net support ongoing.',
      am: 'የመጠጥ ውሃ አቅርቦት እና ለአርብቶ አደሩ የሚደረገው ድጋፍ ተጠናክሮ ቀጥሏል።'
    }
  },
  {
    id: 'finfinnee_special',
    name: {
      om: 'Aanaa Addaa Oromiyaa Naannawa Finfinnee',
      en: 'Oromia Special Zone Surrounding Finfinnee',
      am: 'የፊንፊኔ ዙሪያ የኦሮሚያ ልዩ ዞን'
    },
    region: 'Central',
    capital: 'Finfinnee',
    riskLevel: 'normal',
    primaryRisk: 'fire',
    populationAtRisk: 25000,
    activeDispatches: 3,
    reliefStockPercent: 98,
    lastUpdated: '4 hours ago',
    coordinates: { x: 49, y: 44 },
    woredasAtRisk: ['Burayu', 'Sululta', 'Sebeta', 'Dukem', 'Legetafo'],
    summary: {
      om: 'Giddugala gargaarsa hatattamaa fi kuusaa meeshaa bu\'uuraa ta\'uun tajaajilaa jira.',
      en: 'Strategic central logistic dispatch hub and emergency contingency warehouse.',
      am: 'የስልታዊ ድንገተኛ አደጋ እቃዎች ማዕከላዊ መጋዘን እና የሎጂስቲክስ ማስተባበሪያ ማዕከል ነው።'
    }
  }
];
