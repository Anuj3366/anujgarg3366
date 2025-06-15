
import { useEffect, memo } from 'react';

interface CriticalResource {
  url: string;
  type: 'font' | 'image' | 'script' | 'style';
  priority: 'high' | 'medium' | 'low';
}

const CRITICAL_RESOURCES: CriticalResource[] = [
  {
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    type: 'font',
    priority: 'high'
  },
  {
    url: '/icons/custom-favicon.svg',
    type: 'image',
    priority: 'high'
  },
  {
    url: 'https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif',
    type: 'image',
    priority: 'medium'
  }
];

const CriticalResourcePreloader = memo(() => {
  useEffect(() => {
    const preloadResource = (resource: CriticalResource) => {
      return new Promise<void>((resolve, reject) => {
        const link = document.createElement('link');
        
        switch (resource.type) {
          case 'font':
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource.url;
            link.crossOrigin = 'anonymous';
            break;
          case 'image':
            link.rel = 'preload';
            link.as = 'image';
            link.href = resource.url;
            break;
          case 'script':
            link.rel = 'preload';
            link.as = 'script';
            link.href = resource.url;
            break;
          case 'style':
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource.url;
            break;
        }

        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to preload: ${resource.url}`));
        
        document.head.appendChild(link);
      });
    };

    const preloadCriticalResources = async () => {
      const highPriorityResources = CRITICAL_RESOURCES.filter(r => r.priority === 'high');
      const mediumPriorityResources = CRITICAL_RESOURCES.filter(r => r.priority === 'medium');
      
      try {
        // Preload high priority resources first
        await Promise.all(highPriorityResources.map(preloadResource));
        console.log('✅ High priority resources preloaded');
        
        // Then preload medium priority resources
        setTimeout(async () => {
          await Promise.all(mediumPriorityResources.map(preloadResource));
          console.log('✅ Medium priority resources preloaded');
        }, 100);
      } catch (error) {
        console.warn('⚠️ Some critical resources failed to preload:', error);
      }
    };

    preloadCriticalResources();
  }, []);

  return null;
});

CriticalResourcePreloader.displayName = 'CriticalResourcePreloader';

export default CriticalResourcePreloader;
