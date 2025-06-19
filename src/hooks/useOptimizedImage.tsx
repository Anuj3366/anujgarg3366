
import { useState, useEffect } from 'react';

interface UseOptimizedImageProps {
  src: string;
  placeholder?: string;
}

export const useOptimizedImage = ({ src, placeholder }: UseOptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setHasError(true);
    };
    
    img.src = src;
  }, [src]);

  return { imageSrc, isLoaded, hasError };
};
