import { ProcessStep } from '../types';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Architecture',
    subtitle: 'Laying the foundation through deep inquiry.',
    description: 'We audit your brand ecosystem, map competitive landscapes, and outline exact technical specifications before placing a single pixel.',
    highlights: [
      'Executive & stakeholder alignment sessions',
      'Information architecture & sitemap mapping',
      'Technical feasibility & performance benching',
      'Creative moodboarding & typographic exploration'
    ]
  },
  {
    number: '02',
    title: 'Design Systems & Craft',
    subtitle: 'Where strategy takes physical and visual form.',
    description: 'We craft high-contrast, grid-aligned design systems with custom typography, responsive layout rules, and interactive motion prototypes.',
    highlights: [
      'Bespoke Figma design token creation',
      'High-fidelity desktop and mobile viewports',
      'Interactive micro-interaction prototyping',
      'Accessibility & WCAG AA contrast validation'
    ]
  },
  {
    number: '03',
    title: 'High-Performance Engineering',
    subtitle: 'Translating design into 60fps code.',
    description: 'Our development team builds ultra-fast, clean TypeScript applications with fluid motion transitions, headless API connections, and SEO optimization.',
    highlights: [
      'Clean modular React & TypeScript architecture',
      'Framer Motion & GPU-accelerated canvas transitions',
      'Headless CMS & Commerce API integrations',
      'Lighthouse performance tuning (<1s FCP)'
    ]
  },
  {
    number: '04',
    title: 'Launch & Continuous Evolution',
    subtitle: 'Deploying excellence and refining metrics.',
    description: 'We orchestrate zero-downtime launches, monitor live user analytics, and partner long-term to ensure your digital ecosystem stays ahead.',
    highlights: [
      'Global CDN deployment & domain configuration',
      'Analytics & custom event telemetry tracking',
      'Post-launch performance optimization',
      'Continuous feature updates & retainer support'
    ]
  }
];
