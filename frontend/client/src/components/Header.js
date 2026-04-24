import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Sprout, Cloud, Camera, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const translations = {
    en: {
      title: 'Agrimind',
      subtitle: 'Agricultural Assistant',
      home: 'Home',
      diagnosis: 'Disease Diagnosis',
      advisory: 'Farming Advisory',
      recommendations: 'Crop Recommendations',
      weather: 'Weather'
    },
    sw: {
      title: 'Agrimind',
      subtitle: 'Msaidizi wa Kilimo',
      home: 'Nyumbani',
      diagnosis: 'Utambuzi wa Ugonjwa',
      advisory: 'Ushauri wa Kilimo',
      recommendations: 'Mapendekezo ya Mazao',
      weather: 'Hali ya Hewa'
    }
  };

  const t = translations[language];

  const navItems = [
    { path: '/', label: t.home, icon: Home },
    { path: '/diagnosis', label: t.diagnosis, icon: Camera },
    { path: '/advisory', label: t.advisory, icon: Heart },
    { path: '/recommendations', label: t.recommendations, icon: Sprout },
    { path: '/weather', label: t.weather, icon: Cloud }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-agrimind-green rounded-full flex items-center justify-center">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-agrimind-green">{t.title}</h1>
              <p className="text-xs text-gray-600">{t.subtitle}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? 'bg-agrimind-light text-white'
                      : 'text-gray-700 hover:bg-agrimind-bg hover:text-agrimind-green'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Selector and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-agrimind-bg"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActivePath(item.path)
                        ? 'bg-agrimind-light text-white'
                        : 'text-gray-700 hover:bg-agrimind-bg hover:text-agrimind-green'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
