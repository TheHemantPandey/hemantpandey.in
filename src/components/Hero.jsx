import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import profileImg from '../assets/dp.png';
import { personalInfo } from '../personalData';
import { trackEvent, trackSocialClick } from '../utils/analytics';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-16 lg:pt-36 lg:pb-24 bg-[var(--bg-primary)]"
    >
      {/* Ambient Radial Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-b from-indigo-500/10 via-sky-500/5 to-transparent rounded-full blur-[140px] pointer-events-none"
        />
        <div
          className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-indigo-600/8 rounded-full blur-[130px] pointer-events-none"
        />
        <div
          className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-sky-500/8 rounded-full blur-[140px] pointer-events-none"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & Value Proposition */}
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* 1. Top Pill Badge: Available Status */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-emerald-300 tracking-wide">
                Available for Full-Time Roles & Projects
              </span>
            </div>

            {/* Developer Tagline / Kicker */}
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-indigo-400 mb-3">
              Hemant Pandey — Full-Stack Developer
            </p>

            {/* Primary Headline with Tight Tracking & Gradient */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 leading-[1.08] mb-6">
              Building Scalable Digital Products & Web Architectures.
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-8 font-normal">
              Specializing in React, Next.js, Node.js, and modern cloud architectures. Transforming complex problems into high-performance, production-ready web applications.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
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
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06] w-full">
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
                onClick={() => trackSocialClick('email', 'hero')}
                className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-white/[0.08] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-200"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </Motion.div>

          {/* Right Column: Modern Tech Bento Card */}
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-sm sm:max-w-md group">
              {/* Ambient Glow Behind Bento Card */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-500/25 via-sky-500/15 to-transparent blur-2xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Bento Card Surface */}
              <div className="relative rounded-3xl border border-white/10 bg-[#0b0c12]/80 backdrop-blur-xl p-3 sm:p-4 shadow-[0_24px_50px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.12)]">
                {/* Photo Frame Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-b from-zinc-800/40 via-zinc-900/60 to-black/90">
                  <img
                    src={profileImg}
                    alt="Hemant Pandey — Full Stack Developer"
                    className="w-full h-full object-cover object-center filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle bottom shadow overlay to integrate image seamlessly */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Floating Mini-Card 1: Top Right */}
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 px-3.5 py-2 rounded-2xl border border-white/10 bg-[#090a0f]/95 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-base">
                    🚀
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Shipped</p>
                    <p className="text-xs font-semibold text-white">15+ Projects</p>
                  </div>
                </div>

                {/* Floating Mini-Card 2: Bottom Left */}
                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 px-3.5 py-2 rounded-2xl border border-white/10 bg-[#090a0f]/95 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transition-transform duration-300 group-hover:translate-y-1">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-base">
                    ⚡
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Expertise</p>
                    <p className="text-xs font-semibold text-white">React & Next.js</p>
                  </div>
                </div>
              </div>
            </div>
          </Motion.div>

        </div>
      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-80 z-10" />
    </section>
  );
};

export default Hero;
