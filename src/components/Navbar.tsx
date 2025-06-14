
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-[100] w-full transition-all duration-500 bg-white/95 dark:bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-xl",
        isScrolled ? "py-2" : "py-3"
      )}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavClick("#home")}
          className={cn(
            "font-bold text-primary hover:text-primary/80 whitespace-nowrap transition-all duration-300 font-headline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1 flex-shrink-0",
            isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
          )}
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            &lt;Anuj.Garg /&gt;
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center">
          <ul className="flex space-x-2 lg:space-x-6">
            {navLinks.map((link) => (
              <li key={link.title}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium group py-2 px-2 lg:px-3 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg text-sm lg:text-base"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  aria-label="Open menu"
                >
                  {isOpen ? (
                    <X size={20} className="text-foreground/80" />
                  ) : (
                    <Menu size={20} className="text-foreground/80" />
                  )}
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="pt-8 px-0 w-[85vw] max-w-sm flex flex-col items-stretch bg-white/98 dark:bg-background/98 backdrop-blur-xl shadow-2xl border-l border-border/30"
              >
                <div className="flex items-center justify-center px-6 mb-8">
                  <button
                    onClick={() => handleNavClick("#home")}
                    className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1"
                    aria-label="Go home"
                  >
                    &lt;Anuj.Garg /&gt;
                  </button>
                </div>
                
                <nav className="flex flex-col gap-2 px-4 flex-1">
                  <ul className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                      <li key={link.title}>
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="w-full text-left rounded-xl px-6 py-4 text-lg font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
