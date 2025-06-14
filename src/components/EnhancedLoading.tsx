
import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface EnhancedLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

const EnhancedLoading = memo<EnhancedLoadingProps>(({
  size = 'md',
  text,
  variant = 'spinner',
  className = ''
}) => {
  const sizeClasses = useMemo(() => ({
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-16 w-16'
  }), []);

  const textSizeClasses = useMemo(() => ({
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  }), []);

  const spinnerElement = useMemo(() => (
    <div className={`animate-spin rounded-full border-t-2 border-primary border-opacity-70 ${sizeClasses[size]}`} />
  ), [size, sizeClasses]);

  const dotsElement = useMemo(() => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  ), []);

  const pulseElement = useMemo(() => (
    <motion.div
      className={`bg-primary rounded-full ${sizeClasses[size]}`}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity
      }}
    />
  ), [size, sizeClasses]);

  const renderVariant = useMemo(() => {
    switch (variant) {
      case 'dots':
        return dotsElement;
      case 'pulse':
        return pulseElement;
      default:
        return spinnerElement;
    }
  }, [variant, dotsElement, pulseElement, spinnerElement]);

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {renderVariant}
      {text && (
        <p className={`text-muted-foreground font-medium ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
});

EnhancedLoading.displayName = "EnhancedLoading";

export default EnhancedLoading;
