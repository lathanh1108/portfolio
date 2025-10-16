'use client';

import { useTranslations } from '@/contexts/LanguageContext';
import { NAVIGATION_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

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
      const sections = NAVIGATION_ITEMS.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
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
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    onItemClick?.();
  };

  return (
    <nav className={cn(
      isMobile ? "flex flex-col space-y-4" : "flex items-center space-x-8",
      className
    )}>
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = activeSection === item.href.substring(1);
        
        return (
          <button
            key={item.href}
            onClick={() => handleClick(item.href)}
            className={cn(
              "relative px-3 py-2 text-sm font-medium transition-all duration-200",
              "hover:text-blue-600",
              isActive 
                ? "text-blue-600" 
                : "text-gray-300",
              isMobile && "text-left text-lg py-3"
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
