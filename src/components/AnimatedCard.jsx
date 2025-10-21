import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedCard = ({ children, className = '', delay = 0 }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Mouse move effect
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
      
      // Glow follows mouse
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x,
          y: y,
          opacity: 1,
          scale: 1.5,
          duration: 0.3,
        });
      }
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
      
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          scale: 1,
          duration: 0.3,
        });
      }
    };
    
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  return (
    <div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-32 h-32 pointer-events-none opacity-0 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {children}
    </div>
  );
};

export default AnimatedCard;

