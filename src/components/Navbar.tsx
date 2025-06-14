
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOptimizedScroll } from "@/hooks/usePerformanceOptimization";
import ThemeToggle from "@/components/ThemeToggle";

// --- SCROLLSPY HOOK (IN-COMPONENT for size) ---
const useScrollSpy = (sectionIds: string[], offset = 90) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      let found = sectionIds[0];
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.querySelector(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section is at least partially visible, slightly above nav bar
        if (rect.top - offset <= 0 && rect.bottom > 60) {
          found = sectionIds[i];
        }
      }
      setActiveId(found);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // call once in case user reloads mid-scroll
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [sectionIds.join(",")]);

  return activeId;
};

const Navbar = () => {
  const isMobile = useIsMobile();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useOptimizedScroll(setScrollPosition);

  // Memoized navigation links
  const navLinks = useMemo(() => [
    { title: "Home", href: "#home" },
    { title: "About", href: "#about" },
    { title: "Experience", href: "#experience" },
    { title: "Skills", href: "#skills" },
    { title: "Projects", href: "#projects" },
    { title: "Achievements", href: "#achievements" },
    { title: "Contact", href: "#contact" },
  ], []);

  const sectionIds = useMemo(() => 
    navLinks.map(link => link.href), [navLinks]);
  const activeSection = useScrollSpy(sectionIds);

  const isScrolled = scrollPosition > 50;

  // Optimized smooth scroll function
  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  }, []);

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

  // Detect current theme (for conditional styling in SheetContent)
  const [isDark, setIsDark] = useState(false);
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
    <header
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-300 ease-out",
        "bg-white/95 dark:bg-background/95 backdrop-blur-xl",
        "border-b border-gray-200/60 dark:border-border/40",
        "shadow-sm dark:shadow-lg",
        isScrolled 
          ? "py-2 shadow-lg dark:shadow-xl bg-white/98 dark:bg-background/98" 
          : "py-3 lg:py-4"
      )}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo with enhanced animation */}
        <button
          onClick={() => handleNavClick("#home")}
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

        {/* Desktop Navigation with enhanced animations */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center max-w-2xl">
          <ul className="flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <li key={link.title}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "relative text-gray-700 dark:text-foreground/80 hover:text-primary transition-all duration-300 font-medium group py-2 px-3 xl:px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg text-sm xl:text-base hover:scale-105 active:scale-95",
                    activeSection === link.href &&
                      "text-primary font-semibold bg-primary/5 shadow focus:ring-2 focus:ring-primary",
                  )}
                >
                  {link.title}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full",
                      activeSection === link.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  ></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side - Theme toggle and mobile menu */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          {/* Mobile/Tablet Menu */}
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
                  // FIX: use solid backgrounds for better visibility
                  "pt-6 px-0 w-[280px] sm:w-[320px] flex flex-col",
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
                <div className="flex items-center justify-center px-6 mb-6">
                  <button
                    onClick={() => handleNavClick("#home")}
                    className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1 font-mono hover:scale-105 active:scale-95 transition-transform duration-200"
                    aria-label="Go to home"
                  >
                    &lt;Anuj.Garg /&gt;
                  </button>
                </div>
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
        </div>
      </div>
    </header>
  );
};

export default Navbar;
