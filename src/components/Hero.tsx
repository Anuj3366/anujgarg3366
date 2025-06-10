
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Hey, I'm <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">Anuj Garg</span>
        </h1>
        <h2 className="mt-6 text-xl font-medium text-foreground/80 sm:text-2xl md:text-3xl">
          iOS Developer, Full-Stack Developer & Problem Solver
        </h2>
        
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            B.E. CSE @ Chitkara University (9.38 CGPA)
          </span>
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Tech Intern @ OLX
          </span>
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Web Dev @ iNeuBytes
          </span>
        </div>
        
        <div className="mt-8 flex items-center justify-center space-x-4">
          <Button asChild variant="outline" size="icon" className="rounded-full h-12 w-12">
            <a href="https://github.com/Anuj3366" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="rounded-full h-12 w-12">
            <a href="https://www.linkedin.com/in/anujgarg3366/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild className="group">
            <a href="#contact">
              Contact Me <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild variant="outline">
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
