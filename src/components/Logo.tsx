
import { cn } from "@/lib/utils";

interface LogoProps {
  isScrolled: boolean;
  onClick: () => void;
}

const Logo = ({ isScrolled, onClick }: LogoProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-bold text-primary hover:text-primary/80 whitespace-nowrap transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1",
        "flex-shrink-0 font-mono tracking-tight hover:scale-105 active:scale-95",
        isScrolled ? "text-base sm:text-lg lg:text-xl" : "text-lg sm:text-xl lg:text-2xl"
      )}
    >
      <span className="bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent">
        &lt;Anuj.Garg /&gt;
      </span>
    </button>
  );
};

export default Logo;
