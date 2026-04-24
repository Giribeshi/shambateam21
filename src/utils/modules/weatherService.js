const axios = require('axios');

// Weather service for Tanzanian agricultural regions
class WeatherService {
  constructor() {
    // In production, this would use a real weather API
    // For demo purposes, we'll simulate weather data
    this.regions = {
      'arusha': { lat: -3.387, lon: 36.683, altitude: 1400 },
      'dar_es_salaam': { lat: -6.792, lon: 39.208, altitude: 0 },
      'dodoma': { lat: -6.162, lon: 35.751, altitude: 1120 },
      'iringa': { lat: -7.267, lon: 35.733, altitude: 1500 },
      'kilimanjaro': { lat: -3.367, lon: 37.355, altitude: 1400 },
      'mbeya': { lat: -8.917, lon: 33.467, altitude: 1700 },
      'morogoro': { lat: -6.833, lon: 37.667, altitude: 500 },
      'mwanza': { lat: -2.517, lon: 32.917, altitude: 1140 },
      'tanga': { lat: -5.067, lon: 39.300, altitude: 0 },
      'zanzibar': { lat: -6.167, lon: 39.217, altitude: 0 }
    };
  }

  async getWeather(location, language = 'en') {
    try {
      // In production, this would call a real weather API
      // For demo, we'll return simulated data
      const weatherData = this.generateSimulatedWeather(location);
      
      return {
        location: location,
        current: weatherData.current,
        forecast: weatherData.forecast,
        agricultural_advice: this.generateAgriculturalAdvice(weatherData, language),
        language: language,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Weather data retrieval failed: ${error.message}`);
    }
  }

  generateSimulatedWeather(location) {
    const currentMonth = new Date().getMonth();
    const isRainySeason = this.isRainySeason(currentMonth, location);
    
    const baseTemp = this.getBaseTemperature(location);
    const currentTemp = baseTemp + Math.random() * 5 - 2.5;
    
    return {
      current: {
        temperature: Math.round(currentTemp),
        humidity: isRainySeason ? 75 + Math.random() * 15 : 40 + Math.random() * 20,
        rainfall: isRainySeason ? Math.random() * 10 : Math.random() * 2,
        wind_speed: 5 + Math.random() * 10,
        description: isRainySeason ? 'Partly cloudy with chance of rain' : 'Sunny with few clouds',
        soil_moisture: isRainySeason ? 60 + Math.random() * 20 : 30 + Math.random() * 15
      },
      forecast: this.generateForecast(currentMonth, location, isRainySeason)
    };
  }

  generateForecast(currentMonth, location, isRainySeason) {
    const forecast = [];
    const days = 7;
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      
      const baseTemp = this.getBaseTemperature(location);
      const temp = baseTemp + Math.random() * 8 - 4;
      
      forecast.push({
        date: date.toISOString().split('T')[0],
        temperature: {
          min: Math.round(temp - 5),
          max: Math.round(temp + 5)
        },
        humidity: isRainySeason ? 70 + Math.random() * 20 : 35 + Math.random() * 25,
        rainfall_chance: isRainySeason ? 60 + Math.random() * 30 : 10 + Math.random() * 20,
        description: this.getWeatherDescription(isRainySeason, Math.random())
      });
    }
    
    return forecast;
  }

  isRainySeason(month, location) {
    // Tanzania has two main rainy seasons: March-May (long rains) and October-December (short rains)
    const longRains = month >= 2 && month <= 5; // March-May
    const shortRains = month >= 9 && month <= 11; // October-December
    
    // Some regions have different patterns
    const coastalRegions = ['dar_es_salaam', 'tanga', 'zanzibar'];
    if (coastalRegions.includes(location.toLowerCase())) {
      // Coastal regions have more consistent rainfall
      return longRails || shortRains || month >= 4 && month <= 6;
    }
    
    return longRains || shortRains;
  }

  getBaseTemperature(location) {
    const regionTemps = {
      'arusha': 20,
      'dar_es_salaam': 28,
      'dodoma': 25,
      'iringa': 18,
      'kilimanjaro': 19,
      'mbeya': 16,
      'morogoro': 23,
      'mwanza': 24,
      'tanga': 27,
      'zanzibar': 27
    };
    
    return regionTemps[location.toLowerCase()] || 22;
  }

  getWeatherDescription(isRainySeason, random) {
    if (isRainySeason) {
      if (random < 0.3) return 'Heavy rain expected';
      if (random < 0.6) return 'Light showers';
      return 'Cloudy with rain possible';
    } else {
      if (random < 0.3) return 'Clear and sunny';
      if (random < 0.6) return 'Partly cloudy';
      return 'Overcast but dry';
    }
  }

  generateAgriculturalAdvice(weatherData, language) {
    const translations = {
      'en': {
        title: 'Agricultural Weather Advisory',
        current_conditions: 'Current Conditions',
        forecast_advice: '7-Day Forecast Advice',
        recommendations: 'Recommendations',
        planting: 'Planting Conditions',
        irrigation: 'Irrigation Needs',
        pest_disease: 'Pest & Disease Risk',
        field_work: 'Field Work Suitability',
        excellent: 'Excellent',
        good: 'Good',
        moderate: 'Moderate',
        poor: 'Poor'
      },
      'sw': {
        title: 'Ushauri wa Hali ya Hewa wa Kilimo',
        current_conditions: 'Hali ya Sasa',
        forecast_advice: 'Ushauri wa Ramani ya Siku 7',
        recommendations: 'Mapendekezo',
        planting: 'Hali za Upandaji',
        irrigation: 'Mahitaji ya Umwagiliaji',
        pest_disease: 'Hatari ya Wadudu & Magonjwa',
        field_work: 'Uwiano wa Kazi Shambani',
        excellent: 'Bora',
        good: 'Nzuri',
        moderate: 'Wastani',
        poor: 'Mbaya'
      }
    };

    const t = translations[language] || translations['en'];
    
    const current = weatherData.current;
    const forecast = weatherData.forecast;
    
    // Analyze conditions
    const plantingConditions = this.assessPlantingConditions(current, forecast);
    const irrigationNeeds = this.assessIrrigationNeeds(current, forecast);
    const pestDiseaseRisk = this.assessPestDiseaseRisk(current, forecast);
    const fieldWorkSuitability = this.assessFieldWorkSuitability(current, forecast);

    return {
      title: t.title,
      sections: t,
      assessments: {
        [t.planting]: plantingConditions,
        [t.irrigation]: irrigationNeeds,
        [t.pest_disease]: pestDiseaseRisk,
        [t.field_work]: fieldWorkSuitability
      },
      specific_recommendations: this.generateSpecificRecommendations(
        current, 
        forecast, 
        plantingConditions,
        irrigationNeeds,
        pestDiseaseRisk,
        language
      )
    };
  }

  assessPlantingConditions(current, forecast) {
    const avgTemp = forecast.reduce((sum, day) => sum + day.temperature.max, 0) / forecast.length;
    const totalRainChance = forecast.reduce((sum, day) => sum + day.rainfall_chance, 0) / forecast.length;
    
    if (avgTemp >= 18 && avgTemp <= 28 && totalRainChance >= 40) {
      return { level: 'excellent', reason: 'Good temperature and adequate rainfall expected' };
    } else if (avgTemp >= 15 && avgTemp <= 30 && totalRainChance >= 20) {
      return { level: 'good', reason: 'Acceptable conditions with moderate rainfall' };
    } else if (avgTemp >= 12 && avgTemp <= 35) {
      return { level: 'moderate', reason: 'Temperature okay but rainfall may be insufficient' };
    } else {
      return { level: 'poor', reason: 'Unsuitable temperature or rainfall patterns' };
    }
  }

  assessIrrigationNeeds(current, forecast) {
    const avgHumidity = forecast.reduce((sum, day) => sum + day.humidity, 0) / forecast.length;
    const totalRainChance = forecast.reduce((sum, day) => sum + day.rainfall_chance, 0) / forecast.length;
    
    if (totalRainChance >= 60 && avgHumidity >= 70) {
      return { level: 'low', reason: 'Adequate rainfall and humidity expected' };
    } else if (totalRainChance >= 30 && avgHumidity >= 50) {
      return { level: 'moderate', reason: 'Some irrigation may be needed' };
    } else {
      return { level: 'high', reason: 'Low rainfall expected, irrigation essential' };
    }
  }

  assessPestDiseaseRisk(current, forecast) {
    const avgHumidity = forecast.reduce((sum, day) => sum + day.humidity, 0) / forecast.length;
    const avgTemp = forecast.reduce((sum, day) => sum + day.temperature.max, 0) / forecast.length;
    
    // High humidity and moderate temperatures increase disease risk
    if (avgHumidity >= 70 && avgTemp >= 20 && avgTemp <= 28) {
      return { level: 'high', reason: 'High humidity and favorable temperatures for pests/diseases' };
    } else if (avgHumidity >= 60 && avgTemp >= 18 && avgTemp <= 30) {
      return { level: 'moderate', reason: 'Moderate conditions that may support some pests/diseases' };
    } else {
      return { level: 'low', reason: 'Conditions less favorable for pest and disease development' };
    }
  }

  assessFieldWorkSuitability(current, forecast) {
    const avgRainChance = forecast.reduce((sum, day) => sum + day.rainfall_chance, 0) / forecast.length;
    const avgWindSpeed = 10; // Simulated average
    
    if (avgRainChance <= 20 && avgWindSpeed <= 15) {
      return { level: 'excellent', reason: 'Dry conditions with light winds ideal for field work' };
    } else if (avgRainChance <= 40 && avgWindSpeed <= 20) {
      return { level: 'good', reason: 'Generally suitable conditions for field activities' };
    } else if (avgRainChance <= 60) {
      return { level: 'moderate', reason: 'Some rain expected but work possible between showers' };
    } else {
      return { level: 'poor', reason: 'Heavy rain expected, field work not recommended' };
    }
  }

  generateSpecificRecommendations(current, forecast, planting, irrigation, pestDisease, language) {
    const recommendations = [];
    
    // Planting recommendations
    if (planting.level === 'excellent') {
      recommendations.push(this.translateText('Ideal conditions for planting most crops', language));
      recommendations.push(this.translateText('Consider planting maize, beans, or vegetables', language));
    } else if (planting.level === 'good') {
      recommendations.push(this.translateText('Good conditions for drought-tolerant crops', language));
      recommendations.push(this.translateText('Consider sorghum, millet, or cassava', language));
    } else if (planting.level === 'moderate') {
      recommendations.push(this.translateText('Wait for better conditions or use irrigation', language));
    } else {
      recommendations.push(this.translateText('Not recommended for planting currently', language));
    }
    
    // Irrigation recommendations
    if (irrigation.level === 'high') {
      recommendations.push(this.translateText('Plan for regular irrigation, especially for young plants', language));
      recommendations.push(this.translateText('Use water conservation techniques like mulching', language));
    } else if (irrigation.level === 'moderate') {
      recommendations.push(this.translateText('Monitor soil moisture and irrigate as needed', language));
    }
    
    // Pest and disease recommendations
    if (pestDisease.level === 'high') {
      recommendations.push(this.translateText('Monitor closely for pest and disease symptoms', language));
      recommendations.push(this.translateText('Have preventive measures ready (fungicides, pesticides)', language));
      recommendations.push(this.translateText('Ensure good air circulation by proper spacing', language));
    } else if (pestDisease.level === 'moderate') {
      recommendations.push(this.translateText('Regular monitoring for pests and diseases recommended', language));
    }
    
    // Field work recommendations
    if (planting.level !== 'poor') {
      if (irrigation.level === 'low') {
        recommendations.push(this.translateText('Good time for land preparation and weeding', language));
      } else if (irrigation.level === 'moderate') {
        recommendations.push(this.translateText('Field work possible between irrigation sessions', language));
      }
    }
    
    return recommendations;
  }

  translateText(text, language) {
    if (language === 'sw') {
      const swahiliMap = {
        'Ideal conditions for planting most crops': 'Hali nzuri kwa upandaji wa mazao mengi',
        'Consider planting maize, beans, or vegetables': 'Fikiria kupanda mahindi, maharage, au mboga',
        'Good conditions for drought-tolerant crops': 'Hali nzuri kwa mazao yanayostahimili ukame',
        'Consider sorghum, millet, or cassava': 'Fikiria mawele, uwele, au muhogo',
        'Wait for better conditions or use irrigation': 'Subiri hali nzuri au tumia umwagiliaji',
        'Not recommended for planting currently': 'Haipendekezwi kwa upandaji kwa sasa',
        'Plan for regular irrigation, especially for young plants': 'Panga umwagiliaji wa mara kwa mara, hasa kwa mimea michanga',
        'Use water conservation techniques like mulching': 'Tumia mbinu za uhifadhi wa maji kama ulinzi',
        'Monitor soil moisture and irrigate as needed': 'Scrini unyevu wa udongo na umwagilia kama inahitajika',
        'Monitor closely for pest and disease symptoms': 'Scrini karibu kwa dalili za wadudu na magonjwa',
        'Have preventive measures ready (fungicides, pesticides)': 'Kuwa na hatua za kuzuia tayari (fungicides, pesticides)',
        'Ensure good air circulation by proper spacing': 'Hakikisha mzunguko wa hewa nzuri kwa kuweka nafasi sahihi',
        'Regular monitoring for pests and diseases recommended': 'Uscrini wa mara kwa mara wa wadudu na magonjwa unapendekezwa',
        'Good time for land preparation and weeding': 'Wakati mzuri wa maandalizi ya ardhi na kupondapondaa',
        'Field work possible between irrigation sessions': 'Kazi shambani inawezekana kati ya vipindi vya umwagiliaji'
      };
      return swahiliMap[text] || text;
    }
    return text;
  }
}

module.exports = new WeatherService();
