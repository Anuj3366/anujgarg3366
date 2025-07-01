
import React from 'react'
import { createRoot } from 'react-dom/client'
import { performanceMonitor } from './utils/performanceMonitor'

// Start performance monitoring
performanceMonitor.startTiming('app-initialization');

// Critical CSS import - non-blocking
const loadCSS = () => import('./index.css');

// Preload critical components immediately
const App = React.lazy(() => import('./App.tsx'));

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Optimized loading sequence for better FCP
const renderApp = () => {
  performanceMonitor.startTiming('app-render');
  
  root.render(
    <React.StrictMode>
      <React.Suspense 
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/90 to-background/80">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-pulse"></div>
          </div>
        }
      >
        <App />
      </React.Suspense>
    </React.StrictMode>
  );
  
  performanceMonitor.endTiming('app-render');
};

// Load CSS and render immediately
loadCSS().then(() => {
  renderApp();
  performanceMonitor.endTiming('app-initialization');
}).catch(() => {
  // Fallback - render anyway if CSS fails to load
  renderApp();
  performanceMonitor.endTiming('app-initialization');
});

// Defer service worker registration to not block initial render
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
