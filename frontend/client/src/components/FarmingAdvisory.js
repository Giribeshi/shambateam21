import React, { useState } from 'react';
import { Heart, Droplets, Bug, Leaf, ArrowRight, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { demoFarmingAdvice } from '../data/demoData';

const FarmingAdvisory = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    crop: '',
    stage: '',
    location: '',
    issue: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const translations = {
    en: {
      title: 'Farming Advisory',
      subtitle: 'Get personalized farming advice based on your crop and conditions',
      selectCrop: 'Select Crop',
      selectStage: 'Growth Stage',
      selectLocation: 'Select Location',
      selectIssue: 'Specific Issue (Optional)',
      getAdvice: 'Get Advice',
      getting: 'Getting Advice...',
      results: 'Farming Advice',
      cropAdvice: 'Crop-Specific Advice',
      regionalAdvice: 'Regional Considerations',
      seasonalAdvice: 'Seasonal Guidance',
      issueAdvice: 'Issue-Specific Solutions',
      recommendations: 'Recommendations',
      timing: 'Timing',
      method: 'Method',
      tips: 'Important Tips',
      water: 'Water Management',
      fertilizer: 'Fertilizer',
      pests: 'Pest Control',
      solutions: 'Solutions',
      prevention: 'Prevention',
      problem: 'Problem',
      actions: 'Actions',
      error: 'Error',
      tryAgain: 'Try Again',
      optional: 'Optional'
    },
    sw: {
      title: 'Ushauri wa Kilimo',
      subtitle: 'Pata ushauri wa kibinafsi wa kilimo kulingana na mmea wako na hali',
      selectCrop: 'Chagua Mmea',
      selectStage: 'Hatua ya Ukuaji',
      selectLocation: 'Chagua Eneo',
      selectIssue: 'Tatizo Maalum (Hiari)',
      getAdvice: 'Pata Ushauri',
      getting: 'Inapata Ushauri...',
      results: 'Ushauri wa Kilimo',
      cropAdvice: 'Ushauri wa Mmea Maalum',
      regionalAdvice: 'Mazingira ya Kanda',
      seasonalAdvice: 'Uongozi wa Msimu',
      issueAdvice: 'Suluhisho za Tatizo Maalum',
      recommendations: 'Mapendekezo',
      timing: 'Wakati',
      method: 'Njia',
      tips: 'Mashauri Muhimu',
      water: 'Usimamaji wa Maji',
      fertilizer: 'Mbolea',
      pests: 'Kudhibiti Wadudu',
      solutions: 'Machaguo',
      prevention: 'Kuzuia',
      problem: 'Tatizo',
      actions: 'Hatua',
      error: 'Kosa',
      tryAgain: 'Jaribu Tena',
      optional: 'Hiari'
    }
  };

  const cropOptions = {
    en: [
      { value: 'maize', label: 'Maize' },
      { value: 'tomatoes', label: 'Tomatoes' },
      { value: 'beans', label: 'Beans' },
      { value: 'cassava', label: 'Cassava' },
      { value: 'rice', label: 'Rice' },
      { value: 'onions', label: 'Onions' },
      { value: 'sorghum', label: 'Sorghum' },
      { value: 'millet', label: 'Millet' }
    ],
    sw: [
      { value: 'maize', label: 'Mahindi' },
      { value: 'tomatoes', label: 'Nyanya' },
      { value: 'beans', label: 'Maharage' },
      { value: 'cassava', label: 'Muhogo' },
      { value: 'rice', label: 'Mchele' },
      { value: 'onions', label: 'Kitunguu' },
      { value: 'sorghum', label: 'Mawele' },
      { value: 'millet', label: 'Uwele' }
    ]
  };

  const stageOptions = {
    en: [
      { value: 'planting', label: 'Planting' },
      { value: 'growing', label: 'Growing' },
      { value: 'harvesting', label: 'Harvesting' }
    ],
    sw: [
      { value: 'planting', label: 'Upandaji' },
      { value: 'growing', label: 'Ukuaji' },
      { value: 'harvesting', label: 'Uvunaji' }
    ]
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

  const issueOptions = {
    en: [
      { value: '', label: 'None' },
      { value: 'pests', label: 'Pest Problems' },
      { value: 'diseases', label: 'Disease Issues' },
      { value: 'water', label: 'Water Management' },
      { value: 'nutrients', label: 'Nutrient Issues' }
    ],
    sw: [
      { value: '', label: 'Hakuna' },
      { value: 'pests', label: 'Matatizo ya Wadudu' },
      { value: 'diseases', label: 'Matatizo ya Magonjwa' },
      { value: 'water', label: 'Usimamaji wa Maji' },
      { value: 'nutrients', label: 'Matatizo ya Lishe' }
    ]
  };

  const t = translations[language];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleSubmit = async () => {
    if (!formData.crop || !formData.stage || !formData.location) {
      setError(language === 'en' ? 'Please fill in all required fields' : 'Tafadhali jaza sehemu zote zinazohitajika');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      // Check if we're in demo mode (no backend)
      if (window.location.hostname !== 'localhost') {
        // Use demo data - find matching advice
        const key = `${formData.crop}_${formData.stage}`;
        const demoData = demoFarmingAdvice[key];
        
        if (demoData) {
          setResult(demoData);
        } else {
          // Fallback to general advice
          setResult({
            crop: formData.crop,
            stage: formData.stage,
            location: formData.location,
            issue: formData.issue,
            advice: {
              problem: `General advice for ${formData.crop} at ${formData.stage} stage`,
              causes: ['Various factors may affect your crop'],
              recommendations: [
                'Monitor your crops regularly',
                'Maintain proper irrigation',
                'Use appropriate fertilizers',
                'Watch for pests and diseases'
              ],
              timeline: {
                immediate: 'Assess current crop condition',
                short: 'Apply necessary treatments',
                medium: 'Monitor growth and development',
                long: 'Plan for next growing season'
              },
              expectedYield: 'Depends on management practices',
              costs: 'Variable based on input requirements',
              market: 'Check local market conditions'
            }
          });
        }
        setIsLoading(false);
        return;
      }

      const response = await axios.post('/api/advisory', {
        ...formData,
        language: language
      });

      setResult(response.data);
    } catch (err) {
      // Fallback to demo data if backend fails
      const key = `${formData.crop}_${formData.stage}`;
      const demoData = demoFarmingAdvice[key];
      
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
      crop: '',
      stage: '',
      location: '',
      issue: ''
    });
    setResult(null);
    setError('');
  };

  const getIssueIcon = (issue) => {
    switch (issue) {
      case 'pests':
        return Bug;
      case 'diseases':
        return AlertCircle;
      case 'water':
        return Droplets;
      case 'nutrients':
        return Leaf;
      default:
        return Heart;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-agrimind-green mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Input Form */}
      {!result && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Crop Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.selectCrop} *
              </label>
              <select
                value={formData.crop}
                onChange={(e) => handleInputChange('crop', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agrimind-light focus:border-transparent"
              >
                <option value="">{language === 'en' ? 'Select a crop' : 'Chagua mmea'}</option>
                {cropOptions[language].map(crop => (
                  <option key={crop.value} value={crop.value}>
                    {crop.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.selectStage} *
              </label>
              <select
                value={formData.stage}
                onChange={(e) => handleInputChange('stage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agrimind-light focus:border-transparent"
              >
                <option value="">{language === 'en' ? 'Select growth stage' : 'Chagua hatua ya ukuaji'}</option>
                {stageOptions[language].map(stage => (
                  <option key={stage.value} value={stage.value}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Selection */}
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

            {/* Issue Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.selectIssue} ({t.optional})
              </label>
              <select
                value={formData.issue}
                onChange={(e) => handleInputChange('issue', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-agrimind-light focus:border-transparent"
              >
                {issueOptions[language].map(issue => (
                  <option key={issue.value} value={issue.value}>
                    {issue.label}
                  </option>
                ))}
              </select>
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
                <span>{t.getAdvice}</span>
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

          {/* Crop-Specific Advice */}
          {result.cropAdvice && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-agrimind-green mb-4">{t.cropAdvice}</h3>
              <div className="space-y-4">
                {Object.entries(result.cropAdvice).map(([key, value]) => (
                  <div key={key} className="border-l-4 border-agrimind-accent pl-4">
                    <h4 className="font-medium text-gray-900 capitalize">{key}</h4>
                    <p className="text-gray-700 text-sm mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regional Advice */}
          {result.regionalAdvice && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-agrimind-green mb-4">{t.regionalAdvice}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Climate & Conditions</h4>
                  <p className="text-gray-700 text-sm mt-1">{result.regionalAdvice.climate}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Best Crops</h4>
                  <p className="text-gray-700 text-sm mt-1">{result.regionalAdvice.best_crops?.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Special Considerations</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                    {result.regionalAdvice.special_considerations?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Seasonal Advice */}
          {result.seasonalAdvice && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-agrimind-green mb-4">{t.seasonalAdvice}</h3>
              <div className="space-y-3">
                <p className="text-gray-700">{result.seasonalAdvice.advice}</p>
                <div>
                  <h4 className="font-medium text-gray-900">Recommended Actions:</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                    {result.seasonalAdvice.actions?.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Issue-Specific Advice */}
          {result.issueAdvice && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-agrimind-green mb-4">
                {result.issueAdvice.problem}
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{t.solutions}</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                    {result.issueAdvice.solutions?.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{t.prevention}</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                    {result.issueAdvice.prevention?.map((prevention, index) => (
                      <li key={index}>{prevention}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FarmingAdvisory;
