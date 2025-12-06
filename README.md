# Aruna Printers Web Application

A React-based web application for Aruna Printers with MongoDB backend.

## Project Structure

```
arunaprintersweb/
├── public/
│   └── index.html
├── server/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── index.js         # Server entry point
│   └── .env             # Server environment variables
├── src/
│   ├── assets/          # Images, fonts, and other static files
│   ├── components/      # Reusable React components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── styles/          # CSS files
│   ├── utils/           # Utility functions and helpers
│   ├── App.js           # Main App component
│   └── index.js         # Entry point
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up MongoDB:**
   - **Option 1: Local MongoDB**
     - Install MongoDB locally: https://www.mongodb.com/try/download/community
     - MongoDB will run on `mongodb://localhost:27017`
   
   - **Option 2: MongoDB Atlas (Cloud)**
     - Create a free account at https://www.mongodb.com/cloud/atlas
     - Create a cluster and get your connection string
     - Update the `MONGODB_URI` in `server/.env`

3. **Configure environment variables:**
   - Copy `server/.env.example` to `server/.env`
   - Update the MongoDB connection string:
     ```
     MONGODB_URI=mongodb://localhost:27017/arunaprinters
     # OR for MongoDB Atlas:
     # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/arunaprinters
     PORT=5000
     ```

4. **Create a `.env` file in the root for React (optional):**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## Running the Application

### Development Mode

**Option 1: Run separately (recommended for debugging):**

Terminal 1 - Start the backend server:
```bash
npm run server
```

Terminal 2 - Start the React app:
```bash
npm start
```

**Option 2: Run both together (requires `concurrently`):**
```bash
npm install -g concurrently
npm run dev
```

### Production Mode

1. **Build the React app:**
```bash
npm run build
```

2. **Start the production server:**
```bash
npm run server:prod
```

## Default Admin Credentials

- **Username:** admin
- **Password:** 1234

⚠️ **Important:** Change the default password in production!

## API Endpoints

### Photos
- `GET /api/photos` - Get all photos
- `GET /api/photos/:id` - Get a single photo
- `POST /api/photos` - Create a new photo
- `PUT /api/photos/:id` - Update a photo
- `DELETE /api/photos/:id` - Delete a photo

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/change-password` - Change admin password

### Health Check
- `GET /api/health` - Server status

## Available Scripts

- `npm start` - Runs the React app in development mode
- `npm run build` - Builds the React app for production
- `npm run server` - Runs the backend server in development mode (with nodemon)
- `npm run server:prod` - Runs the backend server in production mode
- `npm run dev` - Runs both frontend and backend concurrently (requires concurrently)
- `npm test` - Runs the test suite

## MongoDB Setup

### Local MongoDB

1. Download and install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: MongoDB should start automatically as a service
   - Mac/Linux: `mongod` or `brew services start mongodb-community`
3. The default connection string is: `mongodb://localhost:27017/arunaprinters`

### MongoDB Atlas (Cloud)

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `server/.env`

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running (local) or your Atlas cluster is active
- Check your connection string in `server/.env`
- Verify network access (for Atlas, check IP whitelist)

### CORS Errors

- The server is configured to allow CORS from `http://localhost:3000`
- If using a different port, update CORS settings in `server/index.js`

### Port Already in Use

- Change the `PORT` in `server/.env` if port 5000 is already in use
- Update `REACT_APP_API_URL` in your React `.env` file accordingly

## Learn More

- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
