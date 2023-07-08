import React from 'react';
import { FaMapMarkerAlt, FaCalendarCheck, FaShoppingBasket } from 'react-icons/fa';
import '../style/FeaturesSection.css';

function FeaturesSection() {
  const features = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Discover Amazing Campsites',
      description: 'Explore a wide range of campsites in beautiful locations with detailed information and reviews.',
    },
    {
      icon: <FaCalendarCheck />,
      title: 'Plan Your Camping Trip',
      description: 'Plan your camping adventure by checking availability, amenities, and booking campsites in advance.',
    },
    {
      icon: <FaShoppingBasket />,
      title: 'Shop Quality Camping Products',
      description: 'Browse and purchase a variety of camping gear, equipment, and accessories from our online shop.',
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Key features of Campy</h2>
        <div className="features">
          {features.map((feature, index) => (
            <div key={index} className="feature">
              <span className="feature-icon">{feature.icon}</span>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
