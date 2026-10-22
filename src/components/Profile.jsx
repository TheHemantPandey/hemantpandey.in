import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Award, FolderGit2, GraduationCap, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';
import { certificates, education, personalInfo } from '../personalData';
import { projects } from '../projectsData';
import { trackResumeClick, trackSocialClick, trackProjectClick } from '../utils/analytics';

const proofMetrics = [
  {
    metric: "10+",
    label: "Production Apps Delivered",
    detail: "Full-stack web & cloud platforms deployed live across healthcare, fintech & SaaS.",
  },
  {
    metric: "4+",
    label: "Years Hands-on Engineering",
    detail: "Specialized in modern React, Next.js, TypeScript, Node.js and scalable architectures.",
  },
  {
    metric: "99%+",
    label: "Performance & SEO Scores",
    detail: "Obsession with Core Web Vitals, sub-second loads, accessibility & modern indexability.",
  },
  {
    metric: "100%",
    label: "Type-Safe & Clean Architecture",
    detail: "Modular systems, strict Zod validation, robust schema design & end-to-end type safety.",
  },
];

const pageTransition = {
  hidden: { opacity: 0, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const heroLines = [
  "Hemant Pandey —",
  "Education,",
  "certifications,",
  "and the craft."
];

const Profile = () => {
  return (
    <Motion.div
      initial="hidden"
      animate="visible"
      variants={pageTransition}
      className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-[var(--text-primary)]/10 relative overflow-hidden"
    >
      <style>{`
        /* Background soft glow orbs */
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6%, 10%) scale(1.08); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-6%, -10%) scale(1.08); }
        }
        @keyframes pulse-grid-opacity {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.05; }
        }
        @keyframes status-indicator-glow {
          0% { transform: scale(1); opacity: 0.65; }
          50% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes border-glow-pulse-dance {
          0%, 100% { border-color: rgba(99, 102, 241, 0.4); box-shadow: 0 0 6px rgba(99, 102, 241, 0.2); }
          50% { border-color: rgba(56, 189, 248, 0.7); box-shadow: 0 0 12px rgba(56, 189, 248, 0.35); }
        }

        .profile-grid-bg {
          animation: pulse-grid-opacity 8s ease-in-out infinite;
        }
        .profile-orb-left {
          animation: float-orb-1 32s ease-in-out infinite;
        }
        .profile-orb-right {
          animation: float-orb-2 28s ease-in-out infinite;
        }
        .profile-status-pulse {
          animation: status-indicator-glow 4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        
        /* Premium Card styling */
        .profile-card-enhanced {
          background: rgba(255, 255, 255, 0.03) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.3) !important;
          transition: border-color 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      transform 350ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .profile-card-enhanced:hover {
          transform: translateY(-6px) scale(1.015) !important;
          border-color: rgba(99, 102, 241, 0.45) !important;
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 8px 32px -4px rgba(0, 0, 0, 0.45), 0 0 25px rgba(99, 102, 241, 0.12) !important;
        }
        
        /* Icons styling */
        .profile-accent-icon {
          color: #38bdf8 !important;
          transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .profile-card-enhanced:hover .profile-accent-icon,
        .profile-button-enhanced:hover .profile-accent-icon,
        .profile-accent-icon:hover {
          transform: rotate(5deg) scale(1.08) !important;
        }

        /* Buttons styling */
        .profile-button-enhanced {
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          background: rgba(255, 255, 255, 0.03) !important;
          color: var(--text-primary) !important;
          transition: border-color 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      color 350ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .profile-button-enhanced:hover {
          border-color: #6366f1 !important;
          box-shadow: 0 0 16px rgba(99, 102, 241, 0.3) !important;
          background: rgba(255, 255, 255, 0.07) !important;
        }
        .profile-button-arrow {
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .profile-button-enhanced:hover .profile-button-arrow {
          transform: translate(3px, -3px) !important;
        }

        /* Certificate card specific glow effects */
        .certificate-card-enhanced {
          background: rgba(255, 255, 255, 0.03) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.3) !important;
          transition: border-color 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      transform 350ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .certificate-card-enhanced:hover {
          transform: translateY(-6px) scale(1.015) !important;
          border-color: rgba(56, 189, 248, 0.45) !important;
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 8px 32px -4px rgba(0, 0, 0, 0.45), 0 0 25px rgba(56, 189, 248, 0.12) !important;
        }
        .certificate-card-enhanced h2 {
          transition: color 350ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .certificate-card-enhanced:hover h2 {
          color: #ffffff !important;
        }
        .certificate-card-enhanced:hover .certificate-button-animated {
          animation: border-glow-pulse-dance 1.5s linear infinite !important;
        }

        /* Highlight card line on top */
        .highlight-card-wrapper {
          position: relative;
          overflow: hidden;
        }
        .highlight-accent-line {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #6366f1, #38bdf8);
          transition: width 350ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .highlight-card-wrapper:hover .highlight-accent-line {
          width: 48px;
        }

        /* Footer links styling */
        .profile-footer-wrapper a {
          position: relative;
          transition: color 250ms ease, transform 250ms ease !important;
        }
        .profile-footer-wrapper a:hover {
          color: #00C2FF !important;
          transform: translateX(4px) !important;
        }
        .profile-footer-wrapper a:hover svg:last-child {
          transform: translate(3px, -3px) !important;
          color: #00C2FF !important;
        }
        .profile-footer-wrapper a:hover svg:first-child {
          color: #00C2FF !important;
          transform: rotate(5deg) scale(1.08) !important;
        }
        .profile-footer-wrapper a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #00C2FF;
          transition: width 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .profile-footer-wrapper a:hover::after {
          width: 100%;
        }
      `}</style>

      <Helmet>
        <title>Hemant Pandey — Profile, Education &amp; Certifications</title>
        <meta name="description" content="Explore Hemant Pandey's background, education at J.C. Bose UST, technical certifications, and full-stack software development highlights." />
        <link rel="canonical" href="https://hemantpandey.in/profile" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://hemantpandey.in/profile" />
        <meta property="og:site_name" content="Hemant Pandey" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content="Hemant Pandey — Profile, Education &amp; Certifications" />
        <meta property="og:description" content="Explore Hemant Pandey's background, education at J.C. Bose UST, technical certifications, and full-stack software development highlights." />
        <meta property="og:image" content="https://hemantpandey.in/project/portfolio-hemantpandey.png" />
        <meta property="og:image:alt" content="Hemant Pandey — Full Stack Developer" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hemant Pandey — Profile, Education &amp; Certifications" />
        <meta name="twitter:description" content="Explore Hemant Pandey's background, education at J.C. Bose UST, technical certifications, and full-stack software development highlights." />
        <meta name="twitter:image" content="https://hemantpandey.in/project/portfolio-hemantpandey.png" />
        <meta name="twitter:image:alt" content="Hemant Pandey — Full Stack Developer" />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "@id": "https://hemantpandey.in/profile#profilepage",
              "url": "https://hemantpandey.in/profile",
              "name": "Hemant Pandey — Profile, Education & Certifications",
              "description": "Professional profile page of Hemant Pandey, Full Stack Developer. Includes education, certifications, and technical highlights.",
              "mainEntity": {
                "@id": "https://hemantpandey.in/#person"
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://hemantpandey.in/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Profile",
                    "item": "https://hemantpandey.in/profile"
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>

      {/* Floating background soft glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(99,102,241,0.06)_0%,_rgba(0,0,0,0)_70%)] blur-[120px] pointer-events-none z-0 profile-orb-left" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.05)_0%,_rgba(0,0,0,0)_70%)] blur-[120px] pointer-events-none z-0 profile-orb-right" />

      <section className="relative overflow-hidden px-6 pb-24 pt-8 sm:px-12 lg:px-16 lg:pt-10">
        <div className="absolute inset-0 profile-grid-bg">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
            }}
          ></div>
        </div>

        <div className="relative z-10 mx-auto max-w-[90rem]">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2"
          >
            <ArrowLeft size={18} className="profile-accent-icon transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="mt-12 grid gap-10 border-b border-[var(--border)] pb-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                About / Profile
              </span>
              <h1 className="mt-4 text-5xl font-display font-bold leading-[1.05] text-[var(--text-primary)] md:text-7xl">
                {heroLines.map((line, idx) => (
                  <span key={idx} className="block overflow-hidden">
                    <Motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="block"
                    >
                      {line}
                    </Motion.span>
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[var(--text-secondary)]">
                {personalInfo.about}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl p-6 profile-card-enhanced">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#00C2FF] profile-status-pulse"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C2FF]"></span>
                  </span>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Current focus</p>
                </div>
                <p className="mt-3 text-2xl font-display font-bold text-[var(--text-primary)]">Full-stack web products</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">Building performant web experiences with a strong focus on usability, speed, and realtime interactions.</p>
                <Link
                  to="/#projects"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00C2FF] hover:underline"
                >
                  Explore Projects <ArrowUpRight size={14} className="profile-accent-icon" />
                </Link>
              </div>

              <div className="rounded-3xl p-6 profile-card-enhanced">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Quick actions</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackResumeClick('profile_quick_actions')}
                    className="group inline-flex items-center justify-between rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] profile-button-enhanced focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2"
                  >
                    Open Resume
                    <ArrowUpRight size={16} className="profile-accent-icon profile-button-arrow" />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    onClick={() => trackSocialClick('email', 'profile_quick_actions')}
                    className="group inline-flex items-center justify-between rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] profile-button-enhanced focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2"
                  >
                    Email Me
                    <Mail size={16} className="profile-accent-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-24 pt-20">
            <Motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-10"
            >
              <Motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex flex-col gap-2 align-start w-fit"
              >
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  <GraduationCap size={18} className="profile-accent-icon" />
                  Education
                </div>
                <Motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] bg-[#00C2FF]"
                />
              </Motion.div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {education.map((item) => (
                  <Motion.div 
                    variants={cardVariants}
                    key={`${item.degree}-${item.institution}`} 
                    className="rounded-3xl p-8 profile-card-enhanced"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.period}</p>
                    <h2 className="mt-4 text-2xl font-display font-bold text-[var(--text-primary)]">{item.degree}</h2>
                    <p className="mt-4 text-base font-light text-[var(--text-secondary)]">{item.institution}</p>
                    <p className="mt-6 inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]">{item.details}</p>
                  </Motion.div>
                ))}
              </div>
            </Motion.section>

            <Motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-10"
            >
              <Motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex flex-col gap-2 align-start w-fit"
              >
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  <Award size={18} className="profile-accent-icon" />
                  Certifications
                </div>
                <Motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] bg-[#00C2FF]"
                />
              </Motion.div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {certificates.map((certificate) => (
                  <Motion.div 
                    variants={cardVariants}
                    key={certificate.name} 
                    className="rounded-3xl p-8 certificate-card-enhanced"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{certificate.date}</p>
                    <h2 className="mt-4 text-2xl font-display font-bold text-[var(--text-primary)]">{certificate.name}</h2>
                    <p className="mt-4 text-base font-light text-[var(--text-secondary)]">{certificate.issuer}</p>

                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] certificate-button-animated profile-button-enhanced"
                    >
                      View Certificate
                      <ArrowUpRight size={14} className="profile-accent-icon profile-button-arrow" />
                    </a>
                  </Motion.div>
                ))}
              </div>
            </Motion.section>

            {/* HIGH-IMPACT PROOF METRICS STRIP */}
            <Motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex flex-col gap-10"
            >
              {/* Ambient radial glow behind the section */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-indigo-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

              <Motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex flex-col gap-2 align-start w-fit"
              >
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  <Sparkles size={18} className="profile-accent-icon text-indigo-400" />
                  Proof Metrics & Snapshot
                </div>
                <Motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] bg-gradient-to-r from-indigo-500 to-sky-400"
                />
              </Motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {proofMetrics.map((item, index) => (
                  <Motion.div 
                    variants={cardVariants}
                    key={index} 
                    className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_12px_36px_rgba(99,102,241,0.14)] transition-all duration-300"
                  >
                    {/* Glowing top flare line on hover */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold">
                          // 0{index + 1}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 group-hover:bg-indigo-400 transition-colors" />
                      </div>

                      <Motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-4xl lg:text-5xl font-display font-extrabold bg-gradient-to-r from-white via-slate-100 to-indigo-200 text-transparent bg-clip-text tracking-tight"
                      >
                        {item.metric}
                      </Motion.p>

                      <h3 className="mt-4 text-base lg:text-lg font-bold text-white tracking-tight group-hover:text-indigo-100 transition-colors">
                        {item.label}
                      </h3>

                      <p className="mt-2 text-xs sm:text-[13px] font-light leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                        {item.detail}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] mt-6 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>VERIFIED METRIC</span>
                      <span className="text-emerald-400 font-semibold">● LIVE</span>
                    </div>
                  </Motion.div>
                ))}
              </div>
            </Motion.section>

            <Motion.section
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col gap-10"
            >
              <Motion.div 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-end justify-between flex-wrap gap-4"
              >
                <div className="inline-flex flex-col gap-2 align-start w-fit">
                  <div className="flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    <FolderGit2 size={18} className="profile-accent-icon" />
                    Featured Projects
                  </div>
                  <Motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[2px] bg-[#00C2FF]"
                  />
                </div>

                <Link
                  to="/#projects"
                  className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  View All 12 Projects
                  <ArrowUpRight size={14} className="profile-accent-icon transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {projects.slice(0, 3).map((project) => (
                  <Motion.div 
                    variants={cardVariants}
                    key={project.id} 
                    className="rounded-3xl p-8 profile-card-enhanced flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-mono">{project.id}</span>
                        <span className="text-[11px] text-[var(--text-secondary)] font-mono">{project.period}</span>
                      </div>
                      <h2 className="mt-4 text-2xl font-display font-bold text-[var(--text-primary)]">{project.title}</h2>
                      <p className="mt-2 text-xs font-mono uppercase tracking-wider text-[#00C2FF]">{project.category}</p>
                      <p className="mt-4 text-sm font-light leading-relaxed text-[var(--text-secondary)] line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-full bg-[var(--surface-hover)] text-[11px] text-[var(--text-primary)] border border-[var(--border)] font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to={`/project/${project.id}`}
                      onClick={() => trackProjectClick(project.id, project.title, project.category)}
                      className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] profile-button-enhanced"
                    >
                      Case Study & Details
                      <ArrowUpRight size={14} className="profile-accent-icon profile-button-arrow" />
                    </Link>
                  </Motion.div>
                ))}
              </div>
            </Motion.section>
          </div>
        </div>
      </section>

      <div className="profile-footer-wrapper">
        <Footer />
      </div>
    </Motion.div>
  );
};

export default Profile;