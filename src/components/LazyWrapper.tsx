
import React, { Suspense, memo, useMemo } from 'react';
import { Card } from '@/components/ui/card';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
}

const DefaultFallback = memo<{ minHeight?: string }>(({ minHeight = "200px" }) => (
  <Card className="flex items-center justify-center bg-card/50 backdrop-blur-sm" style={{ minHeight }}>
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-primary border-opacity-70"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </Card>
));

const LazyWrapper = memo<LazyWrapperProps>(({ 
  children, 
  fallback,
  minHeight = "200px" 
}) => {
  const fallbackComponent = useMemo(() => 
    fallback || <DefaultFallback minHeight={minHeight} />, 
    [fallback, minHeight]
  );

  return (
    <Suspense fallback={fallbackComponent}>
      {children}
    </Suspense>
  );
});

DefaultFallback.displayName = "DefaultFallback";
LazyWrapper.displayName = "LazyWrapper";

export default LazyWrapper;
