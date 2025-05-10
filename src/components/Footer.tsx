
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card/50 py-10 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-xl font-bold">&lt;Anuj.Garg /&gt;</h3>
            <p className="mt-2 text-sm text-foreground/70">
              Full-Stack Developer & Problem Solver
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <ExternalLink className="h-4 w-4 text-primary" />
              <a
                href="https://leetcode.com/anuj3366/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary"
              >
                LeetCode
              </a>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Github className="h-4 w-4 text-primary" />
              <a
                href="https://github.com/Anuj3366"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary"
              >
                GitHub
              </a>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Linkedin className="h-4 w-4 text-primary" />
              <a
                href="https://www.linkedin.com/in/anujgarg3366/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary"
              >
                LinkedIn
              </a>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <a
                href="mailto:anujgarg3366@gmail.com"
                className="text-foreground/80 hover:text-primary"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border/50 pt-8 text-center text-sm text-foreground/70">
          <p>© {currentYear} Anuj Garg. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
