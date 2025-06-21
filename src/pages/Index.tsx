
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import EnhancedErrorBoundary from "@/components/EnhancedErrorBoundary";
import SEOHead from "@/components/SEOHead";
import HeroBackground from "@/components/HeroBackground";
import SectionDivider from "@/components/SectionDivider";
import AnimatedSection from "@/components/AnimatedSection";

const Index: React.FC = () => {
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
