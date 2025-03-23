
import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import StreamStatus from '@/components/streaming/StreamStatus';
import StreamTest from '@/components/streaming/StreamTest';
import StreamKey from '@/components/streaming/StreamKey';
import { Button } from '@/components/ui/button';
import { Link2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const StreamTab = () => {
  const { t } = useLanguage();
  
  const copyIngestUrl = () => {
    navigator.clipboard.writeText('rtmp://ingest.rtmpstream.io/live');
    toast.success('RTMP URL copied to clipboard');
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-fade-in">
      <StreamStatus />
      
      <StreamTest />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="flex flex-col h-full">
          <h3 className="font-medium text-lg mb-4">{t('dashboard.rtmp.title')}</h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-background/50 text-sm font-mono p-3 rounded-md flex-1 break-all">
              rtmp://ingest.rtmpstream.io/live
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyIngestUrl}
              className="flex-shrink-0"
            >
              <Link2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-auto">
            {t('dashboard.rtmp.description')}
          </p>
        </GlassCard>
        
        <GlassCard className="flex flex-col h-full">
          <h3 className="font-medium text-lg mb-4">{t('dashboard.software.title')}</h3>
          <ul className="space-y-3 mb-4">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-background/50 flex items-center justify-center">
                <span className="font-semibold text-sm">OBS</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">OBS Studio</p>
                <p className="text-xs text-muted-foreground">Open Broadcaster Software</p>
              </div>
              <Button size="sm" variant="outline" className="flex gap-1.5 items-center">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{t('dashboard.guide')}</span>
              </Button>
            </li>
            
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-background/50 flex items-center justify-center">
                <span className="font-semibold text-sm">SL</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Streamlabs</p>
                <p className="text-xs text-muted-foreground">Streamlabs Desktop</p>
              </div>
              <Button size="sm" variant="outline" className="flex gap-1.5 items-center">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{t('dashboard.guide')}</span>
              </Button>
            </li>
            
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-background/50 flex items-center justify-center">
                <span className="font-semibold text-sm">XS</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">XSplit</p>
                <p className="text-xs text-muted-foreground">XSplit Broadcaster</p>
              </div>
              <Button size="sm" variant="outline" className="flex gap-1.5 items-center">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{t('dashboard.guide')}</span>
              </Button>
            </li>
          </ul>
        </GlassCard>
      </div>
      
      <StreamKey />
    </div>
  );
};

export default StreamTab;
