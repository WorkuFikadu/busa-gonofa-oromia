import { Vacancy } from '../types';

export const vacanciesData: Vacancy[] = [
  {
    id: 'vac-001',
    title: {
      om: 'Ogeessa Xiinxala Sodaa Balaa fi Akeekkachiisa Dursoo',
      en: 'Senior Disaster Risk & Early Warning Analyst',
      am: 'ከፍተኛ የአደጋ ስጋት ትንተና እና የቅድመ ማስጠንቀቂያ ባለሙያ'
    },
    department: 'Early Warning & Climate Intelligence Directorate',
    zone: 'East Shewa (Adama HQ)',
    dutyStation: 'Adama Head Office',
    employmentType: 'Full-Time',
    positionsOpen: 3,
    deadline: '2026-09-15',
    requirements: [
      'MSc/BSc in Meteorology, GIS & Remote Sensing, Disaster Risk Management, or Hydrology',
      'Minimum 4+ years in agro-meteorological forecasting & GIS hazard modeling',
      'Proficiency in Afaan Oromoo and English is mandatory'
    ],
    description: {
      om: 'Ragaa haala qilleensaa, roobaa fi lafaa walitti qabuun akeekkachiisa dursoo godinoota 21tiif qindeessuu fi gabaasa teeknikaa qopheessuu.',
      en: 'Lead spatial climate monitoring, flood/drought simulation algorithms, and synthesize bi-weekly early warning advisories for regional leadership.',
      am: 'የአየር ንብረትና የሳተላይት መረጃዎችን በመተንተን ለ 21 ዞኖች የቅድመ ማስጠንቀቂያ መረጃዎችን ማዘጋጀትና ማሰራጨት።'
    }
  },
  {
    id: 'vac-002',
    title: {
      om: 'Qindeessaa Kuusaa fi Lojistikii Gargaarsa Hatattamaa',
      en: 'Zonal Emergency Warehouse & Logistics Officer',
      am: 'የዞን ድንገተኛ አደጋ መጋዘንና ሎጂስቲክስ አስተባባሪ'
    },
    department: 'Emergency Relief & Supply Chain Directorate',
    zone: 'Borena Zone (Yabelo Hub)',
    dutyStation: 'Yabelo Warehouse Depot',
    employmentType: 'Full-Time',
    positionsOpen: 2,
    deadline: '2026-09-10',
    requirements: [
      'BA/BSc in Supply Chain Management, Logistics, Accounting, or Economics',
      'Experience with computerized warehouse management systems (WMS) & food aid logistics',
      'Strong field operations and crisis team leadership skills'
    ],
    description: {
      om: 'Midhaan, bishaan fi meeshaalee gargaarsaa Buusaa Gonofaan sassaabaman galmeessuu, qulqullina eeguu fi qoodiinsa aanaaleetiif qindeessuu.',
      en: 'Oversee physical receipt, manifest verification, QA testing, and secure fleet dispatch of grains, medical supplies, and water trucking units.',
      am: 'የሚገቡ የእርዳታ እህሎችና ቁሳቁሶችን መመዝገብ፣ ክምችት መቆጣጠር እና ለተጎጂ ወረዳዎች ስርጭትን ማስተባበር።'
    }
  },
  {
    id: 'vac-003',
    title: {
      om: 'Ogeessa Nyaataa fi Fayyaa Hawaasaa Yeroo Balaa',
      en: 'Emergency Public Health & Nutrition Specialist',
      am: 'የአስቸኳይ ጊዜ የተመጣጠነ ምግብና የህብረተሰብ ጤና ባለሙያ'
    },
    department: 'Social Security & Humanitarian Protection',
    zone: 'Bale & East Bale Zones',
    dutyStation: 'Ginir Mobile Operations Unit',
    employmentType: 'Emergency Rapid Response',
    positionsOpen: 4,
    deadline: '2026-09-05',
    requirements: [
      'BSc/MSc in Public Health, Human Nutrition, or Nursing',
      'Experience in CMAM (Community Management of Acute Malnutrition) and emergency relief kits',
      'Willingness to travel to remote pastoral kebeles'
    ],
    description: {
      om: 'Daa\'imman, haadholii fi maanguddoota hongeen miidhamaniif nyaata madaalawaa fi deeggarsa yaalaa qindeessuu.',
      en: 'Deploy with mobile emergency units to assess malnutrition rates, manage supplementary food rations, and supervise emergency medical supplies.',
      am: 'በድርቅ ለተጎዱ ህጻናትና እናቶች የተመጣጠነ ምግብ አቅርቦትና የህክምና ድጋፍን ማስተባበር።'
    }
  },
  {
    id: 'vac-004',
    title: {
      om: 'Hojjataa Qindeessa Qabeenyaa fi Wal-gargaarsa Buusaa Gonofaa',
      en: 'Resource Mobilization & Diaspora Partnerships Coordinator',
      am: 'የሀብት ማሰባሰብ እና የዳያስፖራ ግንኙነት አስተባባሪ'
    },
    department: 'Resource Mobilization & Public Solidarity Directorate',
    zone: 'Finfinnee Central Liaison',
    dutyStation: 'Finfinnee Liaison Office',
    employmentType: 'Contract',
    positionsOpen: 2,
    deadline: '2026-09-20',
    requirements: [
      'BA in Public Relations, International Relations, Marketing, or Development Studies',
      'Proven experience in donor relations, crowdfunding campaigns, or diaspora engagement',
      'Excellent multilingual communication skills'
    ],
    description: {
      om: 'Duula gumaacha Buusaa Gonofaa biyya keessaa fi diyaaspooraa qindeessuu, dhaabbilee dhuunfaa waliin michoomsa uumuu.',
      en: 'Lead diaspora crowdfunding drives, institutional grant writing, private sector corporate solidarity matching, and transparent reporting.',
      am: 'የሀገር ውስጥና የዳያስፖራ የገቢ ማሰባሰብ ዘመቻዎችን መምራትና ከለጋሽ ድርጅቶች ጋር አጋርነት መፍጠር።'
    }
  }
];
