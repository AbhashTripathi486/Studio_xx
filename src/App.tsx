import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { SearchModal } from './components/SearchModal';
import { HeroSection } from './components/HeroSection';
import { ProjectCard } from './components/ProjectCard';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveCanvas } from './components/InteractiveCanvas';
import { AIChatBot } from './components/AIChatBot';
import { FaqSection } from './components/FaqSection';
import { PROJECTS } from './data/projects';
import { SERVICES } from './data/services';
import { NavigationTab, ThemeMode, Project } from './types';
import { ArrowRight, Filter, Sparkles } from 'lucide-react';

// Custom Framer Motion Page Transition Variants for seamless slide-up effect between sections
const pageVariants = {
  initial: {
    opacity: 0,
    y: 36,
    scale: 0.985,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -32,
    scale: 0.985,
    filter: 'blur(4px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [workCategory, setWorkCategory] = useState<string>('All');
  const [prefilledContactService, setPrefilledContactService] = useState<string>('');

  // Scroll Progress Bar using Framer Motion
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Apply dark mode class to html document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const categories = ['All', 'Healthcare', 'E-commerce', 'Interior Design'];

  const filteredWorkProjects =
    workCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === workCategory);

  const handleInquireProject = (projectTitle: string) => {
    setPrefilledContactService(`Custom Build: ${projectTitle}`);
    setActiveTab('contact');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-500 font-serif relative flex flex-col selection:bg-[var(--text-primary)] selection:text-[var(--bg-surface-elevated)]">
      {/* Top Scroll Position Progress Bar */}
      <motion.div
        id="scroll-progress-bar"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-[#f27d26] origin-left z-[100] pointer-events-none shadow-[0_0_10px_rgba(242,125,38,0.8)]"
      />

      {/* Background Interactive Canvas Grid */}
      <InteractiveCanvas theme={theme} />

      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Slide-out Navigation Drawer */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={PROJECTS}
        services={SERVICES}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onSelectService={() => setActiveTab('services')}
      />

      {/* Main View Area with AnimatePresence Page Switch */}
      <main className="flex-grow relative z-10 pt-20">
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW / HOME */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-24"
            >
              {/* Hero Banner */}
              <HeroSection onNavigate={(tab) => setActiveTab(tab)} />

              {/* Bento Grid Featured Works (from HTML replica prompt) */}
              <section className="px-6 lg:px-12 max-w-7xl mx-auto py-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4"
                >
                  <div className="max-w-xl">
                    <span className="text-xs uppercase font-semibold tracking-widest text-[var(--text-muted)] mb-3 block">
                      Selected Works 2026
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold font-sans text-[var(--text-primary)]">
                      Curated cases that push technical and aesthetic boundaries.
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('work')}
                    className="text-xs uppercase font-bold tracking-widest text-[var(--text-primary)] underline underline-offset-8 hover:opacity-70 transition-opacity pb-2 flex items-center gap-1 cursor-pointer"
                  >
                    See all 4 projects
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Bento Card 1: SmyleXL (Span 8) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() =>
                      setSelectedProject(PROJECTS.find((p) => p.id === 'smylexl') || PROJECTS[0])
                    }
                    className="md:col-span-8 group cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] group-hover:border-[var(--text-primary)] transition-colors shadow-sm">
                      <img
                        src={PROJECTS[0].image}
                        alt="SmyleXL"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                        <span className="text-white/70 text-xs uppercase font-mono tracking-wider mb-2">
                          Healthcare / Dental Network
                        </span>
                        <h3 className="text-white text-2xl md:text-3xl font-extrabold font-sans">
                          SMYLEXL
                        </h3>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bento Card 2: Unique Wholefood (Span 4) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() =>
                      setSelectedProject(PROJECTS.find((p) => p.id === 'unique-wholefood') || PROJECTS[1])
                    }
                    className="md:col-span-4 group cursor-pointer"
                  >
                    <div className="relative aspect-[16/14] md:aspect-[4/5] overflow-hidden rounded-md bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] group-hover:border-[var(--text-primary)] transition-colors shadow-sm">
                      <img
                        src={PROJECTS[1].image}
                        alt="Unique Wholefood"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                        <span className="text-white/70 text-xs uppercase font-mono tracking-wider mb-2">
                          E-commerce / Retail
                        </span>
                        <h3 className="text-white text-2xl font-extrabold font-sans">
                          UNIQUE WHOLEFOOD
                        </h3>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bento Card 3: Creative Property Stylist (Span 4) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() =>
                      setSelectedProject(PROJECTS.find((p) => p.id === 'creative-property-stylist') || PROJECTS[2])
                    }
                    className="md:col-span-4 group cursor-pointer"
                  >
                    <div className="relative aspect-[16/14] md:aspect-[4/5] overflow-hidden rounded-md bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] group-hover:border-[var(--text-primary)] transition-colors shadow-sm">
                      <img
                        src={PROJECTS[2].image}
                        alt="Creative Property Stylist"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                        <span className="text-white/70 text-xs uppercase font-mono tracking-wider mb-2">
                          Interior Design / Property Styling
                        </span>
                        <h3 className="text-white text-2xl font-extrabold font-sans">
                          CREATIVE PROPERTY STYLIST
                        </h3>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bento Card 4: Holy Dental Care (Span 8) */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() =>
                      setSelectedProject(PROJECTS.find((p) => p.id === 'holy-dental-care') || PROJECTS[3])
                    }
                    className="md:col-span-8 group cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] group-hover:border-[var(--text-primary)] transition-colors shadow-sm">
                      <img
                        src={PROJECTS[3].image}
                        alt="Holy Dental Care"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                        <span className="text-white/70 text-xs uppercase font-mono tracking-wider mb-2">
                          Healthcare / Dental Clinic
                        </span>
                        <h3 className="text-white text-2xl md:text-3xl font-extrabold font-sans">
                          HOLY DENTAL CARE
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Core Philosophy Section */}
              <section className="py-20 bg-[var(--bg-surface-elevated)] border-y border-[var(--border-color)] overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center"
                >
                  <div className="w-full md:w-1/2 space-y-6">
                    <span className="text-xs uppercase font-semibold tracking-widest text-[var(--text-muted)] block">
                      Our Approach
                    </span>
                    <h3 className="text-3xl md:text-5xl font-extrabold font-sans text-[var(--text-primary)] leading-tight">
                      Elegance is the elimination of the non-essential.
                    </h3>
                    <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-serif">
                      We don't just build websites; we design digital ecosystems that communicate authority. Every pixel is placed with intentionality, every animation serves a narrative purpose, and every line of code is optimized for peak performance.
                    </p>
                  </div>

                  <div className="w-full md:w-1/2 grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <span className="text-3xl font-extrabold text-[var(--text-primary)] font-sans">01</span>
                      <p className="text-xs uppercase font-bold tracking-widest text-[var(--text-primary)]">
                        Strategy First
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] font-serif">
                        Defining core value proposition before pixels are placed.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-3xl font-extrabold text-[var(--text-primary)] font-sans">02</span>
                      <p className="text-xs uppercase font-bold tracking-widest text-[var(--text-primary)]">
                        Design-Led
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] font-serif">
                        Editorial aesthetics meeting rigorous UX principles.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-3xl font-extrabold text-[var(--text-primary)] font-sans">03</span>
                      <p className="text-xs uppercase font-bold tracking-widest text-[var(--text-primary)]">
                        Technical Edge
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] font-serif">
                        Modern stacks delivering lightning-fast, secure builds.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-3xl font-extrabold text-[var(--text-primary)] font-sans">04</span>
                      <p className="text-xs uppercase font-bold tracking-widest text-[var(--text-primary)]">
                        Evolve Always
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] font-serif">
                        Long-term partnerships ensuring continuous leadership.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </section>

              {/* FAQ Accordion Section */}
              <FaqSection onNavigateToContact={() => setActiveTab('contact')} />

              {/* Ready to Elevate CTA Banner */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="px-6 lg:px-12 max-w-7xl mx-auto py-16 text-center space-y-8"
              >
                <h2 className="text-3xl md:text-6xl font-extrabold font-sans text-[var(--text-primary)] max-w-4xl mx-auto">
                  Ready to elevate your digital presence?
                </h2>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] px-10 py-5 text-xs font-bold uppercase tracking-widest rounded hover:opacity-90 transition-opacity inline-flex items-center gap-2 cursor-pointer"
                >
                  Let's Build Together
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.section>
            </motion.div>
          )}

          {/* TAB 2: SELECTED WORKS / PORTFOLIO SHOWCASE */}
          {activeTab === 'work' && (
            <motion.div
              key="work"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="px-6 lg:px-12 max-w-7xl mx-auto py-12 space-y-16"
            >
              {/* Header */}
              <div className="space-y-6">
                <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] font-sans tracking-tight">
                  SELECTED <br /> WORKS
                </h1>
                <p className="text-lg md:text-xl text-[var(--text-secondary)] font-serif max-w-2xl leading-relaxed">
                  A curated showcase of our recent digital transformations, where strategy meets uncompromising aesthetics to build high-performance brand ecosystems.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[var(--border-color)] no-scrollbar">
                <Filter className="w-4 h-4 text-[var(--text-muted)] mr-2 shrink-0" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setWorkCategory(cat)}
                    className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-all shrink-0 ${
                      workCategory === cat
                        ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] shadow-xs'
                        : 'bg-[var(--bg-surface-high)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid (Staggered 2-Column layout matching the prompt replica) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-y-24 gap-x-12">
                {filteredWorkProjects.map((project, idx) => {
                  const isOffset = idx % 2 === 1;
                  return (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                      className={isOffset ? 'md:mt-24' : ''}
                    />
                  );
                })}
              </div>

              {/* Bottom Inquire Banner */}
              <div className="p-8 md:p-12 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded text-center space-y-4">
                <p className="text-xs uppercase font-bold tracking-widest text-[var(--text-muted)]">
                  Have a vision in mind?
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold font-sans text-[var(--text-primary)]">
                  We customize solutions for unique luxury and enterprise requirements.
                </h3>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] px-8 py-4 font-bold text-xs uppercase tracking-widest rounded hover:opacity-90 inline-flex items-center gap-2 mt-2"
                >
                  Start Project Brief
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SERVICES / CAPABILITIES */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-6"
            >
              <ServicesSection
                services={SERVICES}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            </motion.div>
          )}

          {/* TAB 4: PROCESS */}
          {activeTab === 'process' && (
            <motion.div
              key="process"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-6"
            >
              <ProcessSection onNavigate={(tab) => setActiveTab(tab)} />
            </motion.div>
          )}

          {/* TAB 5: CONTACT */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="py-6"
            >
              <ContactSection prefilledService={prefilledContactService} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireProject={handleInquireProject}
      />

      {/* Global AI Chatbot Widget */}
      <AIChatBot onNavigateToContact={() => setActiveTab('contact')} />

      {/* Global Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}
