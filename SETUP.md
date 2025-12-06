# MongoDB Setup Guide

## Quick Start

1. **Install MongoDB dependencies:**
```bash
npm install
```

2. **Set up MongoDB:**

   **Option A: Local MongoDB**
   - Download and install from: https://www.mongodb.com/try/download/community
   - Start MongoDB service
   - Connection string: `mongodb://localhost:27017/arunaprinters`

   **Option B: MongoDB Atlas (Cloud - Free)**
   - Sign up at: https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/arunaprinters`

3. **Create environment file:**
   - Create `server/.env` file
   - Add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/arunaprinters
   PORT=5000
   ```

4. **Start the backend server:**
```bash
npm run server
```

5. **Start the React app (in another terminal):**
```bash
npm start
```

## Default Admin Login

- Username: `admin`
- Password: `1234`

⚠️ **Change the password in production!**

## Troubleshooting

### "Cannot connect to MongoDB"
- Make sure MongoDB is running
- Check your connection string in `server/.env`
- For Atlas: Verify IP whitelist includes your IP

### "Port 5000 already in use"
- Change `PORT` in `server/.env`
- Update `REACT_APP_API_URL` in React `.env` if needed

### "Module not found"
- Run `npm install` to install all dependencies

