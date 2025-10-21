import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Brain, Smartphone, Fingerprint, Eye, Globe, Coffee, MapPin, Gamepad2, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCard from './AnimatedCard';
import MagneticText from './MagneticText';
import jam3tekHero from '../images/jam3tekHero.png';
import aaupAiHero from '../images/aaupAiHero.png';

gsap.registerPlugin(ScrollTrigger);

const ProjectsBento = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            duration: 0.8,
            delay: index * 0.08,
            ease: 'power2.out',
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-32 relative" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <MagneticText className="inline-block" strength={0.3}>
              Featured <span className="text-gradient">Projects</span>
            </MagneticText>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Innovation meets impact - from AI systems to IoT solutions
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Featured Project 1 - Multi-University AI (Large - spans 4 cols, 2 rows) */}
          <AnimatedCard className="project-card md:col-span-4 md:row-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-700/50 hover:border-primary-500/50 transition-colors h-full group">
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src={jam3tekHero} alt="Multi-University AI" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                        <Brain className="text-white" size={24} />
                      </div>
                      <span className="px-4 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-semibold">Featured</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white group-hover:text-primary-400 transition-colors">
                      Multi-University AI Assistant "جامعتك"
                    </h3>
                    
                    <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                      Revolutionary AI assistant covering 6+ Palestinian universities with Tinder-style comparisons, 
                      multi-language support, and contextual memory
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['React', 'FastAPI', 'Pinecone', 'OpenAI GPT', 'GSAP'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 font-semibold mb-1">40,000+ Active Users</p>
                      <p className="text-purple-400 font-semibold">$30,000+ Value</p>
                    </div>
                    <a
                      href="https://multiuni-frontend.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105"
                    >
                      View Project
                      <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Featured Project 2 - AAUP AI (Medium - spans 2 cols, 2 rows) */}
          <AnimatedCard className="project-card md:col-span-2 md:row-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-red-400/20 hover:border-red-400/40 transition-colors h-full group">
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img src={aaupAiHero} alt="AAUP AI Chatbot" className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-rose-400 rounded-xl flex items-center justify-center mb-4">
                      <Smartphone className="text-white" size={24} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors">
                      AAUP AI Chatbot
                    </h3>
                    
                    <p className="text-gray-300 mb-4">
                      First Android (Kotlin), then React web app with context-aware answers and bilingual interface
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span>Kotlin & React</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span>Bilingual Support</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span>University Deployment</span>
                      </div>
                    </div>
                  </div>
                  
                  <a
                    href="https://aaupai.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-400 font-semibold hover:text-red-300 transition-colors"
                  >
                    Visit Site
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* PulseID - IoT Project */}
          <AnimatedCard className="project-card md:col-span-2">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 h-full group hover:border-purple-500/40 transition-colors relative overflow-hidden flex flex-col">
              {/* Icon at top */}
              <div className="relative z-20 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-auto">
                <Fingerprint className="text-white" size={20} />
              </div>
              
              {/* Text content centered */}
              <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                  PulseID - Biometric System
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  IoT gym access with ESP32, MQTT, FastAPI, and real-time React dashboard
                </p>
                <div className="flex flex-wrap gap-1">
                  {['ESP32', 'MQTT', 'IoT'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* AI Driver Fatigue */}
          <AnimatedCard className="project-card md:col-span-2">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl border border-orange-500/20 p-6 h-full group hover:border-orange-500/40 transition-colors relative overflow-hidden flex flex-col">
              {/* Icon at top */}
              <div className="relative z-20 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-auto">
                <Eye className="text-white" size={20} />
              </div>
              
              {/* Text content centered */}
              <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                  AI Driver Safety System
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  ML-based fatigue detection trained on 300K+ samples with Chart.js visualizations
                </p>
                <div className="flex flex-wrap gap-1">
                  {['Python', 'ML', 'React'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-orange-500/20 rounded-full text-xs text-orange-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Smart Dashboard */}
          <AnimatedCard className="project-card md:col-span-2">
            <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6 h-full group hover:border-purple-500/40 transition-colors relative overflow-hidden flex flex-col">
              {/* Icon at top */}
              <div className="relative z-20 w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-lg flex items-center justify-center mb-auto">
                <Globe className="text-white" size={20} />
              </div>
              
              {/* Text content centered */}
              <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                  Smart Productivity Dashboard
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  React Native + Electron with AI assistant synced across platforms
                </p>
                <div className="flex flex-wrap gap-1">
                  {['React Native', 'Electron', 'AI'].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Study Café System */}
          <AnimatedCard className="project-card md:col-span-2">
            <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 backdrop-blur-sm rounded-2xl border border-amber-500/20 p-6 h-full group hover:border-amber-500/40 transition-colors relative overflow-hidden flex flex-col">
              {/* Icon at top */}
              <div className="relative z-20 w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mb-auto">
                <Coffee className="text-white" size={20} />
              </div>
              
              {/* Text content centered */}
              <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-400 transition-colors">
                  Study Café Manager
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  Automated check-in, time tracking, and income reports - live in production
                </p>
                <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-300">
                  In Production
                </span>
              </div>
            </div>
          </AnimatedCard>

          {/* AI Tourist Guide */}
          <AnimatedCard className="project-card md:col-span-2">
            <div className="bg-gradient-to-br from-teal-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl border border-teal-500/20 p-6 h-full group hover:border-teal-500/40 transition-colors relative overflow-hidden flex flex-col">
              {/* Icon at top */}
              <div className="relative z-20 w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center mb-auto">
                <MapPin className="text-white" size={20} />
              </div>
              
              {/* Text content centered */}
              <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-teal-400 transition-colors">
                  AI Tourist Guide
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  Hackathon project with location-aware suggestions and persona modes
                </p>
                <span className="inline-block px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-full text-xs text-teal-300">
                  Hackathon Winner
                </span>
              </div>
            </div>
          </AnimatedCard>

          {/* Unity Game */}
          <AnimatedCard className="project-card md:col-span-2">
            <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-violet-500/20 p-6 h-full group hover:border-violet-500/40 transition-colors relative overflow-hidden flex flex-col">
              {/* Icon at top */}
              <div className="relative z-20 w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mb-auto">
                <Gamepad2 className="text-white" size={20} />
              </div>
              
              {/* Text content centered */}
              <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-violet-400 transition-colors">
                  Unity Game Development
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  10K+ downloads, 18K+ YouTube subscribers, 170K+ total views
                </p>
                <span className="inline-block px-3 py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-xs text-violet-300">
                  Viral Success
                </span>
              </div>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </section>
  );
};

export default ProjectsBento;

