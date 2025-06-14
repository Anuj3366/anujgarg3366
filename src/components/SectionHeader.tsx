
import { motion } from "framer-motion";
import React from "react";

interface SectionHeaderProps {
  badge: React.ReactNode;
  title: string;
  description: string;
}

const SectionHeader = ({ badge, title, description }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-8 sm:mb-12 lg:mb-16 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="sticky top-16 sm:top-20 bg-background/95 dark:bg-background/95 backdrop-blur-md py-4 px-4 rounded-xl border border-border/30 shadow-lg z-20 mb-6"
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {badge}
      </motion.div>
      
      <motion.h2 
        className="text-responsive-3xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-30px" }}
      >
        {title}
      </motion.h2>
      
      <motion.p 
        className="text-responsive-base text-foreground/90 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true, margin: "-20px" }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default SectionHeader;
