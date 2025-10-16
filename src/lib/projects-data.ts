import { ProjectMetadata } from '@/types';

// Technical metadata for projects (non-translatable data)
// Title and description are now in locales/en.json and locales/vi.json
export const PROJECTS_METADATA: ProjectMetadata[] = [
  {
    id: 'ecommerce-platform',
    image: '/images/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'MongoDB'],
    githubUrl: 'https://github.com/username/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true
  },
  {
    id: 'task-management-app',
    image: '/images/projects/task-app.jpg',
    technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Express'],
    githubUrl: 'https://github.com/username/task-management',
    liveUrl: 'https://task-manager-demo.vercel.app',
    featured: true
  },
  {
    id: 'weather-dashboard',
    image: '/images/projects/weather.jpg',
    technologies: ['Vue.js', 'JavaScript', 'CSS3', 'Weather API', 'Chart.js'],
    githubUrl: 'https://github.com/username/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.vercel.app',
    featured: false
  },
  {
    id: 'social-media-dashboard',
    image: '/images/projects/social-dashboard.jpg',
    technologies: ['React', 'TypeScript', 'D3.js', 'Firebase', 'Material-UI'],
    githubUrl: 'https://github.com/username/social-dashboard',
    liveUrl: 'https://social-dashboard-demo.vercel.app',
    featured: true
  },
  {
    id: 'portfolio-website',
    image: '/images/projects/portfolio.jpg',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/username/portfolio',
    liveUrl: 'https://portfolio-demo.vercel.app',
    featured: false
  },
  {
    id: 'blog-platform',
    image: '/images/projects/blog.jpg',
    technologies: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    githubUrl: 'https://github.com/username/blog-platform',
    liveUrl: 'https://blog-platform-demo.vercel.app',
    featured: false
  }
];
