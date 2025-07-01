
import { useState, useEffect, useCallback } from 'react';

interface ImageLoaderOptions {
  src: string;
  priority?: boolean;
  timeout?: number;
}

export const useOptimizedImageLoader = ({ src, priority = false, timeout = 10000 }: ImageLoaderOptions) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadImage = useCallback(() => {
    if (!src) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    const timeoutId = setTimeout(() => {
      setHasError(true);
      setIsLoading(false);
    }, timeout);

    img.onload = () => {
      clearTimeout(timeoutId);
      setIsLoaded(true);
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      setHasError(true);
      setIsLoading(false);
    };

    // Set priority loading
    if (priority) {
      img.fetchPriority = 'high' as any;
    }

    img.src = src;

    return () => {
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };
  }, [src, timeout, priority]);

  useEffect(() => {
    const cleanup = loadImage();
    return cleanup;
  }, [loadImage]);

  return { isLoading, hasError, isLoaded };
};
