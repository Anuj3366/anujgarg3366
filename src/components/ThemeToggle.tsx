
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-muted-foreground transition-colors duration-200">
        {resolvedTheme === "light" ? "Light" : "Dark"}
      </span>
      <Switch
        checked={resolvedTheme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
        className="data-[state=checked]:bg-primary transition-all duration-200 hover:scale-105"
      />
    </div>
  );
};

export default ThemeToggle;
