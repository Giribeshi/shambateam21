// Comprehensive demo data for Shambasmart - showcases all features without backend

export const demoMarketPrices = {
  maize: {
    crop: {
      name: 'Maize',
      swahiliName: 'Mahindi',
      icon: 'grain',
      basePrice: 45000
    },
    currentPrices: {
      dar_es_salaam: { market: 'Dar es Salaam', price: 48000, trend: 'up', change: 5.2 },
      arusha: { market: 'Arusha', price: 46000, trend: 'up', change: 3.1 },
      mbeya: { market: 'Mbeya', price: 44000, trend: 'down', change: -2.3 },
      dodoma: { market: 'Dodoma', price: 47000, trend: 'stable', change: 0.8 },
      iringa: { market: 'Iringa', price: 45000, trend: 'up', change: 1.5 },
      mwanza: { market: 'Mwanza', price: 46500, trend: 'down', change: -1.2 }
    },
    summary: {
      minPrice: 44000,
      maxPrice: 48000,
      avgPrice: 45833,
      trend: 'up'
    },
    predictions: [
      { week: 1, price: 46200, confidence: 85, factors: ['Seasonal demand', 'Good harvest'] },
      { week: 2, price: 46500, confidence: 82, factors: ['Market stability', 'Export demand'] },
      { week: 3, price: 46800, confidence: 78, factors: ['Weather conditions', 'Storage costs'] },
      { week: 4, price: 47000, confidence: 75, factors: ['International prices', 'Local supply'] }
    ],
    insights: {
      bestMarket: 'Dar es Salaam',
      worstMarket: 'Mbeya',
      recommendation: 'Sell in Dar es Salaam for highest price, consider storage for 2-3 weeks',
      factors: 'Current market shows upward trend due to seasonal demand and reduced supply from southern regions'
    }
  },
  tomatoes: {
    crop: {
      name: 'Tomatoes',
      swahiliName: 'Nyanya',
      icon: 'vegetable',
      basePrice: 35000
    },
    currentPrices: {
      dar_es_salaam: { market: 'Dar es Salaam', price: 38000, trend: 'up', change: 8.5 },
      arusha: { market: 'Arusha', price: 36000, trend: 'up', change: 6.2 },
      mbeya: { market: 'Mbeya', price: 34000, trend: 'stable', change: 1.1 },
      dodoma: { market: 'Dodoma', price: 37000, trend: 'up', change: 4.3 },
      iringa: { market: 'Iringa', price: 35000, trend: 'down', change: -2.1 },
      mwanza: { market: 'Mwanza', price: 36500, trend: 'up', change: 3.8 }
    },
    summary: {
      minPrice: 34000,
      maxPrice: 38000,
      avgPrice: 36167,
      trend: 'up'
    },
    predictions: [
      { week: 1, price: 36500, confidence: 88, factors: ['High demand', 'Limited supply'] },
      { week: 2, price: 36800, confidence: 85, factors: ['Restaurant demand', 'Export market'] },
      { week: 3, price: 36500, confidence: 80, factors: ['New harvest', 'Price stabilization'] },
      { week: 4, price: 36200, confidence: 77, factors: ['Increased supply', 'Market saturation'] }
    ],
    insights: {
      bestMarket: 'Dar es Salaam',
      worstMarket: 'Mbeya',
      recommendation: 'Current high prices - consider selling now, prices may stabilize in 3 weeks',
      factors: 'Strong demand from urban areas and restaurants driving prices up'
    }
  }
};

