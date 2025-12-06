const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

// Get all photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    // Transform to match frontend format
    const formattedPhotos = photos.map(photo => ({
      id: photo._id.toString(),
      title: photo.title,
      src: photo.src
    }));
    res.json(formattedPhotos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photos', message: error.message });
  }
});

// Get a single photo by ID
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.json({
      id: photo._id.toString(),
      title: photo.title,
      src: photo.src
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photo', message: error.message });
  }
});

// Create a new photo (supports both file upload and URL)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, url } = req.body;
    
    let imageSrc;
    
    // Check if file was uploaded
    if (req.file) {
      // File upload: use the uploaded file path
      imageSrc = `/uploads/${req.file.filename}`;
    } else if (url && url.trim()) {
      // URL provided: use the URL
      imageSrc = url.trim();
    } else {
      return res.status(400).json({ error: 'Either an image file or image URL is required' });
    }

    const photo = new Photo({
      title: title || '',
      src: imageSrc
    });

    const savedPhoto = await photo.save();
    res.status(201).json({
      id: savedPhoto._id.toString(),
      title: savedPhoto.title,
      src: savedPhoto.src
    });
  } catch (error) {
    // Delete uploaded file if photo creation failed
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({ error: 'Failed to create photo', message: error.message });
  }
});

// Update a photo (supports both file upload and URL)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, url } = req.body;
    
    // Get existing photo to delete old file if needed
    const existingPhoto = await Photo.findById(req.params.id);
    if (!existingPhoto) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    let imageSrc = existingPhoto.src; // Keep existing src by default
    
    // Check if new file was uploaded
    if (req.file) {
      // Delete old file if it was an uploaded file (not a URL)
      if (existingPhoto.src.startsWith('/uploads/')) {
        const oldFilePath = path.join(__dirname, '../uploads', path.basename(existingPhoto.src));
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      imageSrc = `/uploads/${req.file.filename}`;
    } else if (url && url.trim()) {
      // URL provided: use the URL
      // Delete old file if it was an uploaded file
      if (existingPhoto.src.startsWith('/uploads/')) {
        const oldFilePath = path.join(__dirname, '../uploads', path.basename(existingPhoto.src));
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      imageSrc = url.trim();
    }

    const photo = await Photo.findByIdAndUpdate(
      req.params.id,
      {
        title: title !== undefined ? title : existingPhoto.title,
        src: imageSrc,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    res.json({
      id: photo._id.toString(),
      title: photo.title,
      src: photo.src
    });
  } catch (error) {
    // Delete uploaded file if update failed
    if (req.file) {
      const filePath = path.join(__dirname, '../uploads', req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    res.status(500).json({ error: 'Failed to update photo', message: error.message });
  }
});

// Delete a photo
router.delete('/:id', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Delete the file if it's an uploaded file (not a URL)
    if (photo.src.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../uploads', path.basename(photo.src));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Photo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete photo', message: error.message });
  }
});

module.exports = router;

