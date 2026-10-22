import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { personalInfo } from '../personalData';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { trackSocialClick } from '../utils/analytics';

// Helper to check if link is internal route
const isInternalLink = (url) => url && url.startsWith('/');

// Reusable component for social links with enhanced hover styling and email trigger
const SocialLink = ({ href, icon, platform, isEmail, children }) => {
  const IconComponent = icon;
  const linkClasses = "group flex items-center gap-2.5 text-slate-400 text-sm font-medium tracking-wide transition-all duration-200 hover:translate-x-1 cursor-pointer pointer-events-auto relative z-20";

  const handleEmailClick = (e) => {
    trackSocialClick('email', 'footer');
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(personalInfo.email).catch(() => {});
    }
    toast.success(`Email copied: ${personalInfo.email}`, { id: 'footer-email-toast' });

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

  const content = (
    <>
      <IconComponent size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors duration-200 shrink-0" />
      <span className="transition-all duration-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-sky-400">
        {children}
      </span>
      <ArrowUpRight size={14} className="text-slate-500 transition-all duration-200 group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );

  if (isEmail) {
    return (
      <a
        href={href}
        onClick={handleEmailClick}
        className={linkClasses}
        aria-label="Send Email to Hemant Pandey"
        title="Compose email (copies address to clipboard)"
      >
        {content}
      </a>
    );
  }

  if (isInternalLink(href)) {
    return (
      <Link 
        to={href} 
        className={linkClasses}
        onClick={() => platform && trackSocialClick(platform, 'footer')}
      >
        {content}
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={linkClasses}
      onClick={() => platform && trackSocialClick(platform, 'footer')}
    >
      {content}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/[0.08] bg-[#07080c] relative overflow-hidden">
      {/* Subtle top glow highlight wire */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

      {/* Soft radial mesh glow in center-bottom of footer */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-indigo-500/[0.06] to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

          {/* Left Column: Signature Brand, Subtitle, and Live Status Beacon */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-6xl md:text-9xl font-display font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                Hemant
              </span>
              <span className="text-indigo-400 drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
                .
              </span>
            </p>

            <p className="text-slate-400 text-sm sm:text-base max-w-md font-light leading-relaxed mb-6">
              Crafting digital experiences as a <span className="text-slate-200 font-medium">Full-Stack Developer</span> and <span className="text-indigo-400">Technical Lead</span> that leave a lasting impression.
            </p>

            {/* Modern Live Status Beacon */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Available for new projects &amp; roles
            </div>
          </Motion.div>

          {/* Right Column: Navigation / Social Links */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex gap-12"
          >
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">// SOCIALS</span>
              <SocialLink href={personalInfo.linkedin} icon={FaLinkedin} platform="linkedin">LinkedIn</SocialLink>
              <SocialLink href={personalInfo.twitter} icon={FaXTwitter} platform="twitter">X (Twitter)</SocialLink>
              <SocialLink href={personalInfo.github} icon={FaGithub} platform="github">GitHub</SocialLink>
              <SocialLink href={personalInfo.instagram} icon={FaInstagram} platform="instagram">Instagram</SocialLink>
              <SocialLink href={`mailto:${personalInfo.email}`} icon={Mail} platform="email" isEmail={true}>Email</SocialLink>
            </div>
          </Motion.div>

        </div>

        {/* Bottom Metadata, Tech Credit, and Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06] text-xs text-slate-500 font-mono">
          <p>
            © {new Date().getFullYear()} Hemant Pandey. All rights reserved.
          </p>

          <p>
            Designed &amp; engineered with <span className="text-slate-400">Next.js</span> &amp; <span className="text-indigo-400/90">Tailwind CSS</span>.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-all duration-200 group cursor-pointer hover:-translate-y-0.5"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5 text-indigo-400">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
