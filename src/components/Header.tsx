import React, { useState, useEffect } from 'react';
import { Menu, Search, Sun, Moon, Sparkles } from 'lucide-react';
import { NavigationTab, ThemeMode } from '../types';
import { motion } from 'motion/react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  onOpenDrawer,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: NavigationTab; label: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'h-16 bg-[var(--bg-surface)]/90 backdrop-blur-md shadow-sm border-[var(--border-color)]'
          : 'h-20 bg-[var(--bg-surface)] border-[var(--border-subtle)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex justify-between items-center">
        {/* Left: Menu Toggle & Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenDrawer}
            className="p-2 -ml-2 text-[var(--text-primary)] hover:opacity-70 transition-opacity focus:outline-none"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className="text-left group flex items-center gap-2 focus:outline-none"
          >
            <span className="font-bold text-2xl tracking-tighter text-[var(--text-primary)] group-hover:opacity-80 transition-opacity">
              STUDIO_X
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border border-[var(--border-color)] text-[var(--text-muted)]">
              v2.4
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1 text-sm uppercase tracking-widest font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--text-primary)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Search & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Quick Search trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs uppercase tracking-wider font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface-high)] hover:bg-[var(--bg-surface-highest)] rounded border border-[var(--border-subtle)] transition-all"
            title="Search projects & services (Cmd+K)"
          >
            <Search className="w-4 h-4 text-[var(--text-primary)]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block text-[9px] px-1 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] rounded text-[var(--text-muted)]">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded.5 border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-high)] transition-all shadow-xs"
            aria-label="Toggle Dark/Light Mode"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-900" />
              ) : (
                <Sun className="w-5 h-5 text-amber-300" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
