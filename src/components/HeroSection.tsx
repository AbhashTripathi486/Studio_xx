import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award, Globe, ShieldCheck } from 'lucide-react';
import { NavigationTab } from '../types';

// @ts-ignore
import videoUrl from '@/assets/Animate_image_loop_fixed_camera_202607112258.mp4';

interface HeroSectionProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'International Design Awards', value: '14+', icon: Award },
    { label: 'Client Satisfaction Rating', value: '100%', icon: ShieldCheck },
    { label: 'Global Brands Built', value: '45+', icon: Globe },
    { label: 'Average Performance Score', value: '99/100', icon: Sparkles },
  ];

  return (
    <section className="relative min-h-[85vh] w-full flex flex-col justify-center py-16 overflow-hidden border-b border-[var(--border-color)]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 dark:opacity-35 transition-opacity duration-700"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Soft elegant gradient overlays to blend the video into the luxury theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-surface)]/60 to-[var(--bg-surface)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,var(--bg-surface)_90%)] opacity-85" />
      </div>

      {/* Background Subtle Geometric Grid Lines on top of video */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 z-5">
        <div className="w-full h-full grid grid-cols-4 md:grid-cols-12 gap-4 px-6 lg:px-12 max-w-7xl mx-auto">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-[var(--border-color)] h-full" />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="max-w-5xl">
        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--text-primary)] leading-[1.05] mb-8 font-sans"
        >
          WE CREATE <br className="hidden md:block" />
          <span className="serif italic font-normal text-[#f27d26]">WEBSITES.</span>
        </motion.h1>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 sm:items-center mb-16"
        >
          <button
            onClick={() => onNavigate('work')}
            className="group bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] px-8 py-4 font-semibold uppercase tracking-widest text-xs rounded hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            Explore Selected Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('services')}
            className="bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] px-8 py-4 font-semibold uppercase tracking-widest text-xs rounded hover:bg-[var(--bg-surface-high)] transition-all flex items-center justify-center"
          >
            View Our Capabilities
          </button>
        </motion.div>

        {/* Live Metrics Ticker Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[var(--border-color)]"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[var(--text-muted)]" />
                  <span className="text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)] font-sans">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs text-[var(--text-muted)] font-serif">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  </section>
  );
};
