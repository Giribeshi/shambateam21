import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: 'EN' },
    { code: 'sw', name: 'Kiswahili', flag: 'SW' }
  ];

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Globe className="w-4 h-4 text-green-600" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
