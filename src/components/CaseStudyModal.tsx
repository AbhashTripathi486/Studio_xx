import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Laptop, Tablet, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../types';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onInquireProject: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onInquireProject,
}) => {
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'overview' | 'prototype' | 'gallery'>('overview');

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="relative w-full max-w-5xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] shadow-2xl rounded-lg overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-[var(--border-color)] bg-[var(--bg-surface)] flex justify-between items-center sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] text-xs font-mono font-bold px-2.5 py-1 rounded">
                {project.category}
              </span>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">{project.title}</h2>
              <span className="text-xs text-[var(--text-muted)] font-serif hidden sm:inline">
                • {project.client} ({project.year})
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Tab Selector */}
              <div className="hidden sm:flex items-center gap-1 bg-[var(--bg-surface-high)] p-1 rounded text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('prototype')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'prototype'
                      ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Interactive Preview
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeTab === 'gallery'
                      ? 'bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Gallery
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)] rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 md:p-10 overflow-y-auto space-y-10">
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                {/* Hero Banner */}
                <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-md overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface-high)]">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 md:p-8">
                    <div>
                      <span className="text-white/80 text-xs font-mono uppercase tracking-widest block mb-1">
                        {project.location}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-extrabold text-white">
                        {project.tagline}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col gap-1"
                    >
                      <span className="text-3xl font-extrabold text-[var(--text-primary)] font-sans">
                        {m.value}
                      </span>
                      <span className="text-xs text-[var(--text-muted)] font-serif">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Narrative: Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[var(--border-color)]">
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mb-3">
                      The Challenge
                    </h4>
                    <p className="text-base text-[var(--text-secondary)] font-serif leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mb-3">
                      The Solution
                    </h4>
                    <p className="text-base text-[var(--text-secondary)] font-serif leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[var(--text-muted)] mb-3">
                    Technologies & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 2: Interactive Prototype Simulator */}
            {activeTab === 'prototype' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                {/* Device Frame Controls */}
                <div className="flex justify-between items-center bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-color)]">
                  <span className="text-xs font-semibold uppercase text-[var(--text-muted)]">
                    Viewport Emulator
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeviceFrame('desktop')}
                      className={`p-2 rounded flex items-center gap-1 text-xs font-medium ${
                        deviceFrame === 'desktop'
                          ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Laptop className="w-4 h-4" /> Desktop
                    </button>
                    <button
                      onClick={() => setDeviceFrame('tablet')}
                      className={`p-2 rounded flex items-center gap-1 text-xs font-medium ${
                        deviceFrame === 'tablet'
                          ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Tablet className="w-4 h-4" /> Tablet
                    </button>
                    <button
                      onClick={() => setDeviceFrame('mobile')}
                      className={`p-2 rounded flex items-center gap-1 text-xs font-medium ${
                        deviceFrame === 'mobile'
                          ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)]'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" /> Mobile
                    </button>
                  </div>
                </div>

                {/* Device Frame Display */}
                <div className="flex justify-center py-6 bg-[var(--bg-surface-high)] rounded border border-[var(--border-color)] overflow-x-auto">
                  <div
                    className={`transition-all duration-500 bg-black rounded-xl p-3 shadow-2xl ${
                      deviceFrame === 'desktop'
                        ? 'w-full max-w-3xl aspect-[16/10]'
                        : deviceFrame === 'tablet'
                        ? 'w-[480px] aspect-[4/5]'
                        : 'w-[280px] aspect-[9/19]'
                    }`}
                  >
                    {/* Simulated Browser Bar */}
                    <div className="flex items-center justify-between pb-2 px-2 text-gray-400 text-[10px] font-mono border-b border-gray-800 mb-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                      <span>https://studiox.design/preview/{project.id}</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>

                    {/* Scrollable Frame View */}
                    <div className="w-full h-[calc(100%-28px)] overflow-y-auto rounded bg-white dark:bg-zinc-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full object-cover"
                      />
                      <div className="p-6 text-zinc-800 dark:text-zinc-200 space-y-4">
                        <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
                          Live Interactive Experience
                        </span>
                        <h4 className="text-xl font-bold">{project.title} Prototype</h4>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-serif">
                          {project.fullDescription}
                        </p>
                        <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-xs">
                          <p className="font-bold mb-1">Key Performance Highlight:</p>
                          <p className="text-zinc-500 dark:text-zinc-400 font-serif">
                            60fps micro-interactions with WebGL shaders and real-time state sync.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Gallery */}
            {activeTab === 'gallery' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.galleryImages.map((img, index) => (
                  <div
                    key={index}
                    className="rounded-md overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface-high)] aspect-[4/3]"
                  >
                    <img
                      src={img}
                      alt={`${project.title} detail ${index + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-[var(--text-muted)] font-serif">
              Interested in a custom project built to these standards?
            </div>
            <button
              onClick={() => {
                onClose();
                onInquireProject(project.title);
              }}
              className="w-full sm:w-auto bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] px-6 py-3 font-bold text-xs uppercase tracking-widest rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Request Proposal for Similar Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
