
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { useImageLoader } from "@/hooks/useImageLoader";

interface PerformanceOptimizedAvatarProps {
  imageUrl: string;
  size: number;
}

const PerformanceOptimizedAvatar = memo<PerformanceOptimizedAvatarProps>(({ imageUrl, size }) => {
  const { isLoading, hasError } = useImageLoader({ 
    src: imageUrl, 
    priority: true 
  });

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
        {isLoading && (
          <div 
            className="rounded-full shadow-2xl border-4 border-primary/30 bg-card/50 animate-pulse"
            style={{ width: size, height: size }}
          />
        )}
        <OptimizedImage
          src={imageUrl}
          alt="Profile Avatar"
          className={`rounded-full shadow-2xl border-4 border-primary/30 bg-card object-cover ring-2 ring-accent/20 transition-opacity duration-300 ${
            !isLoading ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
          width={size}
          height={size}
          priority={true}
          style={{ width: size, height: size }}
        />
      </motion.div>
    </div>
  );
});

PerformanceOptimizedAvatar.displayName = "PerformanceOptimizedAvatar";

export default PerformanceOptimizedAvatar;
