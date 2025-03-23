
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DestinationHelp = () => {
  const { t } = useLanguage();
  
  return (
    <GlassCard className="mt-4">
      <h3 className="font-medium text-lg mb-4">{t('dashboard.destinations.help.title') || 'Setting up destinations'}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {t('dashboard.destinations.help.description') || 'To set up a streaming destination, you\'ll need the RTMP URL and stream key from your streaming platform.'}
      </p>
      
      <ul className="space-y-3">
        <li className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-background/50 flex items-center justify-center">
            <span className="font-semibold text-sm">YT</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">YouTube</p>
            <p className="text-xs text-muted-foreground">Use rtmp://a.rtmp.youtube.com/live2 with your stream key</p>
          </div>
          <Button size="sm" variant="outline" className="flex gap-1.5 items-center">
            <ExternalLink className="h-3.5 w-3.5" />
            <span>{t('dashboard.guide') || 'Guide'}</span>
          </Button>
        </li>
        
        <li className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-background/50 flex items-center justify-center">
            <span className="font-semibold text-sm">TW</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Twitch</p>
            <p className="text-xs text-muted-foreground">Use rtmp://live.twitch.tv/app with your stream key</p>
          </div>
          <Button size="sm" variant="outline" className="flex gap-1.5 items-center">
            <ExternalLink className="h-3.5 w-3.5" />
            <span>{t('dashboard.guide') || 'Guide'}</span>
          </Button>
        </li>
        
        <li className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-background/50 flex items-center justify-center">
            <span className="font-semibold text-sm">FB</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Facebook</p>
            <p className="text-xs text-muted-foreground">Use rtmps://live-api-s.facebook.com:443/rtmp/ with your stream key</p>
          </div>
          <Button size="sm" variant="outline" className="flex gap-1.5 items-center">
            <ExternalLink className="h-3.5 w-3.5" />
            <span>{t('dashboard.guide') || 'Guide'}</span>
          </Button>
        </li>
      </ul>
    </GlassCard>
  );
};

export default DestinationHelp;
