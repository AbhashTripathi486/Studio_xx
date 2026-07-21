import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';

export interface FAQItem {
  id: string;
  category: 'Process & Timeline' | 'Engagement & Pricing' | 'Technology & Stack' | 'Support & Handover';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Process & Timeline',
    question: 'How long does a typical website creation project take?',
    answer: 'Most bespoke agency website builds take between 4 to 8 weeks depending on scope, visual complexity, custom animations, and integrations. Express 2 to 3 week launch sprints are available for urgent brand debuts upon request.',
  },
  {
    id: 'faq-2',
    category: 'Process & Timeline',
    question: 'What does your design and development workflow look like?',
    answer: 'Our process follows four structured phases: 01 Discovery & Strategy, 02 Editorial UI/UX Architecture, 03 Custom Development & Motion Synthesis, and 04 QA, Optimization & Launch. You have direct access to preview environments at every milestone.',
  },
  {
    id: 'faq-3',
    category: 'Engagement & Pricing',
    question: 'How are your projects priced and structured?',
    answer: 'We operate on a transparent fixed-scope model or tailored monthly retainers. Projects typically start with a defined Discovery Phase. Detailed proposals with clear milestone deliverables ensure zero hidden fees or scope surprises.',
  },
  {
    id: 'faq-4',
    category: 'Engagement & Pricing',
    question: 'Do you offer ongoing retainer contracts after launch?',
    answer: 'Yes. We offer continuous growth & design system retainers covering routine feature enhancements, performance audits, design refreshes, and dedicated technical support.',
  },
  {
    id: 'faq-5',
    category: 'Technology & Stack',
    question: 'What tech stack do you build custom websites with?',
    answer: 'We construct high-performance web applications using React, TypeScript, Tailwind CSS, Framer Motion, and Node/Express or headless CMS backends. All builds are SEO-optimized, accessibility compliant, and tailored for ultra-fast load speeds.',
  },
  {
    id: 'faq-6',
    category: 'Technology & Stack',
    question: 'Will our team be able to manage and edit website content independently?',
    answer: 'Absolutely. We architect intuitive headless CMS integrations (Sanity, Contentful, or Strapi) and modular component libraries that allow your marketing team to launch new landing pages and update content effortlessly.',
  },
  {
    id: 'faq-7',
    category: 'Support & Handover',
    question: 'What is included in the project handover?',
    answer: 'Upon completion, you receive full intellectual property ownership, complete Git code repository access, Figma design system source files, video documentation, and 30 days of post-launch hypercare bug fixing.',
  },
  {
    id: 'faq-8',
    category: 'Support & Handover',
    question: 'How do we get started with a new website project?',
    answer: 'Initiate a discovery request through our contact form or launch a project inquiry chat with our AI assistant on site. We will organize an alignment call within 24 hours to review your requirements and outline a tailored roadmap.',
  },
];

interface FaqSectionProps {
  onNavigateToContact?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigateToContact }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Process & Timeline', 'Engagement & Pricing', 'Technology & Stack', 'Support & Handover'];

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="px-6 lg:px-12 max-w-7xl mx-auto py-20 space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--border-color)]"
      >
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#f27d26]">
            <HelpCircle className="w-4 h-4" />
            <span>Client Inquiries</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-sans text-[var(--text-primary)] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-serif leading-relaxed">
            Everything you need to know about our website creation agency workflow, tech stack, and engagement structure.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] pl-10 pr-4 py-3 rounded focus:outline-none focus:border-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]"
          />
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-wrap items-center gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] shadow-sm'
                : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--border-high)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Accordion List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="divide-y divide-[var(--border-color)] border-y border-[var(--border-color)]"
      >
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5 transition-colors group">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer py-1 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 md:gap-4 pr-4">
                    <span className="text-xs font-mono text-[var(--text-muted)] w-24 hidden md:inline-block uppercase tracking-wider shrink-0">
                      {faq.category}
                    </span>
                    <h3 className="text-base md:text-lg font-bold font-sans text-[var(--text-primary)] group-hover:text-[#f27d26] transition-colors leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full border border-[var(--border-color)] flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] border-[var(--text-primary)]'
                        : 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] group-hover:border-[var(--text-primary)]'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-2 md:pl-28 pr-12">
                        <p className="text-sm md:text-base text-[var(--text-secondary)] font-serif leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="py-12 text-center space-y-3">
            <p className="text-sm text-[var(--text-muted)] font-serif">
              No matching questions found for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold uppercase tracking-widest text-[#f27d26] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </motion.div>

      {/* Footer Contact CTA inside FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 md:p-8 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded-md flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[var(--text-primary)] font-sans">
              Have a custom project requirement?
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-serif mt-0.5">
              Get in touch with our studio team for a tailored project estimate and timeline.
            </p>
          </div>
        </div>

        {onNavigateToContact && (
          <button
            onClick={onNavigateToContact}
            className="w-full sm:w-auto shrink-0 bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] px-6 py-3 text-xs font-bold uppercase tracking-widest rounded hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Start Inquiry
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </motion.div>
    </section>
  );
};
