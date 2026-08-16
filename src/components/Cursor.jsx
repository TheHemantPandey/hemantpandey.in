import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredEl, setHoveredEl] = useState(null);
  const [hoveredRect, setHoveredRect] = useState(null);
  const [hoveredRadius, setHoveredRadius] = useState('9999px');
  const [badgeText, setBadgeText] = useState('');

  const mouseRef = useRef({ x: 0, y: 0 });

  const [isMobile] = useState(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(pointer: coarse)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isMobile) return;

    const clearHover = () => {
      setHoveredEl(null);
      setHoveredRect(null);
      setHoveredRadius('9999px');
      setBadgeText('');
    };

    const checkElementHover = (clientX, clientY) => {
      const el = document.elementFromPoint(clientX, clientY);
      if (!el || typeof el.closest !== 'function') {
        clearHover();
        return;
      }

      const interactive = el.closest('a, button, input, textarea, .cursor-hover');
      if (!interactive) {
        clearHover();
        return;
      }

      const rect = interactive.getBoundingClientRect();
      // Ignore large containers/rows so they don't form giant screen rectangles
      if (rect.width > 360 || rect.height > 140) {
        clearHover();
        return;
      }

      const computedStyle = window.getComputedStyle(interactive);
      const cursorAttr = interactive.getAttribute('data-cursor');

      setHoveredEl(interactive);
      setHoveredRect({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width + 8,
        height: rect.height + 8
      });
      setHoveredRadius(computedStyle.borderRadius || '9999px');

      if (cursorAttr && ['VIEW', 'LIVE', 'CODE'].includes(cursorAttr.toUpperCase())) {
        setBadgeText(cursorAttr.toUpperCase());
      } else {
        setBadgeText('');
      }
    };

    const updateMousePosition = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
      checkElementHover(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      checkElementHover(mouseRef.current.x, mouseRef.current.y);
    };

    const handleMouseLeave = () => {
      clearHover();
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const isHovering = !!hoveredRect;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 0 : 1, // hide inner dot when magnetic frame is active
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 20,
          mass: 0.1
        }}
      />
      
      {/* Outer Magnetic Ring / Frame */}
      <motion.div
        className="fixed top-0 left-0 border border-white pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center font-mono text-[9px] font-bold tracking-widest text-white uppercase"
        style={{
          borderRadius: badgeText === 'VIEW' ? '9999px' : hoveredRadius
        }}
        animate={{
          x: isHovering && badgeText !== 'VIEW' ? hoveredRect.x - hoveredRect.width / 2 : (badgeText === 'VIEW' ? mousePosition.x - 32 : mousePosition.x - 16),
          y: isHovering && badgeText !== 'VIEW' ? hoveredRect.y - hoveredRect.height / 2 : (badgeText === 'VIEW' ? mousePosition.y - 32 : mousePosition.y - 16),
          width: isHovering && badgeText !== 'VIEW' ? hoveredRect.width : (badgeText === 'VIEW' ? 64 : 32),
          height: isHovering && badgeText !== 'VIEW' ? hoveredRect.height : (badgeText === 'VIEW' ? 64 : 32),
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 22,
          mass: 0.6
        }}
      >
        <AnimatePresence>
          {badgeText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {badgeText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Cursor;