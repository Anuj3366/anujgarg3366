import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl px-4"
      >
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Hey, I'm <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Anuj Garg</span>
        </h1>
        <h2 className="mt-5 text-lg font-medium text-foreground/70 sm:text-xl md:text-2xl lg:text-3xl">
          iOS Developer, Full-Stack Developer & Problem Solver
        </h2>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors">
            B.E. CSE @ Chitkara University (9.38 CGPA)
          </span>
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors">
            Tech Intern @ OLX
          </span>
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground shadow-sm hover:bg-accent/90 transition-colors">
            Web Dev @ iNeuBytes
          </span>
        </div>
        
        <div className="mt-10 flex items-center justify-center space-x-4">
          <Button asChild variant="outline" size="icon" className="rounded-full h-11 w-11 hover:bg-accent">
            <a href="https://github.com/Anuj3366" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full h-11 w-11 hover:bg-accent">
            <a href="https://www.linkedin.com/in/anujgarg3366/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild className="group px-6 py-3 text-base">
            <a href="#contact">
              Contact Me <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild variant="outline" className="px-6 py-3 text-base">
            <a href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view" target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          </Button>
        </div>
      </motion.div>
      
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce sm:block">
        <a href="#about" aria-label="Scroll down">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-foreground/50"
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
