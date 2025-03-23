
import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import DestinationForm, { DestinationFormData } from './DestinationForm';
import DestinationList, { Destination } from './DestinationList';
import DestinationHelp from './DestinationHelp';

const DestinationsTab = () => {
  const { t } = useLanguage();
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: '1', name: 'YouTube', url: 'rtmp://a.rtmp.youtube.com/live2', platform: 'youtube', streamKey: 'xxxx-xxxx-xxxx-xxxx' },
    { id: '2', name: 'Twitch', url: 'rtmp://live.twitch.tv/app', platform: 'twitch', streamKey: 'live_123456789_abcdefghijklmnopqrstuvwxyz' }
  ]);

  const handleAddDestination = (data: DestinationFormData) => {
    const newDestination = {
      id: Date.now().toString(),
      name: data.name,
      url: data.url,
      platform: data.platform,
      streamKey: data.streamKey
    };
    
    setDestinations([...destinations, newDestination]);
    toast.success(t('dashboard.destinations.added'));
  };

  const handleRemoveDestination = (id: string) => {
    setDestinations(destinations.filter(dest => dest.id !== id));
    toast.success(t('dashboard.destinations.removed'));
  };

  return (
    <div className="grid grid-cols-1 gap-6 animate-fade-in">
      <GlassCard>
        <h3 className="font-medium text-lg mb-4">{t('dashboard.destinations.title') || 'Stream Destinations'}</h3>
        <p className="text-sm text-muted-foreground mb-6">
          {t('dashboard.destinations.intro') || 'Add streaming destinations to broadcast your content to multiple platforms simultaneously.'}
        </p>
        
        <DestinationForm onSubmit={handleAddDestination} />
      </GlassCard>
      
      <DestinationList 
        destinations={destinations} 
        onRemove={handleRemoveDestination} 
      />
      
      <DestinationHelp />
    </div>
  );
};

export default DestinationsTab;
