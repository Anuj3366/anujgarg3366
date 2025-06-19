
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Simplified initialization - remove complex preloading that's blocking render
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Simple, fast render without blocking operations
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker asynchronously after render
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        updateViaCache: 'none'
      });
      console.log('✅ ServiceWorker registered:', registration.scope);
    } catch (error) {
      console.warn('⚠️ ServiceWorker registration failed:', error);
    }
  });
}

// Basic performance monitoring - non-blocking
if ('performance' in window) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        console.log(`📊 TTFB: ${ttfb.toFixed(2)}ms, Load: ${loadTime.toFixed(2)}ms`);
      }
    }, 1000);
  });
}
