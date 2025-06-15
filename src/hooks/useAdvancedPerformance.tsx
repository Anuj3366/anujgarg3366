
import { useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  longtasks: number;
}

export const useAdvancedPerformance = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    longtasks: 0
  });

  const reportMetric = useCallback((name: string, value: number, rating: string) => {
    console.log(`📊 ${name}: ${value.toFixed(2)}ms (${rating})`);
    
    // In production, you would send this to your analytics service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'web_vital', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(value),
        custom_map: { metric_rating: rating }
      });
    }
  }, []);

  const measureWebVitals = useCallback(() => {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          const value = entry.startTime;
          metricsRef.current.fcp = value;
          const rating = value < 1800 ? 'good' : value < 3000 ? 'needs-improvement' : 'poor';
          reportMetric('FCP', value, rating);
        }
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      const value = lastEntry.startTime;
      metricsRef.current.lcp = value;
      const rating = value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor';
      reportMetric('LCP', value, rating);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as any;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
        }
      }
      metricsRef.current.cls = clsValue;
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
        const value = fidEntry.processingStart - fidEntry.startTime;
        metricsRef.current.fid = value;
        const rating = value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor';
        reportMetric('FID', value, rating);
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Long Tasks
    const longtaskObserver = new PerformanceObserver((list) => {
      metricsRef.current.longtasks += list.getEntries().length;
      list.getEntries().forEach((entry) => {
        console.warn('⚠️ Long task detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name
        });
      });
    });
    longtaskObserver.observe({ entryTypes: ['longtask'] });

    // Time to First Byte
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.requestStart;
      metricsRef.current.ttfb = ttfb;
      const rating = ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor';
      reportMetric('TTFB', ttfb, rating);
    }

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
      longtaskObserver.disconnect();
    };
  }, [reportMetric]);

  const measureResourceTiming = useCallback(() => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const slowResources = resources.filter(resource => resource.duration > 1000);
    
    if (slowResources.length > 0) {
      console.group('🐌 Slow Resources Detected:');
      slowResources.forEach(resource => {
        console.warn(`${resource.name}: ${resource.duration.toFixed(2)}ms`);
      });
      console.groupEnd();
    }

    const largeResources = resources.filter(resource => 
      resource.transferSize && resource.transferSize > 500000 // > 500KB
    );
    
    if (largeResources.length > 0) {
      console.group('📦 Large Resources Detected:');
      largeResources.forEach(resource => {
        const sizeKB = resource.transferSize ? (resource.transferSize / 1024).toFixed(2) : 'unknown';
        console.warn(`${resource.name}: ${sizeKB}KB`);
      });
      console.groupEnd();
    }
  }, []);

  useEffect(() => {
    const cleanup = measureWebVitals();
    
    // Measure resource timing after page load
    if (document.readyState === 'complete') {
      measureResourceTiming();
    } else {
      window.addEventListener('load', measureResourceTiming);
    }

    return () => {
      cleanup();
      window.removeEventListener('load', measureResourceTiming);
    };
  }, [measureWebVitals, measureResourceTiming]);

  return {
    getMetrics: () => metricsRef.current,
    measureResourceTiming
  };
};
