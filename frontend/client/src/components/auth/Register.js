import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone, AlertCircle, Ruler, ArrowRight, UserCircle2, Wheat, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AuthLayout from './AuthLayout';
import { LogoMark } from '../brand/Logo';

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

  const passwordStrength = useMemo(() => {
    const p = formData.password;
    if (!p) return { score: 0, label: '', color: '' };
    let score = 0;
    if (p.length >= 6) score++;
    if (p.length >= 10) score++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
    if (/\d/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const map = [
      { label: language === 'sw' ? 'Dhaifu' : 'Weak', color: 'bg-rose-500' },
      { label: language === 'sw' ? 'Dhaifu' : 'Weak', color: 'bg-rose-500' },
      { label: language === 'sw' ? 'Wastani' : 'Fair', color: 'bg-amber-500' },
      { label: language === 'sw' ? 'Nzuri' : 'Good', color: 'bg-yellow-500' },
      { label: language === 'sw' ? 'Imara' : 'Strong', color: 'bg-emerald-500' },
      { label: language === 'sw' ? 'Imara Sana' : 'Excellent', color: 'bg-brand-600' }
    ];
    return { score, ...map[score] };
  }, [formData.password, language]);

  const cropEmojis = {
    maize: '🌽', tomatoes: '🍅', beans: '🫘', cassava: '🥔',
    rice: '🌾', onions: '🧅', sorghum: '🌿', millet: '🌾'
  };

  const inputIcon = "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 group-focus-within:text-brand-600 transition-colors";

  return (
    <AuthLayout language={language}>
      <div className="animate-slide-up w-full max-w-xl mx-auto">
        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-3 mb-6">
          <LogoMark size={40} />
          <span className="text-lg font-extrabold tracking-tight">
            Shamba<span className="text-brand-600">smart</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold mb-4">
            <Wheat className="w-3.5 h-3.5" />
            <span>{language === 'sw' ? 'Bure milele' : 'Free forever'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink-900">{t.title}</h1>
          <p className="mt-2 text-ink-500">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Section: Account */}
          <section>
            <div className="auth-section-title">
              <UserCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'sw' ? 'Maelezo ya Akaunti' : 'Account Details'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label" htmlFor="reg-name">{t.name}</label>
                <div className="relative group">
                  <User className={inputIcon} />
                  <input id="reg-name" type="text" name="name" value={formData.name} onChange={handleChange}
                    className="input pl-11" placeholder={t.namePlaceholder} autoComplete="name" required />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="reg-email">{t.email}</label>
                <div className="relative group">
                  <Mail className={inputIcon} />
                  <input id="reg-email" type="email" name="email" value={formData.email} onChange={handleChange}
                    className="input pl-11" placeholder={t.emailPlaceholder} autoComplete="email" required />
                </div>
              </div>
              <div>
                <label className="label" htmlFor="reg-password">{t.password}</label>
                <div className="relative group">
                  <Lock className={inputIcon} />
                  <input id="reg-password" type={showPassword ? 'text' : 'password'} name="password"
                    value={formData.password} onChange={handleChange}
                    className="input pl-11 pr-11" placeholder={t.passwordPlaceholder}
                    autoComplete="new-password" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-ink-400 hover:text-ink-700 hover:bg-slate-100 transition">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Strength meter */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
                          i < passwordStrength.score ? passwordStrength.color : 'bg-slate-200'
                        }`} />
                      ))}
                    </div>
                    <p className="text-xs mt-1 text-ink-500">
                      {language === 'sw' ? 'Nguvu:' : 'Strength:'}{' '}
                      <span className="font-semibold text-ink-700">{passwordStrength.label}</span>
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="label" htmlFor="reg-confirm">{t.confirmPassword}</label>
                <div className="relative group">
                  <Lock className={inputIcon} />
                  <input id="reg-confirm" type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword"
                    value={formData.confirmPassword} onChange={handleChange}
                    className={`input pl-11 pr-11 ${!passwordsMatch ? 'input-error' : ''}`}
                    placeholder={t.confirmPasswordPlaceholder} autoComplete="new-password" required />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-ink-400 hover:text-ink-700 hover:bg-slate-100 transition">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword && passwordsMatch && (
                  <p className="text-xs mt-2 flex items-center gap-1 text-emerald-600 font-medium">
                    <Check className="w-3 h-3" strokeWidth={3} />
                    {language === 'sw' ? 'Maneno ya siri yanafanana' : 'Passwords match'}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Section: Farm Profile */}
          <section>
            <div className="auth-section-title">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'sw' ? 'Wasifu wa Shamba' : 'Farm Profile'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="reg-location">{t.location}</label>
                <div className="relative group">
                  <MapPin className={inputIcon} />
                  <select id="reg-location" name="location" value={formData.location} onChange={handleChange}
                    className="input pl-11 appearance-none pr-10 cursor-pointer">
                    {Object.entries(t.locations).map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              <div>
                <label className="label" htmlFor="reg-phone">{t.phone}</label>
                <div className="relative group">
                  <Phone className={inputIcon} />
                  <input id="reg-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    placeholder={t.phonePlaceholder} className="input pl-11" autoComplete="tel" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="reg-farmsize">{t.farmSize}</label>
                <div className="relative group">
                  <Ruler className={inputIcon} />
                  <select id="reg-farmsize" name="farmSize" value={formData.farmSize} onChange={handleChange}
                    className="input pl-11 appearance-none pr-10 cursor-pointer">
                    {Object.entries(t.farmSizes).map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Crops */}
          <section>
            <div className="auth-section-title">
              <Wheat className="w-3.5 h-3.5" />
              <span>{t.primaryCrops}</span>
            </div>
            <p className="text-xs text-ink-500 mb-3 -mt-1">
              {language === 'sw' ? 'Chagua kadhaa unayolima' : 'Select all that apply'}
              {formData.primaryCrops.length > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 font-semibold">
                  {formData.primaryCrops.length} {language === 'sw' ? 'imechaguliwa' : 'selected'}
                </span>
              )}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.entries(t.crops).map(([value, label]) => {
                const checked = formData.primaryCrops.includes(value);
                return (
                  <button key={value} type="button" onClick={() => handleCropToggle(value)}
                    className={`relative px-3 py-3 rounded-xl border-2 text-sm font-semibold transition-all
                      ${checked
                        ? 'bg-gradient-to-br from-brand-500 to-brand-700 border-brand-600 text-white shadow-glow scale-[1.02]'
                        : 'bg-white border-slate-200 text-ink-700 hover:border-brand-300 hover:bg-brand-50/50 hover:-translate-y-0.5'}`}>
                    <span className="text-lg block mb-0.5">{cropEmojis[value]}</span>
                    {label}
                    {checked && (
                      <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-white/25 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" strokeWidth={4} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Errors */}
          {error && (
            <div className="flex items-start gap-2.5 text-rose-700 bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-sm animate-slide-up">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-medium">{error}</span>
            </div>
          )}
          {!passwordsMatch && (
            <div className="flex items-start gap-2.5 text-rose-700 bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-sm animate-slide-up">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-medium">{t.passwordMismatch}</span>
            </div>
          )}

          {/* Terms */}
          <p className="text-xs text-ink-500 leading-relaxed">
            {language === 'sw'
              ? 'Kwa kuendelea, unakubali Masharti ya Huduma na Sera ya Faragha ya Shambasmart.'
              : 'By creating an account, you agree to Shambasmart\'s Terms of Service and Privacy Policy.'}
          </p>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting || !passwordsMatch}
            className="btn-primary w-full text-base py-3.5 group">
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === 'en' ? 'Creating account...' : 'Inatengeneza akaunti...'}
              </>
            ) : (
              <>
                {t.signUp}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-sm text-ink-500 text-center">
          {t.hasAccount}{' '}
          <Link to="/login" className="font-bold text-brand-700 hover:text-brand-800 transition-colors">
            {t.signIn} →
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
