
import { useEffect } from 'react';

export const useBasicPerformance = () => {
  useEffect(() => {
    // Simple web vitals monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          const fcp = entry.startTime;
          const rating = fcp < 1800 ? 'good' : fcp < 3000 ? 'needs-improvement' : 'poor';
          console.log(`🎯 FCP: ${fcp.toFixed(2)}ms (${rating})`);
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['paint'] });
    } catch (error) {
      console.warn('Performance observer failed:', error);
    }

    return () => observer.disconnect();
  }, []);
};
