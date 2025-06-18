
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
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
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
        ],
        scale: Math.random() * 0.8 + 0.4,
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position as [number, number, number]}>
          <sphereGeometry args={[0.03 * particle.scale, 8, 8]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            emissive="#1e40af" 
            emissiveIntensity={0.4}
          />
        </mesh>
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
        const wave1 = Math.sin(x * 0.5 + time * 2) * 0.3;
        const wave2 = Math.sin(z * 0.3 + time * 1.5) * 0.2;
        positions.setY(i, wave1 + wave2);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -3, -5]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial 
        color="#1e40af" 
        transparent 
        opacity={0.1}
        wireframe
      />
    </mesh>
  );
};

const HeroBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Enhanced gradient background with CSS custom properties for dark mode */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, hsl(var(--primary)/0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, hsl(var(--accent)/0.10) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, hsl(var(--primary)/0.08) 0%, transparent 60%),
            linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)/0.95) 50%, hsl(var(--background)/0.9) 100%)
          `
        }}
      />
      
      {/* Enhanced animated background pattern with CSS custom properties */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 30%, hsl(var(--primary)/0.12), transparent 50%)`
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 70%, hsl(var(--accent)/0.08), transparent 50%)`
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(45deg, transparent 48%, hsl(var(--primary)/0.04) 50%, transparent 52%)`,
            backgroundSize: '15px 15px',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(-45deg, transparent 48%, hsl(var(--accent)/0.03) 50%, transparent 52%)`,
            backgroundSize: '20px 20px',
            animation: 'float 12s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Enhanced 3D Canvas with better performance */}
      <div className="absolute inset-0 opacity-60">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 75 }}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
          <Stars 
            radius={150} 
            depth={80} 
            count={1500} 
            factor={6} 
            saturation={0} 
            fade 
            speed={1.5}
          />
          <FloatingParticles count={60} />
          <AnimatedWaves />
        </Canvas>
      </div>

      {/* Optimized floating elements with CSS custom properties */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-80 h-80 rounded-full border opacity-30"
            style={{
              borderColor: `hsl(var(--primary)/0.15)`,
              background: `linear-gradient(135deg, hsl(var(--primary)/0.06) 0%, hsl(var(--accent)/0.04) 100%)`,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              transform: `scale(${0.4 + Math.random() * 0.6})`,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            25% { transform: translateY(-30px) rotate(5deg) scale(1.05); }
            50% { transform: translateY(-20px) rotate(10deg) scale(0.95); }
            75% { transform: translateY(-25px) rotate(5deg) scale(1.02); }
          }
        `
      }} />
    </div>
  );
};

export default HeroBackground;