export const demoWeatherData = {
  arusha: {
    location: 'Arusha',
    region: 'Northern Tanzania',
    current: {
      temperature: 24,
      humidity: 65,
      rainfall: 2.5,
      windSpeed: 12,
      condition: 'Partly Cloudy',
      lastUpdated: new Date().toISOString()
    },
    forecast: [
      { date: '2024-01-15', high: 26, low: 18, rainfall: 0, condition: 'Sunny' },
      { date: '2024-01-16', high: 25, low: 17, rainfall: 0, condition: 'Partly Cloudy' },
      { date: '2024-01-17', high: 24, low: 16, rainfall: 3.2, condition: 'Light Rain' },
      { date: '2024-01-18', high: 23, low: 15, rainfall: 8.5, condition: 'Heavy Rain' },
      { date: '2024-01-19', high: 22, low: 14, rainfall: 5.1, condition: 'Moderate Rain' },
      { date: '2024-01-20', high: 24, low: 16, rainfall: 1.2, condition: 'Partly Cloudy' },
      { date: '2024-01-21', high: 26, low: 18, rainfall: 0, condition: 'Sunny' }
    ],
    advisory: {
      summary: 'Good conditions for most crops, expect rain mid-week',
      recommendations: [
        'Ideal conditions for planting maize and beans',
        'Delay fertilizer application until after rain',
        'Prepare drainage for heavy rain on day 4-5',
        'Good time for pest control before rain'
      ],
      warnings: [
        'Heavy rain expected on day 4 - protect young plants',
        'Monitor for fungal diseases after rain period'
      ]
    }
  },
  dar_es_salaam: {
    location: 'Dar es Salaam',
    region: 'Coastal Tanzania',
    current: {
      temperature: 28,
      humidity: 78,
      rainfall: 0,
      windSpeed: 15,
      condition: 'Hot and Humid',
      lastUpdated: new Date().toISOString()
    },
    forecast: [
      { date: '2024-01-15', high: 30, low: 24, rainfall: 0, condition: 'Hot' },
      { date: '2024-01-16', high: 29, low: 23, rainfall: 0, condition: 'Hot' },
      { date: '2024-01-17', high: 28, low: 22, rainfall: 2.1, condition: 'Light Rain' },
      { date: '2024-01-18', high: 27, low: 21, rainfall: 4.5, condition: 'Moderate Rain' },
      { date: '2024-01-19', high: 28, low: 22, rainfall: 1.8, condition: 'Partly Cloudy' },
      { date: '2024-01-20', high: 29, low: 23, rainfall: 0, condition: 'Hot' },
      { date: '2024-01-21', high: 30, low: 24, rainfall: 0, condition: 'Hot' }
    ],
    advisory: {
      summary: 'Hot and humid conditions, some rain expected mid-week',
      recommendations: [
        'Increase irrigation for vegetables',
        'Apply mulch to retain moisture',
        'Monitor for heat stress in crops',
        'Good time for coastal vegetable planting'
      ],
      warnings: [
        'High humidity increases disease risk',
        'Heat stress possible for sensitive crops'
      ]
    }
  }
};

export const demoFarmingAdvice = {
  maize: {
    crop: 'Maize',
    stage: 'Planting',
    location: 'Arusha',
    issue: 'Poor germination',
    advice: {
      problem: 'Poor seed germination in Arusha region',
      causes: [
        'Soil temperature too low (below 15°C)',
        'Insufficient soil moisture',
        'Old or low-quality seeds',
        'Improper planting depth'
      ],
      recommendations: [
        'Wait until soil temperature reaches 18-20°C before planting',
        'Ensure soil moisture at 60-70% field capacity',
        'Use certified seeds from reputable suppliers',
        'Plant at depth of 3-5 cm for optimal germination',
        'Consider seed treatment with fungicide'
      ],
      timeline: {
        immediate: 'Test soil temperature and moisture',
        short: 'Prepare seedbed and acquire quality seeds',
        medium: 'Plant when conditions are optimal',
        long: 'Monitor germination and early growth'
      },
      expectedYield: '3.5-4.5 tons per hectare with proper management',
      costs: {
        seeds: 'TZS 80,000 per hectare',
        fertilizer: 'TZS 150,000 per hectare',
        labor: 'TZS 200,000 per hectare',
        total: 'TZS 430,000 per hectare'
      },
      market: 'Current market price TZS 46,000 per 100kg, expected to rise to TZS 50,000 in 3 months'
    }
  },
  tomatoes: {
    crop: 'Tomatoes',
    stage: 'Flowering',
    location: 'Dar es Salaam',
    issue: 'Flower drop',
    advice: {
      problem: 'Excessive flower drop in tomato plants',
      causes: [
        'High temperatures (above 32°C)',
        'Water stress (too much or too little)',
        'Poor pollination',
        'Nutrient imbalance (especially nitrogen)'
      ],
      recommendations: [
        'Provide shade during hottest part of day',
        'Maintain consistent soil moisture',
        'Hand pollinate or encourage bee activity',
        'Apply balanced fertilizer with adequate phosphorus',
        'Use mulch to regulate soil temperature'
      ],
      timeline: {
        immediate: 'Check irrigation and temperature',
        short: 'Apply corrective fertilization',
        medium: 'Monitor flower retention',
        long: 'Adjust growing practices for next season'
      },
      expectedYield: '15-20 tons per hectare with proper management',
      costs: {
        seeds: 'TZS 120,000 per hectare',
        fertilizer: 'TZS 250,000 per hectare',
        pestControl: 'TZS 180,000 per hectare',
        total: 'TZS 550,000 per hectare'
      },
      market: 'Current market price TZS 38,000 per crate, strong demand in urban markets'
    }
  }
};

