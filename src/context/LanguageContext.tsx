import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import omLocale from '../locales/om.json';
import enLocale from '../locales/en.json';
import amLocale from '../locales/am.json';

const locales: Record<Language, any> = {
  om: omLocale,
  en: enLocale,
  am: amLocale,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof omLocale;
  getLocalized: (obj: { om: string; en: string; am: string } | undefined) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bg_language') as Language;
    return saved && ['om', 'en', 'am'].includes(saved) ? saved : 'om';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bg_language', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const getLocalized = (obj: { om: string; en: string; am: string } | undefined): string => {
    if (!obj) return '';
    return obj[language] || obj['om'] || obj['en'] || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: locales[language] || omLocale,
        getLocalized,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
