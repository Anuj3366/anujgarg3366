import { memo, useEffect } from 'react';

const AccessibilityEnhancements = memo(() => {
  useEffect(() => {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded';
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Enhance focus management
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab key navigation enhancement
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
      
      // Escape key to close modals/menus
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    };

    // Remove keyboard navigation class on mouse interaction
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    // Add ARIA live region for dynamic content announcements
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      
      // Cleanup skip link and live region
      const existingSkipLink = document.querySelector('a[href="#main-content"]');
      if (existingSkipLink) {
        existingSkipLink.remove();
      }
      
      const existingLiveRegion = document.getElementById('live-region');
      if (existingLiveRegion) {
        existingLiveRegion.remove();
      }
    };
  }, []);

  return null;
});

AccessibilityEnhancements.displayName = 'AccessibilityEnhancements';

export default AccessibilityEnhancements;

// Utility function to announce content to screen readers
export const announceToScreenReader = (message: string) => {
  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
    
    // Clear the message after a delay to allow for re-announcements
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};