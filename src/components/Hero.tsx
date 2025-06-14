
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import MacXcodeImage from "./MacXcodeImage";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.13, delayChildren: 0.1 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen py-14 sm:py-24 md:py-32 text-center overflow-hidden bg-site-gradient"
      style={{ zIndex: 1 }}
    >
      <HeroBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 max-w-3xl w-full px-8 py-8 sm:px-12 sm:py-12 flex flex-col items-center bg-white/90 dark:bg-black/65 backdrop-blur-glass rounded-3xl shadow-2xl mt-8 mb-12 sm:mt-14 sm:mb-20 mx-auto ring-2 ring-primary/15"
        style={{
          boxShadow:
            "0 8px 40px 10px rgba(80,130,220,0.16), 0 2px 8px 0 rgba(76,110,192,0.1)",
        }}
      >
        {/* MacBook image as the avatar */}
        <motion.div
          className="relative mb-6 sm:mb-8 flex flex-col items-center"
          variants={textVariants}
        >
          <MacXcodeImage />
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-600 to-cyan-400 bg-clip-text text-transparent mb-2 sm:mb-3 drop-shadow-glow"
          variants={textVariants}
          style={{
            WebkitTextStroke: "1px #2563eb44",
            textShadow: "0 2px 20px #fff4, 0 8px 32px #2563eb22",
          }}
        >
          Anuj Garg
        </motion.h1>

        {/* Short bio */}
        <motion.div
          className="text-base sm:text-xl md:text-2xl font-medium text-foreground mb-4 sm:mb-5"
          variants={textVariants}
        >
          iOS Developer, Full-Stack Developer &amp; Problem Solver
        </motion.div>

        {/* Badges */}
        <motion.div
          className="hidden sm:flex flex-wrap items-center justify-center gap-2 mb-6"
          variants={textVariants}
        >
          <span className="rounded-full bg-accent/40 border border-accent/80 px-5 py-2 text-xs font-semibold text-accent-foreground shadow hover:bg-accent/60 transition cursor-default">
            B.E. CSE @ Chitkara Univ. (9.38 CGPA)
          </span>
          <span className="rounded-full bg-accent/30 border border-accent/50 px-5 py-2 text-xs font-semibold text-accent-foreground shadow hover:bg-accent/50 transition cursor-default">
            Tech Intern @ OLX
          </span>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className="hidden sm:flex items-center justify-center gap-6 mb-8"
          variants={textVariants}
        >
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-12 w-12 border-foreground/30 hover:border-primary shadow-xl ring-1 ring-primary/10 hover:ring-primary/40 group bg-white/80 dark:bg-black/30"
          >
            <a
              href="https://github.com/Anuj3366"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-12 w-12 border-foreground/30 hover:border-primary shadow-xl ring-1 ring-primary/10 hover:ring-primary/40 group bg-white/80 dark:bg-black/30"
          >
            <a
              href="https://www.linkedin.com/in/anujgarg3366/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          variants={textVariants}
        >
          <Button
            asChild
            className="px-7 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition duration-200 ring-2 ring-primary/40 hover:ring-primary/80 bg-gradient-to-br from-primary via-blue-500 to-accent text-white"
          >
            <a href="#contact">
              Contact Me
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="px-7 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold border-foreground/30  hover:border-primary hover:text-primary bg-white/70 dark:bg-black/20 backdrop-blur ring-1 ring-muted/40"
          >
            <a
              href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

