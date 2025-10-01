// src/hooks/useTranslation.js
import { useState, useEffect } from 'react';
import { translateText } from '../utils/translate';
import { useTranslate } from '../context/TranslateContext';

export const useTranslation = (texts) => {
  const { currentLanguage } = useTranslate();
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentLanguage === 'en') {
      // No translation needed for English
      const englishTexts = {};
      Object.keys(texts).forEach(key => {
        englishTexts[key] = texts[key];
      });
      setTranslations(englishTexts);
      return;
    }

    const translateAll = async () => {
      setIsLoading(true);
      const translated = {};
      
      for (const [key, text] of Object.entries(texts)) {
        translated[key] = await translateText(text, currentLanguage);
      }
      
      setTranslations(translated);
      setIsLoading(false);
    };

    translateAll();
  }, [currentLanguage, JSON.stringify(texts)]);

  return { t: translations, isLoading };
};