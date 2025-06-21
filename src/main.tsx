
import React from 'react'
import { createRoot } from 'react-dom/client'

// Preload critical components
const App = React.lazy(() => import('./App.tsx'));

// Import CSS asynchronously to prevent blocking
import('./index.css');

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Optimized render with Suspense for better performance
root.render(
  <React.StrictMode>
    <React.Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/90 to-background/80">
          <div className="w-48 h-48 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
        </div>
      }
    >
      <App />
    </React.Suspense>
  </React.StrictMode>
);

// Register service worker with lower priority to not block initial render
requestIdleCallback(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
      updateViaCache: 'none'
    }).then(() => {
      console.log('✅ ServiceWorker registered');
    }).catch((error) => {
      console.warn('⚠️ ServiceWorker registration failed:', error);
    });
  }
});
