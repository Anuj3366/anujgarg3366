
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return;
  }

  try {
    // Wait for page to be fully loaded before registering service worker
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }

    // Add a small delay to ensure all critical resources are loaded
    await new Promise(resolve => setTimeout(resolve, 100));

    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
      updateViaCache: 'none' // Always check for updates
    });

    console.log('✅ ServiceWorker registration successful with scope:', registration.scope);

    // Handle service worker updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('🔄 New service worker available, page refresh recommended');
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error('❌ ServiceWorker registration failed:', error);
    throw error;
  }
}
