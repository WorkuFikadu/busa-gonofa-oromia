import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAppState } from '../../context/AppStateContext';
import { AlertTriangle, ChevronRight, Phone, Menu, X, Globe2, Shield, Sun, Moon, Download, Smartphone, Share2 } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const LANG_OPTIONS = [
  { code: 'om' as const, label: 'Afaan Oromoo', flag: '🟢🔴⬜' },
  { code: 'en' as const, label: 'English', flag: '🇬🇧' },
  { code: 'am' as const, label: 'አማርኛ', flag: '🇪🇹' },
];

const NAV_ITEMS = [
  { key: 'home', label: (t: any) => t.nav?.home },
  { key: 'early-warning', label: (t: any) => t.nav?.earlyWarning },
  { key: 'asset-map', label: (t: any) => t.nav?.assetMap },
  { key: 'mobilization', label: (t: any) => t.nav?.mobilization },
  { key: 'volunteer', label: (t: any) => t.nav?.volunteer || 'Volunteer' },
  { key: 'clearinghouse', label: (t: any) => t.nav?.clearinghouse },
  { key: 'careers', label: (t: any) => t.nav?.careers },
  { key: 'crisis-center', label: (t: any) => t.nav?.crisisCenter },
];

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const { language, setLanguage, t } = useLanguage();
  const { activeTab, setActiveTab, tickerActive, currentUser } = useAppState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      if (isIOS) {
        setShowIOSModal(true);
      } else {
        alert(language === 'om' ? "App Fe'achuuf menu browser keessanii 'Add to Home Screen' ykn 'Install App' filadhaa." : "To install, open your browser menu and select 'Add to Home Screen' or 'Install App'.");
      }
    }
  };

  return (
    <>
      {/* Emergency Ticker */}
      {tickerActive && (
        <div className="bg-red-700 text-white py-2 overflow-hidden relative z-50">
          <div className="flex items-center gap-3 px-4">
            <span className="flex-shrink-0 flex items-center gap-2 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 animate-pulse" />
              {t.ticker?.defaultText?.split(':')[0]}:
            </span>
            <div className="overflow-hidden flex-1">
              <div className="ticker-scroll whitespace-nowrap inline-block animate-[marquee_30s_linear_infinite]">
                {t.ticker?.defaultText?.split(':').slice(1).join(':') || t.ticker?.defaultText}
                &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;
                {t.ticker?.defaultText?.split(':').slice(1).join(':') || t.ticker?.defaultText}
              </div>
            </div>
            <button
              onClick={() => setActiveTab('crisis-center')}
              className="flex-shrink-0 flex items-center gap-1 bg-white text-red-700 px-3 py-1 rounded-full text-xs font-bold hover:bg-red-100 transition-colors"
            >
              {t.ticker?.actionBtn} <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-gadaa-green/20'
          : 'bg-gadaa-green dark:bg-gadaa-greenDark'
      }`}>
        {/* Top utility bar */}
        <div className={`border-b ${scrolled ? 'border-gadaa-green/10 dark:border-slate-700' : 'border-white/10'} px-4 py-1.5 hidden lg:block`}>
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between text-xs">
            <div className={`flex items-center gap-4 ${scrolled ? 'text-slate-600 dark:text-slate-400' : 'text-green-100'}`}>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {t.proclamationBadge}
              </span>
              <span className="opacity-60">|</span>
              <span>{t.siteSubtitle}</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:8181" className={`flex items-center gap-1.5 font-bold ${scrolled ? 'text-gadaa-red' : 'text-gadaa-gold'} hover:opacity-80 transition-opacity`}>
                <Phone className="w-3 h-3 animate-pulse" />
                {t.emergencyHotline}: <span className="text-sm">{t.tollFree}</span>
              </a>
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                    scrolled
                      ? 'border-gadaa-green/30 text-gadaa-green hover:bg-gadaa-green/10'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span className="uppercase font-semibold">{language}</span>
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 min-w-[160px]">
                    {LANG_OPTIONS.map(opt => (
                      <button
                        key={opt.code}
                        onClick={() => { setLanguage(opt.code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gadaa-green/10 transition-colors ${
                          language === opt.code ? 'bg-gadaa-green/10 text-gadaa-green font-semibold' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{opt.flag}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={toggleDarkMode} className={`p-1.5 rounded-full transition-colors ${scrolled ? 'text-slate-600 hover:text-gadaa-green' : 'text-white hover:text-gadaa-gold'}`}>
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              {/* PWA Install Button */}
              {!isInstalled && (
                <button
                  onClick={handleInstallClick}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                    scrolled
                      ? 'border-gadaa-gold text-gadaa-goldDark hover:bg-gadaa-gold hover:text-white'
                      : 'border-gadaa-gold text-gadaa-gold hover:bg-gadaa-gold hover:text-gadaa-black'
                  }`}
                  title="Install Web App on your device"
                >
                  <Download className="w-3.5 h-3.5 animate-bounce" />
                  <span>{language === 'om' ? "App Fe'adhu" : language === 'am' ? "መተግበሪያ ጫን" : "Install App"}</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('rbac-admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                  scrolled 
                    ? 'border-gadaa-green text-gadaa-green hover:bg-gadaa-green hover:text-white' 
                    : 'border-white text-white hover:bg-white hover:text-gadaa-green'
                }`}
              >
                <Shield className="w-3 h-3" />
                {currentUser ? 'Admin Portal' : 'Staff Login'}
              </button>
            </div>
          </div>
        </div>

        {/* Main nav row */}
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <button onClick={() => setActiveTab('home')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-gadaa-gold/60 group-hover:border-gadaa-gold transition-colors">
              <img src="/Images/logo of busa gonofa.jpg" alt="Busa Gonofa Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className={`font-extrabold text-base leading-tight tracking-tight ${scrolled ? 'text-gadaa-green dark:text-gadaa-greenLight' : 'text-white'}`}>
                {t.siteTitle}
              </div>
              <div className={`text-xs leading-tight hidden sm:block ${scrolled ? 'text-slate-500 dark:text-slate-400' : 'text-green-100'}`}>
                Oromia Commission
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 flex-wrap justify-center">
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === item.key
                    ? (scrolled ? 'bg-gadaa-green text-white shadow' : 'bg-white/20 text-white font-semibold shadow')
                    : (scrolled ? 'text-slate-700 dark:text-slate-300 hover:bg-gadaa-green/10 hover:text-gadaa-green' : 'text-green-100 hover:bg-white/10 hover:text-white')
                } ${item.key === 'rbac-admin' ? 'text-gadaa-gold font-bold border border-gadaa-gold/40 hover:border-gadaa-gold' : ''}`}
              >
                {item.label(t)}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1 bg-gadaa-gold text-gadaa-black px-2.5 py-1.5 rounded-lg text-xs font-bold shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg ${scrolled ? 'text-gadaa-green' : 'text-white'}`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-xl">
            <div className="flex flex-col p-4 gap-1">
              {LANG_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => { setLanguage(opt.code); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                    language === opt.code ? 'bg-gadaa-green/10 text-gadaa-green font-semibold' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {opt.flag} {opt.label}
                </button>
              ))}
              <hr className="my-2 border-slate-100 dark:border-slate-800" />
              {!isInstalled && (
                <button
                  onClick={() => { handleInstallClick(); setMobileOpen(false); }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-gadaa-gold/20 border border-gadaa-gold text-gadaa-goldDark dark:text-gadaa-gold font-bold text-sm"
                >
                  <Smartphone className="w-5 h-5" />
                  {language === 'om' ? "App Fe'adhu (Install Web App)" : language === 'am' ? "መተግበሪያውን ስልክዎ ላይ ይጫኑ" : "Install Web App on Phone"}
                </button>
              )}
              {NAV_ITEMS.map(item => (
                <button
                  key={item.key}
                  onClick={() => { setActiveTab(item.key); setMobileOpen(false); }}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                    activeTab === item.key ? 'bg-gadaa-green text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-gadaa-green/10'
                  }`}
                >
                  {item.label(t)}
                </button>
              ))}
              <a href="tel:8181" className="flex items-center gap-2 px-4 py-2.5 text-gadaa-red font-bold text-sm">
                <Phone className="w-4 h-4" /> 8181
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* iOS Install Instruction Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowIOSModal(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl border-2 border-gadaa-gold" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-gadaa-gold/10 rounded-full flex items-center justify-center mx-auto">
              <Smartphone className="w-8 h-8 text-gadaa-gold" />
            </div>
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              {language === 'om' ? "App Fe'achuuf (iOS Safari)" : "Install on iPhone / iPad"}
            </h3>
            <ol className="text-sm text-slate-600 dark:text-slate-300 text-left space-y-2.5 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gadaa-green text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Tap the <strong>Share</strong> button <Share2 className="w-4 h-4 inline" /> in Safari.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gadaa-green text-white text-xs font-bold flex items-center justify-center">2</span>
                <span>Scroll down & tap <strong>"Add to Home Screen"</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gadaa-green text-white text-xs font-bold flex items-center justify-center">3</span>
                <span>Tap <strong>Add</strong> at top right.</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-gadaa-green text-white font-bold py-2.5 rounded-xl text-sm hover:bg-gadaa-greenDark transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default Navbar;
