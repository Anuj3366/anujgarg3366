import { useState, useEffect } from 'react';
import { registerServiceWorker, getInstallPrompt, triggerInstall, isPWAInstalled } from '@/utils/pwa';

export const usePWA = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    setIsInstalled(isPWAInstalled());
    
    // Register service worker
    registerServiceWorker();
    
    // Listen for install prompt
    getInstallPrompt().then((prompt) => {
      setInstallPrompt(prompt);
      setCanInstall(true);
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setCanInstall(false);
      setInstallPrompt(null);
    });
  }, []);

  const install = async (): Promise<boolean> => {
    if (!installPrompt) return false;
    
    const result = await triggerInstall(installPrompt);
    if (result) {
      setCanInstall(false);
      setInstallPrompt(null);
    }
    return result;
  };

  return {
    isInstalled,
    canInstall,
    install
  };
};