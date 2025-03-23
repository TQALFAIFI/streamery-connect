
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AnalyticsTab = () => {
  const { t } = useLanguage();
  
  return (
    <GlassCard className="w-full min-h-[300px] flex flex-col items-center justify-center animate-fade-in">
      <Info className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{t('dashboard.analytics.soon')}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-md text-center">
        {t('dashboard.analytics.description')}
      </p>
    </GlassCard>
  );
};

export default AnalyticsTab;
