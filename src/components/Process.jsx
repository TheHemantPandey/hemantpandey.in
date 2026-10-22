import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Palette, Code2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

/* ---------------- 4-STEP WORKFLOW PIPELINE ---------------- */
const workflowSteps = [
  {
    step: "01",
    tag: "PLANNING",
    title: "Discovery & Architecture",
    description: "System modeling, schema planning, and selecting the optimal tech stack.",
    icon: Layers,
  },
  {
    step: "02",
    tag: "PROTOTYPING",
    title: "UI/UX & Interactive Design",
    description: "Responsive layouts, component hierarchies, and modern design tokens.",
    icon: Palette,
  },
  {
    step: "03",
    tag: "DEVELOPMENT",
    title: "Full-Stack Engineering",
    description: "Clean TypeScript code, REST/WebSocket APIs, database indexing, and state management.",
    icon: Code2,
  },
  {
    step: "04",
    tag: "DEPLOYMENT",
    title: "Testing, Security & Cloud CI/CD",
    description: "Automated testing, vulnerability checks, and containerized deployment to edge networks.",
    icon: ShieldCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Process = () => {
  return (
    <section id="process" className="py-28 relative bg-[var(--bg-primary)] overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.08] pb-8 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300 mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              // 05_WORKFLOW_PIPELINE
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
              Process of{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 text-transparent bg-clip-text">
                Development
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-light max-w-xl mt-3 leading-relaxed">
              The systematic, battle-tested engineering pipeline used to reliably transform ambitious concepts into production-grade systems.
            </p>
          </div>
          <span className="text-slate-500 font-mono text-xs hidden md:block">
            [ CONTINUOUS_INTEGRATION_PIPELINE ]
          </span>
        </motion.div>

        {/* WORKFLOW PIPELINE GRID */}
        <div className="relative">
          {/* Subtle desktop connecting gradient line showing momentum */}
          <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-[1px] bg-gradient-to-r from-indigo-500/20 via-sky-500/40 to-indigo-500/20 pointer-events-none z-0" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {workflowSteps.map((step, idx) => {
              const IconComponent = step.icon;
              const isLast = idx === workflowSteps.length - 1;

              return (
                <motion.div
                  key={step.step}
                  variants={itemVariants}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_12px_36px_rgba(99,102,241,0.14)] transition-all duration-300"
                >
                  {/* Glowing Top Flare line on hover */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* Top row: Icon, Step Monospace Badge, and Transition Indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                        <IconComponent size={20} strokeWidth={1.75} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold group-hover:border-indigo-500/40 transition-colors">
                          Step {step.step}
                        </span>

                        {!isLast ? (
                          <ArrowRight
                            size={14}
                            className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all hidden lg:block"
                          />
                        ) : (
                          <CheckCircle2
                            size={14}
                            className="text-emerald-400 hidden lg:block"
                          />
                        )}
                      </div>
                    </div>

                    {/* Step Phase Tag */}
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2">
                      PHASE // {step.tag}
                    </span>

                    {/* Step Title */}
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-100 transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-slate-400 text-xs sm:text-[13px] font-light leading-relaxed group-hover:text-slate-300 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom pipeline indicator bullet */}
                  <div className="pt-5 border-t border-white/[0.06] mt-6 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      0{idx + 1} / 04
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 group-hover:bg-indigo-400 group-hover:scale-125 transition-all" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-60 z-10 pointer-events-none" />
    </section>
  );
};

export default Process;