export const demoDiseaseDiagnosis = {
  'maize_leaf_blight': {
    problem: 'Maize Northern Leaf Blight',
    confidence: 92,
    description: 'Fungal disease affecting maize leaves, common in humid conditions',
    symptoms: [
      'Gray-green to tan lesions on leaves',
      'Elliptical lesions up to 15cm long',
      'Lesions first appear on lower leaves',
      'Severe cases cause premature death'
    ],
    causes: [
      'Fungus: Exserohilum turcicum',
      'High humidity and moderate temperatures',
      'Poor air circulation in dense planting',
      'Residue from previous infected crops'
    ],
    treatment: {
      immediate: [
        'Remove and destroy infected plant material',
        'Improve air circulation by proper spacing',
        'Avoid overhead irrigation'
      ],
      chemical: [
        'Apply fungicide: Mancozeb 75% WP at 2kg/ha',
        'Alternative: Chlorothalonil 50% WP at 2.5kg/ha',
        'Repeat every 7-10 days during wet season'
      ],
      cultural: [
        'Plant resistant varieties',
        'Practice crop rotation (2-3 years)',
        'Ensure proper drainage',
        'Use balanced fertilization'
      ],
      prevention: [
        'Use certified disease-free seeds',
        'Monitor fields regularly',
        'Maintain proper plant density',
        'Remove volunteer plants'
      ]
    },
    impact: {
      yieldLoss: '20-50% if untreated',
      economicImpact: 'Significant reduction in profitability',
      spread: 'Can spread rapidly in favorable conditions'
    }
  },
  'tomato_bacterial_wilt': {
    problem: 'Tomato Bacterial Wilt',
    confidence: 88,
    description: 'Serious bacterial disease causing rapid wilting and death',
    symptoms: [
      'Sudden wilting of upper leaves',
      'Lower leaves turn yellow and die',
      'Plant collapses and dies quickly',
      'Brown discoloration in stem when cut'
    ],
    causes: [
      'Bacterium: Ralstonia solanacearum',
      'Warm soil temperatures (25-30°C)',
      'High soil moisture',
      'Poor drainage'
    ],
    treatment: {
      immediate: [
        'Remove and destroy infected plants immediately',
        'Disinfect tools with bleach solution',
        'Avoid moving soil from infected areas'
      ],
      chemical: [
        'Soil fumigation with metam sodium',
        'Apply beneficial microbes to soil',
        'Use copper-based sprays as protectant'
      ],
      cultural: [
        'Use resistant varieties',
        'Improve soil drainage',
        'Avoid over-irrigation',
        'Solarization of soil in hot season'
      ],
      prevention: [
        'Use disease-free seedlings',
        'Practice crop rotation (3-4 years)',
        'Avoid planting in known infected fields',
        'Use raised beds for better drainage'
      ]
    },
    impact: {
      yieldLoss: 'Up to 100% in severe cases',
      economicImpact: 'Complete crop loss possible',
      spread: 'Rapid spread through soil and water'
    }
  }
};

