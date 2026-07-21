import { Service } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'ui-ux-design',
    number: '01',
    title: 'UI/UX Design',
    description: 'Crafting intuitive digital interfaces that harmonize aesthetic purity with functional clarity. We focus on user behavior to drive engagement through beauty.',
    icon: 'LayoutGrid',
    features: [
      'Editorial Layout Systems & Grid Architectures',
      'Design Token Libraries & Component Specifications',
      'High-Fidelity Interactive Motion Prototypes',
      'User Journey Mapping & Ergonomic Audits',
      'Multi-device Responsive Spatial Adaptation'
    ],
    deliverables: ['Figma Master Libraries', 'Motion Specifications', 'UX Wireframes', 'Interactive Prototypes']
  },
  {
    id: 'full-stack-dev',
    number: '02',
    title: 'Full-stack Development',
    description: 'High-performance engineering using modern frameworks. We build scalable, secure, and blazing-fast applications tailored to your business logic.',
    icon: 'Layers',
    features: [
      'React / TypeScript / Next.js Architectures',
      '60fps Micro-interactions & Canvas Graphics',
      'Headless Commerce & Custom CMS Integrations',
      'API Infrastructure & Serverless Microservices',
      'Web Vitals & Performance Optimization'
    ],
    deliverables: ['Production-ready Repositories', 'API Documentation', 'Lighthouse 100/100 Audits', 'CI/CD Pipelines']
  },
  {
    id: 'brand-strategy',
    number: '03',
    title: 'Brand Strategy',
    description: 'Deep analysis and creative positioning. We define the visual and verbal soul of your brand to ensure it resonates in a crowded marketplace.',
    icon: 'Sparkles',
    features: [
      'Brand Identity & Typographic Systems',
      'Strategic Positioning & Competitor Audit',
      'Verbal Tone of Voice & Copywriting Frameworks',
      'Art Direction for Photography & Video',
      'Brand Guidelines & Digital Guidelines Book'
    ],
    deliverables: ['Brand Manual (PDF)', 'Typography & Palette Tokens', '3D Asset Guidelines', 'Copywriting Playbook']
  },
  {
    id: 'creative-direction-motion',
    number: '04',
    title: 'Creative Direction & Motion',
    description: 'Editorial motion systems, 3D spatial experiences, interactive micro-interactions, and visual storytelling that make lasting impressions.',
    icon: 'Compass',
    features: [
      '3D Interactive Product Models',
      'Smooth Scroll Dynamics & Shader FX',
      'Audio Reactive Micro-interactions',
      'Commercial Campaign Art Direction',
      'Immersive WebXR & Spatial Visuals'
    ],
    deliverables: ['GSAP / Motion Libraries', '3D GLTF Models', 'Motion Styleguides', 'Interactive Demos']
  }
];
