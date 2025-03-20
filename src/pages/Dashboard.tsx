import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import StreamKey from '@/components/streaming/StreamKey';
import StreamStatus from '@/components/streaming/StreamStatus';
import StreamTest from '@/components/streaming/StreamTest';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link2, Settings, Info, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stream');
  const { t } = useLanguage();

  const copyIngestUrl = () => {
    navigator.clipboard.writeText('rtmp://ingest.rtmpstream.io/live');
    toast.success('RTMP URL copied to clipboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background via-accent/5">
      <div className="absolute inset-0 bg-noise-pattern opacity-25 pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">{t('dashboard.title')}</h1>
            <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
              <Settings className="h-4 w-4 mr-2" />
              {t('nav.settings')}
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="stream">{t('dashboard.tabs.stream')}</TabsTrigger>
              <TabsTrigger value="analytics">{t('dashboard.tabs.analytics')}</TabsTrigger>
              <TabsTrigger value="destinations">{t('dashboard.tabs.destinations')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stream" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-6">
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
            </TabsContent>
            
            <TabsContent value="analytics" className="animate-fade-in">
              <GlassCard className="w-full min-h-[300px] flex flex-col items-center justify-center">
                <Info className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">{t('dashboard.analytics.soon')}</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md text-center">
                  {t('dashboard.analytics.description')}
                </p>
              </GlassCard>
            </TabsContent>
            
            <TabsContent value="destinations" className="animate-fade-in">
              <GlassCard className="w-full min-h-[300px] flex flex-col items-center justify-center">
                <Info className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">{t('dashboard.destinations.soon')}</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md text-center">
                  {t('dashboard.destinations.description')}
                </p>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
