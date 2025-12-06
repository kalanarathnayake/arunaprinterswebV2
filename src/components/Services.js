import React from 'react';
import './Services.css';

function Services() {
  const services = [
    'Print and Deliver',
    'Annual Report',
    'Books',
    'Business Card',
    'Brouchure | Catalogue',
    'Calendar',
    'CD Burning | Stickers',
    'Complete Packaging',
    'Flyers, Leaflets',
    'Invitations',
    'Labels | Tags',
    'Letterhead and Certificate',
    'Magazines | Periodicals',
    'Posters',
    'Photocopy | Printouts',
    'Stickers',
    'Stationary | Accessories'
  ];

  const getServiceIcon = (service) => {
    const iconMap = {
      'Print and Deliver': '🚚',
      'Annual Report': '📊',
      'Books': '📚',
      'Business Card': '💼',
      'Brouchure | Catalogue': '📋',
      'Calendar': '📅',
      'CD Burning | Stickers': '💿',
      'Complete Packaging': '📦',
      'Flyers, Leaflets': '📄',
      'Invitations': '✉️',
      'Labels | Tags': '🏷️',
      'Letterhead and Certificate': '📜',
      'Magazines | Periodicals': '📖',
      'Posters': '🖼️',
      'Photocopy | Printouts': '🖨️',
      'Stickers': '🏷️',
      'Stationary | Accessories': '📝'
    };
    return iconMap[service] || '📄';
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Services</h2>
          <p className="subtitle">Comprehensive printing solutions for all your needs</p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {getServiceIcon(service)}
              </div>
              <h3>{service}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

