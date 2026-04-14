'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_PHONE_TEL,
  LINKEDIN_PROFILE_URL,
  SOCIAL_LINKS
} from '@/lib/constants';

const iconMap = {
  Mail,
  GitHub: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Twitter: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
};

const contactInfo = [
  {
    icon: Mail,
    labelKey: 'email',
    valueKey: 'emailValue',
    href: CONTACT_EMAIL_MAILTO
  },
  {
    icon: Phone,
    labelKey: 'phone',
    valueKey: 'phoneValue',
    href: CONTACT_PHONE_TEL
  },
  {
    icon: MapPin,
    labelKey: 'location',
    valueKey: 'locationValue',
    href: null
  },
  {
    icon: Clock,
    labelKey: 'timezone',
    valueKey: 'timezoneValue',
    href: null
  }
];

export default function Contact() {
  const t = useTranslations('contact');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      id="contact" 
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

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {t('getInTouch')}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {t('description')}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <motion.div
                      key={info.labelKey}
                      className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          {t(info.labelKey as keyof IntlMessages['contact'])}
                        </h4>
                        <p className="text-gray-400">
                          {t(info.valueKey as keyof IntlMessages['contact'])}
                        </p>
                      </div>
                    </motion.div>
                  );

                  return info.href ? (
                    <a 
                      key={info.labelKey}
                      href={info.href}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.labelKey}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Call to Action & Social Links */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Call to Action Card */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  {t('readyToWork')}
                </h3>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  {t('ctaDescription')}
                </p>
                <a 
                  href={CONTACT_EMAIL_MAILTO}
                  className="inline-flex items-center gap-2 bg-gray-900 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  <Mail className="w-5 h-5" />
                  {t('startProject')}
                </a>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {t('followMe')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = iconMap[link.icon as keyof typeof iconMap];
                    return (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            {link.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {t('connect')}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h4 className="font-semibold text-green-800">
                    {t('availability')}
                  </h4>
                </div>
                <p className="text-green-700 text-sm">
                  {t('availabilityStatus')}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('letsCreateSomething')}
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('bottomCtaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={CONTACT_EMAIL_MAILTO}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Mail className="w-5 h-5" />
                {t('sendMessage')}
              </a>
              <a 
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                {t('connectLinkedIn')}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
