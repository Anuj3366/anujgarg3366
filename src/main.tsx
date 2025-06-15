
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './utils/registerServiceWorker'
import CriticalResourcePreloader from './components/CriticalResourcePreloader'

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

// Enhanced render with error boundaries and critical resource preloading
const renderApp = () => {
  try {
    root.render(
      <React.StrictMode>
        <CriticalResourcePreloader />
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

// Enhanced performance monitoring with Core Web Vitals
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.group('📊 Enhanced Performance Metrics:');
        console.log(`  DNS: ${navigation.domainLookupEnd - navigation.domainLookupStart}ms`);
        console.log(`  TCP: ${navigation.connectEnd - navigation.connectStart}ms`);
        console.log(`  Request: ${navigation.responseStart - navigation.requestStart}ms`);
        console.log(`  Response: ${navigation.responseEnd - navigation.responseStart}ms`);
        console.log(`  DOM Processing: ${navigation.domContentLoadedEventStart - navigation.responseEnd}ms`);
        console.log(`  Total: ${navigation.loadEventEnd - navigation.fetchStart}ms`);
        
        // Calculate and log TTFB
        const ttfb = navigation.responseStart - navigation.requestStart;
        const ttfbRating = ttfb < 800 ? '✅ Good' : ttfb < 1800 ? '⚠️ Needs Improvement' : '❌ Poor';
        console.log(`  TTFB: ${ttfb}ms (${ttfbRating})`);
        
        console.groupEnd();
      }

      // Monitor resource loading
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const slowResources = resources.filter(r => r.duration > 1000);
      if (slowResources.length > 0) {
        console.group('🐌 Slow Resources:');
        slowResources.forEach(r => console.warn(`${r.name}: ${r.duration.toFixed(2)}ms`));
        console.groupEnd();
      }
    }, 1000);
  });
}

// Memory usage monitoring
if ('memory' in performance) {
  setInterval(() => {
    const memory = (performance as any).memory;
    const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
    const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
    const limitMB = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
    
    console.log(`🧠 Memory: ${usedMB}MB used / ${totalMB}MB total / ${limitMB}MB limit`);
    
    // Warn if memory usage is high
    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.8) {
      console.warn('⚠️ High memory usage detected');
    }
  }, 30000); // Check every 30 seconds
}
