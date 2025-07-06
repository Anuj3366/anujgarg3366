
import React from 'react'
import { createRoot } from 'react-dom/client'
import { PerformanceOptimizer } from './utils/performanceOptimizer'

// Start critical performance monitoring
PerformanceOptimizer.measurePerformance('app-initialization', () => {
  console.log('🚀 Starting app initialization');
});

// Preload critical resources
const preloadCriticalResources = async () => {
  const promises = [
    // Preload critical CSS
    import('./index.css'),
    // Preload critical hero image
    fetch('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80', {
      headers: { accept: 'image/*' }
    }).catch(() => null)
  ];

  try {
    await Promise.allSettled(promises);
  } catch (error) {
    console.warn('Some critical resources failed to preload:', error);
  }
};

// Lazy load main app
const App = React.lazy(() => import('./App.tsx'));

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Optimized render function
const renderApp = () => {
  PerformanceOptimizer.measurePerformance('app-render', () => {
    root.render(
      <React.StrictMode>
        <React.Suspense 
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/90 to-background/80">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-pulse"></div>
            </div>
          }
        >
          <App />
        </React.Suspense>
      </React.StrictMode>
    );
  });
};

// Initialize app with optimized loading sequence
const initializeApp = async () => {
  // Load critical resources in parallel
  await preloadCriticalResources();
  
  // Render app
  renderApp();
  
  console.log('✅ App initialized successfully');
  
  // Report performance metrics
  setTimeout(() => {
    const metrics = PerformanceOptimizer.getMetrics();
    console.log('📊 Performance Metrics:', metrics);
  }, 1000);
};

// Start app initialization
initializeApp().catch((error) => {
  console.error('❌ App initialization failed:', error);
  // Render anyway as fallback
  renderApp();
});

// Optimized service worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
      updateViaCache: 'none'
    }).then(() => {
      console.log('✅ ServiceWorker registered');
    }).catch((error) => {
      console.warn('⚠️ ServiceWorker registration failed:', error);
    });
  });
}
