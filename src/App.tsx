
import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnhancedErrorBoundary from "@/components/EnhancedErrorBoundary";
import SEOHead from "@/components/SEOHead";
import SecurityHeaders from "@/components/SecurityHeaders";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { reportWebVitals } from "@/utils/webVitals";
import { errorTracker } from "@/utils/errorTracking";
import { runAccessibilityAudit } from "@/utils/accessibilityChecker";

// Lazy load pages for better performance
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Enhanced loading component
const AppSuspenseLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-primary/5">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin animate-reverse"></div>
      </div>
      <p className="text-muted-foreground font-medium">Loading...</p>
    </div>
  </div>
);

// Optimized QueryClient configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: (failureCount, error) => {
        // Smart retry logic
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

  // Initialize monitoring and auditing
  useEffect(() => {
    // Report web vitals
    reportWebVitals((metric) => {
      // In production, you might want to send this to analytics
      console.log(`Web Vital - ${metric.name}: ${metric.value}ms (${metric.rating})`);
    });

    // Run accessibility audit in development
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        runAccessibilityAudit();
      }, 2000);
    }

    // Setup performance monitoring
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Log long tasks
        if (entry.entryType === 'longtask') {
          console.warn('Long task detected:', entry.duration);
        }
        
        // Log large layout shifts
        if (entry.entryType === 'layout-shift' && (entry as any).value > 0.1) {
          console.warn('Large layout shift detected:', (entry as any).value);
        }
      });
    });

    // Start observing if supported
    if ('PerformanceObserver' in window) {
      try {
        observer.observe({ entryTypes: ['longtask', 'layout-shift'] });
      } catch (e) {
        // Some browsers might not support all entry types
        console.warn('Performance observer setup failed:', e);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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
  <EnhancedErrorBoundary
    onError={(error, errorInfo) => {
      // Custom error reporting
      errorTracker.reportError({
        message: error.message,
        stack: error.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
    }}
  >
    <SecurityHeaders />
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
