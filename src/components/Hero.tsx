
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
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const buttonHoverEffect = {
    scale: 1.05,
    y: -2,
    boxShadow: "0px 10px 30px rgba(59, 130, 246, 0.3)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  };
  
  const iconHoverEffect = {
    scale: 1.3,
    rotate: 12,
    y: -3,
    transition: { 
      duration: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  };

  const textRevealVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      clipPath: "inset(0 100% 0 0)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      clipPath: "inset(0 0% 0 0)",
      transition: {
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1.5
      }
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center py-20 text-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <HeroBackground />
      
      {/* Enhanced dark overlay with animated gradients */}
      <motion.div 
        className="absolute inset-0 z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        style={{
          background: `
            radial-gradient(circle at 30% 70%, rgba(0,0,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(0,0,0,0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.25) 100%)
          `
        }}
      />
      
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
          <motion.span 
            className="text-black dark:text-white"
            animate={{
              textShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 20px rgba(255,255,255,0.3)",
                "0 0 0px rgba(255,255,255,0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Hey, I'm{" "}
          </motion.span>
          <motion.span 
            className="relative inline-block"
            animate={pulseAnimation}
          >
            <motion.span 
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 dark:from-blue-400 dark:via-purple-400 dark:to-cyan-300 bg-clip-text text-transparent font-extrabold"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Anuj Garg
            </motion.span>
            {/* Enhanced glowing background effect */}
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-cyan-500/30 blur-lg -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
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
              duration: 6,
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
            whileHover={{ 
              scale: 1.08, 
              rotate: 2,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-accent/40 border border-accent/80 px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg backdrop-blur-sm hover:bg-accent/50 transition-all duration-300 hover:shadow-xl cursor-default"
          >
            B.E. CSE @ Chitkara University (9.38 CGPA)
          </motion.span>
          <motion.span 
            whileHover={{ 
              scale: 1.08, 
              rotate: -2,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-accent/40 border border-accent/80 px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg backdrop-blur-sm hover:bg-accent/50 transition-all duration-300 hover:shadow-xl cursor-default"
          >
            Tech Intern @ OLX
          </motion.span>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center justify-center space-x-8"
        >
          <motion.div 
            variants={socialIconVariants}
            whileHover={{ y: -5, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="outline" size="icon" className="rounded-full h-14 w-14 border-foreground/30 hover:border-primary transition-all duration-300 group backdrop-blur-sm bg-background/60 shadow-lg hover:shadow-xl">
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
          <motion.div 
            variants={socialIconVariants}
            whileHover={{ y: -5, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="outline" size="icon" className="rounded-full h-14 w-14 border-foreground/30 hover:border-primary transition-all duration-300 group backdrop-blur-sm bg-background/60 shadow-lg hover:shadow-xl">
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
            whileTap={{ scale: 0.95 }}
          >
            <Button className="group relative px-10 py-5 text-lg shadow-xl overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                animate={{
                  x: [-100, 300],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <a href="#contact" className="flex items-center relative z-10">
                Contact Me 
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="ml-3 h-5 w-5" />
                </motion.div>
              </a>
            </Button>
          </motion.div>
          <motion.div 
            whileHover={buttonHoverEffect}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="px-10 py-5 text-lg border-foreground/30 shadow-xl hover:border-primary hover:text-primary backdrop-blur-sm bg-background/60 hover:bg-background/80">
              <a href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view" target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block z-10"
        animate={{ 
          y: [0, 12, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <a href="#about" aria-label="Scroll down">
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40"
            height="40"
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary hover:text-primary/80 transition-colors drop-shadow-lg"
            whileHover={{ 
              scale: 1.2,
              filter: "drop-shadow(0 0 10px hsl(var(--primary)))"
            }}
            animate={{
              stroke: ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--primary))"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
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
