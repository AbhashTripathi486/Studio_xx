import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Layers, Briefcase } from 'lucide-react';
import { Project, Service } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  services: Service[];
  onSelectProject: (project: Project) => void;
  onSelectService: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  projects,
  services,
  onSelectProject,
  onSelectService,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search triggered from parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] shadow-2xl rounded-lg overflow-hidden z-10 flex flex-col"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
              <Search className="w-5 h-5 text-[var(--text-muted)] mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, services, tech stack..."
                className="w-full bg-transparent border-none text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-0 focus:outline-none text-lg font-sans"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Body */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
              {/* Projects */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  Projects ({filteredProjects.length})
                </p>
                {filteredProjects.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)] font-serif italic py-2">
                    No matching projects found.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {filteredProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProject(p);
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded hover:bg-[var(--bg-surface-high)] border border-transparent hover:border-[var(--border-subtle)] transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover rounded border border-[var(--border-color)]"
                          />
                          <div>
                            <p className="font-bold text-[var(--text-primary)] group-hover:underline">
                              {p.title}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] line-clamp-1 font-serif">
                              {p.description}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs uppercase font-mono px-2 py-1 rounded bg-[var(--bg-surface-highest)] text-[var(--text-primary)] flex items-center gap-1">
                          {p.category}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Services */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5" />
                  Capabilities & Services ({filteredServices.length})
                </p>
                {filteredServices.length === 0 ? (
                  <p className="text-sm text-[var(--text-muted)] font-serif italic py-2">
                    No matching services found.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {filteredServices.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          onSelectService();
                          onClose();
                        }}
                        className="w-full text-left p-3 rounded hover:bg-[var(--bg-surface-high)] border border-transparent hover:border-[var(--border-subtle)] transition-all flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-bold text-[var(--text-primary)] group-hover:underline flex items-center gap-2">
                            <span className="text-xs font-mono text-[var(--text-muted)]">
                              {s.number}
                            </span>
                            {s.title}
                          </p>
                          <p className="text-xs text-[var(--text-secondary)] line-clamp-1 font-serif">
                            {s.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:translate-x-1 group-hover:text-[var(--text-primary)] transition-all" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] flex justify-between items-center">
              <span>Press ESC to exit</span>
              <span>STUDIO_X Quick Index</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
