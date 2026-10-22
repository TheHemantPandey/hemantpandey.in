import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Terminal,
  LayoutGrid,
  ExternalLink,
  MapPin,
  Code2,
  Layers,
  Cpu,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

const experiences = [
  {
    id: 'yis-lead',
    role: 'Full-Stack Developer',
    organization: 'Young India Show',
    location: 'Laxmi Nagar, Delhi',
    period: 'July 2026 - Present',
    type: 'Full-Time Employment',
    isCurrent: true,
    summarySnippet: 'Architecting scalable production web apps, leading team ops & mentoring engineers.',
    miniStack: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    fileBreadcrumb: 'experience / young-india-show / full-stack-lead.ts',
    url: 'https://youngindiashow.com',
    techStack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'REST APIs', 'Docker', 'Git'],
    domains: ['System Architecture', 'REST API Design', 'Team Leadership', 'Production Cloud Deployments', 'Mobile Team Support'],
    achievements: [
      <>Architected and delivered <strong>10+ real-world production web applications</strong> with scalable, high-throughput architectures.</>,
      <>Guided and mentored <strong>5+ interns</strong> on code quality, testing patterns, and modern full-stack workflows.</>,
      <>Built robust <strong>full-stack features & REST APIs</strong> connecting responsive web apps and cross-platform mobile services.</>,
    ],
  },
  {
    id: 'yis-intern',
    role: 'Full Stack Developer Intern',
    organization: 'Young India Show',
    location: 'Laxmi Nagar, Delhi',
    period: 'Jan 2026 - June 2026',
    type: 'Full-Time Paid Internship',
    isCurrent: false,
    summarySnippet: 'Engineered responsive full-stack modules for healthcare booking and startup portals.',
    miniStack: ['MERN', 'REST APIs', 'Vercel'],
    fileBreadcrumb: 'experience / young-india-show / full-stack-intern.ts',
    url: 'https://youngindiashow.com',
    techStack: ['MERN Stack', 'React', 'Next.js', 'Node.js', 'MongoDB', 'Express', 'REST APIs', 'CI/CD'],
    domains: ['Healthcare Platforms', 'Diagnostic Booking', 'Fintech & Angel Portals', 'Database Modeling'],
    achievements: [
      <>Engineered core appointment, consultation, and booking modules for <strong>healthcare and diagnostic</strong> platforms.</>,
      <>Developed secure, validated <strong>REST API endpoints</strong> connecting React and Next.js frontends with MongoDB.</>,
      <>Contributed to fintech, angel investment, and startup platforms using the <strong>modern MERN stack</strong>.</>,
    ],
  },
  {
    id: 'freelance',
    role: 'Freelance Full Stack Developer',
    organization: 'Self-Employed',
    location: 'Remote',
    period: 'Aug 2025 - Feb 2026',
    type: 'Part-Time / Contract',
    isCurrent: false,
    summarySnippet: 'Delivered client dashboards, SEO-optimized business platforms & payment integrations.',
    miniStack: ['React', 'Node.js', 'Razorpay'],
    fileBreadcrumb: 'experience / freelance / client-solutions.ts',
    techStack: ['Full-Stack Web', 'Next.js', 'React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Vercel'],
    domains: ['Client Delivery', 'Full-Stack SaaS', 'UI/UX Architecture', 'Cloud Deployments', 'SEO Optimization'],
    achievements: [
      <>Delivered <strong>custom full-stack web platforms</strong> for diverse clients across healthcare, education, and business domains.</>,
      <>Implemented performant full-stack architectures using <strong>Next.js, React, Node.js, and MongoDB</strong>.</>,
      <>Managed end-to-end engineering lifecycles: from system architecture to <strong>cloud deployments & maintenance</strong>.</>,
    ],
  },
];

