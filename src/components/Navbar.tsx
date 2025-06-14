
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

  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

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
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-white/95 dark:bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-xl py-2"
          : "bg-white/80 dark:bg-background/80 backdrop-blur-lg border-b border-border/30 shadow-lg py-3"
      )}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavClick("#home")}
          className={cn(
            "font-bold text-primary hover:text-primary/80 whitespace-nowrap transition-all duration-300 font-headline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-2 py-1",
            isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
          )}
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            &lt;Anuj.Garg /&gt;
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <ul className="flex space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <li key={link.title}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium group py-2 px-2 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
                </button>
              </li>
            ))}
          </ul>
          <div className="ml-2 lg:ml-4 pl-2 lg:pl-4 border-l border-border/50">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
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
              className="pt-8 px-0 w-[85vw] max-w-sm flex flex-col items-stretch bg-white/95 dark:bg-background/95 backdrop-blur-xl shadow-2xl border-l border-border/30"
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
    </header>
  );
};

export default Navbar;
