
import { useState, useEffect } from "react";

export const useScrollSpy = (sectionIds: string[], offset = 90) => {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      let found = sectionIds[0];
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.querySelector(sectionIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // Section is at least partially visible, slightly above nav bar
        if (rect.top - offset <= 0 && rect.bottom > 60) {
          found = sectionIds[i];
        }
      }
      setActiveId(found);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // call once in case user reloads mid-scroll
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [sectionIds.join(",")]);

  return activeId;
};
