
import { motion } from "framer-motion";
import LazyWrapper from "@/components/LazyWrapper";

interface AnimatedSectionProps {
  children: React.ReactNode;
  minHeight?: string;
  delay?: number;
}

const AnimatedSection = ({ children, minHeight = "300px", delay = 0 }: AnimatedSectionProps) => {
  const sectionAnimationProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.1 },
  };

  return (
    <motion.div {...sectionAnimationProps}>
      <LazyWrapper minHeight={minHeight}>
        {children}
      </LazyWrapper>
    </motion.div>
  );
};

export default AnimatedSection;
