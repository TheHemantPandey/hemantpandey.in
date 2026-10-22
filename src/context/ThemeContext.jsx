/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  resolvedTheme: 'dark',
  systemTheme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    root.classList.remove('light');
    root.classList.add('dark');
    root.style.colorScheme = 'dark';

    try {
      localStorage.setItem('theme', 'dark');
    } catch {
      // Ignore localStorage access restrictions
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: 'dark',
        resolvedTheme: 'dark',
        systemTheme: 'dark',
        setTheme: () => {},
        toggleTheme: () => {},
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

