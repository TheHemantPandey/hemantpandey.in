import React from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../personalData";
import LogoLoop from "./LogoLoop"; 

import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaJs
} from "react-icons/fa";

import {
  SiMongodb, SiTailwindcss, SiTypescript, SiNextdotjs, SiExpress, SiFirebase, SiPostman
} from "react-icons/si";

/* ---------------- ICON LOOP DATA ---------------- */
const techLogos = [
  { node: <FaReact className="text-cyan-400" size={32} />, alt: "React" },
  { node: <FaJs className="text-yellow-400" size={32} />, alt: "JavaScript" },
  { node: <FaNodeJs className="text-green-500" size={32} />, alt: "Node.js" },
  { node: <SiExpress className="text-gray-300" size={32} />, alt: "Express.js" },
  { node: <SiMongodb className="text-green-400" size={32} />, alt: "MongoDB" },
  { node: <SiNextdotjs className="text-white" size={32} />, alt: "Next.js" },
  { node: <SiTailwindcss className="text-cyan-300" size={32} />, alt: "Tailwind CSS" },
  { node: <SiTypescript className="text-blue-500" size={32} />, alt: "TypeScript" },
  { node: <FaPython className="text-blue-400" size={32} />, alt: "Python" },
  { node: <SiFirebase className="text-amber-500" size={32} />, alt: "Firebase" },
  { node: <SiPostman className="text-orange-500" size={32} />, alt: "Postman" },
  { node: <FaGitAlt className="text-red-500" size={32} />, alt: "Git" },
  { node: <FaGithub className="text-white" size={32} />, alt: "GitHub" },
];

/* ---------------- TECH-SPECIFIC GLASS COLOR MAPPER ---------------- */
const getSkillColor = (skillName) => {
  const name = skillName.toLowerCase().trim();

  // MERN / Frontend Stacks
  if (name.includes("react")) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
  if (name.includes("next")) return "bg-zinc-100/10 text-zinc-100 border-zinc-100/20";
  if (name.includes("js") || name.includes("javascript")) return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  if (name.includes("ts") || name.includes("typescript")) return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  if (name.includes("tailwind")) return "bg-sky-400/10 text-sky-300 border-sky-400/20";
  if (name.includes("html")) return "bg-orange-500/10 text-orange-400 border-orange-500/20";
  if (name.includes("css")) return "bg-blue-600/10 text-blue-400 border-blue-600/20";

  // Backend / Database
  if (name.includes("node")) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (name.includes("express")) return "bg-neutral-400/10 text-neutral-300 border-neutral-400/20";
  if (name.includes("mongo")) return "bg-green-500/10 text-green-400 border-green-500/20";
  if (name.includes("firebase")) return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  if (name.includes("python")) return "bg-blue-400/10 text-sky-400 border-blue-400/20";
  if (name.includes("sql") || name.includes("postgres")) return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

  // Tools / DevOps
  if (name.includes("git")) return "bg-red-500/10 text-red-400 border-red-500/20";
  if (name.includes("github")) return "bg-zinc-400/10 text-zinc-300 border-zinc-400/20";
  if (name.includes("postman")) return "bg-orange-500/10 text-orange-400 border-orange-500/20";
  if (name.includes("vercel") || name.includes("hosting")) return "bg-stone-100/10 text-stone-200 border-stone-100/20";

  // Default Fallback Color if it doesn't match above categories explicitly
  return "bg-purple-500/10 text-purple-400 border-purple-500/20";
};

/* ---------------- RENDERS MINI LOGO GRAPHICS DYNAMICALLY ---------------- */
const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase().trim();
  const iconSize = 13; // Balanced mini markup sizing

  if (name.includes("react")) return <FaReact className="text-cyan-400" size={iconSize} />;
  if (name.includes("next")) return <SiNextdotjs className="text-white" size={iconSize} />;
  if (name.includes("node")) return <FaNodeJs className="text-green-500" size={iconSize} />;
  if (name.includes("express")) return <SiExpress className="text-gray-300" size={iconSize} />;
  if (name.includes("mongo")) return <SiMongodb className="text-green-400" size={iconSize} />;
  if (name.includes("tailwind")) return <SiTailwindcss className="text-cyan-300" size={iconSize} />;
  if (name.includes("js") || name.includes("javascript")) return <FaJs className="text-yellow-400" size={iconSize} />;
  if (name.includes("ts") || name.includes("typescript")) return <SiTypescript className="text-blue-500" size={iconSize} />;
  if (name.includes("python")) return <FaPython className="text-blue-400" size={iconSize} />;
  if (name.includes("firebase")) return <SiFirebase className="text-amber-500" size={iconSize} />;
  if (name.includes("postman")) return <SiPostman className="text-orange-500" size={iconSize} />;
  if (name.includes("git")) return <FaGitAlt className="text-red-500" size={iconSize} />;
  if (name.includes("github")) return <FaGithub className="text-white" size={iconSize} />;

  return null;
};

/* ---------------- PREMIUM CARD IMPLEMENTATION ---------------- */
const SkillCard = ({ cat, index }) => {
  // Diversified dynamic hover accent rings for the 4 grid slots
  const hoverBorders = [
    "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]",    // Frontend Card
    "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]", // Backend Card
    "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",  // Languages Card
    "hover:border-amber-400/40 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)]"     // Tools Card
  ];

  const cardHoverStyle = hoverBorders[index % hoverBorders.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative p-8 rounded-[2rem] border border-[var(--border)] bg-gradient-to-b from-[var(--surface-hover)] to-transparent backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-xl ${cardHoverStyle}`}
    >
      
      {/* Decorative Top Flare Glow Effect */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-hover)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6 tracking-tight flex items-center justify-between">
        {cat.title}
        <span className="text-[var(--text-muted)]/30 font-mono text-xs group-hover:text-[var(--text-muted)]/60 transition-colors duration-300">
          // 0{index + 1}
        </span>
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {cat.items.map((item, i) => {
          const colorClass = getSkillColor(item);
          const iconNode = getSkillIcon(item);

          return (
            <span
              key={i}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono border rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 ${colorClass}`}
            >
              {iconNode && <span className="flex-shrink-0 flex items-center">{iconNode}</span>}
              {item}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
};

/* ---------------- MAIN SKILLS COMPONENT ---------------- */
export default function Skills() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-[var(--bg-primary)]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none animate-glow" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* TITLE */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight">
            Technical{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Skills
            </span>
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 text-base font-light tracking-wide">
            Technologies I use to bring ideas to life 🚀
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {skillCategories.map((cat, i) => (
            <SkillCard key={i} cat={cat} index={i} />
          ))}
        </div>

        {/* MARQUEE MARKS */}
        <p className="text-center text-[var(--text-muted)] tracking-[0.3em] mb-12 text-xs uppercase font-medium">
          Technologies I Work With
        </p>

        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          gap={32}
          pauseOnHover={true}
          fadeout={true}
          scaleOnHover={true}   
        />

        <div className="mt-6 opacity-80">
          <LogoLoop
            logos={[...techLogos].reverse()}
            speed={80}
            direction="right"
            gap={32}
            pauseOnHover={true}
            fadeout={true}
            scaleOnHover={true}
          />
        </div>

      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-60 z-10" />
    </section>
  );
}