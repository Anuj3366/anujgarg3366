
import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = memo(({ count = 5000 }) => {
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

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(() => new THREE.PointsMaterial({
    size: 0.03,
    color: new THREE.Color("hsl(var(--futuristic-glow))"),
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      let { speed, x, y, z } = particle;
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
    <points ref={mesh} geometry={geometry} material={material} />
  );
});

const FloatingOrbs = memo(() => {
  const orbsRef = useRef<THREE.Group>(null!);
  
  const orbGeometry = useMemo(() => new THREE.SphereGeometry(0.5, 16, 16), []);
  const orbMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color("hsl(var(--futuristic-glow))"),
    transparent: true,
    opacity: 0.3,
  }), []);
  
  useFrame((state) => {
    if (orbsRef.current) {
      orbsRef.current.rotation.y += 0.001;
      orbsRef.current.children.forEach((orb, index) => {
        orb.position.y = Math.sin(state.clock.elapsedTime + index) * 2;
        orb.rotation.x += 0.01;
        orb.rotation.z += 0.005;
      });
    }
  });

  const orbPositions = useMemo(() => 
    [...Array(5)].map(() => [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 15
    ]), []
  );

  return (
    <group ref={orbsRef}>
      {orbPositions.map((position, i) => (
        <mesh
          key={i}
          position={position as [number, number, number]}
          geometry={orbGeometry}
          material={orbMaterial}
        />
      ))}
    </group>
  );
});

const HeroBackground: React.FC = memo(() => {
  const particleCount = useMemo(() => {
    if (window.innerWidth > 1024) return 3000; // Reduced from 4000
    if (window.innerWidth > 768) return 1500; // Reduced from 2000
    return 600; // Reduced from 800
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -10,
          pointerEvents: "none",
        }}
        performance={{ min: 0.5 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.35} />
        <Particles count={particleCount} />
        <FloatingOrbs />
      </Canvas>
      <div
        className="fixed inset-0 bg-gradient-to-br from-[hsl(var(--futuristic-bg-start))] via-[hsl(var(--futuristic-bg-end))] to-[hsl(var(--futuristic-bg-start))] opacity-35 w-screen h-screen"
        style={{ zIndex: -5 }}
      />
      <div
        className="fixed inset-0 opacity-20 w-screen h-screen"
        style={{
          background: 'radial-gradient(circle at 20% 80%, hsl(var(--futuristic-glow)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0%, transparent 50%)',
          animation: 'pulse 4s ease-in-out infinite alternate',
          zIndex: -4
        }}
      />
    </div>
  );
});

Particles.displayName = "Particles";
FloatingOrbs.displayName = "FloatingOrbs";
HeroBackground.displayName = "HeroBackground";

export default HeroBackground;
