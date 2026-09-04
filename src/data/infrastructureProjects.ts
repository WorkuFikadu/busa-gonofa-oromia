import { InfrastructureProject } from '../types';

export const infrastructureProjects: InfrastructureProject[] = [
  {
    id: 'proj-001',
    name: {
      om: "Pirojektii Bo'oo Bishaanii fi Humna Solaarii Booranaa",
      en: 'Borena Deep-Well Solar Water Pipeline Network',
      am: 'የቦረና ጥልቅ ጉድጓድ የሶላር ውሃ መስመር ዝርጋታ'
    },
    zoneId: 'borena',
    zoneName: 'Borena Zone (Yabelo & Dillo)',
    category: 'water_pipeline',
    budgetETB: 185000000,
    completionPercentage: 88,
    beneficiariesCount: 145000,
    contractor: 'Oromia Water Works Construction Enterprise (OWWCE)',
    status: 'under_construction',
    coordinates: { x: 48, y: 86 },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?auto=format&fit=crop&w=800&q=80',
    lastInspectionDate: '2026-08-14',
    description: {
      om: 'Bishaan dhugaatii qulqulluu boolla gadi fagoo 6 irraa humna solaariin harkisuun horsiise bultootaa fi beeylada kuma 145 tajaajiluu dandeessisu.',
      en: 'Solar-powered multi-station water supply extracting from 6 deep boreholes, serving over 145,000 pastoralists and livestock across drought corridors.',
      am: 'ከ 6 ጥልቅ የከርሰ ምድር ጉድጓዶች በሶላር ሃይል ውሃ በማውጣት ለ 145,000 አርብቶ አደሮችና እንስሳት ንጹህ መጠጥ ውሃ የሚያቀርብ ፕሮጀክት።'
    }
  },
  {
    id: 'proj-002',
    name: {
      om: 'Giddugala Kuusaa fi Gombisaa Nyaata Wabii Adaamaa',
      en: 'Adama Strategic Grain Storage & Food Complex (Gombisaa)',
      am: 'የአዳማ ስልታዊ የእህል ማከማቻና ምግብ ኮምፕሌክስ'
    },
    zoneId: 'east_shewa',
    zoneName: 'East Shewa (Adama Central Logistics)',
    category: 'storage_grain',
    budgetETB: 320000000,
    completionPercentage: 96,
    beneficiariesCount: 650000,
    contractor: 'Busa Gonofa Engineering Directorate',
    status: 'operational',
    coordinates: { x: 56, y: 47 },
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    lastInspectionDate: '2026-08-18',
    description: {
      om: 'Manni kuusaa ammayyaa kuntaala 500,000 qabatu, sirna qilleensa to\'atuun midhaan teeffii fi qamadii waggootaaf osoo hin badin tursiisuu danda\'u.',
      en: '500,000 quintal temperature-controlled grain storage facility serving as the regional strategic emergency food bank for rapid dispatch.',
      am: '500,000 ኩንታል እህል በዘመናዊ የሙቀት መቆጣጠሪያ ማከማቸት የሚችል እና ለድንገተኛ አደጋዎች ፈጣን ምላሽ የሚሰጥ ማዕከላዊ መጋዘን።'
    }
  },
  {
    id: 'proj-003',
    name: {
      om: 'Giddugala Yaalaa fi Talaallii Beeyladaa Baalee',
      en: 'Bale Pastoralist Livestock Drought Clinic & Feed Center',
      am: 'የባሌ አርብቶ አደር የእንስሳት ህክምና እና መኖ ማዕከል'
    },
    zoneId: 'bale',
    zoneName: 'Bale Zone (Ginir & Raytu)',
    category: 'livestock_clinic',
    budgetETB: 94000000,
    completionPercentage: 74,
    beneficiariesCount: 82000,
    contractor: 'Horn Agricultural & Disaster Resilience Corp',
    status: 'under_construction',
    coordinates: { x: 69, y: 64 },
    imageUrl: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80',
    lastInspectionDate: '2026-08-09',
    description: {
      om: "Giddugala talaallii, wal'aansa fi kuusaa nyaata beeyladaa yeroo hongee loonii fi gaalota kuma 80 ol baraaruuf ijaaramaa jiru.",
      en: 'Integrated veterinary diagnostic laboratory and hydroponic fodder bank protecting herds of cattle and camels against severe dry spells.',
      am: 'በድርቅ ወቅት ከ 80 ሺህ በላይ እንስሳትን ለመታደግ የተገነባ ዘመናዊ የእንስሳት ምርመራ ላቦራቶሪና የመኖ ማከማቻ ማዕከል።'
    }
  },
  {
    id: 'proj-004',
    name: {
      om: 'Manni Jireenyaa fi Deebisanii Dhaabuu Buqqaatota Baha Wallaggaa',
      en: 'East Wollega Resettlement & Integrated Community Village',
      am: 'የምስራቅ ወለጋ ተፈናቃዮች መልሶ ማቋቋሚያ የተቀናጀ መንደር'
    },
    zoneId: 'east_wollega',
    zoneName: 'East Wollega (Nekemte Zuria)',
    category: 'idp_shelter',
    budgetETB: 240000000,
    completionPercentage: 92,
    beneficiariesCount: 110000,
    contractor: 'Oromia Construction Authority & UNHCR Collaboration',
    status: 'operational',
    coordinates: { x: 31, y: 39 },
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    lastInspectionDate: '2026-08-16',
    description: {
      om: 'Manneen jireenyaa 1,200, manneen barumsaa fi giddugala fayyaa buqqaatota deebi\'anii dhaabuuf ijaarame.',
      en: '1,200 resilient family housing units, accompanied by a primary health center, school, and artisan training workshops for returnees.',
      am: '1,200 የመኖሪያ ቤቶች፣ አንደኛ ደረጃ ት/ቤት እና የጤና ኬላ ያካተተ የተፈናቃዮች ቋሚ የመልሶ ማቋቋሚያ መንደር።'
    }
  },
  {
    id: 'proj-005',
    name: {
      om: 'Hidhawwan Ittisa Loolaa Sulula Laga Awaash',
      en: 'Awash River Basin Flood Defense Dykes & Drainage Canals',
      am: 'የአዋሽ ተፋሰስ የጎርፍ መከላከያ ግድቦችና ቦዮች'
    },
    zoneId: 'east_shewa',
    zoneName: 'East Shewa (Bora & Dugda Woredas)',
    category: 'water_pipeline',
    budgetETB: 145000000,
    completionPercentage: 81,
    beneficiariesCount: 95000,
    contractor: 'Oromia Irrigation Development Commission',
    status: 'under_construction',
    coordinates: { x: 53, y: 50 },
    imageUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80',
    lastInspectionDate: '2026-08-20',
    description: {
      om: 'Daandii fi hidhaa loolaa km 32 lolaa laga Awaash irraa gandoota qonnaan bultootaa 14 baraaru.',
      en: '32 km of reinforced earthen embankment dykes and diversion canals protecting 14 agrarian kebeles from seasonal overflow.',
      am: '14 የገጠር ቀበሌዎችን ከአዋሽ ወንዝ ሙላት የሚከላከሉ 32 ኪ.ሜ ርዝመት ያላቸው ግድቦችና አቅጣጫ ማስቀየሪያ ቦዮች።'
    }
  },
  {
    id: 'proj-006',
    name: {
      om: 'Gombisaa Aadaa fi Kuusaa Qamadii Arsii',
      en: 'Arsi Modernized Communal Granary & Seed Bank (Gombisaa)',
      am: 'የአርሲ ዘመናዊ የህብረተሰብ ጎተራና የዘር ባንክ'
    },
    zoneId: 'arsi',
    zoneName: 'Arsi Zone (Tiyo & Hitosa)',
    category: 'storage_grain',
    budgetETB: 78000000,
    completionPercentage: 100,
    beneficiariesCount: 160000,
    contractor: 'Oromia Agricultural Bureau Co-op',
    status: 'commissioned',
    coordinates: { x: 58, y: 56 },
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    lastInspectionDate: '2026-08-01',
    description: {
      om: 'Gombisaa Buusaa Gonofaa aadaa bu\'uureffate kan sanyii filatamaa fi midhaan wabii nyaataa qonnaan bultootaaf kuusu.',
      en: 'State-of-the-art communal silo network storing drought-resistant certified wheat seeds and reserve rations.',
      am: 'ድርቅን የሚቋቋሙ ምርጥ ዘሮችንና የመጠባበቂያ እህልን ለገበሬዎች የሚያከማች ዘመናዊ የህብረተሰብ ጎተራ።'
    }
  }
];
