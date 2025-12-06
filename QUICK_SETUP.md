# Quick Setup Guide - Your Specific URLs

## Your Netlify Frontend URL
**https://arunaprinters-bandaragama.netlify.app/**

## Configuration Steps

### Step 1: Render Backend Configuration

In your Render web service settings:

#### Commands:
- **Build Command:** `npm install` (or leave blank)
- **Start Command:** `npm start`
- **Health Check Path:** `/api/health`

#### Environment Variables (Add these):
1. **MONGODB_URI** = (your MongoDB connection string)
2. **PORT** = (Render sets this automatically)
3. **NODE_ENV** = `production`
4. **ALLOWED_ORIGINS** = `https://arunaprinters-bandaragama.netlify.app`
   ⚠️ **Important:** No trailing slash!

### Step 2: After Render Deployment

1. **Get your Render backend URL:**
   - Render will give you something like: `https://arunaprinterswebv2.onrender.com`
   - Your API will be at: `https://arunaprinterswebv2.onrender.com/api`

2. **Test your backend:**
   - Visit: `https://arunaprinterswebv2.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

### Step 3: Configure Netlify Frontend

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site: **arunaprinters-bandaragama**
3. Go to **Site settings** → **Environment variables**
4. Add/Update:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://arunaprinterswebv2.onrender.com/api`
     (Replace with your actual Render backend URL)

5. **Redeploy:**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

## Complete Configuration Summary

### Render (Backend):
```
ALLOWED_ORIGINS = https://arunaprinters-bandaragama.netlify.app
```

### Netlify (Frontend):
```
REACT_APP_API_URL = https://your-render-backend.onrender.com/api
```

## Testing Checklist

- [ ] Backend deployed on Render
- [ ] Backend health check works: `/api/health`
- [ ] `ALLOWED_ORIGINS` set in Render with your Netlify URL
- [ ] `REACT_APP_API_URL` set in Netlify with your Render backend URL
- [ ] Frontend redeployed on Netlify
- [ ] Visit https://arunaprinters-bandaragama.netlify.app/
- [ ] Test API calls (check browser console for errors)
- [ ] No CORS errors in browser console

## If You See CORS Errors

1. Verify `ALLOWED_ORIGINS` in Render is exactly: `https://arunaprinters-bandaragama.netlify.app`
   - No trailing slash
   - Include `https://`
   - Match the URL exactly

2. Redeploy backend after changing environment variables

3. Check browser console (F12) for specific error messages

