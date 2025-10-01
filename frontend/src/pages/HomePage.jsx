// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { 
//   Cloud, 
//   Leaf, 
//   MessageCircle, 
//   TrendingUp, 
//   Sun, 
//   CloudRain, 
//   ThermometerSun,
//   Mic,
//   Send,
//   Camera,
//   Upload,
//   DollarSign,
//   ArrowUp,
//   ArrowDown
// } from 'lucide-react';

// const features = [
//   {
//     id: 'weather',
//     title: 'Weather & Cultivation Guide',
//     icon: Cloud,
//     color: 'from-sky-400 to-sky-500',
//     description: 'Get real-time weather updates and personalized cultivation advice for your crops.',
//     bgGradient: 'from-sky-50 to-blue-50'
//   },
//   {
//     id: 'disease',
//     title: 'Crop Disease Detection',
//     icon: Leaf,
//     color: 'from-green-400 to-green-500',
//     description: 'Identify plant diseases early using AI-powered image analysis and get treatment recommendations.',
//     bgGradient: 'from-green-50 to-emerald-50'
//   },
//   {
//     id: 'chatbot',
//     title: 'AI Chatbot Assistant',
//     icon: MessageCircle,
//     color: 'from-purple-400 to-purple-500',
//     description: 'Chat with our AI assistant for instant farming advice, tips, and answers to your questions.',
//     bgGradient: 'from-purple-50 to-violet-50'
//   },
//   {
//     id: 'market',
//     title: 'Market Price Updates',
//     icon: TrendingUp,
//     color: 'from-orange-400 to-orange-500',
//     description: 'Stay updated with real-time market prices and trends to make informed selling decisions.',
//     bgGradient: 'from-orange-50 to-amber-50'
//   }
// ];

// const weatherData = {
//   current: { temp: 28, condition: 'Sunny', humidity: 65, windSpeed: 12 },
//   forecast: [
//     { day: 'Today', temp: '28°C', condition: 'Sunny', icon: Sun },
//     { day: 'Tomorrow', temp: '26°C', condition: 'Cloudy', icon: Cloud },
//     { day: 'Wed', temp: '24°C', condition: 'Rainy', icon: CloudRain },
//   ]
// };

// const marketData = [
//   { crop: 'Rice', price: '₹2,850', change: '+5.2%', trend: 'up' },
//   { crop: 'Wheat', price: '₹2,120', change: '-2.1%', trend: 'down' },
//   { crop: 'Cotton', price: '₹5,640', change: '+8.7%', trend: 'up' },
//   { crop: 'Sugarcane', price: '₹3,200', change: '+1.5%', trend: 'up' },
// ];

