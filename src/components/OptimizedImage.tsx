
import { useImageOptimization } from '@/hooks/useImageOptimization';
import { generateId } from '@/utils/accessibility';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder,
  priority = false,
  onLoad,
  onError
}: OptimizedImageProps) => {
  const { isLoaded, hasError, imageSrc } = useImageOptimization({
    src,
    loading: priority ? 'eager' : loading,
    placeholder
  });

  const imageId = generateId('img');

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted text-muted-foreground rounded-lg ${className}`}
        role="img"
        aria-label={`Failed to load: ${alt}`}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <svg 
            className="w-8 h-8 mx-auto mb-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <img
      id={imageId}
      src={imageSrc}
      alt={alt}
      className={`transition-all duration-500 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      } ${className}`}
      width={width}
      height={height}
      loading={loading}
      data-src={src}
      onLoad={() => {
        onLoad?.();
      }}
      onError={() => {
        onError?.();
      }}
      // Accessibility improvements
      role="img"
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
};

export default OptimizedImage;
