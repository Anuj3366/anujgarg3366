
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './utils/registerServiceWorker'

// Enhanced app initialization with error handling and performance monitoring
const initializeApp = async () => {
  try {
    // Register service worker for PWA capabilities
    await registerServiceWorker();

    // Preload critical resources
    const criticalResources = [
      '/icons/custom-favicon.svg',
      '/manifest.json'
    ];

    // Preload resources without blocking render
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });

    console.log('✅ App initialized successfully');
  } catch (error) {
    console.error('❌ App initialization failed:', error);
  }
};

// Initialize app
initializeApp();

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Enhanced render with error boundaries
const renderApp = () => {
  try {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('❌ Render failed:', error);
    // Fallback render
    root.render(
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1>Application Error</h1>
          <p>The application failed to load. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }
};

renderApp();

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.log('📊 Navigation Timing:');
        console.log(`  DNS: ${navigation.domainLookupEnd - navigation.domainLookupStart}ms`);
        console.log(`  TCP: ${navigation.connectEnd - navigation.connectStart}ms`);
        console.log(`  Request: ${navigation.responseStart - navigation.requestStart}ms`);
        console.log(`  Response: ${navigation.responseEnd - navigation.responseStart}ms`);
        console.log(`  DOM Processing: ${navigation.domContentLoadedEventStart - navigation.responseEnd}ms`);
        console.log(`  Total: ${navigation.loadEventEnd - navigation.fetchStart}ms`);
      }
    }, 1000);
  });
}
