import React, { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  author?: string;
}

export default function SEO({
  title = "MAJID — Category-Defining Digital Architecture & Full-Stack Engineering",
  description = "Custom high-performance web applications, bespoke UI/UX design, AI solutions, and full-stack digital architecture engineered by Majid.",
  keywords = "Majid, Digital Architecture, Full Stack Developer, Web Development, UI UX Design, AI Engineering, React, TypeScript, High Performance Web Apps",
  ogImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  ogType = "website",
  canonicalUrl = "https://majid-portfolio.dev",
  author = "Majid",
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (selector: string, attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update or create link tags (e.g. canonical)
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    setMetaTag('meta[name="author"]', 'name', 'author', author);
    setMetaTag('meta[name="theme-color"]', 'name', 'theme-color', '#070707');

    // OpenGraph Meta Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'MAJID Portfolio');

    // Twitter Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    setMetaTag('meta[name="twitter:site"]', 'name', 'twitter:site', '@ArainD41848');
    setMetaTag('meta[name="twitter:creator"]', 'name', 'twitter:creator', '@ArainD41848');

    // Canonical link
    setLinkTag('canonical', canonicalUrl);

    // Schema.org Structured Data with social sameAs links
    const schemaId = "schema-person-jsonld";
    let scriptElement = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = schemaId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Majid Arain",
      jobTitle: "Growth Partner & Technical Architect",
      url: canonicalUrl,
      image: ogImage,
      sameAs: [
        "https://www.facebook.com/people/Majid-Arain/pfbid0wokN8MPoC9xgoAucz2ZDG77VzhAx6KWdtBqHvDFjtqf8GbqM9YND8H1XoZsjS3kVl/",
        "https://www.instagram.com/majidarain778866/",
        "https://github.com/majidarain778866-ui",
        "https://x.com/ArainD41848",
        "https://www.linkedin.com/in/majid-arain-bb6a03393/",
      ],
      email: "mailto:majidarain778866@gmail.com",
    });

  }, [title, description, keywords, ogImage, ogType, canonicalUrl, author]);

  return null; // Head-only side-effect component
}
