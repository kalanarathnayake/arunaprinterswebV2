const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const photoRoutes = require('./routes/photos');
const authRoutes = require('./routes/auth');

// Load .env file from server directory
const envPath = path.join(__dirname, '.env');
dotenv.config({ path: envPath });

// Debug: Log the connection string (without password for security)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/arunaprinters';
if (!process.env.MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI not found in environment variables');
  console.warn(`   Looking for .env file at: ${envPath}`);
  console.warn('   Using fallback: mongodb://localhost:27017/arunaprinters');
} else {
  const uriWithoutPassword = MONGODB_URI.replace(/:[^:@]+@/, ':****@');
  console.log(`📝 Using MongoDB URI: ${uriWithoutPassword}`);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/photos', photoRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// MongoDB connection (MONGODB_URI is set above)

mongoose.connect(MONGODB_URI, {
  retryWrites: true,
  w: 'majority',
})
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    
    // Initialize admin after connection is established
    const authRoutes = require('./routes/auth');
    await authRoutes.initializeAdmin();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    console.error('Please check:');
    console.error('1. Your MongoDB Atlas connection string in server/.env');
    console.error('2. Your IP address is whitelisted in MongoDB Atlas Network Access');
    console.error('3. Your username and password are correct');
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

module.exports = app;

