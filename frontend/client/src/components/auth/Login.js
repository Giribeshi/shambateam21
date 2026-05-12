import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, ShieldCheck, ArrowRight, Copy, Check } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import AuthLayout from './AuthLayout';
import { LogoMark } from '../brand/Logo';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [copiedDemo, setCopiedDemo] = useState(null);

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

  const demoAccounts = [
    { role: 'Farmer', email: 'farmer@shambasmart.co.tz', password: 'farmer123', tone: 'brand' },
    { role: 'Admin', email: 'admin@agrimind.co.tz', password: 'admin123', tone: 'amber' }
  ];

  const fillDemoCredentials = (acc) => {
    setFormData({ email: acc.email, password: acc.password });
    setCopiedDemo(acc.role);
    setTimeout(() => setCopiedDemo(null), 1500);
  };

  return (
    <AuthLayout language={language}>
      <div className="animate-slide-up w-full max-w-md mx-auto">
        {/* Mobile brand */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <LogoMark size={40} />
          <span className="text-lg font-extrabold tracking-tight">
            Shamba<span className="text-brand-600">smart</span>
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'sw' ? 'Salama na Imehakikishwa' : 'Secure & Verified'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink-900">{t.title}</h1>
          <p className="mt-2 text-ink-500">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="label" htmlFor="login-email">{t.email}</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 group-focus-within:text-brand-600 transition-colors" />
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input pl-11"
                placeholder={t.emailPlaceholder}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <label className="label !mb-0" htmlFor="login-password">{t.password}</label>
              <button type="button" className="text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors">
                {t.forgotPassword}
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 group-focus-within:text-brand-600 transition-colors" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input pl-11 pr-11"
                placeholder={t.passwordPlaceholder}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-ink-400 hover:text-ink-700 hover:bg-slate-100 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2.5 cursor-pointer select-none group">
            <span className="relative inline-flex">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="peer appearance-none w-5 h-5 rounded-md border-2 border-slate-300 bg-white checked:bg-brand-600 checked:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-all cursor-pointer"
              />
              <Check className="absolute inset-0 m-auto w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
            </span>
            <span className="text-sm text-ink-700 group-hover:text-ink-900 transition-colors">
              {language === 'sw' ? 'Nikumbuke kwa siku 30' : 'Keep me signed in for 30 days'}
            </span>
          </label>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 text-rose-700 bg-rose-50 border border-rose-200 p-3.5 rounded-xl text-sm animate-slide-up">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full text-base py-3.5 group"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {language === 'sw' ? 'Inaingia...' : 'Signing in...'}
              </>
            ) : (
              <>
                {t.login}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">
            {language === 'sw' ? 'Au jaribu' : 'Or try a demo'}
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Demo accounts grid */}
        <div className="grid grid-cols-2 gap-3">
          {demoAccounts.map((acc) => {
            const isCopied = copiedDemo === acc.role;
            const tones = {
              brand: 'border-brand-200 hover:border-brand-400 hover:bg-brand-50/50 text-brand-800',
              amber: 'border-amber-200 hover:border-amber-400 hover:bg-amber-50/50 text-amber-800'
            };
            return (
              <button
                key={acc.role}
                type="button"
                onClick={() => fillDemoCredentials(acc)}
                className={`group p-3.5 rounded-xl border-2 bg-white text-left transition-all hover:shadow-md ${tones[acc.tone]}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider">{acc.role}</span>
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition" />
                  )}
                </div>
                <p className="text-[11px] font-mono text-ink-500 truncate">{acc.email}</p>
                <p className="text-[11px] font-mono text-ink-400 mt-0.5">••••••••</p>
              </button>
            );
          })}
        </div>

        {/* Footer link */}
        <p className="mt-8 text-sm text-ink-500 text-center">
          {t.noAccount}{' '}
          <Link to="/register" className="font-bold text-brand-700 hover:text-brand-800 transition-colors">
            {t.signUp} →
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
