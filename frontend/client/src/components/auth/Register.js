import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone, Sprout, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    phone: '',
    farmSize: '',
    primaryCrops: []
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'Create Account',
      subtitle: 'Join Shambasmart and transform your farming',
      name: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      location: 'Location',
      phone: 'Phone Number',
      farmSize: 'Farm Size',
      primaryCrops: 'Primary Crops',
      signUp: 'Create Account',
      hasAccount: 'Already have an account?',
      signIn: 'Sign In',
      namePlaceholder: 'Enter your full name',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Create a password',
      confirmPasswordPlaceholder: 'Confirm your password',
      phonePlaceholder: 'Enter phone number',
      success: 'Account created successfully!',
      error: 'Registration failed',
      passwordMismatch: 'Passwords do not match',
      selectCrops: 'Select your primary crops',
      farmSizes: {
        '': 'Select farm size',
        'small': 'Small (1-5 acres)',
        'medium': 'Medium (5-20 acres)',
        'large': 'Large (20+ acres)'
      },
      locations: {
        '': 'Select location',
        'arusha': 'Arusha',
        'dar_es_salaam': 'Dar es Salaam',
        'dodoma': 'Dodoma',
        'iringa': 'Iringa',
        'kilimanjaro': 'Kilimanjaro',
        'mbeya': 'Mbeya',
        'morogoro': 'Morogoro',
        'mwanza': 'Mwanza',
        'tanga': 'Tanga',
        'zanzibar': 'Zanzibar'
      },
      crops: {
        'maize': 'Maize',
        'tomatoes': 'Tomatoes',
        'beans': 'Beans',
        'cassava': 'Cassava',
        'rice': 'Rice',
        'onions': 'Onions',
        'sorghum': 'Sorghum',
        'millet': 'Millet'
      }
    },
    sw: {
      title: 'Tengeneza Akaunti',
      subtitle: 'Jiunge na Shambasmart na kubadilisha kilimo chako',
      name: 'Jina Kamili',
      email: 'Anwani ya Barua Pepe',
      password: 'Neno la Siri',
      confirmPassword: 'Thibitisha Neno la Siri',
      location: 'Eneo',
      phone: 'Namba ya Simu',
      farmSize: 'Ukubwa wa Shamba',
      primaryCrops: 'Mazao Makuu',
      signUp: 'Tengeneza Akaunti',
      hasAccount: 'Tayari una akaunti?',
      signIn: 'Ingia',
      namePlaceholder: 'Weka jina lako kamili',
      emailPlaceholder: 'Weka barua pepe yako',
      passwordPlaceholder: 'Weka neno la siri',
      confirmPasswordPlaceholder: 'Thibitisha neno la siri',
      phonePlaceholder: 'Weka namba ya simu',
      success: 'Akaunti imeundwa kwa mafanikio!',
      error: 'Imeshindwa kujisajili',
      passwordMismatch: 'Maneno ya siri hayafanani',
      selectCrops: 'Chagua mazao yako makuu',
      farmSizes: {
        '': 'Chagua ukubwa wa shamba',
        'small': 'Ndogo (ekari 1-5)',
        'medium': 'Wastani (ekari 5-20)',
        'large': 'Kubwa (ekari 20+)'
      },
      locations: {
        '': 'Chagua eneo',
        'arusha': 'Arusha',
        'dar_es_salaam': 'Dar es Salaam',
        'dodoma': 'Dodoma',
        'iringa': 'Iringa',
        'kilimanjaro': 'Kilimanjaro',
        'mbeya': 'Mbeya',
        'morogoro': 'Morogoro',
        'mwanza': 'Mwanza',
        'tanga': 'Tanga',
        'zanzibar': 'Zanzibar'
      },
      crops: {
        'maize': 'Mahindi',
        'tomatoes': 'Nyanya',
        'beans': 'Maharage',
        'cassava': 'Muhogo',
        'rice': 'Mchele',
        'onions': 'Kitunguu',
        'sorghum': 'Mawele',
        'millet': 'Uwele'
      }
    }
  };

  const t = translations[language];

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) clearError();
  };

  const handleCropToggle = (crop) => {
    setFormData(prev => ({
      ...prev,
      primaryCrops: prev.primaryCrops.includes(crop)
        ? prev.primaryCrops.filter(c => c !== crop)
        : [...prev.primaryCrops, crop]
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return t.passwordMismatch;
    }
    if (formData.password.length < 6) {
      return language === 'en' ? 'Password must be at least 6 characters' : 'Neno la siri lazima liwe na herufi 6 au zaidi';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      return;
    }

    setIsSubmitting(true);

    const { confirmPassword, ...userData } = formData;
    const result = await register(userData);
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Modern Register Card */}
        <div className="card-glass p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 float-animation">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
            <p className="text-white/80">{t.subtitle}</p>
          </div>

        {/* Modern Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t.name}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-glass w-full pl-10"
                    placeholder={t.namePlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t.email}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-glass w-full pl-10"
                    placeholder={t.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-glass w-full pl-10 pr-10"
                    placeholder={t.passwordPlaceholder}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-white/60 hover:text-white/80" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/60 hover:text-white/80" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  {t.confirmPassword}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-glass w-full pl-10 pr-10"
                    placeholder={t.confirmPasswordPlaceholder}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-white/60 hover:text-white/80" />
                    ) : (
                      <Eye className="h-5 w-5 text-white/60 hover:text-white/80" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.location}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 appearance-none"
                  >
                    {Object.entries(t.locations).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Farm Size Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.farmSize}
                </label>
                <select
                  name="farmSize"
                  value={formData.farmSize}
                  onChange={handleChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  {Object.entries(t.farmSizes).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Primary Crops Field */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.primaryCrops}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(t.crops).map(([value, label]) => (
                    <label
                      key={value}
                      className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-green-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.primaryCrops.includes(value)}
                        onChange={() => handleCropToggle(value)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Password Validation */}
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{t.passwordMismatch}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || formData.password !== formData.confirmPassword}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{language === 'en' ? 'Creating account...' : 'Inatengeneza akaunti...'}</span>
                </>
              ) : (
                <span>{t.signUp}</span>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t.hasAccount}{' '}
              <Link 
                to="/login" 
                className="font-medium text-green-600 hover:text-green-700 transition-colors"
              >
                {t.signIn}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
