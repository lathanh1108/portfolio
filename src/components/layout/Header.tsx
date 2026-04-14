'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/contexts/LanguageContext';
import { BRAND_NAME } from '@/lib/constants';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { layoutContainerClass, scrollToHref } from './layout.utils';
import Navigation from './Navigation';

const headerBaseClass = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
const headerScrolledClass = 'bg-gray-900/90 backdrop-blur-md shadow-lg';
const headerDefaultClass = 'bg-transparent';

export default function Header() {
  const t = useTranslations('header');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    const frameId = window.requestAnimationFrame(handleScroll);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(headerBaseClass, isScrolled ? headerScrolledClass : headerDefaultClass)}
    >
      <div className={layoutContainerClass}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                scrollToHref('#home');
              }}
              className="text-xl font-bold text-white hover:text-blue-600 transition-colors"
            >
              {BRAND_NAME}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              aria-label={t('toggleMobileMenu')}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900">
              <Navigation 
                isMobile
                onItemClick={closeMobileMenu}
                className="py-4"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
