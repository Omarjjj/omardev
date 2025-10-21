import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Briefcase, Zap, Sparkles, Code, Trophy, Rocket } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCard from './AnimatedCard';
import MagneticText from './MagneticText';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.utils.toArray('.about-card').forEach((card, index) => {
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
            duration: 1,
            delay: index * 0.1,
            ease: 'power3.out',
          }
        );
      });

      // Animate stats with counter effect
      gsap.utils.toArray('.stat-number').forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.fromTo(stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            onUpdate: function() {
              stat.textContent = Math.ceil(stat.textContent) + '+';
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: '4th-year Computer Science at AAUP with strong foundation in multiple programming languages',
      gradient: 'from-purple-500 to-fuchsia-500'
    },
    {
      icon: Award,
      title: 'University Success Story',
      description: 'Recognized by AAUP while still a student - featured on university platforms',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Briefcase,
      title: 'Real-World Impact',
      description: 'Projects serving 40,000+ users with estimated commercial value of $30,000+',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Rapid Innovation',
      description: 'Turning student projects into production-ready systems used by thousands',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="about" className="min-h-screen py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <MagneticText className="inline-block" strength={0.3}>
              About <span className="text-gradient">Me</span>
            </MagneticText>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            A journey of innovation, dedication, and impact
          </p>
        </motion.div>

        {/* Hero Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Large Feature Card */}
          <AnimatedCard className="about-card">
            <div className="bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-10 border-2 border-primary-500/20 backdrop-blur-sm h-full relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center">
                    <Sparkles className="text-white" size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-gradient">My Journey</h3>
                </div>
                
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p>
                    As a <span className="text-primary-400 font-semibold">4th-year Computer Science student</span> at AAUP, 
                    I've transformed from a curious learner into a creator of impactful solutions.
                  </p>
                  <p>
                    My journey began with game development, achieving <span className="text-purple-400 font-semibold">10K+ downloads</span> and 
                    building a YouTube community of <span className="text-pink-400 font-semibold">18K+ subscribers</span>.
                  </p>
                  <p>
                    Today, I build <span className="text-purple-400 font-semibold">AI-powered systems</span> serving 
                    <span className="text-green-400 font-semibold"> 40,000+ users</span>, recognized by university leadership and 
                    the Head of AI in the country.
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-primary-400 font-bold text-xl">
                    <Rocket size={24} />
                    <span>Creating solutions that set new standards</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Right: Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <AnimatedCard className="about-card">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-primary-500/50 transition-colors h-full flex flex-col justify-center items-center text-center relative">
                <div className="relative z-10 w-full">
                  <div className="stat-number text-5xl font-bold text-gradient mb-2" data-target="15">15+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard className="about-card">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-colors h-full flex flex-col justify-center items-center text-center relative">
                <div className="relative z-10 w-full">
                  <div className="stat-number text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2" data-target="40000">40K+</div>
                  <div className="text-gray-400">Users Impacted</div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard className="about-card">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-green-500/50 transition-colors h-full flex flex-col justify-center items-center text-center relative">
                <div className="relative z-10 w-full">
                  <div className="stat-number text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2" data-target="30000">$30K+</div>
                  <div className="text-gray-400">Project Value</div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard className="about-card">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-colors h-full flex flex-col justify-center items-center text-center relative">
                <div className="relative z-10 w-full">
                  <div className="stat-number text-5xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-500 bg-clip-text text-transparent mb-2" data-target="4">4+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <AnimatedCard key={index} className="about-card">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-primary-500/50 transition-colors h-full group relative flex items-center justify-center">
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;