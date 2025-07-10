import { memo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';
import { trackClick } from '@/utils/analytics';

const InstallPrompt = memo(() => {
  const { canInstall, install } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!canInstall || isDismissed) return null;

  const handleInstall = async () => {
    trackClick('install_app_button');
    const success = await install();
    if (success) {
      setIsDismissed(true);
    }
  };

  const handleDismiss = () => {
    trackClick('dismiss_install_prompt');
    setIsDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm">
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-sm text-foreground">Install App</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Get quick access to my portfolio offline
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={handleDismiss}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Button
            onClick={handleInstall}
            size="sm"
            className="flex-1 h-8 text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Install
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDismiss}
            className="h-8 text-xs"
          >
            Maybe later
          </Button>
        </div>
      </div>
    </div>
  );
});

InstallPrompt.displayName = 'InstallPrompt';

export default InstallPrompt;