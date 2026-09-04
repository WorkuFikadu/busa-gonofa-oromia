import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AppStateProvider } from './context/AppStateContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import EarlyWarningSection from './components/early-warning/EarlyWarningSection';
import AssetMapSection from './components/asset-map/AssetMapSection';
import MobilizationSection from './components/mobilization/MobilizationSection';
import ClearinghouseSection from './components/clearinghouse/ClearinghouseSection';
import CrisisCenterSection from './components/crisis-center/CrisisCenterSection';
import ProgramsSection from './components/programs/ProgramsSection';
import RBACSection from './components/admin/RBACSection';
import VolunteerSection from './components/volunteer/VolunteerSection';
import LoginSection from './components/admin/LoginSection';
import { useAppState } from './context/AppStateContext';
import { useLanguage } from './context/LanguageContext';

// Separate inner component so it can use context hooks
const AppInner: React.FC = () => {
  const { activeTab, setActiveTab, currentUser } = useAppState();
  const { language } = useLanguage();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('bg_theme') === 'dark' ||
      (!localStorage.getItem('bg_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bg_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bg_theme', 'light');
    }
  }, [darkMode]);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const isAdminRoute = activeTab === 'rbac-admin' && currentUser;

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-200`}>
      {!isAdminRoute && <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(d => !d)} />}

      <main className="flex-1 flex flex-col">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            {/* About Cultural Strip */}
            <div className="bg-gadaa-black py-12 px-6">
              <div className="max-w-screen-xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                {[
                  {
                    title: language === 'om' ? '"Buusaa Gonofaa"' : '"Buusaa Gonofaa"',
                    body: language === 'om'
                      ? 'Sirna gargaarsa hawaasaa ganamaa Oromoo kan hawaasni waliif tumsee balaa uumamaa fi namtolcheerraa of baraaru.'
                      : language === 'am'
                      ? 'ማህበረሰቡ ተዋህዶ ከተፈጥሮ እና ሰው-ሰራሽ አደጋ ለመጠባበቅ የሚያስችለው ጥንታዊ የኦሮሞ ማህበራዊ ድጋፍ ስርዓት።'
                      : 'The ancient Oromo communal social insurance system where communities pool resources to protect each other from natural and man-made disasters.',
                    icon: '🌳',
                  },
                  {
                    title: language === 'om' ? 'Gadaa System' : 'Gadaa System',
                    body: language === 'om'
                      ? 'Sirna dimokiraasii ganamaa Oromoo kan aadaa, heeraa fi bulchiinsa hawaasaa of keessaa qabu – kan Buusaa Gonofaa bu\'uureffatee jiru.'
                      : language === 'am'
                      ? 'የቡሳ ጎኖፋ ዘርፈ ብዙ ሃላፊነቶች የሚገኙበት ጥንታዊ የኦሮሞ ዴሞክራሲ፣ ህግ እና ማህበራዊ ሃላፊነት ስርዓት።'
                      : 'The ancient democratic Oromo governance and social responsibility system from which Buusaa Gonofaa inherits its authority.',
                    icon: '⚖️',
                  },
                  {
                    title: language === 'om' ? 'Labsii 244/2014' : 'Proclamation 244/2014',
                    body: language === 'om'
                      ? 'Aadaa Buusaa Gonofaa seera mootummaa godhee komishinii mootummaa naannoo godhee hundeesse.'
                      : language === 'am'
                      ? 'ባህላዊውን ቡሳ ጎኖፋ ህጋዊ አድርጎ የኦሮሚያ ክልላዊ ኮሚሽን ያቋቋመ አዋጅ።'
                      : 'Formally institutionalizes indigenous Buusaa Gonofaa as a legal regional commission for DRM and social security.',
                    icon: '📜',
                  },
                ].map((card, i) => (
                  <div key={i} className="text-center">
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h3 className="font-black text-white text-lg mb-2">{card.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <ProgramsSection />
          </>
        )}
        {activeTab === 'early-warning' && <EarlyWarningSection />}
        {activeTab === 'asset-map' && <AssetMapSection />}
        {activeTab === 'mobilization' && <MobilizationSection />}
        {activeTab === 'volunteer' && <VolunteerSection />}
        {activeTab === 'clearinghouse' && <ClearinghouseSection />}
        {activeTab === 'careers' && <ClearinghouseSection />}
        {activeTab === 'crisis-center' && <CrisisCenterSection />}
        {activeTab === 'programs' && <ProgramsSection />}
        {activeTab === 'rbac-admin' && (currentUser ? <RBACSection darkMode={darkMode} toggleDarkMode={() => setDarkMode(d => !d)} /> : <LoginSection />)}
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppStateProvider>
        <AppInner />
      </AppStateProvider>
    </LanguageProvider>
  );
};

export default App;
