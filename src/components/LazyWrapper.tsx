
import React, { Suspense, ComponentType } from 'react';
import { Card } from '@/components/ui/card';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: string;
}

const DefaultFallback = ({ minHeight = "200px" }: { minHeight?: string }) => (
  <Card className="flex items-center justify-center bg-card/50 backdrop-blur-sm" style={{ minHeight }}>
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-primary border-opacity-70"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </Card>
);

const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback,
  minHeight = "200px" 
}) => {
  const fallbackComponent = fallback || <DefaultFallback minHeight={minHeight} />;

  return (
    <Suspense fallback={fallbackComponent}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
