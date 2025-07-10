import { useEffect, useState } from 'react';
import { analytics } from '@/utils/analytics';

interface PerformanceData {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
  loadTime: number | null;
}

export const usePerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
    loadTime: null
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    setIsMonitoring(true);

    const observers: PerformanceObserver[] = [];

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          setPerformanceData(prev => ({ ...prev, fcp: entry.startTime }));
        }
      }
    });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        setPerformanceData(prev => ({ ...prev, lcp: entry.startTime }));
      }
    });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      setPerformanceData(prev => ({ ...prev, cls: clsValue }));
    });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidValue = (entry as any).processingStart - entry.startTime;
        setPerformanceData(prev => ({ ...prev, fid: fidValue }));
      }
    });

    // Time to First Byte
    const navigationObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const navEntry = entry as PerformanceNavigationTiming;
        const ttfbValue = navEntry.responseStart - navEntry.requestStart;
        const loadTimeValue = navEntry.loadEventEnd - navEntry.loadEventStart;
        
        setPerformanceData(prev => ({ 
          ...prev, 
          ttfb: ttfbValue,
          loadTime: loadTimeValue 
        }));
      }
    });

    try {
      fcpObserver.observe({ entryTypes: ['paint'] });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      navigationObserver.observe({ entryTypes: ['navigation'] });

      observers.push(fcpObserver, lcpObserver, clsObserver, fidObserver, navigationObserver);
    } catch (error) {
      console.warn('Error setting up performance observers:', error);
      setIsMonitoring(false);
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
      setIsMonitoring(false);
    };
  }, []);

  const getPerformanceScore = (): number => {
    let score = 100;
    const { fcp, lcp, cls, fid } = performanceData;

    // FCP scoring (good: <1.8s, needs improvement: 1.8-3s, poor: >3s)
    if (fcp !== null) {
      if (fcp > 3000) score -= 25;
      else if (fcp > 1800) score -= 15;
    }

    // LCP scoring (good: <2.5s, needs improvement: 2.5-4s, poor: >4s)
    if (lcp !== null) {
      if (lcp > 4000) score -= 25;
      else if (lcp > 2500) score -= 15;
    }

    // CLS scoring (good: <0.1, needs improvement: 0.1-0.25, poor: >0.25)
    if (cls !== null) {
      if (cls > 0.25) score -= 25;
      else if (cls > 0.1) score -= 15;
    }

    // FID scoring (good: <100ms, needs improvement: 100-300ms, poor: >300ms)
    if (fid !== null) {
      if (fid > 300) score -= 25;
      else if (fid > 100) score -= 15;
    }

    return Math.max(0, score);
  };

  return {
    performanceData,
    isMonitoring,
    performanceScore: getPerformanceScore(),
    analytics
  };
};