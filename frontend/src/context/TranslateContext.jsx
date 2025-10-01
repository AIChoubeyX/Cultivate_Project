// src/context/TranslateContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const TranslateContext = createContext();

export const useTranslate = () => {
  const context = useContext(TranslateContext);
  if (!context) {
    throw new Error('useTranslate must be used within TranslateProvider');
  }
  return context;
};

export const TranslateProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Load saved language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const switchLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    // Save to localStorage for persistence
    localStorage.setItem('selectedLanguage', languageCode);
  };

  return (
    <TranslateContext.Provider value={{ currentLanguage, switchLanguage }}>
      {children}
    </TranslateContext.Provider>
  );
};