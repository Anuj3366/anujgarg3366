
// Lightweight performance optimization utilities
export class PerformanceOptimizer {
  private static metrics = new Map<string, number>();
  
  // Optimized throttle with immediate execution option
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    immediate = false
  ): T {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;
    
    return ((...args: any[]) => {
      const currentTime = Date.now();
      
      if (immediate && currentTime - lastExecTime > delay) {
        lastExecTime = currentTime;
        return func(...args);
      }
      
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        lastExecTime = Date.now();
        func(...args);
        timeoutId = null;
      }, delay);
    }) as T;
  }
  
  // Efficient debounce
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): T {
    let timeoutId: NodeJS.Timeout;
    
    return ((...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
  }
  
  // Memory-efficient event listener management
  static addOptimizedListener(
    element: Element | Window,
    event: string,
    handler: EventListener,
    options: AddEventListenerOptions = { passive: true }
  ) {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler);
  }
  
  // Performance measurement
  static measurePerformance(label: string, fn: () => void) {
    const start = performance.now();
    fn();
    const duration = performance.now() - start;
    this.metrics.set(label, duration);
    return duration;
  }
  
  // Get performance insights
  static getMetrics() {
    return Object.fromEntries(this.metrics);
  }
}

// Image optimization utilities
export const ImageOptimizer = {
  // Generate responsive image URLs
  generateResponsiveUrl(
    baseUrl: string,
    width: number,
    quality = 80,
    format = 'auto'
  ): string {
    const url = new URL(baseUrl);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('fm', format);
    return url.toString();
  },
  
  // Preload critical images
  preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      if (priority === 'high') {
        (img as any).fetchPriority = 'high';
      }
      img.src = src;
    });
  }
};
