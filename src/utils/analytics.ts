// Analytics and performance monitoring utilities

interface PerformanceMetrics {
  FCP: number;
  LCP: number;
  FID: number;
  CLS: number;
  TTFB: number;
}

interface CustomEvent {
  name: string;
  category: string;
  value?: number;
  metadata?: Record<string, any>;
}

class Analytics {
  private isInitialized = false;
  private performanceObserver: PerformanceObserver | null = null;

  init() {
    if (this.isInitialized) return;
    
    this.initPerformanceMonitoring();
    this.trackPageLoad();
    this.isInitialized = true;
  }

  private initPerformanceMonitoring() {
    if (!('PerformanceObserver' in window)) return;

    // Monitor Core Web Vitals
    this.performanceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.handlePerformanceEntry(entry);
      }
    });

    // Observe different types of performance entries
    try {
      this.performanceObserver.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance monitoring not fully supported:', error);
    }
  }

  private handlePerformanceEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case 'navigation':
        this.trackNavigationTiming(entry as PerformanceNavigationTiming);
        break;
      case 'paint':
        this.trackPaintTiming(entry as PerformancePaintTiming);
        break;
      case 'largest-contentful-paint':
        this.trackLCP(entry as any);
        break;
      case 'first-input':
        this.trackFID(entry as any);
        break;
      case 'layout-shift':
        this.trackCLS(entry as any);
        break;
    }
  }

  private trackNavigationTiming(entry: PerformanceNavigationTiming) {
    const ttfb = entry.responseStart - entry.requestStart;
    this.sendMetric('TTFB', ttfb);
  }

  private trackPaintTiming(entry: PerformancePaintTiming) {
    if (entry.name === 'first-contentful-paint') {
      this.sendMetric('FCP', entry.startTime);
    }
  }

  private trackLCP(entry: any) {
    this.sendMetric('LCP', entry.startTime);
  }

  private trackFID(entry: any) {
    this.sendMetric('FID', entry.processingStart - entry.startTime);
  }

  private trackCLS(entry: any) {
    if (!entry.hadRecentInput) {
      this.sendMetric('CLS', entry.value);
    }
  }

  private trackPageLoad() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          this.sendMetric('PageLoad', loadTime);
        }
      }, 0);
    });
  }

  private sendMetric(name: string, value: number) {
    // In a real implementation, you would send this to your analytics service
    console.log(`Performance Metric - ${name}: ${value.toFixed(2)}ms`);
    
    // Example: Send to analytics service
    // this.sendToAnalytics('performance', { metric: name, value, timestamp: Date.now() });
  }

  trackEvent(event: CustomEvent) {
    console.log('Custom Event:', event);
    // this.sendToAnalytics('event', event);
  }

  trackError(error: Error, context?: string) {
    console.error('Tracked Error:', { error: error.message, stack: error.stack, context });
    // this.sendToAnalytics('error', { message: error.message, stack: error.stack, context });
  }

  trackUserInteraction(element: string, action: string) {
    this.trackEvent({
      name: 'user_interaction',
      category: 'engagement',
      metadata: { element, action, timestamp: Date.now() }
    });
  }

  // Method to get current performance metrics
  getPerformanceMetrics(): Partial<PerformanceMetrics> {
    const metrics: Partial<PerformanceMetrics> = {};
    
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        metrics.TTFB = navigation.responseStart - navigation.requestStart;
      }

      const fcp = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcp) {
        metrics.FCP = fcp.startTime;
      }

      // Note: LCP, FID, and CLS are collected asynchronously via PerformanceObserver
      
    } catch (error) {
      console.warn('Error collecting performance metrics:', error);
    }

    return metrics;
  }

  destroy() {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
      this.performanceObserver = null;
    }
    this.isInitialized = false;
  }
}

export const analytics = new Analytics();

// Auto-initialize analytics
if (typeof window !== 'undefined') {
  analytics.init();
}

// Export utility functions
export const trackPageView = (page: string) => {
  analytics.trackEvent({
    name: 'page_view',
    category: 'navigation',
    metadata: { page, timestamp: Date.now() }
  });
};

export const trackClick = (element: string) => {
  analytics.trackUserInteraction(element, 'click');
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  analytics.trackEvent({
    name: 'form_submission',
    category: 'conversion',
    value: success ? 1 : 0,
    metadata: { formName, success }
  });
};