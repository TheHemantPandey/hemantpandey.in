import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Award, GraduationCap, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';
import { certificates, education, highlights, personalInfo } from '../personalData';

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
  "Education,",
  "certifications,",
  "and the foundation",
  "behind my work."
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
          0%, 100% { border-color: rgba(0, 194, 255, 0.4); box-shadow: 0 0 4px rgba(0, 194, 255, 0.15); }
          50% { border-color: rgba(79, 140, 255, 0.85); box-shadow: 0 0 10px rgba(79, 140, 255, 0.4); }
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
          background: rgba(10, 10, 10, 0.7) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.05) !important;
          transition: border-color 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      transform 350ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .profile-card-enhanced:hover {
          transform: translateY(-6px) scale(1.015) !important;
          border-color: rgba(0, 194, 255, 0.45) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 194, 255, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
        }
        
        /* Icons styling */
        .profile-accent-icon {
          color: #00C2FF !important;
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
          border-color: #00C2FF !important;
          box-shadow: 0 0 12px rgba(0, 194, 255, 0.25) !important;
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
          background: rgba(10, 10, 10, 0.7) !important;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.05) !important;
          transition: border-color 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 350ms cubic-bezier(0.16, 1, 0.3, 1),
                      transform 350ms cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .certificate-card-enhanced:hover {
          transform: translateY(-6px) scale(1.015) !important;
          border-color: rgba(0, 194, 255, 0.45) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 194, 255, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.1) !important;
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
          background-color: #00C2FF;
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
        <title>Professional Profile | Hemant Pandey</title>
        <meta name="description" content="Learn more about Hemant Pandey's background, core achievements, professional education metrics, and certifications." />
        <link rel="canonical" href="https://hemantpandey.in/profile" />
        <meta property="og:title" content="Professional Profile | Hemant Pandey" />
        <meta property="og:description" content="Learn more about Hemant Pandey's background, core achievements, professional education metrics, and certifications." />
        <meta property="og:url" content="https://hemantpandey.in/profile" />
        <meta name="twitter:title" content="Professional Profile | Hemant Pandey" />
        <meta name="twitter:description" content="Learn more about Hemant Pandey's background, core achievements, professional education metrics, and certifications." />
      </Helmet>

      {/* Floating background soft glow orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(0,194,255,0.04)_0%,_rgba(0,0,0,0)_70%)] blur-[120px] pointer-events-none z-0 profile-orb-left" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,_rgba(79,140,255,0.04)_0%,_rgba(0,0,0,0)_70%)] blur-[120px] pointer-events-none z-0 profile-orb-right" />

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
            className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)] transition-colors duration-300 hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
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
              </div>

              <div className="rounded-3xl p-6 profile-card-enhanced">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Quick actions</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] profile-button-enhanced focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                  >
                    Open Resume
                    <ArrowUpRight size={16} className="profile-accent-icon profile-button-arrow" />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="group inline-flex items-center justify-between rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] profile-button-enhanced focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
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
                      className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] certificate-button-animated profile-button-enhanced cursor-none"
                    >
                      View Certificate
                      <ArrowUpRight size={14} className="profile-accent-icon profile-button-arrow" />
                    </a>
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
                  <Sparkles size={18} className="profile-accent-icon" />
                  Highlights
                </div>
                <Motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="h-[2px] bg-[#00C2FF]"
                />
              </Motion.div>
              <div className="grid gap-6 md:grid-cols-3">
                {highlights.map((highlight) => (
                  <Motion.div 
                    variants={cardVariants}
                    key={highlight.title} 
                    className="rounded-3xl p-8 profile-card-enhanced highlight-card-wrapper"
                  >
                    <div className="highlight-accent-line" />
                    <Motion.p 
                      initial={{ opacity: 0, y: 20, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                      className="text-4xl font-display font-bold text-[var(--text-primary)]"
                    >
                      {highlight.metric}
                    </Motion.p>
                    <h2 className="mt-5 text-2xl font-display font-bold text-[var(--text-primary)]">{highlight.title}</h2>
                    <p className="mt-4 text-base font-light leading-relaxed text-[var(--text-secondary)]">{highlight.description}</p>
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