import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../personalData';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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

  const navItems = [
    { name: 'Work', href: 'projects' },
    { name: 'About', href: 'credentials' },
    { name: 'Contact', href: 'contact' },
    { name: 'Resume', href: '/Hemant_Pandey_SDE.pdf', isExternal: true },
  ];

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Remove hash from URL
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  return (
    <>
      <Motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
          }`}
      >
        <div className="max-w-9xl mx-auto px-6 ">
          <div className="mx-auto max-w-2xl glass rounded-full px-4 py-2 flex items-center justify-between transition-all duration-300 bg-[var(--glass-bg)] border-[var(--glass-border)]">

            {/* Logo */}
            <a 
              href="/" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, '', window.location.pathname);
              }}
              className="text-sm font-display font-bold text-[var(--text-primary)] tracking-widest uppercase cursor-none"
            >
              Hemant Pandey.
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-[var(--accent-bg)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] transition-all duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a
                    key={item.name}
                    href={`#${item.href}`}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-[var(--text-primary)] p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </Motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl md:hidden pt-32 px-6"
          >
            <div className="flex flex-col gap-8 items-center">
              {navItems.map((item) => (
                item.isExternal ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-[var(--accent-bg)] px-8 py-3 text-lg font-display font-bold uppercase tracking-wider text-[var(--accent-text)] transition-all duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                  >
                    {item.name}
                  </a>
                ) : (
                  <a
                    key={item.name}
                    href={`#${item.href}`}
                    onClick={(e) => {
                      scrollToSection(e, item.href);
                      setIsOpen(false);
                    }}
                    className="text-4xl font-display font-bold text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                  >
                    {item.name}
                  </a>
                )
              ))}
              <div className="pt-12 flex gap-8">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"><FaGithub size={24} /></a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"><FaLinkedin size={24} /></a>
                <a href={`mailto:${personalInfo.email}`} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"><Mail size={24} /></a>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
