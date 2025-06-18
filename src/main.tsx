
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerServiceWorker } from './utils/registerServiceWorker'
import CriticalResourcePreloader from './components/CriticalResourcePreloader'

// Enhanced app initialization with better error handling and timing
const initializeApp = async () => {
  try {
    // Ensure DOM is ready
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // Preload critical resources first
    const criticalResources = [
      '/icons/custom-favicon.svg',
      '/manifest.json'
    ];

    // Preload resources with proper error handling
    await Promise.allSettled(
      criticalResources.map(resource => {
        return new Promise((resolve, reject) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = resource;
          link.onload = resolve;
          link.onerror = () => resolve(null); // Don't fail if resource doesn't load
          document.head.appendChild(link);
          
          // Timeout fallback
          setTimeout(resolve, 1000);
        });
      })
    );

    // Register service worker after critical resources
    try {
      await registerServiceWorker();
    } catch (error) {
      console.warn('Service worker registration failed, continuing without it:', error);
    }

    console.log('✅ App initialized successfully');
  } catch (error) {
    console.error('❌ App initialization failed:', error);
    // Continue anyway, don't block the app
  }
};

// Initialize app immediately
initializeApp();

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Enhanced render with better error boundaries
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
    // Fallback render with retry button
    root.render(
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'system-ui, sans-serif',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Loading Error</h1>
          <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
            The application encountered an error during startup.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1.05)'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.transform = 'scale(1)'}
          >
            Reload Application
          </button>
        </div>
      </div>
    );
  }
};

// Render immediately without waiting for initialization
renderApp();

// Enhanced performance monitoring with better timing
if ('performance' in window) {
  window.addEventListener('load', () => {
    // Wait a bit for everything to settle
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.group('📊 Enhanced Performance Metrics:');
        console.log(`  DNS: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`);
        console.log(`  TCP: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`);
        console.log(`  Request: ${(navigation.responseStart - navigation.requestStart).toFixed(2)}ms`);
        console.log(`  Response: ${(navigation.responseEnd - navigation.responseStart).toFixed(2)}ms`);
        console.log(`  DOM Processing: ${(navigation.domContentLoadedEventStart - navigation.responseEnd).toFixed(2)}ms`);
        console.log(`  Total: ${(navigation.loadEventEnd - navigation.fetchStart).toFixed(2)}ms`);
        
        // Calculate and log TTFB with better thresholds
        const ttfb = navigation.responseStart - navigation.requestStart;
        const ttfbRating = ttfb < 600 ? '✅ Good' : ttfb < 1200 ? '⚠️ Needs Improvement' : '❌ Poor';
        console.log(`  TTFB: ${ttfb.toFixed(2)}ms (${ttfbRating})`);
        
        console.groupEnd();
      }

      // Monitor resource loading with better filtering
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const slowResources = resources.filter(r => r.duration > 800 && !r.name.includes('fonts.googleapis.com'));
      if (slowResources.length > 0) {
        console.group('🐌 Slow Resources (>800ms):');
        slowResources.forEach(r => console.warn(`${r.name.split('/').pop()}: ${r.duration.toFixed(2)}ms`));
        console.groupEnd();
      }
    }, 2000);
  });
}

// Improved memory usage monitoring with better intervals
if ('memory' in performance) {
  // Initial check after 10 seconds
  setTimeout(() => {
    const memory = (performance as any).memory;
    const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
    const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
    const limitMB = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
    
    console.log(`🧠 Initial Memory: ${usedMB}MB used / ${totalMB}MB total / ${limitMB}MB limit`);
  }, 10000);

  // Then check every 60 seconds instead of 30
  setInterval(() => {
    const memory = (performance as any).memory;
    const usedMB = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
    const totalMB = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
    const limitMB = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
    
    console.log(`🧠 Memory: ${usedMB}MB used / ${totalMB}MB total / ${limitMB}MB limit`);
    
    // Warn if memory usage is high
    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.75) {
      console.warn('⚠️ High memory usage detected');
    }
  }, 60000); // Check every 60 seconds instead of 30
}
