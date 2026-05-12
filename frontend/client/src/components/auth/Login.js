import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sprout, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AuthLayout from './AuthLayout';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const translations = {
    en: {
      title: 'Welcome Back',
      subtitle: 'Login to your Shambasmart account',
      email: 'Email Address',
      password: 'Password',
      login: 'Sign In',
      noAccount: "Don't have an account?",
      signUp: 'Sign Up',
      forgotPassword: 'Forgot password?',
      demoAccount: 'Demo Account',
      demoCredentials: 'Try our demo account:',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      success: 'Login successful!',
      error: 'Login failed'
    },
    sw: {
      title: 'Karibu Tena',
      subtitle: 'Ingia kwenye akaunti yako ya Shambasmart',
      email: 'Anwani ya Barua Pepe',
      password: 'Neno la Siri',
      login: 'Ingia',
      noAccount: 'Huna akaunti?',
      signUp: 'Jisajili',
      forgotPassword: 'Umesahau neno la siri?',
      demoAccount: 'Akaunti ya Majaribio',
      demoCredentials: 'Jaribu akaunti yetu ya majaribio:',
      emailPlaceholder: 'Weka barua pepe yako',
      passwordPlaceholder: 'Weka neno la siri',
      success: 'Umeingia kwa mafanikio!',
      error: 'Imeshindwa kuingia'
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    }
    
    setIsSubmitting(false);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'farmer@shambasmart.co.tz',
      password: 'farmer123'
    });
  };

  return (
    <AuthLayout language={language}>
      <div className="animate-slide-up">
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">Shambasmart</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t.title}</h1>
        <p className="mt-2 text-ink-500">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="label">{t.email}</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input pl-10"
                placeholder={t.emailPlaceholder}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label !mb-0">{t.password}</label>
              <button type="button" className="text-xs font-semibold text-brand-700 hover:text-brand-800">
                {t.forgotPassword}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input pl-10 pr-10"
                placeholder={t.passwordPlaceholder}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full text-base py-3">
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === 'sw' ? 'Inaingia...' : 'Signing in...'}
              </>
            ) : t.login}
          </button>
        </form>

        {/* Demo */}
        <div className="mt-6 p-4 rounded-2xl bg-brand-50 border border-brand-100">
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle className="w-4 h-4 text-brand-700" />
            <span className="text-sm font-bold text-brand-800">{t.demoAccount}</span>
          </div>
          <p className="text-xs text-brand-700/80 mb-2">{t.demoCredentials}</p>
          <button
            onClick={fillDemoCredentials}
            className="text-xs font-semibold text-brand-700 hover:text-brand-800 underline-offset-2 hover:underline"
          >
            farmer@shambasmart.co.tz · farmer123
          </button>
        </div>

        <p className="mt-8 text-sm text-ink-500 text-center">
          {t.noAccount}{' '}
          <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">
            {t.signUp}
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
