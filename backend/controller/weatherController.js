// backend/controller/weatherController.js
const axios = require("axios");

// Cache weather data to reduce API calls
const weatherCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get current weather data
 */
exports.getCurrentWeather = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    // Validation
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: "Latitude and longitude are required",
      });
    }

    // Check cache first
    const cacheKey = `current_${lat}_${lon}`;
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return res.json({
        success: true,
        data: cached.data,
        cached: true,
      });
    }

    // Fetch from OpenWeatherMap API
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    // Cache the result
    weatherCache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now(),
    });

    res.json({
      success: true,
      data: response.data,
      cached: false,
    });
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch weather data",
      details: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Get 5-day forecast
 */
exports.getForecast = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: "Latitude and longitude are required",
      });
    }

    // Check cache
    const cacheKey = `forecast_${lat}_${lon}`;
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return res.json({
        success: true,
        data: cached.data,
        cached: true,
      });
    }

    // Fetch forecast
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    // Cache the result
    weatherCache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now(),
    });

    res.json({
      success: true,
      data: response.data,
      cached: false,
    });
  } catch (error) {
    console.error("Forecast API Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "Failed to fetch forecast data",
      details: error.response?.data?.message || error.message,
    });
  }
};

/**
 * Get combined weather data (current + forecast)
 */
exports.getCombinedWeatherData = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: "Latitude and longitude are required",
      });
    }

    const API_KEY = process.env.OPENWEATHER_API_KEY;

    // Fetch both in parallel
    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      ),
      axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      ),
    ]);

    res.json({
      success: true,
      data: {
        current: weatherResponse.data,
        forecast: forecastResponse.data,
      },
    });
  } catch (error) {
    console.error(
      "Combined Weather Error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      success: false,
      error: "Failed to fetch weather data",
    });
  }
};

/**
 * Get AI-powered crop suggestions using OpenRouter
 */
exports.getAISuggestions = async (req, res) => {
  try {
    const { weather, crop, growthStage } = req.body;

    if (!weather || !crop) {
      return res.status(400).json({
        success: false,
        error: "Weather data and crop type are required",
      });
    }

    // Build AI prompt
    const prompt = `You are an expert agricultural advisor in India. Analyze this weather data and provide specific farming advice:

Weather Conditions:
- Temperature: ${weather.temp}°C (Feels like: ${weather.feels_like}°C)
- Humidity: ${weather.humidity}%
- Weather: ${weather.description}
- Wind Speed: ${weather.wind_speed} m/s
- Pressure: ${weather.pressure} hPa

Crop: ${crop}
${growthStage ? `Growth Stage: ${growthStage}` : ""}

Provide actionable advice in these categories:
1. 💧 Irrigation: When and how much to water
2. 🦠 Disease Risk: Potential threats based on current conditions
3. 🌾 Harvest Timing: If applicable, best time to harvest
4. 🌱 Fertilizer/Care: Any immediate actions needed

Keep response concise (4-5 bullet points) and farmer-friendly in simple language. Use emojis for visual appeal.`;

    // Check if OpenRouter API key exists
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === "your_openrouter_api_key_here") {
      console.log("⚠️ OpenRouter API key not configured - using fallback");
      return res.json({
        success: true,
        data: {
          crop: crop,
          suggestion: getFallbackSuggestion(crop, weather),
          fallback: true,
          message: "Showing smart weather-based recommendations.",
        },
      });
    }

    // ⭐ Call OpenRouter API
    try {
      console.log(`🤖 Calling OpenRouter for ${crop} suggestions...`);
      
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
           model: "meta-llama/llama-3.2-3b-instruct:free", // FREE model
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 600
        },
        {
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000",
            "X-Title": "Cultivate - Farmer Weather Assistant"
          },
          timeout: 20000,
        }
      );

      const aiSuggestion = response.data.choices[0].message.content;
      console.log("✅ OpenRouter API success!");

      return res.json({
        success: true,
        data: {
          crop: crop,
          suggestion: aiSuggestion,
          weather_summary: {
            temp: weather.temp,
            humidity: weather.humidity,
            description: weather.description,
          },
          fallback: false,
        },
      });

    } catch (apiError) {
      console.error("OpenRouter API Error:", apiError.response?.data || apiError.message);
      
      return res.json({
        success: true,
        data: {
          crop: crop,
          suggestion: getFallbackSuggestion(crop, weather),
          fallback: true,
          message: "Showing smart weather-based recommendations.",
        },
      });
    }

  } catch (error) {
    console.error("AI Suggestion Error:", error.response?.data || error.message);
    
    return res.status(500).json({
      success: false,
      error: "Failed to generate suggestions",
      details: error.message,
    });
  }
};

