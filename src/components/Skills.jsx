import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Database, Globe, Smartphone, Cpu, Brain, Terminal, Layers, Sparkles, Zap, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCard from './AnimatedCard';
import MagneticText from './MagneticText';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate skill cards with GPU acceleration
      gsap.utils.toArray('.skill-card').forEach((card, index) => {
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
            duration: 0.7,
            delay: index * 0.08,
            ease: 'power2.out',
            force3D: true,
          }
        );
      });

      // Animate progress bars with GPU acceleration
      gsap.utils.toArray('.progress-bar').forEach((bar) => {
        const width = bar.getAttribute('data-width');
        gsap.fromTo(bar,
          {
            width: '0%',
          },
          {
            width: width + '%',
            scrollTrigger: {
              trigger: bar,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            duration: 1.5,
            ease: 'power2.out',
            force3D: true,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const skillCategories = [
    {
      icon: Globe,
      title: 'Frontend Development',
      skills: ['React (Vite)', 'Tailwind CSS', 'Zustand', 'GSAP', 'Framer Motion', 'JavaScript', 'TypeScript', 'Responsive Design']
    },
    {
      icon: Database,
      title: 'Backend Development',
      skills: ['FastAPI (Python)', 'Node.js + Express', 'MongoDB', 'SQL', 'JWT Authentication', 'REST APIs', 'Middleware']
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      skills: ['scikit-learn', 'OpenAI APIs', 'Pinecone (Vector DB)', 'ML Model Training', 'NLP', 'AI Integration', 'Context Management']
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      skills: ['Android Studio', 'Kotlin', 'React Native', 'Cross-platform Apps', 'Mobile UI/UX']
    },
    {
      icon: Cpu,
      title: 'IoT & Hardware',
      skills: ['ESP32', 'MQTT Protocol', 'Biometric Sensors', 'Real-time Systems', 'Hardware Integration']
    },
    {
      icon: Code2,
      title: 'Programming Languages',
      skills: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'C#', 'Kotlin', 'SQL']
    },
    {
      icon: Palette,
      title: 'Design & Media',
      skills: ['Photoshop (Expert)', 'Adobe After Effects', 'Vegas Pro', 'UI/UX Design', 'Logo Design', 'Video Editing']
    },
    {
      icon: Terminal,
      title: 'Tools & Platforms',
      skills: ['Git/GitHub', 'Postman', 'Vercel', 'Render', 'Unity', 'Electron', 'Agile Development']
    }
  ];

  const languages = [
    { name: 'C++', level: 90 },
    { name: 'Python', level: 95 },
    { name: 'JavaScript/TypeScript', level: 95 },
    { name: 'Java', level: 85 },
    { name: 'C#', level: 80 },
    { name: 'Kotlin', level: 85 },
    { name: 'SQL', level: 90 }
  ];

  return (
    <section id="skills" className="py-32 relative animate-section" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <MagneticText className="inline-block" strength={0.3}>
              Technical <span className="text-gradient">Expertise</span>
            </MagneticText>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            A comprehensive arsenal of cutting-edge technologies and creative tools
          </p>
        </motion.div>

        {/* Featured Skills - Large Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <AnimatedCard className="skill-card">
            <div className="bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-transparent backdrop-blur-sm rounded-3xl p-10 border-2 border-primary-500/20 h-full group hover:border-primary-500/40 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Brain className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">AI & Machine Learning</h3>
                  <p className="text-primary-400 font-semibold">Next-Gen Intelligence</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['OpenAI APIs', 'Pinecone DB', 'scikit-learn', 'NLP Processing', 'Model Training', 'Context Management'].map((skill) => (
                  <div key={skill} className="px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-xl text-primary-300 font-medium text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="skill-card">
            <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent backdrop-blur-sm rounded-3xl p-10 border-2 border-purple-500/20 h-full group hover:border-purple-500/40 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Globe className="text-white" size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Full-Stack Development</h3>
                  <p className="text-purple-400 font-semibold">Modern Web & Mobile</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['React / Vite', 'FastAPI', 'Node.js', 'MongoDB', 'Tailwind CSS', 'React Native'].map((skill) => (
                  <div key={skill} className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-300 font-medium text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Skill Categories - Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <AnimatedCard key={index} className="skill-card">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-colors h-full group flex flex-col">
                {/* Icon at top */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600/20 to-purple-600/20 rounded-xl flex items-center justify-center mb-auto group-hover:scale-110 transition-transform">
                  <category.icon className="text-primary-400" size={24} />
                </div>
                
                {/* Text content centered */}
                <div className="flex-1 flex flex-col justify-center py-4">
                  <h3 className="text-lg font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-700/50 rounded-lg text-xs text-gray-300">
                        {skill}
                      </span>
                    ))}
                    {category.skills.length > 4 && (
                      <span className="px-2 py-1 bg-primary-500/20 rounded-lg text-xs text-primary-400 font-semibold">
                        +{category.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Programming Languages - Compact Showcase */}
        <AnimatedCard className="skill-card mb-12">
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-10 border-2 border-purple-500/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Code2 className="text-white" size={24} />
              </div>
              <h3 className="text-3xl font-bold text-white">Programming Languages</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {languages.map((lang, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-gray-300 font-semibold mb-3 text-lg">{lang.name}</div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="progress-bar h-full bg-gradient-to-r from-purple-500 to-purple-500"
                      data-width={lang.level}
                      style={{ width: '0%', willChange: 'width' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Strengths - Modern Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: 'Rapid Learner',
              description: 'Quickly adapting to new technologies and frameworks',
              gradient: 'from-yellow-500 to-orange-500'
            },
            {
              icon: Sparkles,
              title: 'Problem Solver',
              description: 'Creative solutions to complex technical challenges',
              gradient: 'from-purple-500 to-purple-500'
            },
            {
              icon: Star,
              title: 'Entrepreneurial Mindset',
              description: 'Transforming ideas into impactful products',
              gradient: 'from-purple-500 to-pink-500'
            }
          ].map((strength, index) => (
            <AnimatedCard key={index} className="skill-card">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-colors text-center h-full group flex flex-col">
                {/* Icon at top */}
                <div className={`w-16 h-16 bg-gradient-to-br ${strength.gradient} rounded-2xl flex items-center justify-center mx-auto mb-auto group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                  <strength.icon className="text-white" size={28} />
                </div>
                
                {/* Text content centered */}
                <div className="flex-1 flex flex-col justify-center py-4">
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">{strength.title}</h4>
                  <p className="text-gray-400">{strength.description}</p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
