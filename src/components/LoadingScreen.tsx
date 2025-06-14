
import { memo } from "react";
import EnhancedLoading from "@/components/EnhancedLoading";

interface LoadingScreenProps {
  loadingProgress: number;
}

const LoadingScreen = memo<LoadingScreenProps>(({ loadingProgress }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 z-[999]">
      <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-sm mx-auto px-4">
        <EnhancedLoading size="lg" variant="pulse" text="Portfolio Loading..." />
        <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
          <div
            className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Optimizing your experience. Please wait...
        </p>
      </div>
    </div>
  );
});

LoadingScreen.displayName = "LoadingScreen";

export default LoadingScreen;
