'use client';

import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage, useTranslations } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations('languageSwitcher');

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'vi' : 'en';
    setLocale(newLocale);
  };

  return (
    <button
      onClick={switchLanguage}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
        "bg-gray-800 hover:bg-gray-700",
        "text-gray-300 hover:text-white"
      )}
      aria-label={locale === 'en' ? t('switchToVietnamese') : t('switchToEnglish')}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium uppercase">
        {locale === 'en' ? 'VI' : 'EN'}
      </span>
    </button>
  );
}
