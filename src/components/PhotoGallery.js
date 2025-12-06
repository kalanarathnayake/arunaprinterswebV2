import React, { useState, useEffect } from 'react';
import './PhotoGallery.css';
import { photoAPI } from '../services/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function PhotoGallery() {
  // Load photos from localStorage (managed by admin panel)
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await photoAPI.getAll();
        setPhotos(data);
      } catch (error) {
        console.error('Error loading photos:', error);
      }
    };

    loadPhotos();
    // Poll for updates every 5 seconds (or use WebSocket for real-time updates)
    const interval = setInterval(loadPhotos, 5000);
    return () => clearInterval(interval);
  }, []);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <section id="gallery" className="photo-gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Work Gallery</h2>
          <p className="subtitle">View our printing projects and completed work</p>
        </div>

        {photos.length === 0 ? (
          <div className="empty-gallery">
            <div className="empty-icon">📷</div>
            <h3>No photos yet</h3>
            <p>Use the Admin Panel to add photos to the gallery</p>
            <div className="instructions">
              <p><strong>How to add photos:</strong></p>
              <ol>
                <li>Click on "Admin" in the navigation menu</li>
                <li>Login with the admin password</li>
                <li>Add photos by uploading image files or entering image URLs</li>
                <li>Manage your photos (edit, delete) from the admin panel</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="gallery-grid">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="gallery-item"
                onClick={() => openModal(photo)}
              >
                <img
                  src={photo.src.startsWith('/uploads/') ? `${API_BASE_URL}${photo.src}` : photo.src}
                  alt={photo.title || `Gallery image ${photo.id}`}
                  loading="lazy"
                />
                {photo.title && (
                  <div className="gallery-overlay">
                    <p>{photo.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal for viewing full-size images */}
        {selectedPhoto && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              <img
                src={selectedPhoto.src.startsWith('/uploads/') ? `${API_BASE_URL}${selectedPhoto.src}` : selectedPhoto.src}
                alt={selectedPhoto.title || 'Gallery image'}
              />
              {selectedPhoto.title && (
                <p className="modal-title">{selectedPhoto.title}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PhotoGallery;

