
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

const root = createRoot(container);

// Simple, fast render
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
      console.log('✅ ServiceWorker registered');
    } catch (error) {
      console.warn('⚠️ ServiceWorker registration failed:', error);
    }
  });
}
