
import { useState, useEffect } from 'react';

interface UseOptimizedImageProps {
  src: string;
  placeholder?: string;
}

export const useOptimizedImage = ({ src, placeholder }: UseOptimizedImageProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
    setImageSrc(src);
  }, [src]);

  return { imageSrc, isLoaded, hasError: false };
};
