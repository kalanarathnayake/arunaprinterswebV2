# Netlify Deployment Guide

## Overview

This guide explains how to deploy your Aruna Printers web application to Netlify. **Important:** Netlify can host your React frontend, but your Express backend needs to be deployed separately.

## How Netlify Handles npm Installation

✅ **Netlify automatically runs `npm install` during deployment!** You don't need to do anything special. Here's what happens:

1. Netlify detects your `package.json` file
2. Automatically runs `npm install` to install all dependencies
3. Runs your build command (`npm run build`)
4. Deploys the built files from the `build` directory

## Frontend Deployment (Netlify)

### Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub, GitLab, or Bitbucket
2. Ensure `.env` files are in `.gitignore` (they should be)

### Step 2: Deploy to Netlify

**Option A: Deploy via Netlify Dashboard (Recommended for first time)**

1. Go to [netlify.com](https://www.netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Netlify will auto-detect your settings:
   - **Build command:** `npm run build` (already configured in `netlify.toml`)
   - **Publish directory:** `build` (already configured in `netlify.toml`)
5. Click "Deploy site"

**Option B: Deploy via Netlify CLI**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Step 3: Configure Environment Variables

1. In Netlify Dashboard, go to **Site settings** → **Environment variables**
2. Add the following variable:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your backend API URL (e.g., `https://your-backend.herokuapp.com/api` or `https://your-backend.railway.app/api`)

⚠️ **Important:** The value must start with `REACT_APP_` for React to access it!

### Step 4: Redeploy

After adding environment variables, trigger a new deployment:
- Go to **Deploys** tab → Click **Trigger deploy** → **Deploy site**

## Backend Deployment Options

Since Netlify can't host Express servers directly, you need to deploy your backend separately. Here are the best options:

### Option 1: Railway (Recommended - Easy & Free tier available)

1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect it's a Node.js app
5. Set environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `PORT` - Railway will set this automatically
6. Deploy!

### Option 2: Render (Free tier available)

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `server` (or leave blank if deploying from root)
   - **Build Command:** `npm install` (or leave blank)
   - **Start Command:** `node server/index.js` or `npm run server:prod`
5. Add environment variables:
   - `MONGODB_URI`
   - `PORT` (Render will set this, but you can override)
6. Deploy!

### Option 3: Heroku (Paid, but reliable)

1. Install Heroku CLI: `npm install -g heroku`
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   ```
5. Deploy: `git push heroku main`

### Option 4: Convert to Netlify Functions (Advanced)

You can convert your Express routes to Netlify Functions, but this requires significant refactoring.

## Complete Deployment Checklist

### Frontend (Netlify)
- [ ] Code pushed to Git repository
- [ ] `netlify.toml` file created (✅ Already done)
- [ ] Site deployed on Netlify
- [ ] `REACT_APP_API_URL` environment variable set in Netlify
- [ ] Site is accessible and working

### Backend (Separate hosting)
- [ ] Backend deployed on Railway/Render/Heroku
- [ ] `MONGODB_URI` environment variable set
- [ ] Backend API is accessible
- [ ] CORS configured to allow requests from Netlify domain
- [ ] Test API endpoints are working

### Testing
- [ ] Frontend loads correctly
- [ ] API calls work from frontend
- [ ] Photo uploads work
- [ ] Admin login works
- [ ] All features tested

## Updating CORS for Production

You'll need to update your backend CORS settings to allow your Netlify domain. Update `server/index.js`:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-netlify-site.netlify.app', 'https://your-custom-domain.com']
    : 'http://localhost:3000',
  credentials: true
};

app.use(cors(corsOptions));
```

## Troubleshooting

### Build Fails on Netlify
- Check build logs in Netlify dashboard
- Ensure all dependencies are in `package.json` (not just `devDependencies`)
- Verify Node version in `netlify.toml` matches your local version

### API Calls Fail
- Check `REACT_APP_API_URL` is set correctly in Netlify
- Verify backend is deployed and accessible
- Check CORS settings on backend
- Check browser console for errors

### Environment Variables Not Working
- Variables must start with `REACT_APP_` for React
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

## Need Help?

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Render Documentation](https://render.com/docs)

