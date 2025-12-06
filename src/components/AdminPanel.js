import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import { photoAPI, authAPI } from '../services/api';

function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [photos, setPhotos] = useState([]);
    const [newPhoto, setNewPhoto] = useState({ title: '', url: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [editingPhoto, setEditingPhoto] = useState(null);
    const [error, setError] = useState('');

    // Check if user is already logged in
    useEffect(() => {
        const savedAuth = localStorage.getItem('adminAuthenticated');
        if (savedAuth === 'true') {
            setIsAuthenticated(true);
            loadPhotos();
        }
    }, []);

    // Load photos from API
    const loadPhotos = async () => {
        try {
            const data = await photoAPI.getAll();
            setPhotos(data);
        } catch (error) {
            setError('Failed to load photos: ' + error.message);
            console.error('Error loading photos:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await authAPI.login(password);
            if (response.success) {
                setIsAuthenticated(true);
                localStorage.setItem('adminAuthenticated', 'true');
                await loadPhotos();
            }
        } catch (error) {
            setError(error.message || 'Incorrect password. Please try again.');
        }
    };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setPassword('');
    // Redirect to home
    window.location.href = '/';
  };

    const handleAddPhoto = async (e) => {
        e.preventDefault();
        if (!selectedFile && !newPhoto.url.trim()) {
            setError('Please either upload an image file or enter an image URL');
            return;
        }

        setError('');
        try {
            const photoData = {
                title: newPhoto.title.trim() || `Photo ${photos.length + 1}`,
                url: newPhoto.url.trim() || ''
            };
            const newPhotoData = await photoAPI.create(photoData, selectedFile);
            setPhotos([...photos, newPhotoData]);
            setNewPhoto({ title: '', url: '' });
            setSelectedFile(null);
            // Reset file input
            const fileInput = document.getElementById('photo-file');
            if (fileInput) fileInput.value = '';
        } catch (error) {
            setError('Failed to add photo: ' + error.message);
        }
    };

    const handleDeletePhoto = async (id) => {
        if (window.confirm('Are you sure you want to delete this photo?')) {
            try {
                await photoAPI.delete(id);
                const updatedPhotos = photos.filter(photo => photo.id !== id);
                setPhotos(updatedPhotos);
            } catch (error) {
                setError('Failed to delete photo: ' + error.message);
            }
        }
    };

    const handleEditPhoto = (photo) => {
        setEditingPhoto(photo);
        setNewPhoto({ title: photo.title, url: photo.src.startsWith('/uploads/') ? '' : photo.src });
        setSelectedFile(null);
        // Reset file input
        const fileInput = document.getElementById('photo-file');
        if (fileInput) fileInput.value = '';
    };

    const handleUpdatePhoto = async (e) => {
        e.preventDefault();
        if (!selectedFile && !newPhoto.url.trim()) {
            setError('Please either upload a new image file or enter an image URL');
            return;
        }

        setError('');
        try {
            const photoData = {
                title: newPhoto.title.trim() || editingPhoto.title,
                url: newPhoto.url.trim() || ''
            };
            const updatedPhoto = await photoAPI.update(editingPhoto.id, photoData, selectedFile);
            const updatedPhotos = photos.map(photo =>
                photo.id === editingPhoto.id ? updatedPhoto : photo
            );
            setPhotos(updatedPhotos);
            setEditingPhoto(null);
            setNewPhoto({ title: '', url: '' });
            setSelectedFile(null);
            // Reset file input
            const fileInput = document.getElementById('photo-file');
            if (fileInput) fileInput.value = '';
        } catch (error) {
            setError('Failed to update photo: ' + error.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingPhoto(null);
        setNewPhoto({ title: '', url: '' });
        setSelectedFile(null);
        setError('');
        // Reset file input
        const fileInput = document.getElementById('photo-file');
        if (fileInput) fileInput.value = '';
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
                e.target.value = '';
                return;
            }
            // Validate file size (10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError('File size must be less than 10MB');
                e.target.value = '';
                return;
            }
            setSelectedFile(file);
            setError('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="login-container">
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="login-btn">Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h2>Photo Gallery Admin Panel</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            <div className="contact-info-section">
                <h3>Contact Information</h3>
                <div className="contact-details">
                    <p>
                        <strong>Aruna Rathnayake:</strong>{' '}
                        <a href="tel:0718002631">071 800 2631</a>
                    </p>
                    <p>
                        <strong>Kalana Rathnayake:</strong>{' '}
                        <a href="tel:0771556157">077 155 6157</a>
                    </p>
                </div>
            </div>

            <div className="admin-content">
                <div className="admin-section">
                    <h3>{editingPhoto ? 'Edit Photo' : 'Add New Photo'}</h3>
                    <form onSubmit={editingPhoto ? handleUpdatePhoto : handleAddPhoto}>
                        <div className="form-group">
                            <label htmlFor="photo-title">Photo Title (Optional)</label>
                            <input
                                type="text"
                                id="photo-title"
                                value={newPhoto.title}
                                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                                placeholder="Enter photo title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo-file">Upload Image File *</label>
                            <input
                                type="file"
                                id="photo-file"
                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                onChange={handleFileChange}
                            />
                            <small>Select an image file (JPEG, PNG, GIF, or WebP - Max 10MB)</small>
                            {selectedFile && (
                                <div style={{ marginTop: '0.5rem', color: '#10b981', fontSize: '0.9rem' }}>
                                    ✓ Selected: {selectedFile.name}
                                </div>
                            )}
                        </div>
                        <div className="form-group" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                            <label htmlFor="photo-url">OR Enter Image URL</label>
                            <input
                                type="url"
                                id="photo-url"
                                value={newPhoto.url}
                                onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                            />
                            <small>Enter the full URL of the image (if not uploading a file)</small>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <div className="form-actions">
                            <button type="submit" className="submit-btn">
                                {editingPhoto ? 'Update Photo' : 'Add Photo'}
                            </button>
                            {editingPhoto && (
                                <button type="button" onClick={handleCancelEdit} className="cancel-btn">
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="admin-section">
                    <h3>Manage Photos ({photos.length})</h3>
                    {photos.length === 0 ? (
                        <div className="empty-state">
                            <p>No photos added yet. Add your first photo above!</p>
                        </div>
                    ) : (
                        <div className="photos-list">
                            {photos.map((photo) => (
                                <div key={photo.id} className="photo-item">
                                    <div className="photo-preview">
                                        <img 
                                            src={photo.src.startsWith('/uploads/') 
                                                ? `http://localhost:5000${photo.src}` 
                                                : photo.src} 
                                            alt={photo.title} 
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/150?text=Image+Error';
                                            }} 
                                        />
                                    </div>
                                    <div className="photo-info">
                                        <h4>{photo.title}</h4>
                                        <p className="photo-url">{photo.src}</p>
                                    </div>
                                    <div className="photo-actions">
                                        <button onClick={() => handleEditPhoto(photo)} className="edit-btn">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeletePhoto(photo.id)} className="delete-btn">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;

