
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import MacXcodeImage from "./MacXcodeImage";
import HeroBackground from "./HeroBackground";

const AVATAR_URL = "/icons/avatar-a.svg";

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

  const avatarAnimation = {
    rotate: [0, 10, -10, 0],
    scale: [1, 1.08, 0.95, 1],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen py-14 sm:py-24 md:py-32 text-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <HeroBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 max-w-3xl w-full px-4 flex flex-col items-center bg-white/80 dark:bg-black/60 backdrop-blur-glass rounded-2xl shadow-lg mt-3 mb-6 mx-auto"
        // Ensures content is above everything visually, adds subtle backdrop & border
        style={{
          boxShadow: "0 4px 32px 4px rgba(76, 110, 192, 0.11)",
        }}
      >
        {/* Avatar with glow */}
        <motion.div
          className="relative mb-6 sm:mb-8"
          variants={textVariants}
        >
          <motion.img
            src={AVATAR_URL}
            alt="A Avatar"
            className="mx-auto rounded-full shadow-lg border-4 border-primary/40 w-24 h-24 sm:w-36 sm:h-36 object-cover bg-white"
            animate={avatarAnimation}
            style={{
              background: "#f8fafc"
            }}
          />
          <div className="absolute inset-0 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #5eead4 0%, #2563eb22 70%, transparent 100%)"
            }}
          />
        </motion.div>

        {/* MacBook with Xcode image */}
        <MacXcodeImage />

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-blue-600 via-fuchsia-600 to-cyan-400 bg-clip-text text-transparent mb-2 sm:mb-3"
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
          <Button asChild variant="outline" size="icon" className="h-12 w-12 border-foreground/30 hover:border-primary shadow-lg group">
            <a
              href="https://github.com/Anuj3366"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="h-12 w-12 border-foreground/30 hover:border-primary shadow-lg group">
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

        <motion.div className="flex flex-col sm:flex-row items-center gap-3 mt-2" variants={textVariants}>
          <Button asChild className="px-7 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold shadow-md hover:shadow-xl transition duration-200 ring-1 ring-primary/30 hover:ring-2">
            <a href="#contact">
              Contact Me
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" className="px-7 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-bold border-foreground/30 shadow-md hover:border-primary hover:text-primary">
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
