
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo } from "react";

interface CTAButtonsProps {
  variants: any;
}

const CTAButtons = memo<CTAButtonsProps>(({ variants }) => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-md px-2"
      variants={variants}
    >
      <Button
        asChild
        className="w-full sm:flex-1 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base font-bold rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
      >
        <a href="#contact" className="flex items-center justify-center gap-2">
          Contact Me
          <span className="inline-block transform transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </Button>
      <Button
        asChild
        variant="outline"
        className="w-full sm:flex-1 px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base font-bold rounded-full bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/70 hover:bg-card/70 hover:scale-105 transition-all duration-300"
      >
        <a
          href="https://drive.google.com/file/d/1HUYtjfjhODx6nY5aCk99P0xdFW9myDSv/view"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          <Download className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
          Resume
          <span className="inline-block transform transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
      </Button>
    </motion.div>
  );
});

CTAButtons.displayName = "CTAButtons";

export default CTAButtons;
