import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react';
import { PROCESS_STEPS } from '../data/process';
import { NavigationTab } from '../types';

interface ProcessSectionProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section className="px-6 lg:px-12 max-w-7xl mx-auto py-12 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4 block">
          Methodology
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 font-sans">
          Rigorous execution. <br /> Zero compromise.
        </h1>
        <p className="text-lg text-[var(--text-secondary)] font-serif leading-relaxed">
          How we transform vision into market-defining digital products through four transparent, disciplined phases.
        </p>
      </motion.div>

      {/* Step Selector Timeline Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-b border-[var(--border-color)] pb-6">
        {PROCESS_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          return (
            <button
              key={step.number}
              onClick={() => setActiveStepIndex(idx)}
              className={`text-left p-4 rounded-md transition-all border ${
                isActive
                  ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] border-transparent shadow-md'
                  : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-color)]'
              }`}
            >
              <span className="text-xs font-mono font-bold block mb-1 opacity-70">
                PHASE {step.number}
              </span>
              <p className="font-bold text-sm md:text-base font-sans line-clamp-1">
                {step.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Step Highlight Card */}
      <motion.div
        key={activeStep.number}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] p-8 md:p-12 rounded-lg shadow-sm"
      >
        <div className="lg:col-span-5 space-y-6">
          <span className="text-5xl font-black font-mono text-[var(--text-primary)] opacity-30">
            {activeStep.number}
          </span>
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] font-sans">
            {activeStep.title}
          </h2>
          <p className="text-base text-[var(--text-secondary)] font-serif italic">
            "{activeStep.subtitle}"
          </p>
          <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
            {activeStep.description}
          </p>
        </div>

        <div className="lg:col-span-7 bg-[var(--bg-surface)] p-6 md:p-8 rounded-md border border-[var(--border-subtle)] space-y-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Phase Deliverables & Milestones
          </h4>
          <div className="space-y-4">
            {activeStep.highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-3 text-sm font-sans text-[var(--text-primary)]">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Process Guarantees Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--border-color)]"
      >
        <div className="p-6 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded space-y-2">
          <ShieldCheck className="w-6 h-6 text-[var(--text-primary)] mb-2" />
          <h4 className="font-bold text-sm text-[var(--text-primary)]">Fixed Timeline & Scope</h4>
          <p className="text-xs text-[var(--text-secondary)] font-serif">
            No scope creep or surprise delays. Every sprint is milestone-driven.
          </p>
        </div>
        <div className="p-6 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded space-y-2">
          <Zap className="w-6 h-6 text-[var(--text-primary)] mb-2" />
          <h4 className="font-bold text-sm text-[var(--text-primary)]">Lighthouse 100 Guarantee</h4>
          <p className="text-xs text-[var(--text-secondary)] font-serif">
            We optimize all assets and code for top speed, accessibility, and SEO.
          </p>
        </div>
        <div className="p-6 bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] rounded space-y-2">
          <Layers className="w-6 h-6 text-[var(--text-primary)] mb-2" />
          <h4 className="font-bold text-sm text-[var(--text-primary)]">Clean Source Code</h4>
          <p className="text-xs text-[var(--text-secondary)] font-serif">
            Full repository ownership with structured TypeScript and Figma tokens.
          </p>
        </div>
      </motion.div>

      {/* CTA Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row justify-between items-center p-8 bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] rounded-md gap-6 shadow-xl"
      >
        <div>
          <h3 className="text-xl font-bold font-sans">Ready to initiate Phase 01 Discovery?</h3>
          <p className="text-xs text-[var(--bg-surface-high)] font-serif mt-1">
            Book a 30-minute discovery consultation with our founding partners.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] px-6 py-3 font-bold text-xs uppercase tracking-widest rounded hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0"
        >
          Book Consultation
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  );
};
