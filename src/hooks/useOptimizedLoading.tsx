
import { useEffect, useState } from 'react';

export const useOptimizedLoading = () => {
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);

  useEffect(() => {
    // Mark initial load as complete after critical resources are ready
    const timer = setTimeout(() => {
      setIsInitialLoadComplete(true);
    }, 100);

    // Clean up timer
    return () => clearTimeout(timer);
  }, []);

  return { isInitialLoadComplete };
};
