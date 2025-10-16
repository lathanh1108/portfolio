import { SocialLink, NavigationKeys } from '@/types';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'Github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'Linkedin'
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'Mail'
  }
];

export const NAVIGATION_ITEMS: Array<{ href: string; label: NavigationKeys }> = [
  { href: '#home', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#contact', label: 'contact' }
];

export const SUPPORTED_LOCALES = ['en', 'vi'] as const;
export const DEFAULT_LOCALE = 'en';

// Profile image configuration
// Supported formats: jpg, jpeg, png, webp, gif
// Just change the filename here, the component will automatically use it
export const PROFILE_IMAGE = '/images/profile.jpg'; // Change to profile.png, profile.webp, etc.
