
import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEOHead = ({ 
  title = "Anuj Garg - Full-Stack Developer & Problem Solver",
  description = "Experienced Full-Stack Developer skilled in React, Node.js, and modern web technologies. Currently pursuing B.E. CSE at Chitkara University with 9.38 CGPA.",
  image = "/icons/icon-512x512.png",
  url = "https://anujgarg3366.me"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', 'Anuj Garg, Full-Stack Developer, React, Node.js, JavaScript, TypeScript, Web Developer, Software Engineer, Chitkara University');
    updateMetaTag('author', 'Anuj Garg');
    updateMetaTag('robots', 'index, follow');
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'Anuj Garg Portfolio', true);
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Anuj Garg",
      "jobTitle": "Full-Stack Developer",
      "url": url,
      "sameAs": [
        "https://github.com/Anuj3366",
        "https://www.linkedin.com/in/anujgarg3366/"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Chitkara University"
      },
      "knowsAbout": ["JavaScript", "React", "Node.js", "TypeScript", "Python", "Java"],
      "email": "anujgarg3366@gmail.com",
      "telephone": "+919899854206",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi",
        "addressCountry": "India"
      }
    };

    // Add or update structured data
    let scriptTag = document.querySelector('#structured-data') as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, image, url]);

  return null;
};

export default SEOHead;
