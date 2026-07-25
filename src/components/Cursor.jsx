import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredEl, setHoveredEl] = useState(null);
  const [hoveredRect, setHoveredRect] = useState(null);
  const [hoveredRadius, setHoveredRadius] = useState('9999px');
  
  const [isMobile] = useState(() => {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      return window.matchMedia('(pointer: coarse)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isMobile) return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target && typeof e.target.closest === 'function') {
        const interactive = e.target.closest('a, button, input, textarea, .cursor-hover');
        
        if (interactive) {
          if (hoveredEl !== interactive) {
            const rect = interactive.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(interactive);
            
            setHoveredEl(interactive);
            setHoveredRect({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2,
              width: rect.width + 8, // add slight padding around element
              height: rect.height + 8
            });
            setHoveredRadius(computedStyle.borderRadius || '9999px');
          }
        } else {
          setHoveredEl(null);
          setHoveredRect(null);
          setHoveredRadius('9999px');
        }
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, hoveredEl]);

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
          scale: isHovering ? 0 : 1, // hide inner dot on snap latching
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
        className="fixed top-0 left-0 border border-white pointer-events-none z-[9998] mix-blend-difference"
        style={{
          borderRadius: hoveredRadius
        }}
        animate={{
          x: isHovering ? hoveredRect.x - hoveredRect.width / 2 : mousePosition.x - 16,
          y: isHovering ? hoveredRect.y - hoveredRect.height / 2 : mousePosition.y - 16,
          width: isHovering ? hoveredRect.width : 32,
          height: isHovering ? hoveredRect.height : 32,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.6
        }}
      />
    </>
  );
};

export default Cursor;