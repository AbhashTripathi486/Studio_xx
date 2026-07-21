import React from 'react';
import { ArrowUp, Globe, Mail } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="flex flex-col items-start gap-12 px-6 lg:px-12 py-16 w-full max-w-7xl mx-auto">
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Brand & Mission */}
          <div className="flex flex-col gap-4 max-w-sm">
            <span className="font-black text-3xl tracking-tighter text-[var(--text-primary)] font-sans">
              STUDIO_X
            </span>
            <p className="text-sm text-[var(--text-secondary)] font-serif leading-relaxed">
              Excellence by design. We craft high-performance digital experiences that redefine markets and elevate brand standards.
            </p>
          </div>

          {/* Navigation & Links */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            {/* Sitemap */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                Navigation
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="text-left text-xs uppercase font-medium tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Overview
              </button>
              <button
                onClick={() => onNavigate('work')}
                className="text-left text-xs uppercase font-medium tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Selected Works
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left text-xs uppercase font-medium tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Capabilities
              </button>
              <button
                onClick={() => onNavigate('process')}
                className="text-left text-xs uppercase font-medium tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Process
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left text-xs uppercase font-medium tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                Inquiries
              </button>
            </div>

            {/* Social Network */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                Network
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors"
              >
                Dribbble
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors"
              >
                GitHub Architecture
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back-to-top */}
        <div className="w-full pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <p>© 2026 STUDIO_X. EXCELLENCE BY DESIGN. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] hover:bg-[var(--bg-surface-highest)] text-[var(--text-primary)] transition-all flex items-center gap-1 font-semibold"
              title="Back to top"
            >
              Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
