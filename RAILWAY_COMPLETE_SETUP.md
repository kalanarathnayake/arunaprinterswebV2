# Railway Backend - Complete Setup Checklist

## ✅ Step 1: Get Your Public Railway URL

1. Go to your Railway dashboard: [railway.app](https://railway.app)
2. Click on your service: **arunaprinterswebv2**
3. Go to the **Settings** tab
4. Scroll to **Networking** section
5. Find your **Public Domain** (should be something like: `arunaprinterswebv2.railway.app`)
   - If you don't see one, click **Generate Domain**

**Your Public URL will be:** `https://arunaprinterswebv2.railway.app` (or similar)

## ✅ Step 2: Set Environment Variables in Railway

Go to your Railway service → **Variables** tab and add:

### Required Variables:

1. **MONGODB_URI**
   - Value: Your MongoDB Atlas connection string
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/arunaprinters`

2. **ALLOWED_ORIGINS**
   - Value: `https://arunaprinters-bandaragama.netlify.app`
   - ⚠️ **Important:** No trailing slash!

3. **NODE_ENV** (optional but recommended)
   - Value: `production`

4. **PORT** (optional - Railway sets this automatically)

## ✅ Step 3: Verify Railway Settings

Make sure in Railway **Settings**:
- **Root Directory:** Set to `server` (important!)
- **Start Command:** `npm start` (or leave blank, it will use package.json)

## ✅ Step 4: Test Your Backend

1. Visit: `https://your-railway-url.railway.app/api/health`
2. Should return: `{"status":"OK","message":"Server is running"}`
3. If it doesn't work, check Railway logs for errors

## ✅ Step 5: Configure Netlify Frontend

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select your site: **arunaprinters-bandaragama**
3. Go to **Site settings** → **Environment variables**
4. Add/Update:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-railway-url.railway.app/api`
     (Replace with your actual Railway public URL)

5. **Redeploy Netlify:**
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

## ✅ Step 6: Test Everything

1. Visit: https://arunaprinters-bandaragama.netlify.app/
2. Open browser console (F12)
3. Check for any errors
4. Test if the site loads correctly

## 🎯 Quick Reference

### Railway Environment Variables:
```
MONGODB_URI = your_mongodb_connection_string
ALLOWED_ORIGINS = https://arunaprinters-bandaragama.netlify.app
NODE_ENV = production
```

### Netlify Environment Variable:
```
REACT_APP_API_URL = https://your-railway-url.railway.app/api
```

## ❌ Common Issues

### Backend not starting?
- Check Railway logs
- Verify `MONGODB_URI` is set correctly
- Make sure Root Directory is `server`

### CORS errors?
- Verify `ALLOWED_ORIGINS` is exactly: `https://arunaprinters-bandaragama.netlify.app`
- No trailing slash!
- Redeploy backend after changing variables

### Can't find public URL?
- Go to Settings → Networking
- Click "Generate Domain" if no domain exists
- Use the `.railway.app` URL, NOT the `.railway.internal` one

## 🎉 You're Done!

Once all steps are complete, your app should be fully functional:
- ✅ Frontend on Netlify
- ✅ Backend on Railway
- ✅ Connected and working!

