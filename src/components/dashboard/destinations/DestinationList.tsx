
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Globe, Video, Copy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export interface Destination {
  id: string;
  name: string;
  url: string;
  platform: string;
  streamKey?: string;
}

interface DestinationListProps {
  destinations: Destination[];
  onRemove: (id: string) => void;
}

const DestinationList = ({ destinations, onRemove }: DestinationListProps) => {
  const { t } = useLanguage();

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
  };

  if (destinations.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <p>{t('dashboard.destinations.empty') || 'No destinations added yet. Add your first streaming destination above.'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {destinations.map((destination) => (
        <Card key={destination.id} className="backdrop-blur-sm bg-card/80 border-white/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-background/50 flex items-center justify-center">
                  {destination.platform === 'youtube' ? (
                    <Video className="h-5 w-5 text-red-500" />
                  ) : destination.platform === 'twitch' ? (
                    <Video className="h-5 w-5 text-purple-500" />
                  ) : destination.platform === 'facebook' ? (
                    <Globe className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Globe className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{destination.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{destination.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRemove(destination.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">{t('dashboard.destinations.url') || 'RTMP URL'}</p>
                <div className="flex items-center gap-2">
                  <div className="bg-background/50 text-sm font-mono p-2 rounded-md flex-1 break-all">
                    {destination.url}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => copyToClipboard(destination.url, t('dashboard.destinations.copied') || 'URL copied to clipboard')}
                    className="flex-shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">{t('dashboard.destinations.streamKey') || 'Stream Key'}</p>
                <div className="flex items-center gap-2">
                  <div className="bg-background/50 text-sm font-mono p-2 rounded-md flex-1 break-all">
                    {destination.streamKey ? '••••••••••••••••' : ''}
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => copyToClipboard(destination.streamKey || '', t('dashboard.destinations.keyCopied') || 'Stream key copied to clipboard')}
                    className="flex-shrink-0"
                    disabled={!destination.streamKey}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DestinationList;
