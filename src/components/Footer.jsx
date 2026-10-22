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

// Reusable component for social links with enhanced email trigger
const SocialLink = ({ href, icon, platform, isEmail, children }) => {
  const IconComponent = icon;
  const className = "text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group text-sm font-medium tracking-wide cursor-pointer pointer-events-auto relative z-20";

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

  if (isEmail) {
    return (
      <a
        href={href}
        onClick={handleEmailClick}
        className={className}
        aria-label="Send Email to Hemant Pandey"
        title="Compose email (copies address to clipboard)"
      >
        <IconComponent size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
        <span>{children}</span>
        <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
      </a>
    );
  }

  if (isInternalLink(href)) {
    return (
      <Link 
        to={href} 
        className={className}
        onClick={() => platform && trackSocialClick(platform, 'footer')}
      >
        <IconComponent size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
        <span>{children}</span>
        <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
      onClick={() => platform && trackSocialClick(platform, 'footer')}
    >
      <IconComponent size={16} className="text-slate-400 group-hover:text-indigo-400 transition-colors" />
      <span>{children}</span>
      <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/[0.08] bg-[#07080c] relative overflow-hidden">
      {/* Subtle top glow highlight wire */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

      {/* Ambient background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-6xl md:text-9xl font-display font-bold text-white tracking-tighter mb-6">
              Hemant<span className="text-indigo-400">.</span>
            </p>
            <p className="text-slate-400 text-sm sm:text-base max-w-md font-light leading-relaxed">
              Crafting digital experiences that leave a lasting impression.
            </p>
          </Motion.div>

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

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/[0.06] text-xs text-slate-500 font-light">
          <p>
            © {new Date().getFullYear()} Hemant Pandey. All rights reserved.
          </p>
          <p>
            Designed &amp; Built with precision by <span className="font-medium text-slate-400">Hemant Pandey</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
