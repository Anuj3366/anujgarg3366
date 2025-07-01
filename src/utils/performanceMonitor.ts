
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();
  
  private constructor() {}
  
  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }
  
  startTiming(label: string): void {
    this.metrics.set(label, performance.now());
  }
  
  endTiming(label: string): number {
    const startTime = this.metrics.get(label);
    if (!startTime) {
      console.warn(`No start time found for label: ${label}`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    
    console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  }
  
  measureComponent<T>(component: () => T, label: string): T {
    this.startTiming(label);
    const result = component();
    this.endTiming(label);
    return result;
  }
  
  getPageLoadMetrics(): Record<string, number> {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigation) {
      return {};
    }
    
    return {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ssl: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      domProcessing: navigation.domContentLoadedEventStart - navigation.responseEnd,
      domComplete: navigation.loadEventStart - navigation.fetchStart,
      loadComplete: navigation.loadEventEnd - navigation.fetchStart,
    };
  }
  
  logPerformanceMetrics(): void {
    const metrics = this.getPageLoadMetrics();
    console.group('📊 Performance Metrics');
    Object.entries(metrics).forEach(([key, value]) => {
      console.log(`${key}: ${value.toFixed(2)}ms`);
    });
    console.groupEnd();
  }
  
  checkCriticalMetrics(): void {
    const metrics = this.getPageLoadMetrics();
    const warnings = [];
    
    if (metrics.ttfb > 600) warnings.push('⚠️ TTFB is high (>600ms)');
    if (metrics.domComplete > 3000) warnings.push('⚠️ DOM Complete is slow (>3s)');
    if (metrics.loadComplete > 5000) warnings.push('⚠️ Load Complete is very slow (>5s)');
    
    if (warnings.length > 0) {
      console.warn('Performance Issues Detected:', warnings);
    } else {
      console.log('✅ Performance metrics look good!');
    }
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Auto-run performance check after page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      performanceMonitor.logPerformanceMetrics();
      performanceMonitor.checkCriticalMetrics();
    }, 1000);
  });
}
