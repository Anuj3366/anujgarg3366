
import { motion, useReducedMotion } from "framer-motion";
import { memo, useMemo, useCallback, useState, useRef, useEffect } from "react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { useImageLoader } from "@/hooks/useImageLoader";

interface PerformanceOptimizedAvatarProps {
  imageUrl: string;
  size: number;
  priority?: boolean;
  enableAnimations?: boolean;
}

const PerformanceOptimizedAvatar = memo<PerformanceOptimizedAvatarProps>(({ 
  imageUrl, 
  size, 
  priority = true,
  enableAnimations = true 
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const { isLoading, hasError } = useImageLoader({ 
    src: imageUrl, 
    priority: priority && isInView 
  });

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const glowStyle = useMemo(() => ({
    background: `radial-gradient(circle, hsl(var(--primary)/0.15) 0%, hsl(var(--primary)/0.05) 50%, transparent 70%)`,
    width: size * 1.2,
    height: size * 1.2,
    filter: 'blur(16px)',
    transform: 'translate(-50%, -50%)',
  }), [size]);

  const containerStyle = useMemo(() => ({
    width: size,
    height: size,
  }), [size]);

  const handleImageLoad = useCallback(() => {
    // Trigger any additional performance optimizations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Optional: preload related images or perform cleanup
      });
    }
  }, []);

  // Fallback component for errors
  if (hasError) {
    return (
      <div 
        ref={elementRef}
        className="flex justify-center items-center relative"
        style={containerStyle}
      >
        <div
          className="rounded-full shadow-2xl border-4 border-primary/30 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm flex items-center justify-center ring-2 ring-accent/10"
          style={containerStyle}
        >
          <span className="text-primary text-xl font-bold tracking-wide">AG</span>
        </div>
      </div>
    );
  }

  // Animation variants based on user preferences
  const animationVariants = enableAnimations && !shouldReduceMotion ? {
    animate: {
      y: [0, -8, 0],
      rotate: [0, 1, -1, 0],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.4, 0.8, 1],
    }
  } : {};

  return (
    <div 
      ref={elementRef}
      className="flex justify-center items-center relative"
      style={containerStyle}
    >
      {/* Enhanced glow effect */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full opacity-20 pointer-events-none will-change-transform"
        style={glowStyle}
        aria-hidden="true"
      />
      
      {/* Secondary subtle glow */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, hsl(var(--accent)/0.1) 0%, transparent 60%)`,
          width: size * 1.4,
          height: size * 1.4,
          filter: 'blur(20px)',
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />

      <motion.div 
        className="relative z-10 will-change-transform"
        {...animationVariants}
      >
        {/* Loading placeholder with enhanced design */}
        {isLoading && isInView && (
          <div 
            className="rounded-full shadow-2xl border-4 border-primary/20 bg-gradient-to-br from-card/60 to-card/30 animate-pulse ring-2 ring-accent/10 backdrop-blur-sm"
            style={containerStyle}
          />
        )}
        
        {/* Main avatar image */}
        {isInView && (
          <OptimizedImage
            src={imageUrl}
            alt="Anuj Garg - Profile Avatar"
            className={`rounded-full shadow-2xl border-4 border-primary/30 bg-gradient-to-br from-card/80 to-card/40 object-cover ring-2 ring-accent/20 backdrop-blur-sm transition-all duration-500 ease-out ${
              !isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
            }`}
            width={size}
            height={size}
            priority={priority}
            style={containerStyle}
          />
        )}
      </motion.div>
    </div>
  );
});

PerformanceOptimizedAvatar.displayName = "PerformanceOptimizedAvatar";

export default PerformanceOptimizedAvatar;
