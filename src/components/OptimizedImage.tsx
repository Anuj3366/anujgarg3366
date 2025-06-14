
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  onLoad,
  onError,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchpriority={fetchPriority}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default OptimizedImage;
