// Crop recommendation engine for Tanzanian conditions
const cropDatabase = {
  maize: {
    name: 'Maize (Mahindi)',
    scientific_name: 'Zea mays',
    growing_season: ['long_rains', 'short_rains'],
    rainfall_requirement: '400-800mm annually',
    temperature_range: '15-30°C',
    soil_ph: '5.5-7.5',
    soil_types: ['loamy', 'sandy_loam', 'clay_loam'],
    maturity_days: 90-120,
    market_demand: 'high',
    nutritional_value: 'high',
    drought_tolerance: 'medium',
    flood_tolerance: 'low',
    special_requirements: 'Well-drained soils, adequate nitrogen',
    profitability: 'medium-high',
    storage_ease: 'high',
    local_varieties: ['Staha', 'TMV1', 'Kilimo', 'H614', 'H629'],
    challenges: ['stem borers', 'maize streak virus', 'low nitrogen soils']
  },
  rice: {
    name: 'Rice (Mchele)',
    scientific_name: 'Oryza sativa',
    growing_season: ['long_rains'],
    rainfall_requirement: '1000-1500mm annually',
    temperature_range: '20-35°C',
    soil_ph: '5.5-6.5',
    soil_types: ['clay', 'clay_loam'],
    maturity_days: 100-130,
    market_demand: 'high',
    nutritional_value: 'medium',
    drought_tolerance: 'low',
    flood_tolerance: 'high',
    special_requirements: 'Abundant water, leveled fields',
    profitability: 'high',
    storage_ease: 'high',
    local_varieties: ['IR64', 'SARO 5', 'TXD 85', 'Supa'],
    challenges: ['water management', 'rice blast disease', 'birds']
  },
  beans: {
    name: 'Beans (Maharage)',
    scientific_name: 'Phaseolus vulgaris',
    growing_season: ['long_rains', 'short_rains'],
    rainfall_requirement: '300-500mm annually',
    temperature_range: '15-25°C',
    soil_ph: '6.0-7.0',
    soil_types: ['loamy', 'sandy_loam'],
    maturity_days: 60-90,
    market_demand: 'high',
    nutritional_value: 'very_high',
    drought_tolerance: 'medium',
    flood_tolerance: 'low',
    special_requirements: 'Well-drained soils, moderate rainfall',
    profitability: 'medium',
    storage_ease: 'high',
    local_varieties: ['Nauti', 'Kijitu', 'Rosecoco', 'Wairimu'],
    challenges: ['angular leaf spot', 'bean rust', 'bean flies']
  },
  tomatoes: {
    name: 'Tomatoes (Nyanya)',
    scientific_name: 'Solanum lycopersicum',
    growing_season: ['year_round_irrigated'],
    rainfall_requirement: '600-800mm annually',
    temperature_range: '18-25°C',
    soil_ph: '6.0-7.0',
    soil_types: ['loamy', 'sandy_loam'],
    maturity_days: 60-80,
    market_demand: 'very_high',
    nutritional_value: 'high',
    drought_tolerance: 'low',
    flood_tolerance: 'low',
    special_requirements: 'Regular irrigation, pest management',
    profitability: 'high',
    storage_ease: 'low',
    local_varieties: ['Cal J', 'Tengeru', 'Roma VF', 'Money Maker'],
    challenges: ['early blight', 'late blight', 'whiteflies', 'nematodes']
  },
  cassava: {
    name: 'Cassava (Muhogo)',
    scientific_name: 'Manihot esculenta',
    growing_season: ['long_rains', 'short_rains'],
    rainfall_requirement: '500-1500mm annually',
    temperature_range: '20-30°C',
    soil_ph: '5.5-6.5',
    soil_types: ['sandy', 'sandy_loam', 'laterite'],
    maturity_days: 8-12, // months
    market_demand: 'high',
    nutritional_value: 'medium',
    drought_tolerance: 'high',
    flood_tolerance: 'medium',
    special_requirements: 'Deep soils, minimal care',
    profitability: 'medium',
    storage_ease: 'high',
    local_varieties: ['Albert', 'Liongo', 'Kikombe', 'Mkombozi'],
    challenges: ['cassava mosaic disease', 'cassava brown streak', 'low soil fertility']
  },
  onions: {
    name: 'Onions (Kitunguu)',
    scientific_name: 'Allium cepa',
    growing_season: ['short_rains', 'long_rains'],
    rainfall_requirement: '400-600mm annually',
    temperature_range: '15-25°C',
    soil_ph: '6.0-7.0',
    soil_types: ['sandy_loam', 'loamy'],
    maturity_days: 90-120,
    market_demand: 'high',
    nutritional_value: 'medium',
    drought_tolerance: 'medium',
    flood_tolerance: 'low',
    special_requirements: 'Well-drained soils, moderate temperatures',
    profitability: 'high',
    storage_ease: 'high',
    local_varieties: ['Red Creole', 'Yellow Granex', 'Texas Early White'],
    challenges: ['downy mildew', 'thrips', 'purple blotch']
  },
  sorghum: {
    name: 'Sorghum (Mawele)',
    scientific_name: 'Sorghum bicolor',
    growing_season: ['short_rains'],
    rainfall_requirement: '300-500mm annually',
    temperature_range: '25-30°C',
    soil_ph: '5.5-7.5',
    soil_types: ['sandy', 'loamy', 'clay'],
    maturity_days: 90-110,
    market_demand: 'medium',
    nutritional_value: 'medium',
    drought_tolerance: 'high',
    flood_tolerance: 'medium',
    special_requirements: 'Heat tolerant, low input requirements',
    profitability: 'medium',
    storage_ease: 'high',
    local_varieties: ['Macia', 'Serena', 'Tegemeo'],
    challenges: ['bird damage', 'sorghum midge', 'striga weed']
  },
  millet: {
    name: 'Millet (Uwele)',
    scientific_name: 'Pennisetum glaucum',
    growing_season: ['short_rains'],
    rainfall_requirement: '250-400mm annually',
    temperature_range: '25-30°C',
    soil_ph: '6.0-7.5',
    soil_types: ['sandy', 'loamy'],
    maturity_days: 70-90,
    market_demand: 'medium',
    nutritional_value: 'high',
    drought_tolerance: 'very_high',
    flood_tolerance: 'low',
    special_requirements: 'Very drought tolerant, minimal water needs',
    profitability: 'medium',
    storage_ease: 'high',
    local_varieties: ['Shibe', 'Pato', 'Okoa'],
    challenges: ['bird damage', 'downy mildew', 'striga weed']
  }
};

