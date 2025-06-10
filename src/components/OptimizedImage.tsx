
import { useImageOptimization } from '@/hooks/useImageOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder
}: OptimizedImageProps) => {
  const { isLoaded, hasError, imageSrc } = useImageOptimization({
    src,
    loading,
    placeholder
  });

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <span className="text-sm text-gray-500">Failed to load image</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-50'} ${className}`}
      width={width}
      height={height}
      loading={loading}
      data-src={src}
      onLoad={() => {}}
      onError={() => {}}
    />
  );
};

export default OptimizedImage;
