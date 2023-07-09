import React from 'react';
import { Link } from 'react-router-dom';
import '../style/CtaSection.css';

function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <h2 className="section-title">Join Campy Today!</h2>
        <p className="section-description">Start your camping adventure now.</p>
        <Link to={'/signup'} className="cta-button">Sign Up</Link>
      </div>
    </section>
  );
}

export default CtaSection;
