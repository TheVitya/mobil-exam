import React, { createContext, useContext, useState, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';
import { MMKV_KEYS } from '../constants';
import { lightColors, darkColors } from '../styles';
import { Appearance } from 'react-native';

const storage = new MMKV();
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemScheme = Appearance.getColorScheme();
  const savedTheme = storage.getString(MMKV_KEYS.THEME);
  const [theme, setTheme] = useState(savedTheme || systemScheme || 'light');

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (!savedTheme) setTheme(colorScheme);
    });
    return () => listener.remove();
  }, [savedTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storage.set(MMKV_KEYS.THEME, newTheme);
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 