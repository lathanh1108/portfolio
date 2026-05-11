'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { useTranslations } from '@/contexts/LanguageContext';
import { EXPERIENCES } from '@/lib/experience-data';
import { fadeInUp, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

const typeBadgeClass: Record<string, string> = {
  frontend: 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
  backend: 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20',
  fullstack: 'bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20'
};

export default function Experience() {
  const t = useTranslations('experience');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={ref} data-component="Experience" data-section="experience" className="py-20 bg-gray-800 experience-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Timeline lines */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-700 hidden sm:block lg:hidden" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-700 hidden lg:block" />

          <div className="space-y-6 lg:space-y-8">
            {EXPERIENCES.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const isShifted = index > 0;

              return (
              <motion.div
                key={exp.id}
                variants={fadeInUp}
                className={cn(
                  'relative sm:pl-16 lg:pl-0 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-start lg:gap-8 lg:min-h-[16rem]',
                  isLeft ? 'lg:[&>div:last-child]:col-start-1' : 'lg:[&>div:last-child]:col-start-3',
                  isShifted && 'lg:-mt-40'
                )}
              >
                {/* Mobile/Tablet timeline icon */}
                <div className="absolute left-0 top-1 hidden sm:flex lg:hidden items-center justify-center w-12 h-12 rounded-full bg-gray-900 border border-gray-700 ring-2 ring-gray-800">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>

                {/* Desktop center node */}
                <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-[1.125rem] w-3 h-3 rounded-full bg-blue-400 ring-4 ring-gray-800" />

                {/* Desktop branch connector */}
                <div
                  className={cn(
                    'hidden lg:block absolute top-6 border-t border-dashed border-blue-400/60',
                    isLeft ? 'left-14 right-1/2' : 'left-1/2 right-14'
                  )}
                />

                {/* Desktop side icon */}
                <div
                  className={cn(
                    'hidden lg:flex absolute top-0 w-12 h-12 items-center justify-center rounded-full bg-gray-900 border border-gray-700 ring-2 ring-gray-800',
                    isLeft ? 'left-0' : 'right-0'
                  )}
                >
                  <Briefcase className="w-5 h-5 text-blue-400" />
                </div>

                {/* Card */}
                <div
                  className={cn(
                    'bg-gray-900/70 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/70 transition-colors lg:mt-16',
                    isLeft ? 'lg:mr-16 lg:ml-auto lg:max-w-xl' : 'lg:ml-16 lg:mr-auto lg:max-w-xl'
                  )}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-semibold text-white">
                          {t(`list.${exp.id}.role`)}
                        </h3>
                        {exp.current && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30">
                            {t('current')}
                          </span>
                        )}
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeBadgeClass[exp.type]}`}
                        >
                          {t(exp.type)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-400 font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm shrink-0">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {exp.highlightKeys.map((key) => (
                      <li key={key} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        <span>{t(`list.${exp.id}.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
