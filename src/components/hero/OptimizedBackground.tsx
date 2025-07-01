
import { memo, useMemo, useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

const OptimizedBackground = memo(() => {
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay animation start to improve initial load
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const backgroundStyle = useMemo(() => {
    const isDark = resolvedTheme === 'dark';
    
    return {
      background: isDark ? `
        radial-gradient(circle at 15% 15%, hsl(190 95% 65% / 0.15) 0%, transparent 50%),
        radial-gradient(circle at 85% 85%, hsl(170 85% 58% / 0.12) 0%, transparent 50%),
        radial-gradient(circle at 50% 20%, hsl(230 25% 4% / 0.8) 0%, transparent 60%),
        linear-gradient(135deg, 
          hsl(230 25% 4%) 0%, 
          hsl(230 25% 5% / 0.98) 25%,
          hsl(230 25% 6% / 0.95) 50%, 
          hsl(230 25% 4% / 0.9) 100%
        )
      ` : `
        radial-gradient(circle at 15% 15%, hsl(200 85% 58% / 0.15) 0%, transparent 50%),
        radial-gradient(circle at 85% 85%, hsl(160 75% 88% / 0.12) 0%, transparent 50%),
        radial-gradient(circle at 50% 20%, hsl(220 30% 97% / 0.2) 0%, transparent 60%),
        linear-gradient(135deg, 
          hsl(220 30% 97%) 0%, 
          hsl(220 30% 97% / 0.98) 25%,
          hsl(220 30% 97% / 0.95) 50%, 
          hsl(220 30% 97% / 0.9) 100%
        )
      `
    };
  }, [resolvedTheme]);

  const floatingElements = useMemo(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      size: 80 + Math.random() * 120,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: i * 0.5,
      duration: 8 + i * 0.8,
    }))
  , []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={backgroundStyle}
      />
      
      {/* Optimized floating elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className={`absolute rounded-full border transition-colors duration-1000 ${
              resolvedTheme === 'dark' 
                ? 'border-primary/20 bg-gradient-to-r from-primary/8 to-accent/6' 
                : 'border-primary/15 bg-gradient-to-r from-primary/6 to-accent/4'
            }`}
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animation: `optimizedFloat ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes optimizedFloat {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) scale(1); 
              opacity: 0.3;
            }
            33% { 
              transform: translateY(-20px) translateX(10px) scale(1.05); 
              opacity: 0.5;
            }
            66% { 
              transform: translateY(-10px) translateX(-8px) scale(0.95); 
              opacity: 0.4;
            }
          }
        `
      }} />
    </div>
  );
});

OptimizedBackground.displayName = "OptimizedBackground";

export default OptimizedBackground;
