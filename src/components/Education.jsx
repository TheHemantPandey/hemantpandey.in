import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
  import {
    IconCalendar,
    IconTrophy,
    IconSchool,
    IconBook,
    IconBolt,
    IconBrandReact,
  } from "@tabler/icons-react";

  const education = [
    {
      degree: "Full-Stack Developer",
      institution: "Young India Show",
      location: "Laxmi Nagar, Delhi",
      period: "July 2026 - Present",
      grade: "Full time employment",
      icon: IconBrandReact,
      glow: "from-indigo-500 to-sky-400",
      hoverText: "group-hover:text-sky-300",
      dotColor: "bg-sky-400",
      achievements: [
        "Focused on Full Stack Web Development",
        "Developed 10+ real world projects",
        "Supporting App Development team",
        "Guiding 5+ Interns as an leader",
      ],
    },
    {
      degree: "Internship In Full Stack Development",
      institution: "Young India Show",
      location: "Laxmi Nagar, Delhi",
      period: "Jan 2026 - July 2026",
      grade: "Full Time Paid Internship",
      icon: IconBrandReact,
      glow: "from-indigo-500 to-sky-400",
      hoverText: "group-hover:text-sky-300",
      dotColor: "bg-sky-400",
      achievements: [
        "Focused on Full Stack Web Development",
        "Build Hospital and Diagnosis Platform",
        "Also work on Investment Platform",
        "Follow the Automation Workflow",
      ],
    },
    {
      degree: "Bachelor of Technology (B.Tech)",
      institution: "J.C. Bose University of Science and Technology",
      location: "Faridabad, Haryana",
      period: "2023 - Present",
      grade: "CGPA: 8.1",
      icon: IconBrandReact,
      glow: "from-indigo-500 to-sky-400",
      hoverText: "group-hover:text-sky-300",
      dotColor: "bg-sky-400",
      achievements: [
        "Focused on Full Stack Web Development",
        "Built Multiple Real-World Projects",
        "Worked with NGO & Internship Projects",
        "Learning Modern React & Next.js Ecosystem",
      ],
    },
    {
      degree: "Diploma in Electrical Engineering",
      institution: "Raja Jait Singh Government Polytechnic",
      location: "Faridabad, Haryana",
      period: "2021 - 2023",
      grade: "CGPA: 7.6",
      icon: IconBolt,
      glow: "from-indigo-500 to-sky-400",
      hoverText: "group-hover:text-sky-300",
      dotColor: "bg-sky-400",
      achievements: [
        "Built Strong Technical & Problem Solving Skills",
        "Worked on Practical Engineering Concepts",
        "Developed Interest in Programming & Technology",
        "Transitioned Towards Software Development",
      ],
    },
    {
      degree: "Higher Secondary Schooling",
      institution: "Saraswati Vidya Mandir Inter College",
      location: "Mathura, Uttar Pradesh",
      period: "2020 - 2021",
      grade: "84%",
      icon: IconBook,
      glow: "from-indigo-500 to-sky-400",
      hoverText: "group-hover:text-sky-300",
      dotColor: "bg-sky-400",
      achievements: [
        "Completed Senior Secondary Education",
        "Developed Interest in Computers & Technology",
        "Built Strong Academic Foundation",
        "Learned Core of Computers"
      ],
    },
    {
      degree: "High Schooling",
      institution: "Saraswati Vidya Mandir Inter College",
      location: "Mathura, Uttar Pradesh",
      period: "2019 - 2021",
      grade: "82%",
      icon: IconSchool,
      glow: "from-indigo-500 to-sky-400",
      hoverText: "group-hover:text-sky-300",
      dotColor: "bg-sky-400",
      achievements: [
        "Completed Secondary Education from UP Board",
        "Maintained Strong Academic Performance",
        "Actively Participated in School Activities",
        "Started Learning Computer"
      ],
    },
  ];

  export default function Education() {
    const shouldReduceMotion = useReducedMotion();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const cardVariants = {
      initial: {
        y: 0,
        scale: 1,
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      },
      hover: {
        y: shouldReduceMotion ? 0 : -6,
        scale: shouldReduceMotion ? 1 : 1.01,
        backgroundColor: "var(--surface-hover)",
        borderColor: "var(--border-hover)",
        boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 8px 32px -4px rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }
    };

    const iconVariants = {
      initial: {
        boxShadow: "0 0 0px rgba(99, 102, 241, 0)",
        borderColor: "rgba(255, 255, 255, 0.08)",
      },
      hover: {
        boxShadow: "0 0 15px rgba(99, 102, 241, 0.25)",
        borderColor: "rgba(99, 102, 241, 0.4)",
      }
    };

    const dotVariants = {
      initial: {
        borderColor: "rgba(255, 255, 255, 0.08)",
        boxShadow: "0 0 0px rgba(56, 189, 248, 0)",
      },
      hover: {
        borderColor: "rgba(56, 189, 248, 0.5)",
        boxShadow: "0 0 12px rgba(56, 189, 248, 0.35)",
      }
    };

    const cardTransition = {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    };

    return (
      <section
        id="education"
        className="relative py-32 px-4 overflow-hidden bg-[var(--bg-primary)]"
      >
        {/* Background Ambience */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/6 blur-[150px] rounded-full pointer-events-none animate-glow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none animate-glow" style={{ animationDelay: '-15s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-28"
          >
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-300">
                Complete Journey
              </span>
            </h2>

            <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              My academic journey from foundational school education to engineering disciplines to working professional and modern full-stack development.
            </p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 mx-auto rounded-full mt-8 opacity-60" />
          </motion.div>

          {/* Timeline Pipeline */}
          <div className="relative">
            {/* Vertical Vector Center Line scrolling entry */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-slate-300 dark:bg-gradient-to-b dark:from-indigo-500/40 dark:via-sky-500/30 dark:to-transparent origin-top"
            />

            <div className="space-y-12 lg:space-y-20">
              {education.map((edu, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Active Card Body Container */}
                    <div className="flex-1 w-full">
                      <motion.div
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        variants={cardVariants}
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                        transition={cardTransition}
                        className="relative overflow-hidden rounded-2xl border p-6 md:p-8"
                      >
                        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
                          {/* Icon Shield Block */}
                          <motion.div
                            variants={iconVariants}
                            transition={cardTransition}
                            animate={isHovered ? "hover" : "initial"}
                            className={`p-3.5 rounded-xl bg-sky-50 dark:bg-linear-to-br ${edu.glow} dark:bg-opacity-10 border border-[var(--border)] shadow-sm shrink-0`}
                          >
                            <edu.icon size={26} className="text-[#0284C7] dark:text-[var(--text-primary)]" />
                          </motion.div>

                          {/* Summary Breakdown Fields */}
                          <div className="flex-1 w-full">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
                              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                                {edu.degree}
                              </h3>

                              <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#0284C7] dark:text-cyan-400 mt-1 lg:mt-0.5">
                                <IconCalendar size={14} className="text-[#0284C7] dark:text-[var(--text-secondary)] inline-block align-middle" />
                                <span className="ml-1">{edu.period}</span>
                              </div>
                            </div>

                            {/* Subtext Location Context */}
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--text-secondary)] mb-6 font-light">
                              <span className="text-[var(--text-primary)] font-medium">{edu.institution}</span>
                              <span className="text-[var(--text-muted)] hidden sm:inline">•</span>
                              <span className="text-[var(--text-secondary)] text-xs">{edu.location}</span>
                            </div>

                            {/* Performance Metrics Grade Badge */}
                            <div className="mb-8">
                              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-hover)] border border-[var(--border)]">
                                <IconTrophy size={14} className="text-yellow-400" />
                                <span className="text-xs font-semibold tracking-wide text-[var(--text-primary)]">
                                  {edu.grade}
                                </span>
                              </div>
                            </div>

                            {/* List Points Render Group */}
                            <div className="border-t border-[var(--border)] pt-6">
                              <h4 className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] font-bold mb-4">
                                Key Focus & Achievements
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                {edu.achievements.map((achievement, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3 text-sm text-[var(--text-secondary)] font-light leading-snug"
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full ${edu.dotColor} mt-2 shrink-0 shadow-sm`} />
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Central Keyframe Node Matrix Anchor */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                      <span className="absolute w-5 h-5 rounded-full bg-purple-500/30 animate-ping pointer-events-none" />
                      <motion.div
                        variants={dotVariants}
                        transition={cardTransition}
                        animate={isHovered ? "hover" : "initial"}
                        className="w-5 h-5 rounded-full bg-[var(--bg-primary)] border-[3px] relative flex items-center justify-center shadow-xl"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-linear-to-r ${edu.glow}`} />
                      </motion.div>
                    </div>

                    {/* Grid Symmetry Placeholder Offset block */}
                    <div className="hidden lg:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Subtle Bottom Section Separator */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-60 z-10" />
      </section>
    );
  }