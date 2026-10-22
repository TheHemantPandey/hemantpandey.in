import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import profileImg from '../assets/dpp.png';
import { personalInfo } from '../personalData';
import { trackEvent, trackSocialClick } from '../utils/analytics';
import toast from 'react-hot-toast';

const Hero = () => {
  const handleEmailClick = (e) => {
    trackSocialClick('email', 'hero');
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(personalInfo.email).catch(() => {});
    }
    toast.success(`Email copied: ${personalInfo.email}`, { id: 'hero-email-toast' });
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
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-36 pb-16 lg:pb-24 bg-[var(--bg-primary)]"
    >
      {/* Drifting Ambient Background Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-sky-500/8 rounded-full blur-[130px] pointer-events-none"
        />
      </div>

      {/* Ambient Silhouette Backlight (Depth Glow directly behind shoulders/neck) */}
      <div className="absolute right-8 sm:right-24 top-20 sm:top-28 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-indigo-500/20 blur-3xl z-0 pointer-events-none" />

      {/* Profile Image Background Layer — Feathered Gradient Mask */}
      <div
        className="absolute right-0 top-0 h-[75vh] md:h-full w-full md:w-1/2 lg:w-[58%] z-0 pointer-events-none overflow-hidden select-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'destination-in',
        }}
      >
        {/* Soft bottom dissolve overlay into background */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        <img
          src={profileImg}
          alt="Hemant Pandey — Full Stack Developer"
          className="w-full h-full object-cover object-top opacity-100 filter contrast-[1.05] brightness-[0.98] transition-opacity duration-500"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
          
          {/* Top Pill Badge: Available Status */}
          <Motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(16,185,129,0.08)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-emerald-300 tracking-wide">
              Available for Full-Time Roles & Projects
            </span>
          </Motion.div>

          {/* Developer Tagline / Kicker */}
          <Motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-indigo-400 mb-3"
          >
            Hemant Pandey — Full-Stack Developer
          </Motion.p>

          {/* Primary Headline with Tight Tracking & Gradient */}
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-[1.08] mb-6"
          >
            Building Scalable Digital Products & Web Architectures.
          </Motion.h1>

          {/* Supporting Subtext */}
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8 font-normal"
          >
            Specializing in React, Next.js, Node.js, and modern cloud architectures. Transforming complex problems into high-performance, production-ready web applications.
          </Motion.p>

          {/* Action CTAs */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <a
              href="#projects"
              onClick={() => trackEvent('cta_click', { cta_name: 'view_featured_works', location: 'hero' })}
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-sm sm:text-base text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 hover:from-indigo-400 hover:to-sky-400 shadow-[0_0_24px_rgba(99,102,241,0.35)] hover:shadow-[0_0_32px_rgba(99,102,241,0.55)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>View Featured Works</span>
              <ArrowDownRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              onClick={() => trackEvent('cta_click', { cta_name: 'get_in_touch', location: 'hero' })}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-medium text-sm sm:text-base text-slate-200 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Motion.div>

          {/* Social Links Row */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 pt-6 border-t border-white/[0.06] w-full max-w-md"
          >
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium mr-2">
              Connect:
            </span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackSocialClick('github', 'hero')}
              className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackSocialClick('linkedin', 'hero')}
              className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={personalInfo.x || personalInfo.twitter}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackSocialClick('twitter', 'hero')}
              className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-200"
              aria-label="X (Twitter) Profile"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={handleEmailClick}
              className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-200 cursor-pointer pointer-events-auto relative z-20"
              aria-label="Send Email to Hemant Pandey"
              title="Compose email (copies address to clipboard)"
            >
              <Mail size={18} />
            </a>
          </Motion.div>

        </div>
      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-80 z-10" />
    </section>
  );
};

export default Hero;
