
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";

// Helper: Get system dark mode preference
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Helper: Get initial theme (prioritize system preference, then localStorage)
const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  
  // First check if user has a stored preference
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  
  // If no stored preference, use system preference
  return getSystemTheme();
};

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  // Update html class & localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply initial theme immediately on component mount
  useEffect(() => {
    const initialTheme = getInitialTheme();
    const root = window.document.documentElement;
    if (initialTheme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    setTheme(initialTheme);
  }, []);

  // Respond to system preference changes only if user hasn't set a manual preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a theme
      const stored = localStorage.getItem("theme");
      if (!stored) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Store user's manual preference
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">
        {theme === "light" ? "Light" : "Dark"}
      </span>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  );
};

export default ThemeToggle;
