'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { PROJECTS_METADATA } from '@/lib/projects-data';
import { Project } from '@/types';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  const t = useTranslations('projects');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  return (
    <section 
      id="projects" 
      ref={ref}
      data-component="Projects"
      data-section="projects"
      className="py-20 bg-gray-900 projects-section"
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

          {/* Projects Grid */}
          <motion.div variants={itemVariants}>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projectsWithTranslations.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
