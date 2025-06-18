
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import MacXcodeImage from "./MacXcodeImage";
import { memo, useMemo } from "react";

const Hero = memo(() => {
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }), []);

  const textVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 25 },
    },
  }), []);

  const floatVariants = useMemo(() => ({
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);

  // Optimized background styles for better dark mode support
  const backgroundStyle = useMemo(() => ({
    background: "linear-gradient(135deg, hsl(var(--card)/0.95) 0%, hsl(var(--card)/0.85) 100%)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)", // Safari support
    boxShadow: "0 25px 60px -12px hsl(var(--foreground)/0.1), 0 0 0 1px hsl(var(--border)/0.5), inset 0 1px 0 hsl(var(--foreground)/0.05)",
    border: "1px solid hsl(var(--border)/0.5)",
  }), []);

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
        {/* Profile Avatar - Made responsive and larger */}
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
            <MacXcodeImage size={120} className="sm:hidden" />
            <MacXcodeImage size={140} className="hidden sm:block md:hidden" />
            <MacXcodeImage size={160} className="hidden md:block lg:hidden" />
            <MacXcodeImage size={180} className="hidden lg:block xl:hidden" />
            <MacXcodeImage size={200} className="hidden xl:block" />
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-mono leading-tight"
          variants={textVariants}
        >
          Anuj Garg
        </motion.h1>

        {/* Enhanced Subtitle with Better Contrast */}
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

        {/* Enhanced Status Badges with better dark mode support */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 w-full max-w-2xl"
          variants={textVariants}
        >
          <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-emerald-400/30 px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 text-center block">
              🎓 B.E. CSE @ Chitkara Univ. (9.38 CGPA)
            </span>
          </div>
          <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 dark:border-purple-400/30 px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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

        {/* Enhanced CTA Buttons */}
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
              <motion.span 
                className="inline-block"
                whileHover={{ x: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                &rarr;
              </motion.span>
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
              <motion.span 
                className="inline-block"
                whileHover={{ x: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                &rarr;
              </motion.span>
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
