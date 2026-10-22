import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Code, Layout, Smartphone } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Crafting modern, high-fidelity, and intuitive interfaces that delight users.",
      style: "hover:border-indigo-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_32px_-4px_rgba(99,102,241,0.2)]",
      iconColor: "group-hover:text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30",
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Building robust, production-ready full-stack architectures and pixel-perfect applications.",
      style: "hover:border-sky-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_32px_-4px_rgba(56,189,248,0.2)]",
      iconColor: "group-hover:text-sky-400 group-hover:bg-sky-500/10 group-hover:border-sky-500/30",
    },
    {
      icon: Layout,
      title: "Product Strategy",
      description: "Planning application scopes and conversion frameworks for maximum digital impact.",
      style: "hover:border-indigo-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_32px_-4px_rgba(99,102,241,0.2)]",
      iconColor: "group-hover:text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimization",
      description: "Engineering highly dynamic layout breakpoints to perfect mobile workflows.",
      style: "hover:border-sky-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_8px_32px_-4px_rgba(56,189,248,0.2)]",
      iconColor: "group-hover:text-sky-400 group-hover:bg-sky-500/10 group-hover:border-sky-500/30",
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="services" className="py-28 relative overflow-hidden bg-[var(--bg-primary)]">

      {/* Structural Layout Wrapper */}
      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">

        {/* SECTION HEADER BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex items-end justify-between border-b border-[var(--border)] pb-8"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-4 tracking-tight">
              Services
            </h2>
            <p className="text-[var(--text-secondary)] text-lg font-light max-w-md">
              Custom specialized solutions tailored to turn vision into scalable products.
            </p>
          </div>
          <span className="text-[var(--text-muted)] font-mono hidden md:block">
            (04_CAPABILITIES)
          </span>
        </motion.div>

        {/* CONTAINER GRID MATRIX */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`group relative p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[var(--border-hover)] ${service.style}`}
            >

              {/* Subtle Ambient Accent Top Flare line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-hover)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex justify-between items-start mb-8">
                {/* Clean Frame Mini Glass Sheet Icon Holder */}
                <div className={`p-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] transition-all duration-500 flex items-center justify-center ${service.iconColor}`}>
                  <service.icon size={26} strokeWidth={1.5} />
                </div>

                {/* Structural Grid Monospace Counts */}
                <span className="text-[var(--text-muted)]/20 font-mono text-sm tracking-widest group-hover:text-[var(--text-muted)]/40 transition-colors duration-300">
                  // 0{index + 1}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">
                {service.title}
              </h3>

              <p className="text-[var(--text-secondary)] leading-relaxed text-[0.95rem] font-light group-hover:text-[var(--text-primary)] transition-colors duration-300">
                {service.description}
              </p>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;