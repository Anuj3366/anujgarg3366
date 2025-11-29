
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EnhancedErrorBoundary from "@/components/EnhancedErrorBoundary";
import SEOHead from "@/components/SEOHead";
import { OptimizedThemeProvider } from "@/components/providers/OptimizedThemeProvider";

// Lazy load pages with better chunking
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const AdminAuth = React.lazy(() => import("./pages/AdminAuth"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      networkMode: 'offlineFirst',
    },
    mutations: {
      retry: 1,
    },
  },
});

// Optimized loading fallback
const LoadingFallback = React.memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/90 to-background/80">
    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-pulse"></div>
  </div>
));

LoadingFallback.displayName = "LoadingFallback";

const App: React.FC = () => (
  <EnhancedErrorBoundary>
    <OptimizedThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={300}>
          <SEOHead />
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminAuth />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster />
          <Sonner 
            position="bottom-right" 
            expand={false}
            richColors
            closeButton
          />
        </TooltipProvider>
      </QueryClientProvider>
    </OptimizedThemeProvider>
  </EnhancedErrorBoundary>
);

export default App;
