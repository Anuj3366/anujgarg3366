
// Web Vitals measurement utility for real performance monitoring
interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export const measureWebVitals = () => {
  // First Contentful Paint
  const measureFCP = () => {
    return new Promise<WebVitalMetric>((resolve) => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            const value = entry.startTime;
            resolve({
              name: 'FCP',
              value,
              rating: value < 1800 ? 'good' : value < 3000 ? 'needs-improvement' : 'poor'
            });
            observer.disconnect();
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    });
  };

  // Largest Contentful Paint
  const measureLCP = () => {
    return new Promise<WebVitalMetric>((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        const value = lastEntry.startTime;
        resolve({
          name: 'LCP',
          value,
          rating: value < 2500 ? 'good' : value < 4000 ? 'needs-improvement' : 'poor'
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    });
  };

  // Cumulative Layout Shift
  const measureCLS = () => {
    return new Promise<WebVitalMetric>((resolve) => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });

      // Resolve after 5 seconds
      setTimeout(() => {
        resolve({
          name: 'CLS',
          value: clsValue,
          rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
        });
        observer.disconnect();
      }, 5000);
    });
  };

  // First Input Delay
  const measureFID = () => {
    return new Promise<WebVitalMetric>((resolve) => {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const value = (entry as any).processingStart - entry.startTime;
          resolve({
            name: 'FID',
            value,
            rating: value < 100 ? 'good' : value < 300 ? 'needs-improvement' : 'poor'
          });
          observer.disconnect();
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    });
  };

  return {
    measureFCP,
    measureLCP,
    measureCLS,
    measureFID
  };
};

export const reportWebVitals = async (onReport?: (metric: WebVitalMetric) => void) => {
  const vitals = measureWebVitals();
  
  try {
    const [fcp, lcp, cls] = await Promise.all([
      vitals.measureFCP(),
      vitals.measureLCP(),
      vitals.measureCLS()
    ]);

    [fcp, lcp, cls].forEach(metric => {
      console.log(`${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
      onReport?.(metric);
    });

    // FID is measured on first interaction
    vitals.measureFID().then(fid => {
      console.log(`${fid.name}: ${fid.value.toFixed(2)}ms (${fid.rating})`);
      onReport?.(fid);
    });
  } catch (error) {
    console.warn('Web Vitals measurement failed:', error);
  }
};
