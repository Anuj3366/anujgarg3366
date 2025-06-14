
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import MacXcodeImage from "./MacXcodeImage";
import HeroBackground from "./HeroBackground";

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
      className="relative flex flex-col items-center justify-center min-h-screen py-20 sm:py-32 text-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 max-w-4xl w-full px-6 py-12 sm:px-16 sm:py-16 flex flex-col items-center backdrop-blur-xl bg-white/15 dark:bg-black/25 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 mx-auto"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Profile Avatar */}
        <motion.div
          className="relative mb-8 sm:mb-10 flex flex-col items-center"
          variants={textVariants}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-lg animate-pulse"></div>
            <MacXcodeImage />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight mb-4 sm:mb-6"
          variants={textVariants}
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 40px hsl(var(--primary) / 0.3)",
          }}
        >
          Anuj Garg
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          className="text-lg sm:text-2xl md:text-3xl font-semibold text-foreground/90 mb-6 sm:mb-8 leading-relaxed"
          variants={textVariants}
        >
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            iOS Developer • Full-Stack Engineer • Problem Solver
          </span>
        </motion.div>

        {/* Enhanced Status Badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-10"
          variants={textVariants}
        >
          <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 px-6 py-3 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-sm font-bold text-emerald-700 dark:text-emerald-300">
              🎓 B.E. CSE @ Chitkara Univ. (9.38 CGPA)
            </span>
          </div>
          <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-6 py-3 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-sm font-bold text-purple-700 dark:text-purple-300">
              💼 Tech Intern @ OLX
            </span>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8 sm:mb-10"
          variants={textVariants}
        >
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
          >
            <a
              href="https://github.com/Anuj3366"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
          >
            <a
              href="https://www.linkedin.com/in/anujgarg3366/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
          variants={textVariants}
        >
          <Button
            asChild
            className="w-full sm:flex-1 px-8 py-4 text-base font-bold rounded-full bg-gradient-to-r from-primary via-blue-600 to-accent text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-0 hover:scale-105 hover:from-primary/90 hover:to-accent/90"
          >
            <a href="#contact" className="flex items-center justify-center gap-2">
              Contact Me
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:flex-1 px-8 py-4 text-base font-bold rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm border-2 border-white/30 hover:border-primary/70 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 hover:scale-105"
          >
            <a
              href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              Resume
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
