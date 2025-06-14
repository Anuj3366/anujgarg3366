
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
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/10" />
      
      {/* More Dynamic Animated Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.1),transparent_50%)]" />
        <div 
          className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.05)_50%,transparent_52%)]"
          style={{
            backgroundSize: '15px 15px',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute inset-0 bg-[linear-gradient(-45deg,transparent_48%,rgba(168,85,247,0.03)_50%,transparent_52%)]"
          style={{
            backgroundSize: '20px 20px',
            animation: 'float 12s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Enhanced 3D Canvas with Faster Animations */}
      <div className="absolute inset-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
          <Stars 
            radius={150} 
            depth={80} 
            count={2000} 
            factor={6} 
            saturation={0} 
            fade 
            speed={2}
          />
          <FloatingParticles count={80} />
          <AnimatedWaves />
        </Canvas>
      </div>

      {/* Faster Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-96 h-96 rounded-full border border-primary/20 bg-gradient-to-r from-primary/8 to-accent/8"
            style={{
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
              transform: `scale(${0.4 + Math.random() * 0.8})`,
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
