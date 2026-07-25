//seen


import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/dp.png';

const Hero = () => {

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-0 md:pt-20 bg-[var(--bg-primary)]">
      {/* Drifting Ambient Background Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] animate-glow pointer-events-none" style={{ animationDuration: '40s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] animate-glow pointer-events-none" style={{ animationDuration: '30s', animationDelay: '-10s' }} />
      </div>

      {/* Profile Image Background Layer */}
      <div className="absolute right-0 top-0 h-[65vh] md:h-full w-full md:w-1/2 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10"></div>
        <img
          src={profileImg}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className={newFunction()}>

        {/* Top Metadata */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-none flex justify-between items-start mb-8 md:mb-24 w-full border-b border-[var(--border)] pb-4 pt-4 md:pt-2 z-15"
        >
          <div className="hidden md:flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[var(--border)]"></div>
            <span className="text-sm font-medium text-[var(--text-secondary)] tracking-widest uppercase">Hemant Pandey</span>
          </div>

          <div className="flex mx-auto md:mx-0 flex-row gap-4 md:gap-12 text-sm font-medium text-[var(--text-secondary)] z-15">
            <div className="flex items-center gap-2 ">
              <Globe size={16} />
              <span>Based in India</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="text-green-400">Available for work</span>
            </div>
          </div>
        </Motion.div>

        {/* Entire Heading Animated as One Premium Element */}
        <Motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 md:order-none mb-0 md:mb-12 mt-0 h-[65vh] md:h-auto flex flex-col justify-end md:justify-center pt-20 md:pt-0 z-15"
        >
          <h1 className="text-[13vw] md:text-[10vw] leading-[0.9] font-display font-bold tracking-tighter text-[var(--text-primary)] mb-8 relative">
            <span className="block">
              BUILDING
            </span>
            <span className="block text-[var(--text-muted)]">
              DIGITAL VALUE.
            </span>
          </h1>
        </Motion.div>

        <div className="order-3 md:order-none flex flex-col md:flex-row justify-between items-end gap-12 border-t-0 md:border-t border-[var(--border)] pt-4 md:pt-12 z-15">
          <div className="flex flex-col gap-8">
            <Motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-xl leading-relaxed font-light"
            >
              I build performant full-stack web applications with deep optimization. Specializing in clean MERN structures, smooth interaction, and secure architectures.
            </Motion.p>

            <Motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <a
                  href="#projects"
                  className="group flex items-center gap-4 px-6 py-3 bg-[var(--accent-bg)] text-[var(--accent-text)] rounded-full font-medium text-lg hover:opacity-90 transition-all w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                >
                  View Selected Work
                  <ArrowDownRight className="group-hover:rotate-45 transition-transform duration-300" />
                </a>

                <Link
                  to="/profile"
                  className="group flex items-center gap-3 px-6 py-3 border border-[var(--border)] text-[var(--text-primary)] rounded-full font-medium text-lg hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)] transition-all w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                >
                  My Profile
                  <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </Motion.div>
          </div>
        </div>

      </div>
      
      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-60 z-10" />
    </section>
  );

  function newFunction() {
    return "max-w-360 mx-auto px-6 sm:px-12 lg:px-16 relative w-full flex flex-col md:block";
  }
};

export default Hero;
