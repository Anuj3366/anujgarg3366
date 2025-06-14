import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground"; // Import the new background

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const buttonHoverEffect = {
    scale: 1.05,
    boxShadow: "0px 0px 12px hsl(var(--primary))",
    transition: { duration: 0.2 }
  };
  
  const iconHoverEffect = {
    scale: 1.1,
    color: "hsl(var(--primary))",
    transition: { duration: 0.2 }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center py-20 text-center overflow-hidden"
    >
      <HeroBackground />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl px-4" // Increased max-width for wider feel
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl" // Slightly larger
        >
          <span className="text-black dark:text-white">Hey, I'm </span>
          <span className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--futuristic-glow))] to-[hsl(var(--accent))] bg-clip-text text-transparent">Anuj Garg</span>
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="mt-6 text-xl font-medium text-foreground/80 sm:text-2xl md:text-3xl lg:text-4xl" // Slightly larger
        >
          iOS Developer, Full-Stack Developer & Problem Solver
        </motion.h2>
        
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap items-center justify-center gap-4" // Increased gap
        >
          <span className="rounded-full bg-accent/20 border border-accent/50 px-4 py-2 text-sm font-semibold text-accent-foreground shadow-lg backdrop-blur-sm hover:bg-accent/30 transition-colors">
            B.E. CSE @ Chitkara University (9.38 CGPA)
          </span>
          <span className="rounded-full bg-accent/20 border border-accent/50 px-4 py-2 text-sm font-semibold text-accent-foreground shadow-lg backdrop-blur-sm hover:bg-accent/30 transition-colors">
            Tech Intern @ OLX
          </span>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center justify-center space-x-6" // Increased spacing
        >
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-foreground/20 hover:border-primary transition-all duration-300 group">
            <motion.a 
              href="https://github.com/Anuj3366" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              whileHover={iconHoverEffect}
              className="flex items-center justify-center w-full h-full"
            >
              <Github className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </motion.a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-foreground/20 hover:border-primary transition-all duration-300 group">
            <motion.a 
              href="https://www.linkedin.com/in/anujgarg3366/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              whileHover={iconHoverEffect}
              className="flex items-center justify-center w-full h-full"
            >
              <Linkedin className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
            </motion.a>
          </Button>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row" // Increased gap
        >
          <motion.div whileHover={buttonHoverEffect}>
            <Button className="group px-8 py-4 text-lg shadow-lg">
              <a href="#contact" className="flex items-center">
                Contact Me <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={buttonHoverEffect}>
            <Button variant="outline" className="px-8 py-4 text-lg border-foreground/20 shadow-lg hover:border-primary hover:text-primary">
              <a href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view" target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce sm:block">
        <a href="#about" aria-label="Scroll down">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36" // Increased size
            height="36" // Increased size
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="hsl(var(--primary))" // Use primary color
            strokeWidth="1.5" // Thinner stroke
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-foreground/50 opacity-70 hover:opacity-100 transition-opacity"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
