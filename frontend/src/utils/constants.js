// src/utils/constants.js

// ⭐ API Base URL - Uses environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Weather API endpoints
export const WEATHER_ENDPOINTS = {
  CURRENT: '/weather/current',
  FORECAST: '/weather/forecast',
  COMBINED: '/weather/combined',
  AI_SUGGESTIONS: '/weather/ai-suggestions'
};

// Crop options
export const CROPS = [
  'wheat',
  'rice',
  'cotton',
  'sugarcane',
  'tomato',
  'potato',
  'onion',
  'maize',
  'bajra',
  'jowar'
];

// Growth stages
export const GROWTH_STAGES = {
  wheat: ['Germination', 'Tillering', 'Stem Extension', 'Heading', 'Flowering', 'Grain Fill', 'Ripening'],
  rice: ['Germination', 'Seedling', 'Tillering', 'Stem Elongation', 'Panicle Initiation', 'Heading', 'Flowering', 'Ripening'],
  cotton: ['Germination', 'Seedling', 'Square Formation', 'Flowering', 'Boll Development', 'Boll Opening'],
  tomato: ['Germination', 'Seedling', 'Vegetative Growth', 'Flowering', 'Fruit Set', 'Ripening'],
  potato: ['Sprouting', 'Vegetative Growth', 'Tuber Initiation', 'Tuber Bulking', 'Maturation'],
  onion: ['Germination', 'Vegetative Growth', 'Bulb Initiation', 'Bulb Development', 'Maturation'],
  sugarcane: ['Germination', 'Tillering', 'Grand Growth', 'Maturation'],
  maize: ['Germination', 'Vegetative', 'Tasseling', 'Silking', 'Grain Filling', 'Maturity'],
  default: ['Early Stage', 'Mid Stage', 'Late Stage', 'Harvest Ready']
};

// Cache duration (30 minutes in milliseconds)
export const CACHE_DURATION = 30 * 60 * 1000;