// function HomePage() {
//   const navigate = useNavigate();
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [chatMessage, setChatMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([
//     { type: 'bot', message: 'Hello! I\'m your AI farming assistant. How can I help you today?' }
//   ]);

//   const handleSendMessage = () => {
//     if (!chatMessage.trim()) return;
    
//     setChatHistory([
//       ...chatHistory,
//       { type: 'user', message: chatMessage },
//       { type: 'bot', message: 'Thank you for your question! Based on your query, I recommend checking soil moisture levels and considering organic fertilizers for better crop yield.' }
//     ]);
//     setChatMessage('');
//   };

//   const handleFeatureClick = (featureId) => {
//     switch (featureId) {
//       case 'weather':
//         navigate('/weather');
//         break;
//       case 'disease':
//         navigate('/disease-detection');
//         break;
//       case 'chatbot':
//         navigate('/chatbot');
//         break;
//       case 'market':
//         navigate('/market-prices');
//         break;
//       default:
//         setActiveFeature(features.find(f => f.id === featureId));
//     }
//   };
//   const FeatureModal = ({ feature, onClose }) => (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.8, opacity: 0 }}
//         className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center space-x-4 mb-6">
//           <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
//             <feature.icon className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">{feature.title}</h2>
//         </div>

//         {feature.id === 'weather' && (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-sky-400 to-sky-500 rounded-2xl p-6 text-white">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold">Current Weather</h3>
//                 <ThermometerSun className="w-8 h-8" />
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-center">
//                 <div>
//                   <div className="text-3xl font-bold">{weatherData.current.temp}°C</div>
//                   <div className="text-sky-100">{weatherData.current.condition}</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold">{weatherData.current.humidity}%</div>
//                   <div className="text-sky-100">Humidity</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</div>
//                   <div className="text-sky-100">Wind Speed</div>
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-3 gap-4">
//               {weatherData.forecast.map((day, index) => (
//                 <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
//                   <day.icon className="w-8 h-8 mx-auto mb-2 text-sky-500" />
//                   <div className="font-semibold">{day.day}</div>
//                   <div className="text-gray-600">{day.temp}</div>
//                   <div className="text-sm text-gray-500">{day.condition}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {feature.id === 'disease' && (
//           <div className="space-y-6">
//             <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
//               <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//               <h3 className="text-xl font-semibold mb-2">Upload Plant Image</h3>
//               <p className="text-gray-600 mb-4">Take a photo or upload an image of your plant for disease detection</p>
//               <div className="flex justify-center space-x-4">
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
//                   <Camera className="w-5 h-5" />
//                   <span>Take Photo</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors">
//                   <Upload className="w-5 h-5" />
//                   <span>Upload Image</span>
//                 </button>
//               </div>
//             </div>
//             <div className="bg-green-50 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold mb-3 text-green-800">Recent Analysis</h3>
//               <div className="space-y-3">
//                 <div className="bg-white rounded-xl p-4">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">Tomato Plant - Healthy</span>
//                     <span className="text-green-600 font-semibold">95% Confidence</span>
//                   </div>
//                 </div>
//                 <div className="bg-white rounded-xl p-4">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">Rice Plant - Leaf Blight</span>
//                     <span className="text-red-600 font-semibold">88% Confidence</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {feature.id === 'chatbot' && (
//           <div className="space-y-4">
//             <div className="bg-gray-50 rounded-2xl p-4 h-96 overflow-y-auto">
//               {chatHistory.map((chat, index) => (
//                 <div key={index} className={`mb-4 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
//                   <div className={`inline-block px-4 py-2 rounded-2xl max-w-xs ${
//                     chat.type === 'user' 
//                       ? 'bg-purple-500 text-white' 
//                       : 'bg-white border border-gray-200 text-gray-800'
//                   }`}>
//                     {chat.message}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 placeholder="Ask me anything about farming..."
//                 className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               />
//               <button className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors">
//                 <Mic className="w-5 h-5" />
//               </button>
//               <button 
//                 onClick={handleSendMessage}
//                 className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         )}

//         {feature.id === 'market' && (
//           <div className="space-y-6">
//             <div className="grid gap-4">
//               {marketData.map((item, index) => (
//                 <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
//                       <DollarSign className="w-6 h-6 text-orange-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg">{item.crop}</h3>
//                       <p className="text-2xl font-bold text-gray-800">{item.price}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className={`flex items-center space-x-1 ${
//                       item.trend === 'up' ? 'text-green-600' : 'text-red-600'
//                     }`}>
//                       {item.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
//                       <span className="font-semibold">{item.change}</span>
//                     </div>
//                     <p className="text-sm text-gray-500">Today</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             Welcome to Your Farm Dashboard
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Access all the tools you need to optimize your farming operations in one place
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.id}
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -8, scale: 1.02 }}
//               className={`group bg-gradient-to-br ${feature.bgGradient} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50`}
//               onClick={() => handleFeatureClick(feature.id)}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.1, rotate: 5 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//                 className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl shadow-xl mb-6 group-hover:shadow-2xl transition-shadow duration-300`}
//               >
//                 <feature.icon className="w-10 h-10 text-white" />
//               </motion.div>
              
//               <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">
//                 {feature.title}
//               </h3>
              
//               <p className="text-gray-600 leading-relaxed mb-6">
//                 {feature.description}
//               </p>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`px-6 py-3 bg-gradient-to-r ${feature.color} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
//               >
//                 Explore Feature
//               </motion.button>
//             </motion.div>
//           ))}
//         </div>

