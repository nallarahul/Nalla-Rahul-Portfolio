import React from 'react';
import FluidCursor from './components/effects/FluidCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import SEO from './components/SEO';
import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-dark text-steel-100 relative font-body selection:bg-amber-500/20 selection:text-amber-400">
      <SEO />
      <ScrollProgress />
      <FluidCursor />
      <Navbar />

      <main className="relative">
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
