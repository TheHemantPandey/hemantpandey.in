import React from 'react';
import { motion as Motion } from 'framer-motion';

const getTelemetryLog = (p) => {
  if (p < 25) return '> [core] initializing next/react vdom runtime...';
  if (p < 50) return '> [net] prefetching edge components & svg assets...';
  if (p < 75) return '> [data] hydrating state models & local caches...';
  if (p < 95) return '> [sec] verifying auth tokens & security headers...';
  return '> [sys] ready. rendering interactive viewport.';
};

const LoadingScreen = ({ progress }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const displayPercent = Math.round(clampedProgress);

  return (
    <Motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 0.98,
        transition: { duration: 0.45, ease: 'easeInOut' },
      }}
      className="fixed inset-0 z-[120] overflow-hidden bg-[#090a0f]"
    >
      {/* Background Ambient Radial Glows & Fine Tech Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.07),transparent_50%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.05),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:3.5rem_3.5rem] pointer-events-none" />

      <div className="relative flex min-h-screen flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        
        {/* TOP ROW: TELEMETRY METADATA */}
        <div className="flex items-center justify-between w-full">
          <div className="text-[11px] font-mono text-emerald-400/80 flex items-center gap-1.5 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            // CORE_RUNTIME: EDGE
          </div>
          <span className="text-[11px] font-mono text-slate-500 tracking-wider">
            ENV: PRODUCTION [v2.4]
          </span>
        </div>

        {/* CENTER BRAND & SYSTEM CONSOLE */}
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center relative">
          
          {/* Ambient Violet/Indigo Radial Glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/[0.08] blur-[120px] rounded-full pointer-events-none -z-10" />

          {/* Giant "HEMANT." Heading with Metallic Gradient */}
          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[18vw] font-bold uppercase leading-none tracking-[-0.08em] sm:text-[10rem] lg:text-[12rem] select-none"
          >
            <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Hemant
            </span>
            <span className="text-indigo-400 drop-shadow-[0_0_25px_rgba(99,102,241,0.7)]">
              .
            </span>
          </Motion.h1>

          {/* Dynamic Engineering Telemetry & High-Precision Progress Bar */}
          <div className="mt-10 w-full max-w-2xl sm:mt-14">
            {/* Header: Dynamic Telemetry Terminal Log + Precision Counter */}
            <div className="mb-2.5 flex items-center justify-between font-mono text-xs gap-3">
              <div className="flex items-center gap-2 text-slate-400 tracking-normal min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">{getTelemetryLog(clampedProgress)}</span>
              </div>
              <span className="text-sky-400 font-mono text-xs font-semibold tabular-nums shrink-0">
                [ {displayPercent}% ]
              </span>
            </div>

            {/* High-Precision Progress Bar Track & Glow Head */}
            <div className="h-1.5 w-full bg-white/[0.05] border border-white/[0.08] rounded-full overflow-hidden backdrop-blur-sm">
              <Motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-400 relative transition-all duration-150 ease-out shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                animate={{ width: `${clampedProgress}%` }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: TELEMETRY METADATA */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 tracking-wider uppercase">
          <span>HOST: VERCEL_EDGE // ASIA-SOUTH1</span>
          <span>HEMANT PANDEY — FULL STACK LEAD</span>
        </div>

      </div>
    </Motion.div>
  );
};

export default LoadingScreen;