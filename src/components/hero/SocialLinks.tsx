
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo } from "react";

interface SocialLinksProps {
  variants: any;
}

const SocialLinks = memo<SocialLinksProps>(({ variants }) => {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8"
      variants={variants}
    >
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-110"
      >
        <a
          href="https://github.com/Anuj3366"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-foreground/70 group-hover:text-primary transition-colors" />
        </a>
      </Button>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/50 shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-110"
      >
        <a
          href="https://www.linkedin.com/in/anujgarg3366/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-foreground/70 group-hover:text-primary transition-colors" />
        </a>
      </Button>
    </motion.div>
  );
});

SocialLinks.displayName = "SocialLinks";

export default SocialLinks;
