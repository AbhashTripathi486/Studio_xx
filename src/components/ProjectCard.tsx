import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  aspectRatio?: '4/5' | '16/10' | 'square';
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  aspectRatio = '4/5',
  className = '',
}) => {
  const getAspectClass = () => {
    switch (aspectRatio) {
      case '16/10':
        return 'aspect-[16/10]';
      case 'square':
        return 'aspect-square';
      case '4/5':
      default:
        return 'aspect-[4/5]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`group cursor-pointer flex flex-col gap-4 ${className}`}
    >
      {/* Image Container with Border & Hover Scale */}
      <div
        className={`relative w-full ${getAspectClass()} overflow-hidden rounded-md bg-[var(--bg-surface-high)] border border-[var(--border-subtle)] group-hover:border-[var(--text-primary)] transition-colors shadow-sm`}
      >
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover Overlay Arrow Badge */}
        <div className="absolute top-4 right-4 bg-[var(--bg-surface-elevated)]/90 backdrop-blur-md text-[var(--text-primary)] p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 shadow-md">
          <ArrowUpRight className="w-4 h-4" />
        </div>

        {/* Bottom Tag Badge Overlay */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-[var(--bg-surface-elevated)]/90 backdrop-blur-md px-3 py-1 rounded text-xs uppercase font-semibold tracking-wider text-[var(--text-primary)] border border-[var(--border-color)]">
            {project.category}
          </span>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-col gap-1 items-start">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:underline underline-offset-4 decoration-1">
            {project.title}
          </h3>
          <span className="text-xs font-mono text-[var(--text-muted)]">{project.year}</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)] font-serif line-clamp-2">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};
