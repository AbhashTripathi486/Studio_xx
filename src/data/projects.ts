import { Project } from '../types';

// @ts-ignore
import smylexlImage from '@/assets/smylexl_mockup.png';
// @ts-ignore
import uniqueWholefoodImage from '@/assets/uniquewholefood_mockup.png';
// @ts-ignore
import creativePropertyStylistImage from '@/assets/creativepropertystylist_mockup.png';
// @ts-ignore
import holyDentalCareImage from '@/assets/holydentalcare_mockup.png';

export const PROJECTS: Project[] = [
  {
    id: 'smylexl',
    title: 'SmyleXL',
    category: 'Healthcare',
    year: '2024',
    tagline: 'Multi-location dental clinic website focused on trust and appointment conversion.',
    description: 'Designed and developed a professional website for SmyleXL, a growing chain of dental clinics.',
    fullDescription: 'SmyleXL is a modern, responsive website designed for a multi-location dental clinic network. The primary focus is to establish trust, educate patients about available treatments, and simplify appointment booking through an intuitive user experience. The website combines a clean healthcare aesthetic with strong conversion-focused design principles.',
    client: 'SmyleXL Dental Network',
    location: 'Mumbai, India',
    image: smylexlImage,
    galleryImages: [smylexlImage],
    metrics: [
      { label: 'Booking Conversion', value: '+35%' },
      { label: 'Patient Inquiries', value: '4.5k/mo' },
      { label: 'Mobile Page Speed', value: '0.8s' }
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Google Maps API', 'CSS Animations', 'Modern UI Components'],
    challenge: 'Showcasing multiple clinics and doctors clearly while keeping the appointment booking journey friction-free for all age groups.',
    solution: 'We created a centralized clinic locator with instant booking forms, integrated doctor credentials profiles, and mobile-first responsive interactions.',
    featuredInHome: true
  },
  {
    id: 'unique-wholefood',
    title: 'Unique Wholefood',
    category: 'E-commerce',
    year: '2024',
    tagline: 'Premium organic grocery e-commerce platform supporting physical store footprints.',
    description: 'Designed and developed a modern online shopping experience for an organic grocery brand focused on healthy living and sustainability.',
    fullDescription: 'Unique Wholefood is a premium e-commerce platform built for an Australian organic grocery retailer. The website enables customers to discover, purchase, and have certified organic produce, pantry essentials, wellness products, and eco-friendly goods delivered across Australia, while also supporting physical store locations.',
    client: 'Unique Wholefood Australia',
    location: 'Sydney, Australia',
    image: uniqueWholefoodImage,
    galleryImages: [uniqueWholefoodImage],
    metrics: [
      { label: 'Sales Growth', value: '+188%' },
      { label: 'Average Cart Value', value: '$112 AUD' },
      { label: 'Mobile Traffic Share', value: '68%' }
    ],
    techStack: ['Shopify Storefront', 'Liquid Templating', 'JavaScript (ES6)', 'HTML5 / CSS3', 'Tailwind CSS', 'SEO Optimization'],
    challenge: 'Organizing a massive inventory of organic food and products into a readable, fast-loading mobile catalog.',
    solution: 'We customized a high-performance Shopify storefront with advanced search filters, Click & Collect integration, and clean product-centric visual grid layouts.',
    featuredInHome: true
  },
  {
    id: 'creative-property-stylist',
    title: 'Creative Property Stylist',
    category: 'Interior Design',
    year: '2024',
    tagline: 'Premium interior design and property styling portfolio website.',
    description: 'Designed and developed a premium service website for a property styling and interior design business.',
    fullDescription: 'Creative Property Stylist is a premium business website for an Australian interior design and home staging company. The platform showcases professional property styling, interior design, and consultation services while building trust through an elegant design, portfolio galleries, testimonials, and clear calls-to-action. The business primarily serves homeowners, property investors, and real estate agents across Sydney.',
    client: 'Creative Property Stylist',
    location: 'Sydney, Australia',
    image: creativePropertyStylistImage,
    galleryImages: [creativePropertyStylistImage],
    metrics: [
      { label: 'Consultation Enquiries', value: '+240%' },
      { label: 'Engagement Rate', value: '+75%' },
      { label: 'Page Load Speed', value: '< 1s' }
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'Tailwind CSS', 'GSAP Animations', 'SEO Optimization', 'Contact Form Integration'],
    challenge: 'Translating high-quality physical interior designs and home staging projects into a premium online visual catalog.',
    solution: 'We designed a luxury, image-centric layout with sophisticated typography, smooth GSAP fade-ins, and clear service-focused lead capture paths.',
    featuredInHome: true
  },
  {
    id: 'holy-dental-care',
    title: 'Holy Dental Care',
    category: 'Healthcare',
    year: '2024',
    tagline: 'A modern dental clinic website designed to enhance patient trust and streamline bookings.',
    description: 'Designed and developed a professional dental clinic website for a multi-specialty clinic.',
    fullDescription: 'Holy Dental Care is a modern healthcare website developed for a multi-specialty dental clinic in Mumbai. The platform is designed to build patient trust, showcase comprehensive dental treatments, and simplify appointment booking through a clean, informative, and user-friendly interface. The clinic emphasizes advanced dental technology and patient-centered care.',
    client: 'Holy Dental Care',
    location: 'Mumbai, India',
    image: holyDentalCareImage,
    galleryImages: [holyDentalCareImage],
    metrics: [
      { label: 'Online Bookings', value: '+45%' },
      { label: 'Patient Retention', value: '92%' },
      { label: 'Search Visibility', value: '+60%' }
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'CSS Animations', 'Google Maps API', 'Contact Form Integration', 'SEO Optimization'],
    challenge: 'Creating an informative healthcare portal that remains highly accessible and easy to navigate for patients of all ages.',
    solution: 'We engineered a patient-centric interface with structured treatment information, prominent booking call-to-actions, and an optimized mobile journey.',
    featuredInHome: true
  }
];

