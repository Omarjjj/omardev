import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useGLTF, useAnimations, Clone } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SkeletonUtils } from 'three-stdlib';
import modelFile from '../3dmodel/pleaseee.glb?url';

const Model3D = ({ position = [0, -1, 0], scale = 1.5, rotation = [0, 0, 0] }) => {
  const group = useRef();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  // Load the GLB model
  const { scene, animations } = useGLTF(modelFile);
  
  // Clone the scene properly with skeleton for animations
  const clonedScene = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene);
    
    // Traverse and update materials for better lighting
    cloned.traverse((node) => {
      if (node.isMesh) {
        // Enable shadows
        node.castShadow = true;
        node.receiveShadow = true;
        
        // Update material properties for website-matched lighting
        if (node.material) {
          node.material.envMapIntensity = 0.9; // Increased for lighter appearance
          node.material.metalness = node.material.metalness || 0.3;
          node.material.roughness = node.material.roughness || 0.7;
          node.material.needsUpdate = true;
        }
      }
    });
    
    return cloned;
  }, [scene]);
  
  // Apply animations to the cloned scene
  const { actions, mixer } = useAnimations(animations, group);

  // Play the idle animation when loaded
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const actionNames = Object.keys(actions);
      
      // Look for idle animation (case-insensitive) or use first animation
      let animationName = actionNames.find(name => 
        name.toLowerCase().includes('idle')
      ) || actionNames[0];
      
      if (animationName && actions[animationName]) {
        const action = actions[animationName];
        
        // Configure the animation
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.timeScale = 1.0;
        action.play();
      }
    }
    
    // Cleanup function
    return () => {
      Object.values(actions).forEach(action => action.stop());
    };
  }, [actions, animations]);

  // Throttled mouse tracking for better performance
  useEffect(() => {
    let rafId = null;
    let lastMouse = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
      // Store the latest mouse position
      lastMouse = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };

      // Only update state once per frame using requestAnimationFrame
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMouse(lastMouse);
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Rotate model to follow cursor (both horizontal and vertical)
  useFrame(() => {
    if (group.current) {
      // Vertical rotation - inverted (cursor down = look up)
      const targetRotationX = -mouse.y * 0.25; // Increased sensitivity
      
      // Horizontal rotation - follow cursor left/right
      const targetRotationY = mouse.x * 0.4 + rotation[1]; // Increased sensitivity
      
      // Smooth interpolation (lerp) for natural movement
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetRotationX,
        0.1
      );
      
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotationY,
        0.1
      );
    }
  });

  return (
    <group ref={group} position={position} scale={scale} rotation={rotation}>
      <primitive object={clonedScene} />
    </group>
  );
};

export default Model3D;

