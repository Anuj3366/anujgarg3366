
import { useEffect, useCallback } from 'react';
import { throttle } from '@/utils/performance';

export const useOptimizedScroll = (callback: (position: number) => void) => {
  const throttledCallback = useCallback(
    throttle((position: number) => callback(position), 16), // ~60fps
    [callback]
  );

  useEffect(() => {
    const handleScroll = () => {
      throttledCallback(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttledCallback]);
};
