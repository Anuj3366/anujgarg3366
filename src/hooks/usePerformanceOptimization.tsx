
import { useEffect } from 'react';
import { throttle } from '@/utils/performance';

export const useOptimizedScroll = (callback: (scrollY: number) => void) => {
  useEffect(() => {
    const throttledCallback = throttle(callback, 16); // ~60fps
    
    const handleScroll = () => {
      throttledCallback(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback]);
};
