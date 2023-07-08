import React from 'react';
import '../style/TestimonialsSection.css';

function TestimonialsSection() {
  const testimonials = [
    {
      name: 'John Doe',
      testimonial: 'Campy is an amazing platform for finding the perfect campsite. I had an incredible experience and can\'t wait to plan my next camping trip!',
    },
    {
      name: 'Jane Smith',
      testimonial: 'I love the camping products available on Campy\'s online shop. The quality is top-notch, and the prices are great. Highly recommended!',
    },
    {
      name: 'Sam Wilson',
      testimonial: 'Campy made it so easy for me to discover and book campsites. The detailed information and reviews helped me choose the perfect spot. Thanks, Campy!',
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">Testimonials</h2>
        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <p className="testimonial-text">{testimonial.testimonial}</p>
              <p className="testimonial-name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
