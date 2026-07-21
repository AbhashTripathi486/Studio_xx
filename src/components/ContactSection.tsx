import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { InquiryFormData } from '../types';

interface ContactSectionProps {
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledService }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    service: prefilledService || 'UI/UX Design',
    budget: '$25k - $50k',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
  }, [prefilledService]);

  const serviceOptions = [
    'UI/UX Design',
    'Full-stack Development',
    'Brand Strategy',
    'Creative Direction & Motion',
    'Full Digital Transformation',
  ];

  const budgetOptions = ['$15k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section className="px-6 lg:px-12 max-w-7xl mx-auto py-12 space-y-20">
      {/* Hero Header & Form Section */}
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Text Column */}
        <div className="w-full lg:w-1/2 space-y-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)] block">
            Start Collaboration
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-[1.1] font-sans">
            Let's build <br /> something <br />
            <span className="italic font-serif font-normal">extraordinary.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-serif max-w-md leading-relaxed">
            We partner with ambitious brands to create digital experiences that transcend the ordinary. Reach out to start our collaboration.
          </p>

          {/* Contact Direct Info */}
          <div className="pt-8 border-t border-[var(--border-color)] space-y-4">
            <div className="flex items-center gap-3 text-sm text-[var(--text-primary)] font-serif">
              <Mail className="w-4 h-4 text-[var(--text-muted)]" />
              <a href="mailto:inquiries@studiox.design" className="hover:underline">
                inquiries@studiox.design
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-primary)] font-serif">
              <MapPin className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Design Quarter, Suite 402, New York, NY 10013</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-primary)] font-serif">
              <Clock className="w-4 h-4 text-[var(--text-muted)]" />
              <span>Response SLA: Within 24 Hours</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="w-full lg:w-1/2">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 bg-[var(--bg-surface-elevated)] p-8 md:p-12 border border-[var(--border-color)] shadow-lg rounded-none"
              >
                {/* Full Name */}
                <div className="group">
                  <label className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)] block mb-2 group-focus-within:text-[var(--text-primary)]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-transparent border-0 border-b-2 border-[var(--border-color)] focus:border-[var(--text-primary)] focus:ring-0 py-3 font-serif text-lg text-[var(--text-primary)] placeholder-[var(--text-muted)]/40 transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="group">
                  <label className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)] block mb-2 group-focus-within:text-[var(--text-primary)]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. hello@yourbrand.com"
                    className="w-full bg-transparent border-0 border-b-2 border-[var(--border-color)] focus:border-[var(--text-primary)] focus:ring-0 py-3 font-serif text-lg text-[var(--text-primary)] placeholder-[var(--text-muted)]/40 transition-colors"
                  />
                </div>

                {/* Service Interest Pills */}
                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)] block mb-3">
                    Service Interested
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((srv) => (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => setFormData({ ...formData, service: srv })}
                        className={`px-3 py-1.5 text-xs font-semibold rounded border transition-all ${
                          formData.service === srv
                            ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] border-transparent'
                            : 'bg-[var(--bg-surface-high)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-color)]'
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Range Pills */}
                <div>
                  <label className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)] block mb-3">
                    Anticipated Budget Range
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((bgt) => (
                      <button
                        type="button"
                        key={bgt}
                        onClick={() => setFormData({ ...formData, budget: bgt })}
                        className={`py-2 px-2 text-center text-xs font-mono font-semibold rounded border transition-all ${
                          formData.budget === bgt
                            ? 'bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] border-transparent'
                            : 'bg-[var(--bg-surface-high)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:border-[var(--border-color)]'
                        }`}
                      >
                        {bgt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="text-xs uppercase font-bold tracking-widest text-[var(--text-secondary)] block mb-2 group-focus-within:text-[var(--text-primary)]">
                    Project Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project aspirations, timelines, and key objectives..."
                    className="w-full bg-transparent border-0 border-b-2 border-[var(--border-color)] focus:border-[var(--text-primary)] focus:ring-0 py-3 font-serif text-lg text-[var(--text-primary)] placeholder-[var(--text-muted)]/40 resize-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] font-bold py-5 px-10 hover:opacity-90 transition-all uppercase tracking-widest text-xs rounded-none w-full flex items-center justify-center gap-3 shadow-md"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Encrypting & Transmitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Inquiry
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </motion.form>
            ) : (
              /* Success Confirmation Box */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[var(--bg-surface-elevated)] border border-emerald-500/40 p-8 md:p-12 text-center space-y-6 rounded-none shadow-xl"
              >
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-[var(--text-primary)] font-sans">
                  Inquiry Transmitted Successfully
                </h3>
                <p className="text-sm text-[var(--text-secondary)] font-serif max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold">{formData.fullName}</span>. Our partners have received your inquiry regarding <span className="font-bold">{formData.service}</span>. We will review your brief and follow up within 24 hours.
                </p>

                <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded text-xs text-[var(--text-muted)] font-mono text-left max-w-sm mx-auto space-y-1">
                  <p>Confirmation Ref: #STX-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p>Client Email: {formData.email}</p>
                  <p>Selected Service: {formData.service}</p>
                  <p>Budget Tier: {formData.budget}</p>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[var(--text-primary)] text-[var(--bg-surface-elevated)] font-bold py-3 px-8 text-xs uppercase tracking-widest rounded hover:opacity-90"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Visual Anchor Studio Photo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full aspect-[21/9] bg-[var(--bg-surface-high)] overflow-hidden rounded-md group border border-[var(--border-subtle)]"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJzYsN4_CLpRvYEGFnSt-teaTlWbEDBUg9k0b56xqqT--ROKlH85wIf9_D0GSzNMKGwMAKqhPE5C2qJivLFwl63-TJAjyvpsvy64Fo5MGHHAD-pHNYZGchRzkgQSwk38BmXd8kzmlE0V7yY62Rkz6x136OhUW8zqGX7zInOQjUqMhA6YHQDHprZergy6IqvDRU6RLvrtAlrg3Mk7A4BpfI2CCRqdk-s-HVRI0kXmeZ28uJC42eoOFJ"
          alt="STUDIO_X Headquarters Studio Space"
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        <div className="absolute bottom-8 left-8 bg-[var(--bg-surface-elevated)] p-6 shadow-xl border border-[var(--border-color)] hidden md:block rounded">
          <p className="text-xs uppercase font-bold tracking-widest mb-1 text-[var(--text-primary)]">
            NYC Flagship Atelier
          </p>
          <p className="text-xs text-[var(--text-secondary)] font-serif">
            Design Quarter, Suite 402<br />Creative District, NY 10013
          </p>
        </div>
      </motion.div>
    </section>
  );
};
