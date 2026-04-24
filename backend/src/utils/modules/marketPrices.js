class MarketPricesService {
  constructor() {
    // Major Tanzanian agricultural markets
    this.markets = {
      dar_es_salaam: {
        name: 'Dar es Salaam',
        name_sw: 'Dar es Salaam',
        region: 'Coastal',
        importance: 'National Hub',
        coordinates: { lat: -6.8, lng: 39.2833 }
      },
      arusha: {
        name: 'Arusha',
        name_sw: 'Arusha',
        region: 'Northern',
        importance: 'Regional Hub',
        coordinates: { lat: -3.3869, lng: 36.6830 }
      },
      mbeya: {
        name: 'Mbeya',
        name_sw: 'Mbeya',
        region: 'Southern Highlands',
        importance: 'Regional Hub',
        coordinates: { lat: -8.9167, lng: 33.4500 }
      },
      dodoma: {
        name: 'Dodoma',
        name_sw: 'Dodoma',
        region: 'Central',
        importance: 'Regional Hub',
        coordinates: { lat: -6.1833, lng: 35.7833 }
      },
      morogoro: {
        name: 'Morogoro',
        name_sw: 'Morogoro',
        region: 'Eastern',
        importance: 'Regional Hub',
        coordinates: { lat: -6.8167, lng: 37.6667 }
      },
      mwanza: {
        name: 'Mwanza',
        name_sw: 'Mwanza',
        region: 'Lake Zone',
        importance: 'Regional Hub',
        coordinates: { lat: -2.5167, lng: 32.9000 }
      }
    };

    // Major Tanzanian crops with base prices
    this.crops = {
      maize: {
        name: 'Maize',
        name_sw: 'Mahindi',
        unit: '100kg bag',
        unit_sw: 'gunia la kg 100',
        basePrice: 45000, // TZS per 100kg
        volatility: 0.15, // Price volatility factor
        seasonality: {
          high: ['March', 'April', 'May', 'June'], // Harvest season - lower prices
          low: ['September', 'October', 'November', 'December'] // Scarcity - higher prices
        }
      },
      rice: {
        name: 'Rice',
        name_sw: 'Mchele',
        unit: '100kg bag',
        unit_sw: 'gunia la kg 100',
        basePrice: 120000,
        volatility: 0.12,
        seasonality: {
          high: ['June', 'July', 'August'],
          low: ['December', 'January', 'February']
        }
      },
      beans: {
        name: 'Beans',
        name_sw: 'Maharage',
        unit: '100kg bag',
        unit_sw: 'gunia la kg 100',
        basePrice: 95000,
        volatility: 0.18,
        seasonality: {
          high: ['April', 'May', 'June'],
          low: ['October', 'November', 'December']
        }
      },
      tomatoes: {
        name: 'Tomatoes',
        name_sw: 'Nyanya',
        unit: 'crate',
        unit_sw: 'kisi',
        basePrice: 45000,
        volatility: 0.25,
        seasonality: {
          high: ['July', 'August', 'September'],
          low: ['January', 'February', 'March']
        }
      },
      onions: {
        name: 'Onions',
        name_sw: 'Kitunguu',
        unit: '100kg bag',
        unit_sw: 'gunia la kg 100',
        basePrice: 85000,
        volatility: 0.20,
        seasonality: {
          high: ['August', 'September', 'October'],
          low: ['February', 'March', 'April']
        }
      },
      cassava: {
        name: 'Cassava',
        name_sw: 'Muhogo',
        unit: '100kg',
        unit_sw: 'kg 100',
        basePrice: 25000,
        volatility: 0.10,
        seasonality: {
          high: ['May', 'June', 'July'],
          low: ['November', 'December', 'January']
        }
      }
    };

    // Initialize historical price data
    this.initializeHistoricalData();
  }

  initializeHistoricalData() {
    // Generate simulated historical data for the past 6 months
    this.historicalData = {};
    const months = ['July', 'August', 'September', 'October', 'November', 'December'];
    const currentYear = new Date().getFullYear();

    Object.keys(this.crops).forEach(cropKey => {
      this.historicalData[cropKey] = {};
      
      Object.keys(this.markets).forEach(marketKey => {
        this.historicalData[cropKey][marketKey] = [];
        
        months.forEach((month, index) => {
          const basePrice = this.crops[cropKey].basePrice;
          const seasonalFactor = this.getSeasonalFactor(cropKey, month);
          const marketFactor = this.getMarketFactor(marketKey);
          const randomFactor = 0.9 + Math.random() * 0.2; // ±10% random variation
          
          const price = Math.round(basePrice * seasonalFactor * marketFactor * randomFactor);
          
          this.historicalData[cropKey][marketKey].push({
            date: `${month} ${currentYear}`,
            price: price,
            volume: Math.round(1000 + Math.random() * 5000), // Random volume
            quality: 'Good'
          });
        });
      });
    });
  }

  getSeasonalFactor(crop, month) {
    const cropData = this.crops[crop];
    if (cropData.seasonality.high.includes(month)) {
      return 0.85; // Lower prices during harvest
    } else if (cropData.seasonality.low.includes(month)) {
      return 1.15; // Higher prices during scarcity
    }
    return 1.0; // Normal prices
  }

  getMarketFactor(market) {
    // Different markets have different price levels
    const factors = {
      dar_es_salaam: 1.10, // Major urban center - higher prices
      arusha: 1.05,
      mbeya: 0.95,
      dodoma: 1.00,
      morogoro: 0.98,
      mwanza: 1.02
    };
    return factors[market] || 1.0;
  }

  // AI-based price prediction using multiple factors
  predictPrices(crop, weeksAhead = 4) {
    const cropData = this.crops[crop];
    const predictions = [];
    const currentDate = new Date();
    
    for (let week = 1; week <= weeksAhead; week++) {
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + (week * 7));
      const month = futureDate.toLocaleString('default', { month: 'long' });
      
      // AI prediction factors
      const seasonalFactor = this.getSeasonalFactor(crop, month);
      const trendFactor = this.calculateTrendFactor(crop);
      const weatherFactor = this.simulateWeatherImpact(crop, month);
      const demandFactor = this.simulateDemandImpact(crop);
      const volatilityFactor = 1 + (Math.random() - 0.5) * cropData.volatility;
      
      // Calculate predicted price
      const basePrice = cropData.basePrice;
      const predictedPrice = Math.round(
        basePrice * seasonalFactor * trendFactor * weatherFactor * demandFactor * volatilityFactor
      );
      
      // Calculate confidence interval
      const confidence = Math.max(60, 90 - (week * 5)); // Decreasing confidence over time
      const variance = predictedPrice * cropData.volatility * (week / 4);
      const minPrice = Math.round(predictedPrice - variance);
      const maxPrice = Math.round(predictedPrice + variance);
      
      predictions.push({
        week: week,
        date: futureDate.toISOString().split('T')[0],
        predictedPrice: predictedPrice,
        minPrice: minPrice,
        maxPrice: maxPrice,
        confidence: confidence,
        trend: this.calculateTrend(crop, predictedPrice),
        factors: {
          seasonal: seasonalFactor,
          trend: trendFactor,
          weather: weatherFactor,
          demand: demandFactor
        }
      });
    }
    
    return predictions;
  }

  calculateTrendFactor(crop) {
    // Simulate market trend based on historical data
    const historicalPrices = this.getRecentPrices(crop);
    if (historicalPrices.length < 2) return 1.0;
    
    const recent = historicalPrices.slice(-4); // Last 4 data points
    const avgRecent = recent.reduce((sum, p) => sum + p.price, 0) / recent.length;
    const older = historicalPrices.slice(-8, -4); // Previous 4 data points
    const avgOlder = older.length > 0 ? older.reduce((sum, p) => sum + p.price, 0) / older.length : avgRecent;
    
    return avgRecent / avgOlder; // Trend factor
  }

  simulateWeatherImpact(crop, month) {
    // Simulate weather impact on crop prices
    const weatherImpacts = {
      'January': 1.05, 'February': 1.03, 'March': 0.98, 'April': 0.95,
      'May': 0.92, 'June': 0.95, 'July': 1.00, 'August': 1.02,
      'September': 1.03, 'October': 1.05, 'November': 1.08, 'December': 1.10
    };
    return weatherImpacts[month] || 1.0;
  }

  simulateDemandImpact(crop) {
    // Simulate demand impact based on crop type
    const demandFactors = {
      maize: 1.02, // High demand - staple food
      rice: 1.01,
      beans: 1.03, // High protein demand
      tomatoes: 1.05, // High demand in urban areas
      onions: 1.02,
      cassava: 0.98 // Lower demand elasticity
    };
    return demandFactors[crop] || 1.0;
  }

  calculateTrend(crop, currentPrice) {
    const historicalPrices = this.getRecentPrices(crop);
    if (historicalPrices.length < 2) return 'stable';
    
    const recentAvg = historicalPrices.slice(-2).reduce((sum, p) => sum + p.price, 0) / 2;
    const change = ((currentPrice - recentAvg) / recentAvg) * 100;
    
    if (change > 5) return 'rising';
    if (change < -5) return 'falling';
    return 'stable';
  }

  getRecentPrices(crop, limit = 8) {
    // Get recent prices across all markets
    const recentPrices = [];
    Object.keys(this.markets).forEach(market => {
      const marketData = this.historicalData[crop]?.[market] || [];
      recentPrices.push(...marketData.slice(-limit));
    });
    
    // Sort by date and return most recent
    return recentPrices.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
  }

  getMarketPrices(crop, language = 'en') {
    const cropData = this.crops[crop];
    const currentPrices = {};
    
    // Get current prices for all markets
    Object.keys(this.markets).forEach(marketKey => {
      const marketData = this.historicalData[crop]?.[marketKey];
      const latestPrice = marketData?.[marketData.length - 1];
      
      if (latestPrice) {
        currentPrices[marketKey] = {
          market: this.markets[marketKey],
          currentPrice: latestPrice.price,
          volume: latestPrice.volume,
          quality: latestPrice.quality,
          priceRange: this.calculatePriceRange(crop, marketKey),
          lastUpdated: latestPrice.date
        };
      }
    });
    
    // Get price predictions
    const predictions = this.predictPrices(crop);
    
    // Calculate market summary
    const prices = Object.values(currentPrices).map(p => p.currentPrice);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length);
    
    return {
      crop: {
        key: crop,
        name: language === 'sw' ? cropData.name_sw : cropData.name,
        unit: language === 'sw' ? cropData.unit_sw : cropData.unit
      },
      summary: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        avgPrice: avgPrice,
        priceRange: maxPrice - minPrice,
        trend: this.calculateOverallTrend(crop),
        volatility: cropData.volatility
      },
      markets: currentPrices,
      predictions: predictions,
      insights: this.generateMarketInsights(crop, language),
      recommendations: this.generateRecommendations(crop, language),
      lastUpdated: new Date().toISOString()
    };
  }

  calculatePriceRange(crop, market) {
    const cropData = this.crops[crop];
    const basePrice = cropData.basePrice;
    const marketFactor = this.getMarketFactor(market);
    const volatility = cropData.volatility;
    
    const minPrice = Math.round(basePrice * marketFactor * (1 - volatility));
    const maxPrice = Math.round(basePrice * marketFactor * (1 + volatility));
    
    return { min: minPrice, max: maxPrice };
  }

  calculateOverallTrend(crop) {
    const predictions = this.predictPrices(crop, 4);
    const firstPrice = predictions[0].predictedPrice;
    const lastPrice = predictions[predictions.length - 1].predictedPrice;
    
    const change = ((lastPrice - firstPrice) / firstPrice) * 100;
    
    if (change > 3) return 'rising';
    if (change < -3) return 'falling';
    return 'stable';
  }

  generateMarketInsights(crop, language) {
    const insights = [];
    const cropData = this.crops[crop];
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const seasonalFactor = this.getSeasonalFactor(crop, currentMonth);
    
    if (seasonalFactor < 0.95) {
      insights.push(language === 'en' 
        ? `${currentMonth} is harvest season for ${cropData.name}. Expect lower prices due to increased supply.`
        : `${currentMonth} ni msimu wa mavuno kwa ${cropData.name_sw}. Tatarajia bei chini kutokana na kuongezeka kwa usafirishaji.`
      );
    } else if (seasonalFactor > 1.05) {
      insights.push(language === 'en'
        ? `${currentMonth} is low supply period for ${cropData.name}. Expect higher prices.`
        : `${currentMonth} ni kipindi cha chini cha usafirishaji kwa ${cropData.name_sw}. Tatarajia bei za juu.`
      );
    }
    
    if (cropData.volatility > 0.2) {
      insights.push(language === 'en'
        ? `${cropData.name} prices are highly volatile. Consider selling when prices are favorable.`
        : `Bei za ${cropData.name_sw} zinabadilika sana. Fikiria kuuza wakati bei ni nzuri.`
      );
    }
    
    return insights;
  }

  generateRecommendations(crop, language) {
    const recommendations = [];
    const trend = this.calculateOverallTrend(crop);
    const predictions = this.predictPrices(crop, 2);
    
    if (trend === 'rising') {
      recommendations.push(language === 'en'
        ? 'Prices are trending upward. Consider holding stock for better prices.'
        : 'Bei zinapanda. Fikiria kuhifadhi hisa kwa bei nzuri.'
      );
    } else if (trend === 'falling') {
      recommendations.push(language === 'en'
        ? 'Prices are trending downward. Consider selling soon to avoid losses.'
        : 'Bei zinashuka. Fikiria kuuza haraka ili kuepuka hasara.'
      );
    }
    
    const nextWeekPrice = predictions[0].predictedPrice;
    const currentAvgPrice = Object.values(this.historicalData[crop] || {})
      .flatMap(market => market.slice(-1))
      .reduce((sum, p, _, arr) => sum + p.price / arr.length, 0);
    
    if (nextWeekPrice > currentAvgPrice * 1.05) {
      recommendations.push(language === 'en'
        ? 'Next week prices expected to increase significantly. Consider delaying sales.'
        : 'Bei wiki ijayo zinatarajiwa kuongezeka kwa kiasi kikubwa. Fikiria kuchelewesha mauzo.'
      );
    }
    
    return recommendations;
  }

  getAllMarketPrices(language = 'en') {
    const allPrices = {};
    
    Object.keys(this.crops).forEach(crop => {
      allPrices[crop] = this.getMarketPrices(crop, language);
    });
    
    return {
      crops: allPrices,
      markets: this.markets,
      summary: this.generateMarketSummary(language),
      lastUpdated: new Date().toISOString()
    };
  }

  generateMarketSummary(language) {
    const summary = {
      totalCrops: Object.keys(this.crops).length,
      totalMarkets: Object.keys(this.markets).length,
      overallTrend: 'stable',
      bestPerforming: null,
      worstPerforming: null,
      marketInsights: []
    };
    
    // Calculate overall market trend
    const trends = Object.keys(this.crops).map(crop => this.calculateOverallTrend(crop));
    const risingCount = trends.filter(t => t === 'rising').length;
    const fallingCount = trends.filter(t => t === 'falling').length;
    
    if (risingCount > fallingCount) summary.overallTrend = 'rising';
    else if (fallingCount > risingCount) summary.overallTrend = 'falling';
    
    // Add market insights
    summary.marketInsights = language === 'en' ? [
      'Dar es Salaam typically has 10% higher prices due to urban demand',
      'Harvest seasons (March-May) generally see 15% price reductions',
      'Market volatility is highest for perishable vegetables like tomatoes',
      'Regional hubs show consistent price patterns throughout the year'
    ] : [
      'Bei za Dar es Salaam kwa kawaida huwa juu kwa asilimia 10 kutokana na mahitaji ya mijini',
      'Msimu wa mavuno (Machi-Mei) kwa kawaida huona upunguzaji wa bei kwa asilimia 15',
      'Ubadilikanaji wa bei ni juu zaidi kwa mboga za haraka kama nyanya',
      'Viunga vya kanda huonyesha mifumo ya bei thabiti mwaka mzima'
    ];
    
    return summary;
  }
}

module.exports = new MarketPricesService();
