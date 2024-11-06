import React, { useEffect } from 'react';
import './App.css';

function Testimonials() {
  useEffect(() => {
    const testimonialScroll = document.querySelector('.testimonial-scroll');
    const slides = document.querySelectorAll('.slide-image');

    // Clone the slides to create an infinite loop
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      testimonialScroll.appendChild(clone);
    });
  }, []);

  return (
    <div className="testimonial-container">
      <div className="testimonial-scroll">
        {/* Slide images */}
        <div className="slide-image">
          <img src="/crm2.jpg" alt="Slide 1" />
        </div>
        <div className="slide-image">
          <img src="/crm.jpg" alt="Slide 5" />
        </div>
        <div className="slide-image">
          <img src="/crm4.jpg" alt="Slide 2" />
        </div>
        <div className="slide-image">
          <img src="/crm2.jpg" alt="Slide 4" />
        </div>
        <div className="slide-image">
          <img src="/crm3.jpg" alt="Slide 3" />
        </div>
       
        
      </div>
    </div>
  );
}

export default Testimonials;
