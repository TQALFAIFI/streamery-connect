
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircleCheck, CircleX, Video, Timer, Signal } from 'lucide-react';
import { toast } from 'sonner';
import GlassCard from '../ui/GlassCard';
import { useLanguage } from '@/contexts/LanguageContext';

const StreamTest = () => {
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults, setTestResults] = useState<{
    connection: boolean | null;
    bandwidth: number | null;
    quality: 'low' | 'medium' | 'high' | null;
    latency: number | null;
  }>({
    connection: null,
    bandwidth: null,
    quality: null,
    latency: null,
  });
  const { t } = useLanguage();

  useEffect(() => {
    if (!isTestRunning) return;

    let timer: NodeJS.Timeout;
    let step = 0;
    const totalSteps = 10;

    const runTest = () => {
      step++;
      setTestProgress(Math.floor((step / totalSteps) * 100));

      // Simulate test process
      if (step === 3) {
        setTestResults(prev => ({ ...prev, connection: true }));
      } else if (step === 6) {
        const randomBandwidth = Math.floor(Math.random() * 10) + 3; // 3-12 Mbps
        setTestResults(prev => ({ ...prev, bandwidth: randomBandwidth }));
        
        // Determine quality based on bandwidth
        let quality: 'low' | 'medium' | 'high';
        if (randomBandwidth < 5) quality = 'low';
        else if (randomBandwidth < 8) quality = 'medium';
        else quality = 'high';
        
        setTestResults(prev => ({ ...prev, quality }));
      } else if (step === 9) {
        const randomLatency = Math.floor(Math.random() * 400) + 100; // 100-500ms
        setTestResults(prev => ({ ...prev, latency: randomLatency }));
      } else if (step >= totalSteps) {
        clearInterval(timer);
        setIsTestRunning(false);
        
        // Show toast based on overall test result
        const { bandwidth, latency } = testResults;
        if (bandwidth && bandwidth >= 5 && latency && latency < 300) {
          toast.success(t('streamTest.success') || 'Your setup is ready for streaming!');
        } else {
          toast.warning(t('streamTest.warning') || 'Your connection may have some issues for streaming.');
        }
      }
    };

    timer = setInterval(runTest, 600);

    return () => {
      clearInterval(timer);
    };
  }, [isTestRunning, testResults, t]);

  const startTest = () => {
    // Reset state
    setTestResults({
      connection: null,
      bandwidth: null,
      quality: null,
      latency: null,
    });
    setTestProgress(0);
    setIsTestRunning(true);
    toast.info(t('streamTest.started') || 'Stream test started...');
  };

  const getStatusIcon = (status: boolean | null) => {
    if (status === null) return null;
    return status ? (
      <CircleCheck className="h-5 w-5 text-green-500" />
    ) : (
      <CircleX className="h-5 w-5 text-red-500" />
    );
  };

  const getQualityLabel = (quality: 'low' | 'medium' | 'high' | null) => {
    if (quality === null) return '-';
    
    const labels = {
      low: t('streamTest.qualityLow') || 'Low (480p)',
      medium: t('streamTest.qualityMedium') || 'Medium (720p)', 
      high: t('streamTest.qualityHigh') || 'High (1080p)'
    };
    
    return labels[quality];
  };

  const getQualityColor = (quality: 'low' | 'medium' | 'high' | null) => {
    if (quality === null) return '';
    
    const colors = {
      low: 'text-yellow-500',
      medium: 'text-blue-500',
      high: 'text-green-500'
    };
    
    return colors[quality];
  };

  return (
    <GlassCard className="w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">{t('streamTest.title') || 'Stream Test'}</h3>
          <div className="flex items-center gap-2">
            {isTestRunning ? (
              <div className="text-xs font-medium text-accent animate-pulse">
                {t('streamTest.testing') || 'Testing...'}
              </div>
            ) : null}
          </div>
        </div>

        {testProgress > 0 && (
          <div className="w-full bg-background/50 rounded-full h-2.5">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${testProgress}%` }}
            ></div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background/30 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <div className="text-xs text-muted-foreground">{t('streamTest.connection') || 'Connection'}</div>
              {getStatusIcon(testResults.connection)}
            </div>
            <div className="flex items-center gap-2">
              <Signal className="h-4 w-4 text-accent" />
              <div className="text-sm font-medium">
                {testResults.connection === null
                  ? '-'
                  : testResults.connection
                  ? (t('streamTest.connected') || 'Connected')
                  : (t('streamTest.failed') || 'Failed')}
              </div>
            </div>
          </div>

          <div className="bg-background/30 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <div className="text-xs text-muted-foreground">{t('streamTest.bandwidth') || 'Bandwidth'}</div>
            </div>
            <div className="text-sm font-medium">
              {testResults.bandwidth === null ? '-' : `${testResults.bandwidth} Mbps`}
            </div>
          </div>

          <div className="bg-background/30 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <div className="text-xs text-muted-foreground">{t('streamTest.quality') || 'Stream Quality'}</div>
            </div>
            <div className={`text-sm font-medium ${getQualityColor(testResults.quality)}`}>
              {getQualityLabel(testResults.quality)}
            </div>
          </div>

          <div className="bg-background/30 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <div className="text-xs text-muted-foreground">{t('streamTest.latency') || 'Latency'}</div>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-accent" />
              <div className="text-sm font-medium">
                {testResults.latency === null ? '-' : `${testResults.latency} ms`}
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={startTest}
          disabled={isTestRunning}
          variant="default"
          className="w-full flex items-center justify-center gap-2 mt-4"
        >
          <Video className="h-4 w-4" />
          <span>
            {isTestRunning
              ? (t('streamTest.testing') || 'Testing...')
              : (t('streamTest.startTest') || 'Start Stream Test')}
          </span>
        </Button>

        {!isTestRunning && testProgress === 100 && (
          <p className="text-sm text-muted-foreground">
            {testResults.bandwidth && testResults.bandwidth >= 5 && testResults.latency && testResults.latency < 300
              ? (t('streamTest.recommendationGood') || 'Your setup is suitable for streaming. You can start your broadcast.')
              : (t('streamTest.recommendationPoor') || 'Your connection might have issues. Consider lowering your stream quality.')}
          </p>
        )}
      </div>
    </GlassCard>
  );
};

export default StreamTest;
