import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useColorScheme } from 'react-native';
import { Theme, getColors } from '../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'quotes_app_theme';

type ThemeContextType = {
  theme: Theme;
  colors: ReturnType<typeof getColors>;
  toggleTheme: () => void;
  saveTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(() => {
    return systemColorScheme === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      } else {
        const initialTheme = systemColorScheme === 'dark' ? 'dark' : 'light';
        setTheme(initialTheme);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
      const fallbackTheme = systemColorScheme === 'dark' ? 'dark' : 'light';
      setTheme(fallbackTheme);
    }
  };

  const saveTheme = useCallback(async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [theme]);

  const colors = getColors(theme);

  const contextValue: ThemeContextType = useMemo(
    () => ({
      theme,
      colors,
      toggleTheme,
      saveTheme,
    }),
    [theme, colors, toggleTheme, saveTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
