# 🚀 Quick Deployment Steps

## The Problem
Netlify **cannot run Express servers** - it only hosts static files. Your backend needs separate hosting.

## ✅ Solution: Deploy Backend Separately

### Step 1: Deploy Backend to Railway (5 minutes)

1. Go to **[railway.app](https://railway.app)** → Sign up with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `arunaprintersweb` repository
4. **IMPORTANT:** Click on the service → **Settings** → Set **Root Directory** to `server`
5. Go to **Variables** tab and add:
   ```
   MONGODB_URI = your_mongodb_atlas_connection_string
   ALLOWED_ORIGINS = https://your-netlify-site.netlify.app
   ```
6. Railway will auto-deploy! Get your URL (e.g., `https://your-app.railway.app`)

### Step 2: Update Netlify Frontend

1. Go to your **Netlify dashboard**
2. **Site settings** → **Environment variables**
3. Add:
   ```
   REACT_APP_API_URL = https://your-app.railway.app/api
   ```
4. Go to **Deploys** → **Trigger deploy** → **Deploy site**

### Step 3: Test

1. Visit your backend: `https://your-app.railway.app/api/health` (should show OK)
2. Visit your Netlify site and test the app
3. Check browser console (F12) for any errors

## 🎯 That's It!

Your app should now work:
- ✅ Frontend hosted on Netlify
- ✅ Backend hosted on Railway
- ✅ They're connected!

## Need Help?

- Backend not starting? Check Railway logs
- CORS errors? Make sure `ALLOWED_ORIGINS` matches your Netlify URL exactly
- API not working? Verify `REACT_APP_API_URL` is set in Netlify

See `BACKEND_DEPLOYMENT.md` for detailed instructions.