export const demoCropRecommendations = {
  arusha: {
    location: 'Arusha',
    soilType: 'loamy',
    season: 'long_rains',
    goals: ['profit', 'food_security'],
    recommendations: [
      {
        crop: 'Maize',
        swahiliName: 'Mahindi',
        suitability: 92,
        reasons: [
          'Well-suited to Arusha climate',
          'High market demand in region',
          'Good yields with proper management',
          'Multiple market outlets available'
        ],
        expectedYield: '4.5-5.5 tons/ha',
        profitability: 'High',
        marketDemand: 'Very High',
        growingSeason: '4-5 months',
        requirements: {
          rainfall: '600-900mm',
          temperature: '18-30°C',
          soil: 'Well-drained loamy soil',
          ph: '5.5-7.0'
        },
        risks: [
          'Drought stress in dry periods',
          'Maize streak virus',
          'Price fluctuations'
        ],
        opportunities: [
          'Growing demand for animal feed',
          'Export opportunities to Kenya',
          'Government support programs'
        ]
      },
      {
        crop: 'Beans',
        swahiliName: 'Maharage',
        suitability: 88,
        reasons: [
          'Nitrogen-fixing improves soil',
          'Short growing period',
          'Good market prices',
          'Drought tolerant varieties available'
        ],
        expectedYield: '1.2-1.8 tons/ha',
        profitability: 'Medium-High',
        marketDemand: 'High',
        growingSeason: '2-3 months',
        requirements: {
          rainfall: '400-600mm',
          temperature: '15-25°C',
          soil: 'Well-drained soil',
          ph: '6.0-7.0'
        },
        risks: [
          'Bean common mosaic virus',
          'Pod borer insects',
          'Market price volatility'
        ],
        opportunities: [
          'High protein content increases demand',
          'Intercropping possibilities with maize',
          'Export to regional markets'
        ]
      },
      {
        crop: 'Tomatoes',
        swahiliName: 'Nyanya',
        suitability: 78,
        reasons: [
          'High value crop',
          'Good market in urban areas',
          'Multiple harvests possible',
          'Irrigation infrastructure available'
        ],
        expectedYield: '15-25 tons/ha',
        profitability: 'Very High',
        marketDemand: 'Very High',
        growingSeason: '3-4 months',
        requirements: {
          rainfall: '800-1200mm or irrigation',
          temperature: '20-28°C',
          soil: 'Rich, well-drained soil',
          ph: '6.0-7.0'
        },
        risks: [
          'High input costs',
          'Disease pressure',
          'Market gluts',
          'Water requirements'
        ],
        opportunities: [
          'Processing industry demand',
          'Export opportunities',
          'Greenhouse production'
        ]
      }
    ],
    overall: {
      bestChoice: 'Maize',
      diversification: 'Maize + Beans intercropping',
      marketStrategy: 'Focus on local markets, consider regional exports',
      riskManagement: 'Diversify crops, use drought-tolerant varieties'
    }
  }
};

export const demoUser = {
  id: '2',
  email: 'farmer@shambasmart.co.tz',
  name: 'John Farmer',
  role: 'farmer',
  location: 'arusha',
  phone: '+255987654321',
  farmSize: 'small',
  primaryCrops: ['maize', 'tomatoes'],
  joinDate: '2024-01-01',
  lastLogin: new Date().toISOString(),
  profile: {
    farmSize: '5 hectares',
    experience: '8 years',
    mainCrops: ['Maize', 'Tomatoes', 'Beans'],
    goals: ['Increase yield', 'Improve profitability', 'Sustainable farming'],
    challenges: ['Water scarcity', 'Market access', 'Pest management']
  }
};
