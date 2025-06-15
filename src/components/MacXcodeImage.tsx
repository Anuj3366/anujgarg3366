
import React, { memo, useMemo } from "react";
import OptimizedImageLazy from "./OptimizedImageLazy";

const MACBOOK_IMAGE = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80";

interface MacXcodeImageProps {
  className?: string;
  size?: number;
}

const MacXcodeImage = memo<MacXcodeImageProps>(({ className = "", size = 120 }) => {
  const glowStyle = useMemo(() => ({
    background: "radial-gradient(circle, #5eead4 0%, #2563eb22 70%, transparent 100%)",
    zIndex: -1,
    width: size * 1.2,
    height: size * 1.2,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }), [size]);

  const aspectRatio = useMemo(() => 1, []); // Square aspect ratio

  return (
    <div className={`flex justify-center items-center relative ${className}`}>
      {/* Optimized glow effect */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-30 pointer-events-none animate-pulse"
        style={glowStyle}
      />
      
      {/* Main avatar image with layout stability */}
      <OptimizedImageLazy
        src={MACBOOK_IMAGE}
        alt="MacBook showing Xcode with code"
        className="rounded-full shadow-lg border-4 border-primary/40 bg-white object-cover relative z-10"
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
