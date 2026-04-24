import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Calendar, 
  DollarSign,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Info
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { demoMarketPrices } from '../data/demoData';

const MarketPrices = () => {
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('maize');
  const [marketData, setMarketData] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('current'); // current, predictions, comparison

  const translations = {
    en: {
      title: 'Market Prices & Forecasts',
      subtitle: 'AI-powered price predictions for Tanzanian agricultural markets',
      currentPrices: 'Current Market Prices',
      pricePredictions: 'Price Predictions',
      marketComparison: 'Market Comparison',
      selectCrop: 'Select Crop',
      weeksAhead: 'Weeks Ahead',
      getPrices: 'Get Prices',
      getting: 'Loading...',
      priceRange: 'Price Range',
      averagePrice: 'Average Price',
      trend: 'Trend',
      rising: 'Rising',
      falling: 'Falling',
      stable: 'Stable',
      volatility: 'Volatility',
      confidence: 'Confidence',
      market: 'Market',
      currentPrice: 'Current Price',
      predictedPrice: 'Predicted Price',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      volume: 'Volume',
      quality: 'Quality',
      lastUpdated: 'Last Updated',
      insights: 'Market Insights',
      recommendations: 'Recommendations',
      pricePerUnit: 'Price per unit',
      viewCurrent: 'Current Prices',
      viewPredictions: 'Predictions',
      viewComparison: 'Comparison',
      highVolatility: 'High Volatility',
      moderateVolatility: 'Moderate Volatility',
      lowVolatility: 'Low Volatility',
      marketHub: 'Market Hub',
      regionalHub: 'Regional Hub',
      nationalHub: 'National Hub',
      error: 'Error',
      tryAgain: 'Try Again'
    },
    sw: {
      title: 'Bei za Soko & Ramani',
      subtitle: 'Ramani za bei zilizoboreshwa kwa AI kwa masoko ya kilimo ya Tanzania',
      currentPrices: 'Bei za Soko za Sasa',
      pricePredictions: 'Ramani za Bei',
      marketComparison: 'Mlinganisho wa Soko',
      selectCrop: 'Chagua Mmea',
      weeksAhead: 'Wiki Mbele',
      getPrices: 'Pata Bei',
      getting: 'Inapakia...',
      priceRange: 'Maslaki ya Bei',
      averagePrice: 'Bei ya Wastani',
      trend: 'Mwelekeo',
      rising: 'Inapanda',
      falling: 'Inashuka',
      stable: 'Imara',
      volatility: 'Ubadilikanaji',
      confidence: 'Uhakika',
      market: 'Soko',
      currentPrice: 'Bei ya Sasa',
      predictedPrice: 'Bei Iliyoramuliwa',
      minPrice: 'Bei ya Chini',
      maxPrice: 'Bei ya Juu',
      volume: 'Kiasi',
      quality: 'Ubora',
      lastUpdated: 'Imesasishwa',
      insights: 'Machaguo ya Soko',
      recommendations: 'Mapendekezo',
      pricePerUnit: 'Bei kwa kipimo',
      viewCurrent: 'Bei za Sasa',
      viewPredictions: 'Ramani',
      viewComparison: 'Mlinganisho',
      highVolatility: 'Ubadilikanaji wa Juu',
      moderateVolatility: 'Ubadilikanaji wa Wastani',
      lowVolatility: 'Ubadilikanaji wa Chini',
      marketHub: 'Kituo cha Soko',
      regionalHub: 'Kituo cha Kanda',
      nationalHub: 'Kituo cha Kitaifa',
      error: 'Kosa',
      tryAgain: 'Jaribu Tena'
    }
  };

  const t = translations[language];

  const crops = [
    { key: 'maize', name: language === 'sw' ? 'Mahindi' : 'Maize' },
    { key: 'rice', name: language === 'sw' ? 'Mchele' : 'Rice' },
    { key: 'beans', name: language === 'sw' ? 'Maharage' : 'Beans' },
    { key: 'tomatoes', name: language === 'sw' ? 'Nyanya' : 'Tomatoes' },
    { key: 'onions', name: language === 'sw' ? 'Kitunguu' : 'Onions' },
    { key: 'cassava', name: language === 'sw' ? 'Muhogo' : 'Cassava' }
  ];

  useEffect(() => {
    fetchMarketData();
  }, [selectedCrop, language]);

  const fetchMarketData = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Check if we're in demo mode (no backend)
      if (window.location.hostname !== 'localhost') {
        // Use demo data
        const demoData = demoMarketPrices[selectedCrop];
        setMarketData(demoData);
        setPredictions(demoData.predictions);
        setInsights(demoData.insights);
        setIsLoading(false);
        return;
      }
      
      const response = await axios.get(`/api/market/prices/${selectedCrop}`, {
        params: { language }
      });
      
      setMarketData(response.data.data);
      
      // Also fetch predictions
      const predResponse = await axios.get(`/api/market/predictions/${selectedCrop}`, {
        params: { weeks: 4, language }
      });
      
      setPredictions(predResponse.data.data);
      
      // Fetch insights
      const insightsResponse = await axios.get('/api/market/insights', {
        params: { crop: selectedCrop, language }
      });
      
      setInsights(insightsResponse.data.data);
      
    } catch (err) {
      setError(t.error + ': ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'falling':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'rising':
        return 'text-green-600 bg-green-100';
      case 'falling':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getVolatilityColor = (volatility) => {
    if (volatility > 0.2) return 'text-red-600 bg-red-100';
    if (volatility > 0.15) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getVolatilityText = (volatility) => {
    if (volatility > 0.2) return t.highVolatility;
    if (volatility > 0.15) return t.moderateVolatility;
    return t.lowVolatility;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0
    }).format(price);
  };

  const renderCurrentPrices = () => {
    if (!marketData) return null;

    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.minPrice}</p>
                <p className="text-xl font-bold text-gray-900">{formatPrice(marketData.summary.minPrice)}</p>
              </div>
              <ArrowDown className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.maxPrice}</p>
                <p className="text-xl font-bold text-gray-900">{formatPrice(marketData.summary.maxPrice)}</p>
              </div>
              <ArrowUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.averagePrice}</p>
                <p className="text-xl font-bold text-gray-900">{formatPrice(marketData.summary.avgPrice)}</p>
              </div>
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.trend}</p>
                <p className="text-xl font-bold text-gray-900">{t[marketData.summary.trend]}</p>
              </div>
              {getTrendIcon(marketData.summary.trend)}
            </div>
          </div>
        </div>

        {/* Market Prices Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.currentPrices}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.market}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.currentPrice}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.priceRange}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.volume}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t.trend}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(marketData.markets).map(([marketKey, marketInfo]) => (
                  <tr key={marketKey} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {marketInfo.market.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {marketInfo.market.importance}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {formatPrice(marketInfo.currentPrice)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {marketData.crop.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-900">
                        {formatPrice(marketInfo.priceRange.min)} - {formatPrice(marketInfo.priceRange.max)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {marketInfo.volume.toLocaleString()} {marketData.crop.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrendColor('stable')}`}>
                        {getTrendIcon('stable')}
                        <span className="ml-1">{t.stable}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPredictions = () => {
    if (!predictions) return null;

    return (
      <div className="space-y-6">
        {/* Prediction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.trend}</p>
                <p className="text-xl font-bold text-gray-900">{t[predictions.summary.trend]}</p>
              </div>
              {getTrendIcon(predictions.summary.trend)}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.volatility}</p>
                <p className="text-xl font-bold text-gray-900">{getVolatilityText(predictions.summary.volatility)}</p>
              </div>
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.confidence}</p>
                <p className="text-xl font-bold text-gray-900">{Math.round(predictions.summary.confidence)}%</p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        {/* Predictions Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.pricePredictions}</h3>
          <div className="space-y-4">
            {predictions.predictions.map((prediction, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      Week {prediction.week} - {new Date(prediction.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(prediction.trend)}`}>
                    {getTrendIcon(prediction.trend)}
                    <span className="ml-1">{t[prediction.trend]}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">{t.predictedPrice}</p>
                    <p className="text-sm font-bold text-gray-900">{formatPrice(prediction.predictedPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.minPrice}</p>
                    <p className="text-sm font-medium text-gray-900">{formatPrice(prediction.minPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.maxPrice}</p>
                    <p className="text-sm font-medium text-gray-900">{formatPrice(prediction.maxPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.confidence}</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${prediction.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-900">{prediction.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderInsights = () => {
    if (!insights) return null;

    return (
      <div className="space-y-6">
        {/* Market Insights */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            {t.insights}
          </h3>
          <div className="space-y-3">
            {(insights.insights || []).map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            {t.recommendations}
          </h3>
          <div className="space-y-3">
            {(insights.recommendations || []).map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.selectCrop}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {crops.map(crop => (
                <option key={crop.key} value={crop.key}>
                  {crop.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={() => setViewMode('current')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'current'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t.viewCurrent}
            </button>
            <button
              onClick={() => setViewMode('predictions')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'predictions'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t.viewPredictions}
            </button>
            <button
              onClick={() => setViewMode('insights')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                viewMode === 'insights'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t.insights}
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchMarketData}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t.getting : t.getPrices}
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t.getting}</p>
        </div>
      ) : (
        <>
          {viewMode === 'current' && renderCurrentPrices()}
          {viewMode === 'predictions' && renderPredictions()}
          {viewMode === 'insights' && renderInsights()}
        </>
      )}

      {/* Last Updated */}
      {marketData && (
        <div className="text-center text-sm text-gray-500">
          {t.lastUpdated}: {new Date(marketData.lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default MarketPrices;
