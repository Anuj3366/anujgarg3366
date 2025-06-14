
import { useEffect, useRef, useCallback } from 'react';
import { debounce, throttle } from '@/utils/performance';

interface PerformanceOptions {
  enableImagePreloading?: boolean;
  enableResourceHints?: boolean;
  enableMemoryOptimization?: boolean;
}

export const usePerformanceOptimization = (options: PerformanceOptions = {}) => {
  const {
    enableImagePreloading = true,
    enableResourceHints = true,
    enableMemoryOptimization = true,
  } = options;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const preloadedImages = useRef<Set<string>>(new Set());

  // Optimized image preloader with intersection observer
  const preloadImageOnIntersection = useCallback((src: string, element: HTMLElement) => {
    if (!enableImagePreloading || preloadedImages.current.has(src)) return;

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = new Image();
              img.src = src;
              preloadedImages.current.add(src);
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' }
      );
    }

    observerRef.current.observe(element);
  }, [enableImagePreloading]);

  // Add resource hints for better loading performance
  useEffect(() => {
    if (!enableResourceHints) return;

    const addResourceHints = () => {
      // Preconnect to external domains
      const domains = ['images.unsplash.com', 'fonts.googleapis.com'];
      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = `https://${domain}`;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Prefetch critical resources
      const criticalResources = ['/icons/icon-192x192.png', '/icons/icon-512x512.png'];
      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
      });
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(addResourceHints);
    } else {
      setTimeout(addResourceHints, 100);
    }
  }, [enableResourceHints]);

  // Memory optimization - cleanup unused resources
  useEffect(() => {
    if (!enableMemoryOptimization) return;

    const cleanupResources = debounce(() => {
      // Clear preloaded images cache periodically
      if (preloadedImages.current.size > 50) {
        preloadedImages.current.clear();
      }

      // Suggest garbage collection if available
      if ('gc' in window && typeof window.gc === 'function') {
        window.gc();
      }
    }, 30000); // 30 seconds

    const interval = setInterval(cleanupResources, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [enableMemoryOptimization]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    preloadImageOnIntersection,
    preloadedImages: preloadedImages.current,
  };
};

// Export optimized scroll handler
export const useOptimizedScroll = (callback: (scrollY: number) => void) => {
  const throttledCallback = useCallback(
    throttle((scrollY: number) => callback(scrollY), 16), // ~60fps
    [callback]
  );

  useEffect(() => {
    const handleScroll = () => throttledCallback(window.scrollY);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttledCallback]);
};
