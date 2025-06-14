
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ count = 5000 }) => {
  const mesh = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 200;
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 30;
      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 0] = particles[i].x;
      posArray[i * 3 + 1] = particles[i].y;
      posArray[i * 3 + 2] = particles[i].z;
    }
    return posArray;
  }, [count, particles]);

  useFrame((state) => {
    if (!mesh.current) return;
    const { clock } = state;
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle;
      const t = (particle.time += speed);
      dummy.position.set(
        x + Math.cos(t) + Math.sin(t * 1) / 10,
        y + Math.sin(t) + Math.cos(t * 2) / 10,
        z + Math.cos(t) + Math.sin(t * 3) / 10
      );
      dummy.updateMatrix();
      (mesh.current.geometry.attributes.position as THREE.BufferAttribute).setXYZ(i, dummy.position.x, dummy.position.y, dummy.position.z);
    });
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y += 0.0005;
    mesh.current.rotation.x += 0.0002;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.03}
        color="hsl(var(--futuristic-glow))"
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: false, alpha: true }} // alpha: true for transparent background if needed
      >
        <ambientLight intensity={0.5} />
        <Particles count={window.innerWidth > 768 ? 5000 : 2000} />
      </Canvas>
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--futuristic-bg-start))] to-[hsl(var(--futuristic-bg-end))] opacity-80"
      />
    </div>
  );
};

export default HeroBackground;
