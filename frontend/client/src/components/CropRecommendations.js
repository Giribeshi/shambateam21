import React, { useState } from 'react';
import { Sprout, Map, Droplets, TrendingUp, ArrowRight, AlertCircle, CheckCircle, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { demoCropRecommendations } from '../data/demoData';

const CropRecommendations = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    location: '',
    soilType: '',
    season: '',
    goals: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const translations = {
    en: {
      title: 'Crop Recommendations',
      subtitle: 'Discover the best crops for your specific conditions and goals',
      selectLocation: 'Select Location',
      selectSoil: 'Soil Type',
      selectSeason: 'Growing Season',
      selectGoals: 'Farming Goals',
      getRecommendations: 'Get Recommendations',
      getting: 'Analyzing...',
      results: 'Recommended Crops',
      suitability: 'Suitability',
      excellent: 'Excellent',
      good: 'Good',
      moderate: 'Moderate',
      poor: 'Poor',
      details: 'Crop Details',
      growingSeason: 'Growing Season',
      rainfall: 'Rainfall Required',
      temperature: 'Temperature Range',
      maturity: 'Maturity Period',
      market: 'Market Demand',
      challenges: 'Common Challenges',
      varieties: 'Local Varieties',
      score: 'Compatibility Score',
      climate: 'Climate',
      soil: 'Soil',
      season: 'Season',
      market: 'Market',
      goals: 'Goals',
      explanation: 'How we rank crops',
      error: 'Error',
      tryAgain: 'Try Again'
    },
    sw: {
      title: 'Mapendekezo ya Mazao',
      subtitle: 'Gundua mazao bora kwa hali zako na malengo maalum',
      selectLocation: 'Chagua Eneo',
      selectSoil: 'Aina ya Udongo',
      selectSeason: 'Msimu wa Ukuaji',
      selectGoals: 'Malengo ya Kilimo',
      getRecommendations: 'Pata Mapendekezo',
      getting: 'Inachambua...',
      results: 'Mazao Yanayopendekezwa',
      suitability: 'Uwiano',
      excellent: 'Bora',
      good: 'Nzuri',
      moderate: 'Wastani',
      poor: 'Mbaya',
      details: 'Maelezo ya Mazao',
      growingSeason: 'Msimu wa Ukuaji',
      rainfall: 'Mvua Inayohitajika',
      temperature: 'Halijoto ya Kuhitajika',
      maturity: 'Kipindi cha Ukuaji',
      market: 'Mahitaji ya Soko',
      challenges: 'Changamoto za Kawaida',
      varieties: 'Aina za Ndani',
      score: 'Alama ya Uwiano',
      climate: 'Hali ya Hewa',
      soil: 'Udongo',
      season: 'Msimu',
      market: 'Soko',
      goals: 'Malengo',
      explanation: 'Jinsi tunavyoranking mazao',
      error: 'Kosa',
      tryAgain: 'Jaribu Tena'
    }
  };

  const locationOptions = {
    en: [
      { value: 'arusha', label: 'Arusha' },
      { value: 'dar_es_salaam', label: 'Dar es Salaam' },
      { value: 'dodoma', label: 'Dodoma' },
      { value: 'iringa', label: 'Iringa' },
      { value: 'kilimanjaro', label: 'Kilimanjaro' },
      { value: 'mbeya', label: 'Mbeya' },
      { value: 'morogoro', label: 'Morogoro' },
      { value: 'mwanza', label: 'Mwanza' },
      { value: 'tanga', label: 'Tanga' },
      { value: 'zanzibar', label: 'Zanzibar' }
    ],
    sw: [
      { value: 'arusha', label: 'Arusha' },
      { value: 'dar_es_salaam', label: 'Dar es Salaam' },
      { value: 'dodoma', label: 'Dodoma' },
      { value: 'iringa', label: 'Iringa' },
      { value: 'kilimanjaro', label: 'Kilimanjaro' },
      { value: 'mbeya', label: 'Mbeya' },
      { value: 'morogoro', label: 'Morogoro' },
      { value: 'mwanza', label: 'Mwanza' },
      { value: 'tanga', label: 'Tanga' },
      { value: 'zanzibar', label: 'Zanzibar' }
    ]
  };

  const soilOptions = {
    en: [
      { value: 'loamy', label: 'Loamy' },
      { value: 'sandy', label: 'Sandy' },
      { value: 'clay', label: 'Clay' },
      { value: 'sandy_loam', label: 'Sandy Loam' },
      { value: 'clay_loam', label: 'Clay Loam' }
    ],
    sw: [
      { value: 'loamy', label: 'Loamy' },
      { value: 'sandy', label: 'Mchanga' },
      { value: 'clay', label: 'Clay' },
      { value: 'sandy_loam', label: 'Sandy Loam' },
      { value: 'clay_loam', label: 'Clay Loam' }
    ]
  };

  const seasonOptions = {
    en: [
      { value: 'long_rains', label: 'Long Rains (Mar-May)' },
      { value: 'short_rains', label: 'Short Rains (Oct-Dec)' },
      { value: 'dry_season', label: 'Dry Season (Jun-Sep)' },
      { value: 'year_round', label: 'Year Round (with irrigation)' }
    ],
    sw: [
      { value: 'long_rains', label: 'Mvua Ndefu (Mei-Machi)' },
      { value: 'short_rains', label: 'Mvua Fupi (Okt-Des)' },
      { value: 'dry_season', label: 'Msimu wa Ukame (Jun-Sep)' },
      { value: 'year_round', label: 'Mwaka Mzima (kwa umwagiliaji)' }
    ]
  };

  const goalsOptions = {
    en: [
      { value: 'profit', label: 'High Profit' },
      { value: 'food_security', label: 'Food Security' },
      { value: 'low_maintenance', label: 'Low Maintenance' },
      { value: 'drought_resistant', label: 'Drought Resistant' },
      { value: 'quick_return', label: 'Quick Return' },
      { value: 'easy_storage', label: 'Easy Storage' }
    ],
    sw: [
      { value: 'profit', label: 'Faida Kuu' },
      { value: 'food_security', label: 'Usalama wa Chakula' },
      { value: 'low_maintenance', label: 'Matunzo Machache' },
      { value: 'drought_resistant', label: 'Kustahimili Ukame' },
      { value: 'quick_return', label: 'Rudi Haraka' },
      { value: 'easy_storage', label: 'Hifadhi Rahisi' }
    ]
  };

  const t = translations[language];

  const handleInputChange = (field, value) => {
    if (field === 'goals') {
      setFormData(prev => ({
        ...prev,
        goals: prev.goals.includes(value)
          ? prev.goals.filter(g => g !== value)
          : [...prev.goals, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.location || !formData.soilType || !formData.season) {
      setError(language === 'en' ? 'Please fill in all required fields' : 'Tafadhali jaza sehemu zote zinazohitajika');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // Check if we're in demo mode (no backend)
      if (window.location.hostname !== 'localhost') {
        // Use demo data - find matching recommendations
        const demoData = demoCropRecommendations[formData.location];
        
        if (demoData) {
          setResult(demoData);
        } else {
          // Fallback to general recommendations
          setResult({
            location: formData.location,
            recommendations: [
              {
                crop: 'Maize',
                swahiliName: 'Mahindi',
                suitability: 85,
                reasons: ['Well-suited to local conditions', 'Good market demand'],
                expectedYield: '3-5 tons/ha',
                profitability: 'Medium',
                marketDemand: 'High',
                growingSeason: '4-5 months',
                requirements: {
                  rainfall: '600-900mm',
                  temperature: '18-30°C',
                  soil: 'Well-drained soil',
                  ph: '5.5-7.0'
                },
                risks: ['Weather dependency', 'Pest pressure'],
                opportunities: ['Food security', 'Market stability']
              },
              {
                crop: 'Beans',
                swahiliName: 'Maharage',
                suitability: 78,
                reasons: ['Soil improvement', 'Short growing period'],
                expectedYield: '1-2 tons/ha',
                profitability: 'Medium',
                marketDemand: 'High',
                growingSeason: '2-3 months',
                requirements: {
                  rainfall: '400-600mm',
                  temperature: '15-25°C',
                  soil: 'Well-drained soil',
                  ph: '6.0-7.0'
                },
                risks: ['Disease susceptibility', 'Price fluctuation'],
                opportunities: ['Nutritional value', 'Export potential']
              }
            ],
            overall: {
              bestChoice: 'Maize',
              diversification: 'Maize + Beans',
              marketStrategy: 'Focus on local markets',
              riskManagement: 'Diversify crops'
            }
          });
        }
        setIsLoading(false);
        return;
      }

      const response = await axios.post('/api/recommend-crops', {
        ...formData,
        language: language
      });

      setResult(response.data);
    } catch (err) {
      // Fallback to demo data if backend fails
      const demoData = demoCropRecommendations[formData.location];
      
      if (demoData) {
        setResult(demoData);
      } else {
        setError(t.error + ': ' + (err.response?.data?.message || err.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      location: '',
      soilType: '',
      season: '',
      goals: []
    });
    setResult(null);
    setError('');
  };

  const getSuitabilityColor = (suitability) => {
    switch (suitability) {
      case 'Excellent':
      case 'Bora':
        return 'text-green-600 bg-green-100';
      case 'Good':
      case 'Nzuri':
        return 'text-blue-600 bg-blue-100';
      case 'Moderate':
      case 'Wastani':
        return 'text-yellow-600 bg-yellow-100';
      case 'Poor':
      case 'Mbaya':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-agrimind-green mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Input Form */}
      {!result && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.selectLocation} *
              </label>
              <select
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agrimind-light focus:border-transparent"
              >
                <option value="">{language === 'en' ? 'Select location' : 'Chagua eneo'}</option>
                {locationOptions[language].map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.selectSoil} *
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => handleInputChange('soilType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agrimind-light focus:border-transparent"
              >
                <option value="">{language === 'en' ? 'Select soil type' : 'Chagua aina ya udongo'}</option>
                {soilOptions[language].map(soil => (
                  <option key={soil.value} value={soil.value}>
                    {soil.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Season */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.selectSeason} *
              </label>
              <select
                value={formData.season}
                onChange={(e) => handleInputChange('season', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agrimind-light focus:border-transparent"
              >
                <option value="">{language === 'en' ? 'Select season' : 'Chagua msimu'}</option>
                {seasonOptions[language].map(season => (
                  <option key={season.value} value={season.value}>
                    {season.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.selectGoals}
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {goalsOptions[language].map(goal => (
                  <label key={goal.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={goal.value}
                      checked={formData.goals.includes(goal.value)}
                      onChange={(e) => handleInputChange('goals', goal.value)}
                      className="rounded border-gray-300 text-agrimind-green focus:ring-agrimind-light"
                    />
                    <span className="text-sm text-gray-700">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-agrimind-green text-white py-3 px-6 rounded-md font-medium hover:bg-agrimind-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{t.getting}</span>
              </>
            ) : (
              <>
                <span>{t.getRecommendations}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-agrimind-green">{t.results}</h2>
            <button
              onClick={handleReset}
              className="text-gray-600 hover:text-agrimind-green transition-colors"
            >
              {t.tryAgain}
            </button>
          </div>

          {/* Explanation */}
          {result.explanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">{t.explanation}</h3>
              <p className="text-blue-800 text-sm mb-3">{result.explanation.summary}</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                {Object.entries(result.explanation.criteria).map(([key, value]) => (
                  <div key={key} className="text-blue-700">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Crops */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.recommendations.map((crop, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-agrimind-green">{crop.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSuitabilityColor(crop.suitability)}`}>
                    {crop.suitability}
                  </span>
                </div>

                {/* Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{t.score}</span>
                    <span className={`text-sm font-bold ${getScoreColor(crop.score.total)}`}>
                      {crop.score.total}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-agrimind-green h-2 rounded-full transition-all duration-500"
                      style={{ width: `${crop.score.total}%` }}
                    ></div>
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.climate}:</span>
                    <span className="font-medium">{Math.round(crop.score.climate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.soil}:</span>
                    <span className="font-medium">{Math.round(crop.score.soil)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.season}:</span>
                    <span className="font-medium">{Math.round(crop.score.season)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.market}:</span>
                    <span className="font-medium">{Math.round(crop.score.market)}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 border-t pt-4">
                  {Object.entries(crop.details).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="text-gray-600 ml-1">
                        {Array.isArray(value) ? value.slice(0, 2).join(', ') : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropRecommendations;
