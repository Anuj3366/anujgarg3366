
import { useEffect, useRef, useCallback } from 'react';

interface LayoutStabilityOptions {
  threshold?: number;
  reportThreshold?: number;
}

export const useLayoutStability = (options: LayoutStabilityOptions = {}) => {
  const { threshold = 0.1, reportThreshold = 0.05 } = options;
  const clsScore = useRef(0);
  const sessionEntries = useRef<PerformanceEntry[]>([]);

  const measureCLS = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as any;
          if (!layoutShiftEntry.hadRecentInput) {
            clsScore.current += layoutShiftEntry.value;
            sessionEntries.current.push(entry);
            
            if (layoutShiftEntry.value > reportThreshold) {
              console.warn('⚠️ Layout shift detected:', {
                value: layoutShiftEntry.value,
                sources: layoutShiftEntry.sources,
                time: entry.startTime
              });
            }
          }
        }
        
        if (clsScore.current > threshold) {
          console.error('❌ High CLS score detected:', clsScore.current);
        }
      });

      try {
        observer.observe({ entryTypes: ['layout-shift'] });
        return () => observer.disconnect();
      } catch (error) {
        console.warn('Layout shift observer not supported:', error);
        return () => {};
      }
    }
    return () => {};
  }, [threshold, reportThreshold]);

  useEffect(() => {
    const cleanup = measureCLS();
    return cleanup;
  }, [measureCLS]);

  return {
    getCurrentCLS: () => clsScore.current,
    getLayoutShifts: () => sessionEntries.current
  };
};

// Hook for preventing layout shifts
export const usePreventLayoutShift = () => {
  const reserveSpace = useCallback((element: HTMLElement, aspectRatio?: number) => {
    if (aspectRatio) {
      element.style.aspectRatio = aspectRatio.toString();
    }
    element.style.minHeight = element.style.minHeight || '1px';
  }, []);

  const stabilizeImage = useCallback((img: HTMLImageElement) => {
    if (img.naturalWidth && img.naturalHeight) {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      img.style.aspectRatio = aspectRatio.toString();
    }
  }, []);

  return { reserveSpace, stabilizeImage };
};
