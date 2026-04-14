import { Metadata } from 'next';
import enTranslations from '../../locales/en.json';
import viTranslations from '../../locales/vi.json';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_E164,
  LINKEDIN_PROFILE_URL,
  SOCIAL_LINKS
} from './constants';

// Simple metadata without next-intl dependency
export function generateMetadata(locale: 'en' | 'vi'): Metadata {
  const content = locale === 'vi' ? viTranslations : enTranslations;
  const title = content.seo.title;
  const description = content.seo.description;
  const keywords = content.seo.keywords;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourportfolio.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: keywords.split(',').map((keyword) => keyword.trim()),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'vi': `${baseUrl}/vi`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: 'Your Name',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/twitter-image.jpg`],
    },
  };
}

export function generateStructuredData(locale: 'en' | 'vi') {
  const content = locale === 'vi' ? viTranslations : enTranslations;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourportfolio.com';
  const socialProfiles = SOCIAL_LINKS.filter((link) => link.icon !== 'Mail').map((link) => link.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': content.hero.name,
    'url': baseUrl,
    'image': `${baseUrl}/profile.jpg`,
    'sameAs': socialProfiles.length > 0 ? socialProfiles : [LINKEDIN_PROFILE_URL],
    'jobTitle': content.hero.title,
    'worksFor': {
      '@type': 'Organization',
      'name': 'Freelance'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': content.contact.locationValue,
      'addressCountry': 'Vietnam',
    },
    'email': CONTACT_EMAIL,
    'telephone': CONTACT_PHONE_E164,
    'knowsAbout': [
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Vue.js',
      'Laravel',
      'Salesforce',
      'Shopify'
    ],
  };
}