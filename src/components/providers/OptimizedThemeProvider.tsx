
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'theme-preference';

// Optimized theme detection
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as Theme) || 'system';
  } catch {
    return 'system';
  }
};

// Apply theme with minimal DOM operations
const applyTheme = (theme: ResolvedTheme) => {
  if (typeof window === 'undefined') return;
  
  requestAnimationFrame(() => {
    const root = document.documentElement;
    const isDark = theme === 'dark';
    
    root.classList.toggle('dark', isDark);
    
    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
    }
  });
};

interface OptimizedThemeProviderProps {
  children: ReactNode;
}

export function OptimizedThemeProvider({ children }: OptimizedThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    const systemTheme = getSystemTheme();
    const storedTheme = getStoredTheme();
    return storedTheme === 'system' ? systemTheme : (storedTheme as ResolvedTheme);
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    const resolved = newTheme === 'system' ? getSystemTheme() : (newTheme as ResolvedTheme);
    setResolvedTheme(resolved);
    
    applyTheme(resolved);
    
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      console.warn('Failed to save theme preference');
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const newSystemTheme = getSystemTheme();
        setResolvedTheme(newSystemTheme);
        applyTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Apply initial theme
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useOptimizedTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useOptimizedTheme must be used within OptimizedThemeProvider');
  }
  return context;
}
