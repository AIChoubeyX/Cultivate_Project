// src/utils/translate.js

// MyMemory Translation API (Free - 10,000 words/day)
const TRANSLATION_API = 'https://api.mymemory.translated.net/get';

// Cache translations to reduce API calls
const translationCache = {};

export const translateText = async (text, targetLang, sourceLang = 'en') => {
  if (!text || targetLang === 'en') return text;

  const cacheKey = `${text}_${targetLang}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const url = `${TRANSLATION_API}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.responseStatus === 200) {
      const translated = data.responseData.translatedText;
      translationCache[cacheKey] = translated;
      return translated;
    }
    return text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
};

// Translate multiple texts at once
export const translateBatch = async (texts, targetLang, sourceLang = 'en') => {
  if (targetLang === 'en') return texts;
  
  const promises = texts.map(text => translateText(text, targetLang, sourceLang));
  return await Promise.all(promises);
};

// Language codes mapping
export const languageMap = {
  en: 'en-US',
  hi: 'hi-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  mr: 'mr-IN',
};