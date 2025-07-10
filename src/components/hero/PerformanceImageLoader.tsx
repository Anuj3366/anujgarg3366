import { memo, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceImageLoaderProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  placeholder?: string;
}

const PerformanceImageLoader = memo<PerformanceImageLoaderProps>(({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError,
  placeholder
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(placeholder || '');

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      handleLoad();
    };
    img.onerror = handleError;
    
    if (priority) {
      img.loading = 'eager';
    }
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, priority, handleLoad, handleError]);

  if (hasError) {
    return (
      <div className={cn("bg-muted flex items-center justify-center rounded-full", className)}>
        <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse" />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn(
        "transition-all duration-500 ease-out",
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
        className
      )}
    />
  );
});

PerformanceImageLoader.displayName = 'PerformanceImageLoader';

export default PerformanceImageLoader;