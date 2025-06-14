
import React, { useState, useEffect, lazy } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import LazyWrapper from "@/components/LazyWrapper";
import EnhancedErrorBoundary from "@/components/EnhancedErrorBoundary";
import EnhancedLoading from "@/components/EnhancedLoading";
import SEOHead from "@/components/SEOHead";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import { preloadImages } from "@/utils/performance";
import HeroBackground from "@/components/HeroBackground";

// Lazy load components for better performance
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const sectionAnimationProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.1 },
};

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  usePerformanceMonitoring();

  useEffect(() => {
    let isMounted = true;
    const progressSteps = [15, 30, 55, 80, 95, 100];
    let currentStep = 0;

    const fakeLoading = () => {
      if (!isMounted) return;
      setLoadingProgress(progressSteps[currentStep]);
      currentStep++;
      if (currentStep < progressSteps.length) {
        setTimeout(fakeLoading, 160);
      }
    };
    fakeLoading();

    const criticalImages = [
      "https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif",
      "https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif"
    ];

    preloadImages(criticalImages)
      .then(() => setTimeout(() => isMounted && setIsLoading(false), 500))
      .catch(() => setTimeout(() => isMounted && setIsLoading(false), 800));

    return () => { isMounted = false; };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/95 z-[999]">
        <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-sm mx-auto px-4">
          <EnhancedLoading size="lg" variant="pulse" text="Portfolio Loading..." />
          <div className="w-full bg-muted rounded-full h-1.5 sm:h-2">
            <div
              className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Optimizing your experience. Please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <EnhancedErrorBoundary>
      <SEOHead />
      <HeroBackground />
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background/90 to-background/80">
        <Navbar />
        <div className="container mx-auto max-w-7xl">
          <Hero />
          
          {/* Elegant section dividers */}
          <div className="my-6 sm:my-8 lg:my-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
          
          <motion.div {...sectionAnimationProps}>
            <LazyWrapper minHeight="300px">
              <About />
            </LazyWrapper>
          </motion.div>
          
          <div className="my-6 sm:my-8 lg:my-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          </div>
          
          <motion.div {...sectionAnimationProps} transition={{ ...sectionAnimationProps.transition, delay: 0.1 }}>
            <LazyWrapper minHeight="400px">
              <Experience />
            </LazyWrapper>
          </motion.div>
          
          <div className="my-6 sm:my-8 lg:my-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
          
          <motion.div {...sectionAnimationProps} transition={{ ...sectionAnimationProps.transition, delay: 0.2 }}>
            <LazyWrapper minHeight="300px">
              <Skills />
            </LazyWrapper>
          </motion.div>
          
          <div className="my-6 sm:my-8 lg:my-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          </div>
          
          <motion.div {...sectionAnimationProps} transition={{ ...sectionAnimationProps.transition, delay: 0.1 }}>
            <LazyWrapper minHeight="500px">
              <Projects />
            </LazyWrapper>
          </motion.div>
          
          <div className="my-6 sm:my-8 lg:my-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          </div>
          
          <motion.div {...sectionAnimationProps} transition={{ ...sectionAnimationProps.transition, delay: 0.2 }}>
            <LazyWrapper minHeight="400px">
              <Achievements />
            </LazyWrapper>
          </motion.div>
          
          <div className="my-6 sm:my-8 lg:my-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          </div>
          
          <motion.div {...sectionAnimationProps} transition={{ ...sectionAnimationProps.transition, delay: 0.1 }}>
            <LazyWrapper minHeight="300px">
              <Contact />
            </LazyWrapper>
          </motion.div>
        </div>
        
        <motion.div {...sectionAnimationProps} transition={{ ...sectionAnimationProps.transition, delay: 0.2 }}>
          <LazyWrapper minHeight="200px">
            <Footer />
          </LazyWrapper>
        </motion.div>
        <ScrollToTop />
      </main>
    </EnhancedErrorBoundary>
  );
};

export default Index;
