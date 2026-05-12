import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone, Sprout, AlertCircle, Ruler } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AuthLayout from './AuthLayout';

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

  const passwordsMatch = !formData.confirmPassword || formData.password === formData.confirmPassword;

  return (
    <AuthLayout language={language}>
      <div className="animate-slide-up w-full max-w-xl">
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">Shambasmart</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-ink-500">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">{t.name}</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                  className="input pl-10" placeholder={t.namePlaceholder} required />
              </div>
            </div>
            <div>
              <label className="label">{t.email}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className="input pl-10" placeholder={t.emailPlaceholder} required />
              </div>
            </div>
            <div>
              <label className="label">{t.password}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input type={showPassword ? 'text' : 'password'} name="password"
                  value={formData.password} onChange={handleChange}
                  className="input pl-10 pr-10" placeholder={t.passwordPlaceholder} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">{t.confirmPassword}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword"
                  value={formData.confirmPassword} onChange={handleChange}
                  className={`input pl-10 pr-10 ${!passwordsMatch ? 'border-rose-300 focus:ring-rose-400' : ''}`}
                  placeholder={t.confirmPasswordPlaceholder} required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="label">{t.location}</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <select name="location" value={formData.location} onChange={handleChange}
                  className="input pl-10 appearance-none pr-8">
                  {Object.entries(t.locations).map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="label">{t.phone}</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  placeholder={t.phonePlaceholder} className="input pl-10" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="label">{t.farmSize}</label>
              <div className="relative">
                <Ruler className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <select name="farmSize" value={formData.farmSize} onChange={handleChange}
                  className="input pl-10 appearance-none pr-8">
                  {Object.entries(t.farmSizes).map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="label">{t.primaryCrops}</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(t.crops).map(([value, label]) => {
                const checked = formData.primaryCrops.includes(value);
                return (
                  <button key={value} type="button" onClick={() => handleCropToggle(value)}
                    className={`px-3 py-2 rounded-xl border text-sm font-semibold transition-all
                      ${checked
                        ? 'bg-brand-600 border-brand-600 text-white shadow-glow'
                        : 'bg-white border-slate-200 text-ink-700 hover:border-brand-300 hover:bg-brand-50'}`}>
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {!passwordsMatch && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{t.passwordMismatch}</span>
            </div>
          )}

          <button type="submit" disabled={isSubmitting || !passwordsMatch}
            className="btn-primary w-full text-base py-3">
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === 'en' ? 'Creating account...' : 'Inatengeneza akaunti...'}
              </>
            ) : t.signUp}
          </button>
        </form>

        <p className="mt-8 text-sm text-ink-500 text-center">
          {t.hasAccount}{' '}
          <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">{t.signIn}</Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
