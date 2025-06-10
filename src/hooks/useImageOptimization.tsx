
import { useState, useEffect, useCallback } from 'react';

interface UseImageOptimizationProps {
  src: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

export const useImageOptimization = ({
  src,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
}: UseImageOptimizationProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);

  const loadImage = useCallback(() => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setHasError(true);
    };
    
    img.src = src;
  }, [src]);

  useEffect(() => {
    if (loading === 'eager') {
      loadImage();
      return;
    }

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector(`[data-src="${src}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [src, loading, loadImage]);

  return { isLoaded, hasError, imageSrc };
};
