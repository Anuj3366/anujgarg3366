import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEOHead = ({ 
  title = "Anuj Garg - iOS Developer, Full-Stack Developer & Problem Solver | Portfolio",
  description = "Anuj Garg - Experienced iOS Developer and Full-Stack Developer skilled in Swift, React, Node.js, and modern web technologies. B.E. CSE student at Chitkara University with 9.38 CGPA. GATE 2025 qualified with 397 score. Expert in problem-solving with 900+ problems solved on GeeksforGeeks and active on LeetCode.",
  image = "/icons/icon-512x512.png",
  url = "https://anujgarg3366.me"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Remove duplicate canonical & meta if present (prevent redundancy/conflicts)
    document
      .querySelectorAll('link[rel="canonical"]:not(:first-of-type), meta[name="description"]:not(:first-of-type)')
      .forEach((el) => el.parentNode?.removeChild(el));
      
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

    // Enhanced SEO meta tags with focus on "Anuj" and "Anuj Garg"
    updateMetaTag('description', description);
    updateMetaTag('keywords', 'Anuj Garg, Anuj, iOS Developer, Full-Stack Developer, React Developer, Node.js Developer, JavaScript Expert, TypeScript Developer, Swift Developer, Web Developer, Software Engineer, Computer Science Engineer, Chitkara University, GATE 2025, Problem Solver, LeetCode, GeeksforGeeks, Portfolio, Anuj Garg Portfolio, Anuj Portfolio, Delhi Developer, Indian Developer');
    updateMetaTag('author', 'Anuj Garg');
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMetaTag('canonical', url);
    
    // Geographic and location targeting
    updateMetaTag('geo.region', 'IN-DL');
    updateMetaTag('geo.placename', 'Delhi, India');
    updateMetaTag('geo.position', '28.7041;77.1025');
    updateMetaTag('ICBM', '28.7041, 77.1025');
    
    // Enhanced Open Graph tags
    updateMetaTag('og:title', 'Anuj Garg - iOS & Full-Stack Developer | Portfolio', true);
    updateMetaTag('og:description', 'Anuj Garg: Expert iOS & Full-Stack Developer. GATE 2025 qualified (397 score), 9.38 CGPA at Chitkara University. 900+ GeeksforGeeks problems solved. Specializing in Swift, React, and modern web technologies.', true);
    updateMetaTag('og:image', `${url}/icons/icon-512x512.png`, true);
    updateMetaTag('og:image:alt', 'Anuj Garg - iOS Developer and Full-Stack Developer Portfolio', true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', 'profile', true);
    updateMetaTag('og:site_name', 'Anuj Garg Portfolio', true);
    updateMetaTag('og:locale', 'en_US', true);
    
    // Enhanced Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Anuj Garg - iOS & Full-Stack Developer');
    updateMetaTag('twitter:description', 'Expert iOS & Full-Stack Developer | GATE 2025 Qualified | 900+ Problems Solved | Chitkara University CSE');
    updateMetaTag('twitter:image', `${url}/icons/icon-512x512.png`);
    updateMetaTag('twitter:image:alt', 'Anuj Garg Portfolio');
    updateMetaTag('twitter:creator', '@anujgarg3366');
    
    // Additional SEO meta tags
    updateMetaTag('rating', 'general');
    updateMetaTag('referrer', 'origin-when-cross-origin');
    updateMetaTag('format-detection', 'telephone=yes');
    updateMetaTag('HandheldFriendly', 'true');
    updateMetaTag('MobileOptimized', '320');
    updateMetaTag('apple-mobile-web-app-title', 'Anuj Garg');
    updateMetaTag('application-name', 'Anuj Garg Portfolio');
    updateMetaTag('msapplication-TileColor', '#2563eb');
    updateMetaTag('theme-color', '#2563eb');

    // Enhanced structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Anuj Garg",
      "alternateName": ["Anuj", "Anuj Garg Developer", "Anuj iOS Developer"],
      "description": "iOS Developer, Full-Stack Developer and Problem Solver",
      "jobTitle": ["iOS Developer", "Full-Stack Developer", "Software Engineer"],
      "url": url,
      "image": `${url}/icons/icon-512x512.png`,
      "sameAs": [
        "https://github.com/Anuj3366",
        "https://www.linkedin.com/in/anujgarg3366/",
        "https://leetcode.com/anuj3366/",
        "https://auth.geeksforgeeks.org/user/anujgarg3366"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Chitkara University",
        "department": "Computer Science and Engineering"
      },
      "knowsAbout": [
        "iOS Development", "Swift", "React", "Node.js", "JavaScript", "TypeScript", 
        "Python", "Java", "Data Structures", "Algorithms", "Problem Solving",
        "Web Development", "Mobile Development", "Software Engineering"
      ],
      "email": "anujgarg3366@gmail.com",
      "telephone": "+919899854206",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi",
        "addressCountry": "India",
        "addressRegion": "Delhi"
      },
      "award": [
        "GATE 2025 Qualified (397/1000)",
        "GATE 2024 Qualified (33.79/100)",
        "GeeksforGeeks 900+ Problems Solved",
        "Chitkara University 9.38 CGPA"
      ],
      "workLocation": {
        "@type": "Place",
        "name": "Delhi, India"
      }
    };

    // Website structured data
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Anuj Garg Portfolio",
      "alternateName": "Anuj Portfolio",
      "url": url,
      "author": {
        "@type": "Person",
        "name": "Anuj Garg"
      },
      "description": "Portfolio website of Anuj Garg - iOS Developer and Full-Stack Developer",
      "inLanguage": "en-US",
      "copyrightHolder": {
        "@type": "Person",
        "name": "Anuj Garg"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${url}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Add or update structured data
    let personScriptTag = document.querySelector('#person-structured-data') as HTMLScriptElement;
    if (!personScriptTag) {
      personScriptTag = document.createElement('script');
      personScriptTag.id = 'person-structured-data';
      personScriptTag.type = 'application/ld+json';
      document.head.appendChild(personScriptTag);
    }
    personScriptTag.textContent = JSON.stringify(structuredData);

    let websiteScriptTag = document.querySelector('#website-structured-data') as HTMLScriptElement;
    if (!websiteScriptTag) {
      websiteScriptTag = document.createElement('script');
      websiteScriptTag.id = 'website-structured-data';
      websiteScriptTag.type = 'application/ld+json';
      document.head.appendChild(websiteScriptTag);
    }
    websiteScriptTag.textContent = JSON.stringify(websiteData);

  }, [title, description, image, url]);

  return null;
};

export default SEOHead;
