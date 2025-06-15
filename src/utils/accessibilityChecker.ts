
interface AccessibilityIssue {
  element: string;
  issue: string;
  severity: 'error' | 'warning' | 'info';
  fix: string;
}

export const checkAccessibility = (): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];

  // Check for images without alt text
  const images = document.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push({
        element: `img[${index}]`,
        issue: 'Image missing alt text',
        severity: 'error',
        fix: 'Add descriptive alt attribute or aria-label'
      });
    }
  });

  // Check for buttons without accessible names
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button, index) => {
    const hasText = button.textContent?.trim();
    const hasAriaLabel = button.getAttribute('aria-label');
    const hasAriaLabelledBy = button.getAttribute('aria-labelledby');
    
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        element: `button[${index}]`,
        issue: 'Button without accessible name',
        severity: 'error',
        fix: 'Add text content, aria-label, or aria-labelledby'
      });
    }
  });

  // Check for links without accessible names
  const links = document.querySelectorAll('a');
  links.forEach((link, index) => {
    const hasText = link.textContent?.trim();
    const hasAriaLabel = link.getAttribute('aria-label');
    
    if (!hasText && !hasAriaLabel) {
      issues.push({
        element: `a[${index}]`,
        issue: 'Link without accessible name',
        severity: 'error',
        fix: 'Add descriptive text or aria-label'
      });
    }
  });

  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((input, index) => {
    const id = input.id;
    const hasLabel = id && document.querySelector(`label[for="${id}"]`);
    const hasAriaLabel = input.getAttribute('aria-label');
    const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        element: `${input.tagName.toLowerCase()}[${index}]`,
        issue: 'Form control without label',
        severity: 'error',
        fix: 'Add associated label, aria-label, or aria-labelledby'
      });
    }
  });

  // Check color contrast (basic check)
  const checkColorContrast = (element: Element) => {
    const styles = window.getComputedStyle(element);
    const color = styles.color;
    const backgroundColor = styles.backgroundColor;
    
    // This is a simplified check - in a real app you'd want a proper contrast ratio calculation
    if (color === backgroundColor) {
      return false;
    }
    return true;
  };

  // Check heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (index === 0 && level !== 1) {
      issues.push({
        element: `${heading.tagName.toLowerCase()}[${index}]`,
        issue: 'Page should start with h1',
        severity: 'warning',
        fix: 'Use h1 for the main page heading'
      });
    } else if (level > previousLevel + 1) {
      issues.push({
        element: `${heading.tagName.toLowerCase()}[${index}]`,
        issue: 'Heading level skipped',
        severity: 'warning',
        fix: 'Use consecutive heading levels (h1, h2, h3, etc.)'
      });
    }
    previousLevel = level;
  });

  // Check for keyboard focus indicators
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach((element, index) => {
    const styles = window.getComputedStyle(element, ':focus');
    const outline = styles.outline;
    const outlineWidth = styles.outlineWidth;
    
    if (outline === 'none' || outlineWidth === '0px') {
      // Check if there's a custom focus style
      const hasCustomFocus = styles.boxShadow !== 'none' || 
                            styles.border !== element.style.border;
      
      if (!hasCustomFocus) {
        issues.push({
          element: `${element.tagName.toLowerCase()}[${index}]`,
          issue: 'No visible focus indicator',
          severity: 'warning',
          fix: 'Add visible focus styles (outline, box-shadow, or border)'
        });
      }
    }
  });

  return issues;
};

export const runAccessibilityAudit = () => {
  const issues = checkAccessibility();
  
  if (issues.length === 0) {
    console.log('✅ No accessibility issues found!');
  } else {
    console.group('🔍 Accessibility Issues Found:');
    issues.forEach(issue => {
      const emoji = issue.severity === 'error' ? '❌' : 
                   issue.severity === 'warning' ? '⚠️' : 'ℹ️';
      console.log(`${emoji} ${issue.element}: ${issue.issue}`);
      console.log(`   Fix: ${issue.fix}`);
    });
    console.groupEnd();
  }
  
  return issues;
};
