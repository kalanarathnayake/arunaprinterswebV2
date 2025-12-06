import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p className="subtitle">Get in touch with us for all your printing needs</p>
        </div>
        <div className="contact-content">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <div className="contact-icon">📞</div>
              </div>
              <h4>Phone</h4>
              <div className="contact-info">
                <p>
                  <strong>Aruna Rathnayake</strong>
                </p>
                <p>
                  <a href="tel:0718002631">071 800 2631</a>
                </p>
                <p>
                  <strong>Kalana Rathnayake</strong>
                </p>
                <p>
                  <a href="tel:0771556157">077 155 6157</a>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <div className="contact-icon">✉️</div>
              </div>
              <h4>Email</h4>
              <div className="contact-info">
                <p>
                  <a href="mailto:arunaprint@yahoo.com">arunaprint@yahoo.com</a>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <div className="contact-icon">📍</div>
              </div>
              <h4>Office</h4>
              <div className="contact-info">
                <p>
                  <a 
                    href="https://maps.app.goo.gl/vsF5w61ZSBiPeedY9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Piliyandala Road, Bandaragama
                  </a>
                </p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <div className="contact-icon">🏭</div>
              </div>
              <h4>Press</h4>
              <div className="contact-info">
                <p>
                  <a 
                    href="https://maps.app.goo.gl/um69SJWbomtX1DtaA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Baddegoda, Bandaragama
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="contact-actions-section">
            <h3>Quick Actions</h3>
            <div className="action-buttons-grid">
              <a href="tel:0718002631" className="action-btn call-btn">
                <span className="btn-icon">📞</span>
                <span className="btn-text">
                  <strong>Call Aruna</strong>
                  <small>071 800 2631</small>
                </span>
              </a>
              <a href="tel:0771556157" className="action-btn call-btn">
                <span className="btn-icon">📞</span>
                <span className="btn-text">
                  <strong>Call Kalana</strong>
                  <small>077 155 6157</small>
                </span>
              </a>
              <a 
                href="https://maps.app.goo.gl/vsF5w61ZSBiPeedY9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn location-btn"
              >
                <span className="btn-icon">📍</span>
                <span className="btn-text">
                  <strong>Office Location</strong>
                  <small>View on Maps</small>
                </span>
              </a>
              <a 
                href="https://maps.app.goo.gl/um69SJWbomtX1DtaA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="action-btn location-btn"
              >
                <span className="btn-icon">🏭</span>
                <span className="btn-text">
                  <strong>Press Location</strong>
                  <small>View on Maps</small>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;

