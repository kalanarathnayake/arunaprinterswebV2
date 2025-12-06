const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Admin = require('../models/Admin');

// Initialize default admin if it doesn't exist
const initializeAdmin = async () => {
  try {
    // Wait for mongoose connection
    if (mongoose.connection.readyState !== 1) {
      await new Promise((resolve) => {
        mongoose.connection.once('connected', resolve);
      });
    }
    
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultAdmin = new Admin({
        username: 'admin',
        password: '1234' // Default password, should be changed in production
      });
      await defaultAdmin.save();
      console.log('✅ Default admin created (username: admin, password: 1234)');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({ 
      success: true, 
      message: 'Login successful',
      authenticated: true 
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', message: error.message });
  }
});

// Change password endpoint
router.post('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    const admin = await Admin.findOne({ username: 'admin' });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password', message: error.message });
  }
});

// Export router with initializeAdmin function attached
router.initializeAdmin = initializeAdmin;
module.exports = router;

