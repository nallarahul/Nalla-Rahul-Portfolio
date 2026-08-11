import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { submitContactForm } from '../utils/contactHandler';
import BlurReveal from '../components/ui/BlurReveal';
import ClipReveal from '../components/ui/ClipReveal';
import MagneticButton from '../components/ui/MagneticButton';
import { staggerContainer, staggerItem } from '../motion/variants';
import { useReducedMotion } from '../hooks/useReducedMotion';

function AnimatedInput({ label, id, name, type = 'text', required, value, onChange, placeholder, className = '' }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-steel-300 mb-2">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type} id={id} name={name} required={required} value={value} onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-3 bg-bg-surface border text-steel-100 font-body text-sm placeholder-steel-600 focus:outline-none transition-all duration-200 ${className} ${focused ? 'border-amber-500' : 'border-bg-border/80'}`}
        />
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-amber-500"
          initial={{ width: '0%' }}
          animate={{ width: focused ? '100%' : '0%' }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const prefersReduced = useReducedMotion();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus('submitting'); setErrorMessage('');
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error'); setErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <section id="contact" className="py-20 relative border-b border-bg-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ClipReveal className="flex items-center gap-3 font-mono text-xs text-amber-500 mb-8">
          <span className="w-8 h-[1px] bg-amber-500/50" /><span>04. INITIATE CONTACT</span>
        </ClipReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <BlurReveal as="h2" delay={0.05} className="font-heading text-3xl sm:text-4xl font-bold text-steel-100 tracking-tight mb-4">
              Let's Build Something Resilient
            </BlurReveal>
            <BlurReveal delay={0.15} className="text-base text-steel-400 font-body leading-relaxed mb-8">
              Available for software engineering roles, project architecture discussions, or technical collaboration.
            </BlurReveal>

            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer(0.1, 0.2)}
              className="space-y-4 font-mono text-xs"
            >
              {[
                { href: `mailto:${portfolioData.personal.email}`, label: 'DIRECT EMAIL', value: portfolioData.personal.email, Icon: Mail },
                { href: portfolioData.personal.github, label: 'GITHUB', value: 'github.com/nallarahul', Icon: Github },
                { href: portfolioData.personal.linkedin, label: 'LINKEDIN', value: 'linkedin.com/in/rahul-nalla', Icon: Linkedin },
              ].map(({ href, label, value, Icon }) => (
                <motion.a
                  key={label}
                  variants={staggerItem}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-bg-surface border border-bg-border/80 hover:border-amber-500/40 text-steel-100 transition-colors group"
                >
                  <div className="p-2.5 rounded bg-bg-dark border border-bg-border text-amber-500 group-hover:scale-105 transition-transform"><Icon className="w-4 h-4" /></div>
                  <div className="flex-1">
                    <span className="text-steel-400 block text-[10px]">{label}</span>
                    <span className="font-semibold group-hover:text-amber-500 transition-colors">{value}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-steel-400 group-hover:text-amber-500 transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-bg-card border border-bg-border/90 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatedInput label="Your Name" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Alex Mercer" />
                <AnimatedInput label="Email Address" id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="alex@company.dev" />
              </div>
              <AnimatedInput label="Subject / Topic" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g. Software Engineering Opportunity" />
              <div>
                <label htmlFor="message" className="block font-mono text-xs text-steel-300 mb-2">Message Details <span className="text-amber-500">*</span></label>
                <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} placeholder="Write your message details..."
                  className="w-full px-4 py-3 bg-bg-surface border border-bg-border/80 text-steel-100 font-body text-sm placeholder-steel-600 focus:border-amber-500 focus:outline-none transition-colors resize-none" />
              </div>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" /><span>Thank you! Your message has been recorded.</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{errorMessage}</span>
                </motion.div>
              )}

              {/* Clean Send Message Button */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 px-8 rounded-lg bg-amber-500 hover:bg-amber-600 text-bg-dark font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'submitting' ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-bg-dark border-t-transparent animate-spin" />
                    <span>Dispatching Payload...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
