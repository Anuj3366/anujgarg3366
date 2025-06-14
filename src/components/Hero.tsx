
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const buttonHoverEffect = {
    scale: 1.05,
    boxShadow: "0px 0px 20px hsl(var(--primary))",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  };
  
  const iconHoverEffect = {
    scale: 1.2,
    rotate: 5,
    color: "hsl(var(--primary))",
    transition: { duration: 0.3 }
  };

  const textRevealVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      clipPath: "inset(0 100% 0 0)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      clipPath: "inset(0 0% 0 0)",
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center py-20 text-center overflow-hidden"
    >
      <HeroBackground />
      
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40 z-[1]" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl px-4"
      >
        <motion.h1
          variants={textRevealVariants}
          className="text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-black dark:text-white">Hey, I'm </span>
          <motion.span 
            className="relative inline-block"
            animate={pulseAnimation}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-300 bg-clip-text text-transparent font-extrabold">
              Anuj Garg
            </span>
            {/* Glowing background effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-500/20 blur-lg -z-10 animate-pulse" />
          </motion.span>
        </motion.h1>
        
        <motion.h2
          variants={itemVariants}
          className="mt-6 text-xl font-medium text-foreground/90 sm:text-2xl md:text-3xl lg:text-4xl"
        >
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent"
          >
            iOS Developer, Full-Stack Developer & Problem Solver
          </motion.span>
        </motion.h2>
        
        <motion.div
          variants={itemVariants}
          animate={floatingAnimation}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.span 
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="rounded-full bg-accent/30 border border-accent/60 px-4 py-2 text-sm font-semibold text-accent-foreground shadow-lg backdrop-blur-sm hover:bg-accent/40 transition-all duration-300 hover:shadow-xl"
          >
            B.E. CSE @ Chitkara University (9.38 CGPA)
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="rounded-full bg-accent/30 border border-accent/60 px-4 py-2 text-sm font-semibold text-accent-foreground shadow-lg backdrop-blur-sm hover:bg-accent/40 transition-all duration-300 hover:shadow-xl"
          >
            Tech Intern @ OLX
          </motion.span>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center justify-center space-x-6"
        >
          <motion.div whileHover={{ y: -3 }}>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-foreground/20 hover:border-primary transition-all duration-300 group backdrop-blur-sm bg-background/50">
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
          </motion.div>
          <motion.div whileHover={{ y: -3 }}>
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-foreground/20 hover:border-primary transition-all duration-300 group backdrop-blur-sm bg-background/50">
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
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <motion.div 
            whileHover={buttonHoverEffect}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="group relative px-8 py-4 text-lg shadow-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <a href="#contact" className="flex items-center relative z-10">
                Contact Me 
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </a>
            </Button>
          </motion.div>
          <motion.div 
            whileHover={buttonHoverEffect}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="outline" className="px-8 py-4 text-lg border-foreground/20 shadow-lg hover:border-primary hover:text-primary backdrop-blur-sm bg-background/50">
              <a href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view" target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#about" aria-label="Scroll down">
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="36"
            height="36"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-foreground/70 hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </motion.svg>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
