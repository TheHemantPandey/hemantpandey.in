import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScrollable > 0 ? (window.scrollY / maxScrollable) * 100 : 0;
      setScrollProgress(Math.min(Math.max(nextProgress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[110] h-[4px] w-full bg-[var(--surface-hover)]">
      <motion.div
        className="h-full bg-gradient-to-r from-[var(--text-secondary)] to-[var(--text-primary)]"
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      />
    </div>
  );
};

export default ScrollIndicator;
