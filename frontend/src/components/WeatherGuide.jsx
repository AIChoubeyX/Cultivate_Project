import React, { useState, useEffect } from "react";
import {
  Cloud,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  MapPin,
  RefreshCw,
  Sprout,
  AlertCircle,
  Loader,
} from "lucide-react";
import weatherService from "../services/weatherService";
import { CROPS, GROWTH_STAGES } from "../utils/constants";
import { useTranslation } from "react-i18next";

const WeatherGuide = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [growthStage, setGrowthStage] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // ⭐ Translation hook
  const { t } = useTranslation('weather');

  // Get user's location on component mount
  useEffect(() => {
    getUserLocation();
  }, []);

  /**
   * Get user's GPS location
   */
  const getUserLocation = () => {
    setLoading(true);
    setError("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setLocation(loc);
          fetchWeatherData(loc);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError(t('weather.enableLocation'));
          setLoading(false);

          // Fallback to demo location (Delhi)
          const demoLoc = { lat: 28.6139, lon: 77.209 };
          setLocation(demoLoc);
          fetchWeatherData(demoLoc);
        }
      );
    } else {
      setError(t('weather.geoNotSupported'));
      setLoading(false);
    }
  };

  /**
   * Fetch weather data from backend API
   */
  const fetchWeatherData = async (loc) => {
    try {
      setLoading(true);
      setError("");

      const data = await weatherService.getCombinedWeather(loc.lat, loc.lon);

      setWeather(data.current);

      // Process forecast - get one per day
      const dailyForecast = data.forecast.list
        .filter((_, index) => index % 8 === 0)
        .slice(0, 5);
      setForecast(dailyForecast);

      setLoading(false);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(t('weather.weatherFailed'));
      setLoading(false);
    }
  };

  /**
   * Generate AI suggestions based on weather and crop
   */
  const generateAISuggestions = async () => {
    if (!weather) {
      setError(t('ai.weatherNotAvailable'));
      return;
    }

    try {
      setLoadingAI(true);
      setError("");

      const response = await weatherService.getAISuggestions(
        weather,
        selectedCrop,
        growthStage || null
      );

      setAiSuggestions(response.suggestion);
      
      // Show info message if using fallback
      if (response.fallback) {
        setError("ℹ️ " + (response.message || "Using smart weather-based recommendations."));
      }
      
      setLoadingAI(false);
    } catch (err) {
      console.error("AI suggestion error:", err);
      setError(t('ai.aiFailed'));
      setLoadingAI(false);
    }
  };

  /**
   * Format timestamp to readable date
   */
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Get available growth stages for selected crop
   */
  const getGrowthStages = () => {
    return GROWTH_STAGES[selectedCrop] || GROWTH_STAGES.default;
  };

  // ⭐ Get translated crop name
  const getCropName = (crop) => {
    return t(`crops.${crop}`) || crop.charAt(0).toUpperCase() + crop.slice(1);
  };

  // Loading state
  if (loading && !weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-700">{t('weather.fetchingWeather')}</p>
          <p className="text-sm text-gray-500 mt-2">{t('weather.gettingLocation')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-3 rounded-xl">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t('title')}
              </h1>
              <p className="text-gray-600">{t('subtitle')}</p>
            </div>
          </div>
          <button
            onClick={getUserLocation}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
            title={t('weather.refreshWeather')}
          >
            <RefreshCw className={`w-6 h-6 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className={`max-w-6xl mx-auto mb-4 ${
          error.startsWith('ℹ️') 
            ? 'bg-blue-100 border-l-4 border-blue-500' 
            : 'bg-red-100 border-l-4 border-red-500'
        } p-4 rounded-lg`}>
          <div className="flex items-center gap-2">
            <AlertCircle className={`w-5 h-5 ${
              error.startsWith('ℹ️') ? 'text-blue-600' : 'text-red-600'
            }`} />
            <p className={error.startsWith('ℹ️') ? 'text-blue-700' : 'text-red-700'}>
              {error}
            </p>
          </div>
        </div>
      )}

      {weather && (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Current Weather Card */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8 text-white">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" />
              <p className="text-lg">
                {weather.name}, {weather.sys.country}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Cloud className="w-16 h-16" />
                  <div>
                    <p className="text-6xl font-bold">
                      {Math.round(weather.main.temp)}°C
                    </p>
                    <p className="text-xl capitalize">
                      {weather.weather[0].description}
                    </p>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  {t('current.feelsLike')} {Math.round(weather.main.feels_like)}°C
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Droplets className="w-6 h-6 mb-2" />
                  <p className="text-sm opacity-90">{t('current.humidity')}</p>
                  <p className="text-2xl font-bold">{weather.main.humidity}%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Wind className="w-6 h-6 mb-2" />
                  <p className="text-sm opacity-90">{t('current.windSpeed')}</p>
                  <p className="text-2xl font-bold">{weather.wind.speed} m/s</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Eye className="w-6 h-6 mb-2" />
                  <p className="text-sm opacity-90">{t('current.visibility')}</p>
                  <p className="text-2xl font-bold">
                    {(weather.visibility / 1000).toFixed(1)} km
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Gauge className="w-6 h-6 mb-2" />
                  <p className="text-sm opacity-90">{t('current.pressure')}</p>
                  <p className="text-2xl font-bold">
                    {weather.main.pressure} hPa
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <Sunrise className="w-5 h-5" />
                <span>
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                    "en-IN",
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sunset className="w-5 h-5" />
                <span>
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                    "en-IN",
                    { hour: "2-digit", minute: "2-digit" }
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t('forecast.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 text-center"
                >
                  <p className="font-semibold text-gray-700 mb-2">
                    {formatDate(day.dt)}
                  </p>
                  <Cloud className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold text-gray-800">
                    {Math.round(day.main.temp)}°C
                  </p>
                  <p className="text-sm text-gray-600 capitalize">
                    {day.weather[0].description}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-600">
                    <Droplets className="w-4 h-4" />
                    <span>{day.main.humidity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Crop Suggestions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🤖 {t('ai.title')}
            </h2>

            {/* Crop Selection */}
            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                {t('ai.selectCrop')}
              </label>
              <div className="flex flex-wrap gap-3">
                {CROPS.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => {
                      setSelectedCrop(crop);
                      setGrowthStage("");
                      setAiSuggestions("");
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCrop === crop
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {getCropName(crop)}
                  </button>
                ))}
              </div>
            </div>

            {/* Growth Stage Selection */}
            {/* <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                {t('ai.growthStageLabel')}
              </label>
              <select
                value={growthStage}
                onChange={(e) => setGrowthStage(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
              >
                <option value="">{t('ai.selectGrowthStage')}</option>
                {getGrowthStages().map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Generate Button */}
            <button
              onClick={generateAISuggestions}
              disabled={loadingAI}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 mb-4 flex items-center gap-2"
            >
              {loadingAI ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {t('ai.analyzing')}
                </>
              ) : (
                <>✨ {t('ai.getAiSuggestions')}</>
              )}
            </button>

            {/* AI Suggestions Display */}
            {aiSuggestions && (
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-l-4 border-green-600">
                <div className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                  {aiSuggestions}
                </div>
              </div>
            )}

            {/* Show message if no suggestions yet */}
            {!aiSuggestions && !loadingAI && (
              <div className="text-center text-gray-500 py-8">
                <p>{t('ai.noSuggestionsYet')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherGuide;