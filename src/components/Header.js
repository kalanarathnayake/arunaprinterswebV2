import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    closeMenu();
    window.location.href = '/admin';
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>ARUNA OFFSET PRINTERS</h1>
        </div>
        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="/admin" onClick={handleAdminClick} className="admin-link">Admin</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;

