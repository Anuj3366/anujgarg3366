
import { useState, useEffect } from 'react';

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
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholder);

  useEffect(() => {
    if (loading === 'eager' || typeof window === 'undefined') {
      setImageSrc(src);
      return;
    }

    // Intersection Observer for lazy loading
    const img = new Image();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.onload = () => {
            setImageSrc(src);
            setIsLoaded(true);
          };
          
          img.onerror = () => {
            setHasError(true);
          };
          
          img.src = src;
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
  }, [src, loading]);

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
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
    />
  );
};

export default OptimizedImage;
