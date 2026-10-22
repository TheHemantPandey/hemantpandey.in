import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { personalInfo } from '../personalData';
import toast from 'react-hot-toast';
import { trackSocialClick } from '../utils/analytics';

const socials = [
  {
    name: 'LinkedIn',
    href: personalInfo.linkedin,
    icon: FaLinkedin,
    platform: 'linkedin',
  },
  {
    name: 'GitHub',
    href: personalInfo.github,
    icon: FaGithub,
    platform: 'github',
  },
  {
    name: 'X (Twitter)',
    href: personalInfo.twitter,
    icon: FaXTwitter,
    platform: 'twitter',
  },
  {
    name: 'Email',
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    platform: 'email',
    isEmail: true,
  },
];

const Footer = () => {
  const handleEmailClick = (e) => {
    trackSocialClick('email', 'footer');
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(personalInfo.email).catch(() => { });
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

  return (
    <footer className="py-12 sm:py-14 border-t border-white/[0.08] bg-[#07080c] relative overflow-hidden">
      {/* Subtle top glow highlight wire */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

      {/* Soft background ambient glow */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-indigo-500/[0.05] to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-12">

          {/* Left Side: Branding, Tagline, Beacon */}
          <Motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-3 whitespace-nowrap">
              <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                Hemant Pandey
              </span>
              <span className="text-indigo-400 drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
                .
              </span>
            </p>

            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed mb-5 whitespace-normal md:whitespace-nowrap">
              Crafting digital experiences as a Full-Stack Developer &amp; Technical Lead.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              Available for new projects &amp; roles
            </div>
          </Motion.div>

          {/* Right Side: Clean minimal list of socials */}
          <Motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="flex flex-col gap-3 min-w-[160px]"
          >
            {socials.map((social) => {
              const Icon = social.icon;

              if (social.isEmail) {
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    onClick={handleEmailClick}
                    className="group inline-flex items-center justify-between gap-3 text-slate-400 hover:text-white transition-colors text-sm font-medium cursor-pointer pointer-events-auto py-0.5"
                    aria-label="Send Email to Hemant Pandey"
                    title="Compose email (copies address to clipboard)"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className="text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0" />
                      <span>{social.name}</span>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              }

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick(social.platform, 'footer')}
                  className="group inline-flex items-center justify-between gap-3 text-slate-400 hover:text-white transition-colors text-sm font-medium cursor-pointer pointer-events-auto py-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className="text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0" />
                    <span>{social.name}</span>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              );
            })}
          </Motion.div>

        </div>

        {/* Bottom Copyright Bar on a single clean line */}
        <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 font-mono">
          <p>© 2026 Hemant Pandey</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-all duration-200 group cursor-pointer hover:-translate-y-0.5 active:scale-95"
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
