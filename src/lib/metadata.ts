import { Metadata } from 'next';

// Simple metadata without next-intl dependency
export function generateMetadata(locale: 'en' | 'vi'): Metadata {
  const isVietnamese = locale === 'vi';
  
  const title = isVietnamese ? 'Portfolio - Lập trình viên Full Stack' : 'Portfolio - Full Stack Developer';
  const description = isVietnamese 
    ? 'Portfolio chuyên nghiệp trình bày kỹ năng phát triển web hiện đại và các dự án. Có kinh nghiệm với React, Next.js, TypeScript và phát triển full-stack.'
    : 'Professional portfolio showcasing modern web development skills and projects. Experienced in React, Next.js, TypeScript, and full-stack development.';
  
  const keywords = isVietnamese
    ? 'Lập trình viên Full Stack,React Developer,Next.js,TypeScript,JavaScript,Phát triển Web,Frontend Developer,Backend Developer,Portfolio,Developer'
    : 'Full Stack Developer,React Developer,Next.js,TypeScript,JavaScript,Web Development,Frontend Developer,Backend Developer,Portfolio,Developer,Web Development';

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
  const isVietnamese = locale === 'vi';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourportfolio.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Your Name',
    'url': baseUrl,
    'image': `${baseUrl}/profile.jpg`,
    'sameAs': [
      'https://github.com',
      'https://linkedin.com',
    ],
    'jobTitle': isVietnamese ? 'Lập trình viên Full Stack' : 'Full Stack Developer',
    'worksFor': {
      '@type': 'Organization',
      'name': 'Freelance'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': isVietnamese ? 'Thành phố Hồ Chí Minh' : 'Ho Chi Minh City',
      'addressCountry': 'Vietnam',
    },
    'email': 'your.email@example.com',
    'telephone': '+1 (555) 123-4567',
    'knowsAbout': isVietnamese 
      ? ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Phát triển Full Stack', 'Phát triển Web']
      : ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Full Stack Development', 'Web Development', 'Frontend Development', 'Backend Development'],
  };
}