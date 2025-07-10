// PWA utilities for enhanced app functionality

export const isPWAInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

export const canInstallPWA = (): boolean => {
  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
};

export const registerServiceWorker = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered successfully:', registration);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available, notify user
              if (confirm('New content available! Reload to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

export const getInstallPrompt = (): Promise<any> => {
  return new Promise((resolve) => {
    let deferredPrompt: any;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      resolve(deferredPrompt);
    });
  });
};

export const triggerInstall = async (prompt: any): Promise<boolean> => {
  if (!prompt) return false;
  
  try {
    await prompt.prompt();
    const result = await prompt.userChoice;
    return result.outcome === 'accepted';
  } catch (error) {
    console.error('Install prompt failed:', error);
    return false;
  }
};