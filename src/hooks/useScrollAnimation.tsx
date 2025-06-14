
import { useEffect, useRef } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onIntersect?: (isIntersecting: boolean) => void;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    onIntersect
  } = options;

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting) {
          element.classList.add('animate-fade-in');
          element.classList.remove('opacity-0', 'translate-y-4');
        } else if (!triggerOnce) {
          element.classList.remove('animate-fade-in');
          element.classList.add('opacity-0', 'translate-y-4');
        }

        onIntersect?.(isIntersecting);

        if (triggerOnce && isIntersecting) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    // Set initial state
    element.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, onIntersect]);

  return elementRef;
};
