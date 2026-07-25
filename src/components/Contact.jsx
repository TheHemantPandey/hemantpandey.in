import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Mail, Loader2, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { personalInfo } from '../personalData';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const isInternalLink = (url) => url && url.startsWith('/');

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      // 🚀 CRITICAL INITIALIZATION: Safely bind your public key onto the browser runtime thread
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          // 📦 REDUNDANT KEY MAPPING:
          // Supplies BOTH custom keys and default EmailJS dashboard parameter targets 
          // so your HTML layout compiles successfully without throwing a 400 Bad Request.
          from_name: formData.name,
          name: formData.name,
          
          reply_to: formData.email,
          email: formData.email,
          
          phone: formData.phone || 'Not provided',
          time: new Date().toLocaleString(),
          
          message: `Phone Number: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message}`,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus('idle');
      setFormData({ name: '', email: '', phone: '', message: '' });
      toast.success("Message sent successfully! I'll get back to you soon.");
    } catch (error) {
      console.error('Email error:', error);
      setStatus('idle');
      toast.error('Something went wrong. Please try again later.');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const socialLinks = [
    { icon: Mail, href: `mailto:${personalInfo.email}` },
    { icon: FaGithub, href: personalInfo.github },
    { icon: FaLinkedin, href: personalInfo.linkedin },
    { icon: FaTwitter, href: personalInfo.twitter },
    { icon: FaInstagram, href: personalInfo.instagram }
  ];

  return (
    <section id="contact" className="py-28 relative bg-[var(--bg-primary)] overflow-hidden">
      
      {/* Decorative Ambient Background Radial Glows */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-orange-500/10 via-pink-500/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-purple-500/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          
          {/* LEFT CONTENT BLOCK */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-mono text-[var(--text-muted)] tracking-[0.2em] uppercase block mb-4">
                // CONNECT_POINT
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-[var(--text-primary)] mb-8 tracking-tight leading-[1.05]">
                Let's work <br />
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                  together.
                </span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] font-light max-w-sm mb-12 leading-relaxed">
                Currently available for selected freelance projects and architectural design opportunities.
              </p>

              {/* SOCIAL BUTTON LINKS */}
              <div className="flex flex-col gap-6">
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest">// SOCIAL_INDEX</p>
                <Motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-4"
                >
                  {socialLinks.map((social, index) => {
                    const baseClass = `w-12 h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-md flex items-center justify-center text-[var(--text-secondary)] transition-all duration-500 ease-out hover:-translate-y-1 hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] cursor-none`;

                    return isInternalLink(social.href) ? (
                      <Motion.div key={index} variants={item}>
                        <Link to={social.href} className={baseClass}>
                          <social.icon size={18} />
                        </Link>
                      </Motion.div>
                    ) : (
                      <Motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={item}
                        className={baseClass}
                      >
                        <social.icon size={18} />
                      </Motion.a>
                    );
                  })}
                </Motion.div>
              </div>
            </Motion.div>
          </div>

          {/* RIGHT CONTAINER FORM BLOCK */}
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="lg:col-span-7 p-8 md:p-10 rounded-[2.5rem] border border-[var(--border)] bg-gradient-to-b from-[var(--surface-hover)] to-transparent backdrop-blur-2xl relative"
          >
            {/* Top Linear Highlight wire */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-hover)] to-transparent" />

            <form className="space-y-7" onSubmit={handleSubmit}>
              
              {/* FULL NAME INPUT CONTAINER */}
              <div className="space-y-2 group">
                <label className={`text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${focusedField === 'name' ? 'text-orange-400' : 'text-[var(--text-secondary)]'}`}>
                  Full Name <span className="text-orange-500/40">*</span>
                </label>
                <div className={`relative rounded-2xl border transition-all duration-500 bg-[var(--surface)] ${focusedField === 'name' ? 'border-orange-500/40 bg-orange-500/[0.02]' : 'border-[var(--border)] group-hover:border-[var(--border-hover)]'} focus-within:ring-2 focus-within:ring-orange-500/50 focus-within:border-transparent`}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent px-5 py-4 text-[var(--text-primary)] outline-none transition-colors text-base font-light placeholder-[var(--text-muted)] cursor-none"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* EMAIL CONTAINER */}
              <div className="space-y-2 group">
                <label className={`text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${focusedField === 'email' ? 'text-pink-400' : 'text-[var(--text-secondary)]'}`}>
                  Email Address <span className="text-pink-500/40">*</span>
                </label>
                <div className={`relative rounded-2xl border transition-all duration-500 bg-[var(--surface)] ${focusedField === 'email' ? 'border-pink-500/40 bg-pink-500/[0.02]' : 'border-[var(--border)] group-hover:border-[var(--border-hover)]'} focus-within:ring-2 focus-within:ring-pink-500/50 focus-within:border-transparent`}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent px-5 py-4 text-[var(--text-primary)] outline-none transition-colors text-base font-light placeholder-[var(--text-muted)] cursor-none"
                    placeholder="hello@domain.com"
                  />
                </div>
              </div>

              {/* PHONE INPUT BOX */}
              <div className="space-y-2 group">
                <label className={`text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${focusedField === 'phone' ? 'text-purple-400' : 'text-[var(--text-secondary)]'}`}>
                  Phone Number <span className="text-[var(--text-muted)] text-[10px] lowercase font-sans font-light">(optional)</span>
                </label>
                <div className={`relative rounded-2xl border transition-all duration-500 bg-[var(--surface)] ${focusedField === 'phone' ? 'border-purple-500/40 bg-purple-500/[0.02]' : 'border-[var(--border)] group-hover:border-[var(--border-hover)]'} focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-transparent`}>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent px-5 py-4 text-[var(--text-primary)] outline-none transition-colors text-base font-light placeholder-[var(--text-muted)] cursor-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              {/* TEXTAREA CONTAINER */}
              <div className="space-y-2 group">
                <label className={`text-xs font-mono uppercase tracking-widest transition-colors duration-300 ${focusedField === 'message' ? 'text-orange-400' : 'text-[var(--text-secondary)]'}`}>
                  Project Brief <span className="text-orange-500/40">*</span>
                </label>
                <div className={`relative rounded-2xl border transition-all duration-500 bg-[var(--surface)] ${focusedField === 'message' ? 'border-orange-500/40 bg-orange-500/[0.02]' : 'border-[var(--border)] group-hover:border-[var(--border-hover)]'} focus-within:ring-2 focus-within:ring-orange-500/50 focus-within:border-transparent`}>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-transparent px-5 py-4 text-[var(--text-primary)] outline-none transition-colors text-base font-light placeholder-[var(--text-muted)] resize-none leading-relaxed cursor-none"
                    placeholder="Tell me about your build vision..."
                  ></textarea>
                </div>
              </div>

              {/* HIGH-END INTERACTIVE SUBMIT BUTTON */}
              <Motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'sending'}
                className="w-full relative group/btn overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 p-[1px] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2"
              >
                <div className="w-full h-full bg-[var(--bg-primary)] rounded-[15px] px-6 py-4 transition-colors duration-300 group-hover/btn:bg-transparent flex items-center justify-center gap-2">
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="animate-spin text-[var(--text-primary)]" size={18} />
                      <span className="text-[var(--text-primary)] text-sm tracking-wider uppercase font-mono text-xs">Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[var(--text-primary)] group-hover/btn:text-white transition-colors text-xs font-mono tracking-widest uppercase">Dispatch Message</span>
                      <ArrowUpRight className="text-[var(--text-secondary)] group-hover/btn:text-white group-hover/btn:rotate-45 transition-all duration-300" size={16} />
                    </>
                  )}
                </div>
              </Motion.button>

            </form>
          </Motion.div>

          {/* NOTIFICATION FRAMEWORK CORES */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: 'var(--glass-bg)',
                color: 'var(--text-primary)',
                border: '1px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '16px 24px',
                boxShadow: '0 30px 60px var(--shadow)',
                backdropFilter: 'blur(20px)',
                fontSize: '14px',
                fontFamily: 'monospace'
              },
              success: {
                style: {
                  background: 'linear-gradient(135deg, rgba(10, 35, 20, 0.95) 0%, rgba(5, 20, 10, 0.98) 100%)',
                  borderLeft: '4px solid #4ade80',
                },
                iconTheme: { primary: '#4ade80', secondary: '#05140a' },
              },
              error: {
                style: {
                  background: 'linear-gradient(135deg, rgba(35, 10, 10, 0.95) 0%, rgba(20, 5, 5, 0.98) 100%)',
                  borderLeft: '4px solid #f87171',
                },
                iconTheme: { primary: '#f87171', secondary: '#140505' },
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;