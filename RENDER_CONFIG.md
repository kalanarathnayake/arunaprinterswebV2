# Render Backend Configuration

## Correct Render Settings

### Basic Settings
- **Name:** arunaprinterswebV2 ✅
- **Environment:** Production ✅
- **Language:** Node ✅
- **Branch:** main ✅
- **Region:** Oregon (US West) ✅ (or your preferred region)
- **Root Directory:** `server` ✅

### Commands (IMPORTANT - Fix These!)

**Build Command:**
```
npm install
```
OR leave it **blank** (Render will auto-detect and run `npm install`)

**Start Command:**
```
npm start
```

⚠️ **Remove the `server/ $` prefix!** Since Root Directory is already set to `server`, Render automatically runs commands from that directory.

### Health Check Path
```
/api/health
```
(Not `/healthz` - this matches your actual endpoint)

### Environment Variables

Add these in Render:

1. **MONGODB_URI** ✅ (You already have this)
   - Your MongoDB Atlas connection string

2. **PORT** ✅ (You already have this)
   - Render sets this automatically, but you can override if needed

3. **NODE_ENV** ✅ (You already have this)
   - Set to: `production`

4. **ALLOWED_ORIGINS** ⚠️ (ADD THIS!)
   - Value: Your Netlify URL
   - Example: `https://your-site.netlify.app`
   - No trailing slash!
   - This allows your frontend to make API calls

### Instance Type
- **Free** is fine for testing/development
- Note: Free instances spin down after inactivity (takes ~30 seconds to wake up)
- For production, consider **Starter ($7/month)** for always-on service

### Auto-Deploy
- Keep **On Commit** enabled ✅
- This will automatically deploy when you push to the `main` branch

## Step-by-Step Fix

1. **Fix Build Command:**
   - Change from: `server/ $ npm run build`
   - To: `npm install` (or leave blank)

2. **Fix Start Command:**
   - Change from: `server/ $ npm run start`
   - To: `npm start`

3. **Fix Health Check:**
   - Change from: `/healthz`
   - To: `/api/health`

4. **Add Environment Variable:**
   - Click "Add Environment Variable"
   - Key: `ALLOWED_ORIGINS`
   - Value: `https://your-netlify-site.netlify.app` (your actual Netlify URL)

5. **Click "Deploy web service"**

## After Deployment

1. **Get your Render URL:**
   - Render will give you a URL like: `https://arunaprinterswebv2.onrender.com`

2. **Test your backend:**
   - Visit: `https://arunaprinterswebv2.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

3. **Update Netlify:**
   - Go to Netlify → Site settings → Environment variables
   - Add/Update: `REACT_APP_API_URL` = `https://arunaprinterswebv2.onrender.com/api`

4. **Redeploy Netlify:**
   - Trigger a new deployment so the frontend uses the new API URL

## Troubleshooting

### Build Fails
- Check Render logs
- Verify Root Directory is `server`
- Make sure `server/package.json` exists

### Server Won't Start
- Check Render logs for errors
- Verify `MONGODB_URI` is set correctly
- Check MongoDB Atlas Network Access allows all IPs (0.0.0.0/0)

### CORS Errors
- Make sure `ALLOWED_ORIGINS` is set with your exact Netlify URL
- No trailing slash in the URL
- Redeploy after changing environment variables

### Health Check Fails
- Verify path is `/api/health` (not `/healthz`)
- Check server logs for errors

