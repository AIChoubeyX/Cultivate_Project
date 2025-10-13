// src/services/weatherService.js
import { API_BASE_URL, WEATHER_ENDPOINTS } from '../utils/constants';

/**
 * Weather Service - Handles all weather-related API calls
 */
class WeatherService {
  /**
   * Get current weather for a location
   */
  async getCurrentWeather(lat, lon) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${WEATHER_ENDPOINTS.CURRENT}?lat=${lat}&lon=${lon}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch weather');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw error;
    }
  }

  /**
   * Get 5-day forecast
   */
  async getForecast(lat, lon) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${WEATHER_ENDPOINTS.FORECAST}?lat=${lat}&lon=${lon}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch forecast');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }

  /**
   * Get combined weather data (current + forecast) - RECOMMENDED
   */
  async getCombinedWeather(lat, lon) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${WEATHER_ENDPOINTS.COMBINED}?lat=${lat}&lon=${lon}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }
      
      return data.data; // Returns { current, forecast }
    } catch (error) {
      console.error('Error fetching combined weather:', error);
      throw error;
    }
  }

  /**
   * Get AI-powered crop suggestions
   */
  async getAISuggestions(weatherData, crop, growthStage = null) {
    try {
      const response = await fetch(
        `${API_BASE_URL}${WEATHER_ENDPOINTS.AI_SUGGESTIONS}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            weather: {
              temp: weatherData.main.temp,
              feels_like: weatherData.main.feels_like,
              humidity: weatherData.main.humidity,
              description: weatherData.weather[0].description,
              wind_speed: weatherData.wind.speed,
              pressure: weatherData.main.pressure
            },
            crop,
            growthStage
          })
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to get AI suggestions');
      }
      
      return data.data;
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new WeatherService();