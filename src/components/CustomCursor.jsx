import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    const onMouseMove = (e) => {
      if (!cursor || !cursorDot) return;
      
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    const onMouseEnterLink = () => {
      if (!cursor) return;
      
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: 'rgba(147, 51, 234, 0.3)',
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      if (!cursor) return;
      
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        duration: 0.3,
      });
    };

    // Delay adding event listeners to ensure DOM is ready
    setTimeout(() => {
      window.addEventListener('mousemove', onMouseMove);

      // Add event listeners to interactive elements
      const links = document.querySelectorAll('a, button, .cursor-hover');
      links.forEach((link) => {
        link.addEventListener('mouseenter', onMouseEnterLink);
        link.addEventListener('mouseleave', onMouseLeaveLink);
      });
    }, 100);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      const links = document.querySelectorAll('a, button, .cursor-hover');
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary-400 pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-primary-400 pointer-events-none z-[9999]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CustomCursor;
