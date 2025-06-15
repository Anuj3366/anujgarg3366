
import { memo, useEffect } from 'react';

const BundleOptimizer = memo(() => {
  useEffect(() => {
    // Prefetch critical chunks
    const prefetchChunks = () => {
      const criticalChunks = [
        '/src/components/About.tsx',
        '/src/components/Skills.tsx',
        '/src/components/Projects.tsx'
      ];

      criticalChunks.forEach(chunk => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = chunk;
        document.head.appendChild(link);
      });
    };

    // Use requestIdleCallback for non-critical work
    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetchChunks);
    } else {
      setTimeout(prefetchChunks, 1000);
    }

    // Monitor bundle loading performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('chunk') && entry.duration > 100) {
          console.warn('Slow chunk loading:', entry.name, entry.duration);
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null;
});

BundleOptimizer.displayName = 'BundleOptimizer';

export default BundleOptimizer;
