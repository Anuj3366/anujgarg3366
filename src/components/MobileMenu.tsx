
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";

interface NavItem {
  title: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavItem[];
  activeSection: string;
  onNavClick: (href: string) => void;
}

const MobileMenu = ({ navLinks, activeSection, onNavClick }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleNavClick = (href: string) => {
    onNavClick(href);
    setIsOpen(false);
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Detect current theme
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    window.addEventListener("storage", check);
    const mo = new MutationObserver(check);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener("storage", check);
      mo.disconnect();
    };
  }, []);

  return (
    <div className="lg:hidden flex items-center gap-2">
      <div className="sm:hidden">
        <ThemeToggle />
      </div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            className={cn(
              "p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50",
              "bg-white/90 dark:bg-background/70 backdrop-blur-sm",
              "border border-gray-300/60 dark:border-border/50",
              "hover:border-primary/50 hover:bg-white dark:hover:bg-background/80",
              "shadow-sm dark:shadow-none hover:scale-105 active:scale-95"
            )}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-5 h-5">
              <Menu 
                size={20} 
                className={cn(
                  "text-gray-700 dark:text-foreground/80 absolute inset-0 transition-all duration-300",
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                )} 
              />
              <X 
                size={20} 
                className={cn(
                  "text-gray-700 dark:text-foreground/80 absolute inset-0 transition-all duration-300",
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                )} 
              />
            </div>
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className={cn(
            "pt-20 px-0 w-[280px] sm:w-[320px] flex flex-col",
            "shadow-2xl border-l border-gray-200/60 dark:border-border/30",
            isDark
              ? "bg-background text-foreground"
              : "bg-white text-gray-800",
            "backdrop-blur-xl"
          )}
          style={
            !isDark
              ? { backgroundColor: "#fff", boxShadow: "0 4px 32px 0 rgba(0,0,0,0.13)" }
              : undefined
          }
        >
          <nav className="flex flex-col gap-1 px-4 flex-1">
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <li
                  key={link.title}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "w-full text-left rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 border border-transparent backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50",
                      !isDark && "text-gray-800 hover:bg-primary/10 hover:text-primary",
                      isDark && "text-foreground/80 hover:bg-primary/10 hover:text-primary",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      activeSection === link.href && "border border-primary text-primary font-semibold bg-primary/5 shadow",
                    )}
                    style={
                      activeSection === link.href
                        ? !isDark
                          ? { background: "rgba(37,99,235,0.08)", borderColor: "#2563eb", color: "#2563eb" }
                          : { background: "rgba(59,130,246,0.14)", borderColor: "#38bdf8", color: "#38bdf8" }
                        : undefined
                    }
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
