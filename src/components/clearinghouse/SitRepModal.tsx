import React from 'react';
import { zonesData } from '../../data/zonesData';
import { warehouseHubs } from '../../data/warehouseHubs';
import { Printer, X, FileText, AlertTriangle, Shield, Truck, Package, Users } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface SitRepProps {
  onClose: () => void;
}

const SitRepModal: React.FC<SitRepProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const totalAtRisk = zonesData.reduce((acc, z) => acc + z.populationAtRisk, 0);
  const totalConvoys = zonesData.reduce((acc, z) => acc + z.activeDispatches, 0);
  const criticalZones = zonesData.filter(z => z.riskLevel === 'critical' || z.riskLevel === 'severe');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-white text-slate-900 rounded-3xl shadow-2xl border-4 border-slate-200 max-w-3xl w-full p-8 relative print:border-none print:shadow-none print:max-w-none print:w-full">
        {/* Close button (hidden in print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 print:hidden transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SitRep Document Container */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white border-2 border-gadaa-gold p-1 shadow-sm">
                <img src="/Images/logo of busa gonofa.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h2 className="font-black text-lg text-slate-900 leading-tight">
                  BUUSAA GONOFAA OROMIYAA
                </h2>
                <h3 className="text-xs text-slate-600 font-semibold uppercase">
                  Disaster Risk Management & Social Security Commission
                </h3>
                <div className="text-[11px] text-slate-500">Early Warning, Emergency Operations & Logistics Directorate</div>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block bg-gadaa-red text-white text-xs font-black px-2.5 py-1 rounded">
                SITREP #2026-36
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">DATE: {currentDate}</div>
              <div className="text-[10px] text-slate-500">CYCLE: WEEKLY DISASTER DIGEST</div>
            </div>
          </div>

          {/* Key Executive Metrics */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <Users className="w-5 h-5 mx-auto text-blue-600 mb-1" />
              <div className="text-xl font-black text-slate-900">{(totalAtRisk / 1000000).toFixed(2)}M</div>
              <div className="text-[11px] text-slate-500 font-medium">Population at Risk</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <AlertTriangle className="w-5 h-5 mx-auto text-red-600 mb-1" />
              <div className="text-xl font-black text-red-600">{criticalZones.length} Zones</div>
              <div className="text-[11px] text-slate-500 font-medium">Elevated Hazard Level</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <Truck className="w-5 h-5 mx-auto text-gadaa-green mb-1" />
              <div className="text-xl font-black text-slate-900">{totalConvoys} Active</div>
              <div className="text-[11px] text-slate-500 font-medium">Relief Truck Convoys</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <Package className="w-5 h-5 mx-auto text-amber-600 mb-1" />
              <div className="text-xl font-black text-slate-900">{warehouseHubs.length} Hubs</div>
              <div className="text-[11px] text-slate-500 font-medium">Active Logistics Hubs</div>
            </div>
          </div>

          {/* Situation Summary Section */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-gadaa-green" /> 1. Executive Situation Summary
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              Seasonal meteorological evaluations indicate severe moisture deficits across southern pastoralist woredas (Borena, Guji, East Bale), causing rapid depletion of natural rangelands and strategic shallow wells. Concurrently, upper Awash Basin river discharge has surpassed stage-2 advisory thresholds, necessitating active emergency embankment monitors in Bora, Fentale, and surrounding agrarian basins. Buusaa Gonofaa logistics nodes have initiated strategic grain allocations from Adama and Shashemene central stores.
            </p>
          </div>

          {/* Critical Zones Matrix */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-red-600" /> 2. High-Priority Zonal Hotspots
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Zone Name</th>
                    <th className="p-2.5">Hazard Category</th>
                    <th className="p-2.5">Severity</th>
                    <th className="p-2.5">At-Risk Population</th>
                    <th className="p-2.5">Woredas Flagged</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {criticalZones.map(z => (
                    <tr key={z.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-800">{z.name.en}</td>
                      <td className="p-2.5 capitalize">{z.primaryRisk.replace('_', ' ')}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          z.riskLevel === 'critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {z.riskLevel.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono font-bold">{(z.populationAtRisk).toLocaleString()}</td>
                      <td className="p-2.5 text-slate-500 text-[11px]">{z.woredasAtRisk.slice(0, 3).join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Operational Sign-off */}
          <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-xs text-slate-500">
            <div>
              <div>Official Document of Busa Gonofa Oromia Commission</div>
              <div className="text-[10px]">Toll-Free Emergency Center: 8181 · Adama / Finfinnee HQ</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-800">Approved for Humanitarian Distribution</div>
              <div className="text-[10px]">Disaster Risk Management Authority (Proclamation 244/2014)</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            {language === 'om' ? 'Gabaasa SitRep Maxxansi (Print / PDF)' : 'Print / Save SitRep PDF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SitRepModal;
