
import React from "react";
import OptimizedImage from "./OptimizedImage";

// Replace with a real working image (Unsplash placeholder for now)
const MACBOOK_IMAGE = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80";

interface MacXcodeImageProps {
  className?: string;
  size?: number;
}

const MacXcodeImage: React.FC<MacXcodeImageProps> = ({ className = "", size = 120 }) => {
  return (
    <div className={`flex justify-center items-center relative ${className}`}>
      {/* Glow effect behind - positioned absolutely to prevent layout shifts */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-30 pointer-events-none animate-pulse"
        style={{
          background: "radial-gradient(circle, #5eead4 0%, #2563eb22 70%, transparent 100%)",
          zIndex: -1,
          width: size * 1.2,
          height: size * 1.2,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Main avatar image */}
      <OptimizedImage
        src={MACBOOK_IMAGE}
        alt="MacBook showing Xcode with code"
        className="rounded-full shadow-lg border-4 border-primary/40 bg-white object-cover relative z-10"
        width={size}
        height={size}
        priority={true}
      />
    </div>
  );
};

export default MacXcodeImage;
