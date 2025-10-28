// frontend/src/utils/languageTranslator.js

/**
 * LANGUAGE TRANSLATIONS FOR UI
 * - Contains all UI text in multiple languages
 * - Easy to add more languages
 */

export const translations = {
  en: {
    // Header
    title: "Crop Disease Detection",
    subtitle: "AI-powered plant disease identification and treatment recommendations",
    
    // Tabs
    detect: "Detect",
    history: "History",
    database: "Database",
    
    // Upload Section
    uploadTitle: "Upload Plant Image",
    dragDrop: "Drop your plant image here",
    orClick: "or click to browse from your device",
    uploadBtn: "Upload Image",
    takePhoto: "Take Photo",
    changeImage: "Change Image",
    analyzing: "Analyzing...",
    analyzeBtn: "Analyze Image",
    
    // Results
    resultTitle: "Analysis Result",
    confidence: "Confidence",
    severityLevel: "Severity Level",
    symptoms: "Observed Symptoms",
    treatment: "Recommended Treatment",
    prevention: "Prevention Tips",
    
    // Status
    healthy: "Plant is Healthy!",
    diseased: "Disease Detected",
    healthScore: "Health Score",
    
    // Severity
    high: "High",
    medium: "Medium",
    low: "Low",
    none: "None",
    
    // Messages
    noImage: "Please select an image first",
    analyzing: "Analyzing your plant...",
    success: "Detection completed successfully",
    error: "Detection failed. Please try again.",
    
    // Language Selector
    selectLanguage: "Select Language",
    english: "English",
    hindi: "हिंदी",
    bengali: "বাংলা"
  },
  
  hi: {
    // Header
    title: "फसल रोग पहचान",
    subtitle: "AI-संचालित पौधे की बीमारी की पहचान और उपचार की सिफारिशें",
    
    // Tabs
    detect: "पहचानें",
    history: "इतिहास",
    database: "डेटाबेस",
    
    // Upload Section
    uploadTitle: "पौधे की तस्वीर अपलोड करें",
    dragDrop: "अपनी पौधे की तस्वीर यहां छोड़ें",
    orClick: "या अपने डिवाइस से ब्राउज़ करने के लिए क्लिक करें",
    uploadBtn: "तस्वीर अपलोड करें",
    takePhoto: "फोटो लें",
    changeImage: "तस्वीर बदलें",
    analyzing: "विश्लेषण हो रहा है...",
    analyzeBtn: "तस्वीर का विश्लेषण करें",
    
    // Results
    resultTitle: "विश्लेषण परिणाम",
    confidence: "विश्वास",
    severityLevel: "गंभीरता स्तर",
    symptoms: "देखे गए लक्षण",
    treatment: "अनुशंसित उपचार",
    prevention: "रोकथाम के उपाय",
    
    // Status
    healthy: "पौधा स्वस्थ है!",
    diseased: "रोग का पता चला",
    healthScore: "स्वास्थ्य स्कोर",
    
    // Severity
    high: "उच्च",
    medium: "मध्यम",
    low: "कम",
    none: "कोई नहीं",
    
    // Messages
    noImage: "कृपया पहले एक तस्वीर चुनें",
    analyzing: "आपके पौधे का विश्लेषण किया जा रहा है...",
    success: "पहचान सफलतापूर्वक पूरी हुई",
    error: "पहचान विफल। कृपया पुनः प्रयास करें।",
    
    // Language Selector
    selectLanguage: "भाषा चुनें",
    english: "English",
    hindi: "हिंदी",
    bengali: "বাংলা"
  },
  
  bn: {
    // Header
    title: "ফসল রোগ সনাক্তকরণ",
    subtitle: "AI-চালিত উদ্ভিদ রোগ সনাক্তকরণ এবং চিকিৎসা সুপারিশ",
    
    // Tabs
    detect: "সনাক্ত করুন",
    history: "ইতিহাস",
    database: "ডাটাবেস",
    
    // Upload Section
    uploadTitle: "উদ্ভিদের ছবি আপলোড করুন",
    dragDrop: "এখানে আপনার উদ্ভিদের ছবি ড্রপ করুন",
    orClick: "অথবা আপনার ডিভাইস থেকে ব্রাউজ করতে ক্লিক করুন",
    uploadBtn: "ছবি আপলোড করুন",
    takePhoto: "ছবি তুলুন",
    changeImage: "ছবি পরিবর্তন করুন",
    analyzing: "বিশ্লেষণ করা হচ্ছে...",
    analyzeBtn: "ছবি বিশ্লেষণ করুন",
    
    // Results
    resultTitle: "বিশ্লেষণ ফলাফল",
    confidence: "আত্মবিশ্বাস",
    severityLevel: "তীব্রতা স্তর",
    symptoms: "পর্যবেক্ষিত লক্ষণ",
    treatment: "প্রস্তাবিত চিকিৎসা",
    prevention: "প্রতিরোধের টিপস",
    
    // Status
    healthy: "উদ্ভিদ সুস্থ!",
    diseased: "রোগ সনাক্ত করা হয়েছে",
    healthScore: "স্বাস্থ্য স্কোর",
    
    // Severity
    high: "উচ্চ",
    medium: "মধ্যম",
    low: "নিম্ন",
    none: "কোনটি নয়",
    
    // Messages
    noImage: "অনুগ্রহ করে প্রথমে একটি ছবি নির্বাচন করুন",
    analyzing: "আপনার উদ্ভিদ বিশ্লেষণ করা হচ্ছে...",
    success: "সনাক্তকরণ সফলভাবে সম্পন্ন হয়েছে",
    error: "সনাক্তকরণ ব্যর্থ। অনুগ্রহ করে আবার চেষ্টা করুন।",
    
    // Language Selector
    selectLanguage: "ভাষা নির্বাচন করুন",
    english: "English",
    hindi: "हिंदी",
    bengali: "বাংলা"
  }
};

/**
 * Get translation for a key in the specified language
 * @param {string} key - Translation key
 * @param {string} lang - Language code (en/hi/bn)
 * @returns {string} Translated text
 */
export const t = (key, lang = 'en') => {
  return translations[lang]?.[key] || translations.en[key] || key;
};