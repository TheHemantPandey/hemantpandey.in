/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      return stored === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  const resolvedTheme = theme;

  // Apply theme classes to document element and sync localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;

    localStorage.setItem('theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    }
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, systemTheme: 'dark', setTheme: changeTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

