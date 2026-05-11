export interface ExperienceItem {
  id: string;
  company: string;
  role: string; // translation key
  period: string;
  current: boolean;
  type: 'frontend' | 'backend' | 'fullstack';
  highlightKeys: string[]; // translation key suffixes
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'groove-technology',
    company: 'Groove Technology',
    role: 'role',
    period: '2021 – Oct 2025',
    current: false,
    type: 'fullstack',
    highlightKeys: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  },
  {
    id: 'rivercrane-vietnam',
    company: 'Rivercrane Vietnam',
    role: 'role',
    period: '2019 – 2021',
    current: false,
    type: 'frontend',
    highlightKeys: ['h1', 'h2', 'h3', 'h4', 'h5']
  },
  {
    id: 'k-soft',
    company: 'K-Soft',
    role: 'role',
    period: '2018 – 2019',
    current: false,
    type: 'backend',
    highlightKeys: ['h1', 'h2', 'h3', 'h4']
  },
  {
    id: 'vias-software',
    company: 'VIAS Software',
    role: 'role',
    period: '2017 – 2018',
    current: false,
    type: 'frontend',
    highlightKeys: ['h1']
  }
];
