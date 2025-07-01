
import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import EnhancedErrorBoundary from "@/components/EnhancedErrorBoundary";
import SEOHead from "@/components/SEOHead";
import LightweightBackground from "@/components/hero/LightweightBackground";
import SectionDivider from "@/components/SectionDivider";
import AnimatedSection from "@/components/AnimatedSection";

// Lazy load non-critical components for better performance
const About = React.lazy(() => import("@/components/About"));
const Experience = React.lazy(() => import("@/components/Experience"));
const Skills = React.lazy(() => import("@/components/Skills"));
const Projects = React.lazy(() => import("@/components/Projects"));
const Achievements = React.lazy(() => import("@/components/Achievements"));
const Contact = React.lazy(() => import("@/components/Contact"));
const Footer = React.lazy(() => import("@/components/Footer"));

const ComponentSkeleton = ({ height = "400px" }: { height?: string }) => (
  <div className="flex items-center justify-center" style={{ minHeight: height }}>
    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"></div>
  </div>
);

const Index: React.FC = () => {
  return (
    <EnhancedErrorBoundary>
      <SEOHead />
      <LightweightBackground />
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background/90 to-background/80">
        <Navbar />
        <div className="container mx-auto max-w-7xl">
          <Hero />
          
          <SectionDivider variant="primary" opacity={30} />
          
          <AnimatedSection>
            <Suspense fallback={<ComponentSkeleton height="300px" />}>
              <About />
            </Suspense>
          </AnimatedSection>
          
          <SectionDivider variant="accent" opacity={20} />
          
          <AnimatedSection minHeight="400px" delay={0.1}>
            <Suspense fallback={<ComponentSkeleton height="400px" />}>
              <Experience />
            </Suspense>
          </AnimatedSection>
          
          <SectionDivider variant="primary" opacity={20} />
          
          <AnimatedSection delay={0.2}>
            <Suspense fallback={<ComponentSkeleton height="350px" />}>
              <Skills />
            </Suspense>
          </AnimatedSection>
          
          <SectionDivider variant="accent" opacity={25} />
          
          <AnimatedSection minHeight="500px" delay={0.1}>
            <Suspense fallback={<ComponentSkeleton height="500px" />}>
              <Projects />
            </Suspense>
          </AnimatedSection>
          
          <SectionDivider variant="primary" opacity={15} />
          
          <AnimatedSection minHeight="400px" delay={0.2}>
            <Suspense fallback={<ComponentSkeleton height="400px" />}>
              <Achievements />
            </Suspense>
          </AnimatedSection>
          
          <SectionDivider variant="accent" opacity={15} />
          
          <AnimatedSection delay={0.1}>
            <Suspense fallback={<ComponentSkeleton height="600px" />}>
              <Contact />
            </Suspense>
          </AnimatedSection>
        </div>
        
        <AnimatedSection minHeight="200px" delay={0.2}>
          <Suspense fallback={<ComponentSkeleton height="200px" />}>
            <Footer />
          </Suspense>
        </AnimatedSection>
        
        <ScrollToTop />
      </main>
    </EnhancedErrorBoundary>
  );
};

export default Index;
