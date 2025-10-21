import React, { useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Model3D from './Model3D';
import Model3DLoader from './Model3DLoader';
import MagneticText from './MagneticText';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Initial load animations with explosive entrance
      const tl = gsap.timeline({ delay: 2.2 });
      
      // Animate each child with advanced effects
      const children = contentRef.current.children;
      
      tl.fromTo(
        children,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
        }
      );
      
      // Scroll-based parallax effects - only for text content
      gsap.to(contentRef.current, {
        y: -150,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      
      // 3D Model stays static - no scroll animation for better UX
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden" ref={heroRef}>
      {/* Asymmetric Split Layout */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center min-h-screen py-20">
            
            {/* Left Content - Main Hero */}
            <div 
              ref={contentRef}
              className="hero-content relative z-10 space-y-10"
            >
              {/* Decorative Line Accent */}
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary-500 to-primary-500" />
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                  </span>
                  <span className="text-sm font-medium text-primary-300">Open to Opportunities</span>
                </div>
              </div>

              {/* Name - Large and Bold */}
              <div className="space-y-4">
                
                <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight font-display">
                  <div className="overflow-hidden">
                    <MagneticText 
                      strength={0.4}
                      className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-purple-500 to-fuchsia-500"
                    >
                      Omar
                    </MagneticText>
                  </div>
                  <div className="overflow-hidden">
                    <MagneticText 
                      strength={0.4}
                      className="block text-white"
                    >
                      Jaber
                    </MagneticText>
                  </div>
                </h1>
              </div>

              {/* Title Tags */}
              <div className="flex flex-wrap gap-3">
                <div className="px-6 py-3 bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-full backdrop-blur-sm">
                  <span className="text-primary-300 font-semibold font-display">Full Stack Developer</span>
                </div>
                <div className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm">
                  <span className="text-purple-300 font-semibold font-display">AI Specialist</span>
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500 rounded-full" />
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl pl-4">
                  4th-year Computer Science student at <span className="text-primary-400 font-semibold">AAUP, Ramallah</span>. 
                  Crafting AI-powered solutions that impact <span className="text-purple-400 font-semibold">40,000+ users</span> and 
                  setting new standards in innovation.
                </p>
              </div>

              {/* CTA Buttons - Larger and More Prominent */}
              <div className="flex flex-wrap gap-6 pt-4">
                <a
                  href="#projects"
                  className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-primary-600 to-fuchsia-600 hover:from-purple-500 hover:via-primary-500 hover:to-fuchsia-500 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden font-display"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Explore My Work
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
                <a
                  href="#contact"
                  className="group px-10 py-5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl font-bold text-lg transition-all transform hover:scale-105 border-2 border-white/10 hover:border-primary-500/50 hover:shadow-2xl relative overflow-hidden font-display"
                >
                  <span className="relative z-10">Let's Connect</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Quick Stats - Compact */}
              <div className="flex gap-8 pt-8 border-t border-gray-800">
                <div className="group cursor-pointer">
                  <div className="text-4xl font-black text-gradient mb-1 group-hover:scale-110 transition-transform font-display">15+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-display">Projects</div>
                </div>
                <div className="h-auto w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
                <div className="group cursor-pointer">
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform font-display">40K+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-display">Users</div>
                </div>
                <div className="h-auto w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent" />
                <div className="group cursor-pointer">
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform font-display">$30K+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide font-display">Value</div>
                </div>
              </div>
            </div>

            {/* Right Side - 3D Model (Floating Design) */}
            <div 
              ref={modelRef}
              className="relative h-[700px] lg:h-[800px] hidden lg:block"
            >
              {/* Layered Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-purple-500/5 to-pink-500/5 rounded-[3rem] transform rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-fuchsia-500/5 to-transparent rounded-[3rem] transform -rotate-2" />
              
              {/* Main Container */}
              <div className="relative h-full rounded-[3rem] border border-primary-500/20 backdrop-blur-sm overflow-hidden">
                {/* Decorative Grid Lines */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `
                    linear-gradient(to right, #9333ea 1px, transparent 1px),
                    linear-gradient(to bottom, #9333ea 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }} />
                
                {/* Corner Decorations - Modern Style */}
                <div className="absolute top-6 left-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>
                
                {/* Floating Corner Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary-500/30 rounded-tr-[3rem]" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-purple-500/30 rounded-bl-[3rem]" />
              
              {/* 3D Model Canvas */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <Canvas
                  shadows
                  dpr={[1, 2]} // Limit pixel ratio for better performance
                  performance={{ min: 0.5 }} // Dynamic performance scaling
                  camera={{ position: [0, 0, 5], fov: 50 }}
                  style={{ width: '100%', height: '100%' }}
                  gl={{ 
                    antialias: true,
                    powerPreference: "high-performance"
                  }}
                >
                  <Suspense fallback={<Model3DLoader />}>
                    {/* Balanced ambient lighting */}
                    <ambientLight intensity={0.5} color="#334155" />
                    
                    {/* Main directional light */}
                    <directionalLight position={[5, 5, 5]} intensity={1.0} color="#a855f7" castShadow />
                    
                    {/* Primary purple accent light from left */}
                    <pointLight position={[-5, 3, -3]} intensity={1.5} color="#9333ea" />
                    
                    {/* Purple accent light from right */}
                    <pointLight position={[5, -2, 3]} intensity={1.2} color="#8b5cf6" />
                    
                    {/* Fuchsia rim light from behind */}
                    <pointLight position={[0, 2, -5]} intensity={1.0} color="#c026d3" />
                    
                    {/* Top spotlight */}
                    <spotLight position={[0, 8, 4]} angle={0.6} penumbra={1} intensity={0.8} color="#a855f7" castShadow />
                    
                    {/* Hemisphere light */}
                    <hemisphereLight skyColor="#7c3aed" groundColor="#1e293b" intensity={0.5} />
                    
                    {/* Environment preset */}
                    <Environment preset="night" background={false} />
                    
                      <Model3D 
                        position={[0, -1.5, 0.5]} 
                        scale={1.7} 
                        rotation={[0, 0.2, 0]} 
                      />
                  </Suspense>
                </Canvas>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 via-transparent to-transparent rounded-3xl pointer-events-none" />
            </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#services"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Scroll</span>
          <ChevronDown size={24} className="text-primary-400" />
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;
