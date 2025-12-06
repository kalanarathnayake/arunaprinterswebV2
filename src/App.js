import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Services from './components/Services';
import About from './components/About';
import PrintAndDeliver from './components/PrintAndDeliver';
import PhotoGallery from './components/PhotoGallery';
import AdminPanel from './components/AdminPanel';
import './styles/App.css';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Check if admin route
  React.useEffect(() => {
    const checkAdminRoute = () => {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
      }
    };

    checkAdminRoute();
    
    // Listen for popstate events (back/forward button)
    window.addEventListener('popstate', checkAdminRoute);
    
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  if (showAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="App">
      <Header />
      <main id="home" className="main-content">
        <div className="welcome-section">
          <h1>Welcome to ARUNA OFFSET PRINTERS</h1>
          <p>Your trusted printing partner</p>
          <div className="location-buttons">
            <a 
              href="https://maps.app.goo.gl/vsF5w61ZSBiPeedY9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="location-btn office-btn"
            >
              <span className="btn-icon">📍</span>
              <span className="btn-text">
                <strong>Office Location</strong>
                <small>Piliyandala Road, Bandaragama</small>
              </span>
            </a>
            <a 
              href="https://maps.app.goo.gl/um69SJWbomtX1DtaA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="location-btn press-btn"
            >
              <span className="btn-icon">🏭</span>
              <span className="btn-text">
                <strong>Press Location</strong>
                <small>Baddegoda, Bandaragama</small>
              </span>
            </a>
          </div>
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons-grid">
              <a href="tel:0718002631" className="action-btn call-btn">
                <span className="btn-icon">📞</span>
                <span className="btn-text">
                  <strong>Aruna Rathnayake</strong>
                  <small>071 800 2631</small>
                </span>
              </a>
              <a href="tel:0771556157" className="action-btn call-btn">
                <span className="btn-icon">📞</span>
                <span className="btn-text">
                  <strong>Kalana Rathnayake</strong>
                  <small>077 155 6157</small>
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Services />
      <PhotoGallery />
      <About />
      <PrintAndDeliver />
      <Footer />
    </div>
  );
}

export default App;

