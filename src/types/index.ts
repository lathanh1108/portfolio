// Global type definitions for the portfolio project

// Project metadata (technical data only, no translatable content)
export interface ProjectMetadata {
  id: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

// Full project data (combines metadata with translations)
export interface Project extends ProjectMetadata {
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 1-5 scale
  category: 'frontend' | 'backend' | 'tools' | 'design';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface NavigationItem {
  href: string;
  label: string;
}

export interface LocaleContent {
  navigation: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    cta: string;
  };
  about: {
    title: string;
    description: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    viewCode: string;
  };
  contact: {
    title: string;
    subtitle: string;
  };
  footer: {
    copyright: string;
  };
}

export type Locale = 'en' | 'vi';

// Type for translation keys
export type NavigationKeys = 'home' | 'about' | 'skills' | 'projects' | 'contact';
export type HeroKeys = 'greeting' | 'name' | 'title' | 'description' | 'cta';
export type SectionKeys = 'title' | 'subtitle' | 'description';

// Global type augmentation for next-intl
declare global {
  interface IntlMessages {
    navigation: Record<NavigationKeys, string>;
    hero: Record<HeroKeys, string>;
    about: Record<SectionKeys, string>;
    skills: Record<SectionKeys | 'frontend' | 'backend' | 'tools' | 'design', string>;
    projects: Record<SectionKeys | 'viewProject' | 'viewCode' | 'all' | 'featured' | 'frontend' | 'fullstack' | 'showing' | 'projectsCount' | 'noProjects' | 'tryDifferentFilter' | 'viewAllProjects', string> & {
      list: Record<string, {
        title: string;
        description: string;
      }>;
    };
    contact: Record<SectionKeys | 'getInTouch' | 'description' | 'email' | 'phone' | 'location' | 'timezone' | 'emailValue' | 'phoneValue' | 'locationValue' | 'timezoneValue' | 'readyToWork' | 'ctaDescription' | 'startProject' | 'followMe' | 'connect' | 'availability' | 'availabilityStatus' | 'letsCreateSomething' | 'bottomCtaDescription' | 'sendMessage' | 'connectLinkedIn', string>;
    footer: {
      copyright: string;
      description: string;
      quickLinks: string;
      contact: string;
      madeWith: string;
      madeWithTech: string;
      backToTop: string;
    };
  }
}
