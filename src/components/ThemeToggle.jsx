import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const options = [
    { mode: 'light', icon: Sun, label: 'Light Theme' },
    { mode: 'system', icon: Monitor, label: 'System Theme' },
    { mode: 'dark', icon: Moon, label: 'Dark Theme' }
  ];

  const handleKeyDown = (e) => {
    const currentIndex = options.findIndex((opt) => opt.mode === theme);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % options.length;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + options.length) % options.length;
      e.preventDefault();
    }

    if (nextIndex !== currentIndex) {
      setTheme(options[nextIndex].mode);
      // Wait for React update and focus the new button
      setTimeout(() => {
        const buttons = e.currentTarget.querySelectorAll('button');
        buttons[nextIndex]?.focus();
      }, 0);
    }
  };

  return (
    <div 
      className="flex items-center gap-1 p-1 rounded-full border relative z-10 select-none border-[var(--border)] bg-[var(--surface)]"
      role="radiogroup"
      aria-label="Select Theme Mode"
      onKeyDown={handleKeyDown}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.mode;

        return (
          <button
            key={opt.mode}
            type="button"
            onClick={() => setTheme(opt.mode)}
            tabIndex={isActive ? 0 : -1}
            className={`relative flex items-center justify-center h-8 w-8 rounded-full cursor-none transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--text-primary)] focus-visible:outline-offset-1 ${
              isActive 
                ? 'text-[var(--bg-primary)]' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            role="radio"
            aria-checked={isActive}
            aria-label={opt.label}
            title={opt.label}
          >
            {isActive && (
              <Motion.div
                layoutId="activeThemePill"
                className="absolute inset-0 rounded-full bg-[var(--text-primary)] z-0"
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26
                }}
              />
            )}
            <span className="relative z-10">
              <Icon size={14} strokeWidth={isActive ? 2.5 : 2} />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
