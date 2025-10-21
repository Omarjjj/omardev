import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MagneticText = ({ children, className = '', strength = 0.3 }) => {
  const textRef = useRef(null);
  const magneticRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    
    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      magneticRef.current = { x: deltaX, y: deltaY };
      
      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.6,
        ease: 'power3.out',
      });
      
      // Add glow effect
      gsap.to(element, {
        textShadow: `0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)`,
        duration: 0.3,
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)',
      });
      
      gsap.to(element, {
        textShadow: '0 0 0px rgba(59, 130, 246, 0)',
        duration: 0.3,
      });
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);
  
  return (
    <span ref={textRef} className={`inline-block cursor-pointer ${className}`}>
      {children}
    </span>
  );
};

export default MagneticText;

