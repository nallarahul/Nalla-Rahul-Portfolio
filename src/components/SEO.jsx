import React, { useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

/**
 * Dynamic SEO Component
 * Automatically manages document title, meta descriptions, canonical link,
 * OpenGraph, Twitter card tags, and JSON-LD structured schemas.
 */
export default function SEO() {
  useEffect(() => {
    const titleText = `${portfolioData.personal.name} — ${portfolioData.personal.role} & System Architect`;
    const descText = `${portfolioData.personal.name} — ${portfolioData.personal.tagline}`;

    // Document Title
    document.title = titleText;

    // Helper for updating meta tags dynamically
    const updateMeta = (nameAttr, nameVal, content) => {
      let el = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(nameAttr, nameVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('name', 'description', descText);
    updateMeta('name', 'title', titleText);
    updateMeta('property', 'og:title', titleText);
    updateMeta('property', 'og:description', descText);
    updateMeta('property', 'twitter:title', titleText);
    updateMeta('property', 'twitter:description', descText);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname);
  }, []);

  return null;
}
