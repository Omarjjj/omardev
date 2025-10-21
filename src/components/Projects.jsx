import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Smartphone, Fingerprint, Eye, Brain, Coffee, MapPin, Gamepad2, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCard from './AnimatedCard';
import MagneticText from './MagneticText';
import jam3tekHero from '../images/jam3tekHero.png';
import aaupAiHero from '../images/aaupAiHero.png';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards with GPU acceleration
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            scale: 0.95,
          },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
            force3D: true,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const projects = [
    {
      icon: Brain,
      title: 'Multi-University AI Assistant "جامعتك"',
      description: 'Revolutionary AI assistant covering 6+ Palestinian universities (AAUP, Birzeit, Al-Najah, Polytechnic, Al-Quds, Bethlehem)',
      features: [
        'Tinder-style tuition & majors comparison tool',
        'Multi-language support (Arabic + English)',
        'Persona-based answers (Gen Z, tourist guide, etc.)',
        'Contextual memory across chats'
      ],
      tech: ['React', 'Tailwind', 'Framer Motion', 'GSAP', 'FastAPI', 'Pinecone', 'OpenAI GPT'],
      impact: 'Officially funded by AAUP - Used by 40,000+ students',
      value: 'Estimated commercial value: $30,000',
      link: 'https://multiuni-frontend.vercel.app/',
      gradient: 'from-primary-500 to-fuchsia-500',
      heroImage: jam3tekHero,
      hasFlipCard: true
    },
    {
      icon: Smartphone,
      title: 'AAUP University AI Chatbot',
      description: 'First version built in Android Studio (Kotlin), later rebuilt as React web app',
      features: [
        'Context-aware university-specific answers',
        'Registration, tuition, and majors information',
        'Bilingual interface (Arabic & English)',
        'Fully deployed pilot AI assistant'
      ],
      tech: ['Kotlin', 'Android Studio', 'React', 'AI/NLP'],
      impact: 'Pilot system for university-wide deployment',
      link: 'https://aaupai.vercel.app/',
      gradient: 'from-green-500 to-emerald-500',
      heroImage: aaupAiHero,
      hasFlipCard: true
    },
    {
      icon: Fingerprint,
      title: 'PulseID - Fingerprint Gym Access System',
      description: 'Full-stack IoT system for secure gym access management',
      features: [
        'ESP32 biometric enrollment for members',
        'MQTT + FastAPI backend for secure access',
        'React dashboard with real-time updates',
        'Locker control and activity logging'
      ],
      tech: ['ESP32', 'MQTT', 'FastAPI', 'React', 'IoT'],
      impact: 'Production-ready system for gym management',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Eye,
      title: 'AI Driver Fatigue & Drowsiness Detection',
      description: 'Machine learning system for road safety',
      features: [
        'Trained 3 ML models on 300k+ samples',
        'High accuracy for fatigue detection',
        'Real-time yawning and eye closure monitoring',
        'Web app with Chart.js visualizations'
      ],
      tech: ['Python', 'scikit-learn', 'React', 'Framer Motion', 'Tailwind', 'Chart.js'],
      impact: 'Advanced safety system with production-grade accuracy',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: 'Smart Productivity Dashboard with AI',
      description: 'React Native + Electron app with integrated AI assistant',
      features: [
        'Task management, reminders, and notes',
        'Context-aware AI chatbot synced with all data',
        'Real-time updates with smooth animations',
        'Cross-platform desktop and mobile'
      ],
      tech: ['React Native', 'Electron', 'AI Integration', 'Real-time Sync'],
      impact: 'Full-featured productivity suite with AI',
      gradient: 'from-purple-500 to-fuchsia-500'
    },
    {
      icon: Coffee,
      title: 'Study Café Management System',
      description: 'Custom solution for local study café replacing manual notebooks',
      features: [
        'Automated check-in and time tracking',
        'Pricing by duration + product ordering',
        'Daily and monthly income reports',
        'Integrated AI chatbot for queries'
      ],
      tech: ['React', 'FastAPI', 'Database', 'AI Chatbot'],
      impact: 'Live production system for local business',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      icon: MapPin,
      title: 'AI Tourist Guide',
      description: 'Hackathon project with persona-based recommendations',
      features: [
        'Location-aware suggestions',
        'Multiple persona modes',
        'Real-time recommendations',
        'Competition-ready implementation'
      ],
      tech: ['React', 'AI/NLP', 'Geolocation', 'API Integration'],
      impact: 'Built for hackathon competition',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      icon: Gamepad2,
      title: 'Unity Game Development Success',
      description: 'Early achievement in game development and content creation',
      features: [
        'Unity game with 10,000+ downloads',
        'YouTube channel: 18,000+ subscribers',
        '170,000+ total views from only 6 videos',
        'C# game programming'
      ],
      tech: ['Unity', 'C#', 'Game Design', 'Content Creation'],
      impact: 'Viral success in gaming and media',
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <section id="projects" className="py-32 relative animate-section" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <MagneticText className="inline-block" strength={0.3}>
              Featured <span className="text-gradient">Projects</span>
            </MagneticText>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            From AI-powered university systems to IoT solutions and game development - 
            a showcase of innovation and impact
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {projects.map((project, index) => (
            project.hasFlipCard ? (
              // Flip card for special projects with AnimatedCard wrapper
              <AnimatedCard
                key={index}
                className="project-card h-[600px]"
              >
                <div className="flip-card-inner relative w-full h-full transition-transform duration-700 group hover:[transform:rotateY(180deg)]" style={{ transformStyle: 'preserve-3d' }}>
                  {/* Front of card */}
                  <div className="flip-card-front absolute w-full h-full bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/20" style={{ backfaceVisibility: 'hidden' }}>
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-r ${project.gradient} p-6`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <project.icon className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                          </div>
                        </div>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:scale-110 transition-transform"
                          >
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-300 mb-4">{project.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-primary-400 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-gray-400 flex items-start">
                              <span className="text-primary-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-primary-400 mb-2">Tech Stack:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {project.impact && (
                        <div className="mb-2">
                          <p className="text-sm font-semibold text-green-400">
                            {project.impact}
                          </p>
                        </div>
                      )}

                      {project.value && (
                        <div>
                          <p className="text-sm font-semibold text-purple-400">
                            {project.value}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="flip-card-back absolute w-full h-full bg-gray-900 rounded-2xl overflow-hidden border border-primary-500/50 shadow-2xl shadow-primary-500/20" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block w-full h-full group/back"
                    >
                      <img
                        src={project.heroImage}
                        alt={`${project.title} Hero`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover/back:opacity-40 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <div className="flex items-center gap-2 text-primary-400">
                          <span>Visit Live Site</span>
                          <ExternalLink size={20} />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            ) : (
              // Regular card for other projects with AnimatedCard wrapper
              <AnimatedCard
                key={index}
                className="project-card"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-primary-500/50 transition-colors">
                  {/* Header with gradient */}
                  <div className={`bg-gradient-to-r ${project.gradient} p-6`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <project.icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:scale-110 transition-transform"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-primary-400 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-start">
                          <span className="text-primary-400 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-primary-400 mb-2">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.impact && (
                    <div className="mb-2">
                      <p className="text-sm font-semibold text-green-400">
                        {project.impact}
                      </p>
                    </div>
                  )}

                  {project.value && (
                    <div>
                      <p className="text-sm font-semibold text-purple-400">
                        {project.value}
                      </p>
                    </div>
                  )}
                </div>
                </div>
              </AnimatedCard>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
