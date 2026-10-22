import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';

const LoadingScreen = ({ progress }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const displayPercent = Math.round(clampedProgress);
  const [activeStatusIndex, setActiveStatusIndex] = useState(0);
  const statusLines = [
    'Booting up interface...',
    'Analyzing code & creativity...',
    'Preparing something awesome...',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveStatusIndex((prev) => (prev + 1) % statusLines.length);
    }, 700);

    return () => clearInterval(intervalId);
  }, [statusLines.length]);

  return (
    <Motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        y: -20,
        filter: 'blur(10px)',
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }}
      className="fixed inset-0 z-[120] overflow-hidden bg-[#090a0f]"
    >
      {/* Background Gradients & Tech Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_50%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.04),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:3.5rem_3.5rem] pointer-events-none" />

      <div className="relative flex min-h-screen flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        
        {/* Top Bar: Clean Monospace System Pill (No duplicate counter) */}
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            // SYSTEM INITIALIZING
          </div>
          <span className="font-mono text-xs tracking-widest text-slate-600 hidden sm:inline">
            CORE_LOADER
          </span>
        </div>

        {/* Center Section: Typography & Progress */}
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center relative">
          
          {/* Subtle Ambient Radial Glow Behind Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/[0.08] blur-[120px] rounded-full pointer-events-none -z-10" />

          {/* Giant "HEMANT." Heading with Luxury Gradient */}
          <Motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[18vw] font-bold uppercase leading-none tracking-[-0.08em] sm:text-[10rem] lg:text-[12rem] select-none"
          >
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Hemant
            </span>
            <span className="text-indigo-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]">
              .
            </span>
          </Motion.h1>

          {/* Status Line Cycler */}
          <div className="mt-4 flex min-h-[1.5rem] items-center justify-center font-mono text-xs uppercase tracking-[0.25em] text-slate-400 sm:min-h-[1.75rem]">
            <AnimatePresence mode="wait">
              <Motion.p
                key={statusLines[activeStatusIndex]}
                initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {statusLines[activeStatusIndex]}
              </Motion.p>
            </AnimatePresence>
          </div>

          {/* Single Focused Progress Bar Section */}
          <div className="mt-12 w-full max-w-2xl sm:mt-16">
            <div className="mb-2.5 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400 tracking-wider uppercase">INITIALIZING MODULES</span>
              <span className="text-indigo-300 font-medium tabular-nums">{displayPercent}%</span>
            </div>

            <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden backdrop-blur-sm border border-white/[0.04]">
              <Motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-blue-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                animate={{ width: `${clampedProgress}%` }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Muted Monospace Metadata */}
        <div className="flex items-center justify-between text-slate-500 font-mono text-xs tracking-widest uppercase">
          <span>BASED IN INDIA</span>
          <span>HEMANT PANDEY</span>
        </div>
      </div>
    </Motion.div>
  );
};

export default LoadingScreen;