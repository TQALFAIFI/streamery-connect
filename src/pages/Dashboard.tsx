
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import StreamTab from '@/components/dashboard/StreamTab';
import AnalyticsTab from '@/components/dashboard/AnalyticsTab';
import DestinationsTab from '@/components/dashboard/destinations/DestinationsTab';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'stream';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { t } = useLanguage();
  
  // Effect to handle deep linking to OBS guide
  useEffect(() => {
    if (searchParams.get('section') === 'obs-guide') {
      setActiveTab('stream');
      // Use a small timeout to wait for the component to render
      setTimeout(() => {
        document.getElementById('obs-guide')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard?tab=${value}`, { replace: true });
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
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="stream">{t('dashboard.tabs.stream')}</TabsTrigger>
              <TabsTrigger value="analytics">{t('dashboard.tabs.analytics')}</TabsTrigger>
              <TabsTrigger value="destinations">{t('dashboard.tabs.destinations')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stream">
              <StreamTab />
            </TabsContent>
            
            <TabsContent value="analytics">
              <AnalyticsTab />
            </TabsContent>
            
            <TabsContent value="destinations">
              <DestinationsTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
