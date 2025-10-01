import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Droplets, 
  ThermometerSun,
  Eye,
  Compass,
  Calendar,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Leaf
} from 'lucide-react';

const weatherData = {
  current: {
    location: 'Punjab, India',
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    uvIndex: 6,
    feelsLike: 32
  },
  forecast: [
    { day: 'Today', date: 'Mar 15', temp: '28°C', low: '18°C', condition: 'Sunny', icon: Sun, precipitation: 0 },
    { day: 'Tomorrow', date: 'Mar 16', temp: '26°C', low: '16°C', condition: 'Cloudy', icon: Cloud, precipitation: 10 },
    { day: 'Wednesday', date: 'Mar 17', temp: '24°C', low: '14°C', condition: 'Rainy', icon: CloudRain, precipitation: 80 },
    { day: 'Thursday', date: 'Mar 18', temp: '22°C', low: '12°C', condition: 'Rainy', icon: CloudRain, precipitation: 90 },
    { day: 'Friday', date: 'Mar 19', temp: '25°C', low: '15°C', condition: 'Cloudy', icon: Cloud, precipitation: 20 },
    { day: 'Saturday', date: 'Mar 20', temp: '27°C', low: '17°C', condition: 'Sunny', icon: Sun, precipitation: 5 },
    { day: 'Sunday', date: 'Mar 21', temp: '29°C', low: '19°C', condition: 'Sunny', icon: Sun, precipitation: 0 }
  ],
  hourly: [
    { time: '12 PM', temp: 28, condition: 'Sunny', icon: Sun },
    { time: '1 PM', temp: 30, condition: 'Sunny', icon: Sun },
    { time: '2 PM', temp: 32, condition: 'Sunny', icon: Sun },
    { time: '3 PM', temp: 31, condition: 'Partly Cloudy', icon: Cloud },
    { time: '4 PM', temp: 29, condition: 'Cloudy', icon: Cloud },
    { time: '5 PM', temp: 27, condition: 'Cloudy', icon: Cloud }
  ]
};

const cultivationTips = [
  {
    crop: 'Rice',
    season: 'Kharif',
    tips: [
      'Ideal temperature: 20-35°C',
      'Requires 150-200cm annual rainfall',
      'Plant during monsoon season (June-July)',
      'Maintain 2-5cm water level in fields'
    ],
    currentAdvice: 'Good weather for rice cultivation. Maintain proper water levels.',
    status: 'favorable'
  },
  {
    crop: 'Wheat',
    season: 'Rabi',
    tips: [
      'Ideal temperature: 15-25°C',
      'Requires 75-100cm annual rainfall',
      'Sow in October-December',
      'Harvest in March-April'
    ],
    currentAdvice: 'Temperature is getting warm for wheat. Consider early harvest.',
    status: 'caution'
  },
  {
    crop: 'Cotton',
    season: 'Kharif',
    tips: [
      'Ideal temperature: 21-30°C',
      'Requires 50-100cm rainfall',
      'Plant in April-June',
      'Needs 180-200 frost-free days'
    ],
    currentAdvice: 'Perfect conditions for cotton planting. Prepare your fields.',
    status: 'favorable'
  }
];

function WeatherGuide() {
  const [activeTab, setActiveTab] = useState('current');
  const [selectedCrop, setSelectedCrop] = useState(cultivationTips[0]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'favorable': return 'text-green-600 bg-green-50 border-green-200';
      case 'caution': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'warning': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return Sun;
      case 'cloudy': case 'partly cloudy': return Cloud;
      case 'rainy': return CloudRain;
      case 'snowy': return CloudSnow;
      default: return Sun;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Weather & Cultivation Guide</h1>
          <p className="text-xl text-gray-600">Real-time weather data and farming recommendations</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {['current', 'forecast', 'cultivation'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Current Weather */}
        {activeTab === 'current' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Main Weather Card */}
            <div className="bg-gradient-to-br from-sky-400 to-sky-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sky-100">{weatherData.current.location}</span>
                  </div>
                  <div className="text-6xl font-bold mb-2">{weatherData.current.temperature}°C</div>
                  <div className="text-xl text-sky-100">{weatherData.current.condition}</div>
                  <div className="text-sky-100">Feels like {weatherData.current.feelsLike}°C</div>
                </div>
                <div className="text-right">
                  <Sun className="w-24 h-24 text-yellow-300 mb-4" />
                  <div className="text-sky-100">UV Index: {weatherData.current.uvIndex}</div>
                </div>
              </div>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Droplets, label: 'Humidity', value: `${weatherData.current.humidity}%`, color: 'text-blue-600' },
                { icon: Wind, label: 'Wind Speed', value: `${weatherData.current.windSpeed} km/h`, color: 'text-gray-600' },
                { icon: Eye, label: 'Visibility', value: `${weatherData.current.visibility} km`, color: 'text-green-600' },
                { icon: Compass, label: 'Pressure', value: `${weatherData.current.pressure} hPa`, color: 'text-purple-600' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                  <div className="text-2xl font-bold text-gray-800 mb-1">{item.value}</div>
                  <div className="text-gray-600">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Hourly Forecast */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Hourly Forecast</h3>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {weatherData.hourly.map((hour, index) => (
                  <div key={index} className="flex-shrink-0 text-center p-4 bg-gray-50 rounded-xl min-w-[100px]">
                    <div className="text-sm text-gray-600 mb-2">{hour.time}</div>
                    <hour.icon className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                    <div className="font-semibold text-gray-800">{hour.temp}°C</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 7-Day Forecast */}
        {activeTab === 'forecast' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">7-Day Forecast</h3>
            <div className="space-y-4">
              {weatherData.forecast.map((day, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <day.icon className="w-10 h-10 text-sky-500" />
                    <div>
                      <div className="font-semibold text-gray-800">{day.day}</div>
                      <div className="text-sm text-gray-600">{day.date}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-800">{day.temp}</div>
                    <div className="text-sm text-gray-600">{day.low}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{day.condition}</div>
                    <div className="text-sm text-blue-600">{day.precipitation}% rain</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Cultivation Guide */}
        {activeTab === 'cultivation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Crop Selection */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Select Crop for Guidance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cultivationTips.map((crop, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCrop(crop)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedCrop.crop === crop.crop
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <Leaf className="w-8 h-8 text-green-600 mb-2" />
                    <div className="font-semibold text-gray-800">{crop.crop}</div>
                    <div className="text-sm text-gray-600">{crop.season} Season</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Crop Details */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{selectedCrop.crop} Cultivation Guide</h3>
                <span className={`px-4 py-2 rounded-xl border font-semibold ${getStatusColor(selectedCrop.status)}`}>
                  {selectedCrop.status.charAt(0).toUpperCase() + selectedCrop.status.slice(1)}
                </span>
              </div>

              {/* Current Weather Advice */}
              <div className={`p-4 rounded-2xl border mb-6 ${getStatusColor(selectedCrop.status)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Current Weather Advice</span>
                </div>
                <p>{selectedCrop.currentAdvice}</p>
              </div>

              {/* Cultivation Tips */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">General Cultivation Tips</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCrop.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weather Impact Analysis */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Weather Impact Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Favorable Conditions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Temperature within optimal range</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Good humidity levels for growth</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Potential Risks</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-yellow-600">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Rain expected in 2 days</span>
                    </div>
                    <div className="flex items-center space-x-2 text-yellow-600">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Monitor for pest activity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default WeatherGuide;