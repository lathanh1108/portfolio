'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from '@/contexts/LanguageContext';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { scrollToHref, sectionIdFromHref } from './layout.utils';

const desktopContainerClass = 'flex items-center space-x-8';
const mobileContainerClass = 'flex flex-col space-y-4';
const navItemBaseClass = 'relative px-3 py-2 text-sm font-medium transition-all duration-200';
const navItemHoverClass = 'hover:text-blue-600';
const navItemActiveClass = 'text-blue-600';
const navItemInactiveClass = 'text-gray-300';
const navItemMobileClass = 'text-left text-lg py-3';

const navigationSections = NAVIGATION_ITEMS.map((item) => sectionIdFromHref(item.href));

interface NavigationProps {
  className?: string;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function Navigation({ className, isMobile = false, onItemClick }: NavigationProps) {
  const t = useTranslations('navigation');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of navigationSections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    scrollToHref(href);
    onItemClick?.();
  };

  return (
    <nav className={cn(isMobile ? mobileContainerClass : desktopContainerClass, className)}>
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = activeSection === sectionIdFromHref(item.href);
        
        return (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            className={cn(
              navItemBaseClass,
              navItemHoverClass,
              isActive ? navItemActiveClass : navItemInactiveClass,
              isMobile && navItemMobileClass
            )}
          >
            {t(item.label as keyof IntlMessages['navigation'])}
            {isActive && !isMobile && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
