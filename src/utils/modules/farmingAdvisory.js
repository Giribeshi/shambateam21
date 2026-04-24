// Farming advisory system for Tanzanian agriculture
const advisoryDatabase = {
  maize: {
    planting: {
      season: 'long_rains',
      timing: 'March-May',
      spacing: '75cm between rows, 25cm between plants',
      depth: '3-5cm deep',
      fertilizer: 'Apply 50kg NPK per hectare at planting',
      water: 'Ensure adequate moisture during germination',
      tips: [
        'Use certified seeds for better germination',
        'Test soil pH before planting (ideal: 6.0-7.0)',
        'Consider drought-tolerant varieties in dry areas'
      ]
    },
    growing: {
      weeding: 'First weeding 2-3 weeks after emergence',
      fertilizer: 'Top dress with 50kg urea per hectare at knee height',
      water: 'Water during critical periods: tasseling and grain filling',
      pest_control: 'Monitor for stem borers and armyworms',
      tips: [
        'Practice conservation agriculture for soil health',
        'Use mulch to conserve moisture',
        'Monitor for nutrient deficiencies'
      ]
    },
    harvesting: {
      timing: '3-4 months after planting, when husks dry',
      method: 'Harvest when moisture content is 15-20%',
      storage: 'Dry to 13% moisture for storage',
      post_harvest: 'Remove damaged grains, store in cool dry place',
      tips: [
        'Avoid harvesting during rainy season',
        'Use proper storage facilities to prevent losses',
        'Consider value addition like drying and milling'
      ]
    }
  },
  tomatoes: {
    planting: {
      season: 'year-round with irrigation, main seasons March-May and Sep-Nov',
      timing: 'Start in nursery, transplant after 4-6 weeks',
      spacing: '60cm between rows, 40cm between plants',
      depth: '1cm deep in nursery beds',
      fertilizer: 'Well-composted manure at 20 tons per hectare',
      water: 'Keep nursery beds moist but not waterlogged',
      tips: [
        'Use raised beds for better drainage',
        'Treat seeds with hot water (50°C for 25 min) to prevent diseases',
        'Choose varieties suited for local market preferences'
      ]
    },
    growing: {
      weeding: 'Regular weeding, avoid deep cultivation near roots',
      fertilizer: 'Apply 100kg NPK per hectare in split doses',
      water: 'Drip irrigation preferred, 2-3 liters per plant daily',
      pest_control: 'Monitor for whiteflies, aphids, and tomato hornworms',
      pruning: 'Remove lower leaves up to first fruit cluster',
      staking: 'Provide support for indeterminate varieties',
      tips: [
        'Use integrated pest management (IPM)',
        'Apply mulch to conserve soil moisture',
        'Monitor for blossom end rot (calcium deficiency)'
      ]
    },
    harvesting: {
      timing: '60-80 days after transplanting, depending on variety',
      method: 'Harvest when fruits are fully colored but still firm',
      frequency: 'Harvest every 2-3 days',
      post_harvest: 'Handle carefully to prevent bruising',
      storage: 'Store at 10-12°C for extended shelf life',
      tips: [
        'Harvest in early morning or late evening',
        'Grade fruits by size and quality',
        'Consider processing for surplus production'
      ]
    }
  },
  beans: {
    planting: {
      season: 'short rains (Oct-Dec) and long rains (Mar-May)',
      timing: 'Plant at onset of rains',
      spacing: '30cm between rows, 10cm between plants',
      depth: '3-4cm deep',
      fertilizer: 'Apply 20kg P2O5 per hectare at planting',
      inoculation: 'Inoculate seeds with rhizobium bacteria',
      tips: [
        'Choose bush varieties for quick maturity',
        'Use climbing varieties with support for higher yields',
        'Rotate with cereals to break disease cycles'
      ]
    },
    growing: {
      weeding: 'First weeding 2 weeks after emergence',
      fertilizer: 'Beans fix nitrogen, avoid excess nitrogen',
      water: 'Critical during flowering and pod development',
      pest_control: 'Monitor for bean beetles and aphids',
      support: 'Provide stakes for climbing varieties',
      tips: [
        'Avoid working in fields when plants are wet',
        'Practice intercropping with maize for better yields',
        'Monitor for common bacterial blight'
      ]
    },
    harvesting: {
      timing: '60-90 days after planting, depending on variety',
      method: 'Harvest when pods are dry and brittle',
      drying: 'Dry pods to 13% moisture before threshing',
      storage: 'Store in airtight containers',
      post_harvest: 'Clean and sort beans before storage',
      tips: [
        'Harvest in dry weather to prevent mold',
        'Use proper storage to prevent weevil damage',
        'Consider seed saving for next season'
      ]
    }
  }
};

