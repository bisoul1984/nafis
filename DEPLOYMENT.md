# Deployment Guide

This guide will help you deploy the Nafis Reflexology application with the frontend on Vercel and backend on Render.

## Prerequisites

- GitHub account
- Vercel account (free tier available)
- Render account (free tier available)
- MongoDB Atlas account (free tier available)

## Backend Deployment on Render

### Step 1: Prepare MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database`)

### Step 2: Deploy Backend to Render

1. **Fork/Clone your repository** to your GitHub account

2. **Go to Render Dashboard**
   - Visit [render.com](https://render.com)
   - Sign up/Login with your GitHub account

3. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your code

4. **Configure the Web Service**
   - **Name**: `nafis-reflexology-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Add Environment Variables**
   Click "Environment" tab and add:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/nafis-reflexology
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL (e.g., `https://nafis-reflexology-backend.onrender.com`)

## Frontend Deployment on Vercel

### Step 1: Prepare Frontend

1. **Update API URL**
   - In your `client/vercel.json`, update the `REACT_APP_API_URL`:
   ```json
   {
     "env": {
       "REACT_APP_API_URL": "https://your-backend-app-name.onrender.com/api"
     }
   }
   ```

2. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add:
   ```
   REACT_APP_API_URL=https://your-backend-app-name.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend will be available at a URL like: `https://your-app-name.vercel.app`

## Post-Deployment Configuration

### Step 1: Update CORS Settings

1. **In Render Dashboard**:
   - Go to your backend service
   - Add environment variable:
   ```
   FRONTEND_URL=https://your-frontend-app-name.vercel.app
   ```

2. **Update server/index.js** (if needed):
   ```javascript
   app.use(cors({
     origin: process.env.NODE_ENV === 'production' 
       ? [process.env.FRONTEND_URL]
       : ['http://localhost:3000'],
     credentials: true
   }));
   ```

### Step 2: Test Your Application

1. **Test Backend API**:
   - Visit: `https://your-backend-app-name.onrender.com/api/health`
   - Should return: `{"status":"OK","timestamp":"...","environment":"production"}`

2. **Test Frontend**:
   - Visit your Vercel URL
   - Test booking functionality
   - Test admin dashboard

### Step 3: Set Up Custom Domain (Optional)

1. **Vercel Custom Domain**:
   - In Vercel dashboard, go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain

2. **Render Custom Domain**:
   - In Render dashboard, go to your service
   - Click "Settings" → "Custom Domains"
   - Add your custom domain

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
JWT_EXPIRE=30d
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-app-name.onrender.com/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check that the URL matches exactly (including https://)

2. **MongoDB Connection Issues**:
   - Verify your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in MongoDB Atlas

3. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version is compatible (>=16.0.0)

4. **Environment Variables**:
   - Double-check all environment variable names
   - Ensure no extra spaces or quotes

### Useful Commands

```bash
# Check backend logs in Render
# Go to your service → "Logs" tab

# Check frontend build logs in Vercel
# Go to your project → "Deployments" → Click deployment → "Build Logs"

# Test API locally
curl https://your-backend-app-name.onrender.com/api/health
```

## Security Considerations

1. **JWT Secret**: Use a strong, random string for JWT_SECRET
2. **MongoDB**: Use strong passwords and enable network access restrictions
3. **Environment Variables**: Never commit sensitive data to Git
4. **HTTPS**: Both Vercel and Render provide HTTPS by default

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Render Logs**: Monitor in the dashboard
3. **MongoDB Atlas**: Monitor database performance
4. **Error Tracking**: Consider adding Sentry or similar service

Your application should now be successfully deployed and accessible online!
