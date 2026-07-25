//seen


import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import profileImg from '../assets/dp.png';

const Hero = () => {


  const textReveal = {
    hidden: { y: "100%" },
    visible: {
      y: "0%",
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-0 md:pt-20">

      {/* Profile Image Background Layer */}
      <div className="absolute right-0 top-0 h-[65vh] md:h-full w-full md:w-1/2 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
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
          className="order-2 md:order-none flex justify-between items-start mb-8 md:mb-24 w-full border-b border-[var(--border)] pb-4 pt-4 md:pt-2"
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

        <Motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="order-1 md:order-none mb-0 md:mb-12 mt-0 h-[65vh] md:h-auto flex flex-col justify-end md:justify-center pt-20 md:pt-0"
        >
          <h1 className="text-[13vw] md:text-[10vw] leading-[0.9] font-display font-bold tracking-tighter text-[var(--text-primary)] mb-8 relative">
            <div className="overflow-hidden relative z-15">
              <Motion.span variants={textReveal} className="block">
                BUILDING
              </Motion.span>
            </div>
            {/* Dual Layer "DIGITAL VALUE" */}
            <div className="relative">
              {/* Layer 1: Behind Image (Normal) */}
              <div className="overflow-hidden relative z-10 md:z-0">
                <Motion.span variants={textReveal} className="block text-[var(--text-muted)] md:text-[var(--text-muted)]">
                  DIGITAL VALUE.
                </Motion.span>
              </div>
            </div>
          </h1>
        </Motion.div>

        <div className="order-3 md:order-none flex flex-col md:flex-row justify-between items-end gap-12 border-t-0 md:border-t border-[var(--border)] pt-4 md:pt-12">
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
    </section>
  );

  function newFunction() {
    return "max-w-360 mx-auto px-6 sm:px-12 lg:px-16 relative w-full flex flex-col md:block";
  }
};

export default Hero;
