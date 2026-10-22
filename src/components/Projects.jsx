import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  CalendarCheck,
  Activity,
  Network,
  Globe,
  Users,
  TrendingUp,
  Smartphone,
  Coffee,
  Code2,
  Mail,
  ShieldCheck,
  Music,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../projectsData';
import { personalInfo } from '../personalData';
import { trackProjectClick, trackSocialClick } from '../utils/analytics';

const PROJECT_ICONS = {
  '00': { icon: CalendarCheck, color: 'text-sky-400' },
  '01': { icon: Activity, color: 'text-emerald-400' },
  '02': { icon: Network, color: 'text-indigo-400' },
  '03': { icon: Globe, color: 'text-cyan-400' },
  '04': { icon: Users, color: 'text-amber-400' },
  '05': { icon: TrendingUp, color: 'text-rose-400' },
  '06': { icon: Smartphone, color: 'text-emerald-400' },
  '07': { icon: Coffee, color: 'text-amber-400' },
  '08': { icon: Code2, color: 'text-violet-400' },
  '09': { icon: Mail, color: 'text-sky-400' },
  '10': { icon: ShieldCheck, color: 'text-emerald-400' },
  '11': { icon: Music, color: 'text-fuchsia-400' },
  '12': { icon: CheckCircle2, color: 'text-teal-400' },
};

const getProjectMeta = (id) => {
  return PROJECT_ICONS[id] || { icon: Layers, color: 'text-indigo-300' };
};

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const navigate = useNavigate();
  const projectRefs = useRef([]);

  // Intersection Observer for scroll-based image change
  useEffect(() => {
    const observers = [];

    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setHoveredIndex(index);
              }
            });
          },
          {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0,
          }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const listContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleProjectClick = (id) => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      trackProjectClick(project.id, project.title, project.category);
    }
    navigate(`/project/${id}`);
  };

  return (
    <section id="projects" className="pt-36 relative">

      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex items-end justify-between border-b border-[var(--border)] pb-8"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-4">
              Selected Works
            </h2>
            <p className="text-[var(--text-secondary)] text-lg max-w-md font-light">
              A collection of projects that define my journey in digital product creation.
            </p>
          </div>
          <span className="text-[var(--text-muted)] font-mono hidden md:block">
            (0{projects.length})
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-20">

          {/* Sticky Image Preview (Desktop Left Column) */}
          <div className="hidden lg:block w-1/2 relative">
            <div className="sticky top-32 w-full group">
              {/* Subtle ambient glow behind the card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-sky-500/10 rounded-3xl blur-2xl -z-10 pointer-events-none" />

              <div
                className="w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0b0c12]/80 backdrop-blur-xl shadow-[0_4px_24px_-1px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_32px_-4px_rgba(0,0,0,0.5)] cursor-pointer flex flex-col"
                onClick={() => handleProjectClick(projects[hoveredIndex].id)}
              >
                {/* Polished Viewport Frame */}
                <div className="relative w-full aspect-video overflow-hidden flex items-center justify-center bg-black/60 border-b border-white/[0.08]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={hoveredIndex}
                      src={projects[hoveredIndex].image}
                      alt={`${projects[hoveredIndex].title} preview`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full object-fill"
                    />
                  </AnimatePresence>
                </div>

                {/* Bottom Info Box */}
                <div className="w-full p-6 bg-white/[0.02]">
                  <div className="flex items-end gap-6">
                    <div className="w-1/2">
                      <div className="flex items-center gap-2 mb-1.5">
                        {(() => {
                          const meta = getProjectMeta(projects[hoveredIndex].id);
                          const IconComp = meta.icon;
                          return (
                            <div className="inline-flex items-center justify-center p-1 rounded-md bg-white/[0.05] border border-white/[0.1] shrink-0">
                              <IconComp className={`w-3.5 h-3.5 ${meta.color}`} />
                            </div>
                          );
                        })()}
                        <p className="text-xs text-indigo-400 font-mono uppercase tracking-wider truncate">
                          {projects[hoveredIndex].category}
                        </p>
                      </div>
                      <p className="text-slate-300 text-sm font-normal line-clamp-2 leading-relaxed">
                        {projects[hoveredIndex].description}
                      </p>
                    </div>
                    <div className="w-1/2 flex flex-wrap gap-1.5 justify-end">
                      {projects[hoveredIndex].techStack.slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-slate-300 whitespace-nowrap font-mono font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right-Side Clean Project Stack */}
          <motion.div
            variants={listContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col space-y-4"
          >
            {projects.map((project, index) => {
              const isActive = hoveredIndex === index;
              const meta = getProjectMeta(project.id);
              const ProjectIcon = meta.icon;

              return (
                <motion.div
                  key={project.id}
                  ref={(el) => (projectRefs.current[index] = el)}
                  variants={listItem}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => handleProjectClick(project.id)}
                  className={`group rounded-2xl p-6 transition-all duration-300 border backdrop-blur-md cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.04] border-indigo-500/40 shadow-[0_0_24px_rgba(99,102,241,0.12),inset_0_1px_0_0_rgba(255,255,255,0.15)] opacity-100'
                      : 'bg-transparent opacity-60 border-transparent hover:opacity-90 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm font-mono text-indigo-400/80 pt-1 shrink-0">
                      #{project.id}
                    </span>

                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div
                          className={`inline-flex items-center justify-center p-1.5 rounded-lg border transition-all duration-200 shrink-0 ${
                            isActive
                              ? 'border-indigo-400/50 bg-indigo-500/20 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                              : 'bg-white/[0.04] border-white/[0.08] group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10'
                          }`}
                        >
                          <ProjectIcon className={`w-4 h-4 ${meta.color}`} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-semibold text-slate-100 group-hover:text-white transition-colors tracking-tight">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm md:text-base font-light mb-4 leading-relaxed">
                        {project.subtitle}
                      </p>

                      {/* Mobile Preview Image */}
                      <div className="lg:hidden mb-5 rounded-xl overflow-hidden aspect-video w-full border border-white/10 flex items-center justify-center bg-black/60">
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-1 border-t border-white/[0.04]">
                        <span className="text-slate-400 text-sm font-light">
                          {project.category}
                        </span>
                        <span className="text-slate-400 font-mono text-sm">
                          {project.period}
                        </span>
                      </div>
                    </div>

                    {/* Subtle Hover Arrow */}
                    <div
                      className={`pt-1 transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}
                    >
                      <ArrowUpRight className="text-indigo-400 group-hover:text-white transition-colors" size={24} />
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom GitHub Archive Link */}
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              variants={listItem}
              onClick={() => trackSocialClick('github', 'projects_section')}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 font-mono text-sm uppercase tracking-[0.08em] text-slate-200 transition-all duration-300 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] cursor-pointer"
            >
              <span>View All Projects On GitHub</span>
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Projects;