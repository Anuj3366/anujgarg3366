import { memo, useMemo } from 'react';

const OptimizedBackground = memo(() => {
  const backgroundStyle = useMemo(() => ({
    background: `
      radial-gradient(circle at 20% 20%, hsl(var(--primary)/0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, hsl(var(--accent)/0.06) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, hsl(var(--primary)/0.04) 0%, transparent 40%),
      linear-gradient(135deg, 
        hsl(var(--background)) 0%, 
        hsl(var(--background)/0.98) 25%,
        hsl(var(--background)/0.96) 50%, 
        hsl(var(--background)/0.94) 100%
      )
    `
  }), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div 
        className="absolute inset-0"
        style={backgroundStyle}
      />
      
      {/* Minimal animated elements for better performance */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-[0.15]"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              background: i % 2 === 0 
                ? `radial-gradient(circle, hsl(var(--primary)/0.1) 0%, transparent 70%)`
                : `radial-gradient(circle, hsl(var(--accent)/0.08) 0%, transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
              animation: `float-gentle ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float-gentle {
            0%, 100% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.15;
            }
            50% { 
              transform: translateY(-15px) scale(1.05); 
              opacity: 0.25;
            }
          }
        `
      }} />
    </div>
  );
});

OptimizedBackground.displayName = "OptimizedBackground";

export default OptimizedBackground;