// Regional climate data for Tanzania
const regionalClimate = {
  'arusha': {
    altitude: '1400m',
    rainfall: '500-1000mm',
    temperature: '15-25°C',
    seasons: ['bimodal'],
    best_crops: ['maize', 'beans', 'potatoes', 'vegetables'],
    constraints: ['frost in high areas', 'erratic rainfall']
  },
  'dar_es_salaam': {
    altitude: 'sea level',
    rainfall: '800-1200mm',
    temperature: '25-32°C',
    seasons: ['unimodal'],
    best_crops: ['cassava', 'coconut', 'rice', 'vegetables'],
    constraints: ['high humidity', 'saline soils', 'pest pressure']
  },
  'dodoma': {
    altitude: '1120m',
    rainfall: '250-600mm',
    temperature: '20-30°C',
    seasons: ['unimodal'],
    best_crops: ['sorghum', 'millet', 'drought_maize', 'sunflower'],
    constraints: ['low rainfall', 'drought', 'high temperatures']
  },
  'iringa': {
    altitude: '1500m',
    rainfall: '600-1000mm',
    temperature: '15-25°C',
    seasons: ['unimodal'],
    best_crops: ['maize', 'tobacco', 'vegetables', 'beans'],
    constraints: ['soil erosion', 'market access']
  },
  'kilimanjaro': {
    altitude: '1400m',
    rainfall: '800-2000mm',
    temperature: '15-25°C',
    seasons: ['bimodal'],
    best_crops: ['coffee', 'bananas', 'vegetables', 'maize'],
    constraints: ['soil erosion', 'land fragmentation']
  },
  'mbeya': {
    altitude: '1700m',
    rainfall: '600-1200mm',
    temperature: '12-22°C',
    seasons: ['unimodal'],
    best_crops: ['maize', 'wheat', 'potatoes', 'pyrethrum'],
    constraints: ['cold temperatures', 'soil acidity']
  },
  'morogoro': {
    altitude: '500m',
    rainfall: '800-1200mm',
    temperature: '20-28°C',
    seasons: ['bimodal'],
    best_crops: ['maize', 'rice', 'sugarcane', 'vegetables'],
    constraints: ['flood risk', 'pests']
  },
  'mwanza': {
    altitude: '1140m',
    rainfall: '700-1000mm',
    temperature: '18-28°C',
    seasons: ['unimodal'],
    best_crops: ['cotton', 'maize', 'rice', 'vegetables'],
    constraints: ['cotton pests', 'soil fertility']
  },
  'tanga': {
    altitude: 'sea level',
    rainfall: '1000-1500mm',
    temperature: '25-30°C',
    seasons: ['bimodal'],
    best_crops: ['sugarcane', 'cashew', 'coconut', 'cassava'],
    constraints: ['high rainfall', 'soil erosion']
  }
};

