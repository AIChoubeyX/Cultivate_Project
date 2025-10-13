// routes/weather.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controller/weatherController');

/**
 * @route   GET /api/weather/current
 * @desc    Get current weather for given coordinates
 * @query   lat, lon
 * @access  Public (can add auth middleware later)
 */
router.get('/current', weatherController.getCurrentWeather);

/**
 * @route   GET /api/weather/forecast
 * @desc    Get 5-day weather forecast
 * @query   lat, lon
 * @access  Public
 */
router.get('/forecast', weatherController.getForecast);

/**
 * @route   POST /api/weather/ai-suggestions
 * @desc    Get AI-powered crop suggestions based on weather
 * @body    { weather, crop, growthStage }
 * @access  Public
 */
router.post('/ai-suggestions', weatherController.getAISuggestions);

/**
 * @route   GET /api/weather/combined
 * @desc    Get both current weather and forecast in one call
 * @query   lat, lon
 * @access  Public
 */
router.get('/combined', weatherController.getCombinedWeatherData);

module.exports = router;