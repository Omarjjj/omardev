import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

// Floating boxes
function FloatingBox({ position, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Orbiting spheres
function OrbitingSpheres() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[-5, 0, 0]}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2.5;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
          >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
              color="#52555d"
              emissive="#52555d"
              emissiveIntensity={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#6b5b95" />
          <pointLight position={[-10, -10, 10]} intensity={0.5} color="#5b4a7e" />

          <FloatingBox position={[-7, 3, -2]} color="#6b5b95" />
          <FloatingBox position={[7, -3, -2]} color="#5b4a7e" />
          <FloatingBox position={[-5, -4, -3]} color="#52555d" />
          <FloatingBox position={[6, 4, -3]} color="#06b6d4" />

          <OrbitingSpheres />

          <mesh position={[0, 0, -8]}>
            <icosahedronGeometry args={[2, 0]} />
            <meshBasicMaterial color="#6b5b95" wireframe transparent opacity={0.2} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
}