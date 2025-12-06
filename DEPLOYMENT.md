# Deployment Guide

This guide will help you deploy the Cultivate project to Vercel (frontend) and Render (backend).

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Render Account**: Sign up at [render.com](https://render.com)
4. **MongoDB Atlas**: Set up a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)

## Backend Deployment (Render)

### Step 1: Prepare Environment Variables

You'll need the following environment variables:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT tokens
- `FRONTEND_URL` - Your Vercel deployment URL (add this after deploying frontend)
- `GEMINI_API_KEY` - Your Google Gemini API key
- `OPENWEATHER_API_KEY` - Your OpenWeather API key

### Step 2: Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file automatically
5. Or configure manually:
   - **Name**: cultivate-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables in Render

1. Go to your service → **Environment**
2. Add all the environment variables listed above
3. Click **Save Changes**

### Step 4: Note Your Backend URL

After deployment, copy your backend URL (e.g., `https://cultivate-backend.onrender.com`)

## Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Vercel will auto-detect Vite configuration
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 2: Add Environment Variable

1. In project settings → **Environment Variables**
2. Add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://your-backend.onrender.com/api` (use your actual Render URL)
3. Click **Save**

### Step 3: Redeploy

Click **Deployments** → **Redeploy** to apply the environment variable

### Step 4: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Update `FRONTEND_URL` environment variable with your Vercel URL
3. Save and redeploy

## Post-Deployment

### Update CORS Settings

The backend is already configured to accept the `FRONTEND_URL` environment variable for CORS.

### Test Your Deployment

1. Visit your Vercel URL
2. Test authentication, chat, and weather features
3. Check backend health: `https://your-backend.onrender.com/health`

## Important Notes

### Render Free Tier Limitations

- **Spin Down**: Free instances spin down after 15 minutes of inactivity
- **Spin Up**: First request after spin down takes 30-50 seconds
- **Solution**: Use a service like [UptimeRobot](https://uptimerobot.com) to ping your backend every 14 minutes

### Vercel Free Tier

- Unlimited deployments
- Automatic HTTPS
- CDN included

### MongoDB Atlas Free Tier

- 512 MB storage
- Shared cluster
- Perfect for development and small projects

## Troubleshooting

### Backend Issues

- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set
- Ensure MongoDB URI is correct and IP whitelist includes `0.0.0.0/0`

### Frontend Issues

- Check Vercel deployment logs
- Verify `VITE_API_BASE_URL` is set correctly
- Check browser console for CORS errors

### CORS Errors

- Ensure `FRONTEND_URL` in Render matches your Vercel URL exactly
- Include protocol (`https://`) in URLs
- No trailing slash in URLs

## Continuous Deployment

Both Vercel and Render support automatic deployments:

- **Push to main branch** → Automatic deployment
- **Pull request** → Preview deployments (Vercel)

## Security Checklist

- ✅ All environment variables are set
- ✅ JWT_SECRET is a strong random string
- ✅ MongoDB IP whitelist is configured
- ✅ API keys are kept secret
- ✅ CORS is properly configured

## Monitoring

- **Render**: Built-in logs and metrics
- **Vercel**: Analytics and deployment logs
- **MongoDB**: Atlas monitoring dashboard

## Support

If you encounter issues:
1. Check the logs in Render/Vercel dashboards
2. Verify all environment variables
3. Test API endpoints directly
4. Check MongoDB connection

---

**Congratulations! Your app is now deployed! 🎉**
