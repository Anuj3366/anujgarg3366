
import { useState, useEffect } from "react";
import { preloadImages } from "@/utils/performance";

export const usePortfolioLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const progressSteps = [15, 30, 55, 80, 95, 100];
    let currentStep = 0;

    const startTime = performance.now();

    const updateProgress = () => {
      if (!isMounted) return;
      setLoadingProgress(progressSteps[currentStep]);
      currentStep++;
      if (currentStep < progressSteps.length) {
        setTimeout(updateProgress, 160);
      }
    };

    updateProgress();

    const criticalImages = [
      "https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif",
      "https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
    ];

    preloadImages(criticalImages)
      .then(() => {
        const loadTime = performance.now() - startTime;
        console.log(`📊 Portfolio loading completed in ${loadTime.toFixed(2)}ms`);
        
        // Minimum loading time for better UX
        const minLoadTime = 1000;
        const remainingTime = Math.max(0, minLoadTime - loadTime);
        
        setTimeout(() => {
          if (isMounted) {
            setIsLoading(false);
            console.log('✅ Portfolio ready for interaction');
          }
        }, remainingTime);
      })
      .catch((error) => {
        console.warn('⚠️ Some images failed to preload:', error);
        setTimeout(() => isMounted && setIsLoading(false), 800);
      });

    // Performance monitoring during loading
    const loadingStartTime = performance.now();
    const checkLoadingPerformance = () => {
      const elapsed = performance.now() - loadingStartTime;
      if (elapsed > 5000 && isLoading) {
        console.warn('⚠️ Loading taking longer than expected');
      }
    };

    const performanceTimer = setTimeout(checkLoadingPerformance, 5000);

    return () => { 
      isMounted = false;
      clearTimeout(performanceTimer);
    };
  }, []);

  return { isLoading, loadingProgress };
};
