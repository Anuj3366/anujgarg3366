
import { useEffect, useState } from 'react';

interface PreloadConfig {
  src: string;
  priority: 'high' | 'low';
  crossorigin?: 'anonymous' | 'use-credentials';
}

export const useImagePreloader = (images: PreloadConfig[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    // Sort by priority - high priority images first
    const sortedImages = [...images].sort((a, b) => 
      a.priority === 'high' ? -1 : b.priority === 'high' ? 1 : 0
    );

    let loadedCount = 0;
    const totalImages = sortedImages.length;

    const preloadImage = (config: PreloadConfig) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        
        if (config.crossorigin) {
          img.crossOrigin = config.crossorigin;
        }

        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(config.src));
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          resolve();
        };

        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          resolve();
        };

        img.src = config.src;
      });
    };

    // Load high priority images first, then low priority
    const highPriorityImages = sortedImages.filter(img => img.priority === 'high');
    const lowPriorityImages = sortedImages.filter(img => img.priority === 'low');

    // Load high priority images immediately
    Promise.all(highPriorityImages.map(preloadImage)).then(() => {
      // Then load low priority images
      lowPriorityImages.forEach(preloadImage);
    });

  }, [images]);

  return { isLoading, loadedImages };
};
