import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Grid, Layers, Sparkles, Mail, ArrowUpRight, Compass, Sun, Moon } from 'lucide-react';
import { NavigationTab, ThemeMode } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
}) => {
  const navLinks = [
    { id: 'home' as NavigationTab, label: 'Overview', icon: Compass, count: '00' },
    { id: 'work' as NavigationTab, label: 'Selected Works', icon: Grid, count: '08' },
    { id: 'services' as NavigationTab, label: 'Capabilities', icon: Layers, count: '04' },
    { id: 'process' as NavigationTab, label: 'Our Process', icon: Sparkles, count: '04' },
    { id: 'contact' as NavigationTab, label: 'Start Inquiry', icon: Mail, count: '01' },
  ];

  const handleSelect = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-md bg-[var(--bg-surface-elevated)] border-r border-[var(--border-color)] shadow-2xl flex flex-col p-8 md:p-12 justify-between overflow-y-auto"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-extrabold tracking-tighter text-[var(--text-primary)]">
                  STUDIO_X
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-[var(--text-primary)] hover:rotate-90 transition-transform duration-300 rounded border border-[var(--border-color)]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-6">
                <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-semibold mb-2">
                  Navigation Directory
                </p>

                {navLinks.map((link, idx) => {
                  const isActive = activeTab === link.id;
                  const IconComponent = link.icon;

                  return (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      onClick={() => handleSelect(link.id)}
                      className={`group flex items-center justify-between text-left p-3 rounded transition-all duration-200 ${
                        isActive
                          ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] font-bold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <IconComponent className="w-5 h-5" />
                        <span className="text-lg uppercase tracking-wider font-semibold">
                          {link.label}
                        </span>
                      </div>
                      <span className="text-xs font-mono opacity-60 group-hover:translate-x-1 transition-transform">
                        {link.count}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Footer / Social & Theme */}
            <div className="pt-8 border-t border-[var(--border-color)] mt-8 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                  Appearance
                </span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold px-3 py-1.5 rounded border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)]"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4" /> Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4" /> Light Mode
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center text-xs text-[var(--text-muted)] pt-2">
                <span>© 2026 STUDIO_X</span>
                <a
                  href="mailto:inquiries@studiox.design"
                  className="hover:text-[var(--text-primary)] underline flex items-center gap-1"
                >
                  inquiries@studiox.design
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
