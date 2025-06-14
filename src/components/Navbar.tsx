
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

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        // Enhanced navbar background: gradient + strong blur + border
        "bg-gradient-to-r from-white/90 via-white/85 to-accent/10 dark:from-background/95 dark:via-background/85 dark:to-accent/10",
        "backdrop-blur-lg border-b border-muted/60 shadow-md"
      )}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <a
          href="#home"
          className="text-2xl font-bold text-primary hover:text-primary/80 whitespace-nowrap"
        >
          &lt;Anuj.Garg /&gt;
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.title}>
                <a
                  href={link.href}
                  className="text-gray-700 dark:text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-6">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {/* Removed duplicate ThemeToggle here */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="text-gray-700 dark:text-foreground/90"
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="pt-8 px-0 w-[80vw] max-w-xs flex flex-col items-stretch bg-white/90 dark:bg-background/95 backdrop-blur-glass shadow-2xl border-0"
            >
              <div className="flex items-center justify-between px-6 mb-6">
                <a
                  href="#home"
                  className="text-xl font-bold text-primary whitespace-nowrap"
                  tabIndex={0}
                  aria-label="Go home"
                >
                  &lt;Anuj.Garg /&gt;
                </a>
                {/* Close button removed as requested */}
              </div>
              <nav className="flex flex-col gap-2 px-4">
                <ul className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="block rounded-lg px-5 py-3 text-lg font-medium text-gray-700 dark:text-foreground/90 hover:bg-primary/10 hover:text-primary transition-colors active:bg-primary/15"
                        tabIndex={0}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                  <li className="mt-3 flex md:hidden">
                    <ThemeToggle />
                  </li>
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

