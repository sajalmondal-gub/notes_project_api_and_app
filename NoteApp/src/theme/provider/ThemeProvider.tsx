import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightMode } from '../modes/light';
import { darkMode } from '../modes/dark';
import { SemanticColors } from '../semantic/colors';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  colors: SemanticColors;
  mode: ThemeMode;
  isDark: boolean;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const isDark =
    mode === 'dark' || (mode === 'system' && systemColorScheme === 'dark');

  const themeColors = isDark ? darkMode : lightMode;

  const value = {
    colors: themeColors,
    mode,
    isDark,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
