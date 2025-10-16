'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { PROJECTS_METADATA } from '@/lib/projects-data';
import { Project } from '@/types';
import { cn } from '@/lib/utils';
import ProjectCard from '../ui/ProjectCard';

const filterOptions = ['all', 'featured', 'frontend', 'fullstack'] as const;
type FilterOption = typeof filterOptions[number];

export default function Projects() {
  const t = useTranslations('projects');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Combine metadata with translations to create full project objects
  const projectsWithTranslations = useMemo((): Project[] => {
    return PROJECTS_METADATA.map(metadata => ({
      ...metadata,
      title: t(`list.${metadata.id}.title`),
      description: t(`list.${metadata.id}.description`)
    }));
  }, [t]);

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

  const getFilteredProjects = (): Project[] => {
    switch (activeFilter) {
      case 'featured':
        return projectsWithTranslations.filter(project => project.featured);
      case 'frontend':
        return projectsWithTranslations.filter(project => 
          project.technologies.some(tech => 
            ['React', 'Vue.js', 'Next.js', 'JavaScript', 'TypeScript'].includes(tech)
          )
        );
      case 'fullstack':
        return projectsWithTranslations.filter(project => 
          project.technologies.some(tech => 
            ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Firebase'].includes(tech)
          )
        );
      default:
        return projectsWithTranslations;
    }
  };

  const filteredProjects = getFilteredProjects();

  const getFilterLabel = (filter: FilterOption): string => {
    const labels: Record<FilterOption, keyof IntlMessages['projects']> = {
      all: 'all',
      featured: 'featured',
      frontend: 'frontend',
      fullstack: 'fullstack'
    };
    return t(labels[filter]);
  };

  return (
    <section 
      id="projects" 
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
            <p className="text-lg text-gray-400 mb-8">
              {t('subtitle')}
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 p-1 bg-gray-800 rounded-xl">
              {filterOptions.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 capitalize",
                      isActive 
                        ? "bg-gray-900 text-blue-600 shadow-lg" 
                        : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                    )}
                  >
                    {filter === 'all' && <Filter className="w-4 h-4" />}
                    <span>{getFilterLabel(filter)}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Projects Count */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-400">
              {t('showing')} <span className="font-semibold text-blue-600">{filteredProjects.length}</span> {t('projectsCount')}
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">
                  {t('noProjects')}
                </h3>
                <p className="text-gray-400">
                  {t('tryDifferentFilter')}
                </p>
              </div>
            )}
          </motion.div>

          {/* View All Projects Button */}
          {activeFilter !== 'all' && filteredProjects.length > 0 && (
            <motion.div variants={itemVariants} className="text-center">
              <button
                onClick={() => setActiveFilter('all')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('viewAllProjects')}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
