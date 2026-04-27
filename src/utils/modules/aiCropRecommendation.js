const axios = require('axios');

// AI-powered crop recommendation system
class AICropRecommendation {
  constructor() {
    this.weatherApi = 'https://api.openweathermap.org/data/2.5';
    this.soilApi = 'https://rest.soilgrids.com/api';
    this.cropDatabase = 'https://crop-compendium.org/api/v1/crops';
  }

  // Get comprehensive crop recommendations using AI
  async getCropRecommendations(userProfile, currentWeather, soilData) {
    try {
      // AI analysis of user's farm profile and conditions
      const analysis = await this.analyzeFarmConditions(userProfile, currentWeather, soilData);
      
      // Get AI-powered crop suggestions
      const recommendations = await this.generateAIRecommendations(analysis);
      
      return {
        success: true,
        aiAnalysis: analysis,
        recommendations,
        timestamp: new Date().toISOString(),
        confidence: this.calculateRecommendationConfidence(analysis)
      };

    } catch (error) {
      console.error('AI Crop Recommendation Error:', error.message);
      return {
        success: false,
        error: 'AI analysis failed',
        fallback: this.getRuleBasedRecommendations(userProfile)
      };
    }
  }

  // AI analysis of farm conditions
  async analyzeFarmConditions(userProfile, weather, soilData) {
    const analysis = {
      // Environmental factors
      temperature: weather?.temperature || 25,
      humidity: weather?.humidity || 65,
      rainfall: weather?.rainfall || 100,
      
      // Soil characteristics
      soilType: soilData?.type || 'unknown',
      ph: soilData?.ph || 6.5,
      nutrients: soilData?.nutrients || {},
      
      // Historical performance
      previousCrops: userProfile?.previousCrops || [],
      farmSize: userProfile?.farmSize || 'medium',
      location: userProfile?.location || 'unknown',
      
      // AI risk assessment
      riskFactors: this.assessRiskFactors(weather, soilData),
      
      // Seasonal analysis
      currentSeason: this.determineSeason(weather),
      climateTrend: this.analyzeClimateTrend(weather)
    };

    return analysis;
  }

  // Generate AI-powered recommendations
  async generateAIRecommendations(analysis) {
    const recommendations = {
      primary: [],
      secondary: [],
      rotation: [],
      practices: []
    };

    // AI-driven crop selection based on conditions
    if (analysis.temperature >= 20 && analysis.temperature <= 30) {
      if (analysis.rainfall >= 800) {
        recommendations.primary.push({
          crop: 'Maize',
          confidence: 0.85,
          reason: 'Optimal temperature and rainfall for maize',
          variety: 'Hybrid drought-tolerant varieties',
          expectedYield: '3-5 tons/ha'
        });
      }
    }

    // AI soil analysis recommendations
    if (analysis.ph >= 6.0 && analysis.ph <= 7.5) {
      recommendations.primary.push({
        crop: 'Tomatoes',
        confidence: 0.75,
        reason: 'Neutral pH suitable for nightshades',
        variety: 'Heat-tolerant hybrids',
        expectedYield: '15-20 tons/ha'
      });
    }

    // AI seasonal recommendations
    if (analysis.currentSeason === 'long_rains') {
      recommendations.rotation.push({
        crop: 'Beans',
        confidence: 0.80,
        reason: 'Legume rotation for nitrogen fixation',
        benefit: 'Improves soil fertility for next season'
      });
    }

    // AI risk mitigation recommendations
    if (analysis.riskFactors.droughtRisk > 0.7) {
      recommendations.practices.push({
        practice: 'Drought-resistant varieties',
        confidence: 0.90,
        reason: 'AI predicts high drought probability',
        implementation: 'Select early-maturing varieties'
      });
    }

    // AI precision farming recommendations
    if (analysis.farmSize === 'small') {
      recommendations.practices.push({
        practice: 'Intensive farming',
        confidence: 0.70,
        reason: 'AI optimization for small landholdings',
        implementation: 'High-value crops per unit area'
      });
    }

    return recommendations;
  }

