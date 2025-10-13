// // src/hooks/useTranslation.js
// import { useState, useEffect } from 'react';
// import { translateText } from '../utils/translate';
// import { useTranslate } from '../context/TranslateContext';

// export const useTranslation = (texts) => {
//   const { currentLanguage } = useTranslate();
//   const [translations, setTranslations] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (currentLanguage === 'en') {
//       // No translation needed for English
//       const englishTexts = {};
//       Object.keys(texts).forEach(key => {
//         englishTexts[key] = texts[key];
//       });
//       setTranslations(englishTexts);
//       return;
//     }

//     const translateAll = async () => {
//       setIsLoading(true);
//       const translated = {};
      
//       for (const [key, text] of Object.entries(texts)) {
//         translated[key] = await translateText(text, currentLanguage);
//       }
      
//       setTranslations(translated);
//       setIsLoading(false);
//     };

//     translateAll();
//   }, [currentLanguage, texts]);

//   return { t: translations, isLoading };
// };

// src/hooks/useTranslation.js
// src/hooks/useTranslation.js
// src/hooks/useTranslation.js
import { useState, useEffect, useMemo } from 'react';
import { translateText } from '../utils/translate';
import { useTranslate } from '../context/TranslateContext';

export const useTranslation = (texts) => {
  const { currentLanguage } = useTranslate();
  const [translations, setTranslations] = useState(texts);
  const [isLoading, setIsLoading] = useState(false);
  
  // Memoize texts to prevent recreating the object
  const stableTexts = useMemo(() => texts, [JSON.stringify(texts)]);

  useEffect(() => {
    console.log('🔄 Translation effect running:', { currentLanguage });
    
    if (currentLanguage === 'en') {
      console.log('✅ English selected, no translation needed');
      setTranslations(stableTexts);
      setIsLoading(false);
      return;
    }

    const translateAll = async () => {
      console.log(`🌐 Starting translation to ${currentLanguage}...`);
      setIsLoading(true);
      const translated = {};
      
      const entries = Object.entries(stableTexts);
      console.log(`📝 Translating ${entries.length} texts...`);
      
      for (let i = 0; i < entries.length; i++) {
        const [key, text] = entries[i];
        try {
          console.log(`Translating ${i + 1}/${entries.length}: ${key}`);
          translated[key] = await translateText(text, currentLanguage);
          
          // Add delay to avoid rate limiting
          if (i < entries.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        } catch (error) {
          console.error(`❌ Translation error for ${key}:`, error);
          translated[key] = text; // Fallback to original
        }
      }
      
      console.log('✅ Translation complete!', translated);
      setTranslations(translated);
      setIsLoading(false);
    };

    translateAll();
  }, [currentLanguage, stableTexts]);

  return { t: translations, isLoading };
};