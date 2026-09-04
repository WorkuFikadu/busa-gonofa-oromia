import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { zonesData } from '../../data/zonesData';
import { ZoneData, AlertSeverity, DisasterCategory } from '../../types';
import {
  Droplets, Flame, AlertTriangle, Bug,
  Milk, Users, ChevronRight, Filter, X, Clock, Truck, Package
} from 'lucide-react';

const SEVERITY_CONFIG: Record<AlertSeverity, {
  label: string; labelOm: string; labelAm: string;
  dot: string; badge: string; ring: string; pulse: boolean;
}> = {
  normal: { label: 'Normal', labelOm: 'Nagaa', labelAm: 'ሰላም', dot: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300', ring: 'border-emerald-400', pulse: false },
  watch: { label: 'Watch', labelOm: 'Eeggannoo', labelAm: 'ጥንቃቄ', dot: 'bg-amber-400', badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300', ring: 'border-amber-400', pulse: false },
  severe: { label: 'Severe', labelOm: 'Cimaa', labelAm: 'ከፍተኛ', dot: 'bg-orange-500', badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300', ring: 'border-orange-500', pulse: true },
  critical: { label: 'Critical', labelOm: 'Balaa Olaanaa', labelAm: 'ናርናሪ', dot: 'bg-red-600', badge: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300', ring: 'border-red-600', pulse: true },
};

const RISK_ICONS: Record<DisasterCategory, React.ElementType> = {
  drought: Flame, flood: Droplets, landslide: AlertTriangle,
  fire: Flame, displacement: Users, crop_pest: Bug,
  livestock_disease: Milk, other: AlertTriangle,
};

const ZoneCard: React.FC<{ zone: ZoneData; onSelect: (z: ZoneData) => void }> = ({ zone, onSelect }) => {
  const { language, getLocalized } = useLanguage();
  const cfg = SEVERITY_CONFIG[zone.riskLevel];
  const Icon = RISK_ICONS[zone.primaryRisk];
  return (
    <div
      onClick={() => onSelect(zone)}
      className={`cursor-pointer rounded-2xl border-2 ${cfg.ring} bg-white dark:bg-slate-800 p-4 hover:shadow-xl transition-all hover:scale-[1.02] group`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">{getLocalized(zone.name)}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{zone.capital}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${cfg.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />
            {language === 'om' ? cfg.labelOm : language === 'am' ? cfg.labelAm : cfg.label}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
          zone.riskLevel === 'critical' ? 'bg-red-100 dark:bg-red-900/30' :
          zone.riskLevel === 'severe' ? 'bg-orange-100 dark:bg-orange-900/30' :
          'bg-slate-100 dark:bg-slate-700'
        }`}>
          <Icon className={`w-4 h-4 ${
            zone.riskLevel === 'critical' ? 'text-red-600' :
            zone.riskLevel === 'severe' ? 'text-orange-500' :
            'text-slate-500'
          }`} />
        </div>
        <span className="text-xs text-slate-600 dark:text-slate-300 capitalize">{zone.primaryRisk.replace('_', ' ')}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div>
          <div className="font-bold text-slate-800 dark:text-white text-sm">{(zone.populationAtRisk / 1000).toFixed(0)}K</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">At Risk</div>
        </div>
        <div>
          <div className="font-bold text-slate-800 dark:text-white text-sm flex items-center justify-center gap-1">
            <Truck className="w-3 h-3 text-gadaa-green" />{zone.activeDispatches}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Convoys</div>
        </div>
        <div>
          <div className="font-bold text-slate-800 dark:text-white text-sm">{zone.reliefStockPercent}%</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Stock</div>
        </div>
      </div>

      {/* Stock bar */}
      <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-3">
        <div
          className={`h-full rounded-full transition-all ${
            zone.reliefStockPercent < 60 ? 'bg-red-500' :
            zone.reliefStockPercent < 80 ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${zone.reliefStockPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{zone.lastUpdated}</span>
        <span className="text-gadaa-green font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
          Details <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

const ZoneModal: React.FC<{ zone: ZoneData; onClose: () => void }> = ({ zone, onClose }) => {
  const { language, getLocalized } = useLanguage();
  const cfg = SEVERITY_CONFIG[zone.riskLevel];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 ${cfg.ring} w-full max-w-lg max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        <div className={`p-5 border-b ${cfg.ring} border-b-2`}>
          <div className="flex items-start justify-between">
            <div>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 mb-2 ${cfg.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />
                {language === 'om' ? cfg.labelOm : language === 'am' ? cfg.labelAm : cfg.label}
              </span>
              <h2 className="font-black text-xl text-slate-900 dark:text-white">{getLocalized(zone.name)}</h2>
              <p className="text-slate-500 text-sm">{zone.capital} · {zone.region} Oromia</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{getLocalized(zone.summary)}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { Icon: Users, label: 'Population at Risk', value: zone.populationAtRisk.toLocaleString() },
              { Icon: Truck, label: 'Active Convoys', value: zone.activeDispatches },
              { Icon: Package, label: 'Relief Stock', value: `${zone.reliefStockPercent}%` },
            ].map((item, i) => (
              <div key={i} className="text-center bg-white dark:bg-slate-700 rounded-xl p-3 border border-slate-100 dark:border-slate-600">
                <item.Icon className="w-5 h-5 mx-auto mb-1 text-gadaa-green" />
                <div className="font-bold text-slate-800 dark:text-white text-base">{item.value}</div>
                <div className="text-xs text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">Woredas at Elevated Risk</h4>
            <div className="flex flex-wrap gap-1.5">
              {zone.woredasAtRisk.map(w => (
                <span key={w} className="text-xs bg-gadaa-green/10 text-gadaa-green px-2.5 py-1 rounded-full font-medium">{w}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
            <Clock className="w-3.5 h-3.5" />
            <span>Last updated: {zone.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EarlyWarningSection: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [riskFilter, setRiskFilter] = useState<AlertSeverity | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = zonesData.filter(z => {
    const matchesRisk = riskFilter === 'all' || z.riskLevel === riskFilter;
    const name = language === 'om' ? z.name.om : language === 'am' ? z.name.am : z.name.en;
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || z.capital.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const counts = {
    critical: zonesData.filter(z => z.riskLevel === 'critical').length,
    severe: zonesData.filter(z => z.riskLevel === 'severe').length,
    watch: zonesData.filter(z => z.riskLevel === 'watch').length,
    normal: zonesData.filter(z => z.riskLevel === 'normal').length,
  };

  return (
    <section className="py-16 px-6 max-w-screen-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">{t.ewSectionTitle}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">{t.ewSectionSubtitle}</p>
      </div>

      {/* Summary badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { key: 'critical' as const, label: language === 'om' ? 'Balaa Olaanaa' : 'Critical', color: 'bg-red-600', count: counts.critical },
          { key: 'severe' as const, label: language === 'om' ? 'Cimaa' : 'Severe', color: 'bg-orange-500', count: counts.severe },
          { key: 'watch' as const, label: language === 'om' ? 'Eeggannoo' : 'Watch', color: 'bg-amber-400', count: counts.watch },
          { key: 'normal' as const, label: language === 'om' ? 'Nagaa' : 'Normal', color: 'bg-emerald-500', count: counts.normal },
        ].map(item => (
          <button
            key={item.key}
            onClick={() => setRiskFilter(riskFilter === item.key ? 'all' : item.key)}
            className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
              riskFilter === item.key ? `border-current bg-current/5` : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
            </div>
            <span className="font-black text-lg text-slate-900 dark:text-white">{item.count}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={`${language === 'om' ? 'Godina barbaadaa...' : language === 'am' ? 'ዞን ፈልግ...' : 'Search zone or capital...'}`}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm"
          />
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
        {riskFilter !== 'all' && (
          <button onClick={() => setRiskFilter('all')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
            <X className="w-4 h-4" /> Clear Filter
          </button>
        )}
      </div>

      {/* Zone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(zone => (
          <ZoneCard key={zone.id} zone={zone} onSelect={setSelectedZone} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No zones match current filters</p>
        </div>
      )}

      {selectedZone && <ZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} />}
    </section>
  );
};

export default EarlyWarningSection;
