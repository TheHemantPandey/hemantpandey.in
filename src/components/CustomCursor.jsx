import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'pointer' | 'text' | 'inspect'
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) ||
      (window.matchMedia('(hover: none)').matches && 'ontouchstart' in window)
    );
  });
  const [rotation, setRotation] = useState(0);

  const prevPos = useRef({ x: 0, y: 0 });

  // Direct position for zero-latency arrow tip
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing aura physics
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    document.documentElement.classList.add('has-custom-cursor');

    const mql = window.matchMedia('(pointer: coarse)');
    const handlePointerChange = (e) => {
      setIsTouchDevice(e.matches && !window.matchMedia('(pointer: fine)').matches);
    };
    mql.addEventListener?.('change', handlePointerChange);

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
      if (!isVisible) setIsVisible(true);

      // Calculate subtle dynamic velocity tilt for the arrow
      const dx = clientX - prevPos.current.x;
      const dy = clientY - prevPos.current.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Subtle tilt clamp (-20deg to 20deg) relative to default angle
        const clampedAngle = Math.max(-20, Math.min(20, (angle - 45) * 0.15));
        setRotation(clampedAngle);
      }
      prevPos.current = { x: clientX, y: clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleOver = (e) => {
      const target = e.target;

      // Text / Input mode
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        setCursorState('text');
        return;
      }

      // Interactive Clickables (Buttons, Links, Pills)
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive')
      ) {
        setCursorState('pointer');
        return;
      }

      // Project cards / Code inspection
      if (
        target.closest('pre') ||
        target.closest('code') ||
        target.closest('.project-card') ||
        target.closest('[data-inspect="true"]')
      ) {
        setCursorState('inspect');
        return;
      }

      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mql.removeEventListener?.('change', handlePointerChange);
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 999999 }}
    >
      {/* 1. Trailing Ambient Aura */}
      {cursorState !== 'text' && (
        <motion.div
          className="fixed top-0 left-0 rounded-full pointer-events-none"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: '-50%',
            translateY: '-50%',
            background:
              cursorState === 'pointer'
                ? 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0) 70%)'
                : 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(56, 189, 248, 0) 70%)',
          }}
          animate={{
            width: cursorState === 'pointer' ? 48 : 28,
            height: cursorState === 'pointer' ? 48 : 28,
            opacity: isVisible ? 1 : 0,
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      )}

      {/* 2. Main Precision Arrow Rig */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          // Arrow tip alignment offset (the tip of standard pointer is top-left at 3px, 2px)
          translateX: cursorState === 'text' ? '-50%' : '-3px',
          translateY: cursorState === 'text' ? '-50%' : '-2px',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : cursorState === 'pointer' ? 1.15 : 1,
          rotate: cursorState === 'default' ? rotation : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
      >
        {/* State A: Precision Developer Arrow Pointer */}
        {cursorState !== 'text' && (
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_10px_rgba(56,189,248,0.5)]"
            >
              {/* Sharp Dark Outer Stroke */}
              <path
                d="M3 2L10.5 21L13.8 13.8L21 10.5L3 2Z"
                fill={cursorState === 'pointer' ? '#6366f1' : '#0f172a'}
                stroke={cursorState === 'pointer' ? '#818cf8' : '#38bdf8'}
                strokeWidth="1.75"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Core Accent Dot on Arrow Blade */}
              <circle
                cx="9"
                cy="9"
                r="1.2"
                fill={cursorState === 'pointer' ? '#ffffff' : '#38bdf8'}
              />
            </svg>

            {/* Context Badge for Clickables */}
            {cursorState === 'pointer' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 18 }}
                className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-indigo-950/90 border border-indigo-400/50 text-[10px] font-mono text-indigo-200 font-semibold shadow-lg backdrop-blur-md"
              >
                click
              </motion.div>
            )}

            {/* Context Badge for Inspectables */}
            {cursorState === 'inspect' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 18 }}
                className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-slate-900/90 border border-sky-400/50 text-[10px] font-mono text-sky-200 font-semibold shadow-lg backdrop-blur-md"
              >
                // view
              </motion.div>
            )}
          </div>
        )}

        {/* State B: Terminal Text Caret for Inputs */}
        {cursorState === 'text' && (
          <div className="w-[3px] h-5 bg-sky-400 rounded-sm shadow-[0_0_10px_rgba(56,189,248,0.8)] animate-pulse" />
        )}
      </motion.div>
    </div>
  );
}
