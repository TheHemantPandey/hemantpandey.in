import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../projectsData';
import { personalInfo } from '../personalData';

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
    navigate(`/project/${id}`);
  };

  return (
    <section id="projects" className="pt-36 pb-36 relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none animate-glow" />

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
              className="sticky top-32 h-[450px] w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] backdrop-blur-md cursor-none cursor-hover flex items-center justify-center p-6 hover:border-[var(--border-hover)] hover:shadow-2xl hover:shadow-[var(--shadow)] hover:scale-[1.01] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              onClick={() => handleProjectClick(projects[hoveredIndex].id)}
              data-cursor="VIEW"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={hoveredIndex}
                  src={projects[hoveredIndex].image}
                  alt={projects[hoveredIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </AnimatePresence>

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/70 to-transparent">
                <div className="flex items-end gap-6">
                  <div className="w-1/2">
                    <p className="text-sm text-[var(--text-secondary)] mb-2 font-mono">{projects[hoveredIndex].category}</p>
                    <p className="text-[var(--text-primary)] text-sm md:text-base font-light line-clamp-2">{projects[hoveredIndex].description}</p>
                  </div>
                  <div className="w-1/2 flex flex-wrap gap-2 justify-end">
                    {projects[hoveredIndex].techStack.map((t, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-[var(--surface-hover)] backdrop-blur-md text-xs text-[var(--text-primary)] border border-[var(--border)] whitespace-nowrap">
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
            className="w-full lg:w-1/2 flex flex-col"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                variants={listItem}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => handleProjectClick(project.id)}
                data-cursor="VIEW"
                className={`group py-12 border-b border-[var(--border)] cursor-none cursor-hover transition-all duration-300 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="text-sm font-mono text-[var(--text-muted)] pt-2">
                    {project.id}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-lg font-light mb-4">
                      {project.subtitle}
                    </p>
                    
{/* Fixed Responsive Mobile Image Container */}
<div className="lg:hidden mb-6 rounded-xl overflow-hidden w-full max-h-[280px] bg-[var(--surface)] border border-[var(--border)] p-4 flex items-center justify-center backdrop-blur-sm">
  <img 
    src={project.image} 
    alt={project.title} 
    loading="lazy"
    className="w-full h-auto max-h-[250px] object-contain drop-shadow-lg" 
  />
</div>
                    <div className="flex justify-between items-center">
                      <span className="text-[var(--text-secondary)] font-light">{project.category}</span>
                      <span className="text-[var(--text-muted)] font-mono text-sm">{project.period}</span>
                    </div>
                  </div>
                  <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="text-[var(--text-primary)]" size={30} />
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              variants={listItem}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 font-mono text-sm uppercase tracking-[0.08em] text-[var(--text-primary)] transition hover:border-[var(--text-secondary)] hover:bg-[var(--surface-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-2 cursor-none"
            >
              View All Projects On GitHub
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

        </div>
      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-60 z-10" />
    </section>
  );
};

export default Projects;