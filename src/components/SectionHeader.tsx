
import { motion } from "framer-motion";
import React from "react";

interface SectionHeaderProps {
  badge: React.ReactNode;
  title: string;
  description: string;
}

const SectionHeader = ({ badge, title, description }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-8 sm:mb-12 lg:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {badge}
      </motion.div>
      
      <h2 className="section-headline">
        {title}
      </h2>
      <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
