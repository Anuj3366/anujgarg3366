
import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";

// Lazy load components for better performance
const About = lazy(() => import("@/components/About"));
const Experience = lazy(() => import("@/components/Experience"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const Achievements = lazy(() => import("@/components/Achievements"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-primary border-opacity-70"></div>
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Preload critical resources
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = 'https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif';
    document.head.appendChild(link);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary border-opacity-70"></div>
          <p className="text-xl font-medium text-primary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-background to-background/90">
      <Navbar />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Achievements />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </div>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
      <ScrollToTop />
    </main>
  );
};

export default Index;
