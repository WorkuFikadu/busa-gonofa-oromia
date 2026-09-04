import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import { zonesData } from '../../data/zonesData';
import { IncidentReport, DisasterCategory } from '../../types';
import {
  AlertTriangle, Droplets, Flame,
  Users, Bug, CheckCircle2, Clock, Search,
  ChevronRight, Send
} from 'lucide-react';

const generateId = () => Math.random().toString(36).slice(2, 11).toUpperCase();
const generateTicket = () => `BG-2026-${Math.floor(1000 + Math.random() * 8999)}`;

const CATEGORY_OPTIONS: { value: DisasterCategory; label: string; labelOm: string; icon: React.ElementType }[] = [
  { value: 'drought', label: 'Drought / Water Shortage', labelOm: 'Hongee / Bishaan Dhabuu', icon: Flame },
  { value: 'flood', label: 'Flood / Flash Flood', labelOm: 'Lola / Lola Hatattamaa', icon: Droplets },
  { value: 'landslide', label: 'Landslide', labelOm: 'Sigiga Lafaa', icon: AlertTriangle },
  { value: 'fire', label: 'Wildfire / Structure Fire', labelOm: 'Ibiddaa', icon: Flame },
  { value: 'displacement', label: 'Displacement / Conflict', labelOm: 'Buqqa\'insa / Walitti Bu\'insa', icon: Users },
  { value: 'crop_pest', label: 'Crop Pest / Locust', labelOm: 'Ilbiisota Midhaanii', icon: Bug },
  { value: 'livestock_disease', label: 'Livestock Disease Outbreak', labelOm: 'Dhukkuba Beeyladaa', icon: AlertTriangle },
  { value: 'other', label: 'Other Emergency', labelOm: 'Balaa Biroo', icon: AlertTriangle },
];

const STATUS_STEPS: IncidentReport['status'][] = ['pending', 'verified', 'dispatched', 'resolved'];

