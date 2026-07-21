import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, Layers, Sparkles, Compass, ArrowRight, CheckCircle2, X, Mail } from 'lucide-react';
import { Service, NavigationTab } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onNavigate: (tab: NavigationTab) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onNavigate,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className="w-10 h-10 text-[var(--text-primary)]" />;
      case 'Layers':
        return <Layers className="w-10 h-10 text-[var(--text-primary)]" />;
      case 'Sparkles':
        return <Sparkles className="w-10 h-10 text-[var(--text-primary)]" />;
      case 'Compass':
      default:
        return <Compass className="w-10 h-10 text-[var(--text-primary)]" />;
    }
  };

  return (
    <div className="space-y-24">
      {/* Hero Header */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4 block">
            Capabilities
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 font-sans">
            Defining the future of digital excellence.
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] font-serif leading-relaxed">
            We combine high-level architectural thinking with obsessive attention to detail to build brands and digital products that endure.
          </p>
        </motion.div>
      </section>

      {/* Services Cards Grid */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="service-card group bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--text-primary)] p-8 md:p-10 flex flex-col h-full min-h-[460px] rounded-md transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="mb-12 group-hover:scale-110 transition-transform duration-300 origin-left">
                {getIcon(service.icon)}
              </div>

              {/* Bottom Details */}
              <div className="mt-auto">
                <span className="text-xs font-mono font-bold text-[var(--text-muted)] mb-3 block">
                  {service.number}
                </span>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 font-sans">
                  {service.title}
                </h2>

                {/* Animated Line Draw Effect */}
                <div className="w-12 group-hover:w-full h-[2px] bg-[var(--text-primary)] mb-6 transition-all duration-500" />

                <p className="text-sm text-[var(--text-secondary)] font-serif mb-8 line-clamp-3">
                  {service.description}
                </p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-1 group-hover:gap-3 transition-all inline-flex items-center gap-1"
                >
                  Explore Service
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bento Grid: Integrated Approach & Ready to Start CTA */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 min-h-[520px]">
          {/* Integrated Approach Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8 bg-black relative overflow-hidden rounded-md group"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIhjELlQDrRShBdw0utk_U6qh309F8bmMXRuxFQdy70L4ZWEkV2ALB4EGkd9Jf7J6llnJCs0gZGvQVJmr214v1Tx_x_nl92DQPsF0YKe7tGlSyeoZWdnyK9x5N6_21ccJOLiTw3ch5C_0BsTWdxCF9AjNfKjc8BrWWPcwHNf9carUROysh1jR0Z93OK9y17UmwSZdWzfHbaCxabHCIiOdjHuHb8JZ1lNspygA4IuedyOwyU0M-_LH2"
                alt="Integrated Approach Architecture Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60 grayscale transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent">
              <span className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-2">
                STUDIO_X PHILOSOPHY
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Integrated Approach
              </h3>
              <p className="text-gray-300 max-w-lg text-base md:text-lg font-serif">
                We don't just design; we architect digital ecosystems where brand and technology work in perfect unison.
              </p>
            </div>
          </motion.div>

          {/* CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] p-8 md:p-12 flex flex-col justify-between rounded-md shadow-sm"
          >
            <div>
              <Mail className="w-10 h-10 text-[var(--text-primary)] mb-6" />
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                Ready to start?
              </h3>
              <p className="text-sm text-[var(--text-secondary)] font-serif mb-8">
                Our team is currently accepting select new projects for 2026.
              </p>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] py-4 px-6 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity inline-flex items-center justify-between group rounded"
            >
              Let's Talk
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] p-8 md:p-10 rounded-lg shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-8"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2 py-1 bg-[var(--bg-surface-high)] rounded">
                    {selectedService.number}
                  </span>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">
                    {selectedService.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-base text-[var(--text-secondary)] font-serif leading-relaxed">
                {selectedService.description}
              </p>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-[var(--text-muted)] mb-4">
                  Key Capabilities
                </h4>
                <div className="space-y-3">
                  {selectedService.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-[var(--text-primary)]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold tracking-widest text-[var(--text-muted)] mb-3">
                  Primary Deliverables
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedService.deliverables.map((deliv, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[var(--bg-surface-high)] text-xs font-mono rounded border border-[var(--border-subtle)] text-[var(--text-primary)]"
                    >
                      {deliv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-color)] flex justify-end gap-3">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 text-xs uppercase tracking-widest font-semibold border border-[var(--border-color)] text-[var(--text-primary)] rounded hover:bg-[var(--bg-surface-high)]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    onNavigate('contact');
                  }}
                  className="px-6 py-2.5 text-xs uppercase tracking-widest font-bold bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] rounded hover:opacity-90"
                >
                  Inquire This Service
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
