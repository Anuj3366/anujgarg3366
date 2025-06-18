
import React, { memo, useMemo } from "react";
import OptimizedImageLazy from "./OptimizedImageLazy";

const MACBOOK_IMAGE = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80";

interface MacXcodeImageProps {
  className?: string;
  size?: number;
}

const MacXcodeImage = memo<MacXcodeImageProps>(({ className = "", size = 120 }) => {
  // Optimized glow effect with better dark mode support
  const glowStyle = useMemo(() => ({
    background: "radial-gradient(circle, hsl(var(--primary)/0.3) 0%, hsl(var(--accent)/0.2) 40%, hsl(var(--primary)/0.1) 70%, transparent 100%)",
    zIndex: -1,
    width: size * 1.2,
    height: size * 1.2,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    filter: 'blur(20px)',
  }), [size]);

  const aspectRatio = useMemo(() => 1, []); // Square aspect ratio

  return (
    <div className={`flex justify-center items-center relative ${className}`}>
      {/* Optimized glow effect with reduced opacity for better performance */}
      <div
        className="absolute inset-0 rounded-full opacity-40 pointer-events-none will-change-transform"
        style={glowStyle}
      />
      
      {/* Secondary glow for enhanced effect */}
      <div
        className="absolute inset-0 rounded-full opacity-20 pointer-events-none animate-pulse"
        style={{
          ...glowStyle,
          width: size * 1.4,
          height: size * 1.4,
          background: "radial-gradient(circle, hsl(var(--accent)/0.4) 0%, transparent 60%)",
          filter: 'blur(30px)',
        }}
      />
      
      {/* Main avatar image with enhanced styling */}
      <OptimizedImageLazy
        src={MACBOOK_IMAGE}
        alt="MacBook showing Xcode with code"
        className="rounded-full shadow-2xl border-4 border-primary/30 dark:border-primary/40 bg-card object-cover relative z-10 ring-2 ring-accent/20 dark:ring-accent/30"
        width={size}
        height={size}
        aspectRatio={aspectRatio}
        priority={true}
        sizes={`${size}px`}
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
    </div>
  );
});

MacXcodeImage.displayName = "MacXcodeImage";

export default MacXcodeImage;
