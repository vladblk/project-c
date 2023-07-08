import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Hero from './Hero';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';

function HomePage() {
  return (
    <>
      <NavBar />
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
    </>
  );
}

export default HomePage;
