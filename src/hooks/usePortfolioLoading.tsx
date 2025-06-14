
import { useState, useEffect } from "react";
import { preloadImages } from "@/utils/performance";

export const usePortfolioLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const progressSteps = [15, 30, 55, 80, 95, 100];
    let currentStep = 0;

    const fakeLoading = () => {
      if (!isMounted) return;
      setLoadingProgress(progressSteps[currentStep]);
      currentStep++;
      if (currentStep < progressSteps.length) {
        setTimeout(fakeLoading, 160);
      }
    };
    fakeLoading();

    const criticalImages = [
      "https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif",
      "https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif"
    ];

    preloadImages(criticalImages)
      .then(() => setTimeout(() => isMounted && setIsLoading(false), 500))
      .catch(() => setTimeout(() => isMounted && setIsLoading(false), 800));

    return () => { isMounted = false; };
  }, []);

  return { isLoading, loadingProgress };
};
