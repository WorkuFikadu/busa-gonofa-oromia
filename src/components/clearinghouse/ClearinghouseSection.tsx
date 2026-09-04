import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { documentsData } from '../../data/documentsData';
import { vacanciesData } from '../../data/vacanciesData';
import { ClearinghouseDocument, Vacancy } from '../../types';
import {
  Search, Download, FileText, Scale, BarChart2,
  Newspaper, Globe, Briefcase, MapPin, Clock, Users,
  ChevronRight, X, ExternalLink, CheckCircle2, Send
} from 'lucide-react';

const CATEGORY_LABELS: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  proclamation: { label: 'Proclamation', icon: Scale, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
  regulation: { label: 'Regulation', icon: FileText, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
  sitrep: { label: 'Situation Report', icon: BarChart2, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
  risk_assessment: { label: 'Guideline / SOP', icon: Globe, color: 'text-gadaa-green bg-gadaa-green/10' },
  press_release: { label: 'Press Release', icon: Newspaper, color: 'text-red-600 bg-red-100 dark:bg-red-900/30' },
};

const DocumentCard: React.FC<{ doc: ClearinghouseDocument }> = ({ doc }) => {
  const { getLocalized } = useLanguage();
  const cat = CATEGORY_LABELS[doc.category];
  const Icon = cat.icon;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-gadaa-green/40 hover:shadow-lg transition-all p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cat.color}`}>{cat.label}</span>
            {doc.isOfficialGazette && <span className="text-xs bg-gadaa-gold/20 text-gadaa-goldDark px-2 py-0.5 rounded-full font-bold">Official Gazette</span>}
          </div>
          <h3 className="font-bold text-slate-800 dark:text-white text-sm leading-tight">{getLocalized(doc.title)}</h3>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{getLocalized(doc.summary)}</p>
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{doc.publishDate}</span>
        <span>{doc.documentNumber}</span>
      </div>
      <button className="flex items-center justify-center gap-2 w-full bg-gadaa-green/10 hover:bg-gadaa-green/20 text-gadaa-green py-2.5 rounded-xl font-bold text-xs transition-colors">
        <Download className="w-4 h-4" /> Download PDF ({doc.fileSize})
      </button>
    </div>
  );
};

const VacancyModal: React.FC<{ vacancy: Vacancy; onClose: () => void }> = ({ vacancy, onClose }) => {
  const { getLocalized, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', cover: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-start justify-between">
          <div>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 inline-block ${
              vacancy.employmentType === 'Emergency Rapid Response' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>{vacancy.employmentType}</span>
            <h2 className="font-black text-lg text-slate-900 dark:text-white leading-tight">{getLocalized(vacancy.title)}</h2>
            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{vacancy.dutyStation}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{vacancy.positionsOpen} positions</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
            <Clock className="w-4 h-4" />
            Application Deadline: {vacancy.deadline}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{getLocalized(vacancy.description)}</p>

          <div>
            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-2">Requirements</h4>
            <ul className="space-y-1.5">
              {vacancy.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-gadaa-green mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 border-t border-slate-100 dark:border-slate-700 pt-4">
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300">Submit Application</h4>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Full Name *" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-green/50" />
              <div className="grid grid-cols-2 gap-3">
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Email Address *" className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-green/50" />
                <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Phone Number *" className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-green/50" />
              </div>
              <textarea required value={form.cover} onChange={e => setForm({...form, cover: e.target.value})} placeholder="Cover Letter / Motivation Statement..." rows={4} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 resize-none" />
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-700/50 rounded-xl px-3 py-2">
                <ExternalLink className="w-3.5 h-3.5" />
                Attach CV and credentials via email to: <span className="font-semibold text-gadaa-green">careers@busagonofa.gov.et</span>
              </div>
              <button type="submit" className="w-full bg-gadaa-green text-white py-3 rounded-xl font-bold text-sm hover:bg-gadaa-greenDark transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Application
              </button>
            </form>
          ) : (
            <div className="text-center bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h3 className="font-black text-lg text-slate-900 dark:text-white mb-1">Application Submitted!</h3>
              <p className="text-sm text-slate-500">Thank you, {form.name}. The HR team will contact you within 5–7 business days.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ClearinghouseSection: React.FC = () => {
  const { t, language, getLocalized } = useLanguage();
  const [view, setView] = useState<'documents' | 'careers'>('documents');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string>('all');
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  const filteredDocs = documentsData.filter(d => {
    const title = getLocalized(d.title).toLowerCase();
    const matchSearch = title.includes(search.toLowerCase()) || d.documentNumber.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || d.category === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <section className="py-16 px-6 max-w-screen-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          {view === 'documents' ? t.clearinghouse?.title : t.careers?.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {view === 'documents' ? t.clearinghouse?.subtitle : t.careers?.subtitle}
        </p>
      </div>

      {/* View toggle */}
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-fit mx-auto mb-8 gap-1">
        <button
          onClick={() => setView('documents')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${view === 'documents' ? 'bg-white dark:bg-slate-700 text-gadaa-green shadow' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          <FileText className="w-4 h-4" /> {language === 'om' ? 'Galmee & Seera' : 'Documents & Law'}
        </button>
        <button
          onClick={() => setView('careers')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${view === 'careers' ? 'bg-white dark:bg-slate-700 text-gadaa-green shadow' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
        >
          <Briefcase className="w-4 h-4" /> {language === 'om' ? 'Beeksisa Hojii' : 'Careers & Vacancies'}
        </button>
      </div>

      {view === 'documents' && (
        <>
          {/* Search & filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.clearinghouse?.searchPlaceholder}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gadaa-green/50 text-sm"
              />
            </div>
            <select
              value={catFilter}
              onChange={e => setCatFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gadaa-green/50"
            >
              <option value="all">{t.clearinghouse?.categoryFilter || 'All Categories'}</option>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          {/* Featured Proclamation Banner */}
          <div className="bg-gradient-to-r from-gadaa-greenDark to-gadaa-green rounded-2xl p-6 mb-6 flex items-center gap-4 max-w-3xl mx-auto">
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Scale className="w-7 h-7 text-gadaa-gold" />
            </div>
            <div className="flex-1">
              <div className="text-gadaa-gold font-bold text-xs mb-1">FOUNDATIONAL LEGAL ACT</div>
              <div className="text-white font-black text-base leading-tight">{t.clearinghouse?.proclamationHighlight}</div>
              <div className="text-green-200 text-xs mt-0.5">Official Oromia Negarit Gazeta · {language === 'om' ? 'Barruu Seera Mootummaa Naannoo' : 'Regional Parliament'}</div>
            </div>
            <button className="flex items-center gap-2 bg-gadaa-gold hover:bg-gadaa-goldDark text-gadaa-black px-4 py-2.5 rounded-xl font-bold text-sm transition-colors flex-shrink-0">
              <Download className="w-4 h-4" /> PDF
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {filteredDocs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
            {filteredDocs.length === 0 && (
              <div className="col-span-full text-center py-16 text-slate-500">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No documents match your search.</p>
              </div>
            )}
          </div>
        </>
      )}

      {view === 'careers' && (
        <div className="max-w-4xl mx-auto space-y-4">
          {vacanciesData.map(vacancy => (
            <div
              key={vacancy.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-gadaa-green/40 hover:shadow-lg transition-all p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gadaa-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-gadaa-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mb-2 ${
                        vacancy.employmentType === 'Emergency Rapid Response'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : vacancy.employmentType === 'Contract'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>{vacancy.employmentType}</span>
                      <h3 className="font-black text-slate-800 dark:text-white leading-tight">{getLocalized(vacancy.title)}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-slate-500">Positions Open</div>
                      <div className="font-black text-2xl text-gadaa-green">{vacancy.positionsOpen}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{vacancy.dutyStation}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{vacancy.department}</span>
                    <span className="flex items-center gap-1 text-red-600 font-semibold"><Clock className="w-3.5 h-3.5" />Deadline: {vacancy.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <button
                  onClick={() => setSelectedVacancy(vacancy)}
                  className="flex items-center gap-2 bg-gadaa-green hover:bg-gadaa-greenDark text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors"
                >
                  {t.careers?.applyNow} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVacancy && (
        <VacancyModal vacancy={selectedVacancy} onClose={() => setSelectedVacancy(null)} />
      )}
    </section>
  );
};

export default ClearinghouseSection;
