
// Critical resources that must load for initial render
export const CRITICAL_IMAGES = [
  "https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif"
];

// Simple image preloader without complex error handling
export const preloadCriticalImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Don't fail, just continue
    img.src = src;
    
    // Timeout fallback
    setTimeout(resolve, 3000);
  });
};

export const preloadCriticalImages = async (): Promise<void> => {
  try {
    await Promise.allSettled(
      CRITICAL_IMAGES.map(preloadCriticalImage)
    );
  } catch (error) {
    console.warn('Image preload failed:', error);
  }
};
