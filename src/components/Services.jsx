import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Webhook, Zap, CloudCog, CheckCircle2 } from 'lucide-react';

/* ---------------- 4 ACTIONABLE ENGINEERING OFFERINGS ---------------- */
const services = [
  {
    step: "01",
    domain: "PRODUCT ENGINEERING",
    title: "Full-Stack Web Development (MVP to Production)",
    description:
      "Engineering scalable web applications from early-stage MVP to high-traffic production releases using modular component architectures, type-safe full-stack workflows, and resilient state machines.",
    icon: Code2,
    deliverables: [
      "Next.js & React architectures",
      "Robust Node.js / Express backends",
      "Scalable DB schema modeling",
      "Production CI/CD build setups",
    ],
  },
  {
    step: "02",
    domain: "SYSTEM INTEGRATION",
    title: "API Architecture & Third-Party Integrations",
    description:
      "Designing fault-tolerant RESTful & WebSocket APIs, secure OAuth/JWT authentication engines, webhook processors, and resilient payment gateway integrations (Stripe, Razorpay).",
    icon: Webhook,
    deliverables: [
      "RESTful & real-time WebSockets",
      "Payment gateways (Razorpay, Stripe)",
      "JWT, OAuth2 & RBAC security",
      "Automated webhook pipelines",
    ],
  },
  {
    step: "03",
    domain: "PERFORMANCE & INTERACTION",
    title: "Performance Optimization & Responsive UI/UX",
    description:
      "Auditing and elevating Core Web Vitals, sub-second page loads, aggressive asset caching, dynamic viewport responsiveness, and accessible, micro-animated user interfaces.",
    icon: Zap,
    deliverables: [
      "95+ Core Web Vitals score",
      "Code-splitting & asset caching",
      "Fluid responsive layout engine",
      "Accessible, keyboard-ready UI",
    ],
  },
  {
    step: "04",
    domain: "DEVOPS & RELIABILITY",
    title: "Cloud Deployment, Hosting & Technical Maintenance",
    description:
      "Setting up automated continuous deployment pipelines, custom domain routing, SSL/TLS security hardening, server monitoring, and zero-downtime production maintenance.",
    icon: CloudCog,
    deliverables: [
      "Automated GitHub Actions CI/CD",
      "Vercel, Hostinger & cloud VPS",
      "Custom DNS routing & SSL setup",
      "Health monitoring & maintenance",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const Services = () => {
  return (
    <section id="services" className="py-28 relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Structural Layout Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* SECTION HEADER BLOCK */}
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
              // 04_CAPABILITIES
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
              Engineering{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 text-transparent bg-clip-text">
                Services
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-light max-w-xl mt-3 leading-relaxed">
              Actionable engineering offerings tailored to turn ideas into production-ready digital products.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end">
            <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">
              Available For Hire
            </span>
            <span className="text-emerald-400 font-mono text-xs mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Contract & Full-Time
            </span>
          </div>
        </motion.div>

        {/* BENTO GRID MATRIX */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.step}
                variants={itemVariants}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_12px_36px_rgba(99,102,241,0.14)] transition-all duration-300"
              >
                {/* Subtle Ambient Accent Top Flare line */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Top Bar with Icon & Numeric Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                      <IconComponent size={22} strokeWidth={1.75} />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-xs font-semibold text-indigo-400 group-hover:border-indigo-500/40 group-hover:text-indigo-300 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
                        {service.step}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mt-1">
                        {service.domain}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-indigo-100 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed text-xs sm:text-[13px] font-light mb-6 group-hover:text-slate-300 transition-colors">
                    {service.description}
                  </p>
                </div>

                {/* Key Deliverables / Highlights */}
                <div className="pt-4 border-t border-white/[0.06] mt-auto">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2.5">
                    Deliverables & Capabilities
                  </div>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <CheckCircle2 size={13} className="text-indigo-400/90 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-60 z-10 pointer-events-none" />
    </section>
  );
};

export default Services;