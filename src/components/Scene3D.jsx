import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Simple floating particles
function Particles() {
  const pointsRef = useRef();
  const particlesCount = 1000;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#6b5b95"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Animated rings
function AnimatedRings() {
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      group.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0, -10]}>
          <torusGeometry args={[4 + i * 2, 0.1, 16, 100]} />
          <meshBasicMaterial
            color={['#6b5b95', '#5b4a7e', '#52555d'][i]}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Scene
export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6b5b95" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5b4a7e" />

          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0.5}
            fade
            speed={1}
          />

          <Particles />
          <AnimatedRings />
        </Suspense>
      </Canvas>
    </div>
  );
}