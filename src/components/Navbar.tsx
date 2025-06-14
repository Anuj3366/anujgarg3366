
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "#home" },
    { title: "About", href: "#about" },
    { title: "Experience", href: "#experience" },
    { title: "Skills", href: "#skills" },
    { title: "Projects", href: "#projects" },
    { title: "Achievements", href: "#achievements" },
    { title: "Contact", href: "#contact" },
  ];

  const isScrolled = scrollPosition > 50;

  const handleNavClick = (href: string) => {
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
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-300 ease-in-out",
        "bg-white/98 dark:bg-background/98 backdrop-blur-xl",
        "border-b border-gray-200/80 dark:border-border/50",
        "shadow-sm dark:shadow-lg",
        isScrolled ? "py-2 shadow-md dark:shadow-xl" : "py-3 lg:py-4"
      )}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className={cn(
            "font-bold text-primary hover:text-primary/80 whitespace-nowrap transition-all duration-300",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1",
            "flex-shrink-0 font-mono tracking-tight",
            isScrolled ? "text-base sm:text-lg lg:text-xl" : "text-lg sm:text-xl lg:text-2xl"
          )}
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            &lt;Anuj.Garg /&gt;
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center max-w-2xl">
          <ul className="flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <li key={link.title}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-gray-700 dark:text-foreground/80 hover:text-primary transition-all duration-300 font-medium group py-2 px-3 xl:px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg text-sm xl:text-base"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
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
                    "bg-white/90 dark:bg-background/50 backdrop-blur-sm",
                    "border border-gray-300/60 dark:border-border/50",
                    "hover:border-primary/50 hover:bg-white dark:hover:bg-background/70",
                    "shadow-sm dark:shadow-none"
                  )}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  {isOpen ? (
                    <X size={20} className="text-gray-700 dark:text-foreground/80" />
                  ) : (
                    <Menu size={20} className="text-gray-700 dark:text-foreground/80" />
                  )}
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="pt-6 px-0 w-[280px] sm:w-[320px] flex flex-col bg-white/99 dark:bg-background/98 backdrop-blur-xl shadow-2xl border-l border-gray-200/60 dark:border-border/30"
              >
                <div className="flex items-center justify-center px-6 mb-6">
                  <button
                    onClick={() => handleNavClick("#home")}
                    className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1 font-mono"
                    aria-label="Go to home"
                  >
                    &lt;Anuj.Garg /&gt;
                  </button>
                </div>
                
                <nav className="flex flex-col gap-1 px-4 flex-1">
                  <ul className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <li key={link.title}>
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="w-full text-left rounded-xl px-4 py-3 text-base font-medium text-gray-700 dark:text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
