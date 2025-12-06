import React from 'react';
import './About.css';

function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <h2>About Us</h2>
          <p className="subtitle">Your trusted printing partner in Sri Lanka</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <h3>ARUNA OFFSET PRINTERS</h3>
            <p>
              We are a leading printing company in Sri Lanka, specializing in high-quality 
              offset printing services. With years of experience in the industry, we have 
              built a reputation for excellence, reliability, and customer satisfaction.
            </p>
            <p>
              Our state-of-the-art printing facilities and skilled team ensure that every 
              project is completed to the highest standards. We offer a wide range of 
              printing services to meet all your business and personal printing needs.
            </p>
            <p>
              At ARUNA OFFSET PRINTERS, we are committed to delivering exceptional quality, 
              timely service, and competitive pricing. Your satisfaction is our priority, 
              and we strive to exceed your expectations with every order.
            </p>
          </div>
          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">✓</div>
              <h4>Quality Assurance</h4>
              <p>We guarantee top-quality printing for all our products</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h4>Fast Delivery</h4>
              <p>Quick turnaround times to meet your deadlines</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h4>Competitive Prices</h4>
              <p>Affordable pricing without compromising on quality</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🤝</div>
              <h4>Customer Service</h4>
              <p>Dedicated support throughout your printing journey</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