// Regional recommendations for Tanzania
const regionalAdvice = {
  'arusha': {
    climate: 'Highland, moderate temperatures',
    best_crops: ['maize', 'beans', 'potatoes', 'vegetables'],
    special_considerations: [
      'Frost risk in high altitudes',
      'Good for horticulture',
      'Volcanic soils are fertile'
    ]
  },
  'dar_es_salaam': {
    climate: 'Coastal, hot and humid',
    best_crops: ['cassava', 'coconut', 'vegetables', 'rice'],
    special_considerations: [
      'High humidity increases disease pressure',
      'Saline soils in coastal areas',
      'Good year-round growing season'
    ]
  },
  'dodoma': {
    climate: 'Semi-arid, hot and dry',
    best_crops: ['sorghum', 'millet', 'drought-tolerant maize', 'sunflower'],
    special_considerations: [
      'Water conservation critical',
      'Drought-resistant varieties essential',
      'Consider rainwater harvesting'
    ]
  },
  'mbeya': {
    climate: 'Southern highlands, cool temperatures',
    best_crops: ['maize', 'wheat', 'potatoes', 'pyrethrum'],
    special_considerations: [
      'Suitable for temperate crops',
      'Good rainfall distribution',
      'Mountain agriculture practices'
    ]
  },
  'morogoro': {
    climate: 'Transitional zone, moderate rainfall',
    best_crops: ['maize', 'rice', 'sugarcane', 'vegetables'],
    special_considerations: [
      'Good for both rainfed and irrigated agriculture',
      'River basins provide irrigation potential',
      'Major agricultural region'
    ]
  }
};

// Swahili translations for advisory
const advisoryTranslations = {
  'en': {
    title: 'Farming Advisory',
    crop: 'Crop',
    stage: 'Growth Stage',
    recommendations: 'Recommendations',
    timing: 'Timing',
    method: 'Method',
    tips: 'Important Tips',
    regional: 'Regional Considerations',
    water: 'Water Management',
    fertilizer: 'Fertilizer',
    pests: 'Pest Control',
    harvesting: 'Harvesting',
    storage: 'Storage'
  },
  'sw': {
    title: 'Ushauri wa Kilimo',
    crop: 'Mmea',
    stage: 'Hatua ya Ukuaji',
    recommendations: 'Mapendekezo',
    timing: 'Wakati',
    method: 'Njia',
    tips: 'Mashauri Muhimu',
    regional: 'Mazingira ya Kanda',
    water: 'Usimamaji wa Maji',
    fertilizer: 'Mbolea',
    pests: 'Kudhibiti Wadudu',
    harvesting: 'Kuvuna',
    storage: 'Hifadhi'
  }
};

