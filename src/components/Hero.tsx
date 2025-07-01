
import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { useOptimizedImageLoader } from "@/hooks/useOptimizedImageLoader";
import PerformanceOptimizedAvatar from "./hero/PerformanceOptimizedAvatar";
import StatusBadges from "./hero/StatusBadges";
import SocialLinks from "./hero/SocialLinks";
import CTAButtons from "./hero/CTAButtons";

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80";

const Hero = memo(() => {
  const { isLoading: imageLoading } = useOptimizedImageLoader({ 
    src: HERO_IMAGE_URL, 
    priority: true,
    timeout: 5000 
  });

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }), []);

  const textVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  }), []);

  const backgroundStyle = useMemo(() => ({
    background: "linear-gradient(135deg, hsl(var(--card)/0.95) 0%, hsl(var(--card)/0.85) 100%)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    boxShadow: "0 20px 50px -12px hsl(var(--foreground)/0.08), 0 0 0 1px hsl(var(--border)/0.4)",
    border: "1px solid hsl(var(--border)/0.4)",
  }), []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden pt-16 sm:pt-20 lg:pt-24"
      style={{ zIndex: 1 }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 max-w-4xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 flex flex-col items-center rounded-2xl sm:rounded-3xl"
        style={backgroundStyle}
      >
        {/* Profile Avatar - Responsive and optimized */}
        <motion.div
          className="relative mb-4 sm:mb-6 lg:mb-8 flex flex-col items-center"
          variants={textVariants}
        >
          <div className="sm:hidden">
            <PerformanceOptimizedAvatar imageUrl={HERO_IMAGE_URL} size={120} />
          </div>
          <div className="hidden sm:block md:hidden">
            <PerformanceOptimizedAvatar imageUrl={HERO_IMAGE_URL} size={140} />
          </div>
          <div className="hidden md:block lg:hidden">
            <PerformanceOptimizedAvatar imageUrl={HERO_IMAGE_URL} size={160} />
          </div>
          <div className="hidden lg:block xl:hidden">
            <PerformanceOptimizedAvatar imageUrl={HERO_IMAGE_URL} size={180} />
          </div>
          <div className="hidden xl:block">
            <PerformanceOptimizedAvatar imageUrl={HERO_IMAGE_URL} size={200} />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-mono leading-tight"
          variants={textVariants}
        >
          Anuj Garg
        </motion.h1>

        {/* Enhanced Subtitle */}
        <motion.div
          className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold mb-4 sm:mb-6 lg:mb-8 leading-relaxed px-2 max-w-3xl"
          variants={textVariants}
        >
          <span className="text-foreground/95">iOS Developer • </span>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-bold">
            Full-Stack Engineer
          </span>
          <span className="text-foreground/95"> • Problem Solver</span>
        </motion.div>

        {/* Status Badges */}
        <StatusBadges variants={textVariants} />

        {/* Social Links */}
        <SocialLinks variants={textVariants} />

        {/* CTA Buttons */}
        <CTAButtons variants={textVariants} />
      </motion.div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
