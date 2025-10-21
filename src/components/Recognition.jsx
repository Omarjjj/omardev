import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Trophy, Star, Users, Briefcase, TrendingUp, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Recognition = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background effect - optimized
      gsap.to('.recognition-bg', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        ease: 'none',
        force3D: true,
      });

      // Stats cards - Slide up with scale
      gsap.utils.toArray('.stat-card').forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            force3D: true,
            ease: 'power2.out',
          }
        );
      });

      // Achievement cards - Reveal with scale
      gsap.utils.toArray('.achievement-card').forEach((card, index) => {
        gsap.fromTo(card,
          {
            y: 120,
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            force3D: true,
            ease: 'power2.out',
          }
        );
      });

      // Highlight items - Scale in
      gsap.utils.toArray('.highlight-item').forEach((item, index) => {
        gsap.fromTo(item,
          {
            scale: 0.8,
            opacity: 0,
            y: 40,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.7,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            force3D: true,
            ease: 'back.out(1.7)',
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const achievements = [
    {
      icon: Award,
      title: 'University Success Story',
      description: 'Officially recognized by AAUP as a success story while still a student (most others were alumni)',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Star,
      title: 'Featured on University Platforms',
      description: 'Featured on AAUP\'s official app and digital platforms as a model student',
      color: 'from-purple-500 to-fuchsia-500'
    },
    {
      icon: Users,
      title: 'Selected by Head of AI in country',
      description: 'Personally chosen to represent AAUP at a two-day AI event with the university president',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Briefcase,
      title: 'Top Company Internship',
      description: 'Secured internship at the leading tech company in Asal technologies',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trophy,
      title: 'Company-Level Work',
      description: 'Projects praised as "company-level work" by university leadership',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Funded Innovation',
      description: 'Multi-University AI Assistant officially recognized by AAUP for 40,000+ students',
      color: 'from-purple-600 to-purple-500'
    }
  ];

  const stats = [
    { number: '40,000+', label: 'Users Served', icon: Users },
    { number: '$30,000', label: 'Project Value', icon: TrendingUp },
    { number: '10+', label: 'Major Projects', icon: Trophy }
  ];

  return (
    <section id="recognition" className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Animated background with parallax */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="recognition-bg absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(to right, #9333ea 1px, transparent 1px), linear-gradient(to bottom, #9333ea 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-pink-500/10 border border-primary-500/30">
              <Trophy className="text-primary-400" size={24} />
              <span className="text-base font-semibold text-primary-300">Recognition & Impact</span>
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            Achievements{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400">
              That Matter
            </span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            Recognition from leaders, impact on thousands, and turning vision into reality
          </p>
        </motion.div>

        {/* Stats Section - Vertical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card group relative"
              style={{ 
                transformStyle: 'preserve-3d', 
                willChange: 'transform',
                opacity: 1 
              }}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-800 group-hover:border-primary-500/50 overflow-hidden transition-all duration-500">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-500/20 to-transparent rounded-bl-full" />
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-primary-400" size={32} />
                  </div>
                </div>
                
                {/* Number */}
                <div className="relative z-10 mb-3">
                  <div className="text-5xl font-black bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                </div>
                
                {/* Label */}
                <div className="relative z-10 text-gray-400 font-medium">
                  {stat.label}
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite'
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Achievements - Masonry/Stacked Layout */}
        <div className="space-y-6 mb-32">
          {achievements.map((achievement, index) => {
            // Make the first card (University Success Story) clickable
            const isClickable = index === 0;
            const CardWrapper = isClickable ? Link : 'div';
            const wrapperProps = isClickable ? { to: '/recognition-details' } : {};
            
            return (
              <div
                key={index}
                className="achievement-card group relative"
                style={{ 
                  transformStyle: 'preserve-3d', 
                  willChange: 'transform',
                  opacity: 1 
                }}
              >
                <CardWrapper 
                  {...wrapperProps}
                  className={`block ${isClickable ? 'cursor-pointer' : ''}`}
                >
                  <div className={`relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 border border-gray-800 group-hover:border-primary-500/40 overflow-hidden transition-all duration-500 ${isClickable ? 'hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-500/20' : ''}`}>
                    {/* Left gradient bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b ${achievement.color}`} />
                    
                    {/* Floating orb effect */}
                    <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${achievement.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

                    <div className="relative grid md:grid-cols-[auto_1fr] gap-8 items-center">
                      {/* Icon Section */}
                      <div className="flex flex-col items-center md:items-start gap-4">
                        <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${achievement.color} p-1 group-hover:scale-110 transition-transform duration-300`}>
                          <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center">
                            <achievement.icon className="text-white" size={36} />
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className="text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-400 group-hover:to-purple-400 transition-all duration-300">
                            {achievement.title}
                          </h3>
                          {isClickable && (
                            <div className="flex items-center gap-2 px-3 py-1 bg-primary-500/20 border border-primary-500/40 rounded-full text-primary-300 text-sm font-semibold group-hover:bg-primary-500/30 transition-colors">
                              <span>View Details</span>
                              <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          )}
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed">
                          {achievement.description}
                        </p>
                        {isClickable && (
                          <div className="mt-4 text-primary-400 text-sm font-semibold flex items-center gap-2">
                            <span>Click to see official recognition posts</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </div>
            );
          })}
        </div>

        {/* Beyond Academia - Large Feature Cards */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400">
              Beyond Academia
            </span>
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '10,000+', label: 'Game Downloads', sub: 'Unity Game Development', gradient: 'from-green-500 to-emerald-500', icon: '' },
              { number: '18,000+', label: 'YouTube Subscribers', sub: '170K+ views from 6 videos', gradient: 'from-red-500 to-pink-500', icon: '' },
              { number: '7+ Years', label: 'Design Experience', sub: 'Photoshop & Video Editing', gradient: 'from-purple-500 to-purple-600', icon: '' }
            ].map((item, index) => (
              <div
                key={index}
                className="highlight-item group relative"
                style={{ willChange: 'transform', opacity: 1 }}
              >
                <div className="relative h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 border border-gray-800 group-hover:border-primary-500/40 transition-all duration-500 text-center overflow-hidden">
                  {/* Top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${item.gradient}`} />
                  
                  {/* Icon emoji */}
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  {/* Number */}
                  <div className={`text-6xl font-black mb-4 bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-2xl font-bold text-white mb-3">
                    {item.label}
                  </div>
                  
                  {/* Sub text */}
                  <div className="text-gray-500 font-medium">
                    {item.sub}
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recognition;
