
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOptimizedScroll } from "@/hooks/usePerformanceOptimization";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Optimized scroll handler
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

  const isScrolled = scrollPosition > 50;

  // Optimized smooth scroll function
  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      // Use native smooth scrolling with proper behavior
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
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
                  className="relative text-gray-700 dark:text-foreground/80 hover:text-primary transition-all duration-300 font-medium group py-2 px-3 xl:px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg text-sm xl:text-base hover:scale-105 active:scale-95"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 scale-x-0 group-hover:scale-x-100 rounded-full"></span>
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
                className="pt-6 px-0 w-[280px] sm:w-[320px] flex flex-col bg-white/98 dark:bg-background/98 backdrop-blur-xl shadow-2xl border-l border-gray-200/60 dark:border-border/30"
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
                          className="w-full text-left rounded-xl px-4 py-3 text-base font-medium text-gray-700 dark:text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 hover:scale-[1.02] active:scale-[0.98]"
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