const education = [
  {
    id: 'btech',
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'J.C. Bose University of Science and Technology',
    location: 'Faridabad, Haryana',
    period: '2023 - Present',
    grade: 'CGPA: 8.1',
    isCurrent: true,
    summarySnippet: 'Specializing in Computer Science, full-stack systems, algorithms & cloud architectures.',
    miniStack: ['Computer Science', 'Data Structures', 'Algorithms'],
    fileBreadcrumb: 'education / jc-bose-ust / b-tech-cse.ts',
    techStack: ['Computer Science', 'Data Structures', 'Algorithms', 'Web Technologies', 'Database Systems', 'Software Engineering'],
    domains: ['Full-Stack Systems', 'Object-Oriented Design', 'Computer Networks', 'Cloud & Systems Architecture'],
    achievements: [
      <>Specializing in <strong>Computer Science & Full Stack Engineering</strong> with a current academic standing of <strong>CGPA 8.1</strong>.</>,
      <>Built multiple production-ready web and cloud software architectures across the <strong>modern React & Next.js ecosystem</strong>.</>,
      <>Active contributor to organizational, community-driven, and university software engineering projects.</>,
    ],
  },
  {
    id: 'polytechnic',
    degree: 'Diploma in Electrical Engineering',
    institution: 'Raja Jait Singh Government Polytechnic',
    location: 'Faridabad, Haryana',
    period: '2021 - 2023',
    grade: 'CGPA: 7.6',
    isCurrent: false,
    summarySnippet: 'Mastered electrical systems, circuit analysis, analytical logic & transitioned to software.',
    miniStack: ['Engineering Logic', 'Circuit Systems', 'Hardware'],
    fileBreadcrumb: 'education / polytechnic / electrical-eng.ts',
    techStack: ['Engineering Mathematics', 'Circuit Systems', 'Problem Solving', 'Hardware Logic', 'Systems Thinking'],
    domains: ['Hardware Systems', 'Analytical Logic', 'Technical Foundations', 'Transition to Software'],
    achievements: [
      <>Graduated with <strong>CGPA of 7.6</strong>, mastering analytical, electrical systems, and technical problem-solving foundations.</>,
      <>Discovered passion for software systems and algorithmic thinking, successfully transitioning into <strong>full-stack software engineering</strong>.</>,
    ],
  },
  {
    id: 'secondary',
    degree: 'Higher Secondary Schooling (12th)',
    institution: 'Saraswati Vidya Mandir Inter College',
    location: 'Mathura, Uttar Pradesh',
    period: '2020 - 2021',
    grade: 'Score: 84%',
    isCurrent: false,
    summarySnippet: 'Completed senior secondary with distinction, excelling in Mathematics & Computer Science.',
    miniStack: ['Mathematics', 'Physics', 'CS Fundamentals'],
    fileBreadcrumb: 'education / svmic / higher-secondary.ts',
    techStack: ['Mathematics', 'Physics', 'Computer Science', 'Logic & Fundamentals'],
    domains: ['STEM Foundations', 'Early Programming', 'Academic Distinction'],
    achievements: [
      <>Completed Senior Secondary Education with distinction at <strong>84%</strong>, excelling in <strong>Mathematics and Computer Science</strong>.</>,
      <>Initiated early self-directed exploration into computer hardware, web technologies, and programming fundamentals.</>,
    ],
  },
];

