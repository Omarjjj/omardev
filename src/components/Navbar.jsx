import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);

  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'projects', 'skills', 'recognition'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Professional entrance animation - no delay
  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      // Immediate visibility with smooth slide down
      gsap.fromTo(navRef.current, 
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: 2.5 // After page loader
        }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Recognition', href: '#recognition', id: 'recognition' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1343400] transition-all duration-500 ${
          scrolled 
            ? 'bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-primary-500/5 border-b border-gray-800/50' 
            : 'bg-transparent'
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-600 via-primary-500 to-metallic-600 origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Icon */}
            <motion.a
              href="#home"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center"
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="text-white" size={20} />
              </motion.div>
              <div className="hidden sm:block">
                <div className="text-2xl font-bold text-gradient font-display">Omar Jaber</div>
                <div className="text-xs text-gray-500 -mt-1 font-display">Full Stack Dev</div>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group font-display ${
                    activeSection === item.id
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  
                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary-800/30 rounded-lg border border-primary-700/40"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover underline */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-3/4"></span>
                </a>
              ))}
              
              {/* CTA Button - Sophisticated Design */}
              <motion.a
                href="#contact"
                className="relative ml-4 px-7 py-3 overflow-hidden group font-display font-semibold text-sm rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient border */}
                <motion.div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 via-metallic-500 to-primary-500 opacity-100"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Inner background */}
                <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-shimmer" />
                </motion.div>
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary-500/50 via-metallic-500/50 to-primary-500/50 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent group-hover:from-primary-300 group-hover:via-white group-hover:to-metallic-300 transition-all duration-500">
                  <Mail className="w-4 h-4 text-primary-400 group-hover:text-primary-300 transition-colors" />
                  Contact Me
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-800/50 bg-gray-950/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-primary-800/30 text-primary-400 border border-primary-700/40'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="relative block overflow-hidden group"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500 via-metallic-500 to-primary-500" />
                
                {/* Inner background */}
                <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 via-metallic-500/30 to-primary-500/30 rounded-xl blur-md opacity-60" />
                
                {/* Button content */}
                <div className="relative z-10 px-4 py-3 flex items-center justify-center gap-2 font-display font-semibold">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                    Contact Me
                  </span>
                  <span className="text-primary-300">→</span>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
