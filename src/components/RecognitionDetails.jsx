import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Instagram, Globe } from 'lucide-react';
import LiquidEther from './LiquidEther';
import instagramPostReco from '../images/instagramPostReco.jpg';
import websitePostReco from '../images/websitePostReco.png';

const RecognitionDetails = () => {
  const recognitions = [
    {
      title: 'Instagram Recognition',
      description: 'Featured on AAUP\'s official Instagram as a success story',
      image: instagramPostReco,
      link: 'https://www.instagram.com/p/DPEdd6fCZ3i/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      icon: Instagram,
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      platform: 'Instagram'
    },
    {
      title: 'Official Website Feature',
      description: 'Published article about creating "Your University" platform serving Palestinian universities',
      image: websitePostReco,
      link: 'https://www.aaup.edu/faculty-information-technology/achievements/arab-american-university-student-creates-your-university-platform-serve-palestinian-university',
      icon: Globe,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      platform: 'AAUP Website'
    }
  ];

  return (
    <div className="min-h-screen relative bg-gray-950 overflow-hidden">
      {/* LiquidEther Background */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <LiquidEther
          mouseForce={20}
          cursorSize={100}
          resolution={0.5}
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          className="w-full h-full"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* Content */}
      <div className="relative" style={{ zIndex: 10 }}>
        {/* Header with Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/#recognition"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors mb-12 group"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
              <span className="font-semibold">Back to Portfolio</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-pink-500/10 border-2 border-primary-500/30 backdrop-blur-xl">
                <span className="text-2xl">🏆</span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400">
                  UNIVERSITY RECOGNITION
                </span>
              </div>
            </motion.div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="block text-white">Official</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400">
                Recognition
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Officially recognized by Arab American University (AAUP) as a success story while still a student
            </p>
          </motion.div>

          {/* Recognition Cards */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {recognitions.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                
                {/* Card Container */}
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl border-2 border-gray-800/50 group-hover:border-primary-500/50 transition-all duration-500 overflow-hidden">
                  {/* Platform Badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.gradient} shadow-lg`}>
                      <item.icon size={16} className="text-white" />
                      <span className="text-sm font-bold text-white">{item.platform}</span>
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    {/* Hover Overlay with Icon */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500`}>
                        <ExternalLink className="text-white" size={32} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className={`text-3xl font-black mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${item.gradient} transition-all duration-500`}>
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                      {item.description}
                    </p>
                    
                    {/* View Link */}
                    <div className={`inline-flex items-center gap-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}>
                      <span>View Recognition</span>
                      <ExternalLink size={18} className="text-primary-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Border Animation */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                  />
                </div>
              </motion.a>
            ))}
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 text-center"
          >
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl border-2 border-primary-500/30 p-10">
              <div className="text-6xl mb-6">✨</div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Recognized Among Alumni
              </h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                One of the few students to be officially recognized by AAUP as a success story <span className="text-primary-400 font-semibold">while still studying</span>, 
                featured alongside alumni on university's official platforms and social media channels.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecognitionDetails;

