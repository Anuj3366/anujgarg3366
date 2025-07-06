
import { memo, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Logger } from '@/utils/logger';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onLoad,
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
    Logger.info('Image rendered successfully', alt);
  }, [onLoad, alt]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
    Logger.error('Image render failed', alt);
  }, [onError, alt]);

  if (hasError) {
    return (
      <div className={cn("bg-muted flex items-center justify-center", className)}>
        <span className="text-muted-foreground text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      onLoad={handleLoad}
      onError={handleError}
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
