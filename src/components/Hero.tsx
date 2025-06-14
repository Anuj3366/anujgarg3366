
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import MacXcodeImage from "./MacXcodeImage";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 25 },
    },
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen section-spaced text-center overflow-hidden pt-20 sm:pt-24"
      style={{ zIndex: 1 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 max-w-5xl w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-16 lg:py-16 flex flex-col items-center backdrop-blur-xl bg-white/15 dark:bg-black/25 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 mx-auto"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Profile Avatar */}
        <motion.div
          className="relative mb-6 sm:mb-8 lg:mb-10 flex flex-col items-center"
          variants={textVariants}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-lg animate-pulse"></div>
            <MacXcodeImage />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-headline drop-shadow-glow"
          variants={textVariants}
        >
          Anuj Garg
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-foreground/90 mb-6 sm:mb-8 leading-relaxed px-2"
          variants={textVariants}
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            iOS Developer • Full-Stack Engineer • Problem Solver
          </span>
        </motion.div>

        {/* Enhanced Status Badges */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-6 sm:mb-8 lg:mb-10 w-full"
          variants={textVariants}
        >
          <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 text-center block">
              🎓 B.E. CSE @ Chitkara Univ. (9.38 CGPA)
            </span>
          </div>
          <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-2 sm:px-6 sm:py-3 backdrop-blur-sm w-full sm:w-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-300 text-center block">
              💼 Tech Intern @ OLX
            </span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-6 sm:mb-8 lg:mb-10"
          variants={textVariants}
        >
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
          >
            <a
              href="https://github.com/Anuj3366"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
          >
            <a
              href="https://www.linkedin.com/in/anujgarg3366/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md px-4"
          variants={textVariants}
        >
          <Button
            asChild
            className="w-full sm:flex-1 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold rounded-full cta-btn-gradient shadow-xl hover:shadow-2xl hover:from-primary/90 hover:to-accent/90 cta-arrow-group"
          >
            <a href="#contact" className="flex items-center justify-center gap-2">
              Contact Me
              <span className="cta-arrow inline-block ml-1 transition-transform">&rarr;</span>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:flex-1 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border-2 border-white/30 hover:border-primary/70 hover:bg-white/20 dark:hover:bg-black/20 hover:scale-105 cta-arrow-group"
          >
            <a
              href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5" />
              Resume
              <span className="cta-arrow inline-block ml-1 transition-transform">&rarr;</span>
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
