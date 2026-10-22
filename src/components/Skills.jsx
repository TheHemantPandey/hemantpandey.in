import React from "react";
import { motion } from "framer-motion";
import LogoLoop from "./LogoLoop";

// React Icons
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaJs,
  FaPython,
} from "react-icons/fa";

import {
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiPostman,
  SiPostgresql,
  SiRedis,
  SiRedux,
  SiFramer,
  SiVercel,
  SiGithubactions,
  SiVite,
  SiLinux,
} from "react-icons/si";

// Lucide Icons
import {
  AppWindow,
  Terminal,
  Database,
  Cloud,
  Code2,
  Zap,
  ShieldCheck,
  Layers,
  Cpu,
  Globe,
} from "lucide-react";

/* ---------------- 4-CARD BENTO ARCHITECTURE ---------------- */
const bentoSkills = [
  {
    id: "frontend",
    step: "01",
    tag: "CLIENT_TIER",
    title: "Frontend Architecture",
    icon: AppWindow,
    value:
      "Crafting performant, accessible, and responsive user interfaces with modular state architectures.",
    stack: [
      { name: "React.js", icon: <FaReact className="text-[#61DAFB]" size={12} /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" size={12} /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" size={12} /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38BDF8]" size={12} /> },
      { name: "Redux Toolkit", icon: <SiRedux className="text-[#764ABC]" size={12} /> },
      { name: "Framer Motion", icon: <SiFramer className="text-white" size={12} /> },
    ],
  },
  {
    id: "backend",
    step: "02",
    tag: "CORE_RUNTIME",
    title: "Backend & System Design",
    icon: Terminal,
    value:
      "Designing resilient backend services, business logic controllers, and secure API gateways.",
    stack: [
      { name: "Node.js", icon: <FaNodeJs className="text-[#5FA04E]" size={12} /> },
      { name: "Express.js", icon: <SiExpress className="text-slate-300" size={12} /> },
      { name: "RESTful APIs", icon: <Code2 className="text-indigo-400" size={12} /> },
      { name: "WebSockets", icon: <Zap className="text-amber-400" size={12} /> },
      { name: "JWT Authentication", icon: <ShieldCheck className="text-emerald-400" size={12} /> },
      { name: "Microservices", icon: <Layers className="text-sky-400" size={12} /> },
    ],
  },
  {
    id: "databases",
    step: "03",
    tag: "DATA_LAYER",
    title: "Databases & Data Modeling",
    icon: Database,
    value:
      "Structuring high-throughput schemas, indexed queries, and reliable data persistence layers.",
    stack: [
      { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" size={12} /> },
      { name: "Mongoose", icon: <Database className="text-rose-400" size={12} /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" size={12} /> },
      { name: "Redis Caching", icon: <SiRedis className="text-[#DC382D]" size={12} /> },
      { name: "Aggregation Pipelines", icon: <Cpu className="text-indigo-400" size={12} /> },
    ],
  },
  {
    id: "devops",
    step: "04",
    tag: "INFRA_OPS",
    title: "DevOps, Cloud & Tooling",
    icon: Cloud,
    value:
      "Configuring automated CI/CD deployments, DNS routing, and development workflows.",
    stack: [
      { name: "Git", icon: <FaGitAlt className="text-[#F05032]" size={12} /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" size={12} /> },
      { name: "Vercel", icon: <SiVercel className="text-white" size={12} /> },
      { name: "Hostinger", icon: <Globe className="text-violet-400" size={12} /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" size={12} /> },
      { name: "Linux CLI", icon: <SiLinux className="text-amber-300" size={12} /> },
      { name: "Vite", icon: <SiVite className="text-[#646CFF]" size={12} /> },
    ],
  },
];

/* ---------------- MARQUEE TICKER LOGO DATA ---------------- */
const techLogos = [
  {
    node: <FaReact className="text-[#61DAFB] transition-transform duration-300" size={24} />,
    alt: "React.js",
  },
  {
    node: <SiNextdotjs className="text-white transition-transform duration-300" size={24} />,
    alt: "Next.js",
  },
  {
    node: <SiTypescript className="text-[#3178C6] transition-transform duration-300" size={24} />,
    alt: "TypeScript",
  },
  {
    node: <FaJs className="text-[#F7DF1E] transition-transform duration-300" size={24} />,
    alt: "JavaScript",
  },
  {
    node: <FaNodeJs className="text-[#5FA04E] transition-transform duration-300" size={24} />,
    alt: "Node.js",
  },
  {
    node: <SiExpress className="text-slate-100 transition-transform duration-300" size={24} />,
    alt: "Express.js",
  },
  {
    node: <SiMongodb className="text-[#47A248] transition-transform duration-300" size={24} />,
    alt: "MongoDB",
  },
  {
    node: <SiPostgresql className="text-[#4169E1] transition-transform duration-300" size={24} />,
    alt: "PostgreSQL",
  },
  {
    node: <SiRedis className="text-[#DC382D] transition-transform duration-300" size={24} />,
    alt: "Redis",
  },
  {
    node: <SiTailwindcss className="text-[#38BDF8] transition-transform duration-300" size={24} />,
    alt: "Tailwind CSS",
  },
  {
    node: <SiRedux className="text-[#764ABC] transition-transform duration-300" size={24} />,
    alt: "Redux",
  },
  {
    node: <SiFramer className="text-pink-400 transition-transform duration-300" size={24} />,
    alt: "Framer Motion",
  },
  {
    node: <FaGitAlt className="text-[#F05032] transition-transform duration-300" size={24} />,
    alt: "Git",
  },
  {
    node: <FaGithub className="text-white transition-transform duration-300" size={24} />,
    alt: "GitHub",
  },
  {
    node: <SiVercel className="text-white transition-transform duration-300" size={24} />,
    alt: "Vercel",
  },
  {
    node: <SiPostman className="text-[#FF6C37] transition-transform duration-300" size={24} />,
    alt: "Postman",
  },
  {
    node: <SiVite className="text-[#646CFF] transition-transform duration-300" size={24} />,
    alt: "Vite",
  },
  {
    node: <FaPython className="text-[#3776AB] transition-transform duration-300" size={24} />,
    alt: "Python",
  },
];

/* ---------------- MAIN COMPONENT ---------------- */
export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--bg-primary)]">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SECTION HEADER */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono text-indigo-300 mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            // 03_ENGINEERING_CORE
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Technical{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300 text-transparent bg-clip-text">
              Capabilities
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Production-grade stacks, architectural patterns, and engineering workflows built for scale.
          </p>
        </div>

        {/* 4-CARD BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {bentoSkills.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/[0.03] backdrop-blur-[12px] border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_12px_36px_rgba(99,102,241,0.14)] transition-all duration-300"
              >
                {/* Top glowing flare on hover */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Meta Row */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                      <IconComponent size={20} strokeWidth={1.75} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="px-2 py-0.5 rounded font-mono text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                        // {card.step}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 tracking-wider mt-1 uppercase">
                        {card.tag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Value */}
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-[13px] font-light leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                    {card.value}
                  </p>
                </div>

                {/* Stack Badges Section */}
                <div className="pt-4 border-t border-white/[0.06] mt-auto">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                    Core Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {card.stack.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-200 px-2.5 py-1 rounded-md hover:border-indigo-500/40 hover:text-white hover:bg-white/[0.08] transition-all"
                      >
                        <span className="shrink-0">{item.icon}</span>
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MARQUEE TICKER SECTION */}
        <div className="relative pt-6">
          <p className="text-center text-slate-500 font-mono tracking-[0.25em] mb-8 text-xs uppercase font-medium">
            Active Stack & Tooling Ecosystem
          </p>

          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            gap={24}
            pauseOnHover={true}
            fadeOut={true}
            scaleOnHover={true}
          />

          <div className="mt-4 opacity-80">
            <LogoLoop
              logos={[...techLogos].reverse()}
              speed={50}
              direction="right"
              gap={24}
              pauseOnHover={true}
              fadeOut={true}
              scaleOnHover={true}
            />
          </div>
        </div>
      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-60 z-10 pointer-events-none" />
    </section>
  );
}