
import { memo, useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  className,
  width,
  height,
  onLoad,
  onError
}) => {
  const [hasError, setHasError] = useState(false);

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
      onLoad={onLoad}
      onError={() => {
        setHasError(true);
        onError?.();
      }}
      className={className}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
