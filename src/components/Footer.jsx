//seen

import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { personalInfo } from '../personalData';
import { Link } from 'react-router-dom';

// Helper to check if link is internal route
const isInternalLink = (url) => url && url.startsWith('/');

// Reusable component for social links
const SocialLink = ({ href, icon, children }) => {
  const IconComponent = icon;
  const className = "text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors flex items-center gap-2 group cursor-none";
  
  if (isInternalLink(href)) {
    return (
      <Link to={href} className={className}>
        <IconComponent size={16} /> {children} <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </Link>
    );
  }
  
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <IconComponent size={16} /> {children} <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
    </a>
  );
};


const Footer = () => {
  return (
    <footer className="py-20 border-t border-[var(--border)] bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-display font-bold text-[var(--text-primary)] tracking-tighter mb-8">
              Hemant.
            </h2>
            <p className="text-[var(--text-secondary)] text-xl max-w-md font-light">
              Crafting digital experiences that leave a lasting impression.
            </p>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex gap-8"
          >
            <div className="flex flex-col gap-4">
              <span className="text-sm text-[var(--text-muted)] uppercase tracking-widest">Socials</span>
              <SocialLink href={personalInfo.linkedin} icon={FaLinkedin}>LinkedIn</SocialLink>

              <SocialLink href={personalInfo.github} icon={FaGithub}>GitHub</SocialLink>

              <SocialLink href={personalInfo.twitter} icon={FaTwitter}>Twitter</SocialLink>

              <SocialLink href={personalInfo.instagram} icon={FaInstagram}>Instagram</SocialLink>
            </div>
          </Motion.div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[var(--border)]">
          <p className="text-[var(--text-secondary)] text-sm">
            © {new Date().getFullYear()} Hemant Pandey. All rights reserved.
          </p>
          <p className="text-[var(--text-secondary)] text-sm">
            Designed & Built with passion and Hard Work Of <b>Hemant Pandey</b>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
