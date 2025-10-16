'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Database, Settings, Palette } from 'lucide-react';
import { SKILLS_DATA } from '@/lib/skills-data';
// import { Skill } from '@/types'; // Unused import
import { cn } from '@/lib/utils';
import ProgressBar from '../ui/ProgressBar';
import AnimatedCounter from '../ui/AnimatedCounter';

const categoryConfig = {
  frontend: {
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-gray-800'
  },
  backend: {
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-gray-800'
  },
  tools: {
    icon: Settings,
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-gray-800'
  },
  design: {
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-gray-800'
  }
} as const;

type CategoryKey = keyof typeof categoryConfig;

export default function Skills() {
  const t = useTranslations('skills');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('frontend');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const categories = Object.keys(categoryConfig) as CategoryKey[];
  const filteredSkills = SKILLS_DATA.filter(skill => skill.category === activeCategory);

  const getCategoryTitle = (category: CategoryKey): string => {
    const titles: Record<CategoryKey, keyof IntlMessages['skills']> = {
      frontend: 'frontend',
      backend: 'backend',
      tools: 'tools',
      design: 'design'
    };
    return t(titles[category]);
  };

  return (
    <section 
      id="skills" 
      ref={ref}
      className="py-20 bg-gray-800"
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
            <p className="text-lg text-gray-400 mb-8">
              {t('subtitle')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Category Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 p-1 bg-gray-900 rounded-xl shadow-sm">
              {categories.map((category) => {
                const config = categoryConfig[category];
                const Icon = config.icon;
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
                      isActive 
                        ? "bg-gradient-to-r text-white shadow-lg" 
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      isActive && config.color
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="capitalize">{getCategoryTitle(category)}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants}>
            <div className={cn(
              "rounded-2xl p-8 transition-all duration-300",
              categoryConfig[activeCategory].bgColor
            )}>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center justify-between p-4 bg-gray-900 rounded-xl shadow-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2">
                        {skill.name}
                      </h4>
                      <ProgressBar 
                        value={skill.level} 
                        max={5}
                        animated={isInView}
                      />
                    </div>
                    <div className="ml-4">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center text-white bg-gradient-to-r",
                        categoryConfig[activeCategory].color
                      )}>
                        <span className="font-bold text-lg">{skill.level}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => {
                const config = categoryConfig[category];
                const Icon = config.icon;
                const skillsCount = SKILLS_DATA.filter(skill => skill.category === category).length;
                
                return (
                  <div
                    key={category}
                    className="p-6 bg-gray-900 rounded-xl shadow-sm text-center"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 bg-gradient-to-r",
                      config.color
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-1">
                      {getCategoryTitle(category)}
                    </h4>
                    <p className="text-2xl font-bold text-gray-400">
                      <AnimatedCounter from={0} to={skillsCount} />
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
