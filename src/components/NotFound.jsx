import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6 bg-[var(--bg-primary)]">
      <Helmet>
        <title>Page Not Found | Hemant Pandey</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Background ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* 404 Label */}
        <p className="text-xs font-mono uppercase tracking-[0.24em] text-[var(--text-muted)] mb-6">
          404 — Page Not Found
        </p>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-7xl font-display font-bold tracking-tight text-[var(--text-primary)] mb-6">
          This page<br />
          <span className="text-[var(--text-secondary)]">doesn't exist.</span>
        </h1>

        <p className="text-lg text-[var(--text-secondary)] font-light mb-12 leading-relaxed max-w-md mx-auto">
          The page you're looking for couldn't be found. It may have been moved,
          deleted, or the URL may be incorrect.
        </p>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-[var(--accent-bg)] text-[var(--accent-text)] rounded-full font-medium hover:opacity-90 transition-all cursor-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <Link
            to="/#projects"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-[var(--border)] text-[var(--text-primary)] rounded-full font-medium hover:bg-[var(--surface-hover)] transition-all cursor-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2"
          >
            View Projects
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            to="/profile"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-[var(--border)] text-[var(--text-primary)] rounded-full font-medium hover:bg-[var(--surface-hover)] transition-all cursor-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2"
          >
            About Hemant
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Decorative label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[var(--text-muted)] text-sm font-mono"
      >
        <div className="h-[1px] w-6 bg-[var(--border)]" />
        <span>hemantpandey.in</span>
        <div className="h-[1px] w-6 bg-[var(--border)]" />
      </motion.div>
    </section>
  );
};

export default NotFound;
