import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  Camera, 
  Heart, 
  Cloud, 
  TrendingUp, 
  User, 
  Settings,
  LogOut,
  Bell,
  BarChart3,
  Calendar,
  MapPin,
  Droplets,
  Sun,
  Wind,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();

  // Debug: Log user data to console
  React.useEffect(() => {
    console.log('Dashboard - User data:', user);
  }, [user]);

  const translations = {
    en: {
      welcome: 'Welcome back',
      dashboard: 'Dashboard',
      quickActions: 'Quick Actions',
      recentActivity: 'Recent Activity',
      weatherInfo: 'Weather Information',
      farmOverview: 'Farm Overview',
      cropHealth: 'Crop Health',
      recommendations: 'Recommendations',
      marketPrices: 'Market Prices',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      location: 'Location',
      farmSize: 'Farm Size',
      primaryCrops: 'Primary Crops',
      temperature: 'Temperature',
      humidity: 'Humidity',
      rainfall: 'Rainfall',
      windSpeed: 'Wind Speed',
      today: 'Today',
      goodConditions: 'Good conditions for field work',
      moderateConditions: 'Moderate conditions',
      poorConditions: 'Poor conditions',
      diagnoseNow: 'Diagnose Crop',
      getAdvice: 'Get Farming Advice',
      checkWeather: 'Check Weather',
      viewRecommendations: 'View Recommendations',
      checkMarketPrices: 'Check Market Prices',
      lastDiagnosis: 'Last diagnosis',
      lastAdvice: 'Last advice sought',
      noActivity: 'No recent activity'
    },
    sw: {
      welcome: 'Karibu tena',
      dashboard: 'Dashibodi',
      quickActions: 'Hatua za Haraka',
      recentActivity: 'Shughuli za Karibuni',
      weatherInfo: 'Maelezo ya Hali ya Hewa',
      farmOverview: 'Muhtasari wa Shamba',
      cropHealth: 'Afya ya Mazao',
      recommendations: 'Mapendekezo',
      marketPrices: 'Bei za Soko',
      profile: 'Wasifu',
      settings: 'Mipangilio',
      logout: 'Toka',
      location: 'Eneo',
      farmSize: 'Ukubwa wa Shamba',
      primaryCrops: 'Mazao Makuu',
      temperature: 'Joto',
      humidity: 'Unyevu',
      rainfall: 'Mvua',
      windSpeed: 'Kasi ya Upepo',
      today: 'Leo',
      goodConditions: 'Hali nzuri kwa kazi shambani',
      moderateConditions: 'Hali wastani',
      poorConditions: 'Hali mbaya',
      diagnoseNow: 'Tambua Mmea',
      getAdvice: 'Pata Ushauri wa Kilimo',
      checkWeather: 'Angalia Hali ya Hewa',
      viewRecommendations: 'Ona Mapendekezo',
      checkMarketPrices: 'Angalia Bei za Soko',
      lastDiagnosis: 'Utambuzi wa mwisho',
      lastAdvice: 'Ushauri wa mwisho',
      noActivity: 'Hakuna shughuli za karibuni'
    }
  };

  const t = translations[language];

  // Simulated weather data
  const weatherData = {
    temperature: 24,
    humidity: 65,
    rainfall: 2.5,
    windSpeed: 12,
    condition: 'good'
  };

  // Simulated recent activity
  const recentActivity = [
    {
      type: 'diagnosis',
      date: '2024-01-15',
      description: language === 'en' ? 'Diagnosed maize leaf blight' : 'Tambua ugonjwa wa majani ya mahindi'
    },
    {
      type: 'advisory',
      date: '2024-01-12',
      description: language === 'en' ? 'Got advice for tomato planting' : 'Pata ushauri wa upandaji wa nyanya'
    }
  ];

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'good':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'moderate':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'poor':
        return <Droplets className="w-6 h-6 text-blue-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getWeatherText = (condition) => {
    switch (condition) {
      case 'good':
        return t.goodConditions;
      case 'moderate':
        return t.moderateConditions;
      case 'poor':
        return t.poorConditions;
      default:
        return t.goodConditions;
    }
  };

  const getWeatherColor = (condition) => {
    switch (condition) {
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-green-600 bg-green-100';
    }
  };

  const quickActions = [
    {
      icon: Camera,
      label: t.diagnoseNow,
      path: '/diagnosis',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      label: t.getAdvice,
      path: '/advisory',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Cloud,
      label: t.checkWeather,
      path: '/weather',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Sprout,
      label: t.viewRecommendations,
      path: '/recommendations',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: DollarSign,
      label: t.checkMarketPrices,
      path: '/market-prices',
      color: 'from-yellow-500 to-amber-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                <Sprout className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Shambasmart</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t.welcome}, {user?.name}!
          </h2>
          <p className="text-gray-600">
            {language === 'en' 
              ? 'Here\'s what\'s happening on your farm today' 
              : 'Hii inayoendelea shambani mwako leo'
            }
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.path}
                  className={`group relative overflow-hidden bg-gradient-to-r ${action.color} rounded-xl p-6 text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="relative z-10">
                    <Icon className="w-8 h-8 mb-3" />
                    <h4 className="font-semibold">{action.label}</h4>
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Farm Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{t.weatherInfo}</h3>
                {getWeatherIcon(weatherData.condition)}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Sun className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{weatherData.temperature}°C</p>
                  <p className="text-xs text-gray-500">{t.temperature}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Droplets className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{weatherData.humidity}%</p>
                  <p className="text-xs text-gray-500">{t.humidity}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Cloud className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{weatherData.rainfall}mm</p>
                  <p className="text-xs text-gray-500">{t.rainfall}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Wind className="w-6 h-6 text-teal-500" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{weatherData.windSpeed}km/h</p>
                  <p className="text-xs text-gray-500">{t.windSpeed}</p>
                </div>
              </div>
              
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getWeatherColor(weatherData.condition)}`}>
                {getWeatherText(weatherData.condition)}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.recentActivity}</h3>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        {activity.type === 'diagnosis' ? (
                          <Camera className="w-4 h-4 text-green-600" />
                        ) : (
                          <Heart className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">{t.noActivity}</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Farm Profile */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.farmOverview}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{t.location}:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user?.location ? (user.location.charAt(0).toUpperCase() + user.location.slice(1).replace('_', ' ')) : 'Not set'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{t.farmSize}:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user?.farmSize ? (user.farmSize.charAt(0).toUpperCase() + user.farmSize.slice(1)) : 'Not set'}
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <Sprout className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-sm text-gray-600">{t.primaryCrops}:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user?.primaryCrops && Array.isArray(user.primaryCrops) && user.primaryCrops.length > 0 ? (
                        user.primaryCrops.map((crop, index) => (
                          <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {crop.charAt(0).toUpperCase() + crop.slice(1)}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">Not set</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Role:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'Not set'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Member Since:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not set'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">{t.cropHealth}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Healthy Crops</span>
                  <span className="font-bold">85%</span>
                </div>
                <div className="w-full bg-green-400 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-5/6"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Need Attention</span>
                  <span className="font-bold">15%</span>
                </div>
                <div className="w-full bg-green-400 rounded-full h-2">
                  <div className="bg-yellow-300 rounded-full h-2 w-1/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
