
import React from "react";
import OptimizedImage from "./OptimizedImage";

const MACBOOK_IMAGE = "/icons/mac-xcode.png";

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
        // Fallback render for error
        onError={() => {
          // fallback is handled by OptimizedImage, no-op handler for suppressing browser error
        }}
      />
      {/* In case the image fails, OptimizedImage will display its own fallback UI */}
    </div>
  );
};

export default MacXcodeImage;
