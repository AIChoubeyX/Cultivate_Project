const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize with API key and explicit API version
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiModel = () => {
  // Use gemini-2.0-flash which is available in your API
  return genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 1024,
    },
  });
};

module.exports = {
  getGeminiModel
};