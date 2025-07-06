
import { useEffect, useRef, useCallback } from 'react';
import { PerformanceOptimizer } from '@/utils/performanceOptimizer';

interface ScrollOptions {
  throttleMs?: number;
  passive?: boolean;
  threshold?: number;
}

export function useOptimizedScroll(
  callback: (scrollY: number, direction: 'up' | 'down') => void,
  options: ScrollOptions = {}
) {
  const { throttleMs = 16, passive = true, threshold = 5 } = options;
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const diff = Math.abs(currentScrollY - lastScrollY.current);
    
    // Only trigger if scroll difference exceeds threshold
    if (diff < threshold) return;
    
    const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
    lastScrollY.current = currentScrollY;
    
    callback(currentScrollY, direction);
  }, [callback, threshold]);

  const throttledScroll = useCallback(
    PerformanceOptimizer.throttle(handleScroll, throttleMs, true),
    [handleScroll, throttleMs]
  );

  useEffect(() => {
    const cleanup = PerformanceOptimizer.addOptimizedListener(
      window,
      'scroll',
      throttledScroll,
      { passive }
    );

    return cleanup;
  }, [throttledScroll, passive]);
}

// Optimized intersection observer hook
export function useOptimizedIntersection(
  callback: (isIntersecting: boolean) => void,
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => callback(entry.isIntersecting),
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, options]);

  return elementRef;
}
