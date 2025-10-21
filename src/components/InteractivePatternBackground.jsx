import React, { useRef, useEffect } from 'react';

const InteractivePatternBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const mouse = mouseRef.current;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dot grid configuration
    const dotSpacing = 40; // Space between dots
    const dotRadius = 1.5; // Base dot size
    const interactionRadius = 150; // Mouse interaction range
    const maxDotScale = 3; // Maximum dot size on hover
    const colorTransitionRadius = 200; // Radius for color transition

    // Track mouse position
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Create dot grid
    const dots = [];
    for (let x = 0; x < canvas.width + dotSpacing; x += dotSpacing) {
      for (let y = 0; y < canvas.height + dotSpacing; y += dotSpacing) {
        dots.push({ x, y, baseX: x, baseY: y });
      }
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0a0a0f');
      gradient.addColorStop(0.5, '#050510');
      gradient.addColorStop(1, '#0a0a0f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw each dot
      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate interaction effects
        let scale = 1;
        let offsetX = 0;
        let offsetY = 0;
        let opacity = 0.15; // Base opacity (subtle)
        let color = 'rgba(100, 116, 139, '; // Base gray color

        // Interaction: dots move away from cursor
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          offsetX = (dx / distance) * force * -30; // Push away
          offsetY = (dy / distance) * force * -30;
          scale = 1 + force * (maxDotScale - 1); // Scale up
          opacity = 0.15 + force * 0.6; // Increase opacity
        }

        // Color transition: change to purple near cursor
        if (distance < colorTransitionRadius) {
          const colorForce = (colorTransitionRadius - distance) / colorTransitionRadius;
          
          // Blend from gray to purple
          const r = Math.floor(100 + (168 - 100) * colorForce); // 100 -> 168 (purple)
          const g = Math.floor(116 + (85 - 116) * colorForce); // 116 -> 85
          const b = Math.floor(139 + (247 - 139) * colorForce); // 139 -> 247
          
          color = `rgba(${r}, ${g}, ${b}, `;
        }

        // Smooth position transition
        dot.x += (dot.baseX + offsetX - dot.x) * 0.15;
        dot.y += (dot.baseY + offsetY - dot.y) * 0.15;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius * scale, 0, Math.PI * 2);
        ctx.fillStyle = color + opacity + ')';
        ctx.fill();

        // Add glow effect for nearby dots
        if (distance < interactionRadius) {
          const glowForce = (interactionRadius - distance) / interactionRadius;
          ctx.shadowBlur = 10 * glowForce;
          ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
          
          // Draw glowing circle
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotRadius * scale, 0, Math.PI * 2);
          ctx.fillStyle = color + (opacity * 0.5) + ')';
          ctx.fill();
          
          ctx.shadowBlur = 0;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: '#0a0a0f' }}
      />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/20 via-transparent to-gray-950/40 pointer-events-none" />
    </div>
  );
};

export default InteractivePatternBackground;

