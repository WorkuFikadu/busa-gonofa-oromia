import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { infrastructureProjects } from '../../data/infrastructureProjects';
import { InfrastructureProject, AssetCategory } from '../../types';
import {
  Droplets, Warehouse, HeartPulse, Home, Wheat,
  X, Building2, Users, Calendar, CheckCircle2,
  HardHat, Filter
} from 'lucide-react';

const CATEGORY_CONFIG: Record<AssetCategory, { icon: React.ElementType; label: string; color: string; bgColor: string }> = {
  water_pipeline: { icon: Droplets, label: 'Water Infrastructure', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  storage_grain: { icon: Warehouse, label: 'Grain Storage', color: 'text-amber-600', bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
  livestock_clinic: { icon: HeartPulse, label: 'Livestock Clinic', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  idp_shelter: { icon: Home, label: 'IDP Housing', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
  food_complex: { icon: Wheat, label: 'Food Complex', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
};

const STATUS_CONFIG = {
  planning: { label: 'Planning', badge: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
  under_construction: { label: 'Under Construction', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
  commissioned: { label: 'Commissioned', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  operational: { label: 'Operational', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' },
};

// Oromia Zone SVG paths — approximate geographic shapes for each zone
const ZONE_PATHS: { id: string; name: string; d: string; labelX: number; labelY: number }[] = [
  { id: 'west_wollega', name: 'W. Welega', d: 'M30,88 L50,78 L55,85 L48,100 L30,105 Z', labelX: 40, labelY: 93 },
  { id: 'kellem_wollega', name: 'Kellem Welega', d: 'M25,105 L30,105 L48,100 L45,115 L28,118 Z', labelX: 36, labelY: 110 },
  { id: 'west_guji', name: 'W. Guji', d: 'M220,255 L250,240 L270,255 L260,275 L230,280 Z', labelX: 245, labelY: 262 },
  { id: 'horo_guduru', name: 'Horo Guduru', d: 'M80,75 L105,65 L115,78 L100,90 L78,88 Z', labelX: 95, labelY: 78 },
  { id: 'east_wollega', name: 'E. Welega', d: 'M55,85 L80,75 L78,88 L100,90 L95,105 L65,110 L48,100 Z', labelX: 72, labelY: 96 },
  { id: 'buno_bedele', name: 'Buno Bedele', d: 'M45,115 L65,110 L75,125 L58,138 L40,132 Z', labelX: 58, labelY: 125 },
  { id: 'jimma', name: 'Jimma', d: 'M58,138 L75,125 L95,130 L100,150 L80,160 L60,155 Z', labelX: 80, labelY: 143 },
  { id: 'ilu_aba_bor', name: 'Ilu Aba Bor', d: 'M28,118 L45,115 L40,132 L58,138 L50,155 L28,148 Z', labelX: 40, labelY: 135 },
  { id: 'north_shewa', name: 'N. Shewa', d: 'M115,78 L150,62 L170,72 L160,90 L135,95 L120,90 Z', labelX: 142, labelY: 80 },
  { id: 'west_shewa', name: 'W. Shewa', d: 'M100,90 L120,90 L135,95 L130,115 L110,120 L95,105 Z', labelX: 115, labelY: 105 },
  { id: 'sw_shewa', name: 'SW. Shewa', d: 'M95,105 L110,120 L105,140 L90,142 L80,130 Z', labelX: 98, labelY: 126 },
  { id: 'special_zone', name: 'Finfinnee\nSurrounding', d: 'M155,88 L170,85 L175,98 L165,105 L152,100 Z', labelX: 163, labelY: 95 },
  { id: 'east_shewa', name: 'E. Shewa', d: 'M160,90 L190,82 L210,95 L200,115 L175,120 L165,105 Z', labelX: 185, labelY: 102 },
  { id: 'arsi', name: 'Arsi', d: 'M175,120 L200,115 L215,130 L210,150 L185,155 L170,140 Z', labelX: 192, labelY: 135 },
  { id: 'west_arsi', name: 'W. Arsi', d: 'M130,115 L170,140 L185,155 L175,175 L145,178 L120,160 L105,140 Z', labelX: 148, labelY: 155 },
  { id: 'west_hararghe', name: 'W. Hararghe', d: 'M210,95 L245,80 L260,95 L250,115 L230,120 L215,110 Z', labelX: 235, labelY: 100 },
  { id: 'east_hararghe', name: 'E. Hararghe', d: 'M260,95 L295,78 L310,90 L305,115 L280,125 L260,118 L250,115 Z', labelX: 280, labelY: 102 },
  { id: 'bale', name: 'Bale', d: 'M210,150 L250,140 L275,155 L270,185 L240,195 L210,185 Z', labelX: 240, labelY: 168 },
  { id: 'east_bale', name: 'E. Bale', d: 'M275,155 L310,145 L320,170 L310,195 L280,200 L270,185 Z', labelX: 295, labelY: 175 },
  { id: 'guji', name: 'Guji', d: 'M210,185 L240,195 L270,185 L265,215 L240,225 L215,220 L195,205 Z', labelX: 235, labelY: 205 },
  { id: 'borena', name: 'Borena', d: 'M195,205 L215,220 L240,225 L250,240 L220,255 L190,250 L175,235 L180,215 Z', labelX: 215, labelY: 238 },
];

// Simple interactive SVG map of Oromia with project pins
const OromiaProjectMap: React.FC<{
  projects: InfrastructureProject[];
  selected: string | null;
  onSelect: (id: string) => void;
  filterCat: AssetCategory | 'all';
}> = ({ projects, selected, onSelect, filterCat }) => {
  const filtered = filterCat === 'all' ? projects : projects.filter(p => p.category === filterCat);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    <div className="relative bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
      <div className="absolute inset-0">
        <svg viewBox="0 0 340 300" className="absolute inset-0 w-full h-full">
          {/* Zone shapes */}
          {ZONE_PATHS.map(zone => (
            <g key={zone.id}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              <path
                d={zone.d}
                fill={hoveredZone === zone.id ? 'rgba(13,107,62,0.5)' : 'rgba(13,107,62,0.15)'}
                stroke="rgba(230,161,23,0.5)"
                strokeWidth="1"
                className="transition-all duration-200 cursor-pointer"
              />
              {/* Zone labels */}
              <text
                x={zone.labelX}
                y={zone.labelY}
                textAnchor="middle"
                className="pointer-events-none select-none"
                fill={hoveredZone === zone.id ? '#e6a117' : 'rgba(255,255,255,0.5)'}
                fontSize="6"
                fontWeight="600"
              >
                {zone.name.split('\n').map((line, i) => (
                  <tspan key={i} x={zone.labelX} dy={i === 0 ? 0 : 7}>{line}</tspan>
                ))}
              </text>
            </g>
          ))}

          {/* Hovered zone tooltip */}
          {hoveredZone && (() => {
            const zone = ZONE_PATHS.find(z => z.id === hoveredZone);
            if (!zone) return null;
            return (
              <g>
                <rect
                  x={zone.labelX - 30} y={zone.labelY - 22}
                  width="60" height="14" rx="3"
                  fill="rgba(0,0,0,0.85)"
                />
                <text x={zone.labelX} y={zone.labelY - 13} textAnchor="middle" fill="#e6a117" fontSize="7" fontWeight="bold">
                  {zone.name.replace('\n', ' ')}
                </text>
              </g>
            );
          })()}
        </svg>

        {/* Project Pins — positioned using percentage coordinates */}
        {filtered.map(proj => {
          const cfg = CATEGORY_CONFIG[proj.category];
          const Icon = cfg.icon;
          const isSelected = selected === proj.id;

          return (
            <button
              key={proj.id}
              onClick={() => onSelect(proj.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${proj.coordinates.x}%`, top: `${proj.coordinates.y}%` }}
            >
              <div className={`relative transition-all ${isSelected ? 'scale-150 z-20' : 'scale-100 hover:scale-125 z-10'}`}>
                {/* Pulsing ring for under-construction */}
                {proj.status === 'under_construction' && (
                  <div className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping" />
                )}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 ${
                  isSelected ? 'bg-white border-gadaa-gold' : 'bg-gadaa-greenDark border-gadaa-gold/70 hover:border-gadaa-gold'
                }`}>
                  <Icon className={`w-4 h-4 ${isSelected ? cfg.color : 'text-white'}`} />
                </div>
                {/* Completion label */}
                <div className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-gadaa-gold text-gadaa-black' : 'bg-black/70 text-white'
                }`}>
                  {proj.completionPercentage}%
                </div>
              </div>
            </button>
          );
        })}

        {/* Map legend */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm rounded-xl p-3 text-xs text-white space-y-1.5">
          {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => {
            const Icon = cfg.icon;
            return (
              <div key={cat} className="flex items-center gap-2">
                <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                <span className="text-slate-300">{cfg.label}</span>
              </div>
            );
          })}
        </div>

        {/* Map watermark */}
        <div className="absolute top-3 right-3 text-xs text-white/30 font-bold">OROMIA REGION</div>
      </div>
    </div>
  );
};

const ProjectDetailModal: React.FC<{ project: InfrastructureProject; onClose: () => void }> = ({ project, onClose }) => {
  const { getLocalized } = useLanguage();
  const cfg = CATEGORY_CONFIG[project.category];
  const statusCfg = STATUS_CONFIG[project.status];
  const Icon = cfg.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Project image */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img src={project.imageUrl} alt={project.name.en} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white p-1.5 rounded-lg backdrop-blur-sm">
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusCfg.badge}`}>{statusCfg.label}</span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${cfg.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${cfg.color}`} />
            </div>
            <div>
              <h2 className="font-black text-lg text-slate-900 dark:text-white leading-tight">{getLocalized(project.name)}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{project.zoneName}</p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{getLocalized(project.description)}</p>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-400">Execution Progress</span>
              <span className={project.completionPercentage === 100 ? 'text-emerald-600' : 'text-gadaa-gold'}>
                {project.completionPercentage}%
              </span>
            </div>
            <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  project.completionPercentage === 100 ? 'bg-emerald-500' :
                  project.completionPercentage >= 80 ? 'bg-gadaa-green' : 'bg-gadaa-gold'
                }`}
                style={{ width: `${project.completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Building2, label: 'Allocated Budget', value: `ETB ${(project.budgetETB / 1000000).toFixed(1)}M` },
              { icon: Users, label: 'Beneficiaries', value: project.beneficiariesCount.toLocaleString() },
              { icon: HardHat, label: 'Contractor', value: project.contractor, small: true },
              { icon: Calendar, label: 'Last Inspection', value: project.lastInspectionDate },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </div>
                <div className={`font-bold text-slate-800 dark:text-white ${item.small ? 'text-xs' : 'text-sm'}`}>{item.value}</div>
              </div>
            ))}
          </div>

          {project.completionPercentage === 100 && (
            <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Project fully commissioned and operational
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AssetMapSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState<AssetCategory | 'all'>('all');
  const [detailProject, setDetailProject] = useState<InfrastructureProject | null>(null);

  const handleSelectPin = (id: string) => {
    setSelectedId(id);
    setDetailProject(infrastructureProjects.find(p => p.id === id) || null);
  };

  return (
    <section className="py-16 px-6 max-w-screen-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">{t.assetMap?.title}</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t.assetMap?.subtitle}</p>
      </div>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <button
          onClick={() => setFilterCat('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            filterCat === 'all'
              ? 'bg-gadaa-green text-white border-gadaa-green shadow'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-gadaa-green/50'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          {t.assetMap?.filterAll}
        </button>
        {Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => {
          const Icon = cfg.icon;
          return (
            <button
              key={cat}
              onClick={() => setFilterCat(cat as AssetCategory)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filterCat === cat
                  ? `${cfg.bgColor} ${cfg.color} border-current shadow`
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-gadaa-green/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cfg.label}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Map */}
        <div className="lg:col-span-3">
          <OromiaProjectMap
            projects={infrastructureProjects}
            selected={selectedId}
            onSelect={handleSelectPin}
            filterCat={filterCat}
          />
          <p className="text-xs text-center text-slate-500 mt-2">Click any pin for full project details</p>
        </div>

        {/* Project list */}
        <div className="lg:col-span-2 space-y-3 max-h-[520px] overflow-y-auto pr-1">
          {infrastructureProjects
            .filter(p => filterCat === 'all' || p.category === filterCat)
            .map(proj => {
              const cfg = CATEGORY_CONFIG[proj.category];
              const Icon = cfg.icon;
              const statusCfg = STATUS_CONFIG[proj.status];
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelectPin(proj.id)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition-all hover:shadow-md ${
                    selectedId === proj.id
                      ? 'border-gadaa-green bg-gadaa-green/5 dark:bg-gadaa-green/10'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-gadaa-green/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${cfg.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4.5 h-4.5 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-slate-800 dark:text-white leading-tight truncate">{proj.name.en}</div>
                      <div className="text-xs text-slate-500 mb-1.5">{proj.zoneName}</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gadaa-green rounded-full" style={{ width: `${proj.completionPercentage}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gadaa-green">{proj.completionPercentage}%</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${statusCfg.badge}`}>{statusCfg.label}</span>
                  </div>
                </button>
              );
          })}
        </div>
      </div>

      {detailProject && <ProjectDetailModal project={detailProject} onClose={() => setDetailProject(null)} />}
    </section>
  );
};

export default AssetMapSection;
