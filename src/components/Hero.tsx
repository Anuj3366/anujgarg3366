
import { motion } from "framer-motion";
import { memo, useMemo, useCallback } from "react";
import PerformanceOptimizedAvatar from "./hero/PerformanceOptimizedAvatar";
import StatusBadges from "./hero/StatusBadges";
import SocialLinks from "./hero/SocialLinks";
import CTAButtons from "./hero/CTAButtons";

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80";

const Hero = memo(() => {
  // Memoized animation variants for better performance
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.1,
        duration: 0.6,
        ease: "easeOut"
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.6
      },
    },
  }), []);

  // Memoized background styles
  const backgroundStyle = useMemo(() => ({
    background: "linear-gradient(135deg, hsl(var(--card)/0.95) 0%, hsl(var(--card)/0.85) 100%)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 20px 50px -12px hsl(var(--foreground)/0.08), 0 0 0 1px hsl(var(--border)/0.4)",
    border: "1px solid hsl(var(--border)/0.4)",
  }), []);

  // Optimized scroll handler
  const handleScrollToSection = useCallback((sectionId: string) => {
    const element = document.querySelector(sectionId);
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
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden pt-20 sm:pt-20 lg:pt-24 px-4"
      style={{ zIndex: 1 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 max-w-4xl w-full mx-auto px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 flex flex-col items-center rounded-2xl sm:rounded-3xl"
        style={backgroundStyle}
      >
        {/* Optimized Profile Avatar with responsive sizing */}
        <motion.div
          className="relative mb-4 sm:mb-6 lg:mb-8 flex flex-col items-center"
          variants={itemVariants}
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48">
            <PerformanceOptimizedAvatar 
              imageUrl={HERO_IMAGE_URL} 
              size={192} // Max size for XL screens
            />
          </div>
        </motion.div>

        {/* Fixed heading with better mobile typography */}
        <motion.h1
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-mono leading-tight px-2"
          variants={itemVariants}
        >
          Anuj Garg
        </motion.h1>

        {/* Enhanced subtitle with better responsive text */}
        <motion.div
          className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-4 sm:mb-6 lg:mb-8 leading-relaxed px-2 max-w-3xl"
          variants={itemVariants}
        >
          <span className="text-foreground/95">iOS Developer • </span>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-bold">
            Full-Stack Engineer
          </span>
          <span className="text-foreground/95"> • Problem Solver</span>
        </motion.div>

        {/* Optimized status badges */}
        <StatusBadges variants={itemVariants} />

        {/* Social links with optimized interactions */}
        <SocialLinks variants={itemVariants} />

        {/* CTA buttons with improved accessibility */}
        <CTAButtons 
          variants={itemVariants} 
          onScrollToSection={handleScrollToSection}
        />
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
