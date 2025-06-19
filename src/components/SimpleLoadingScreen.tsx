
import { memo } from "react";

interface SimpleLoadingScreenProps {
  progress: number;
}

const SimpleLoadingScreen = memo<SimpleLoadingScreenProps>(({ progress }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-4 max-w-sm mx-auto px-4">
        <div className="relative">
          <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="w-48 bg-muted rounded-full h-1">
          <div
            className="bg-primary h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">Loading Portfolio...</p>
      </div>
    </div>
  );
});

SimpleLoadingScreen.displayName = "SimpleLoadingScreen";

export default SimpleLoadingScreen;
