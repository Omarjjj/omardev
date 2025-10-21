import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gray-900/50 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            <motion.a
              href="https://github.com/Omarjjj"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="text-gray-400 group-hover:text-primary-400 transition-colors" size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/omar-jaber-69156424b/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="text-gray-400 group-hover:text-primary-400 transition-colors" size={24} />
            </motion.a>
            <motion.a
              href="mailto:20jaber19@gmail.com"
              className="w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all hover:scale-110 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="text-gray-400 group-hover:text-primary-400 transition-colors" size={24} />
            </motion.a>
          </div>

          {/* Email Button */}
          <motion.a
            href="mailto:20jaber19@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 rounded-lg font-medium transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
            Send me an email
          </motion.a>
        </motion.div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4 text-gradient">Omar Jaber</h3>
            <p className="text-gray-400 text-sm">
              Full Stack Developer & AI Specialist building innovative solutions that make a real difference.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-primary-400">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#home" className="hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary-400 transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-primary-400 transition-colors">Projects</a></li>
              <li><a href="#skills" className="hover:text-primary-400 transition-colors">Skills</a></li>
              <li><a href="#recognition" className="hover:text-primary-400 transition-colors">Recognition</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-primary-400">Featured Project</h4>
            <a 
              href="https://aaupai.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-primary-400 transition-colors inline-flex items-center gap-2"
            >
              Multi-University AI Assistant
              <ExternalLink size={14} />
            </a>
            <p className="text-xs text-gray-500 mt-2">
              Serving 40,000+ students across 6+ Palestinian universities
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>© {currentYear} Omar Jaber. Built with alot of caffeine</span>
              <span>and React</span>
            </div>
            <div className="flex gap-6">
              <a href="#home" className="hover:text-primary-400 transition-colors">Privacy</a>
              <a href="#home" className="hover:text-primary-400 transition-colors">Terms</a>
              <a href="#contact" className="hover:text-primary-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
