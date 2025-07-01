
import React from 'react'
import { createRoot } from 'react-dom/client'
import { performanceMonitor } from './utils/performanceMonitor'

// Start performance monitoring
performanceMonitor.startTiming('app-initialization');

// Preload critical components immediately
const App = React.lazy(() => import('./App.tsx'));

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Prevent double root creation
if (container.hasChildNodes()) {
  console.warn('Root container already has children, clearing...');
  container.innerHTML = '';
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
            <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
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
const loadCSS = async () => {
  try {
    await import('./index.css');
    renderApp();
  } catch (error) {
    console.warn('CSS loading failed, rendering anyway:', error);
    renderApp();
  } finally {
    performanceMonitor.endTiming('app-initialization');
  }
};

loadCSS();

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
