
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-white/80 dark:bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-xl py-2"
          : "bg-white/60 dark:bg-background/70 backdrop-blur-lg border-b border-border/30 shadow-lg py-4"
      )}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          className={cn(
            "font-bold text-primary hover:text-primary/80 whitespace-nowrap transition-all duration-300",
            isScrolled ? "text-xl" : "text-2xl"
          )}
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            &lt;Anuj.Garg /&gt;
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.href}
                  className="relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium group py-2"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-4 pl-4 border-l border-border/50">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-foreground/80" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="pt-8 px-0 w-[85vw] max-w-sm flex flex-col items-stretch bg-white/95 dark:bg-background/95 backdrop-blur-xl shadow-2xl border-r border-border/30"
            >
              <div className="flex items-center justify-center px-6 mb-8">
                <a
                  href="#home"
                  className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  tabIndex={0}
                  aria-label="Go home"
                >
                  &lt;Anuj.Garg /&gt;
                </a>
              </div>
              
              <nav className="flex flex-col gap-2 px-4 flex-1">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="block rounded-xl px-6 py-4 text-lg font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20 backdrop-blur-sm"
                        tabIndex={0}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto mb-4 px-6 py-4 border-t border-border/30">
                  <ThemeToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
