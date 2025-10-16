'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Palette, Rocket, Users } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import { PROFILE_IMAGE } from '@/lib/constants';
import Image from 'next/image';

const highlights = [
  {
    icon: Code,
    titleKey: 'clean_code',
    descriptionKey: 'clean_code_desc'
  },
  {
    icon: Palette,
    titleKey: 'design',
    descriptionKey: 'design_desc'
  },
  {
    icon: Rocket,
    titleKey: 'performance',
    descriptionKey: 'performance_desc'
  },
  {
    icon: Users,
    titleKey: 'collaboration',
    descriptionKey: 'collaboration_desc'
  }
];

export default function About() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageError, setImageError] = useState(false);

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

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-20 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-gray-400 leading-relaxed">
                {t('description')}
              </p>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                {t('passion')}
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  {t('experience_title')}
                </h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {t('experience_1')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {t('experience_2')}
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                    {t('experience_3')}
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Image/Avatar Placeholder */}
            <motion.div 
              variants={itemVariants}
              className="relative order-first lg:order-last"
            >
              <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform rotate-6" />
                
                {/* Main image container */}
                <div className="relative bg-gray-700 rounded-3xl overflow-hidden h-full">
                  {!imageError ? (
                    <Image 
                      src={PROFILE_IMAGE}
                      alt="Profile"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
                      priority
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4" />
                        <p className="text-gray-400 text-sm px-4">
                          Add your profile image to:<br />
                          <code className="text-blue-400">{PROFILE_IMAGE}</code>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Code className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Palette className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <ScrollReveal
                  key={highlight.titleKey}
                  delay={index * 0.1}
                  direction="up"
                >
                  <motion.div
                    className="p-6 bg-gray-800 rounded-xl text-center hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h4 className="font-semibold text-white mb-2">
                      {t(highlight.titleKey as keyof IntlMessages['about'])}
                    </h4>
                    <p className="text-sm text-gray-400 flex-grow">
                      {t(highlight.descriptionKey as keyof IntlMessages['about'])}
                    </p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
