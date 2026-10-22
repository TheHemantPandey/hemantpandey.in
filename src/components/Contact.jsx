import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Mail, Loader2, ArrowUpRight, Copy, Check } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { personalInfo } from '../personalData';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { trackContactSubmit, trackContactError, trackSocialClick } from '../utils/analytics';

const isInternalLink = (url) => url && url.startsWith('/');

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmailClick = (e) => {
    trackSocialClick('email', 'contact');
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(personalInfo.email).catch(() => {});
    }
    toast.success('Email copied! Opening mail composer...', { id: 'contact-email-toast' });
    
    // Open Gmail web composer on desktop, allow native mailto on mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const handleCopyEmail = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(personalInfo.email);
    }
    setCopiedEmail(true);
    toast.success(`Copied: ${personalInfo.email}`, { id: 'contact-copy-toast' });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
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
      trackContactSubmit();
      toast.success("Message sent successfully! I'll get back to you soon.");
    } catch (error) {
      console.error('Email error:', error);
      setStatus('idle');
      trackContactError('emailjs_send_failure');
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
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Send email to Hemant Pandey', platform: 'email', isEmail: true },
    { icon: FaGithub, href: personalInfo.github, label: 'Hemant Pandey on GitHub', platform: 'github' },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: 'Hemant Pandey on LinkedIn', platform: 'linkedin' },
    { icon: FaXTwitter, href: personalInfo.twitter, label: 'Hemant Pandey on X (Twitter)', platform: 'twitter' },
    { icon: FaInstagram, href: personalInfo.instagram, label: 'Hemant Pandey on Instagram', platform: 'instagram' }
  ];

  return (
    <section id="contact" className="py-28 relative bg-[var(--bg-primary)] overflow-hidden">
      
      {/* Decorative Ambient Background Radial Glows */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/10 via-sky-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/8 to-transparent blur-[120px] pointer-events-none -z-10" />

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
              <span className="text-xs font-mono text-slate-500 tracking-[0.2em] uppercase block mb-4">
                // CONNECT_POINT
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tight leading-[1.05]">
                Let's work <br />
                <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 text-transparent bg-clip-text">
                  together.
                </span>
              </h2>
              <p className="text-lg text-slate-400 font-light max-w-sm mb-8 leading-relaxed">
                Currently open for full-stack engineering roles, software developer opportunities, and high-impact web projects.
              </p>

              {/* DIRECT EMAIL ACTION & ONE-CLICK COPY BAR */}
              <div className="relative z-20 pointer-events-auto mb-8 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex items-center justify-between gap-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] max-w-md">
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={handleEmailClick}
                  className="flex items-center gap-3 min-w-0 group/mail cursor-pointer pointer-events-auto text-left"
                  title="Click to compose email"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover/mail:bg-indigo-500/20 group-hover/mail:border-indigo-500/40 transition-colors shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                      Direct Email
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white group-hover/mail:text-indigo-300 transition-colors truncate block">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-indigo-500/20 border border-white/[0.08] hover:border-indigo-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer pointer-events-auto shrink-0 active:scale-95"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-300 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* SOCIAL BUTTON LINKS */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">// SOCIAL_INDEX</p>
                <Motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {socialLinks.map((social, index) => {
                    const baseClass = "w-11 h-11 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer pointer-events-auto relative z-20";

                    if (social.isEmail) {
                      return (
                        <Motion.a
                          key={index}
                          href={social.href}
                          variants={item}
                          onClick={handleEmailClick}
                          aria-label={social.label}
                          className={baseClass}
                          title="Compose email to Hemant Pandey"
                        >
                          <social.icon size={18} />
                        </Motion.a>
                      );
                    }

                    return isInternalLink(social.href) ? (
                      <Motion.div key={index} variants={item}>
                        <Link 
                          to={social.href} 
                          className={baseClass} 
                          aria-label={social.label || 'Social link'}
                          onClick={() => trackSocialClick(social.platform, 'contact')}
                        >
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
                        aria-label={social.label || 'Social link'}
                        className={baseClass}
                        onClick={() => trackSocialClick(social.platform, 'contact')}
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
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.3)]"
          >
            {/* Top Linear Highlight wire */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none" />

            <form className="space-y-6" onSubmit={handleSubmit} data-clarity-mask="true">
              
              {/* FULL NAME INPUT CONTAINER */}
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                  Full Name <span className="text-indigo-400/80">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-clarity-mask="true"
                  className="w-full bg-black/30 border border-white/[0.08] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all font-light"
                  placeholder="Your name"
                />
              </div>

              {/* EMAIL & PHONE GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                    Email Address <span className="text-indigo-400/80">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    data-clarity-mask="true"
                    className="w-full bg-black/30 border border-white/[0.08] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all font-light"
                    placeholder="hello@gmail.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                    Phone Number <span className="text-slate-500 text-[10px] lowercase font-sans font-light">(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    data-clarity-mask="true"
                    className="w-full bg-black/30 border border-white/[0.08] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all font-light"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              {/* TEXTAREA CONTAINER */}
              <div className="space-y-2">
                <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                  Project Brief <span className="text-indigo-400/80">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  data-clarity-mask="true"
                  className="w-full bg-black/30 border border-white/[0.08] focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-all font-light resize-none leading-relaxed"
                  placeholder="Tell me about your build vision..."
                ></textarea>
              </div>

              {/* SLEEK GRADIENT PILL SUBMIT BUTTON */}
              <Motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={status === 'sending'}
                className="w-full relative group/btn overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 py-3.5 px-6 font-medium text-white shadow-[0_0_25px_rgba(99,102,241,0.25)] hover:shadow-[0_0_35px_rgba(99,102,241,0.4)] hover:opacity-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 focus-visible:outline-offset-2"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="animate-spin text-white" size={18} />
                    <span className="text-white text-xs font-mono tracking-widest uppercase">
                      Transmitting Brief...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-white text-xs font-mono tracking-widest uppercase font-semibold">
                      Dispatch Message
                    </span>
                    <ArrowUpRight className="text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={16} />
                  </>
                )}
              </Motion.button>

            </form>
          </Motion.div>

        </div>
      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-60 z-10 pointer-events-none" />
    </section>
  );
};

export default Contact;