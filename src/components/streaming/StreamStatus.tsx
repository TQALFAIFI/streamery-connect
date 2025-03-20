
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Square, Wifi, WifiOff, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../ui/GlassCard';

type StreamState = 'offline' | 'connecting' | 'live';

interface StreamStatusProps {
  initialState?: StreamState;
}

const StreamStatus = ({ initialState = 'offline' }: StreamStatusProps) => {
  const [streamState, setStreamState] = useState<StreamState>(initialState);
  const [duration, setDuration] = useState(0);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Reset duration when stream stops
    if (streamState !== 'live') {
      setDuration(0);
      return;
    }

    // Update duration every second when live
    const interval = setInterval(() => {
      setDuration(prev => prev + 1);
      
      // Simulate random viewer count changes
      if (Math.random() > 0.8) {
        setViewers(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [streamState]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      remainingSeconds.toString().padStart(2, '0')
    ].join(':');
  };

  const toggleStream = () => {
    if (streamState === 'offline') {
      setStreamState('connecting');
      toast.info('Connecting to RTMP server...');
      
      // Simulate connection delay
      setTimeout(() => {
        setStreamState('live');
        setViewers(1);
        toast.success('Stream is now live!');
      }, 2000);
    } else {
      setStreamState('offline');
      toast.info('Stream ended');
    }
  };

  const shareStream = () => {
    const streamUrl = 'https://stream.example.com/live';
    navigator.clipboard.writeText(streamUrl);
    toast.success('Stream URL copied to clipboard');
  };

  return (
    <GlassCard className="w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">Stream Status</h3>
          <div className="flex items-center gap-2">
            {streamState === 'offline' ? (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <WifiOff className="h-4 w-4" />
                <span className="text-sm">Offline</span>
              </div>
            ) : streamState === 'connecting' ? (
              <div className="flex items-center gap-1.5 text-yellow-500">
                <Wifi className="h-4 w-4 animate-pulse" />
                <span className="text-sm">Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-stream-live">
                <div className="relative">
                  <Wifi className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-stream-live rounded-full animate-live-pulse" />
                </div>
                <span className="text-sm font-medium">Live</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background/30 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Duration</div>
            <div className="text-lg font-mono mt-1">{formatDuration(duration)}</div>
          </div>
          
          <div className="bg-background/30 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Viewers</div>
            <div className="text-lg font-mono mt-1">{viewers}</div>
          </div>
          
          <div className="bg-background/30 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Quality</div>
            <div className="text-lg font-mono mt-1">{streamState === 'live' ? '720p' : '-'}</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4">
          <Button
            onClick={toggleStream}
            variant={streamState === 'live' ? 'destructive' : 'default'}
            className="flex-1 min-w-[120px] flex items-center gap-2"
          >
            {streamState === 'live' ? (
              <>
                <Square className="h-4 w-4" />
                <span>End Stream</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Start Stream</span>
              </>
            )}
          </Button>
          
          <Button
            onClick={shareStream}
            variant="outline"
            disabled={streamState !== 'live'}
            className="flex-1 min-w-[120px] flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share Stream</span>
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};

export default StreamStatus;
