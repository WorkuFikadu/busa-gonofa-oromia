import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Heart, Wheat, BarChart2, Users, Home } from 'lucide-react';

const PROGRAMS = [
  {
    icon: Wheat,
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-900/10',
    titleEn: 'Productive Safety Net & Food Security (PSNP)',
    titleOm: 'Sagantaa Wabii Nyaataa fi Qonnaa (PSNP)',
    titleAm: 'ፕሮዳክቲቭ ሴፍቲኔት እና የምግብ ዋስትና',
    descEn: 'Public works & conditional food/cash transfers for chronically food-insecure households across lowland and semi-arid Oromia zones.',
    beneficiaries: '2.4M+',
    zones: '16 Zones',
    pillarsEn: ['Cash/Food Transfers', 'Public Works', 'Community Asset Building', 'Livelihood Diversification'],
    image: '/Images/photo_2026-08-22_22-16-05.jpg'
  },
  {
    icon: Heart,
    color: 'from-gadaa-red to-rose-500',
    bg: 'bg-red-50 dark:bg-red-900/10',
    titleEn: 'Elderly & Disabled Social Protection',
    titleOm: 'Gargaarsa Maanguddootaa fi Qaama Miidhamtootaa',
    titleAm: 'ለአረጋውያን እና አካለ-ጎደሎ ዜጎች ማህበራዊ ድጋፍ',
    descEn: 'Monthly unconditional cash grants and non-food item kits for elderly citizens and persons with disabilities unable to participate in public works.',
    beneficiaries: '420,000+',
    zones: '21 Zones',
    pillarsEn: ['Monthly Cash Grants', 'NFI Household Kits', 'Mobile Health Clinics', 'Community Caregiver Support'],
    image: '/Images/photo_2026-08-22_22-16-42.jpg'
  },
  {
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    titleEn: 'IDP Resettlement & Durable Solutions',
    titleOm: 'Deebisanii Dhaabuu Buqqaatota fi Furmaata Wayyaa\'aa',
    titleAm: 'የተፈናቃዮች ቋሚ መፍትሄ እና ወደ ቀያቸው መመለስ',
    descEn: 'Holistic IDP return and resettlement covering housing construction, land rights restoration, seeds & tools kits, and psychosocial support.',
    beneficiaries: '340,000+',
    zones: '8 High-Risk Zones',
    pillarsEn: ['Permanent Housing Units', 'Land Rights Restoration', 'Seed & Tool Kits', 'Psychosocial Counseling'],
    image: '/Images/photo_2026-08-22_22-17-02.jpg'
  },
  {
    icon: BarChart2,
    color: 'from-gadaa-green to-emerald-500',
    bg: 'bg-gadaa-green/5',
    titleEn: 'Community Grain Banks (Gombisaa Ummataa)',
    titleOm: 'Gombisaa Ummataa (Kuusaa Midhaanii Hawaasaa)',
    titleAm: 'ማህበረሰብ እህል ጎተራ (ጎምቢሳ ኡምማታ)',
    descEn: 'Traditional Oromo communal granary modernized. Communities contribute grain during bumper harvests for distribution during lean seasons.',
    beneficiaries: '1.2M+',
    zones: '18 Zones',
    pillarsEn: ['Community Grain Deposits', 'Lean-Season Distributions', 'Rotational Livestock Restocking', 'Seed Bank Reserves'],
    image: '/Images/photo_2026-08-22_22-16-56.jpg'
  },
  {
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    titleEn: 'Child Nutrition & School Feeding',
    titleOm: 'Nyaata Daa\'immanii fi Sagantaa Nyaata Barattootaa',
    titleAm: 'የህጻናት ምግብ ደህንነት እና የት/ቤት ምገባ ፕሮግራም',
    descEn: 'CMAM acute malnutrition treatment centers, supplementary feeding for 6–59 month children, and integrated school meal programs.',
    beneficiaries: '860,000+',
    zones: '15 Zones',
    pillarsEn: ['CMAM Treatment Centers', 'Therapeutic Food (Plumpy\'Nut)', 'School Meal Programs', 'Maternal Nutrition Support'],
    image: '/Images/photo_2026-08-22_22-17-30.jpg'
  },
  {
    icon: Shield,
    color: 'from-gadaa-gold to-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/10',
    titleEn: 'Livestock Drought Resilience Package',
    titleOm: 'Karoora Dandamattummaa Beeyladaa Yeroo Hongee',
    titleAm: 'የእንስሳት ድርቅ ተቋቋሚነት ፓኬጅ',
    descEn: 'Mass livestock vaccination campaigns, emergency destocking, water trucking, supplementary fodder banks, and post-drought herd restocking grants.',
    beneficiaries: '620,000 HHs',
    zones: '7 Pastoral Zones',
    pillarsEn: ['Mass Vaccination Drives', 'Emergency Water Trucking', 'Fodder Banks', 'Herd Restocking Grants'],
    image: '/Images/photo_2026-08-22_22-17-54.jpg'
  },
];

