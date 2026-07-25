import React from 'react';
import { motion as Motion } from 'framer-motion';

const steps = [
  {
    id: "01",
    title: "Discovery",
    description: "Deep diving into project goals, architecture scope, and target user requirements.",
    color: "from-cyan-500 to-blue-600 text-cyan-400 border-cyan-500/20 group-hover:border-cyan-500/40 shadow-cyan-500/5",
  },
  {
    id: "02",
    title: "Design",
    description: "Crafting intuitive high-fidelity component screens, design systems, and visual flows.",
    color: "from-purple-500 to-pink-500 text-purple-400 border-purple-500/20 group-hover:border-purple-500/40 shadow-purple-500/5",
  },
  {
    id: "03",
    title: "Build",
    description: "Engineering robust, clean, and highly optimized code architectures using modern full-stack workflows.",
    color: "from-orange-500 to-red-500 text-orange-400 border-orange-500/20 group-hover:border-orange-500/40 shadow-orange-500/5",
  },
  {
    id: "04",
    title: "Launch",
    description: "Executing complete speed audits, server edge indexing, and deploying globally.",
    color: "from-emerald-500 to-teal-500 text-emerald-400 border-emerald-500/20 group-hover:border-emerald-500/40 shadow-emerald-500/5",
  }
];

const Process = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 35 },
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
    <section id="process" className="py-28 relative bg-[var(--bg-primary)] overflow-hidden">
      
      {/* Structural Background Accents */}
      <div className="absolute top-1/2 left-0 right-0 h-40 bg-gradient-to-r from-orange-500/5 via-purple-500/5 to-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* SECTION HEADER */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 flex items-end justify-between border-b border-[var(--border)] pb-8"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-primary)] mb-4 tracking-tight">
              Process Of{" "}
              <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-transparent bg-clip-text">
                Development
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg font-light max-w-md">
              The systematic workflow I use to reliably transform ambitious code ideas into production blueprints.
            </p>
          </div>
          <span className="text-[var(--text-muted)] font-mono text-sm hidden md:block">
            // (05_WORKFLOW)
          </span>
        </Motion.div>

        {/* ROADMAP WRAPPER MATRIX */}
        <div className="relative">
          
          {/* Continuous Structural Vector Timeline Connector Link Line (Hidden on mobile) */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-cyan-500/20 via-orange-500/20 to-emerald-500/20 z-0" />

          <Motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
          >
            {steps.map((step, idx) => (
              <Motion.div
                key={step.id}
                variants={item}
                className="relative group flex flex-col"
              >
                {/* Horizontal / Vertical Connection Node Indicator Bullet */}
                <div className="hidden lg:flex items-center justify-center absolute top-10 left-12 w-2 h-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] z-20 group-hover:scale-125 transition-transform duration-300">
                  <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>

                {/* Main Step Container Panel */}
                <div className={`mt-4 p-8 rounded-[2rem] border border-[var(--border)] bg-gradient-to-b from-[var(--surface-hover)] to-transparent backdrop-blur-2xl flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-2xl ${step.color}`}>
                  
                  {/* Glowing Top Flare Wire */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-hover)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Header Identifier Flag */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-4xl font-display font-black bg-gradient-to-br ${step.color} text-transparent bg-clip-text tracking-tight select-none`}>
                      {step.id}
                    </span>
                    <span className="text-[var(--text-muted)]/10 font-mono text-xs group-hover:text-[var(--text-muted)]/20 transition-colors">
                      🚀 PHASE_0{idx + 1}
                    </span>
                  </div>

                  {/* Step Meta Contents */}
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3 tracking-tight group-hover:text-[var(--text-primary)] transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-[var(--text-secondary)] text-[0.92rem] leading-relaxed font-light group-hover:text-[var(--text-secondary)] transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                
              </Motion.div>
            ))}
          </Motion.div>
        </div>

      </div>
    </section>
  );
};

export default Process;