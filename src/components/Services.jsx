import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Rocket, Zap, Code2, Brain, Workflow, MessageSquare, TrendingUp } from 'lucide-react';
import DecryptedText from './DecryptedText';

const Services = () => {

  const services = [
    {
      icon: Brain,
      title: 'AI CHATBOT SYSTEMS',
      description: 'Custom AI-powered chatbots for any platform - websites, apps, or enterprise systems. RAG-based, context-aware, and trained on your data.',
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      particles: 3,
    },
    {
      icon: Zap,
      title: 'AI-POWERED AUTOMATION',
      description: 'Transform your workflow with intelligent automation. From data processing to decision-making, let AI handle the heavy lifting.',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      particles: 3,
    },
    {
      icon: Code2,
      title: 'FULL-STACK WEB APPS',
      description: 'Modern, scalable web applications with cutting-edge tech. From concept to deployment, I build solutions that users love.',
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      particles: 3,
    },
    {
      icon: Workflow,
      title: 'CUSTOM SYSTEM INTEGRATION',
      description: 'Seamlessly connect your existing systems with modern AI capabilities. API development, data migration, and real-time sync.',
      gradient: 'from-orange-400 via-red-500 to-rose-600',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      particles: 3,
    },
    {
      icon: MessageSquare,
      title: 'CONVERSATIONAL AI',
      description: 'Voice and text-based AI assistants that understand context, remember conversations, and provide intelligent responses.',
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-600',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      particles: 3,
    },
    {
      icon: TrendingUp,
      title: 'MVP TO PRODUCTION',
      description: 'Rapid development from idea to market. Proven track record with 40K+ users and $30K+ value delivered.',
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      glowColor: 'rgba(234, 179, 8, 0.4)',
      particles: 3,
    },
  ];

  // Magnetic card effect - Memoized to prevent re-renders
  const MagneticCard = React.memo(({ children, index }) => {
    return (
      <motion.div
        className="relative group"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        {children}
      </motion.div>
    );
  });

  return (
    <section id="services" className="min-h-screen py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* EXPLOSIVE HEADER */}
        <motion.div 
          className="text-center mb-32 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Glowing title badge */}
          <motion.div
            className="inline-block mb-8 relative"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse" />
            <div className="relative px-8 py-4 bg-black/40 backdrop-blur-xl rounded-full border-2 border-purple-500/50">
              <div className="flex items-center gap-3">
                <Sparkles className="text-purple-400 animate-spin" size={24} />
                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  WHAT I CAN BUILD FOR YOU
                </span>
                <Sparkles className="text-pink-400 animate-spin" size={24} style={{ animationDirection: 'reverse' }} />
              </div>
            </div>
          </motion.div>
          
          {/* 3D Text effect header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-7xl md:text-8xl lg:text-9xl font-black font-display mb-8 leading-none relative">
              <motion.span 
                className="block relative"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
                    '0 0 40px rgba(236, 72, 153, 0.5), 0 0 80px rgba(236, 72, 153, 0.3)',
                    '0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
                  BUILDING DIGITAL
                </span>
              </motion.span>
              <motion.span 
                className="block text-white mt-4"
                animate={{
                  textShadow: [
                    '5px 5px 0px rgba(168, 85, 247, 0.3)',
                    '8px 8px 0px rgba(168, 85, 247, 0.5)',
                    '5px 5px 0px rgba(168, 85, 247, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                EXCELLENCE
              </motion.span>
            </h2>

            <motion.p 
              className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Delivering <motion.span 
                className="font-black bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >AI-POWERED</motion.span> solutions and{' '}
              <motion.span 
                className="font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >FULL-STACK</motion.span> applications that drive results
            </motion.p>
          </motion.div>

          {/* Floating achievement badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            {[
              { label: '40K+ USERS', icon: '', color: 'purple', delay: 0 },
              { label: '$30K+ VALUE', icon: '', color: 'fuchsia', delay: 0.2 },
              { label: '15+ PROJECTS', icon: '', color: 'pink', delay: 0.4 },
            ].map((badge, i) => (
              <motion.div
                key={i}
                className={`px-8 py-4 bg-${badge.color}-500/5 border-2 border-${badge.color}-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden hover:bg-${badge.color}-500/10 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: badge.delay }}
                whileHover={{ scale: 1.05 }}
              >
                <span className={`text-${badge.color}-300 font-black text-lg font-display flex items-center gap-2 relative z-10`}>
                  <span className="text-2xl">{badge.icon}</span>
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <MagneticCard key={index} index={index}>
                <motion.div
                  className="relative h-full"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Card glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />

                  {/* Glass card */}
                  <div className="relative h-full bg-black/40 backdrop-blur-xl rounded-3xl border-2 border-white/10 p-8 overflow-hidden group-hover:border-white/20 transition-all duration-300">
                    {/* Animated gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="inline-flex relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-50`} />
                        <div className="relative p-5 bg-black/60 backdrop-blur-xl rounded-2xl border-2 border-white/20 group-hover:border-white/30 transition-colors duration-300">
                          <Icon size={40} className="text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent relative`}>
                      {service.title}
                    </h3>

                    {/* Description with Decrypt Effect */}
                    <div className="relative z-10">
                      <DecryptedText
                        text={service.description}
                        speed={30}
                        maxIterations={12}
                        sequential={false}
                        revealDirection="start"
                        className="text-gray-100"
                        encryptedClassName="text-gray-600"
                        parentClassName="text-lg leading-relaxed"
                        animateOn="both"
                      />
                    </div>

                    {/* Decorative corner accents */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />

                    {/* Bottom progress bar */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient}`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              </MagneticCard>
            );
          })}
        </div>

        {/* EXPLOSIVE CTA */}
        <motion.div
          className="text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="#contact"
            className="relative inline-block group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
            
            <div className="relative px-12 md:px-16 py-6 md:py-8 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl border-2 border-white/20 overflow-hidden">
              {/* Animated shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />

              {/* Text content */}
              <span className="relative z-10 flex items-center gap-3 md:gap-4 text-xl md:text-3xl font-black text-white">
                <Rocket size={28} />
                LET'S BUILD SOMETHING GREAT
                <Sparkles size={28} />
              </span>
            </div>
          </motion.a>

          <p className="text-lg md:text-xl text-gray-300 mt-8 font-bold">
            🔥 Limited Availability - Let's Build Your Vision
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
