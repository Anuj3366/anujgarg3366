
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ],
        scale: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.02 + 0.005,
        color: Math.random() > 0.5 ? "#3b82f6" : "#8b5cf6",
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15;
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((particle, index) => (
        <Float
          key={index}
          speed={2 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.8}
        >
          <mesh position={particle.position as [number, number, number]}>
            <sphereGeometry args={[0.04 * particle.scale, 12, 12]} />
            <meshStandardMaterial 
              color={particle.color}
              emissive={particle.color} 
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const AnimatedWaves: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        const wave1 = Math.sin(x * 0.4 + time * 1.5) * 0.4;
        const wave2 = Math.sin(z * 0.25 + time * 1.2) * 0.3;
        const wave3 = Math.sin((x + z) * 0.15 + time * 0.8) * 0.2;
        positions.setY(i, wave1 + wave2 + wave3);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -4, -8]} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[25, 25, 40, 40]} />
      <meshStandardMaterial 
        color="#1e40af" 
        transparent 
        opacity={0.15}
        wireframe
        emissive="#3b82f6"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const EnhancedLighting: React.FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 8;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 8;
      lightRef.current.intensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} color="#f0f9ff" />
      <pointLight 
        ref={lightRef}
        position={[5, 5, 5]} 
        intensity={0.8} 
        color="#3b82f6"
        distance={20}
        decay={2}
      />
      <pointLight 
        position={[-8, -8, -8]} 
        intensity={0.6} 
        color="#8b5cf6"
        distance={15}
        decay={2}
      />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.3}
        color="#ffffff"
        castShadow
      />
    </>
  );
};

const HeroBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Enhanced gradient background with more depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 15%, hsl(var(--primary)/0.2) 0%, transparent 45%),
            radial-gradient(circle at 85% 85%, hsl(var(--accent)/0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, hsl(224 71% 4%/0.3) 0%, transparent 60%),
            radial-gradient(circle at 30% 70%, hsl(var(--primary)/0.1) 0%, transparent 55%),
            linear-gradient(135deg, 
              hsl(var(--background)) 0%, 
              hsl(var(--background)/0.98) 25%,
              hsl(var(--background)/0.95) 50%, 
              hsl(var(--background)/0.92) 75%,
              hsl(var(--background)/0.9) 100%
            )
          `
        }}
      />
      
      {/* Enhanced animated background pattern */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.15), transparent 50%),
              radial-gradient(circle at 75% 75%, hsl(var(--accent)/0.12), transparent 45%)
            `
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, transparent 48%, hsl(var(--primary)/0.06) 50%, transparent 52%),
              linear-gradient(-45deg, transparent 47%, hsl(var(--accent)/0.04) 50%, transparent 53%)
            `,
            backgroundSize: '12px 12px, 18px 18px',
            animation: 'float 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* Enhanced 3D Canvas with better performance and effects */}
      <div className="absolute inset-0 opacity-70">
        <Canvas 
          camera={{ position: [0, 2, 10], fov: 60 }}
          performance={{ min: 0.6 }}
          dpr={[1, 2]}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <EnhancedLighting />
          
          {/* Enhanced stars with better distribution */}
          <Stars 
            radius={200} 
            depth={120} 
            count={2000} 
            factor={8} 
            saturation={0.2} 
            fade 
            speed={2}
          />
          
          {/* Beautiful sparkles effect */}
          <Sparkles
            count={150}
            scale={[20, 20, 20]}
            size={2}
            speed={0.8}
            opacity={0.6}
            color="#3b82f6"
          />
          
          <FloatingParticles count={80} />
          <AnimatedWaves />
          
          {/* Additional floating geometric shapes */}
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh position={[-8, 3, -5]}>
              <torusGeometry args={[1.5, 0.3, 16, 32]} />
              <meshStandardMaterial 
                color="#8b5cf6" 
                transparent 
                opacity={0.3}
                emissive="#8b5cf6"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
          
          <Float speed={2} rotationIntensity={0.4} floatIntensity={0.7}>
            <mesh position={[8, -2, -3]}>
              <octahedronGeometry args={[1.2]} />
              <meshStandardMaterial 
                color="#3b82f6" 
                transparent 
                opacity={0.4}
                emissive="#3b82f6"
                emissiveIntensity={0.3}
              />
            </mesh>
          </Float>
        </Canvas>
      </div>

      {/* Enhanced floating elements with better animations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border opacity-25"
            style={{
              width: `${120 + Math.random() * 200}px`,
              height: `${120 + Math.random() * 200}px`,
              borderColor: i % 2 === 0 ? `hsl(var(--primary)/0.2)` : `hsl(var(--accent)/0.15)`,
              background: i % 2 === 0 
                ? `radial-gradient(circle, hsl(var(--primary)/0.08) 0%, hsl(var(--primary)/0.02) 70%, transparent 100%)`
                : `radial-gradient(circle, hsl(var(--accent)/0.06) 0%, hsl(var(--accent)/0.02) 70%, transparent 100%)`,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              animation: `float ${6 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
              transform: `scale(${0.3 + Math.random() * 0.7})`,
              willChange: 'transform',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
              opacity: 0.25;
            }
            25% { 
              transform: translateY(-40px) translateX(15px) rotate(8deg) scale(1.1); 
              opacity: 0.35;
            }
            50% { 
              transform: translateY(-25px) translateX(-10px) rotate(15deg) scale(0.9); 
              opacity: 0.4;
            }
            75% { 
              transform: translateY(-35px) translateX(20px) rotate(8deg) scale(1.05); 
              opacity: 0.3;
            }
          }
        `
      }} />
    </div>
  );
};

export default HeroBackground;
