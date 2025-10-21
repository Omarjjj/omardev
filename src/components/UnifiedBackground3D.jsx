import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Model3D from './Model3D';

gsap.registerPlugin(ScrollTrigger);

// Particle system with interactive behavior
function ParticleField({ count = 2000 }) {
  const mesh = useRef();
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.001 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      const mouseInfluence = 3;
      const mx = mouse.current.x * mouseInfluence;
      const my = mouse.current.y * mouseInfluence;
      
      dummy.position.set(
        (particle.mx += ((xFactor + mx) / 4 - particle.mx) * 0.02) + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my += ((yFactor + my) / 4 - particle.my) * 0.02) + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.mz += (zFactor / 4 - particle.mz) * 0.02) + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </instancedMesh>
    </>
  );
}

// Animated waves/plane with displacement
function AnimatedWaves() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });
  
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      colorStart: { value: new THREE.Color('#1e3a8a') },
      colorEnd: { value: new THREE.Color('#581c87') },
    }),
    []
  );
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -5, -10]} scale={[20, 20, 20]}>
      <planeGeometry args={[1, 1, 100, 100]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 4.0 + time * 0.5) * 0.1;
            elevation += sin(pos.y * 3.0 + time * 0.3) * 0.15;
            elevation += sin(pos.x * 2.0 - pos.y * 2.0 + time * 0.4) * 0.1;
            
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 colorStart;
          uniform vec3 colorEnd;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixStrength = (vElevation + 0.25) * 2.0;
            vec3 color = mix(colorStart, colorEnd, mixStrength);
            
            gl_FragColor = vec4(color, 0.6);
          }
        `}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Floating energy orbs
function EnergyOrbs() {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  return (
    <group ref={group}>
      {[...Array(5)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.5, 32, 32]}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 8,
            Math.sin(i) * 3,
            Math.sin((i / 5) * Math.PI * 2) * 8,
          ]}
        >
          <MeshDistortMaterial
            color={i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0}
            metalness={0.8}
            emissive={i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Camera controller with scroll
function CameraController() {
  const { camera } = useThree();
  
  useEffect(() => {
    // Zoom effect on scroll
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(camera.position, {
          z: 10 - progress * 5,
          duration: 0.5,
          ease: 'power2.out',
        });
        gsap.to(camera.rotation, {
          x: progress * 0.2,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });
  }, [camera]);
  
  return null;
}

// Tunnel effect with rings
function TunnelRings() {
  const ringsRef = useRef([]);
  
  useFrame((state) => {
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.position.z = ((state.clock.elapsedTime * 2 + i * 3) % 30) - 15;
        ring.rotation.z = state.clock.elapsedTime * 0.5 + i;
        
        const scale = 1 + Math.abs(ring.position.z) / 30;
        ring.scale.set(scale, scale, 1);
      }
    });
  });
  
  return (
    <group>
      {[...Array(10)].map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (ringsRef.current[i] = el)}
          position={[0, 0, i * 3]}
        >
          <torusGeometry args={[3, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
            emissive={i % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Floating 3D Model in Scene
function FloatingModel() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  return (
    <group ref={groupRef} position={[6, 0, -5]} scale={0.8}>
      <Suspense fallback={null}>
        <Model3D position={[0, 0, 0]} scale={1.5} rotation={[0, 0, 0]} />
      </Suspense>
    </group>
  );
}

// Main scene component
function Scene() {
  return (
    <>
      <color attach="background" args={['#000510']} />
      <fog attach="fog" args={['#000510', 10, 50]} />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.7} color="#8b5cf6" />
      <pointLight position={[5, 3, -3]} intensity={1.0} color="#60a5fa" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#60a5fa"
      />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#3b82f6" />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Scene elements */}
      <ParticleField count={1500} />
      <AnimatedWaves />
      <EnergyOrbs />
      <TunnelRings />
      <FloatingModel />
      
      {/* Camera controller */}
      <CameraController />
    </>
  );
}

// Main component
const UnifiedBackground3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/40 to-gray-950/80 pointer-events-none" />
    </div>
  );
};

export default UnifiedBackground3D;

