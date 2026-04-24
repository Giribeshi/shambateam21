# Agrimind App Deployment Procedures

## 🚀 Quick Deployment Options

### **Option 1: Vercel (Recommended - Free)**
**Best for:** Full-stack deployment with serverless functions

#### **Backend Deployment:**
```bash
# Navigate to backend directory
cd backend

# Deploy to Vercel
npx vercel --prod
```

#### **Frontend Deployment:**
```bash
# Navigate to frontend directory
cd frontend

# Build and deploy
npm run build
npx vercel --prod
```

---

### **Option 2: Netlify (Free)**
**Best for:** Frontend with serverless API functions

#### **Frontend Deployment:**
```bash
# Navigate to frontend directory
cd frontend

# Build and deploy
npm run build
npx netlify deploy --prod --dir=build
```

---

### **Option 3: Render (Free Tier)**
**Best for:** Backend API deployment

#### **Backend Deployment:**
```bash
# Navigate to backend directory
cd backend

# Deploy to Render
git init
git add .
git commit -m "Initial deployment"
git push https://github.com/yourusername/agrimind-backend.git main

# Then connect to Render and deploy
```

---

### **Option 4: Railway (Free)**
**Best for:** Quick deployment with database

#### **Full Stack Deployment:**
```bash
# Deploy from root directory
railway deploy
```

---

## 📋 Detailed Step-by-Step Procedures

### **Vercel Full-Stack Deployment**

#### **Prerequisites:**
- Vercel account
- GitHub repository
- Node.js 14+

#### **Steps:**

1. **Setup Backend:**
```bash
cd backend
npm install
npx vercel link
```

2. **Configure Environment:**
- Set `JWT_SECRET` in Vercel dashboard
- Set `NODE_ENV=production`

3. **Deploy Backend:**
```bash
npx vercel --prod
```

4. **Setup Frontend:**
```bash
cd ../frontend
npm install
npx vercel link
```

5. **Configure Frontend:**
- Set API URL to backend Vercel URL
- Set environment variables

6. **Deploy Frontend:**
```bash
npm run build
npx vercel --prod
```

---

### **Netlify Frontend + Functions Deployment**

#### **Prerequisites:**
- Netlify account
- Git repository

#### **Steps:**

1. **Setup Repository:**
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/yourusername/agrimind.git
git push -u origin main
```

2. **Connect Netlify:**
- Connect GitHub repository to Netlify
- Configure build settings

3. **Environment Variables:**
- Set `REACT_APP_API_URL` to your backend URL
- Set `NODE_ENV=production`

4. **Deploy:**
- Automatic deployment on git push
- Or manual: `npx netlify deploy`

---

### **Render Backend Deployment**

#### **Prerequisites:**
- Render account
- Git repository

#### **Steps:**

1. **Setup Repository:**
```bash
cd backend
git init
git add .
git commit -m "Backend deployment"
git remote add origin https://github.com/yourusername/agrimind-backend.git
git push -u origin main
```

2. **Configure Render:**
- Connect GitHub repository
- Set build command: `npm install`
- Set start command: `npm start`
- Add environment variables:
  - `NODE_ENV=production`
  - `JWT_SECRET=agrimind-jwt-secret-key-2024`
  - `PORT=10000`

3. **Deploy:**
- Automatic deployment on push
- Manual deployment from dashboard

---

## 🔧 Environment Variables Setup

### **Backend (.env):**
```env
NODE_ENV=production
JWT_SECRET=agrimind-jwt-secret-key-2024
PORT=10000
DATABASE_URL=./database/agrimind.db
```

### **Frontend (.env.production):**
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
REACT_APP_ENV=production
```

---

## 🌐 URLs After Deployment

### **Vercel:**
- **Backend:** `https://agrimind-backend-xxx.vercel.app`
- **Frontend:** `https://agrimind-frontend-xxx.vercel.app`

### **Netlify:**
- **Frontend:** `https://agrimind.netlify.app`
- **API:** `https://agrimind.netlify.app/.netlify/functions/api`

### **Render:**
- **Backend:** `https://agrimind-backend.onrender.com`

---

## ✅ Pre-Deployment Checklist

### **Security:**
- [ ] JWT_SECRET is strong and unique
- [ ] CORS configured for production domains
- [ ] Environment variables set correctly
- [ ] Database is properly secured

### **Performance:**
- [ ] Frontend build is optimized
- [ ] Images are compressed
- [ ] Caching is configured
- [ ] CDN is enabled (if applicable)

### **Functionality:**
- [ ] All API endpoints work in production
- [ ] Authentication flow works
- [ ] Database migrations run successfully
- [ ] File uploads work correctly
- [ ] Error handling is proper

### **Monitoring:**
- [ ] Logging is configured
- [ ] Error tracking is set up
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring configured

---

## 🚨 Troubleshooting

### **Common Issues:**
1. **Build Errors:** Check Node.js version compatibility
2. **API Failures:** Verify environment variables
3. **Database Issues:** Check file permissions
4. **CORS Errors:** Verify allowed origins
5. **Deployment Failures:** Check logs in platform dashboard

### **Debug Commands:**
```bash
# Check build
npm run build

# Test API locally
npm start

# Check logs
npx vercel logs
```

---

## 📞 Support Resources

### **Documentation:**
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [Render Docs](https://render.com/docs)

### **Community:**
- [Vercel Discord](https://discord.gg/vercel)
- [Netlify Community](https://community.netlify.com/)
- [Render Community](https://community.render.com/)

---

## 🎯 Recommended Deployment Choice

**For your Agrimind app, I recommend:**

1. **Vercel** - Best for full-stack with serverless
2. **Netlify** - Great for frontend with functions
3. **Render** - Good for backend-only deployment

**Choose based on your needs and budget!**
