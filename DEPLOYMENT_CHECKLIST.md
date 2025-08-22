# Deployment Checklist

## Pre-Deployment ✅

- [ ] Code is committed to GitHub
- [ ] All environment variables are documented
- [ ] `.gitignore` is properly configured
- [ ] MongoDB Atlas account created
- [ ] Vercel account created
- [ ] Render account created

## Backend Deployment (Render) ✅

- [ ] Create MongoDB Atlas cluster
- [ ] Get MongoDB connection string
- [ ] Create Render account
- [ ] Connect GitHub repository to Render
- [ ] Create new Web Service
- [ ] Set environment variables:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=10000`
  - [ ] `MONGODB_URI=your-mongodb-connection-string`
  - [ ] `JWT_SECRET=your-secret-key`
  - [ ] `JWT_EXPIRE=30d`
- [ ] Deploy backend
- [ ] Test backend health endpoint
- [ ] Note backend URL

## Frontend Deployment (Vercel) ✅

- [ ] Update `client/vercel.json` with backend URL
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Configure project settings:
  - [ ] Framework: Create React App
  - [ ] Root Directory: `client`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `build`
- [ ] Set environment variable:
  - [ ] `REACT_APP_API_URL=https://your-backend-url.onrender.com/api`
- [ ] Deploy frontend
- [ ] Test frontend functionality

## Post-Deployment ✅

- [ ] Update CORS settings in backend
- [ ] Test booking functionality
- [ ] Test admin dashboard
- [ ] Test all API endpoints
- [ ] Verify HTTPS is working
- [ ] Test on mobile devices
- [ ] Set up monitoring (optional)
- [ ] Configure custom domain (optional)

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://bekutadesse:beku1984@cluster0.cgafqkf.mongodb.net/bekutadesse?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=nafis-reflexology-super-secret-jwt-key-2024
JWT_EXPIRE=30d
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-app-name.onrender.com/api
```

## Quick Test Commands

```bash
# Test backend
curl https://your-backend-app-name.onrender.com/api/health

# Test frontend
# Visit: https://your-frontend-app-name.vercel.app
```

## Support Links

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
