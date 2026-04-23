const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// In-memory user storage for demo
const users = new Map();

// Demo user
const demoUser = {
  id: '2',
  email: 'farmer@shambasmart.co.tz',
  name: 'John Farmer',
  role: 'farmer',
  location: 'arusha',
  phone: '+255987654321',
  farmSize: 'small',
  primaryCrops: ['maize', 'tomatoes']
};

// Initialize with demo user
users.set('farmer@shambasmart.co.tz', {
  ...demoUser,
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.'
});

// Inline market prices service
const marketPricesService = {
  getMarketPrices: (crop, language = 'en') => {
    const crops = {
      maize: { name: language === 'sw' ? 'Mahindi' : 'Maize', basePrice: 45000 },
      tomatoes: { name: language === 'sw' ? 'Nyanya' : 'Tomatoes', basePrice: 3000 }
    };
    
    const markets = {
      dar_es_salaam: { name: 'Dar es Salaam' },
      arusha: { name: 'Arusha' },
      mwanza: { name: 'Mwanza' }
    };
    
    const data = {
      crop: crops[crop],
      markets: Object.entries(markets).map(([key, market]) => ({
        name: market.name,
        currentPrice: crops[crop].basePrice * (0.9 + Math.random() * 0.2),
        trend: Math.random() > 0.5 ? 'up' : 'down',
        change: (Math.random() * 10 - 5).toFixed(1)
      })),
      lastUpdated: new Date().toISOString()
    };
    
    return data;
  },
  
  predictPrices: (crop, weeks = 4, language = 'en') => {
    const predictions = [];
    let basePrice = 45000;
    
    for (let i = 1; i <= weeks; i++) {
      basePrice = basePrice * (0.95 + Math.random() * 0.1);
      predictions.push({
        week: i,
        price: Math.round(basePrice),
        confidence: 75 + Math.random() * 20,
        factors: ['Seasonal demand', 'Weather conditions', 'Market supply']
      });
    }
    
    return { crop, predictions };
  }
};

// Inline weather service
const weatherService = {
  getWeatherData: (location, language = 'en') => {
    return {
      location: location,
      current: {
        temperature: 25 + Math.random() * 10,
        humidity: 60 + Math.random() * 20,
        rainfall: Math.random() * 5,
        windSpeed: 5 + Math.random() * 10,
        condition: 'Partly Cloudy'
      },
      forecast: Array.from({ length: 7 }, (_, i) => ({
        day: i + 1,
        high: 28 + Math.random() * 5,
        low: 18 + Math.random() * 5,
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)]
      })),
      advisory: language === 'sw' 
        ? 'Hali ya hewa inafaa kwa kilimo' 
        : 'Weather conditions suitable for farming'
    };
  }
};

// Inline farming advisory service
const farmingAdvisoryService = {
  getFarmingAdvice: (crop, stage, location, issue, language = 'en') => {
    return {
      crop,
      stage,
      location,
      problem: issue || 'General farming guidance',
      advice: {
        recommendations: [
          'Monitor soil moisture regularly',
          'Apply appropriate fertilizers',
          'Watch for pest infestations',
          'Maintain proper irrigation'
        ],
        timeline: {
          immediate: 'Assess current conditions',
          short: 'Apply necessary treatments',
          medium: 'Monitor growth progress',
          long: 'Plan for harvest season'
        },
        expectedYield: '2-5 tons per hectare',
        costs: 'Variable based on inputs',
        market: 'Check local market prices'
      }
    };
  }
};

// Inline disease diagnosis service
const diseaseDiagnosisService = {
  diagnoseDisease: (description, image, language = 'en') => {
    const diseases = {
      'maize': {
        problem: 'Maize Leaf Blight',
        confidence: 85,
        description: 'Common fungal disease affecting maize leaves',
        symptoms: ['Yellow spots on leaves', 'Brown lesions', 'Leaf wilting'],
        causes: ['Fungal infection', 'High humidity', 'Poor air circulation'],
        treatment: {
          immediate: ['Remove affected leaves', 'Improve ventilation'],
          chemical: ['Apply fungicide', 'Use resistant varieties'],
          cultural: ['Crop rotation', 'Proper spacing'],
          prevention: ['Monitor humidity', 'Early detection']
        }
      }
    };
    
    return diseases.maize;
  }
};

