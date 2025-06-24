
import { motion } from "framer-motion";
import { Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo, useMemo } from "react";
import { useImagePreloader } from "@/hooks/useImagePreloader";

// Critical hero image - preload with high priority
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80";

const Hero = memo(() => {
  // Preload critical hero image
  const { isLoading: imageLoading } = useImagePreloader([
    { src: HERO_IMAGE_URL, priority: 'high', crossorigin: 'anonymous' }
  ]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }), []);

  const textVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  }), []);

  const floatVariants = useMemo(() => ({
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);

  // Optimized background styles
  const backgroundStyle = useMemo(() => ({
    background: "linear-gradient(135deg, hsl(var(--card)/0.95) 0%, hsl(var(--card)/0.85) 100%)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 20px 50px -12px hsl(var(--foreground)/0.08), 0 0 0 1px hsl(var(--border)/0.4)",
    border: "1px solid hsl(var(--border)/0.4)",
  }), []);

  // Optimized avatar component with critical loading
  const OptimizedAvatar = memo(({ size }: { size: number }) => {
    const glowStyle = useMemo(() => ({
      background: "radial-gradient(circle, hsl(var(--primary)/0.25) 0%, hsl(var(--accent)/0.15) 40%, transparent 70%)",
      width: size * 1.15,
      height: size * 1.15,
      filter: 'blur(16px)',
    }), [size]);

    return (
      <div className="flex justify-center items-center relative">
        <div
          className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
          style={glowStyle}
        />
        {imageLoading ? (
          <div 
            className="rounded-full shadow-2xl border-4 border-primary/30 dark:border-primary/40 bg-card relative z-10 ring-2 ring-accent/20 dark:ring-accent/30 animate-pulse bg-gradient-to-r from-primary/20 to-accent/20"
            style={{ width: size, height: size }}
          />
        ) : (
          <img
            src={HERO_IMAGE_URL}
            alt="MacBook showing Xcode with code"
            className="rounded-full shadow-2xl border-4 border-primary/30 dark:border-primary/40 bg-card object-cover relative z-10 ring-2 ring-accent/20 dark:ring-accent/30"
            width={size}
            height={size}
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        )}
      </div>
    );
  });

  OptimizedAvatar.displayName = "OptimizedAvatar";

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden pt-16 sm:pt-20 lg:pt-24"
      style={{ zIndex: 1 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 max-w-4xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 flex flex-col items-center rounded-2xl sm:rounded-3xl"
        style={backgroundStyle}
      >
        {/* Profile Avatar - Responsive and optimized */}
        <motion.div
          className="relative mb-4 sm:mb-6 lg:mb-8 flex flex-col items-center"
          variants={textVariants}
          animate="animate"
        >
          <motion.div 
            className="relative z-10"
            variants={floatVariants}
            animate="animate"
          >
            <div className="sm:hidden">
              <OptimizedAvatar size={120} />
            </div>
            <div className="hidden sm:block md:hidden">
              <OptimizedAvatar size={140} />
            </div>
            <div className="hidden md:block lg:hidden">
              <OptimizedAvatar size={160} />
            </div>
            <div className="hidden lg:block xl:hidden">
              <OptimizedAvatar size={180} />
            </div>
            <div className="hidden xl:block">
              <OptimizedAvatar size={200} />
            </div>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-mono leading-tight"
          variants={textVariants}
        >
          Anuj Garg
        </motion.h1>

        {/* Enhanced Subtitle */}
        <motion.div
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-4 sm:mb-6 lg:mb-8 leading-relaxed px-2 max-w-3xl"
          variants={textVariants}
        >
          <span className="text-foreground/95">iOS Developer • </span>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-bold">
            Full-Stack Engineer
          </span>
          <span className="text-foreground/95"> • Problem Solver</span>
        </motion.div>

        {/* Status Badges */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 w-full max-w-2xl"
          variants={textVariants}
        >
          <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-emerald-400/30 px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <span className="relative text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 text-center block">
              🎓 B.E. CSE @ Chitkara Univ. (9.38 CGPA)
            </span>
          </div>
          <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 dark:border-purple-400/30 px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-sm hover:scale-105 transition-all duration-300">
            <span className="relative text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-300 text-center block">
              💼 Tech Intern @ OLX
            </span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8"
          variants={textVariants}
        >
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-110"
          >
            <a
              href="https://github.com/Anuj3366"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-110"
          >
            <a
              href="https://www.linkedin.com/in/anujgarg3366/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md px-2"
          variants={textVariants}
        >
          <Button
            asChild
            className="w-full sm:flex-1 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base font-bold rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <a href="#contact" className="flex items-center justify-center gap-2">
              Contact Me
              <span className="inline-block transform transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:flex-1 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base font-bold rounded-full bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/70 hover:bg-card/70 hover:scale-105 transition-all duration-300"
          >
            <a
              href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              Resume
              <span className="inline-block transform transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
