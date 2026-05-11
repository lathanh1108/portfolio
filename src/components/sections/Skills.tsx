'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Code, Database, Settings, Palette } from 'lucide-react';
import { SKILLS_DATA } from '@/lib/skills-data';
import { cn } from '@/lib/utils';

// Skill icon mapping - SVG files from public folder
const skillIconMap: Record<string, string> = {
  'React': '/icons/skills/react.svg',
  'Next.js': '/icons/skills/nextjs.svg',
  'TypeScript': '/icons/skills/typescript.svg',
  'JavaScript': '/icons/skills/javascript.svg',
  'HTML/CSS': '/icons/skills/html-css.svg',
  'Tailwind CSS': '/icons/skills/tailwind.svg',
  'Vue.js': '/icons/skills/vue.svg',
  'Node.js': '/icons/skills/nodejs.svg',
  'Express.js': '/icons/skills/expressjs.svg',
  'PostgreSQL': '/icons/skills/postgresql.svg',
  'REST APIs': '/icons/skills/rest-apis.svg',
  'GraphQL': '/icons/skills/graphql.svg',
  'Git': '/icons/skills/git.svg',
  'Docker': '/icons/skills/docker.svg',
  'Vercel': '/icons/skills/vercel.svg',
  'VS Code': '/icons/skills/vscode.svg',
  'Webpack': '/icons/skills/webpack.svg',
  'Jest': '/icons/skills/jest.svg',
  'Figma': '/icons/skills/figma.svg',
  'Adobe XD': '/icons/skills/adobe-xd.svg',
  'Photoshop': '/icons/skills/photoshop.svg',
  'UI/UX Design': '/icons/skills/ui-ux.svg'
};

const getSkillIcon = (skillName: string): string | null => {
  return skillIconMap[skillName] || null;
};

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
      data-component="Skills"
      data-section="skills"
      className="py-20 bg-gray-800 skills-section"
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
            <div className="skills-grid-container p-8 transition-all duration-300">
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {filteredSkills.map((skill, index) => {
                  const iconPath = getSkillIcon(skill.name);
                  return (
                    <motion.div
                      key={skill.name}
                      className="skill-item-card flex flex-col items-center justify-center rounded-lg border border-slate-300/70 bg-white/90 p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {iconPath && (
                        <div className="flex h-14 w-full items-center justify-center px-3">
                          <Image 
                            src={iconPath} 
                            alt={skill.name}
                            width={200}
                            height={56}
                            sizes="(max-width: 768px) 72px, 96px"
                            className="h-10 w-auto max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <h4 className="text-center text-sm font-medium text-slate-900">
                        {skill.name}
                      </h4>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
