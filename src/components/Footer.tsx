
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-t from-card/80 to-card/40 backdrop-blur-sm border-t border-border/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-mono">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                &lt;Anuj.Garg /&gt;
              </span>
            </h3>
            <p className="text-base sm:text-lg text-foreground/80 font-medium">
              Full-Stack Developer & Problem Solver
            </p>
            <p className="text-sm text-foreground/60 mt-2 max-w-md">
              Creating innovative solutions with modern technologies
            </p>
          </div>
          
          {/* Social Links Grid */}
          <div className="flex flex-col items-center lg:items-end gap-6">
            <h4 className="text-lg font-semibold text-foreground/90 text-center lg:text-right">
              Let's Connect
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md lg:max-w-none">
              {/* LeetCode */}
              <a
                href="https://leetcode.com/anuj3366/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-card/50 hover:bg-card/80 border border-border/40 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                  <ExternalLink className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  LeetCode
                </span>
              </a>
              
              {/* GitHub */}
              <a
                href="https://github.com/Anuj3366"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-card/50 hover:bg-card/80 border border-border/40 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-500/20 group-hover:bg-gray-500/30 transition-colors">
                  <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </div>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  GitHub
                </span>
              </a>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/anujgarg3366/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-card/50 hover:bg-card/80 border border-border/40 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  LinkedIn
                </span>
              </a>
              
              {/* Email */}
              <a
                href="mailto:anujgarg3366@gmail.com"
                className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-card/50 hover:bg-card/80 border border-border/40 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                  <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                  Email
                </span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} Anuj Garg. All rights reserved. Built with ❤️ using React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