const STATUS_CONFIG = {
  pending: { label: 'Pending Verification', labelOm: 'Qorannoo Eegaa', color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-900/20', icon: Clock },
  verified: { label: 'Verified by Zonal Desk', labelOm: 'Mirkanaa\'eera', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20', icon: CheckCircle2 },
  dispatched: { label: 'Relief Convoy Dispatched', labelOm: 'Gargaarsi Bobba\'eera', color: 'text-gadaa-green', bg: 'bg-gadaa-green/10', icon: ChevronRight },
  resolved: { label: 'Resolved & Stabilized', labelOm: 'Xumurame', color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/20', icon: CheckCircle2 },
};

const CrisisCenterSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { incidents, addIncident } = useAppState();
  const [tab, setTab] = useState<'report' | 'track'>('report');
  const [trackCode, setTrackCode] = useState('');
  const [trackedIncident, setTrackedIncident] = useState<IncidentReport | null>(null);
  const [trackError, setTrackError] = useState(false);
  const [submitted, setSubmitted] = useState<IncidentReport | null>(null);

  const [form, setForm] = useState({
    category: 'drought' as DisasterCategory,
    severity: 'high' as IncidentReport['severity'],
    zoneId: 'borena',
    woreda: '',
    kebele: '',
    specificLocation: '',
    affectedPeopleEstimated: '',
    description: '',
    reporterName: '',
    reporterPhone: '',
    reporterRole: 'citizen' as IncidentReport['reporterRole'],
    urgentNeedsInput: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticket = generateTicket();
    const incident: IncidentReport = {
      id: `inc-${generateId()}`,
      ticketNumber: ticket,
      category: form.category,
      severity: form.severity,
      zoneId: form.zoneId,
      woreda: form.woreda,
      kebele: form.kebele,
      specificLocation: form.specificLocation,
      affectedPeopleEstimated: Number(form.affectedPeopleEstimated) || 0,
      description: form.description,
      reporterName: form.reporterName,
      reporterPhone: form.reporterPhone,
      reporterRole: form.reporterRole,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      urgentNeeds: form.urgentNeedsInput.split(',').map(s => s.trim()).filter(Boolean),
    };
    addIncident(incident);
    setSubmitted(incident);
  };

  const handleTrack = () => {
    const found = incidents.find(inc => inc.ticketNumber.toUpperCase() === trackCode.toUpperCase());
    if (found) {
      setTrackedIncident(found);
      setTrackError(false);
    } else {
      setTrackedIncident(null);
      setTrackError(true);
    }
  };

  return (
    <section className="py-16 px-6 max-w-screen-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
          <AlertTriangle className="w-4 h-4 animate-pulse" />
          {language === 'om' ? 'Giddugala Balaa Hatattamaa' : language === 'am' ? 'የአደጋ ምላሽ ማዕከል' : 'Emergency Crisis Center'}
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">
          {language === 'om' ? t.reportTitle : language === 'am' ? t.reportTitle : t.reportTitle}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">{t.reportSubtitle}</p>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-fit mx-auto mb-8 gap-1">
        <button
          onClick={() => { setTab('report'); setSubmitted(null); }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${tab === 'report' ? 'bg-white dark:bg-slate-700 text-gadaa-red shadow' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          <Send className="w-4 h-4" />
          {language === 'om' ? 'Gabaasa Haaraa' : 'Submit Report'}
        </button>
        <button
          onClick={() => setTab('track')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${tab === 'track' ? 'bg-white dark:bg-slate-700 text-gadaa-green shadow' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          <Search className="w-4 h-4" />
          {language === 'om' ? 'Gabaasa Hordofi' : 'Track Response'}
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        {tab === 'report' && (
          !submitted ? (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-5 shadow-sm">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.formCategory}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CATEGORY_OPTIONS.map(cat => {
                    const Icon = cat.icon;
                    return (
                      <button
                        type="button"
                        key={cat.value}
                        onClick={() => setForm({ ...form, category: cat.value })}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-sm transition-all text-left ${
                          form.category === cat.value
                            ? 'border-gadaa-red bg-red-50 dark:bg-red-900/10 text-gadaa-red'
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-gadaa-red/40'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs font-semibold leading-tight">{language === 'om' ? cat.labelOm : cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t.formSeverity}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['low', 'medium', 'high', 'critical'] as const).map(sev => (
                    <button
                      type="button"
                      key={sev}
                      onClick={() => setForm({ ...form, severity: sev })}
                      className={`py-2 rounded-xl border-2 text-xs font-bold capitalize transition-all ${
                        form.severity === sev
                          ? sev === 'critical' ? 'border-red-600 bg-red-600 text-white'
                          : sev === 'high' ? 'border-orange-500 bg-orange-500 text-white'
                          : sev === 'medium' ? 'border-amber-500 bg-amber-500 text-white'
                          : 'border-slate-500 bg-slate-500 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">{t.formZone}</label>
                  <select
                    value={form.zoneId}
                    onChange={e => setForm({ ...form, zoneId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50"
                  >
                    {zonesData.map(z => (
                      <option key={z.id} value={z.id}>{language === 'om' ? z.name.om : language === 'am' ? z.name.am : z.name.en}</option>
                    ))}
                  </select>
                </div>
                <input required value={form.woreda} onChange={e => setForm({ ...form, woreda: e.target.value })} placeholder={`${t.formWoreda} *`} className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50 self-end" />
                <input value={form.kebele} onChange={e => setForm({ ...form, kebele: e.target.value })} placeholder={t.formKebele} className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50" />
                <input value={form.specificLocation} onChange={e => setForm({ ...form, specificLocation: e.target.value })} placeholder={t.formLocationDetail} className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50" />
              </div>

              <input type="number" value={form.affectedPeopleEstimated} onChange={e => setForm({ ...form, affectedPeopleEstimated: e.target.value })} placeholder={t.formPeopleAffected} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50" />

              <textarea
                required
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder={`${t.formDescription} *`}
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50 resize-none"
              />

              <input value={form.urgentNeedsInput} onChange={e => setForm({ ...form, urgentNeedsInput: e.target.value })} placeholder={`${t.formUrgentNeeds} (comma-separated: Water, Food, Shelter...)`} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50" />

              {/* Reporter info */}
              <div className="grid sm:grid-cols-3 gap-3">
                <input required value={form.reporterName} onChange={e => setForm({ ...form, reporterName: e.target.value })} placeholder={`${t.formReporterName} *`} className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50" />
                <input required value={form.reporterPhone} onChange={e => setForm({ ...form, reporterPhone: e.target.value })} placeholder={`${t.formReporterPhone} *`} className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50" />
                <select value={form.reporterRole} onChange={e => setForm({ ...form, reporterRole: e.target.value as IncidentReport['reporterRole'] })} className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-red/50">
                  {[
                    { value: 'citizen', label: language === 'om' ? 'Lammii' : 'Citizen' },
                    { value: 'local_leader', label: language === 'om' ? 'Hoggansa Aanaa' : 'Local Leader' },
                    { value: 'volunteer', label: language === 'om' ? 'Tola Ooltaa' : 'Volunteer' },
                    { value: 'ngo_partner', label: 'NGO / Partner' },
                  ].map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>

              <button type="submit" className="w-full bg-gadaa-red hover:bg-red-700 text-white py-4 rounded-xl font-black text-base transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-red-900/30">
                <AlertTriangle className="w-5 h-5" />
                {t.btnSubmitReport}
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gadaa-green shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-gadaa-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-gadaa-green" />
              </div>
              <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">{t.reportSuccessTitle}</h3>
              <p className="text-slate-500 text-sm mb-6">{t.reportSuccessMessage}</p>
              <div className="bg-gadaa-green/5 dark:bg-gadaa-green/10 border border-gadaa-green/30 rounded-2xl p-5 mb-6">
                <div className="text-xs text-slate-500 mb-1">{t.yourTicketNumber}</div>
                <div className="font-black text-3xl text-gadaa-green tracking-wider">{submitted.ticketNumber}</div>
                <div className="text-xs text-slate-500 mt-2">Save this code to track your report status</div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-left">
                {[
                  { label: 'Category', value: submitted.category },
                  { label: 'Zone', value: submitted.zoneId },
                  { label: 'Status', value: '🟡 Pending Verification' },
                  { label: 'Submitted', value: new Date(submitted.createdAt).toLocaleString() },
                ].map((row, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                    <div className="text-xs text-slate-500">{row.label}</div>
                    <div className="font-bold text-slate-800 dark:text-white capitalize text-sm">{row.value.replace('_', ' ')}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setSubmitted(null); setTab('track'); setTrackCode(submitted.ticketNumber); }}
                className="mt-6 w-full border-2 border-gadaa-green text-gadaa-green py-3 rounded-xl font-bold text-sm hover:bg-gadaa-green/5 transition-colors"
              >
                Track This Report
              </button>
            </div>
          )
        )}

        {tab === 'track' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5">
              <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">{t.trackReportSubtitle}</h3>
              <div className="flex gap-3">
                <input
                  value={trackCode}
                  onChange={e => setTrackCode(e.target.value)}
                  placeholder={t.ticketPlaceholder}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 focus:border-gadaa-green"
                  onKeyDown={e => e.key === 'Enter' && handleTrack()}
                />
                <button
                  onClick={handleTrack}
                  className="bg-gadaa-green hover:bg-gadaa-greenDark text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                >
                  <Search className="w-4 h-4" /> {t.btnTrack}
                </button>
              </div>
              {trackError && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Ticket not found. Please check the code and try again.
                </p>
              )}
            </div>

            {trackedIncident && (() => {
              const currentStep = STATUS_STEPS.indexOf(trackedIncident.status);
              const cfg = STATUS_CONFIG[trackedIncident.status];
              const CfgIcon = cfg.icon;
              return (
                <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gadaa-green/30 shadow-lg p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-black text-xl text-gadaa-green font-mono">{trackedIncident.ticketNumber}</div>
                      <div className="text-xs text-slate-500">{new Date(trackedIncident.createdAt).toLocaleString()}</div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${cfg.bg} ${cfg.color} text-sm font-bold`}>
                      <CfgIcon className="w-4 h-4" />
                      {language === 'om' ? cfg.labelOm : cfg.label}
                    </div>
                  </div>

                  {/* Progress tracker */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-2 min-w-full">
                    {STATUS_STEPS.map((s, i) => {
                      const isDone = i <= currentStep;
                      return (
                        <React.Fragment key={s}>
                          <div className={`flex flex-col items-center ${i === currentStep ? 'scale-110' : ''}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border-2 ${
                              isDone ? 'bg-gadaa-green border-gadaa-green text-white' : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-400'
                            }`}>{isDone ? '✓' : i + 1}</div>
                            <div className={`text-xs mt-1 capitalize text-center w-16 leading-tight ${isDone ? 'text-gadaa-green font-semibold' : 'text-slate-400'}`}>
                              {s.replace('_', ' ')}
                            </div>
                          </div>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mb-4 ${i < currentStep ? 'bg-gadaa-green' : 'bg-slate-200 dark:bg-slate-700'}`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: 'Zone', value: zonesData.find(z => z.id === trackedIncident.zoneId)?.name.en || trackedIncident.zoneId },
                      { label: 'Woreda', value: trackedIncident.woreda },
                      { label: 'Category', value: trackedIncident.category.replace('_', ' ') },
                      { label: 'Severity', value: trackedIncident.severity },
                    ].map((r, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                        <div className="text-xs text-slate-500">{r.label}</div>
                        <div className="font-bold text-slate-800 dark:text-white capitalize">{r.value}</div>
                      </div>
                    ))}
                  </div>

                  {trackedIncident.statusNotes && (
                    <div className="bg-gadaa-green/5 dark:bg-gadaa-green/10 border border-gadaa-green/20 rounded-xl p-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-gadaa-green">Response Notes: </span>
                      {trackedIncident.statusNotes}
                    </div>
                  )}

                  {trackedIncident.urgentNeeds.length > 0 && (
                    <div>
                      <div className="text-xs font-bold text-slate-500 mb-1.5">Urgent Needs Identified</div>
                      <div className="flex flex-wrap gap-1.5">
                        {trackedIncident.urgentNeeds.map(need => (
                          <span key={need} className="text-xs bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2.5 py-1 rounded-full font-medium">{need}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* All recent incidents */}
            <div className="mt-6">
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-3">Recent Incident Reports</h4>
              <div className="space-y-2">
                {incidents.slice(0, 5).map(inc => {
                  const cfg = STATUS_CONFIG[inc.status];
                  return (
                    <button
                      key={inc.id}
                      onClick={() => { setTrackCode(inc.ticketNumber); setTrackedIncident(inc); }}
                      className="w-full flex items-center justify-between bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 hover:border-gadaa-green/40 transition-colors text-left"
                    >
                      <div>
                        <span className="font-mono font-bold text-gadaa-green text-sm">{inc.ticketNumber}</span>
                        <div className="text-xs text-slate-500">{inc.woreda} · {inc.category.replace('_', ' ')}</div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                        {language === 'om' ? cfg.labelOm : cfg.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CrisisCenterSection;
