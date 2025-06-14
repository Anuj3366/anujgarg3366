
import React, { memo, useCallback, useState, useMemo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: string;
}

const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  onLoad,
  onError,
  width,
  height,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setImageError(true);
    onError?.();
  }, [onError]);

  const imageProps = useMemo(() => ({
    src: imageError ? placeholder : src,
    alt,
    className: `${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
    loading,
    fetchPriority,
    onLoad: handleLoad,
    onError: handleError,
    ...(width && { width }),
    ...(height && { height }),
    decoding: 'async' as const,
    'data-loaded': imageLoaded
  }), [src, alt, className, loading, fetchPriority, handleLoad, handleError, width, height, imageLoaded, imageError, placeholder]);

  return (
    <div className="relative">
      {!imageLoaded && !imageError && (
        <div 
          className={`absolute inset-0 bg-muted animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}
      <img {...imageProps} />
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
