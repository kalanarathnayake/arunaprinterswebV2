# Backend Deployment Guide

## Why Separate Deployment?

Netlify **cannot run Express servers**. It only hosts static files and serverless functions. Your backend needs to be deployed separately.

## Quick Deployment Options

### Option 1: Railway (Recommended - Easiest & Free Tier)

1. **Go to [railway.app](https://railway.app)** and sign up with GitHub
2. **Click "New Project"** → **"Deploy from GitHub repo"**
3. **Select your repository**
4. **Configure the deployment:**
   - Railway will auto-detect it's a Node.js app
   - **Root Directory:** Set to `server` (important!)
   - **Start Command:** `npm start` (or leave blank, it will use package.json)
5. **Add Environment Variables:**
   - Click on your service → **Variables** tab
   - Add:
     - `MONGODB_URI` = your MongoDB Atlas connection string
     - `ALLOWED_ORIGINS` = your Netlify URL (e.g., `https://your-site.netlify.app`)
     - `PORT` = Railway sets this automatically, but you can override
6. **Deploy!** Railway will automatically:
   - Run `npm install` in the `server` directory
   - Start your server with `npm start`
7. **Get your backend URL:**
   - Railway will give you a URL like: `https://your-app.railway.app`
   - Your API will be at: `https://your-app.railway.app/api`

### Option 2: Render (Free Tier Available)

1. **Go to [render.com](https://render.com)** and sign up
2. **Click "New"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Name:** arunaprinters-backend (or any name)
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install` (or leave blank)
   - **Start Command:** `npm start`
5. **Add Environment Variables:**
   - `MONGODB_URI` = your MongoDB connection string
   - `ALLOWED_ORIGINS` = your Netlify URL
6. **Deploy!**
7. **Get your backend URL:** `https://your-app.onrender.com/api`

### Option 3: Heroku (Paid, but reliable)

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login:**
   ```bash
   heroku login
   ```

3. **Create app:**
   ```bash
   cd server
   heroku create your-app-name
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set ALLOWED_ORIGINS=https://your-site.netlify.app
   ```

5. **Deploy:**
   ```bash
   git subtree push --prefix server heroku main
   ```

## After Backend Deployment

### Step 1: Update Netlify Environment Variables

1. Go to your Netlify site dashboard
2. **Site settings** → **Environment variables**
3. Add/Update:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-backend-url.railway.app/api` (or your backend URL)

### Step 2: Redeploy Frontend

1. In Netlify, go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. This will rebuild your React app with the new API URL

## Testing Your Deployment

1. **Test backend health:**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Test from frontend:**
   - Open your Netlify site
   - Open browser console (F12)
   - Check if API calls are working
   - Look for any CORS errors

## Troubleshooting

### Backend won't start
- Check logs in Railway/Render dashboard
- Verify `MONGODB_URI` is set correctly
- Make sure Root Directory is set to `server`

### CORS errors
- Add your Netlify URL to `ALLOWED_ORIGINS` environment variable
- Format: `https://your-site.netlify.app` (no trailing slash)
- Redeploy backend after changing environment variables

### API calls fail
- Verify `REACT_APP_API_URL` is set in Netlify
- Check backend is running (visit `/api/health`)
- Check browser console for errors
- Verify CORS is configured correctly

### MongoDB connection fails
- Check MongoDB Atlas Network Access allows all IPs (0.0.0.0/0) or your hosting provider's IPs
- Verify connection string is correct
- Check MongoDB Atlas cluster is running

## Environment Variables Summary

### Backend (Railway/Render/Heroku):
- `MONGODB_URI` - Your MongoDB connection string
- `ALLOWED_ORIGINS` - Your Netlify URL (e.g., `https://your-site.netlify.app`)
- `PORT` - Usually set automatically by hosting provider

### Frontend (Netlify):
- `REACT_APP_API_URL` - Your backend API URL (e.g., `https://your-backend.railway.app/api`)

## Quick Checklist

- [ ] Backend deployed on Railway/Render/Heroku
- [ ] `MONGODB_URI` set in backend environment variables
- [ ] `ALLOWED_ORIGINS` set in backend environment variables
- [ ] Backend health check works (`/api/health`)
- [ ] `REACT_APP_API_URL` set in Netlify environment variables
- [ ] Frontend redeployed on Netlify
- [ ] Tested API calls from frontend
- [ ] No CORS errors in browser console

