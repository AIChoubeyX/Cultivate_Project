// src/i18n.js
// This file configures i18next for internationalization

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all translation files
// English translations
import landingEN from './locales/en/landing.json';
import weatherEN from './locales/en/weather.json';
import commonEN from './locales/en/common.json';

// Hindi translations
import landingHI from './locales/hi/landing.json';
import weatherHI from './locales/hi/weather.json';
import commonHI from './locales/hi/common.json';

// Bengali translations (add when ready)
import weatherBN from './locales/bn/weather.json';
import commonBN from './locales/bn/common.json';
import landingBN from './locales/bn/landing.json';

// Organize translations by language and namespace
const resources = {
  en: {
    landing: landingEN,    // Landing page translations
    weather: weatherEN,    // Weather page translations
    common: commonEN       // Common translations (buttons, nav, etc.)
  },
  hi: {
    landing: landingHI,
    weather: weatherHI,
    common: commonHI
  },
  bn:{
    landing: landingBN,
    weather: weatherBN,
    common: commonBN
  }
  // Add more languages here as you create them
  // bn: {
  //   landing: landingBN,
  //   weather: weatherBN,
  //   common: commonBN
  // }
};

// Initialize i18next
i18n
  // Detect user's language from browser/localStorage
  .use(LanguageDetector)
  
  // Connect i18next to React
  .use(initReactI18next)
  
  // Configure options
  .init({
    resources,                    // All translation data
    fallbackLng: 'en',           // Use English if translation missing
    defaultNS: 'common',         // Default namespace
    ns: ['common', 'landing', 'weather'], // Available namespaces
    
    // Interpolation settings (for dynamic values like {{name}})
    interpolation: {
      escapeValue: false         // React already escapes values
    },
    
    // Language detection settings
    detection: {
      // Check in this order: localStorage -> browser settings
      order: ['localStorage', 'navigator'],
      // Save selected language to localStorage
      caches: ['localStorage'],
      // localStorage key name
      lookupLocalStorage: 'i18nextLng'
    },
    
    // React-specific settings
    react: {
      useSuspense: false         // Set to true for loading state support
    },
    
    // Debug mode (set to false in production)
    debug: false
  });

export default i18n;