class FarmingAdvisory {
  async getAdvice({ crop, stage, location, issue, language = 'en' }) {
    try {
      const advice = this.generateAdvice(crop, stage, location, issue, language);
      
      return {
        ...advice,
        language: language,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Advisory generation failed: ${error.message}`);
    }
  }

  generateAdvice(crop, stage, location, issue, language) {
    const t = advisoryTranslations[language] || advisoryTranslations['en'];
    
    let advice = {
      title: t.title,
      crop: crop,
      stage: stage,
      sections: t
    };

    // Get crop-specific advice
    if (advisoryDatabase[crop] && advisoryDatabase[crop][stage]) {
      const cropAdvice = advisoryDatabase[crop][stage];
      advice.cropAdvice = this.translateObject(cropAdvice, language);
    }

    // Get regional advice
    if (location && regionalAdvice[location.toLowerCase()]) {
      const regionInfo = regionalAdvice[location.toLowerCase()];
      advice.regionalAdvice = this.translateObject(regionInfo, language);
    }

    // Handle specific issues
    if (issue) {
      advice.issueAdvice = this.handleIssue(issue, crop, language);
    }

    // Add general seasonal advice
    advice.seasonalAdvice = this.getSeasonalAdvice(crop, language);

    return advice;
  }

  handleIssue(issue, crop, language) {
    const issueHandlers = {
      'pests': {
        problem: this.translateText('Pest Infestation', language),
        solutions: [
          this.translateText('Identify the specific pest first', language),
          this.translateText('Use integrated pest management (IPM)', language),
          this.translateText('Consider biological controls (beneficial insects)', language),
          this.translateText('Use pesticides only as last resort', language),
          this.translateText('Remove affected plants to prevent spread', language)
        ],
        prevention: [
          this.translateText('Practice crop rotation', language),
          this.translateText('Keep fields clean of weeds', language),
          this.translateText('Monitor regularly for early detection', language),
          this.translateText('Use resistant varieties when available', language)
        ]
      },
      'diseases': {
        problem: this.translateText('Disease Outbreak', language),
        solutions: [
          this.translateText('Remove and destroy infected plants', language),
          this.translateText('Improve air circulation', language),
          this.translateText('Avoid overhead watering', language),
          this.translateText('Apply appropriate fungicides if necessary', language),
          this.translateText('Disinfect tools between uses', language)
        ],
        prevention: [
          this.translateText('Use disease-resistant varieties', language),
          this.translateText('Practice crop rotation', language),
          this.translateText('Ensure proper drainage', language),
          this.translateText('Maintain optimal plant spacing', language)
        ]
      },
      'water': {
        problem: this.translateText('Water Issues', language),
        solutions: [
          this.translateText('Check soil moisture before watering', language),
          this.translateText('Use drip irrigation for efficiency', language),
          this.translateText('Apply mulch to conserve moisture', language),
          this.translateText('Water early morning or late evening', language),
          this.translateText('Consider rainwater harvesting', language)
        ],
        prevention: [
          this.translateText('Improve soil organic matter', language),
          this.translateText('Use drought-tolerant varieties', language),
          this.translateText('Practice conservation agriculture', language),
          this.translateText('Monitor weather forecasts', language)
        ]
      },
      'nutrients': {
        problem: this.translateText('Nutrient Deficiency', language),
        solutions: [
          this.translateText('Conduct soil testing', language),
          this.translateText('Apply balanced fertilizers', language),
          this.translateText('Use organic matter (compost/manure)', language),
          this.translateText('Consider foliar feeding for quick results', language),
          this.translateText('Adjust pH if necessary', language)
        ],
        prevention: [
          this.translateText('Regular soil testing', language),
          this.translateText('Crop rotation to balance nutrients', language),
          this.translateText('Use cover crops', language),
          this.translateText('Apply organic matter regularly', language)
        ]
      }
    };

    const issueKey = issue.toLowerCase();
    const handler = issueHandlers[issueKey] || issueHandlers['pests']; // default to pests
    
    return handler;
  }

  getSeasonalAdvice(crop, language) {
    const currentMonth = new Date().getMonth();
    const season = this.getCurrentSeason(currentMonth);
    
    const seasonalAdvice = {
      'long_rains': {
        advice: this.translateText(`Optimal time for planting ${crop}. Ensure proper land preparation and have seeds ready.`, language),
        actions: [
          this.translateText('Prepare land and make ridges', language),
          this.translateText('Test soil and apply necessary fertilizers', language),
          this.translateText('Arrange for quality seeds', language),
          this.translateText('Prepare storage facilities', language)
        ]
      },
      'dry_season': {
        advice: this.translateText(`Focus on water conservation and drought management for ${crop}.`, language),
        actions: [
          this.translateText('Implement water harvesting techniques', language),
          this.translateText('Use drought-tolerant varieties', language),
          this.translateText('Apply mulching techniques', language),
          this.translateText('Consider irrigation if available', language)
        ]
      },
      'short_rains': {
        advice: this.translateText(`Good secondary season for ${crop}. Monitor weather patterns closely.`, language),
        actions: [
          this.translateText('Monitor rainfall patterns', language),
          this.translateText('Prepare for early planting', language),
          this.translateText('Have pest control measures ready', language),
          this.translateText('Consider early-maturing varieties', language)
        ]
      }
    };

    return seasonalAdvice[season] || seasonalAdvice['dry_season'];
  }

  getCurrentSeason(month) {
    if (month >= 2 && month <= 5) return 'long_rains';
    if (month >= 6 && month <= 10) return 'dry_season';
    return 'short_rains';
  }

  translateObject(obj, language) {
    if (typeof obj !== 'object' || obj === null) {
      return this.translateText(obj, language);
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.translateObject(item, language));
    }

    const translated = {};
    for (const [key, value] of Object.entries(obj)) {
      translated[key] = this.translateObject(value, language);
    }
    return translated;
  }

  translateText(text, language) {
    if (language === 'sw') {
      const swahiliMap = {
        'maize': 'mahindi',
        'tomatoes': 'nyanya',
        'beans': 'maharage',
        'planting': 'upandaji',
        'growing': 'ukulima',
        'harvesting': 'uvunaji',
        'water': 'maji',
        'fertilizer': 'mbolea',
        'pests': 'wadudu',
        'diseases': 'magonjwa',
        'seeds': 'mbegu',
        'soil': 'udongo',
        'rain': 'mvua',
        'season': 'msimu',
        'storage': 'hifadhi',
        'quality': 'ubora',
        'yield': 'mazao'
      };

      let translated = text;
      for (const [en, sw] of Object.entries(swahiliMap)) {
        translated = translated.replace(new RegExp(en, 'gi'), sw);
      }
      return translated;
    }
    return text;
  }
}

module.exports = new FarmingAdvisory();
