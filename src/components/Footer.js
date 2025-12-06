import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="contact-section">
          <h3>ARUNA OFFSET PRINTERS</h3>
          <div className="contact-info">
            <p className="address">
              <strong>Office:</strong>{' '}
              <a 
                href="https://maps.app.goo.gl/vsF5w61ZSBiPeedY9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                Piliyandala Road, Bandaragama
              </a>
            </p>
            <p className="address">
              <strong>Press:</strong>{' '}
              <a 
                href="https://maps.app.goo.gl/um69SJWbomtX1DtaA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link"
              >
                Baddegoda, Bandaragama
              </a>
            </p>
            <p className="phone">
              <strong>Aruna Rathnayake:</strong>{' '}
              <a href="tel:0718002631" className="contact-link">
                071 800 2631
              </a>
            </p>
            <p className="phone">
              <strong>Kalana Rathnayake:</strong>{' '}
              <a href="tel:0771556157" className="contact-link">
                077 155 6157
              </a>
            </p>
            <p className="email">
              <a href="mailto:arunaprint@yahoo.com" className="contact-link">
                arunaprint@yahoo.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ARUNA OFFSET PRINTERS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

