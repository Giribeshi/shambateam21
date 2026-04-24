import React, { useState } from 'react';
import { Cloud, Droplets, Thermometer, Wind, AlertCircle, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import { demoWeatherData } from '../data/demoData';

const Weather = () => {
  const { language } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const translations = {
    en: {
      title: 'Weather Information',
      subtitle: 'Get weather insights and agricultural recommendations for your region',
      selectLocation: 'Select Location',
      getWeather: 'Get Weather Info',
      loading: 'Loading...',
      currentConditions: 'Current Conditions',
      forecast: '7-Day Forecast',
      agriculturalAdvice: 'Agricultural Weather Advisory',
      temperature: 'Temperature',
      humidity: 'Humidity',
      rainfall: 'Rainfall',
      windSpeed: 'Wind Speed',
      soilMoisture: 'Soil Moisture',
      description: 'Description',
      planting: 'Planting Conditions',
      irrigation: 'Irrigation Needs',
      pestDisease: 'Pest & Disease Risk',
      fieldWork: 'Field Work Suitability',
      excellent: 'Excellent',
      good: 'Good',
      moderate: 'Moderate',
      poor: 'Poor',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      recommendations: 'Specific Recommendations',
      error: 'Error',
      tryAgain: 'Try Again',
      today: 'Today',
      tomorrow: 'Tomorrow',
      chanceOfRain: 'Chance of Rain'
    },
    sw: {
      title: 'Maelezo ya Hali ya Hewa',
      subtitle: 'Pata maelezo ya hali ya hewa na mapendekezo ya kilimo kwa mkoa wako',
      selectLocation: 'Chagua Eneo',
      getWeather: 'Pata Maelezo ya Hewa',
      loading: 'Inapakia...',
      currentConditions: 'Hali ya Sasa',
      forecast: 'Ramani ya Siku 7',
      agriculturalAdvice: 'Ushauri wa Hali ya Hewa wa Kilimo',
      temperature: 'Joto',
      humidity: 'Unyevu',
      rainfall: 'Mvua',
      windSpeed: 'Kasi ya Upepo',
      soilMoisture: 'Unyevu wa Udongo',
      description: 'Maelezo',
      planting: 'Hali za Upandaji',
      irrigation: 'Mahitaji ya Umwagiliaji',
      pestDisease: 'Hatari ya Wadudu & Magonjwa',
      fieldWork: 'Uwiano wa Kazi Shambani',
      excellent: 'Bora',
      good: 'Nzuri',
      moderate: 'Wastani',
      poor: 'Mbaya',
      high: 'Juu',
      medium: 'Wastani',
      low: 'Chini',
      recommendations: 'Mapendekezo Maalum',
      error: 'Kosa',
      tryAgain: 'Jaribu Tena',
      today: 'Leo',
      tomorrow: 'Kesho',
      chanceOfRain: 'Uwezekano wa Mvua'
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

  const t = translations[language];

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    setError('');
  };

  const handleGetWeather = async () => {
    if (!selectedLocation) {
      setError(language === 'en' ? 'Please select a location' : 'Tafadhali chagua eneo');
      return;
    }

    setIsLoading(true);
    setError('');
    setWeatherData(null);

    try {
      // Check if we're in demo mode (no backend)
      if (window.location.hostname !== 'localhost') {
        // Use demo data
        const demoData = demoWeatherData[selectedLocation];
        if (demoData) {
          setWeatherData(demoData);
        } else {
          setError(language === 'en' ? 'Weather data not available for this location' : 'Data ya hali ya hewa haipatikani kwa eneo hili');
        }
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`/api/weather/${selectedLocation}`, {
        params: {
          language: language
        }
      });
      
      setWeatherData(response.data);
    } catch (err) {
      // Fallback to demo data if backend fails
      const demoData = demoWeatherData[selectedLocation];
      if (demoData) {
        setWeatherData(demoData);
      } else {
        setError(t.error + ': ' + (err.response?.data?.message || err.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedLocation('');
    setWeatherData(null);
    setError('');
  };

  const getAssessmentColor = (level) => {
    switch (level) {
      case 'excellent':
      case 'Excellent':
      case 'Bora':
        return 'text-green-600 bg-green-100';
      case 'good':
      case 'Good':
      case 'Nzuri':
        return 'text-blue-600 bg-blue-100';
      case 'moderate':
      case 'Moderate':
      case 'Wastani':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
      case 'Poor':
      case 'Mbaya':
        return 'text-red-600 bg-red-100';
      case 'high':
      case 'High':
      case 'Juu':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
      case 'Medium':
      case 'Wastani':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
      case 'Low':
      case 'Chini':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain') || desc.includes('shower')) return 'rain';
    if (desc.includes('cloud')) return 'cloud';
    if (desc.includes('sun') || desc.includes('clear')) return 'sun';
    return 'cloud';
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return t.today;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return t.tomorrow;
    } else {
      return date.toLocaleDateString(language === 'sw' ? 'sw-TZ' : 'en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-agrimind-green mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Location Selection */}
      {!weatherData && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.selectLocation}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
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

            {/* Error */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                <AlertCircle className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleGetWeather}
              disabled={isLoading || !selectedLocation}
              className="w-full bg-agrimind-green text-white py-3 px-6 rounded-md font-medium hover:bg-agrimind-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t.loading}</span>
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4" />
                  <span>{t.getWeather}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Weather Results */}
      {weatherData && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-agrimind-green" />
              <h2 className="text-2xl font-bold text-agrimind-green">
                {weatherData.location} - {t.currentConditions}
              </h2>
            </div>
            <button
              onClick={handleReset}
              className="text-gray-600 hover:text-agrimind-green transition-colors"
            >
              {t.tryAgain}
            </button>
          </div>

          {/* Current Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Thermometer className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">{t.temperature}</h3>
              <p className="text-2xl font-bold text-gray-900">{weatherData.current.temperature}°C</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Droplets className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">{t.humidity}</h3>
              <p className="text-2xl font-bold text-gray-900">{Math.round(weatherData.current.humidity)}%</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Cloud className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">{t.rainfall}</h3>
              <p className="text-2xl font-bold text-gray-900">{weatherData.current.rainfall.toFixed(1)}mm</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Wind className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">{t.windSpeed}</h3>
              <p className="text-2xl font-bold text-gray-900">{weatherData.current.wind_speed.toFixed(1)}km/h</p>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-agrimind-green mb-4">{t.forecast}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="text-center border rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {formatDate(day.date)}
                  </p>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(day.description) === 'rain' && <Droplets className="w-6 h-6 text-blue-500" />}
                    {getWeatherIcon(day.description) === 'cloud' && <Cloud className="w-6 h-6 text-gray-500" />}
                    {getWeatherIcon(day.description) === 'sun' && <Thermometer className="w-6 h-6 text-orange-500" />}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    {day.temperature.min}° - {day.temperature.max}°
                  </p>
                  <p className="text-xs text-blue-600">
                    {t.chanceOfRain}: {Math.round(day.rainfall_chance)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Agricultural Advisory */}
          {weatherData.agricultural_advice && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-agrimind-green mb-4">
                {weatherData.agricultural_advice.title}
              </h3>
              
              {/* Assessments */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {Object.entries(weatherData.agricultural_advice.assessments).map(([key, assessment]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{key}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAssessmentColor(assessment.level)}`}>
                      {assessment.level}
                    </span>
                    <p className="text-xs text-gray-600 mt-2">{assessment.reason}</p>
                  </div>
                ))}
              </div>

              {/* Specific Recommendations */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">{t.recommendations}</h4>
                <ul className="space-y-2">
                  {weatherData.agricultural_advice.specific_recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-agrimind-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
