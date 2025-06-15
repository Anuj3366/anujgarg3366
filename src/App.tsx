
import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnhancedErrorBoundary from "@/components/EnhancedErrorBoundary";
import SEOHead from "@/components/SEOHead";
import SecurityHeaders from "@/components/SecurityHeaders";
import BundleOptimizer from "@/components/BundleOptimizer";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { useAdvancedPerformance } from "@/hooks/useAdvancedPerformance";
import { useLayoutStability } from "@/hooks/useLayoutStability";
import { reportWebVitals } from "@/utils/webVitals";
import { errorTracker } from "@/utils/errorTracking";
import { runAccessibilityAudit } from "@/utils/accessibilityChecker";

// Lazy load pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Enhanced loading component with layout stability
const AppSuspenseLoading = () => (
  <div 
    className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5"
    style={{ aspectRatio: '16/9', minHeight: '100vh' }} // Prevent layout shift
  >
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin animate-reverse"></div>
      </div>
      <p className="text-muted-foreground font-medium">Loading...</p>
    </div>
  </div>
);

// Optimized QueryClient configuration with better caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (failureCount >= 3) return false;
        if (error instanceof Error && error.message.includes('404')) return false;
        return true;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const AppContent: React.FC = () => {
  // Initialize performance optimizations
  usePerformanceOptimization({
    enableImagePreloading: true,
    enableResourceHints: true,
    enableMemoryOptimization: true,
  });

  // Initialize advanced performance monitoring
  const { getMetrics } = useAdvancedPerformance();
  
  // Initialize layout stability monitoring
  const { getCurrentCLS } = useLayoutStability({ 
    threshold: 0.1, 
    reportThreshold: 0.05 
  });

  // Initialize monitoring and auditing
  useEffect(() => {
    // Report web vitals with enhanced tracking
    reportWebVitals((metric) => {
      console.log(`🎯 Web Vital - ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
      
      // In production, send to analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: metric.name,
          value: Math.round(metric.value),
          metric_rating: metric.rating
        });
      }
    });

    // Run accessibility audit in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        runAccessibilityAudit();
      }, 2000);
    }

    // Enhanced performance monitoring
    const performanceTimer = setInterval(() => {
      const metrics = getMetrics();
      const cls = getCurrentCLS();
      
      if (cls > 0.1) {
        console.warn('⚠️ High CLS detected:', cls);
      }
      
      // Log performance summary
      console.group('📊 Performance Summary:');
      console.log('FCP:', metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'pending');
      console.log('LCP:', metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'pending');
      console.log('CLS:', cls.toFixed(4));
      console.log('Long Tasks:', metrics.longtasks);
      console.groupEnd();
    }, 30000); // Every 30 seconds

    // Monitor bundle loading performance
    const bundleObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes('chunk') && entry.duration > 200) {
          console.warn(`🐌 Slow chunk: ${entry.name} (${entry.duration.toFixed(2)}ms)`);
        }
      }
    });

    if ('PerformanceObserver' in window) {
      try {
        bundleObserver.observe({ entryTypes: ['resource'] });
      } catch (error) {
        console.warn('Bundle observer setup failed:', error);
      }
    }

    return () => {
      clearInterval(performanceTimer);
      bundleObserver.disconnect();
    };
  }, [getMetrics, getCurrentCLS]);

  return (
    <Suspense fallback={<AppSuspenseLoading />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => (
  <Enhance​dErrorBoundary
    onError={(error, errorInfo) => {
      // Enhanced error reporting
      errorTracker.reportError({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        additionalInfo: errorInfo
      });
    }}
  >
    <SecurityHeaders />
    <BundleOptimizer />
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <SEOHead />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        <Toaster />
        <Sonner 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            className: "bg-card text-card-foreground border-border",
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  </EnhancedErrorBoundary>
);

export default App;
