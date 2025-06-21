
import { memo } from "react";

interface LazyWrapperProps {
  children: React.ReactNode;
  minHeight?: string;
}

const LazyWrapper = memo<LazyWrapperProps>(({ children, minHeight }) => {
  return (
    <div style={minHeight ? { minHeight } : undefined} className="w-full">
      {children}
    </div>
  );
});

LazyWrapper.displayName = "LazyWrapper";

export default LazyWrapper;