// Inline crop recommendations service
const cropRecommendationsService = {
  getCropRecommendations: (location, soilType, season, goals, language = 'en') => {
    return {
      location,
      recommendations: [
        {
          crop: 'Maize',
          swahiliName: 'Mahindi',
          suitability: 85,
          reasons: ['Well-suited to local conditions', 'Good market demand'],
          expectedYield: '3-5 tons/ha',
          profitability: 'Medium',
          marketDemand: 'High',
          growingSeason: '4-5 months'
        },
        {
          crop: 'Beans',
          swahiliName: 'Maharage',
          suitability: 78,
          reasons: ['Soil improvement', 'Short growing period'],
          expectedYield: '1-2 tons/ha',
          profitability: 'Medium',
          marketDemand: 'High',
          growingSeason: '2-3 months'
        }
      ]
    };
  }
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'shambasmart-jwt-secret-key-2024';

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Routes
// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Shambasmart API - Agricultural Assistant for Tanzanian Farmers' });
});

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, location, phone, farmSize, primaryCrops } = req.body;

    // Check if user already exists
    const existingUser = User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = User.create({
      name,
      email,
      password: hashedPassword,
      location,
      phone,
      farmSize,
      primaryCrops
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.location,
        role: user.role,
        farmSize: user.farmSize,
        primaryCrops: user.primaryCrops
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  const user = User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      location: user.location,
      role: user.role
    }
  });
});

// Market Prices Routes
app.get('/api/market/prices/:crop', authenticateToken, (req, res) => {
  try {
    const { crop } = req.params;
    const { language = 'en' } = req.query;
    
    const data = marketPricesService.getMarketPrices(crop, language);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Market prices error:', error);
    res.status(500).json({ message: 'Failed to fetch market prices' });
  }
});

app.get('/api/market/predictions/:crop', authenticateToken, (req, res) => {
  try {
    const { crop } = req.params;
    const { weeks = 4, language = 'en' } = req.query;
    
    const predictions = marketPricesService.predictPrices(crop, weeks, language);
    res.json({ success: true, data: predictions });
  } catch (error) {
    console.error('Price predictions error:', error);
    res.status(500).json({ message: 'Failed to fetch price predictions' });
  }
});

app.get('/api/market/comparison', authenticateToken, (req, res) => {
  try {
    const { language = 'en' } = req.query;
    
    const comparison = marketPricesService.compareMarkets(language);
    res.json({ success: true, data: comparison });
  } catch (error) {
    console.error('Market comparison error:', error);
    res.status(500).json({ message: 'Failed to fetch market comparison' });
  }
});

app.get('/api/market/insights', authenticateToken, (req, res) => {
  try {
    const { language = 'en' } = req.query;
    
    const insights = marketPricesService.getMarketInsights(language);
    res.json({ success: true, data: insights });
  } catch (error) {
    console.error('Market insights error:', error);
    res.status(500).json({ message: 'Failed to fetch market insights' });
  }
});

// Weather Routes
app.get('/api/weather/:location', (req, res) => {
  try {
    const { location } = req.params;
    const { language = 'en' } = req.query;
    
    const weatherData = weatherService.getWeatherData(location, language);
    res.json(weatherData);
  } catch (error) {
    console.error('Weather error:', error);
    res.status(500).json({ message: 'Failed to fetch weather data' });
  }
});

// Farming Advisory Routes
app.post('/api/advisory', authenticateToken, (req, res) => {
  try {
    const { crop, stage, location, issue, language = 'en' } = req.body;
    
    const advice = farmingAdvisoryService.getFarmingAdvice(crop, stage, location, issue, language);
    res.json(advice);
  } catch (error) {
    console.error('Farming advisory error:', error);
    res.status(500).json({ message: 'Failed to generate farming advice' });
  }
});

// Disease Diagnosis Routes
app.post('/api/diagnose', authenticateToken, upload.single('image'), (req, res) => {
  try {
    const { description, language = 'en' } = req.body;
    const image = req.file;
    
    const diagnosis = diseaseDiagnosisService.diagnoseDisease(description, image, language);
    res.json(diagnosis);
  } catch (error) {
    console.error('Disease diagnosis error:', error);
    res.status(500).json({ message: 'Failed to diagnose disease' });
  }
});

// Crop Recommendations Routes
app.post('/api/recommend-crops', authenticateToken, (req, res) => {
  try {
    const { location, soilType, season, goals, language = 'en' } = req.body;
    
    const recommendations = cropRecommendationsService.getCropRecommendations(
      location, soilType, season, goals, language
    );
    res.json(recommendations);
  } catch (error) {
    console.error('Crop recommendations error:', error);
    res.status(500).json({ message: 'Failed to generate crop recommendations' });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File size too large' });
    }
  }
  if (error.message === 'Only image files are allowed') {
    return res.status(400).json({ message: 'Only image files are allowed' });
  }
  
  console.error('Server error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// Export for Netlify Functions
exports.handler = serverless(app);
