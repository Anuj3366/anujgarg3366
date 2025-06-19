
import React, { lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import EnhancedErrorBoundary from "@/components/EnhancedErrorBoundary";
import SEOHead from "@/components/SEOHead";
import HeroBackground from "@/components/HeroBackground";
import SimpleLoadingScreen from "@/components/SimpleLoadingScreen";
import SectionDivider from "@/components/SectionDivider";
import AnimatedSection from "@/components/AnimatedSection";
import { useSimpleLoading } from "@/hooks/useSimpleLoading";

// Lazy load components
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index: React.FC = () => {
  const { isLoading, progress } = useSimpleLoading();

  if (isLoading) {
    return <SimpleLoadingScreen progress={progress} />;
  }

  return (
    <EnhancedErrorBoundary>
      <SEOHead />
      <HeroBackground />
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background/90 to-background/80">
        <Navbar />
        <div className="container mx-auto max-w-7xl">
          <Hero />
          
          <SectionDivider variant="primary" opacity={30} />
          
          <AnimatedSection>
            <About />
          </AnimatedSection>
          
          <SectionDivider variant="accent" opacity={20} />
          
          <AnimatedSection minHeight="400px" delay={0.1}>
            <Experience />
          </AnimatedSection>
          
          <SectionDivider variant="primary" opacity={20} />
          
          <AnimatedSection delay={0.2}>
            <Skills />
          </AnimatedSection>
          
          <SectionDivider variant="accent" opacity={25} />
          
          <AnimatedSection minHeight="500px" delay={0.1}>
            <Projects />
          </AnimatedSection>
          
          <SectionDivider variant="primary" opacity={15} />
          
          <AnimatedSection minHeight="400px" delay={0.2}>
            <Achievements />
          </AnimatedSection>
          
          <SectionDivider variant="accent" opacity={15} />
          
          <AnimatedSection delay={0.1}>
            <Contact />
          </AnimatedSection>
        </div>
        
        <AnimatedSection minHeight="200px" delay={0.2}>
          <Footer />
        </AnimatedSection>
        
        <ScrollToTop />
      </main>
    </EnhancedErrorBoundary>
  );
};

export default Index;
