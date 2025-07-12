import { memo, useEffect, useState } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PerformanceMetricsProps {
  showDetails?: boolean;
  className?: string;
}

const PerformanceMetrics = memo<PerformanceMetricsProps>(({ 
  showDetails = false, 
  className = "" 
}) => {
  const { performanceData, performanceScore, isMonitoring } = usePerformanceMonitor();
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    const isDev = import.meta.env.DEV;
    const showPerf = localStorage.getItem('show-performance-metrics') === 'true';
    setShowMetrics(isDev || showPerf);
  }, []);

  if (!showMetrics || !isMonitoring) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatMetric = (value: number | null, suffix = 'ms') => {
    if (value === null) return 'N/A';
    return `${Math.round(value)}${suffix}`;
  };

  if (!showDetails) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Badge 
          variant="outline" 
          className={`${getScoreColor(performanceScore)} text-white border-none`}
        >
          Performance: {performanceScore}
        </Badge>
      </div>
    );
  }

  return (
    <Card className={`fixed bottom-4 right-4 z-50 w-80 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          Performance Metrics
          <Badge 
            variant="outline" 
            className={`${getScoreColor(performanceScore)} text-white border-none`}
          >
            {performanceScore}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-muted-foreground">FCP:</span>
            <span className="ml-1 font-mono">{formatMetric(performanceData.fcp)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">LCP:</span>
            <span className="ml-1 font-mono">{formatMetric(performanceData.lcp)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">CLS:</span>
            <span className="ml-1 font-mono">{formatMetric(performanceData.cls, '')}</span>
          </div>
          <div>
            <span className="text-muted-foreground">FID:</span>
            <span className="ml-1 font-mono">{formatMetric(performanceData.fid)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">TTFB:</span>
            <span className="ml-1 font-mono">{formatMetric(performanceData.ttfb)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Load:</span>
            <span className="ml-1 font-mono">{formatMetric(performanceData.loadTime)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PerformanceMetrics.displayName = 'PerformanceMetrics';

export default PerformanceMetrics;