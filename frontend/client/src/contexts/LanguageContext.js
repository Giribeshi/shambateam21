import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext('sw'); // Set Swahili as default language

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('agrimind-language') || 'sw'; // Default to Swahili for Tanzanian farmers
  });

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
