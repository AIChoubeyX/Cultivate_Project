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
import homeEN from './locales/en/home.json'; // ⭐ Add home
import fearuresEN from './locales/en/features.json';
import linksEN from './locales/en/links.json'; // ⭐ Add links


// Hindi translations
import landingHI from './locales/hi/landing.json';
import weatherHI from './locales/hi/weather.json';
import commonHI from './locales/hi/common.json';
import homeHI from './locales/hi/home.json'; // ⭐ Add home
import fearuresHI from './locales/hi/features.json';
import linksHI from './locales/hi/links.json'; // ⭐ Add links

// Bengali translations (add when ready)
import weatherBN from './locales/bn/weather.json';
import commonBN from './locales/bn/common.json';
import landingBN from './locales/bn/landing.json';
import homeBN from './locales/bn/home.json'; // ⭐ Add home
import fearuresBN from './locales/bn/features.json';
import linksBN from './locales/bn/links.json'; // ⭐ Add links

// Organize translations by language and namespace
const resources = {
  en: {
    landing: landingEN,    // Landing page translations
    weather: weatherEN,    // Weather page translations
    common: commonEN ,
    home: homeEN ,
    features: fearuresEN,
    links: linksEN         // ⭐ Links section translations
  },
  hi: {
    landing: landingHI,
    weather: weatherHI,
    common: commonHI,
    home: homeHI,
    features: fearuresHI,
    links: linksHI         // ⭐ Links section translations
  },
  bn:{
    landing: landingBN,
    weather: weatherBN,
    common: commonBN,
    home: homeBN,
    features: fearuresBN,
    links: linksBN         // ⭐ Links section translations
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
    ns: ['common', 'landing', 'weather' , 'home' , 'features', 'links'], // Available namespaces
    
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