import React from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowUpRight, Award, Briefcase, Code2, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const CredentialsPreview = () => {
  // Animation variant for the grid cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="credentials" className="pt-36 relative overflow-hidden">
      {/* Background Ambient Glow to match theme */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-360 mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header Block */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-8 border-b border-[var(--border)] pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.24em] text-cyan-400 font-medium">
              At A Glance
            </span>
            <h2 className="mt-2 text-4xl font-display font-bold text-[var(--text-primary)] md:text-6xl">
              Profile Snapshot
            </h2>
            <p className="mt-4 text-lg font-light leading-relaxed text-[var(--text-secondary)]">
              Explore a quick summary of my current professional status, core technical competencies, and standout achievements.
            </p>
          </div>

          <Link
            to="/profile"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--text-primary)] transition-all duration-300 hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)] hover:border-[var(--text-primary)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-none"
          >
            View Full Profile
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </Motion.div>

        {/* Snapshot Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Current Experience (Internship) */}
          <Motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01, borderColor: 'rgba(34, 211, 238, 0.4)' }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="group relative backdrop-blur-md bg-[var(--surface)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[200px] hover:border-[var(--border-hover)] hover:shadow-xl hover:shadow-[var(--shadow)]"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 transition-colors group-hover:bg-purple-500/20">
                <Briefcase size={20} />
              </div>
              <h3 className="text-[var(--text-secondary)] text-xs uppercase tracking-widest font-medium">Current Role</h3>
              <p className="text-[var(--text-primary)] text-xl font-semibold mt-2 group-hover:text-cyan-300 transition-colors">Web Dev Intern</p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">Young India Show Foundation</p>
            </div>
            <span className="text-xs text-[var(--text-muted)] mt-4 block">2026 — Present</span>
          </Motion.div>

          {/* Card 2: Technical Focus */}
          <Motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01, borderColor: 'rgba(168, 85, 247, 0.4)' }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="group relative backdrop-blur-md bg-[var(--surface)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[200px] hover:border-[var(--border-hover)] hover:shadow-xl hover:shadow-[var(--shadow)]"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 transition-colors group-hover:bg-purple-500/20">
                <Code2 size={20} />
              </div>
              <h3 className="text-[var(--text-secondary)] text-xs uppercase tracking-widest font-medium">Core Architecture</h3>
              <p className="text-[var(--text-primary)] text-xl font-semibold mt-2 group-hover:text-purple-300 transition-colors">MERN & Next.js</p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">Full-Stack / Vibe Coding workflow</p>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)]">JavaScript</span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)]">Tailwind</span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)]">MongoDB</span>
            </div>
          </Motion.div>

          {/* Card 3: Key Milestone / Stats */}
          <Motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01, borderColor: 'rgba(236, 72, 153, 0.4)' }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="group relative backdrop-blur-md bg-[var(--surface)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[200px] hover:border-[var(--border-hover)] hover:shadow-xl hover:shadow-[var(--shadow)]"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4 transition-colors group-hover:bg-pink-500/20">
                <Terminal size={20} />
              </div>
              <h3 className="text-[var(--text-secondary)] text-xs uppercase tracking-widest font-medium">Production Builds</h3>
              <p className="text-[var(--text-primary)] text-4xl font-extrabold mt-2 tracking-tight group-hover:text-pink-300 transition-colors">04+</p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">Deployed live platforms & tools</p>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)]">Real World Deploy</span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-hover)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)]">SE0 & Domain Ready</span>
            </div>
          </Motion.div>

          {/* Card 4: Endorsement / Fast Fact */}
          <Motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01, borderColor: 'rgba(234, 179, 8, 0.4)' }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="group relative backdrop-blur-md bg-[var(--surface)] border border-[var(--border)] p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between min-h-[200px] hover:border-[var(--border-hover)] hover:shadow-xl hover:shadow-[var(--shadow)]"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4 transition-colors group-hover:bg-yellow-500/20">
                <Award size={20} />
              </div>
              <h3 className="text-[var(--text-secondary)] text-xs uppercase tracking-widest font-medium">Education Snapshot</h3>
              <p className="text-[var(--text-primary)] text-base font-semibold mt-2 leading-snug">BTech Computer Science</p>
              <p className="text-[var(--text-secondary)] text-xs mt-1">JC Bose UST (YMCA Faridabad)</p>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] italic mt-4 border-t border-[var(--border)] pt-2">
              "Building performant applications with seamless UX."
            </p>
          </Motion.div>

        </div>
      </div>
    </section>
  );
};

export default CredentialsPreview;