const ProgramsSection: React.FC = () => {
  const { language } = useLanguage();
  const { setActiveTab } = useAppState();

  return (
    <section className="py-16 px-6 max-w-screen-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
          {language === 'om' ? 'Sagantaalee Wabii Nyaataa fi Eegumsa Hawaasummaa' :
           language === 'am' ? 'የማህበራዊ ዋስትና እና የምግብ ዋስትና ፕሮግራሞች' :
           'Social Security & Food Safety Net Programs'}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {language === 'om' ? 'Balaa ittisuu irraa hanga deebisanii dhaabuutti – sagantaalee mootummaan lammiilee miidhamaniif kennuu' :
           language === 'am' ? 'አደጋን አስቀድሞ ከመከላከል ጀምሮ እስከ ቋሚ ማቋቋም – ለተጎዱ ወገኖች የሚሰጡ ሁሉን ያካተቱ ፕሮግራሞች' :
           'Comprehensive framework spanning early risk reduction, emergency response, and long-term livelihood recovery.'}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROGRAMS.map((prog, i) => {
          const Icon = prog.icon;
          const title = language === 'om' ? prog.titleOm : language === 'am' ? prog.titleAm : prog.titleEn;
          return (
            <div key={i} className={`${prog.bg} rounded-2xl border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col hover:shadow-xl transition-all hover:-translate-y-1`}>
              <div className="h-48 w-full relative">
                <img src={prog.image} alt={prog.titleEn} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${prog.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1 gap-4">
                <h3 className="font-black text-slate-800 dark:text-white text-lg leading-tight">{title}</h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">{prog.descEn}</p>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white/70 dark:bg-white/10 rounded-xl py-2">
                    <div className="font-black text-gadaa-green">{prog.beneficiaries}</div>
                    <div className="text-xs text-slate-500">Beneficiaries</div>
                  </div>
                  <div className="bg-white/70 dark:bg-white/10 rounded-xl py-2">
                    <div className="font-black text-blue-600">{prog.zones}</div>
                    <div className="text-xs text-slate-500">Coverage</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Core Pillars</div>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.pillarsEn.map((p, j) => (
                      <span key={j} className="text-xs bg-white/60 dark:bg-white/10 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-600">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-gadaa-greenDark via-gadaa-green to-emerald-600 rounded-3xl p-8 text-center">
        <div className="text-white/80 text-sm mb-2">Indigenous Cultural Heritage</div>
        <h3 className="font-black text-white text-2xl md:text-3xl mb-4">
          {language === 'om' ? '"Buusaa Gonofaan bula, horaa bulaa, deebanaa guddaa!"' :
           '"Rooted in Gadaa. Sustained by Solidarity. Resilient by Design."'}
        </h3>
        <p className="text-green-100 max-w-2xl mx-auto text-sm mb-6">
          {language === 'om'
            ? 'Aadaa gargaarsa walqixxeessaa ganamaa Oromoo haaromsun lammiilee miliyoona lakkaaw\'amaniif tajaajilaa jirra.'
            : 'Modernizing the ancient Gadaa mutual solidarity system to serve millions across Oromia through law, technology, and community trust.'}
        </p>
        <button
          onClick={() => setActiveTab('mobilization')}
          className="bg-gadaa-gold hover:bg-gadaa-goldDark text-gadaa-black px-8 py-3.5 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-xl"
        >
          {language === 'om' ? 'Gumaacha Godhi — Sagantaa Deeggaruu' : 'Contribute to Our Programs'}
        </button>
      </div>
    </section>
  );
};

export default ProgramsSection;
