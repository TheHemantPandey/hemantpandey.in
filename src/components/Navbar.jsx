import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { personalInfo } from '../personalData';
import { trackResumeClick, trackSocialClick } from '../utils/analytics';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Work', href: 'projects' },
    { name: 'About', href: 'credentials' },
    { name: 'Services', href: 'services' },
    { name: 'Process', href: 'education' },
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <>
      <Motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-full border border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-xl px-4 sm:px-6 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] flex items-center justify-between transition-all duration-300">

            {/* Logo with Gradient Accent Dot */}
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', window.location.pathname);
              }}
              className="flex items-center gap-2 group cursor-none select-none"
              aria-label="Hemant Pandey Home"
            >
              <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                Hemant Pandey
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 group-hover:scale-125 transition-transform" />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.href}`}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-xs font-medium tracking-wide uppercase text-slate-400 hover:text-white transition-colors duration-200 cursor-none py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackResumeClick('navbar_desktop')}
                className="text-xs font-medium tracking-wide uppercase text-slate-400 hover:text-white transition-colors duration-200 cursor-none py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
              >
                Resume
              </a>
            </div>

            {/* Right High-Visibility CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all duration-300 hover:scale-[1.02] cursor-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
              >
                <span>Let's Talk</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-200 hover:text-white p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 cursor-none"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </Motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#090a0f]/95 backdrop-blur-2xl md:hidden pt-28 px-6 flex flex-col justify-between pb-10"
          >
            <div className="flex flex-col gap-6 items-center pt-8">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.href}`}
                  onClick={(e) => {
                    scrollToSection(e, item.href);
                    setIsOpen(false);
                  }}
                  className="text-2xl font-display font-semibold text-slate-200 hover:text-white transition-colors cursor-none"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackResumeClick('navbar_mobile');
                  setIsOpen(false);
                }}
                className="text-2xl font-display font-semibold text-slate-200 hover:text-white transition-colors cursor-none"
              >
                Resume
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  scrollToSection(e, 'contact');
                  setIsOpen(false);
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] cursor-none"
              >
                <span>Let's Talk</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Mobile Footer Socials */}
            <div className="flex justify-center gap-6 border-t border-white/10 pt-6">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick('github', 'navbar_mobile')} className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer"><FaGithub size={20} /></a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick('linkedin', 'navbar_mobile')} className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer"><FaLinkedin size={20} /></a>
              <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick('twitter', 'navbar_mobile')} className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer"><FaXTwitter size={20} /></a>
              <a href={`mailto:${personalInfo.email}`} onClick={() => trackSocialClick('email', 'navbar_mobile')} className="text-slate-400 hover:text-white p-2 transition-colors cursor-pointer"><Mail size={20} /></a>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
