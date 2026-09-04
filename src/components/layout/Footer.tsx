import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import { Phone, Mail, MapPin, ExternalLink, Shield, Globe2 } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveTab } = useAppState();

  return (
    <footer className="bg-gadaa-black text-slate-300 mt-16">
      {/* Gadaa tricolor accent strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-gadaa-black via-gadaa-red to-white" />

      <div className="max-w-screen-2xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-gadaa-gold/50 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="BG Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-extrabold text-white text-lg leading-tight">{t.siteTitle}</div>
              <div className="text-xs text-slate-400">{t.siteSubtitle}</div>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-sm">
            {t.footerAbout}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-3.5 h-3.5 text-gadaa-gold" />
            <span>{t.proclamationBadge}</span>
          </div>
          <a href="tel:8181" className="mt-4 inline-flex items-center gap-2 bg-gadaa-red hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-colors">
            <Phone className="w-4 h-4 animate-pulse" />
            {t.emergencyHotline}: {t.tollFree}
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">{t.footerLinks}</h4>
          <ul className="space-y-2.5">
            {[
              { key: 'early-warning', label: t.nav?.earlyWarning },
              { key: 'asset-map', label: t.nav?.assetMap },
              { key: 'mobilization', label: t.nav?.mobilization },
              { key: 'clearinghouse', label: t.nav?.clearinghouse },
              { key: 'careers', label: t.nav?.careers },
              { key: 'crisis-center', label: t.nav?.crisisCenter },
            ].map(item => (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-gadaa-gold transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gadaa-green" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">{t.footerContact}</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-gadaa-gold mt-0.5 flex-shrink-0" />
              <span>{t.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-gadaa-gold flex-shrink-0" />
              <span>+251 22 111 8181</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-gadaa-gold flex-shrink-0" />
              <span>info@busagonofa.gov.et</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe2 className="w-4 h-4 text-gadaa-gold flex-shrink-0" />
              <a href="#" className="hover:text-gadaa-gold transition-colors flex items-center gap-1">
                busagonofa.gov.et <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>

          {/* Gadaa tricolor badge */}
          <div className="mt-6 flex gap-1 items-center">
            <div className="h-6 w-3 rounded-sm bg-gadaa-black border border-slate-700" />
            <div className="h-6 w-3 rounded-sm bg-gadaa-red" />
            <div className="h-6 w-3 rounded-sm bg-white" />
            <span className="ml-2 text-xs text-slate-500 italic">Oromia Flag Colors</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 mb-6">
          <span>© {new Date().getFullYear()} {t.siteTitle}. {t.allRightsReserved}</span>
          <span>{t.proclamationRef}</span>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-sm font-black border-t border-slate-800 pt-6 pb-2 max-w-screen-2xl mx-auto">
          <span className="text-gadaa-gold uppercase tracking-widest text-xs mb-1 md:mb-0">System Developed By</span>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-white">
            <span className="text-base text-gadaa-green bg-gadaa-green/10 px-3 py-1 rounded-lg border border-gadaa-green/30">Worku Fikadu</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <a href="tel:+251934953593" className="hover:text-gadaa-gold transition-colors bg-white/5 px-3 py-1 rounded-lg">+251934953593</a>
            <span className="text-slate-600">/</span>
            <a href="tel:+251919639519" className="hover:text-gadaa-gold transition-colors bg-white/5 px-3 py-1 rounded-lg">+251919639519</a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a href="mailto:workufikadu643@gmail.com" className="hover:text-gadaa-gold transition-colors text-gadaa-gold bg-gadaa-gold/10 px-3 py-1 rounded-lg border border-gadaa-gold/20">workufikadu643@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
