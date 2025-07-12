
import { useEffect, useRef, useCallback } from 'react';
import { Logger } from '@/utils/logger';

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
    if (ticking.current) return;
    
    ticking.current = true;
    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY.current);
      
      if (diff < threshold) {
        ticking.current = false;
        return;
      }
      
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;
      
      try {
        callback(currentScrollY, direction);
      } catch (error) {
        Logger.error('Scroll callback error', error);
      }
      
      ticking.current = false;
    });
  }, [callback, threshold]);

  // Simple throttle implementation
  const throttledScroll = useCallback(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, throttleMs);
    };
  }, [handleScroll, throttleMs])();

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll, { passive });

    Logger.info('Optimized scroll listener attached');
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      Logger.info('Optimized scroll listener cleaned up');
    };
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
      ([entry]) => {
        try {
          callback(entry.isIntersecting);
        } catch (error) {
          Logger.error('Intersection callback error', error);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);
    Logger.info('Intersection observer attached');
    
    return () => {
      observer.disconnect();
      Logger.info('Intersection observer cleaned up');
    };
  }, [callback, options]);

  return elementRef;
}
