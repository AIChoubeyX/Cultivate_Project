// // src/context/TranslateContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';

// const TranslateContext = createContext();

// export const useTranslate = () => {
//   const context = useContext(TranslateContext);
//   if (!context) {
//     throw new Error('useTranslate must be used within TranslateProvider');
//   }
//   return context;
// };

// export const TranslateProvider = ({ children }) => {
//   const [currentLanguage, setCurrentLanguage] = useState('en');

//   // Load saved language on mount
//   useEffect(() => {
//     const savedLanguage = localStorage.getItem('selectedLanguage');
//     if (savedLanguage) {
//       setCurrentLanguage(savedLanguage);
//     }
//   }, []);

//   const switchLanguage = (languageCode) => {
//     setCurrentLanguage(languageCode);
//     // Save to localStorage for persistence
//     localStorage.setItem('selectedLanguage', languageCode);
//   };

//   return (
//     <TranslateContext.Provider value={{ currentLanguage, switchLanguage }}>
//       {children}
//     </TranslateContext.Provider>
//   );
// };

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
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Initialize from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('selectedLanguage');
    console.log('🌍 Initial language from localStorage:', savedLanguage);
    return savedLanguage || 'en';
  });

  const switchLanguage = (languageCode) => {
    console.log(`🔄 Switching language from ${currentLanguage} to ${languageCode}`);
    setCurrentLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  };

  // Debug log whenever language changes
  useEffect(() => {
    console.log('🌐 Current language changed to:', currentLanguage);
  }, [currentLanguage]);

  return (
    <TranslateContext.Provider value={{ currentLanguage, switchLanguage }}>
      {children}
    </TranslateContext.Provider>
  );
};