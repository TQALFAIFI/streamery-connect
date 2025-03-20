
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../ui/GlassCard';

interface StreamKeyProps {
  initialStreamKey?: string;
}

const StreamKey = ({ initialStreamKey = 'rtmp-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }: StreamKeyProps) => {
  const [streamKey, setStreamKey] = useState(initialStreamKey);
  const [showKey, setShowKey] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(streamKey);
    toast.success('Stream key copied to clipboard');
  };

  const regenerateKey = () => {
    setIsRegenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const newKey = 'rtmp-' + Math.random().toString(36).substring(2, 6) + '-' + 
                     Math.random().toString(36).substring(2, 6) + '-' + 
                     Math.random().toString(36).substring(2, 6) + '-' + 
                     Math.random().toString(36).substring(2, 14);
      
      setStreamKey(newKey);
      setIsRegenerating(false);
      toast.success('Stream key regenerated successfully');
    }, 800);
  };

  return (
    <GlassCard className="w-full mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">Your Stream Key</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowKey(!showKey)}
            className="flex items-center gap-1.5"
          >
            {showKey ? (
              <>
                <EyeOff className="h-4 w-4" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>Show</span>
              </>
            )}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type={showKey ? 'text' : 'password'}
              value={streamKey}
              readOnly
              className="pr-10 font-mono text-sm bg-background/50"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          
          <Button
            variant="outline"
            onClick={regenerateKey}
            disabled={isRegenerating}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p className="mt-2">Use this key in your broadcasting software to connect to our RTMP server.</p>
          <p className="mt-1 text-xs text-destructive">
            Never share your stream key with anyone else.
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

export default StreamKey;