  // AI risk assessment
  assessRiskFactors(weather, soilData) {
    return {
      droughtRisk: this.calculateDroughtRisk(weather),
      floodRisk: this.calculateFloodRisk(weather),
      pestRisk: this.calculatePestRisk(weather, soilData),
      diseaseRisk: this.calculateDiseaseRisk(weather, soilData),
      overallRisk: this.calculateOverallRisk(weather, soilData)
    };
  }

  // AI risk calculation methods
  calculateDroughtRisk(weather) {
    const rainfall = weather?.rainfall || 100;
    const temperature = weather?.temperature || 25;
    
    if (rainfall < 500 && temperature > 28) {
      return 0.8; // High drought risk
    } else if (rainfall < 800) {
      return 0.5; // Moderate drought risk
    }
    return 0.2; // Low drought risk
  }

  calculateFloodRisk(weather) {
    const rainfall = weather?.rainfall || 100;
    return rainfall > 1200 ? 0.7 : 0.1;
  }

  calculatePestRisk(weather, soilData) {
    const temperature = weather?.temperature || 25;
    const humidity = weather?.humidity || 65;
    
    // AI model for pest prediction based on conditions
    if (temperature > 25 && humidity > 70 && soilData.type === 'sandy') {
      return 0.8; // High pest risk
    }
    return 0.3; // Low pest risk
  }

  calculateDiseaseRisk(weather, soilData) {
    const humidity = weather?.humidity || 65;
    const ph = soilData?.ph || 6.5;
    
    // AI disease risk assessment
    if (humidity > 80 && ph < 6.0) {
      return 0.7; // High disease risk
    }
    return 0.2; // Low disease risk
  }

  calculateOverallRisk(weather, soilData) {
    const risks = [
      this.calculateDroughtRisk(weather),
      this.calculateFloodRisk(weather),
      this.calculatePestRisk(weather, soilData),
      this.calculateDiseaseRisk(weather, soilData)
    ];
    
    return Math.max(...risks);
  }

  // AI seasonal analysis
  determineSeason(weather) {
    const month = new Date().getMonth();
    const rainfall = weather?.rainfall || 100;
    
    // AI season determination based on weather patterns
    if (month >= 3 && month <= 5 && rainfall > 1000) {
      return 'long_rains';
    } else if (month >= 6 && month <= 9) {
      return 'dry_season';
    } else if (month >= 10 && month <= 12) {
      return 'short_rains';
    }
    return 'intermediate';
  }

  // AI climate trend analysis
  analyzeClimateTrend(weather) {
    // Simplified AI climate analysis
    return {
      trend: 'stable',
      variation: 'moderate',
      prediction: 'Similar conditions expected next season'
    };
  }

  // Calculate recommendation confidence
  calculateRecommendationConfidence(analysis) {
    let confidence = 0.5; // Base confidence
    
    // Increase confidence based on data quality
    if (analysis.soilData.type !== 'unknown') confidence += 0.2;
    if (analysis.weather && analysis.weather.temperature) confidence += 0.2;
    if (analysis.previousCrops.length > 0) confidence += 0.1;
    
    return Math.min(confidence, 0.95);
  }

  // Fallback rule-based recommendations
  getRuleBasedRecommendations(userProfile) {
    const location = userProfile?.location || 'unknown';
    
    const recommendations = {
      'arusha': ['Maize', 'Beans', 'Rice'],
      'morogoro': ['Maize', 'Sorghum', 'Sunflower'],
      'mbeya': ['Maize', 'Rice', 'Cotton'],
      'dodoma': ['Maize', 'Sesame', 'Groundnuts'],
      'iringa': ['Maize', 'Beans', 'Vegetables'],
      'tanga': ['Cashew', 'Coconut', 'Spices'],
      'kilimanjaro': ['Maize', 'Beans', 'Wheat'],
      'mwanza': ['Maize', 'Rice', 'Tobacco'],
      'default': ['Maize', 'Beans', 'Tomatoes']
    };

    return {
      primary: (recommendations[location] || recommendations.default).map(crop => ({
        crop,
        confidence: 0.6,
        reason: 'Regional suitability analysis',
        variety: 'Local adapted varieties',
        expectedYield: '2-4 tons/ha'
      })),
      secondary: [],
      rotation: [],
      practices: []
    };
  }
}

module.exports = AICropRecommendation;
