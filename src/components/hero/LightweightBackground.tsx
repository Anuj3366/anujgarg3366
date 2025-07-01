
import { memo, useMemo } from 'react';

const LightweightBackground = memo(() => {
  const backgroundStyle = useMemo(() => ({
    background: `
      radial-gradient(circle at 15% 15%, hsl(var(--primary)/0.15) 0%, transparent 50%),
      radial-gradient(circle at 85% 85%, hsl(var(--accent)/0.12) 0%, transparent 50%),
      radial-gradient(circle at 50% 20%, hsl(224 71% 4%/0.2) 0%, transparent 60%),
      linear-gradient(135deg, 
        hsl(var(--background)) 0%, 
        hsl(var(--background)/0.98) 25%,
        hsl(var(--background)/0.95) 50%, 
        hsl(var(--background)/0.9) 100%
      )
    `
  }), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div 
        className="absolute inset-0"
        style={backgroundStyle}
      />
      
      {/* Lightweight animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border opacity-20"
            style={{
              width: `${100 + Math.random() * 100}px`,
              height: `${100 + Math.random() * 100}px`,
              borderColor: i % 2 === 0 ? `hsl(var(--primary)/0.2)` : `hsl(var(--accent)/0.15)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.2;
            }
            50% { 
              transform: translateY(-20px) scale(1.05); 
              opacity: 0.3;
            }
          }
        `
      }} />
    </div>
  );
});

LightweightBackground.displayName = "LightweightBackground";

export default LightweightBackground;
