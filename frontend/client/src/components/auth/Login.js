import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sprout, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t.emailPlaceholder}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t.passwordPlaceholder}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
                    {language === 'sw' ? 'Inaingia...' : 'Signing in...'}
                  </div>
                ) : (
                  t.login
                )}
              </button>
            </form>

          {/* Demo Section */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-900">Demo Account</span>
            </div>
            <p className="text-xs text-green-700 text-center mb-2">Try our demo account</p>
            <div className="text-center">
              <button 
                onClick={fillDemoCredentials}
                className="text-sm text-green-600 hover:text-green-700 font-medium underline cursor-pointer transition-colors"
              >
                farmer@shambasmart.co.tz / farmer123
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t.noAccount}{' '}
              <Link to="/register" className="font-medium text-green-600 hover:text-green-700 transition-colors">
                {t.signUp}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
