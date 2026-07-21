export type ThemeMode = 'light' | 'dark';

export type NavigationTab = 'home' | 'work' | 'services' | 'process' | 'contact';

export interface Project {
  id: string;
  title: string;
  category: 'E-commerce' | 'Fintech' | 'Architecture' | 'Lifestyle' | 'SaaS' | 'Web3' | 'Healthcare' | 'Interior Design';
  year: string;
  tagline: string;
  description: string;
  fullDescription: string;
  client: string;
  location: string;
  image: string;
  galleryImages: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  challenge: string;
  solution: string;
  featuredInHome?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: string; // Lucide icon name
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}
