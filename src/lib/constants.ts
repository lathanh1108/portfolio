import { SocialLink, NavigationKeys } from '@/types';

export const BRAND_NAME = 'Portfolio';
export const CONTACT_EMAIL = 'lathanh1108@gmail.com';
export const CONTACT_EMAIL_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const CONTACT_PHONE = '0342166367';
export const CONTACT_PHONE_E164 = '+84342166367';
export const CONTACT_PHONE_TEL = `tel:${CONTACT_PHONE_E164}`;
export const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/lathanh1108';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/lathanh1108',
    icon: 'GitHub'
  },
  {
    name: 'LinkedIn',
    url: LINKEDIN_PROFILE_URL,
    icon: 'LinkedIn'
  },
  {
    name: 'Email',
    url: CONTACT_EMAIL_MAILTO,
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
