'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'en' | 'vi';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, section?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import translations
import enTranslations from '../../locales/en.json';
import viTranslations from '../../locales/vi.json';

const translations = {
  en: enTranslations,
  vi: viTranslations
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'vi')) {
      setLocaleState(savedLocale);
    }
  }, []);

  // Save locale to localStorage when changed
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // Update document language
    document.documentElement.lang = newLocale;
  };

  // Translation function with nested key support
  const t = (key: string, section?: string): string => {
    const currentTranslations = translations[locale] as any;
    
    // Build the full path
    const fullPath = section ? `${section}.${key}` : key;
    const keys = fullPath.split('.');
    
    // Navigate through nested keys
    let result: any = currentTranslations;
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return key if path not found
      }
    }
    
    // Return the found value or the original key
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for translations with section
export function useTranslations(section: string) {
  const { t } = useLanguage();
  return (key: string) => t(key, section);
}
