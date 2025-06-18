
import { useState, useEffect } from "react";
import { preloadImages } from "@/utils/performance";

export const usePortfolioLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const progressSteps = [10, 25, 45, 65, 85, 95, 100];
    let currentStep = 0;

    const startTime = performance.now();

    const updateProgress = () => {
      if (!isMounted) return;
      
      if (currentStep < progressSteps.length) {
        setLoadingProgress(progressSteps[currentStep]);
        currentStep++;
        
        // Faster initial progress, slower towards the end
        const delay = currentStep < 3 ? 120 : currentStep < 5 ? 180 : 220;
        setTimeout(updateProgress, delay);
      }
    };

    // Start progress immediately
    updateProgress();

    const criticalImages = [
      "https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif",
      "https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80"
    ];

    // Preload with better error handling
    const loadResources = async () => {
      try {
        await preloadImages(criticalImages);
        console.log('✅ All critical images preloaded successfully');
      } catch (error) {
        console.warn('⚠️ Some images failed to preload:', error);
        // Continue anyway, don't block loading
      }

      const loadTime = performance.now() - startTime;
      console.log(`📊 Portfolio loading completed in ${loadTime.toFixed(2)}ms`);
      
      // Ensure minimum loading time for better UX (reduced from 1000ms to 800ms)
      const minLoadTime = 800;
      const remainingTime = Math.max(0, minLoadTime - loadTime);
      
      setTimeout(() => {
        if (isMounted) {
          setLoadingProgress(100);
          // Small delay before hiding loader for smooth transition
          setTimeout(() => {
            if (isMounted) {
              setIsLoading(false);
              console.log('✅ Portfolio ready for interaction');
            }
          }, 200);
        }
      }, remainingTime);
    };

    // Start loading resources
    loadResources();

    // Fallback timeout to prevent infinite loading
    const fallbackTimeout = setTimeout(() => {
      if (isMounted && isLoading) {
        console.warn('⚠️ Loading timeout reached, showing content anyway');
        setIsLoading(false);
      }
    }, 5000); // 5 second maximum loading time

    return () => { 
      isMounted = false;
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return { isLoading, loadingProgress };
};
