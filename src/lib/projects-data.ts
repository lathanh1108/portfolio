import { ProjectMetadata } from '@/types';

// Technical metadata for projects (non-translatable data)
// Title and description are now in locales/en.json and locales/vi.json
export const PROJECTS_METADATA: ProjectMetadata[] = [
  {
    id: 'portfolio-website',
    image: '/images/projects/portfolio.jpg',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/lathanh1108/portfolio',
    liveUrl: 'https://www.latatthanh.com/',
    featured: false
  }
];
