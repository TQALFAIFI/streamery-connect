import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import StreamKey from '@/components/streaming/StreamKey';
import StreamStatus from '@/components/streaming/StreamStatus';
import StreamTest from '@/components/streaming/StreamTest';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link2, Settings, Info, ExternalLink, Plus, Trash2, Globe, Video, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stream');
  const { t } = useLanguage();
  const [destinations, setDestinations] = useState<Array<{id: string, name: string, url: string, platform: string, streamKey?: string}>>([
    { id: '1', name: 'YouTube', url: 'rtmp://a.rtmp.youtube.com/live2', platform: 'youtube', streamKey: 'xxxx-xxxx-xxxx-xxxx' },
    { id: '2', name: 'Twitch', url: 'rtmp://live.twitch.tv/app', platform: 'twitch', streamKey: 'live_123456789_abcdefghijklmnopqrstuvwxyz' }
  ]);

  const form = useForm({
    defaultValues: {
      name: '',
      url: '',
      platform: 'custom',
      streamKey: ''
    }
  });

  const copyIngestUrl = () => {
    navigator.clipboard.writeText('rtmp://ingest.rtmpstream.io/live');
    toast.success('RTMP URL copied to clipboard');
  };

  const handleAddDestination = (data: any) => {
    const newDestination = {
      id: Date.now().toString(),
      name: data.name,
      url: data.url,
      platform: data.platform,
      streamKey: data.streamKey
    };
    
    setDestinations([...destinations, newDestination]);
    toast.success(t('dashboard.destinations.added'));
    form.reset();
  };

  const handleRemoveDestination = (id: string) => {
    setDestinations(destinations.filter(dest => dest.id !== id));
    toast.success(t('dashboard.destinations.removed'));
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
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
              <div className="grid grid-cols-1 gap-6">
                <GlassCard>
                  <h3 className="font-medium text-lg mb-4">{t('dashboard.destinations.title') || 'Stream Destinations'}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {t('dashboard.destinations.intro') || 'Add streaming destinations to broadcast your content to multiple platforms simultaneously.'}
                  </p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddDestination)} className="space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('dashboard.destinations.name') || 'Destination Name'}</FormLabel>
                              <FormControl>
                                <Input placeholder="My YouTube Channel" {...field} required />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="platform"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('dashboard.destinations.platform') || 'Platform'}</FormLabel>
                              <FormControl>
                                <select 
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                  {...field}
                                >
                                  <option value="youtube">YouTube</option>
                                  <option value="twitch">Twitch</option>
                                  <option value="facebook">Facebook</option>
                                  <option value="custom">Custom</option>
                                </select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('dashboard.destinations.url') || 'RTMP URL'}</FormLabel>
                              <FormControl>
                                <Input placeholder="rtmp://live.example.com/app" {...field} required />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="streamKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('dashboard.destinations.streamKey') || 'Stream Key'}</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password"
                                  placeholder="xxxx-xxxx-xxxx-xxxx" 
                                  {...field} 
                                  required 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" className="ml-auto">
                        <Plus className="mr-2 h-4 w-4" />
                        {t('dashboard.destinations.add') || 'Add Destination'}
                      </Button>
                    </form>
                  </Form>
                </GlassCard>
                
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
                              onClick={() => handleRemoveDestination(destination.id)}
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
                  
                  {destinations.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>{t('dashboard.destinations.empty') || 'No destinations added yet. Add your first streaming destination above.'}</p>
                    </div>
                  )}
                </div>
                
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