//         {/* Quick Stats */}
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="mt-16 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-white/50"
//         >
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Today's Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-sky-600 mb-2">28°C</div>
//               <div className="text-gray-600">Current Temperature</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
//               <div className="text-gray-600">Soil Moisture</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-orange-600 mb-2">₹2,850</div>
//               <div className="text-gray-600">Rice Price</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
//               <div className="text-gray-600">Active Alerts</div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {activeFeature && (
//           <FeatureModal 
//             feature={activeFeature} 
//             onClose={() => setActiveFeature(null)} 
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default HomePage;




// src/pages/HomePage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, 
  Leaf, 
  MessageCircle, 
  TrendingUp, 
  Sun, 
  CloudRain, 
  ThermometerSun,
  Mic,
  Send,
  Camera,
  Upload,
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation'; // ✅ Translation Hook

function HomePage() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: "Hello! I'm your AI farming assistant. How can I help you today?" }
  ]);

  // ✅ Translation Keys
  const { t, isLoading } = useTranslation({
    welcomeTitle: 'Welcome to Your Farm Dashboard',
    welcomeDesc: 'Access all the tools you need to optimize your farming operations in one place',
    weatherTitle: 'Weather & Cultivation Guide',
    weatherDesc: 'Get real-time weather updates and personalized cultivation advice for your crops.',
    diseaseTitle: 'Crop Disease Detection',
    diseaseDesc: 'Identify plant diseases early using AI-powered image analysis and get treatment recommendations.',
    chatbotTitle: 'AI Chatbot Assistant',
    chatbotDesc: 'Chat with our AI assistant for instant farming advice, tips, and answers to your questions.',
    marketTitle: 'Market Price Updates',
    marketDesc: 'Stay updated with real-time market prices and trends to make informed selling decisions.',
    exploreBtn: 'Explore Feature',
    todayOverview: "Today's Overview",
    currentTemp: 'Current Temperature',
    soilMoisture: 'Soil Moisture',
    ricePrice: 'Rice Price',
    activeAlerts: 'Active Alerts',
    uploadImage: 'Upload Plant Image',
    recentAnalysis: 'Recent Analysis'
  });

  // ✅ Features with Translation
  const features = [
    {
      id: 'weather',
      title: t.weatherTitle || 'Weather & Cultivation Guide',
      icon: Cloud,
      color: 'from-sky-400 to-sky-500',
      description: t.weatherDesc || 'Get real-time weather updates...',
      bgGradient: 'from-sky-50 to-blue-50'
    },
    {
      id: 'disease',
      title: t.diseaseTitle || 'Crop Disease Detection',
      icon: Leaf,
      color: 'from-green-400 to-green-500',
      description: t.diseaseDesc || 'Identify plant diseases early...',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      id: 'chatbot',
      title: t.chatbotTitle || 'AI Chatbot Assistant',
      icon: MessageCircle,
      color: 'from-purple-400 to-purple-500',
      description: t.chatbotDesc || 'Chat with our AI assistant...',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    {
      id: 'market',
      title: t.marketTitle || 'Market Price Updates',
      icon: TrendingUp,
      color: 'from-orange-400 to-orange-500',
      description: t.marketDesc || 'Stay updated with real-time market prices...',
      bgGradient: 'from-orange-50 to-amber-50'
    }
  ];

  // ✅ Weather + Market Data
  const weatherData = {
    current: { temp: 28, condition: 'Sunny', humidity: 65, windSpeed: 12 },
    forecast: [
      { day: 'Today', temp: '28°C', condition: 'Sunny', icon: Sun },
      { day: 'Tomorrow', temp: '26°C', condition: 'Cloudy', icon: Cloud },
      { day: 'Wed', temp: '24°C', condition: 'Rainy', icon: CloudRain },
    ]
  };

  const marketData = [
    { crop: 'Rice', price: '₹2,850', change: '+5.2%', trend: 'up' },
    { crop: 'Wheat', price: '₹2,120', change: '-2.1%', trend: 'down' },
    { crop: 'Cotton', price: '₹5,640', change: '+8.7%', trend: 'up' },
    { crop: 'Sugarcane', price: '₹3,200', change: '+1.5%', trend: 'up' },
  ];

  // ✅ Chatbot Handler
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatHistory([
      ...chatHistory,
      { type: 'user', message: chatMessage },
      { type: 'bot', message: "Thank you! Based on your query, check soil moisture and try organic fertilizers." }
    ]);
    setChatMessage('');
  };

  // ✅ Feature Navigation
  const handleFeatureClick = (featureId) => {
    switch (featureId) {
      case 'weather': navigate('/weather'); break;
      case 'disease': navigate('/disease-detection'); break;
      case 'chatbot': navigate('/chatbot'); break;
      case 'market': navigate('/market-prices'); break;
      default: setActiveFeature(features.find(f => f.id === featureId));
    }
  };

  // ✅ Feature Modal
  const FeatureModal = ({ feature, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
            <feature.icon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{feature.title}</h2>
        </div>

        {/* Weather */}
        {feature.id === 'weather' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-sky-400 to-sky-500 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Current Weather</h3>
                <ThermometerSun className="w-8 h-8" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div><div className="text-3xl font-bold">{weatherData.current.temp}°C</div><div>{weatherData.current.condition}</div></div>
                <div><div className="text-2xl font-bold">{weatherData.current.humidity}%</div><div>Humidity</div></div>
                <div><div className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</div><div>Wind Speed</div></div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                  <day.icon className="w-8 h-8 mx-auto mb-2 text-sky-500" />
                  <div className="font-semibold">{day.day}</div>
                  <div className="text-gray-600">{day.temp}</div>
                  <div className="text-sm text-gray-500">{day.condition}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Disease */}
        {feature.id === 'disease' && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">{t.uploadImage}</h3>
              <p className="text-gray-600 mb-4">Take a photo or upload an image of your plant</p>
              <div className="flex justify-center space-x-4">
                <button className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600">
                  <Camera className="w-5 h-5" /><span>Take Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600">
                  <Upload className="w-5 h-5" /><span>Upload Image</span>
                </button>
              </div>
            </div>
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-3 text-green-800">{t.recentAnalysis}</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 flex justify-between"><span>Tomato Plant - Healthy</span><span className="text-green-600 font-semibold">95%</span></div>
                <div className="bg-white rounded-xl p-4 flex justify-between"><span>Rice Plant - Leaf Blight</span><span className="text-red-600 font-semibold">88%</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Chatbot */}
        {feature.id === 'chatbot' && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-4 h-96 overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-4 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-4 py-2 rounded-2xl max-w-xs ${chat.type === 'user' ? 'bg-purple-500 text-white' : 'bg-white border text-gray-800'}`}>
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask me anything about farming..."
                className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600"><Mic className="w-5 h-5" /></button>
              <button onClick={handleSendMessage} className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600"><Send className="w-5 h-5" /></button>
            </div>
          </div>
        )}

        {/* Market */}
        {feature.id === 'market' && (
          <div className="space-y-6">
            {marketData.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                  <div><h3 className="font-semibold">{item.crop}</h3><p className="text-2xl font-bold">{item.price}</p></div>
                </div>
                <div className={`flex items-center space-x-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}<span>{item.change}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t.welcomeTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.welcomeDesc}</p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group bg-gradient-to-br ${feature.bgGradient} p-8 rounded-3xl shadow-lg cursor-pointer`}
              onClick={() => handleFeatureClick(feature.id)}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className={`inline-flex w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl mb-6 items-center justify-center`}>
                <feature.icon className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl shadow-lg">
                {t.exploreBtn}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 bg-white/70 rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.todayOverview}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold text-primary-600 mb-2">28°C</div><div>{t.currentTemp}</div></div>
            <div><div className="text-3xl font-bold text-secondary-600 mb-2">85%</div><div>{t.soilMoisture}</div></div>
            <div><div className="text-3xl font-bold text-accent-600 mb-2">₹2,850</div><div>{t.ricePrice}</div></div>
            <div><div className="text-3xl font-bold text-primary-700 mb-2">12</div><div>{t.activeAlerts}</div></div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeFeature && <FeatureModal feature={activeFeature} onClose={() => setActiveFeature(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default HomePage;
