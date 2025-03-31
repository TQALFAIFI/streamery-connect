
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Toggle } from "@/components/ui/toggle";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Toggle
      pressed={language === 'ar'}
      onPressedChange={toggleLanguage}
      aria-label={t('language.select')}
      title={language === 'en' ? t('language.ar') : t('language.en')}
      className="h-10 w-10 p-0 rounded-full"
    >
      <span className="text-sm font-medium">
        {language === 'en' ? 'EN' : 'ع'}
      </span>
    </Toggle>
  );
};

export default LanguageSwitcher;
