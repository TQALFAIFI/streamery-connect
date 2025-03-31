
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Toggle } from "@/components/ui/toggle";
import { Globe } from 'lucide-react';

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
      <Globe className="h-[1.2rem] w-[1.2rem]" />
    </Toggle>
  );
};

export default LanguageSwitcher;
