
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, MessageCircle } from "lucide-react";
import { memo } from "react";

interface CTAButtonsProps {
  variants: any;
  onScrollToSection?: (sectionId: string) => void;
}

const CTAButtons = memo<CTAButtonsProps>(({ variants, onScrollToSection }) => {
  const handleContactClick = () => {
    if (onScrollToSection) {
      onScrollToSection('#contact');
    }
  };

  const handleDownloadCV = () => {
    // Create a temporary link to download CV
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Assuming CV is in public folder
    link.download = 'Anuj_Garg_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md"
      variants={variants}
    >
      <Button
        onClick={handleContactClick}
        size="lg"
        className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group font-semibold text-sm sm:text-base py-3 sm:py-4"
        aria-label="Contact Anuj Garg"
      >
        <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
        Let's Connect
      </Button>
      
      <Button
        onClick={handleDownloadCV}
        variant="outline"
        size="lg"
        className="flex-1 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group font-semibold text-sm sm:text-base py-3 sm:py-4"
        aria-label="Download Anuj Garg's resume"
      >
        <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110" />
        Download CV
      </Button>
    </motion.div>
  );
});

CTAButtons.displayName = "CTAButtons";

export default CTAButtons;
