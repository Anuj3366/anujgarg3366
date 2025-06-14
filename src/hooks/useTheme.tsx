
import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
}

// Constants for storage keys
const STORAGE_KEY = 'theme-preference';
const STORAGE_TYPE = 'localStorage'; // Use localStorage for persistence across sessions

// Helper: Get system theme preference
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Helper: Get stored theme preference
const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error);
  }
  
  return 'system'; // Default to system preference
};

// Helper: Store theme preference
const storeTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error);
  }
};

// Helper: Apply theme to document
const applyTheme = (resolvedTheme: ResolvedTheme): void => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const isDark = resolvedTheme === 'dark';
  
  // Use requestAnimationFrame for smooth transitions
  requestAnimationFrame(() => {
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
    }
  });
};

export const useTheme = () => {
  const [themeState, setThemeState] = useState<ThemeState>(() => {
    const systemTheme = getSystemTheme();
    const storedTheme = getStoredTheme();
    const resolvedTheme = storedTheme === 'system' ? systemTheme : storedTheme as ResolvedTheme;
    
    return {
      theme: storedTheme,
      resolvedTheme,
      systemTheme,
    };
  });

  // Memoized theme setter
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(prev => {
      const resolvedTheme = newTheme === 'system' ? prev.systemTheme : newTheme as ResolvedTheme;
      
      const newState = {
        ...prev,
        theme: newTheme,
        resolvedTheme,
      };
      
      // Apply theme immediately
      applyTheme(resolvedTheme);
      
      // Store preference
      storeTheme(newTheme);
      
      return newState;
    });
  }, []);

  // Toggle between light and dark (skip system)
  const toggleTheme = useCallback(() => {
    setTheme(themeState.resolvedTheme === 'light' ? 'dark' : 'light');
  }, [themeState.resolvedTheme, setTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme: ResolvedTheme = e.matches ? 'dark' : 'light';
      
      setThemeState(prev => {
        const newState = {
          ...prev,
          systemTheme: newSystemTheme,
          resolvedTheme: prev.theme === 'system' ? newSystemTheme : prev.resolvedTheme,
        };
        
        // Apply theme if using system preference
        if (prev.theme === 'system') {
          applyTheme(newSystemTheme);
        }
        
        return newState;
      });
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Apply initial theme on mount
  useEffect(() => {
    applyTheme(themeState.resolvedTheme);
  }, []);

  return {
    theme: themeState.theme,
    resolvedTheme: themeState.resolvedTheme,
    systemTheme: themeState.systemTheme,
    setTheme,
    toggleTheme,
  };
};
