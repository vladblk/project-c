import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Hero from './Hero';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import CtaSection from './CtaSection';
import Footer from './Footer';

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </>
  );
}

export default HomePage;
