
import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
}

export const usePerformanceMonitoring = () => {
  const logMetric = useCallback((name: string, value: number) => {
    console.log(`Performance Metric - ${name}: ${value.toFixed(2)}ms`);
  }, []);

  const measureWebVitals = useCallback(() => {
    // First Contentful Paint
    const observer = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          logMetric('First Contentful Paint', entry.startTime);
        }
      }
    });
    
    observer.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      logMetric('Largest Contentful Paint', lastEntry.startTime);
    });
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      if (clsValue > 0) {
        logMetric('Cumulative Layout Shift', clsValue);
      }
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    return () => {
      observer.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
    };
  }, [logMetric]);

  useEffect(() => {
    const cleanup = measureWebVitals();
    return cleanup;
  }, [measureWebVitals]);

  return { logMetric };
};
