
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <ToggleGroup type="single" value={language} onValueChange={(value) => value && setLanguage(value as 'en' | 'ar')}>
        <ToggleGroupItem value="en" aria-label={t('language.en')}>
          EN
        </ToggleGroupItem>
        <ToggleGroupItem value="ar" aria-label={t('language.ar')}>
          عربي
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LanguageSwitcher;
