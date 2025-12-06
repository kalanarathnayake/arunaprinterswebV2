const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const photoRoutes = require('./routes/photos');
const authRoutes = require('./routes/auth');

// Load .env file from server directory (only in development)
if (process.env.NODE_ENV !== 'production') {
  const envPath = path.join(__dirname, '.env');
  dotenv.config({ path: envPath });
}

// Debug: Log the connection string (without password for security)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/arunaprinters';
if (!process.env.MONGODB_URI) {
  console.warn('⚠️  MONGODB_URI not found in environment variables');
  console.warn('   Using fallback: mongodb://localhost:27017/arunaprinters');
} else {
  const uriWithoutPassword = MONGODB_URI.replace(/:[^:@]+@/, ':****@');
  console.log(`📝 Using MongoDB URI: ${uriWithoutPassword}`);
}

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow requests from Netlify and localhost
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

// Add common Netlify patterns if not specified
if (!process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push('https://*.netlify.app');
}

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches allowed origins
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        // Handle wildcard patterns like *.netlify.app
        const pattern = allowed.replace('*', '.*');
        return new RegExp(pattern).test(origin);
      }
      return origin === allowed;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
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

