
import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOptimizedScroll } from "@/hooks/usePerformanceOptimization";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import NavLink from "@/components/NavLink";
import MobileMenu from "@/components/MobileMenu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [scrollPosition, setScrollPosition] = useState(0);

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
        {/* Logo */}
        <Logo 
          isScrolled={isScrolled} 
          onClick={() => handleNavClick("#home")} 
        />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center max-w-2xl">
          <ul className="flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((link) => (
              <li key={link.title}>
                <NavLink 
                  title={link.title}
                  href={link.href}
                  isActive={activeSection === link.href}
                  onClick={handleNavClick}
                />
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side - Theme toggle and mobile menu */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <MobileMenu 
            navLinks={navLinks}
            activeSection={activeSection}
            onNavClick={handleNavClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
