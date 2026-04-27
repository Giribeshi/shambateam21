const axios = require('axios');

// AI-powered weather service with predictive analytics
class AIWeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || 'demo_key';
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    this.historicalData = [];
  }

  // Get AI-enhanced weather data with predictions
  async getAIWeatherData(location, days = 7) {
    try {
      // Current weather
      const currentResponse = await axios.get(
        `${this.baseUrl}/weather?q=${location}&appid=${this.apiKey}&units=metric`
      );

      // Forecast data
      const forecastResponse = await axios.get(
        `${this.baseUrl}/forecast?q=${location}&appid=${this.apiKey}&units=metric&cnt=${days}`
      );

      // AI analysis and predictions
      const aiAnalysis = await this.analyzeWeatherPatterns(
        currentResponse.data,
        forecastResponse.data
      );

      return {
        success: true,
        current: currentResponse.data,
        forecast: forecastResponse.data,
        aiAnalysis,
        predictions: this.generatePredictions(aiAnalysis),
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('AI Weather Service Error:', error.message);
      return {
        success: false,
        error: 'Weather data fetch failed',
        fallback: this.getBasicWeatherData(location)
      };
    }
  }

  // AI-powered weather pattern analysis
  async analyzeWeatherPatterns(current, forecast) {
    const analysis = {
      // Temperature trends
      temperatureTrend: this.analyzeTemperatureTrend(forecast),
      temperatureVariability: this.calculateTemperatureVariability(forecast),
      
      // Precipitation analysis
      rainfallPattern: this.analyzeRainfallPattern(forecast),
      droughtRisk: this.assessDroughtRisk(forecast),
      
      // Agricultural suitability
      farmingConditions: this.assessFarmingConditions(forecast),
      optimalPlantingDays: this.identifyOptimalPlantingDays(forecast),
      
      // AI predictions
      seasonalOutlook: this.generateSeasonalOutlook(forecast),
      weatherAlerts: this.generateWeatherAlerts(forecast)
    };

    return analysis;
  }

  // AI temperature trend analysis
  analyzeTemperatureTrend(forecast) {
    const temperatures = forecast.list.map(day => day.main.temp);
    const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    const trend = temperatures[temperatures.length - 1] > avgTemp ? 'rising' : 'stable';

    return {
      trend,
      average: Math.round(avgTemp),
      range: Math.max(...temperatures) - Math.min(...temperatures),
      confidence: this.calculateTrendConfidence(temperatures)
    };
  }

  // AI rainfall pattern analysis
  analyzeRainfallPattern(forecast) {
    const rainfallData = forecast.list.map(day => day.rain || 0);
    const totalRainfall = rainfallData.reduce((sum, rain) => sum + rain, 0);
    const rainyDays = rainfallData.filter(day => day.rain > 0).length;

    return {
      totalRainfall: Math.round(totalRainfall),
      rainyDays,
      averagePerDay: Math.round(totalRainfall / forecast.list.length),
      pattern: rainyDays > forecast.list.length * 0.6 ? 'very_rainy' : 'moderate',
      confidence: this.calculateRainfallConfidence(rainfallData)
    };
  }

  // AI drought risk assessment
  assessDroughtRisk(forecast) {
    const rainfallData = forecast.list.map(day => day.rain || 0);
    const recentRainfall = rainfallData.slice(0, 7).reduce((sum, rain) => sum + rain, 0);
    const temperatureData = forecast.list.map(day => day.main.temp);
    const avgTemp = temperatureData.reduce((sum, temp) => sum + temp, 0) / temperatureData.length;

    // AI drought prediction model
    const droughtRisk = this.calculateDroughtProbability(recentRainfall, avgTemp);

    return {
      risk: droughtRisk > 0.6 ? 'high' : droughtRisk > 0.3 ? 'moderate' : 'low',
      probability: Math.round(droughtRisk * 100),
      factors: {
        lowRainfall: recentRainfall < 50,
        highTemperature: avgTemp > 28,
        decreasingRainfall: this.isRainfallDecreasing(rainfallData)
      }
    };
  }

  // AI farming conditions assessment
  assessFarmingConditions(forecast) {
    const temperatures = forecast.list.map(day => day.main.temp);
    const humidity = forecast.list[0]?.main?.humidity || 65;
    const windSpeed = forecast.list[0]?.wind?.speed || 5;

    return {
      suitability: this.calculateFarmingSuitability(temperatures, humidity),
      recommendations: this.generateFarmingRecommendations(temperatures, humidity, windSpeed),
      riskFactors: this.identifyRiskFactors(temperatures, humidity)
    };
  }

  // AI optimal planting day identification
  identifyOptimalPlantingDays(forecast) {
    return forecast.list
      .filter((day, index) => {
        const temp = day.main.temp;
        const rain = day.rain || 0;
        const humidity = day.main.humidity || 65;
        
        // AI criteria for optimal planting
        return (
          temp >= 18 && temp <= 28 &&
          rain >= 5 && rain <= 30 &&
          humidity >= 60 && humidity <= 80
        );
      })
      .map((day, index) => ({
        date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        temperature: day.main.temp,
        rainfall: day.rain,
        humidity: day.main.humidity,
        reason: 'Optimal temperature, moisture, and light conditions'
      }));
  }

  // AI seasonal outlook generation
  generateSeasonalOutlook(forecast) {
    const month = new Date().getMonth();
    const seasonalData = this.getSeasonalData(month);
    
    return {
      season: seasonalData.season,
      outlook: seasonalData.outlook,
      recommendations: seasonalData.recommendations,
      confidence: this.calculateSeasonalConfidence(forecast)
    };
  }

  // AI weather alert generation
  generateWeatherAlerts(forecast) {
    const alerts = [];
    
    forecast.list.forEach((day, index) => {
      const temp = day.main.temp;
      const rain = day.rain || 0;
      const wind = day.wind?.speed || 0;

      // AI alert conditions
      if (temp > 35) {
        alerts.push({
          type: 'extreme_heat',
          severity: 'high',
          message: `Extreme heat warning: ${Math.round(temp)}°C expected`,
          date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString()
        });
      }

      if (rain > 50) {
        alerts.push({
          type: 'heavy_rain',
          severity: 'moderate',
          message: `Heavy rainfall expected: ${Math.round(rain)}mm`,
          date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString()
        });
      }

      if (wind > 15) {
        alerts.push({
          type: 'strong_wind',
          severity: 'moderate',
          message: `Strong winds: ${Math.round(wind)}km/h`,
          date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toISOString()
        });
      }
    });

    return alerts;
  }

  // AI calculation methods
  calculateDroughtProbability(recentRainfall, avgTemp) {
    if (avgTemp > 30) return 0.8;
    if (recentRainfall < 30) return 0.7;
    return 0.3;
  }

  calculateFarmingSuitability(temperatures, humidity) {
    const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    const avgHumidity = humidity;

    if (avgTemp >= 20 && avgTemp <= 28 && avgHumidity >= 60 && avgHumidity <= 80) {
      return 'excellent';
    } else if (avgTemp >= 15 && avgTemp <= 32 && avgHumidity >= 50 && avgHumidity <= 90) {
      return 'good';
    }
    return 'poor';
  }

  generateFarmingRecommendations(temperatures, humidity, windSpeed) {
    const recommendations = [];
    
    if (windSpeed > 20) {
      recommendations.push({
        type: 'wind_protection',
        message: 'Install windbreaks to protect crops',
        priority: 'high'
      });
    }

    if (humidity < 50) {
      recommendations.push({
        type: 'irrigation',
        message: 'Increase irrigation frequency',
        priority: 'medium'
      });
    }

    return recommendations;
  }

  identifyRiskFactors(temperatures, humidity) {
    const factors = [];
    
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);
    const tempRange = maxTemp - minTemp;

    if (tempRange > 15) {
      factors.push({
        type: 'temperature_fluctuation',
        risk: 'moderate',
        description: 'High temperature variability'
      });
    }

    if (humidity > 85) {
      factors.push({
        type: 'high_humidity',
        risk: 'high',
        description: 'Increased disease pressure'
      });
    }

    return factors;
  }

  // AI confidence calculations
  calculateTrendConfidence(temperatures) {
    const variance = this.calculateVariance(temperatures);
    return Math.max(0, Math.min(0.9, 1 - (variance / 100)));
  }

  calculateRainfallConfidence(rainfallData) {
    const variance = this.calculateVariance(rainfallData);
    return Math.max(0, Math.min(0.8, 1 - (variance / 50)));
  }

  calculateSeasonalConfidence(forecast) {
    return 0.75; // Base confidence for seasonal predictions
  }

  calculateVariance(data) {
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    return data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
  }

  // Helper methods
  getSeasonalData(month) {
    const seasons = {
      12: { season: 'dry_season', outlook: 'Hot and dry conditions expected', recommendations: ['Focus on drought-resistant crops', 'Conserve water', 'Implement shade structures'] },
      1: { season: 'short_rains', outlook: 'Rainy season beginning', recommendations: ['Prepare fields for planting', 'Ensure proper drainage', 'Use early-maturing varieties'] },
      2: { season: 'long_rains', outlook: 'Peak rainy season', recommendations: ['Monitor for flooding', 'Use raised beds', 'Apply nitrogen fertilizer'] },
      3: { season: 'dry_season', outlook: 'Transitional period', recommendations: ['Harvest remaining crops', 'Prepare for next season', 'Soil testing recommended'] },
      4: { season: 'short_rains', outlook: 'Second growing season', recommendations: ['Plant fast-growing crops', 'Monitor pest activity', 'Maintain irrigation'] },
      5: { season: 'dry_season', outlook: 'Cool dry period', recommendations: ['Plant cool-season crops', 'Reduce irrigation', 'Mulch application'] },
      6: { season: 'dry_season', outlook: 'Winter season', recommendations: ['Land preparation', 'Cover cropping', 'Equipment maintenance'] },
      7: { season: 'short_rains', outlook: 'Early rains', recommendations: ['Early planting preparation', 'Seed procurement', 'Fertilizer planning'] },
      8: { season: 'dry_season', outlook: 'Pre-planting season', recommendations: ['Soil amendment', 'Irrigation system maintenance', 'Training for farmers'] },
      9: { season: 'long_rains', outlook: 'Main planting season', recommendations: ['Major crop planting', 'Pest control preparation', 'Maximum irrigation'] },
      10: { season: 'long_rains', outlook: 'Peak growing season', recommendations: ['Intensive farming', 'Disease monitoring', 'Harvest planning'] },
      11: { season: 'short_rains', outlook: 'Early harvest', recommendations: ['Harvest preparation', 'Storage planning', 'Market preparation'] }
    };

    return seasons[month] || seasons[0];
  }

  // Fallback basic weather data
  getBasicWeatherData(location) {
    return {
      location,
      temperature: 25,
      humidity: 65,
      condition: 'partly_cloudy',
      description: 'Basic weather data - AI service unavailable'
    };
  }
}

module.exports = AIWeatherService;
