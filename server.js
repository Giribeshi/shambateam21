const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Initialize database
const Database = require('./backend/database/init');
const database = new Database();

// Import modules
const diseaseDiagnosis = require('./backend/modules/diseaseDiagnosis');
const farmingAdvisory = require('./backend/modules/farmingAdvisory');
const cropRecommendation = require('./backend/modules/cropRecommendation');
const weatherService = require('./backend/modules/weatherService');
const languageService = require('./backend/modules/languageService');

// Import authentication and market routes
const authRoutes = require('./backend/routes/auth');
const marketRoutes = require('./backend/routes/market');
const { authenticateToken, optionalAuth } = require('./backend/middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Shambasmart API - Agricultural Assistant for Tanzanian Farmers' });
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Market prices routes
app.use('/api/market', marketRoutes);

// Disease Diagnosis (protected)
app.post('/api/diagnose', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { description, language = 'en' } = req.body;
    const imagePath = req.file ? req.file.path : null;
    
    const result = await diseaseDiagnosis.diagnose({
      image: imagePath,
      description: description,
      language: language,
      userId: req.user.id
    });
    
    res.json(result);
  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).json({ error: 'Diagnosis failed', message: error.message });
  }
});

// Farming Advisory (protected)
app.post('/api/advisory', authenticateToken, async (req, res) => {
  try {
    const { crop, stage, location, issue, language = 'en' } = req.body;
    
    const advice = await farmingAdvisory.getAdvice({
      crop: crop,
      stage: stage,
      location: location,
      issue: issue,
      language: language,
      userId: req.user.id
    });
    
    res.json(advice);
  } catch (error) {
    console.error('Advisory error:', error);
    res.status(500).json({ error: 'Advisory failed', message: error.message });
  }
});

// Crop Recommendation (protected)
app.post('/api/recommend-crops', authenticateToken, async (req, res) => {
  try {
    const { location, soilType, season, goals, language = 'en' } = req.body;
    
    const recommendations = await cropRecommendation.getCropRecommendations({
      location: location,
      soilType: soilType,
      season: season,
      goals: goals,
      language: language,
      userId: req.user.id
    });
    
    res.json(recommendations);
  } catch (error) {
    console.error('Crop recommendation error:', error);
    res.status(500).json({ error: 'Crop recommendation failed', message: error.message });
  }
});

// Weather Information (optional auth - works without login but better with user context)
app.get('/api/weather/:location', optionalAuth, async (req, res) => {
  try {
    const { location } = req.params;
    const { language = 'en' } = req.query;
    
    const weatherData = await weatherService.getWeather(location, language, req.user);
    res.json(weatherData);
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ error: 'Weather data failed', message: error.message });
  }
});

// Language Support
app.get('/api/translate', (req, res) => {
  const { text, targetLang } = req.query;
  
  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Text and target language are required' });
  }
  
  try {
    const translation = languageService.translate(text, targetLang);
    res.json({ translation: translation });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed', message: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function startServer() {
  try {
    // Initialize database
    await database.initialize();
    console.log('Database initialized successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Agrimind server running on port ${PORT}`);
      console.log(`Agricultural assistant ready for Tanzanian farmers!`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = app;
