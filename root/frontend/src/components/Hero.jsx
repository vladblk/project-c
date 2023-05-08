import React from 'react';
import illustration from '../img/undraw_camping_noc8.png'; // import your illustration image
import '../style/Hero.css';

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Campy!</h1>
          <h2 className="hero-subtitle">Unwind and unplug.</h2>
          <button className="cta-button">View Camps</button>
        </div>
        <div className="hero-image">
          <img src={illustration} alt="Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
