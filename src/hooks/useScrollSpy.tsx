
import { useState, useEffect } from "react";

export const useScrollSpy = (sectionIds: string[], offset = 90) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;
      let found = sectionIds[0];
      
      // Find the section that is currently most visible
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.querySelector(sectionIds[i]);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        
        // Check if we've scrolled past this section's start
        if (scrollPosition >= elementTop - 100) {
          found = sectionIds[i];
          break;
        }
      }
      
      // Special handling for areas between sections
      const currentElement = document.querySelector(found);
      if (currentElement) {
        const rect = currentElement.getBoundingClientRect();
        const isInViewport = rect.top <= offset && rect.bottom >= offset;
        
        // Only update if we're actually near a section
        if (isInViewport || rect.top <= offset + 200) {
          setActiveId(found);
        }
      }
    };

    // Add passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set correct active section
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
};
