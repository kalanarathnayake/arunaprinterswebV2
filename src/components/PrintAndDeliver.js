import React from 'react';
import './PrintAndDeliver.css';

function PrintAndDeliver() {
  return (
    <section className="print-deliver-section">
      <div className="container">
        <div className="section-header">
          <h2>We Print and Deliver</h2>
          <p className="subtitle">We offer printing and delivering services Island-Wide</p>
        </div>

        <div className="content-wrapper">
          <div className="description-section">
            <h3>Print and Deliver</h3>
            <p>
              We offer high quality quick printing and delivering services in Sri Lanka.
            </p>
            <p>
              Based on your requirements we can provide fast printing and delivering services for 
              Business Cards, Letterheads, Certificates and Leaflets.
            </p>
            <p>
              We offer Free Delivery within Colombo and usually we hope to deliver your printed 
              products within the same business day. However this might change based on your 
              requirements including quantity.
            </p>
            <p>
              Get in touch with us, we can ensure that you provided with the best quality printing 
              service in Sri Lanka. Call us today!
            </p>
          </div>

          <div className="locations-section">
            <div className="location-card">
              <h4>Office Location</h4>
              <p className="location-address">Piliyandala Road, Bandaragama</p>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=6.716628445209352,79.98645792636572&output=embed&hl=en&z=15"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location - Piliyandala Road, Bandaragama"
                ></iframe>
                <div className="map-fallback">
                  <p>Unable to load map. <a href="https://maps.app.goo.gl/vsF5w61ZSBiPeedY9" target="_blank" rel="noopener noreferrer">Click here to view on Google Maps</a></p>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/vsF5w61ZSBiPeedY9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                View on Google Maps →
              </a>
            </div>

            <div className="location-card">
              <h4>Press Location</h4>
              <p className="location-address">Baddegoda, Bandaragama</p>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps?q=6.731280706243412,79.99614943041958&output=embed&hl=en&z=15"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Press Location - Baddegoda, Bandaragama"
                ></iframe>
                <div className="map-fallback">
                  <p>Unable to load map. <a href="https://maps.app.goo.gl/um69SJWbomtX1DtaA" target="_blank" rel="noopener noreferrer">Click here to view on Google Maps</a></p>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/um69SJWbomtX1DtaA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrintAndDeliver;

