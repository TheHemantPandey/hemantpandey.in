import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Award, GraduationCap, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from './Footer';
import { certificates, education, highlights, personalInfo } from '../personalData';

const sectionAnimation = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Profile = () => {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] selection:bg-[var(--text-primary)]/10">
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

      <section className="relative overflow-hidden px-6 pb-24 pt-8 sm:px-12 lg:px-16 lg:pt-10">
        <div className="absolute inset-0 opacity-[0.03]">
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
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            Back to Home
          </Link>

          <Motion.div
            variants={sectionAnimation}
            initial="hidden"
            animate="visible"
            className="mt-12 grid gap-10 border-b border-[var(--border)] pb-16 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                About / Profile
              </span>
              <h1 className="mt-4 text-5xl font-display font-bold leading-[0.95] text-[var(--text-primary)] md:text-7xl">
                Education, certifications, and the foundation behind my work.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-[var(--text-secondary)]">
                {personalInfo.about}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--border-hover)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Current focus</p>
                <p className="mt-3 text-2xl font-display font-bold text-[var(--text-primary)]">Full-stack web products</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">Building performant web experiences with a strong focus on usability, speed, and realtime interactions.</p>
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--border-hover)]">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Quick actions</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                  >
                    Open Resume
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="group inline-flex items-center justify-between rounded-full border border-[var(--border)] px-5 py-3 text-sm font-medium uppercase tracking-[0.16em] text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
                  >
                    Email Me
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          </Motion.div>

          <div className="grid gap-24 pt-20">
            <Motion.section
              variants={sectionAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-10 flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <GraduationCap size={18} />
                Education
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {education.map((item) => (
                  <div key={`${item.degree}-${item.institution}`} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 hover:border-[var(--border-hover)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{item.period}</p>
                    <h2 className="mt-4 text-2xl font-display font-bold text-[var(--text-primary)]">{item.degree}</h2>
                    <p className="mt-4 text-base font-light text-[var(--text-secondary)]">{item.institution}</p>
                    <p className="mt-6 inline-flex rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]">{item.details}</p>
                  </div>
                ))}
              </div>
            </Motion.section>

            <Motion.section
              variants={sectionAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-10 flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <Award size={18} />
                Certifications
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {certificates.map((certificate) => (
                  <div key={certificate.name} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 hover:border-[var(--border-hover)]">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{certificate.date}</p>
                    <h2 className="mt-4 text-2xl font-display font-bold text-[var(--text-primary)]">{certificate.name}</h2>
                    <p className="mt-4 text-base font-light text-[var(--text-secondary)]">{certificate.issuer}</p>

                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)] cursor-none"
                    >
                      View Certificate
                      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </div>
                ))}
              </div>
            </Motion.section>

            <Motion.section
              variants={sectionAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-10 flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-[var(--text-muted)]">
                <Sparkles size={18} />
                Highlights
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {highlights.map((highlight) => (
                  <div key={highlight.title} className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 hover:border-[var(--border-hover)]">
                    <p className="text-4xl font-display font-bold text-[var(--text-primary)]">{highlight.metric}</p>
                    <h2 className="mt-5 text-2xl font-display font-bold text-[var(--text-primary)]">{highlight.title}</h2>
                    <p className="mt-4 text-base font-light leading-relaxed text-[var(--text-secondary)]">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </Motion.section>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;