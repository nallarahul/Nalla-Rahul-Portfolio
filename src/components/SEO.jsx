import React, { useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function SEO() {
  useEffect(() => {
    document.title = `${portfolioData.personal.name} — ${portfolioData.personal.role}`;

    // Dynamic Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `${portfolioData.personal.name} — ${portfolioData.personal.tagline}`);
    }
  }, []);

  return null;
}
