
import { motion } from "framer-motion";
import { memo, useMemo, useState, useCallback } from "react";

interface PerformanceOptimizedAvatarProps {
  imageUrl: string;
  size: number;
}

const PerformanceOptimizedAvatar = memo<PerformanceOptimizedAvatarProps>(({ imageUrl, size }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true); // Stop loading state
  }, []);

  const glowStyle = useMemo(() => ({
    background: "radial-gradient(circle, hsl(var(--primary)/0.2) 0%, transparent 70%)",
    width: size * 1.1,
    height: size * 1.1,
    filter: 'blur(12px)',
  }), [size]);

  if (hasError) {
    return (
      <div className="flex justify-center items-center relative">
        <div
          className="rounded-full shadow-2xl border-4 border-primary/30 bg-card/50 flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <span className="text-primary text-xl font-bold">AG</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center relative">
      <div
        className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
        style={glowStyle}
      />
      <motion.div 
        className="relative z-10"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {!isLoaded && (
          <div 
            className="rounded-full shadow-2xl border-4 border-primary/30 bg-card/50 animate-pulse"
            style={{ width: size, height: size }}
          />
        )}
        <img
          src={imageUrl}
          alt="Profile Avatar"
          className={`rounded-full shadow-2xl border-4 border-primary/30 bg-card object-cover ring-2 ring-accent/20 transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          width={size}
          height={size}
          loading="eager"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          style={{ width: size, height: size }}
        />
      </motion.div>
    </div>
  );
});

PerformanceOptimizedAvatar.displayName = "PerformanceOptimizedAvatar";

export default PerformanceOptimizedAvatar;
