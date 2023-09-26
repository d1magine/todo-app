import React, { createContext, useContext, useState, useEffect } from 'react';

import { Theme } from '../types/theme';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeContext.Provider was not found');
  }

  return themeContext;
}

// Получить текущую тему
function getTheme() {
  const theme = window?.localStorage?.getItem('theme');

  if (theme && Object.values(Theme).includes(theme as Theme)) {
    return theme as Theme;
  }

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');

  if (userMedia.matches) {
    return Theme.Light;
  }

  return Theme.Dark;
}

export { useTheme, ThemeProvider };
