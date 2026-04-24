const express = require('express');
const router = express.Router();
const marketPrices = require('../modules/marketPrices');
const { authenticateToken } = require('../middleware/auth');

// Get all market prices for all crops
router.get('/prices', authenticateToken, (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const allPrices = marketPrices.getAllMarketPrices(language);
    
    res.json({
      success: true,
      data: allPrices,
      message: language === 'sw' ? 'Bei zote za soko zimepatikana' : 'All market prices retrieved successfully'
    });
  } catch (error) {
    console.error('Market prices error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market prices',
      message: error.message
    });
  }
});

// Get prices for specific crop
router.get('/prices/:crop', authenticateToken, (req, res) => {
  try {
    const { crop } = req.params;
    const { language = 'en' } = req.query;
    
    // Validate crop
    const validCrops = ['maize', 'rice', 'beans', 'tomatoes', 'onions', 'cassava'];
    if (!validCrops.includes(crop)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid crop',
        message: language === 'sw' ? 'Mmea si sahihi' : 'Invalid crop specified'
      });
    }
    
    const cropPrices = marketPrices.getMarketPrices(crop, language);
    
    res.json({
      success: true,
      data: cropPrices,
      message: language === 'sw' 
        ? `Bei za soko kwa ${cropPrices.crop.name} zimepatikana` 
        : `Market prices for ${cropPrices.crop.name} retrieved successfully`
    });
  } catch (error) {
    console.error('Crop market prices error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch crop market prices',
      message: error.message
    });
  }
});

// Get price predictions for specific crop
router.get('/predictions/:crop', authenticateToken, (req, res) => {
  try {
    const { crop } = req.params;
    const { weeks = 4, language = 'en' } = req.query;
    
    // Validate crop
    const validCrops = ['maize', 'rice', 'beans', 'tomatoes', 'onions', 'cassava'];
    if (!validCrops.includes(crop)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid crop',
        message: language === 'sw' ? 'Mmea si sahihi' : 'Invalid crop specified'
      });
    }
    
    const predictions = marketPrices.predictPrices(crop, parseInt(weeks));
    const cropData = marketPrices.crops[crop];
    
    res.json({
      success: true,
      data: {
        crop: {
          key: crop,
          name: language === 'sw' ? cropData.name_sw : cropData.name,
          unit: language === 'sw' ? cropData.unit_sw : cropData.unit
        },
        predictions: predictions,
        summary: {
          trend: marketPrices.calculateOverallTrend(crop),
          volatility: cropData.volatility,
          confidence: predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length
        }
      },
      message: language === 'sw' 
        ? `Ramani za bei kwa ${cropData.name_sw} zimepatikana` 
        : `Price predictions for ${cropData.name} retrieved successfully`
    });
  } catch (error) {
    console.error('Price predictions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch price predictions',
      message: error.message
    });
  }
});

// Get market comparison across regions
router.get('/comparison', authenticateToken, (req, res) => {
  try {
    const { crop, language = 'en' } = req.query;
    
    let comparisonData;
    
    if (crop) {
      // Comparison for specific crop across all markets
      comparisonData = marketPrices.getMarketPrices(crop, language);
    } else {
      // Comparison of all crops across all markets
      comparisonData = marketPrices.getAllMarketPrices(language);
    }
    
    res.json({
      success: true,
      data: comparisonData,
      message: language === 'sw' 
        ? 'Mlinganisho wa soko umepatikana' 
        : 'Market comparison retrieved successfully'
    });
  } catch (error) {
    console.error('Market comparison error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market comparison',
      message: error.message
    });
  }
});

// Get market insights and recommendations
router.get('/insights', authenticateToken, (req, res) => {
  try {
    const { crop, language = 'en' } = req.query;
    
    let insights;
    
    if (crop) {
      // Insights for specific crop
      const cropData = marketPrices.getMarketPrices(crop, language);
      insights = {
        crop: cropData.crop,
        insights: cropData.insights,
        recommendations: cropData.recommendations,
        summary: cropData.summary
      };
    } else {
      // General market insights
      insights = marketPrices.generateMarketSummary(language);
    }
    
    res.json({
      success: true,
      data: insights,
      message: language === 'sw' 
        ? 'Machaguo ya soko yamepatikana' 
        : 'Market insights retrieved successfully'
    });
  } catch (error) {
    console.error('Market insights error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market insights',
      message: error.message
    });
  }
});

// Get available markets and crops
router.get('/info', (req, res) => {
  try {
    const { language = 'en' } = req.query;
    
    const info = {
      markets: marketPrices.markets,
      crops: Object.keys(marketPrices.crops).map(key => ({
        key: key,
        name: language === 'sw' ? marketPrices.crops[key].name_sw : marketPrices.crops[key].name,
        unit: language === 'sw' ? marketPrices.crops[key].unit_sw : marketPrices.crops[key].unit,
        volatility: marketPrices.crops[key].volatility
      })),
      summary: marketPrices.generateMarketSummary(language)
    };
    
    res.json({
      success: true,
      data: info,
      message: language === 'sw' 
        ? 'Maelezo ya soko yamepatikana' 
        : 'Market information retrieved successfully'
    });
  } catch (error) {
    console.error('Market info error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch market information',
      message: error.message
    });
  }
});

module.exports = router;
