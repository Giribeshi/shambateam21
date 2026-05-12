import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Stethoscope,
  HeartPulse,
  Cloud,
  TrendingUp,
  User,
  BarChart3,
  Calendar,
  MapPin,
  Droplets,
  Sun,
  Wind,
  LineChart,
  ArrowRight,
  Bell,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

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
    { icon: Stethoscope, label: t.diagnoseNow,           path: '/diagnosis',       gradient: 'from-violet-500 to-fuchsia-500' },
    { icon: Sprout,      label: t.viewRecommendations,   path: '/recommendations', gradient: 'from-brand-500 to-emerald-600' },
    { icon: Cloud,       label: t.checkWeather,          path: '/weather',         gradient: 'from-sky-500 to-cyan-500' },
    { icon: HeartPulse,  label: t.getAdvice,             path: '/advisory',        gradient: 'from-rose-500 to-orange-500' },
    { icon: LineChart,   label: t.checkMarketPrices,     path: '/market-prices',   gradient: 'from-amber-500 to-yellow-500' },
  ];

  const stats = [
    { label: language === 'sw' ? 'Afya ya mazao' : 'Crop health',    value: '85%',   trend: '+4%',  icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: language === 'sw' ? 'Utabiri leo'   : 'Forecast today', value: '24°C',  trend: 'Sunny', icon: Sun,         color: 'text-amber-600 bg-amber-50' },
    { label: language === 'sw' ? 'Bei mahindi'   : 'Maize price',    value: '850/kg', trend: '+8.4%', icon: TrendingUp,  color: 'text-brand-700 bg-brand-50' },
    { label: language === 'sw' ? 'Vidokezo'      : 'New tips',        value: '3',     trend: 'today', icon: Sparkles,    color: 'text-violet-600 bg-violet-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 p-8 md:p-10 text-white">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="chip bg-white/20 text-white">
              <Sparkles className="w-3.5 h-3.5" /> {t.today}
            </span>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">
              {t.welcome}, {user?.name?.split(' ')[0] || 'Farmer'}!
            </h1>
            <p className="mt-2 text-white/85 max-w-lg">
              {language === 'en'
                ? "Here's a snapshot of your farm today. Check the weather, prices, and any pending tasks."
                : "Hii ni muhtasari wa shamba lako leo. Angalia hali ya hewa, bei, na kazi zinazosubiri."}
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/diagnosis" className="bg-white text-brand-700 font-bold px-5 py-3 rounded-xl hover:bg-brand-50 transition shadow-card flex items-center gap-2">
              <Stethoscope className="w-4 h-4" /> {t.diagnoseNow}
            </Link>
            <Link to="/weather" className="bg-white/15 backdrop-blur text-white font-bold px-5 py-3 rounded-xl hover:bg-white/25 transition border border-white/20 flex items-center gap-2">
              <Cloud className="w-4 h-4" /> {t.checkWeather}
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card-hover p-5">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-ink-500">{s.trend}</span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-extrabold tracking-tight">{s.value}</div>
                <div className="text-xs text-ink-500 mt-1">{s.label}</div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick actions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title">{t.quickActions}</h2>
          <Link to="/diagnosis" className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1">
            {language === 'sw' ? 'Tazama zote' : 'View all'} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className={`group relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br ${action.gradient} shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5`}
              >
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/15 blur-2xl group-hover:scale-125 transition-transform" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-bold leading-tight">{action.label}</div>
                  <ArrowRight className="w-4 h-4 mt-3 opacity-70 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main grid */}
      <section className="grid lg:grid-cols-3 gap-6">
        {/* Weather + Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="section-title">{t.weatherInfo}</h3>
                <div className="text-xs text-ink-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {user?.location ? user.location.replace('_', ' ') : 'Tanzania'}
                </div>
              </div>
              <div className={`chip ${getWeatherColor(weatherData.condition)}`}>
                {getWeatherIcon(weatherData.condition)}
                {getWeatherText(weatherData.condition)}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Sun,      v: `${weatherData.temperature}°C`,        l: t.temperature, c: 'text-amber-600 bg-amber-50' },
                { icon: Droplets, v: `${weatherData.humidity}%`,            l: t.humidity,    c: 'text-sky-600 bg-sky-50' },
                { icon: Cloud,    v: `${weatherData.rainfall}mm`,           l: t.rainfall,    c: 'text-slate-600 bg-slate-100' },
                { icon: Wind,     v: `${weatherData.windSpeed}km/h`,        l: t.windSpeed,   c: 'text-teal-600 bg-teal-50' },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.l} className="rounded-2xl border border-slate-200/70 p-4 text-center">
                    <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center ${m.c}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="mt-3 text-xl font-extrabold">{m.v}</div>
                    <div className="text-[11px] text-ink-500 uppercase tracking-wider mt-0.5">{m.l}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="section-title">{t.recentActivity}</h3>
              <Bell className="w-4 h-4 text-ink-400" />
            </div>
            {recentActivity.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {recentActivity.map((a, i) => (
                  <li key={i} className="py-3 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      a.type === 'diagnosis' ? 'bg-violet-50 text-violet-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {a.type === 'diagnosis' ? <Stethoscope className="w-4 h-4" /> : <HeartPulse className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-ink-900 truncate">{a.description}</div>
                      <div className="text-xs text-ink-500">{a.date}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-400" />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center text-ink-500">{t.noActivity}</div>
            )}
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="section-title mb-4">{t.farmOverview}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ink-400" />
                <span className="text-ink-500">{t.location}:</span>
                <span className="font-semibold ml-auto">
                  {user?.location ? user.location.charAt(0).toUpperCase() + user.location.slice(1).replace('_', ' ') : '—'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-ink-400" />
                <span className="text-ink-500">{t.farmSize}:</span>
                <span className="font-semibold ml-auto">
                  {user?.farmSize ? user.farmSize.charAt(0).toUpperCase() + user.farmSize.slice(1) : '—'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <User className="w-4 h-4 text-ink-400" />
                <span className="text-ink-500">Role:</span>
                <span className="font-semibold ml-auto">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : '—'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-ink-400" />
                <span className="text-ink-500">Member:</span>
                <span className="font-semibold ml-auto">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
                </span>
              </li>
            </ul>

            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="text-xs uppercase tracking-wider text-ink-500 mb-2">{t.primaryCrops}</div>
              <div className="flex flex-wrap gap-1.5">
                {user?.primaryCrops && Array.isArray(user.primaryCrops) && user.primaryCrops.length > 0 ? (
                  user.primaryCrops.map((c, i) => (
                    <span key={i} className="chip bg-brand-50 text-brand-700">
                      <Sprout className="w-3 h-3" /> {c.charAt(0).toUpperCase() + c.slice(1)}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-ink-400">Not set</span>
                )}
              </div>
            </div>
          </div>

          <div className="card relative overflow-hidden p-6 bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 text-white border-0">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <h3 className="font-bold text-lg">{t.cropHealth}</h3>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-white/80">Healthy</span><span className="font-bold">85%</span></div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="flex justify-between"><span className="text-white/80">Need attention</span><span className="font-bold">15%</span></div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-amber-300 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
            <Link to="/diagnosis" className="mt-5 inline-flex items-center gap-1 text-sm font-bold bg-white text-brand-700 px-4 py-2 rounded-lg hover:bg-brand-50 transition">
              {language === 'sw' ? 'Tambua sasa' : 'Diagnose now'} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