/**
 * Fallback suggestions when AI is unavailable
 */
function getFallbackSuggestion(crop, weather) {
  const temp = weather.temp;
  const humidity = weather.humidity;

  const suggestions = {
    wheat: `🌾 Wheat Care Recommendations:

💧 Irrigation: ${temp > 30 ? "Water early morning (6-8 AM) due to high temperature. Apply 25-30mm depth." : "Normal irrigation schedule. Water when soil feels dry 2-3 inches deep."}

🦠 Disease Watch: ${humidity > 70 ? "High humidity detected - monitor for rust and blight diseases. Consider preventive fungicide spray." : "Low disease risk in current conditions. Continue regular monitoring."}

🌡️ Temperature Alert: ${temp > 35 ? "Heat stress possible. Ensure adequate soil moisture. Avoid fertilizer application." : temp < 15 ? "Cool weather - growth may slow. Good time for fertilizer application if needed." : "Optimal temperature range for wheat growth."}

🌱 General Care: Remove weeds regularly. Check for pest activity. Ensure proper drainage in fields.`,

    rice: `🌾 Rice Care Recommendations:

💧 Water Management: ${humidity > 80 ? "Maintain 5-7cm standing water. Check field levels twice daily." : "Regular flooding schedule. Ensure no water stress during reproductive stage."}

🦠 Disease Alert: ${humidity > 75 ? "High humidity - increased risk of blast disease. Apply preventive measures. Monitor leaf health." : "Moderate disease risk. Continue regular field inspection."}

🌱 Nutrition: ${temp > 28 ? "Apply potassium to strengthen plants against heat. Split nitrogen application recommended." : "Good conditions for nutrient uptake. Apply phosphorus if needed."}

🐛 Pest Watch: Monitor for stem borer and leaf folder. Install pheromone traps if available.`,

    cotton: `🌿 Cotton Care Recommendations:

💧 Irrigation: ${temp > 32 ? "Critical - water stress likely. Drip irrigation at 2-day intervals. Apply 40-50mm." : "Moderate irrigation needed. Water based on soil moisture, typically every 5-7 days."}

🐛 Pest Alert: ${temp > 30 && humidity > 60 ? "Favorable conditions for bollworm. Inspect plants every 2 days. Consider biopesticide spray." : "Regular pest monitoring advised. Check for whitefly and jassids."}

🌾 Boll Development: ${temp > 25 && temp < 35 ? "Ideal temperature for boll formation. Ensure adequate moisture and potassium." : "Monitor boll development closely. Adjust care based on growth stage."}

✂️ Harvest Prep: If bolls are opening, weather seems favorable. Pick clean cotton to maintain quality.`,

    tomato: `🍅 Tomato Care Recommendations:

💧 Watering: ${temp > 30 ? "Heat stress risk - water daily in early morning. Apply mulch to retain moisture." : "Water every 2-3 days. Avoid overhead watering to prevent diseases."}

🦠 Disease Prevention: ${humidity > 70 ? "High humidity - risk of late blight and fungal diseases. Ensure good air circulation. Remove affected leaves." : "Good conditions. Continue preventive spray schedule if applicable."}

🌱 Nutrient Care: Apply calcium spray weekly to prevent blossom end rot. Balanced NPK application during fruiting.

🪴 Support: Check staking and prune suckers regularly for better yield and air circulation.`,

    potato: `🥔 Potato Care Recommendations:

💧 Irrigation: ${temp > 28 ? "Tuber development may be affected by heat. Increase irrigation frequency. Apply 30-35mm per week." : "Regular irrigation - keep soil consistently moist but not waterlogged."}

⛰️ Hilling: If plants are 15-20cm tall, perform earthing up to encourage tuber formation.

🦠 Disease Watch: ${humidity > 75 ? "Late blight risk is high. Apply copper-based fungicide. Remove infected plants immediately." : "Monitor for early blight. Ensure crop rotation for disease management."}

🌾 Harvest Timing: Check tuber size after 90-120 days. Stop irrigation 2 weeks before planned harvest.`,

    onion: `🧅 Onion Care Recommendations:

💧 Water Management: ${temp > 32 ? "Reduce irrigation as bulbs near maturity. Excess water can cause rotting." : "Regular irrigation until bulb formation. Then gradually reduce."}

🌱 Bulb Development: ${temp > 25 ? "Good temperature for bulbing. Ensure adequate phosphorus and potassium availability." : "Monitor for proper bulb formation. Day length and temperature affect bulbing."}

🌿 Weed Control: Critical - weeds compete heavily. Manual weeding recommended. Keep field clean.

🦠 Disease Alert: ${humidity > 70 ? "Watch for purple blotch and stemphylium blight. Ensure good drainage." : "Monitor for thrips damage. Use yellow sticky traps."}`,

    sugarcane: `🌾 Sugarcane Care Recommendations:

💧 Irrigation: ${temp > 35 ? "High temperature - increase irrigation frequency. Apply 75-100mm per week during growth phase." : "Regular irrigation schedule. Avoid water stress during tillering and grand growth phases."}

🌱 Nutrition: Apply nitrogen in split doses. Phosphorus during planting. Potassium during active growth.

🐛 Pest Management: ${humidity > 65 ? "Monitor for shoot borer and scale insects. Use pheromone traps for early detection." : "Regular pest scouting. Check for root grub damage."}

🌾 Maturity: Stop irrigation 3-4 weeks before harvest to increase sugar content. Check brix levels regularly.`,

    maize: `🌽 Maize Care Recommendations:

💧 Water Needs: ${temp > 30 ? "Critical water requirement during tasseling and silking. Ensure no moisture stress. Apply 50-60mm weekly." : "Regular irrigation - especially important during flowering and grain filling stages."}

🌱 Nutrient Management: Apply nitrogen in splits - 50% at sowing, 25% at knee-high, 25% at tasseling.

🐛 Pest Watch: ${temp > 28 ? "Monitor for fall armyworm. Inspect whorls every 3 days. Use biological control if available." : "Check for stem borer damage. Early detection is key for management."}

🌾 Harvest: Mature when kernels show black layer. Moisture content should be 20-25% for proper storage.`,

    bajra: `🌾 Bajra (Pearl Millet) Care:

💧 Irrigation: ${temp > 35 ? "Drought-resistant but needs water during flowering. Apply 20-25mm." : "Minimal irrigation needed. Water during critical growth stages only."}

🌱 Nutrition: Apply farmyard manure before sowing. Nitrogen at tillering stage.

🐛 Pest Control: Monitor for shoot fly and stem borer. Remove infected plants.

🌾 Harvest: Ready when grains harden. Harvest early morning to prevent shattering.`,

    jowar: `🌾 Jowar (Sorghum) Care:

💧 Water Management: ${temp > 32 ? "Needs moisture during grain formation. Apply 30-35mm weekly." : "Drought-tolerant. Water during critical stages - flowering and grain filling."}

🌱 Nutrition: Apply nitrogen in 2-3 splits. Phosphorus at sowing time.

🐛 Pest Alert: ${humidity > 65 ? "Watch for shoot fly and stem borer. Use seed treatment." : "Monitor for aphids. Natural predators help control."}

🦅 Bird Protection: Use bird scarers near harvest time. Cover with nets if possible.`,
  };

  return suggestions[crop] || `General ${crop} care: Monitor weather conditions daily. Adjust irrigation based on temperature and rainfall. Check for pest and disease symptoms regularly. Ensure proper nutrition at each growth stage. Consult local agricultural experts for specific guidance.`;
}

// Clean old cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of weatherCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      weatherCache.delete(key);
    }
  }
}, CACHE_DURATION);