
import React, { useState, useEffect, lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import LazyWrapper from "@/components/LazyWrapper";
import EnhancedErrorBoundary from "@/components/EnhancedErrorBoundary";
import EnhancedLoading from "@/components/EnhancedLoading";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";
import { preloadImages } from "@/utils/performance";

// Lazy load components for better performance
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  usePerformanceMonitoring();

  useEffect(() => {
    const initializeApp = async () => {
      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Preload critical images
      const criticalImages = [
        'https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif',
        'https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif'
      ];

      try {
        await preloadImages(criticalImages);
        setLoadingProgress(100);
        
        // Reduced loading time for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.warn('Image preloading failed:', error);
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6 max-w-sm mx-auto px-4">
          <EnhancedLoading 
            size="lg" 
            variant="pulse"
            text="Loading Portfolio..."
          />
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Optimizing experience for you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <EnhancedErrorBoundary>
      <main className="flex min-h-screen flex-col bg-gradient-to-br from-background to-background/90">
        <Navbar />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Hero />
          
          <LazyWrapper minHeight="300px">
            <About />
          </LazyWrapper>
          
          <LazyWrapper minHeight="400px">
            <Experience />
          </LazyWrapper>
          
          <LazyWrapper minHeight="300px">
            <Skills />
          </LazyWrapper>
          
          <LazyWrapper minHeight="500px">
            <Projects />
          </LazyWrapper>
          
          <LazyWrapper minHeight="400px">
            <Achievements />
          </LazyWrapper>
          
          <LazyWrapper minHeight="300px">
            <Contact />
          </LazyWrapper>
        </div>
        
        <LazyWrapper minHeight="200px">
          <Footer />
        </LazyWrapper>
        
        <ScrollToTop />
      </main>
    </EnhancedErrorBoundary>
  );
};

export default Index;
