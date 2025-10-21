import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Reveal page content with GSAP
      gsap.to('body', {
        opacity: 1,
        duration: 0.5,
      });
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0b2e 50%, #0a0a0f 100%)',
          }}
        >
          {/* Animated gradient orbs - optimized */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(14, 165, 233, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(14, 165, 233, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
            }}
          />

          <div className="relative z-10 text-center">
            {/* Animated logo/name with glowing effect */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                type: 'spring', 
                stiffness: 200,
                damping: 20 
              }}
              className="mb-12 relative"
            >
              <motion.div
                className="absolute inset-0 blur-2xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <h1 className="text-8xl font-bold text-gradient">OJ</h1>
              </motion.div>
              <h1 className="text-8xl font-bold text-gradient relative">OJ</h1>
            </motion.div>

            {/* Progress bar with glow */}
            <div className="relative w-80 h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-700/30">
              <motion.div
                className="h-full relative"
                style={{
                  background: 'linear-gradient(90deg, #9333ea 0%, #8b5cf6 50%, #ec4899 100%)',
                  boxShadow: '0 0 20px rgba(147, 51, 234, 0.5)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>

            {/* Progress percentage */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-2xl font-bold text-primary-400"
            >
              {Math.floor(progress)}%
            </motion.p>

            {/* Loading text with typing effect */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-2 text-gray-400 text-sm tracking-widest"
            >
              LOADING PORTFOLIO
            </motion.p>

            {/* Orbiting dots - optimized */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary-400"
                  style={{
                    left: 0,
                    top: 0,
                  }}
                  animate={{
                    rotate: 360,
                    x: Math.cos((i * 120 * Math.PI) / 180) * 100,
                    y: Math.sin((i * 120 * Math.PI) / 180) * 100,
                  }}
                  transition={{
                    rotate: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    x: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
