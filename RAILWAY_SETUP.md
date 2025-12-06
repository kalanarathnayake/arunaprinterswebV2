# Railway Backend Setup Guide

## Understanding Railway URLs

Railway provides two types of URLs:

1. **Internal URL** (`.railway.internal`): 
   - Only accessible within Railway's network
   - Used for service-to-service communication
   - Example: `arunaprinterswebv2.railway.internal`

2. **Public URL** (`.railway.app`):
   - Accessible from the internet
   - This is what you need for your frontend
   - Example: `arunaprinterswebv2.railway.app`

## Getting Your Public Railway URL

### Step 1: Find Your Public URL

1. Go to your Railway dashboard: [railway.app](https://railway.app)
2. Click on your project/service
3. Go to the **Settings** tab
4. Scroll down to **Networking** section
5. You'll see your **Public Domain** (e.g., `arunaprinterswebv2.railway.app`)

### Step 2: Set Up Custom Domain (Optional)

If you want a custom domain:
1. In Railway Settings → **Networking**
2. Click **Generate Domain** or **Add Custom Domain**
3. Railway will give you a public URL

### Step 3: Update Environment Variables

#### In Railway (Backend):

1. Go to your Railway service
2. Click on **Variables** tab
3. Add/Update:
   ```
   ALLOWED_ORIGINS = https://your-netlify-site.netlify.app
   ```
   (Replace with your actual Netlify URL)

#### In Netlify (Frontend):

1. Go to your Netlify dashboard
2. **Site settings** → **Environment variables**
3. Add/Update:
   ```
   REACT_APP_API_URL = https://arunaprinterswebv2.railway.app/api
   ```
   (Use your actual Railway public URL, not the `.internal` one)

## Testing Your Backend

### Test the Public URL:

Open in browser or use curl:
```bash
https://arunaprinterswebv2.railway.app/api/health
```

Should return:
```json
{"status":"OK","message":"Server is running"}
```

### If Health Check Fails:

1. Check Railway logs for errors
2. Verify MongoDB connection string is set
3. Check that the service is running (not paused)

## Common Issues

### Issue: Can't access backend from frontend

**Solution:** Make sure you're using the **public URL** (`.railway.app`), not the internal one (`.railway.internal`)

### Issue: CORS errors

**Solution:** 
1. Add your Netlify URL to `ALLOWED_ORIGINS` in Railway
2. Format: `https://your-site.netlify.app` (no trailing slash)
3. Redeploy backend after changing environment variables

### Issue: Backend not starting

**Solution:**
1. Check Railway logs
2. Verify `MONGODB_URI` is set correctly
3. Make sure Root Directory is set to `server` in Railway settings

## Quick Checklist

- [ ] Found your Railway public URL (`.railway.app`)
- [ ] Backend health check works: `/api/health`
- [ ] `ALLOWED_ORIGINS` set in Railway with your Netlify URL
- [ ] `REACT_APP_API_URL` set in Netlify with your Railway public URL
- [ ] Frontend redeployed on Netlify
- [ ] Tested API calls from frontend

## Your Current Setup

Based on your internal hostname, your public URL should be:
- **Backend URL:** `https://arunaprinterswebv2.railway.app`
- **API Endpoint:** `https://arunaprinterswebv2.railway.app/api`

Use this in your Netlify `REACT_APP_API_URL` environment variable!

