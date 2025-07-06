
import { useState, useEffect, useCallback } from 'react';
import { Logger } from '@/utils/logger';

interface ImageLoaderOptions {
  src: string;
  priority?: boolean;
  timeout?: number;
}

export const useImageLoader = ({ src, priority = false, timeout = 10000 }: ImageLoaderOptions) => {
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
      Logger.warn('Image load timeout', src);
      setHasError(true);
      setIsLoading(false);
    }, timeout);

    img.onload = () => {
      clearTimeout(timeoutId);
      setIsLoaded(true);
      setIsLoading(false);
      setHasError(false);
      Logger.info('Image loaded successfully', src);
    };

    img.onerror = () => {
      clearTimeout(timeoutId);
      Logger.error('Image failed to load', src);
      setHasError(true);
      setIsLoading(false);
    };

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
