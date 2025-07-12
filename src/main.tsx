
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Logger } from './utils/logger'

// Start critical performance monitoring
Logger.info('Starting app initialization');

// Preload critical resources
const preloadCriticalResources = async () => {
  const promises = [
    // Preload critical CSS
    import('./index.css'),
    // Preload critical hero image - with error handling
    fetch('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80', {
      headers: { accept: 'image/*' }
    }).catch(() => {
      Logger.warn('Hero image preload failed');
      return null;
    })
  ];

  try {
    const results = await Promise.allSettled(promises);
    const failedPromises = results.filter(result => result.status === 'rejected');
    if (failedPromises.length > 0) {
      Logger.warn(`${failedPromises.length} critical resources failed to preload`);
    }
  } catch (error) {
    Logger.error('Critical resource preload error:', error);
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
};

// Initialize app with optimized loading sequence
const initializeApp = async () => {
  try {
    // Load critical resources in parallel
    await preloadCriticalResources();
    
    // Render app
    renderApp();
    
    Logger.info('App initialized successfully');
  } catch (error) {
    Logger.error('App initialization failed:', error);
    // Render anyway as fallback
    renderApp();
  }
};

// Start app initialization
initializeApp();

// Optimized service worker registration
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
      updateViaCache: 'none'
    }).then(() => {
      Logger.info('ServiceWorker registered successfully');
    }).catch((error) => {
      Logger.warn('ServiceWorker registration failed:', error);
    });
  });
}
