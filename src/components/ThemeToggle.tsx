
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ToggleLeft, ToggleRight } from "lucide-react";

// Helper: Get system dark mode preference
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Helper: Get initial theme (from localStorage or system)
const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
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

  // Respond to system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      // Only update if user hasn't picked a theme
      const stored = localStorage.getItem("theme");
      if (!stored) setTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () =>
    setTheme((cur) => (cur === "light" ? "dark" : "light"));

  return (
    <button
      type="button"
      className="flex items-center gap-2 px-2 py-1 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      onClick={toggleTheme}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      tabIndex={0}
    >
      {theme === "dark" ? (
        <ToggleRight size={22} className="text-primary animate-glow" />
      ) : (
        <ToggleLeft size={22} className="text-muted-foreground" />
      )}
      <span className="text-xs text-muted-foreground group-hover:text-primary transition hidden sm:inline">
        {theme === "light" ? "Light" : "Dark"}
      </span>
      <Switch
        checked={theme === "dark"}
        aria-label="Theme Switch"
        tabIndex={-1}
        className="ml-1"
        onCheckedChange={toggleTheme}
      />
    </button>
  );
};

export default ThemeToggle;
