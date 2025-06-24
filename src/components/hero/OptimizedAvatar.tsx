
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface OptimizedAvatarProps {
  imageUrl: string;
  isLoading: boolean;
  size: number;
}

const OptimizedAvatar = memo<OptimizedAvatarProps>(({ imageUrl, isLoading, size }) => {
  const glowStyle = useMemo(() => ({
    background: "radial-gradient(circle, hsl(var(--primary)/0.25) 0%, hsl(var(--accent)/0.15) 40%, transparent 70%)",
    width: size * 1.15,
    height: size * 1.15,
    filter: 'blur(16px)',
  }), [size]);

  const floatVariants = useMemo(() => ({
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);

  return (
    <div className="flex justify-center items-center relative">
      <div
        className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
        style={glowStyle}
      />
      <motion.div 
        className="relative z-10"
        variants={floatVariants}
        animate="animate"
      >
        {isLoading ? (
          <div 
            className="rounded-full shadow-2xl border-4 border-primary/30 dark:border-primary/40 bg-card relative z-10 ring-2 ring-accent/20 dark:ring-accent/30 animate-pulse bg-gradient-to-r from-primary/20 to-accent/20"
            style={{ width: size, height: size }}
          />
        ) : (
          <img
            src={imageUrl}
            alt="MacBook showing Xcode with code"
            className="rounded-full shadow-2xl border-4 border-primary/30 dark:border-primary/40 bg-card object-cover relative z-10 ring-2 ring-accent/20 dark:ring-accent/30"
            width={size}
            height={size}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        )}
      </motion.div>
    </div>
  );
});

OptimizedAvatar.displayName = "OptimizedAvatar";

export default OptimizedAvatar;