export default function Education() {
  const [activeTab, setActiveTab] = useState('experience');
  const [selectedId, setSelectedId] = useState('yis-lead');
  const [viewMode, setViewMode] = useState('gui'); // 'gui' | 'terminal'

  const currentList = activeTab === 'experience' ? experiences : education;
  const selectedItem = currentList.find((item) => item.id === selectedId) || currentList[0];

  return (
    <section
      id="education"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--bg-primary)]"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-500/6 blur-[150px] rounded-full pointer-events-none animate-glow" />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none animate-glow"
        style={{ animationDelay: '-15s' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-xs font-mono text-indigo-400 mb-4">
            CAREER & ACADEMIC CONSOLE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Interactive Experience & Journey
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Inspect milestones, technical domains, and engineering contributions across my professional career.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-500 mx-auto rounded-full mt-6 opacity-60" />
        </motion.div>

        {/* View Controls: Segmented Pill Toggle + Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 w-full max-w-6xl mx-auto">
          {/* Segmented Pill Tabs: Experience vs Education */}
          <div className="inline-flex p-1 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('experience');
                setSelectedId('yis-lead');
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase size={15} />
              <span>Work Experience</span>
              <span className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-black/30 text-slate-200">
                03
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('education');
                setSelectedId('btech');
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap size={15} />
              <span>Education & Degrees</span>
              <span className="ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-black/30 text-slate-200">
                03
              </span>
            </button>
          </div>

          {/* Mode Switcher: GUI Inspector vs git log --graph */}
          <button
            type="button"
            onClick={() => setViewMode(viewMode === 'gui' ? 'terminal' : 'gui')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-indigo-500/30 text-xs font-mono text-slate-300 transition-all duration-200 cursor-pointer group"
          >
            {viewMode === 'gui' ? (
              <>
                <Terminal size={13} className="text-indigo-400 group-hover:text-sky-400 transition-colors" />
                <span className="text-slate-400">mode:</span>
                <span className="text-indigo-300 font-semibold">git log --graph</span>
              </>
            ) : (
              <>
                <LayoutGrid size={13} className="text-emerald-400 group-hover:text-sky-400 transition-colors" />
                <span className="text-slate-400">mode:</span>
                <span className="text-emerald-300 font-semibold">GUI Inspector</span>
              </>
            )}
          </button>
        </div>

        {/* Master Console Container */}
        <div className="max-w-6xl mx-auto">
          {viewMode === 'gui' ? (
            /* GUI Master-Detail Console with Height Synchronization */
            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              
              {/* Left Column: Enriched Role / Milestone Selector (40% width) */}
              <div className="w-full lg:w-5/12 flex flex-col justify-between gap-4">
                {currentList.map((item) => {
                  const isSelected = item.id === selectedItem.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`group relative text-left w-full p-5 sm:p-5.5 rounded-2xl border transition-all duration-300 backdrop-blur-xl cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white/[0.06] border-indigo-500/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_24px_rgba(99,102,241,0.15)] -translate-y-0.5'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15'
                      }`}
                    >
                      <div>
                        {/* Header: Organization & Period/Current Tag */}
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          <span className="text-xs font-mono text-indigo-400 font-medium">
                            {item.organization || item.institution}
                          </span>

                          <div className="flex items-center gap-2">
                            {item.isCurrent && (
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-medium text-emerald-300">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                Current
                              </span>
                            )}
                            <span className="text-[11px] font-mono text-slate-400">
                              {item.period}
                            </span>
                          </div>
                        </div>

                        {/* Title and Chevron */}
                        <div className="flex items-center justify-between gap-4">
                          <h4 className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                            isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                          }`}>
                            {item.role || item.degree}
                          </h4>
                          <div className={`p-1.5 rounded-lg border transition-all shrink-0 ${
                            isSelected
                              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                              : 'bg-white/[0.02] border-white/5 text-slate-500 group-hover:text-slate-300'
                          }`}>
                            <ChevronRight size={16} />
                          </div>
                        </div>

                        {/* 1-Line Impact Snippet */}
                        {item.summarySnippet && (
                          <p className="text-xs text-slate-400 font-light line-clamp-1 my-2 leading-relaxed">
                            {item.summarySnippet}
                          </p>
                        )}

                        {/* Compact Mini Tech-Stack Row */}
                        {item.miniStack && (
                          <div className="flex flex-wrap gap-1.5 mt-2.5">
                            {item.miniStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-slate-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Metadata: Type/Grade & Location */}
                      <div className="flex items-center gap-2 mt-3.5 pt-3 border-t border-white/[0.04] text-xs">
                        <span className={`px-2 py-0.5 rounded-full font-medium ${
                          item.type
                            ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300'
                            : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                        }`}>
                          {item.type || item.grade}
                        </span>
                        <span className="text-slate-500 flex items-center gap-1 ml-auto">
                          <MapPin size={11} /> {item.location}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Deep-Dive Inspector Pane (60% width) */}
              <div className="w-full lg:w-7/12 flex flex-col">
                <div className="relative rounded-2xl border border-white/10 bg-[#0b0c12]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    {/* Terminal / IDE Inspection Header */}
                    <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                      {/* Window Controls */}
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                      </div>

                      {/* Breadcrumb Path */}
                      <span className="text-xs font-mono text-slate-400 truncate max-w-[200px] sm:max-w-none">
                        {selectedItem.fileBreadcrumb}
                      </span>

                      {/* Badge */}
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                        TypeScript
                      </span>
                    </div>

                    {/* Inspector Body Animated with AnimatePresence */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedItem.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="p-6 sm:p-8 space-y-6"
                      >
                        {/* Role & Organization Title */}
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                              {selectedItem.role || selectedItem.degree}
                            </h3>
                            <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                              {selectedItem.period}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                            <span className="text-indigo-400 font-semibold">
                              {selectedItem.organization || selectedItem.institution}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400 text-xs flex items-center gap-1">
                              <MapPin size={12} /> {selectedItem.location}
                            </span>
                            {selectedItem.url && (
                              <>
                                <span className="text-slate-600">•</span>
                                <a
                                  href={selectedItem.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 transition-colors"
                                >
                                  <span>Company Portal</span>
                                  <ExternalLink size={11} />
                                </a>
                              </>
                            )}
                          </div>
                        </div>

                        {/* High-Impact Accomplishments Box */}
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
                            <Code2 size={14} className="text-indigo-400" />
                            <span>Key Accomplishments & Impact</span>
                          </div>
                          <ul className="space-y-2.5 pt-1">
                            {selectedItem.achievements.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed [&>strong]:text-white [&>strong]:font-semibold"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Grid */}
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-medium mb-3">
                            <Cpu size={14} className="text-sky-400" />
                            <span>Technologies & Ecosystem</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedItem.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-200 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-colors"
                              >
                                <span className="w-1 h-1 rounded-full bg-sky-400" />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Engineering Highlights / Core Domains */}
                        {selectedItem.domains && (
                          <div className="pt-2">
                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-medium mb-3">
                              <Layers size={14} className="text-emerald-400" />
                              <span>Core Engineering Domains</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedItem.domains.map((domain, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-300"
                                >
                                  <CheckCircle2 size={12} />
                                  {domain}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Terminal Mode: git log --graph view */
            <div className="w-full rounded-2xl border border-white/10 bg-[#090a0f] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden font-mono text-xs sm:text-sm">
              {/* Terminal Window Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-slate-400 text-xs">zsh — hemant@portfolio:~ (career-journey)</span>
                <span className="text-[10px] text-slate-500">utf-8</span>
              </div>

              {/* Terminal Body */}
              <div className="p-6 sm:p-8 space-y-4 text-slate-300 overflow-x-auto leading-relaxed">
                <div className="text-indigo-400 font-semibold">
                  $ git log --graph --all --decorate --oneline
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <span className="text-emerald-400 font-bold">* c8f92a1</span>{' '}
                    <span className="text-amber-300">(HEAD -&gt; main, tag: v2.0-lead)</span>{' '}
                    <span className="text-white font-semibold">feat(role): Full-Stack Developer at Young India Show</span>{' '}
                    <span className="text-slate-500">[July 2026 - Present]</span>
                    <div className="text-slate-400 pl-4 border-l border-emerald-500/30 ml-1.5 mt-1">
                      <div>│  • Architected and delivered 10+ real-world production web applications.</div>
                      <div>│  • Mentored 5+ interns on code quality and modern full-stack workflows.</div>
                      <div>│  • Stack: React, Next.js, Node.js, MongoDB, Architecture, Docker.</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sky-400 font-bold">* a1b2c3d</span>{' '}
                    <span className="text-amber-300">(tag: v1.5-intern)</span>{' '}
                    <span className="text-white font-semibold">feat(internship): Full Stack Developer Intern at Young India Show</span>{' '}
                    <span className="text-slate-500">[Jan 2026 - June 2026]</span>
                    <div className="text-slate-400 pl-4 border-l border-sky-500/30 ml-1.5 mt-1">
                      <div>│  • Engineered healthcare, diagnostic, and appointment-booking platforms.</div>
                      <div>│  • Built REST API endpoints and integrated MongoDB backend services.</div>
                      <div>│  • Stack: MERN Stack, React, Node.js, MongoDB, REST APIs.</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-indigo-400 font-bold">* e5f6a7b</span>{' '}
                    <span className="text-white font-semibold">feat(freelance): Freelance Full Stack Developer</span>{' '}
                    <span className="text-slate-500">[Aug 2025 - Feb 2026]</span>
                    <div className="text-slate-400 pl-4 border-l border-indigo-500/30 ml-1.5 mt-1">
                      <div>│  • Delivered custom full-stack web products for diverse clients.</div>
                      <div>│  • Implemented production architectures with Next.js, React, Node.js, and MongoDB.</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-purple-400 font-bold">* 901234a</span>{' '}
                    <span className="text-amber-300">(tag: academics-btech)</span>{' '}
                    <span className="text-white font-semibold">feat(education): B.Tech in CSE at J.C. Bose UST</span>{' '}
                    <span className="text-slate-500">[2023 - Present]</span>
                    <div className="text-slate-400 pl-4 border-l border-purple-500/30 ml-1.5 mt-1">
                      <div>│  • Specializing in Computer Science & Full Stack Engineering (CGPA: 8.1).</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-blue-400 font-bold">* 567890b</span>{' '}
                    <span className="text-white font-semibold">feat(diploma): Diploma in Electrical Engineering</span>{' '}
                    <span className="text-slate-500">[2021 - 2023]</span>
                    <div className="text-slate-400 pl-4 border-l border-blue-500/30 ml-1.5 mt-1">
                      <div>│  • Graduated with CGPA 7.6; built analytical foundations and transitioned to software.</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-teal-400 font-bold">* 123456c</span>{' '}
                    <span className="text-white font-semibold">feat(schooling): Higher Secondary Schooling</span>{' '}
                    <span className="text-slate-500">[2020 - 2021]</span>
                    <div className="text-slate-400 pl-4 ml-1.5 mt-1">
                      <div>   • Graduated with 84% distinction in Mathematics & Computer Science.</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2">
                  <span className="text-emerald-400">hemant@portfolio:~$</span>
                  <span className="w-2 h-4 bg-slate-300 inline-block animate-pulse" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtle Bottom Section Separator */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-60 z-10" />
    </section>
  );
}