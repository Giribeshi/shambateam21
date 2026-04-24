# Agrimind Backend Deployment Guide - Render

## Step 1: Prepare Your Repository

1. **Commit all changes to Git:**
   ```bash
   git add .
   git commit -m "Ready for Render deployment - backend with SQLite database"
   git push
   ```

2. **Push to GitHub Repository:**
   - Make sure your code is pushed to a GitHub repository
   - If you don't have one, create a new repository on GitHub

## Step 2: Deploy to Render

1. **Sign up for Render:**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your Agrimind repository

3. **Configure the Web Service:**
   - **Name:** `agrimind-api`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`
   - **Region:** Choose nearest to your users

4. **Environment Variables:**
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `agrimind-jwt-secret-key-2024`
   - `PORT`: `10000`

5. **Advanced Settings:**
   - **Health Check Path:** `/`
   - **Auto-Deploy:** `Yes`

## Step 3: Deploy and Test

1. **Click "Create Web Service"**
2. **Wait for deployment** (usually 2-5 minutes)
3. **Check the deployment logs** for any errors
4. **Test the API** once deployed:

## Testing Your Backend

Once deployed, your API will be available at: `https://agrimind-api.onrender.com`

### Test Endpoints:

1. **Health Check:**
   ```bash
   curl https://agrimind-api.onrender.com/
   ```

2. **Login Test:**
   ```bash
   curl -X POST https://agrimind-api.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "farmer@shambasmart.co.tz", "password": "farmer123"}'
   ```

3. **Weather Test:**
   ```bash
   curl https://agrimind-api.onrender.com/api/weather/dar_es_salaam
   ```

## Step 4: Update Frontend Configuration

Once your backend is deployed, update the frontend to use the production API:

1. **Update client/.env.development:**
   ```
   REACT_APP_API_URL=https://agrimind-api.onrender.com
   ```

2. **Update client/package.json proxy:**
   ```json
   "proxy": "https://agrimind-api.onrender.com"
   ```

## Troubleshooting

### Common Issues:

1. **Database Permission Error:**
   - The SQLite database needs write permissions
   - Render automatically handles this for the `/opt/render/project/src` directory

2. **Port Issues:**
   - Render uses port 10000 by default
   - Make sure your server.js listens on the correct port

3. **Build Failures:**
   - Check the deployment logs
   - Ensure all dependencies are in package.json
   - Verify the database initialization works

4. **Timeouts:**
   - Free tier instances may sleep after 15 minutes
   - First request after sleep may take longer

### Success Indicators:

✅ **Build succeeds** without errors  
✅ **Health check passes**  
✅ **Authentication works**  
✅ **API endpoints respond**  
✅ **Database operations work**  

## Next Steps

After successful backend deployment:

1. Deploy frontend to Netlify
2. Update frontend API URL
3. Test full application
4. Set up custom domain (optional)

## Support

If you encounter issues:

1. Check Render deployment logs
2. Verify all files are committed to Git
3. Ensure package.json has all dependencies
4. Test locally with `npm start` first
