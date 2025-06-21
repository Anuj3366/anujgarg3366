
import { memo, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageLazyProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  priority?: boolean;
  sizes?: string;
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImageLazy = memo<OptimizedImageLazyProps>(({
  src,
  alt,
  className,
  width,
  height,
  onLoad,
  onError,
  blurDataURL,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

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
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
      className={cn(
        "transition-opacity duration-200",
        isLoaded ? "opacity-100" : "opacity-50",
        className
      )}
      {...rest}
    />
  );
});

OptimizedImageLazy.displayName = 'OptimizedImageLazy';

export default OptimizedImageLazy;
