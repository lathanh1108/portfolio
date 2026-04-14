'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { FloatingIcons } from '../ui/FloatingElements';

const iconMap = {
  GitHub: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Mail
};

export default function Hero() {
  const t = useTranslations('hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Floating Icons */}
        <FloatingIcons />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 sm:space-y-5"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg lg:text-xl text-gray-400 font-medium"
          >
            {t('greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('name')}
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-300"
          >
            {t('title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed px-4"
          >
            {t('description')}
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-6"
          >
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "p-3 rounded-full bg-gray-800 shadow-lg",
                    "text-gray-400 hover:text-blue-400",
                    "transition-all duration-200 hover:scale-110 hover:shadow-xl"
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="pt-4 pb-8"
          >
            <motion.button
              onClick={scrollToProjects}
              className={cn(
                "inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold",
                "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full",
                "hover:from-blue-700 hover:to-purple-700 transition-all duration-200",
                "shadow-lg hover:shadow-xl transform hover:scale-105"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('cta')}
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
