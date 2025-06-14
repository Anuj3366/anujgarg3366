
import React from "react";
import OptimizedImage from "./OptimizedImage";

// Replace with a real working image (Unsplash placeholder for now)
const MACBOOK_IMAGE = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

interface MacXcodeImageProps {
  className?: string;
}

const MacXcodeImage: React.FC<MacXcodeImageProps> = ({ className = "" }) => {
  return (
    <div className={`w-full flex justify-center mt-6 sm:mt-10 ${className}`}>
      <OptimizedImage
        src={MACBOOK_IMAGE}
        alt="MacBook showing Xcode with code"
        className="rounded-xl shadow-2xl border border-black/10 max-w-xs sm:max-w-sm md:max-w-md w-full h-auto object-cover animate-fade-in"
        width={400}
        height={250}
        priority={false}
      />
    </div>
  );
};

export default MacXcodeImage;
