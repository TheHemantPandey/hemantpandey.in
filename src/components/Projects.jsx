import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../projectsData';
import { personalInfo } from '../personalData';
import { trackProjectClick, trackSocialClick } from '../utils/analytics';

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
            threshold: 0
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
        delayChildren: 0.2
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
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

          {/* Sticky Image Preview (Desktop) */}
          <div className="hidden lg:block w-1/2 relative">
            <div 
              className="sticky top-32 w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] shadow-lg cursor-none flex flex-col"
              onClick={() => handleProjectClick(projects[hoveredIndex].id)}
            >
              {/* Flush Image Container (Fills top, left, right and rounded corners) */}
              <div className="relative w-full aspect-video overflow-hidden flex items-center justify-center bg-black/5 dark:bg-black/60">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={hoveredIndex}
                    src={projects[hoveredIndex].image}
                    alt={`${projects[hoveredIndex].title} preview`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-fill"
                  />
                </AnimatePresence>
              </div>

              {/* Bottom Info Box */}
              <div className="w-full p-6 bg-[var(--surface)] border-t border-[var(--border)]">
                <div className="flex items-end gap-6">
                  <div className="w-1/2">
                    <p className="text-xs text-[var(--text-muted)] mb-1 font-mono uppercase tracking-wider">{projects[hoveredIndex].category}</p>
                    <p className="text-[var(--text-primary)] text-sm font-light line-clamp-2">{projects[hoveredIndex].description}</p>
                  </div>
                  <div className="w-1/2 flex flex-wrap gap-1.5 justify-end">
                    {projects[hoveredIndex].techStack.slice(0, 4).map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-[var(--surface-hover)] text-[11px] text-[var(--text-primary)] border border-[var(--border)] whitespace-nowrap font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project List */}
          <motion.div
            variants={listContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                variants={listItem}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => handleProjectClick(project.id)}
                className={`group py-8 px-4 rounded-2xl border-b border-[var(--border)] cursor-none transition-all duration-300 ${
                  hoveredIndex === index
                    ? 'opacity-100 bg-[var(--surface-hover)]'
                    : 'opacity-50 hover:opacity-100 hover:bg-[var(--surface-hover)]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm font-mono text-[var(--text-muted)] pt-2">
                    {project.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-base font-light mb-4">
                      {project.subtitle}
                    </p>
                    <div className="lg:hidden mb-6 rounded-xl overflow-hidden aspect-video w-full border border-[var(--border)] flex items-center justify-center">
                      <img src={project.image} alt={`${project.title} preview`} className="w-full h-full object-fill" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] text-sm font-light">{project.category}</span>
                      <span className="text-[var(--text-muted)] font-mono text-sm">{project.period}</span>
                    </div>
                  </div>
                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="text-[var(--text-primary)]" size={26} />
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              variants={listItem}
              onClick={() => trackSocialClick('github', 'projects_section')}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 font-mono text-sm uppercase tracking-[0.08em] text-[var(--text-primary)] transition hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] cursor-none"
            >
              View All Projects On GitHub
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Projects;