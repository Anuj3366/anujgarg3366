
import { memo } from "react";

interface LazyWrapperProps {
  children: React.ReactNode;
  minHeight?: string;
}

const LazyWrapper = memo<LazyWrapperProps>(({ children, minHeight = "300px" }) => {
  return (
    <div style={{ minHeight }} className="w-full">
      {children}
    </div>
  );
});

LazyWrapper.displayName = "LazyWrapper";

export default LazyWrapper;
