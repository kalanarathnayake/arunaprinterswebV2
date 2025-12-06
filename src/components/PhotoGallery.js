import React, { useState } from 'react';
import './PhotoGallery.css';

function PhotoGallery() {
  // Hardcoded gallery images - Offset Printing Work
  const hardcodedPhotos = [
    {
      id: 1,
      src: 'https://www.arka.com/cdn/shop/files/what-is-offset-printing-packaging.jpg?v=1702472085&width=800',
      title: 'Offset Printing Packaging'
    },
    {
      id: 2,
      src: 'https://media.istockphoto.com/id/179225493/photo/offset-printing-press.jpg?s=612x612&w=0&k=20&c=NmiL6X6c_dRZocrX3hceFf4hdWyUdKHg9VhJ4UmNr9E=',
      title: 'Offset Printing Press'
    },
    {
      id: 3,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReHzodmvGs28VhJpr034uJWmxr9yzZythaZg&s',
      title: 'Printing Equipment'
    },
    {
      id: 4,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6SDS-YGY5MNXvBD4QFTfVIkH0I2ZvkOxZwQ&s',
      title: 'Offset Printing Machine'
    },
    {
      id: 5,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFywu1p9hLyPRHcpljmGqpaDHaodw58eHE6w&s',
      title: 'Printing Press'
    },
    {
      id: 6,
      src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSx2qjc_bSBxZcw24gQqxJT8pO17SrpP6CUYT_TMEf6zrKBIMGlGRw712Zc0aIDof4NLUuwe77cfH9JU_XNuRbz-x1QYzoTHzXAwAQ9nyH7phACLBmFPOPNuHgCw1cPB3ULz-uXO=s1360-w1360-h1020-rw',
      title: 'Printing Work'
    },
    {
      id: 7,
      src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSzb28odvGXkw4KPnis4E0tU8dM1qDlxmRelqOKn2bvjKfi8Eb4CSJOinEZsH6wMALploP1vcjxJPkzOJIzUfnm4f4rkc2UQjzZTdqzzi_ErTtApi-bL76rbxCYhdykT7WsbGim94w=w141-h101-n-k-no-nu',
      title: 'Printing Services'
    },
    {
      id: 8,
      src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSz3dG5-c7ysH1jo32bTcRRiHZ9uojNvOY5HXEbqFRmIdkKyD76h5lK53mT5mW6YS7wew99A76YyHA2iSIJNtq4p_5qWQ6abnisMc04cdRucLPRCTGKX56SyL6k19y_j6DX6Tj1Z=w141-h235-n-k-no-nu',
      title: 'Print Production'
    },
    {
      id: 9,
      src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyzJhWquavSLwpr82XUKotcJLzJtsnEpou6K5hdhUzy3vkbWguwmujnufYNPkoxfRFnkPdoCZ8LxMptt8ELJch7wrtym4xh8w55m2b3s1ExEq7i0UVTiAtlACWiS_DohCSnZEy-Mw=w141-h176-n-k-no-nu',
      title: 'Offset Printing'
    },
    {
      id: 10,
      src: 'https://lh3.googleusercontent.com/p/AF1QipMC_sAuyHa2bqJI9lfPIKASJOU69ZHZzd2QIIht=w141-h101-n-k-no-nu',
      title: 'Printing Facility'
    },
    {
      id: 11,
      src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy9PMukixntlLJJkbOzcB7GUwJvfqiGD5XmC4voyecMLDQN2KRAz-3X5ra1xtJxoGsc3HAA6GSrSIEwNPaUPNIjX_drsqly4MaduvvLGCF0ZUhSh2gEoHk1OZ-q5tK-Xdktk8ZuLg=w141-h101-n-k-no-nu',
      title: 'Printing Solutions'
    },
    {
      id: 12,
      src: 'https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyZu3NCOiG65QMI6TRruD0POR8RBO3gXPbwLV1J37LI451W0s10aSG4IgwkQ7gsr4lKoz0TVznzznm0mKkDix8cDZdzVvnUKfkA1I95GguZPdA4VJz1jiR35YlMk2ARAfkPRVo-=s1360-w1360-h1020-rw',
      title: 'Offset Printing Work'
    }
  ];

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

        <div className="gallery-grid">
          {hardcodedPhotos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-item"
              onClick={() => openModal(photo)}
            >
              <img
                src={photo.src}
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

        {/* Modal for viewing full-size images */}
        {selectedPhoto && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              <img
                src={selectedPhoto.src}
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

