import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import {
  AlertTriangle, MapPin, Users, Truck, Package,
  TrendingUp, ArrowRight, Droplets, Wheat, Heart, Shield
} from 'lucide-react';

const COUNTER_DATA = [
  { icon: Users, labelKey: 'beneficiaries', value: '4,820,000', color: 'from-gadaa-green to-emerald-500' },
  { icon: TrendingUp, labelKey: 'activeProjects', value: '14', color: 'from-blue-600 to-blue-400' },
  { icon: Package, labelKey: 'fundsMobilized', value: 'ETB 2.8B', color: 'from-gadaa-gold to-amber-400' },
  { icon: Wheat, labelKey: 'grainReserves', value: '1.2M Qtl', color: 'from-amber-700 to-amber-500' },
  { icon: Heart, labelKey: 'livestockSaved', value: '610,000', color: 'from-gadaa-red to-rose-500' },
  { icon: Truck, labelKey: 'activeHubs', value: '5 Hubs', color: 'from-purple-600 to-purple-400' },
];

const CRISIS_QUICK_LINKS = [
  { icon: AlertTriangle, labelEn: 'Report Emergency', labelOm: 'Balaa Gabaasi', tab: 'crisis-center', color: 'bg-red-600 hover:bg-red-700' },
  { icon: MapPin, labelEn: 'Early Warning Map', labelOm: 'Kaartaa Akeekkachiisaa', tab: 'early-warning', color: 'bg-gadaa-green hover:bg-gadaa-greenDark' },
  { icon: Droplets, labelEn: 'Contribute Resources', labelOm: 'Gumaacha Godhi', tab: 'mobilization', color: 'bg-gadaa-gold hover:bg-gadaa-goldDark text-gadaa-black' },
  { icon: Shield, labelEn: 'Project Asset Map', labelOm: 'Kaartaa Pirojektii', tab: 'asset-map', color: 'bg-blue-700 hover:bg-blue-800' },
];

const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { setActiveTab } = useAppState();
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-gadaa-greenDark min-h-[80vh] flex flex-col">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(255,255,255,0.05) 40px, rgba(255,255,255,0.05) 80px)`,
        }} />
      </div>
      {/* Gadaa color orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gadaa-red/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gadaa-gold/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 flex-1 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gadaa-gold/20 border border-gadaa-gold/40 rounded-full px-3.5 py-1 text-gadaa-gold text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            <Shield className="w-4 h-4" />
            {t.hero?.badge}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            {t.hero?.title?.split(t.hero?.highlight ?? '~~')[0]}
            <span className="block text-gadaa-gold">{t.hero?.highlight}</span>
          </h1>

          <p className="text-green-100 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8 sm:mb-10">
            {t.hero?.desc}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-14">
            <button
              onClick={() => setActiveTab('crisis-center')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gadaa-red hover:bg-red-700 text-white px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-red-900/30 transition-all hover:scale-105 active:scale-95"
            >
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              {t.hero?.btnEmergency}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('mobilization')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gadaa-gold hover:bg-gadaa-goldDark text-gadaa-black px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-amber-900/30 transition-all hover:scale-105 active:scale-95"
            >
              <Package className="w-5 h-5" />
              {t.hero?.btnMobilize}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('asset-map')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
            >
              <MapPin className="w-5 h-5" />
              {t.hero?.btnAssetMap}
            </button>
          </div>

          {/* Quick action links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {CRISIS_QUICK_LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(link.tab)}
                  className={`${link.color} text-white rounded-xl px-4 py-3 text-center font-semibold text-sm flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="leading-tight">
                    {language === 'om' ? link.labelOm : link.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Collage Area */}
        <div className="hidden lg:grid grid-cols-2 gap-4 relative">
          <div className="space-y-4">
            <img src="/Images/photo_2026-08-22_22-16-28.jpg" alt="Community" className="rounded-3xl w-full h-48 object-cover shadow-xl border-4 border-white/10" />
            <img src="/Images/photo_2026-08-22_22-16-05.jpg" alt="Aid" className="rounded-3xl w-full h-64 object-cover shadow-xl border-4 border-white/10" />
          </div>
          <div className="space-y-4 pt-12">
            <img src="/Images/photo_2026-08-22_22-16-35.jpg" alt="Support" className="rounded-3xl w-full h-64 object-cover shadow-xl border-4 border-white/10" />
            <img src="/Images/photo_2026-08-22_22-16-50.jpg" alt="Distribution" className="rounded-3xl w-full h-48 object-cover shadow-xl border-4 border-white/10" />
          </div>
          
          {/* Logo overlay on the image grid */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-2xl backdrop-blur-sm">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gadaa-gold flex items-center justify-center bg-white">
               <img src="/Images/logo of busa gonofa.jpg" alt="Busa Gonofa Logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats Bar */}
      <div className="relative bg-gadaa-black/60 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {COUNTER_DATA.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  className={`text-center cursor-default transition-transform ${hoveredStat === i ? 'scale-105' : ''}`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} mb-2 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-black text-white text-lg leading-tight">{stat.value}</div>
                  <div className="text-xs text-slate-400 leading-tight mt-0.5">
                    {t.stats?.[stat.labelKey as keyof typeof t.stats]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
