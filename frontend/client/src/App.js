import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LanguageContext, { useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import DiseaseDiagnosis from './components/DiseaseDiagnosis';
import FarmingAdvisory from './components/FarmingAdvisory';
import CropRecommendations from './components/CropRecommendations';
import Weather from './components/Weather';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import MarketPrices from './components/MarketPrices';
import LanguageSelector from './components/LanguageSelector';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// Main App Component with Authentication
function AppWithAuth() {
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('agrimind-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    setIsLoading(false);
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('agrimind-language', newLanguage);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-green-600 font-medium">Loading Agrimind...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange }}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/diagnosis" element={
              <ProtectedRoute>
                <DiseaseDiagnosis />
              </ProtectedRoute>
            } />
            <Route path="/advisory" element={
              <ProtectedRoute>
                <FarmingAdvisory />
              </ProtectedRoute>
            } />
            <Route path="/recommendations" element={
              <ProtectedRoute>
                <CropRecommendations />
              </ProtectedRoute>
            } />
            <Route path="/weather" element={
              <ProtectedRoute>
                <Weather />
              </ProtectedRoute>
            } />
            <Route path="/market-prices" element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </LanguageContext.Provider>
    </AuthProvider>
  );
}

function App() {
  return <AppWithAuth />;
}

export default App;
