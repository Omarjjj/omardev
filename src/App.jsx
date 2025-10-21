import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import ProjectsBento from './components/ProjectsBento';
import Skills from './components/Skills';
import Recognition from './components/Recognition';
import RecognitionDetails from './components/RecognitionDetails';
import Footer from './components/Footer';
import LiquidEther from './components/LiquidEther';
import GradualBlur from './components/GradualBlur';
import PageLoader from './components/PageLoader';
import CustomCursor from './components/CustomCursor';
import ChatWidget from './components/ChatWidget';
import ScrollAnimations from './components/ScrollAnimations';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MainPage({ scrolled }) {
  return (
    <>
      <Navbar scrolled={scrolled} />
      <Hero />
      <Services />
      <About />
      <ProjectsBento />
      <Skills />
      <Recognition />
      <Footer />
    </>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Smooth scroll config
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ChatWidget />
      <ScrollAnimations />
      
      {/* Purple Liquid Ether Background */}
      <div className="fixed inset-0 -z-10">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      
      <div className="min-h-screen text-gray-300 overflow-x-hidden cursor-none md:cursor-none relative">
        <Routes>
          <Route path="/" element={<MainPage scrolled={scrolled} />} />
          <Route path="/recognition-details" element={<RecognitionDetails />} />
        </Routes>
      </div>
      
      {/* Gradual Blur Effect at Bottom */}
      <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={2.5}
        divCount={6}
        curve="ease-out"
        exponential={false}
        opacity={0.85}
        zIndex={20}
      />
    </>
  );
}

export default App;