class CropRecommendation {
  async getCropRecommendations({ location, soilType, season, goals, language = 'en' }) {
    try {
      const recommendations = this.generateRecommendations(location, soilType, season, goals, language);
      
      return {
        ...recommendations,
        language: language,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Crop recommendation failed: ${error.message}`);
    }
  }

  generateRecommendations(location, soilType, season, goals, language) {
    const recommendations = [];
    
    // Get regional climate data
    const regionData = regionalClimate[location?.toLowerCase()] || this.getDefaultRegion();
    
    // Score each crop based on criteria
    for (const [cropKey, cropData] of Object.entries(cropDatabase)) {
      const score = this.scoreCrop(cropData, regionData, soilType, season, goals);
      
      if (score.total > 0) {
        recommendations.push({
          crop: cropKey,
          name: cropData.name,
          score: score,
          details: this.getCropDetails(cropData, language),
          suitability: this.getSuitabilityLevel(score.total)
        });
      }
    }

    // Sort by score
    recommendations.sort((a, b) => b.score.total - a.score.total);

    return {
      location: location || 'Unknown',
      region_data: regionData,
      recommendations: recommendations.slice(0, 5), // Top 5 recommendations
      explanation: this.generateExplanation(regionData, soilType, season, goals, language),
      sections: this.getSectionLabels(language)
    };
  }

  scoreCrop(cropData, regionData, soilType, season, goals) {
    let score = {
      climate: 0,
      soil: 0,
      season: 0,
      market: 0,
      goals: 0,
      total: 0
    };

    // Climate compatibility (0-25 points)
    const tempMatch = this.checkTemperatureMatch(cropData.temperature_range, regionData.temperature);
    const rainMatch = this.checkRainfallMatch(cropData.rainfall_requirement, regionData.rainfall);
    score.climate = (tempMatch + rainMatch) / 2 * 25;

    // Soil compatibility (0-20 points)
    score.soil = this.checkSoilCompatibility(cropData.soil_types, soilType) * 20;

    // Season compatibility (0-20 points)
    score.season = this.checkSeasonCompatibility(cropData.growing_season, season) * 20;

    // Market demand (0-15 points)
    const marketScores = { 'high': 15, 'very_high': 20, 'medium': 10, 'low': 5 };
    score.market = marketScores[cropData.market_demand] || 10;

    // Goals alignment (0-20 points)
    score.goals = this.checkGoalsAlignment(cropData, goals) * 20;

    score.total = score.climate + score.soil + score.season + score.market + score.goals;
    
    return score;
  }

  checkTemperatureMatch(cropRange, regionTemp) {
    // Simple temperature matching logic
    if (cropRange.includes('15-25') && regionTemp.includes('15-25')) return 1.0;
    if (cropRange.includes('20-30') && regionTemp.includes('20-30')) return 1.0;
    if (cropRange.includes('25-30') && regionTemp.includes('25-30')) return 1.0;
    return 0.5; // Partial match
  }

  checkRainfallMatch(cropRain, regionRain) {
    const cropMin = parseInt(cropRain.split('-')[0]);
    const cropMax = parseInt(cropRain.split('-')[1]);
    const regionMin = parseInt(regionRain.split('-')[0]);
    const regionMax = parseInt(regionRain.split('-')[1]);

    if (cropMin >= regionMin && cropMax <= regionMax) return 1.0;
    if (cropMin <= regionMin && cropMax >= regionMax) return 0.8;
    return 0.4;
  }

  checkSoilCompatibility(cropSoils, farmerSoil) {
    if (!farmerSoil) return 0.5;
    return cropSoils.includes(farmerSoil.toLowerCase()) ? 1.0 : 0.3;
  }

  checkSeasonCompatibility(cropSeasons, farmerSeason) {
    if (!farmerSeason) return 0.5;
    return cropSeasons.includes(farmerSeason.toLowerCase()) ? 1.0 : 0.2;
  }

  checkGoalsAlignment(cropData, goals) {
    if (!goals || goals.length === 0) return 0.5;

    let alignment = 0;
    const goalCount = goals.length;

    for (const goal of goals) {
      switch (goal.toLowerCase()) {
        case 'profit':
          if (cropData.profitability === 'high') alignment += 1.0;
          else if (cropData.profitability === 'medium-high') alignment += 0.8;
          else if (cropData.profitability === 'medium') alignment += 0.6;
          break;
        case 'food_security':
          if (cropData.nutritional_value === 'very_high') alignment += 1.0;
          else if (cropData.nutritional_value === 'high') alignment += 0.8;
          else if (cropData.nutritional_value === 'medium') alignment += 0.6;
          break;
        case 'low_maintenance':
          if (cropData.special_requirements.includes('minimal')) alignment += 1.0;
          else alignment += 0.5;
          break;
        case 'drought_resistant':
          if (cropData.drought_tolerance === 'very_high') alignment += 1.0;
          else if (cropData.drought_tolerance === 'high') alignment += 0.8;
          else if (cropData.drought_tolerance === 'medium') alignment += 0.6;
          break;
        case 'quick_return':
          if (cropData.maturity_days < 90) alignment += 1.0;
          else if (cropData.maturity_days < 120) alignment += 0.7;
          else alignment += 0.4;
          break;
        case 'easy_storage':
          if (cropData.storage_ease === 'high') alignment += 1.0;
          else if (cropData.storage_ease === 'medium') alignment += 0.6;
          break;
      }
    }

    return alignment / goalCount;
  }

  getCropDetails(cropData, language) {
    const translations = {
      'en': {
        growing_season: 'Growing Season',
        rainfall: 'Rainfall Required',
        temperature: 'Temperature Range',
        maturity: 'Maturity Period',
        market: 'Market Demand',
        challenges: 'Common Challenges',
        varieties: 'Local Varieties'
      },
      'sw': {
        growing_season: 'Msimu wa Ukuaji',
        rainfall: 'Mvua Inayohitajika',
        temperature: 'Halijoto ya Kuhitajika',
        maturity: 'Kipindi cha Ukuaji',
        market: 'Mahitaji ya Soko',
        challenges: 'Changamoto za Kawaida',
        varieties: 'Aina za Ndani'
      }
    };

    const t = translations[language] || translations['en'];

    return {
      [t.growing_season]: cropData.growing_season.join(', '),
      [t.rainfall]: cropData.rainfall_requirement,
      [t.temperature]: cropData.temperature_range,
      [t.maturity]: `${cropData.maturity_days} days`,
      [t.market]: cropData.market_demand,
      [t.challenges]: cropData.challenges,
      [t.varieties]: cropData.local_varieties.slice(0, 3)
    };
  }

  getSuitabilityLevel(score) {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Moderate';
    return 'Poor';
  }

  generateExplanation(regionData, soilType, season, goals, language) {
    const translations = {
      'en': {
        explanation: 'Based on your location and requirements, here are the most suitable crops for your farm.',
        climate: 'Climate compatibility considers temperature and rainfall patterns in your region.',
        soil: 'Soil compatibility matches your soil type with crop requirements.',
        season: 'Season compatibility ensures crops can grow in your preferred season.',
        market: 'Market demand indicates potential profitability.',
        goals: 'Goals alignment matches crops with your farming objectives.'
      },
      'sw': {
        explanation: 'Kulingana na eneo lako na mahitaji, hizi ni mazao yanayofaa zaidi kwa shamba lako.',
        climate: 'Uwiano wa hali ya hewa unazingatia joto na muundo wa mvua katika kanda yako.',
        soil: 'Uwiano wa udongo unalinganisha aina ya udongo lako na mahitaji ya mazao.',
        season: 'Uwiano wa msimu unahakikisha mazao yanaweza kukua katika msimu unaopendelewa.',
        market: 'Mahitaji ya soko yanaonyesha faida inawezekana.',
        goals: 'Uwiano wa malenga unalinganisha mazao na malengo yako ya kilimo.'
      }
    };

    const t = translations[language] || translations['en'];

    return {
      summary: t.explanation,
      criteria: {
        climate: t.climate,
        soil: t.soil,
        season: t.season,
        market: t.market,
        goals: t.goals
      }
    };
  }

  getSectionLabels(language) {
    const labels = {
      'en': {
        title: 'Crop Recommendations',
        location: 'Location',
        recommended_crops: 'Recommended Crops',
        suitability: 'Suitability',
        details: 'Crop Details'
      },
      'sw': {
        title: 'Mapendekezo ya Mazao',
        location: 'Eneo',
        recommended_crops: 'Mazao Yanayopendekezwa',
        suitability: 'Uwiano',
        details: 'Maelezo ya Mazao'
      }
    };

    return labels[language] || labels['en'];
  }

  getDefaultRegion() {
    return {
      altitude: '1000m',
      rainfall: '600-1000mm',
      temperature: '20-25°C',
      seasons: ['bimodal'],
      best_crops: ['maize', 'beans'],
      constraints: ['variable rainfall']
    };
  }
}

module.exports = new CropRecommendation();
