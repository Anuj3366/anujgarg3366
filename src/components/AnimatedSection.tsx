
import { motion } from "framer-motion";
import { memo, useMemo } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  minHeight?: string;
  delay?: number;
}

const AnimatedSection = memo(({ children, minHeight = "300px", delay = 0 }: AnimatedSectionProps) => {
  const sectionAnimationProps = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.1, margin: "50px" },
    style: { minHeight }
  }), [delay, minHeight]);

  return (
    <motion.div {...sectionAnimationProps}>
      {children}
    </motion.div>
  );
});

AnimatedSection.displayName = "AnimatedSection";

export default AnimatedSection;
