
import { useState, useEffect } from "react";
import { preloadCriticalImages } from "@/utils/criticalResources";

export const useSimpleLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      // Quick progress animation
      const progressSteps = [20, 40, 60, 80, 95];
      let step = 0;

      const updateProgress = () => {
        if (!mounted || step >= progressSteps.length) return;
        setProgress(progressSteps[step]);
        step++;
        setTimeout(updateProgress, 100);
      };

      updateProgress();

      // Preload critical images
      await preloadCriticalImages();

      // Minimum loading time for smooth UX
      await new Promise(resolve => setTimeout(resolve, 500));

      if (mounted) {
        setProgress(100);
        setTimeout(() => {
          if (mounted) setIsLoading(false);
        }, 100);
      }
    };

    load();

    return () => { mounted = false; };
  }, []);

  return { isLoading, progress };
};
