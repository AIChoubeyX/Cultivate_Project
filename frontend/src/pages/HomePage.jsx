


// // src/pages/HomePage.jsx
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
//   ArrowDown,
//   User,
//   MapPin,
//   Phone,
//   Crop
// } from 'lucide-react';
// import { useTranslation } from '../hooks/useTranslation';
// import { useAuth } from '../context/AuthContext';


// function HomePage() {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [activeFeature, setActiveFeature] = useState(null);
//   const [chatMessage, setChatMessage] = useState('');
//   const [chatHistory, setChatHistory] = useState([
//     { type: 'bot', message: "Hello! I'm your AI farming assistant. How can I help you today?" }
//   ]);

//   // ✅ Translation Keys
//   const { t, isLoading } = useTranslation({
//     welcomeTitle: 'Welcome to Your Farm Dashboard',
//     welcomeDesc: 'Access all the tools you need to optimize your farming operations in one place',
//     weatherTitle: 'Weather & Cultivation Guide',
//     weatherDesc: 'Get real-time weather updates and personalized cultivation advice for your crops.',
//     diseaseTitle: 'Crop Disease Detection',
//     diseaseDesc: 'Identify plant diseases early using AI-powered image analysis and get treatment recommendations.',
//     chatbotTitle: 'AI Chatbot Assistant',
//     chatbotDesc: 'Chat with our AI assistant for instant farming advice, tips, and answers to your questions.',
//     marketTitle: 'Market Price Updates',
//     marketDesc: 'Stay updated with real-time market prices and trends to make informed selling decisions.',
//     exploreBtn: 'Explore Feature',
//     todayOverview: "Today's Overview",
//     currentTemp: 'Current Temperature',
//     soilMoisture: 'Soil Moisture',
//     ricePrice: 'Rice Price',
//     activeAlerts: 'Active Alerts',
//     uploadImage: 'Upload Plant Image',
//     recentAnalysis: 'Recent Analysis'
//   });

//   // ✅ Features with Translation
//   const features = [
//     {
//       id: 'weather',
//       title: t.weatherTitle || 'Weather & Cultivation Guide',
//       icon: Cloud,
//       color: 'from-sky-400 to-sky-500',
//       description: t.weatherDesc || 'Get real-time weather updates...',
//       bgGradient: 'from-sky-50 to-blue-50'
//     },
//     {
//       id: 'disease',
//       title: t.diseaseTitle || 'Crop Disease Detection',
//       icon: Leaf,
//       color: 'from-green-400 to-green-500',
//       description: t.diseaseDesc || 'Identify plant diseases early...',
//       bgGradient: 'from-green-50 to-emerald-50'
//     },
//     {
//       id: 'chatbot',
//       title: t.chatbotTitle || 'AI Chatbot Assistant',
//       icon: MessageCircle,
//       color: 'from-purple-400 to-purple-500',
//       description: t.chatbotDesc || 'Chat with our AI assistant...',
//       bgGradient: 'from-purple-50 to-violet-50'
//     },
//     {
//       id: 'market',
//       title: t.marketTitle || 'Market Price Updates',
//       icon: TrendingUp,
//       color: 'from-orange-400 to-orange-500',
//       description: t.marketDesc || 'Stay updated with real-time market prices...',
//       bgGradient: 'from-orange-50 to-amber-50'
//     }
//   ];

//   // ✅ Weather + Market Data
//   const weatherData = {
//     current: { temp: 28, condition: 'Sunny', humidity: 65, windSpeed: 12 },
//     forecast: [
//       { day: 'Today', temp: '28°C', condition: 'Sunny', icon: Sun },
//       { day: 'Tomorrow', temp: '26°C', condition: 'Cloudy', icon: Cloud },
//       { day: 'Wed', temp: '24°C', condition: 'Rainy', icon: CloudRain },
//     ]
//   };

//   const marketData = [
//     { crop: 'Rice', price: '₹2,850', change: '+5.2%', trend: 'up' },
//     { crop: 'Wheat', price: '₹2,120', change: '-2.1%', trend: 'down' },
//     { crop: 'Cotton', price: '₹5,640', change: '+8.7%', trend: 'up' },
//     { crop: 'Sugarcane', price: '₹3,200', change: '+1.5%', trend: 'up' },
//   ];

//   // ✅ Chatbot Handler
//   const handleSendMessage = () => {
//     if (!chatMessage.trim()) return;
//     setChatHistory([
//       ...chatHistory,
//       { type: 'user', message: chatMessage },
//       { type: 'bot', message: "Thank you! Based on your query, check soil moisture and try organic fertilizers." }
//     ]);
//     setChatMessage('');
//   };

//   // ✅ Feature Navigation
//   const handleFeatureClick = (featureId) => {
//     switch (featureId) {
//       case 'weather': navigate('/weather'); break;
//       case 'disease': navigate('/disease-detection'); break;
//       case 'chatbot': navigate('/chatbot'); break;
//       case 'market': navigate('/market-prices'); break;
//       default: setActiveFeature(features.find(f => f.id === featureId));
//     }
//   };

//   // ✅ Feature Modal
//   const FeatureModal = ({ feature, onClose }) => (
//     <motion.div
//       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <motion.div
//         initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
//         className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-center space-x-4 mb-6">
//           <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center`}>
//             <feature.icon className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">{feature.title}</h2>
//         </div>

//         {/* Weather */}
//         {feature.id === 'weather' && (
//           <div className="space-y-6">
//             <div className="bg-gradient-to-r from-sky-400 to-sky-500 rounded-2xl p-6 text-white">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold">Current Weather</h3>
//                 <ThermometerSun className="w-8 h-8" />
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-center">
//                 <div><div className="text-3xl font-bold">{weatherData.current.temp}°C</div><div>{weatherData.current.condition}</div></div>
//                 <div><div className="text-2xl font-bold">{weatherData.current.humidity}%</div><div>Humidity</div></div>
//                 <div><div className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</div><div>Wind Speed</div></div>
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

//         {/* Disease */}
//         {feature.id === 'disease' && (
//           <div className="space-y-6">
//             <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center">
//               <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//               <h3 className="text-xl font-semibold mb-2">{t.uploadImage}</h3>
//               <p className="text-gray-600 mb-4">Take a photo or upload an image of your plant</p>
//               <div className="flex justify-center space-x-4">
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600">
//                   <Camera className="w-5 h-5" /><span>Take Photo</span>
//                 </button>
//                 <button className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600">
//                   <Upload className="w-5 h-5" /><span>Upload Image</span>
//                 </button>
//               </div>
//             </div>
//             <div className="bg-green-50 rounded-2xl p-6">
//               <h3 className="text-lg font-semibold mb-3 text-green-800">{t.recentAnalysis}</h3>
//               <div className="space-y-3">
//                 <div className="bg-white rounded-xl p-4 flex justify-between"><span>Tomato Plant - Healthy</span><span className="text-green-600 font-semibold">95%</span></div>
//                 <div className="bg-white rounded-xl p-4 flex justify-between"><span>Rice Plant - Leaf Blight</span><span className="text-red-600 font-semibold">88%</span></div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Chatbot */}
//         {feature.id === 'chatbot' && (
//           <div className="space-y-4">
//             <div className="bg-gray-50 rounded-2xl p-4 h-96 overflow-y-auto">
//               {chatHistory.map((chat, index) => (
//                 <div key={index} className={`mb-4 ${chat.type === 'user' ? 'text-right' : 'text-left'}`}>
//                   <div className={`inline-block px-4 py-2 rounded-2xl max-w-xs ${chat.type === 'user' ? 'bg-purple-500 text-white' : 'bg-white border text-gray-800'}`}>
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
//                 className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               />
//               <button className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600"><Mic className="w-5 h-5" /></button>
//               <button onClick={handleSendMessage} className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600"><Send className="w-5 h-5" /></button>
//             </div>
//           </div>
//         )}

//         {/* Market */}
//         {feature.id === 'market' && (
//           <div className="space-y-6">
//             {marketData.map((item, index) => (
//               <div key={index} className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
//                     <DollarSign className="w-6 h-6 text-orange-600" />
//                   </div>
//                   <div><h3 className="font-semibold">{item.crop}</h3><p className="text-2xl font-bold">{item.price}</p></div>
//                 </div>
//                 <div className={`flex items-center space-x-1 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
//                   {item.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}<span>{item.change}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );

//   // ✅ Main UI
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* ✅ FARMER DASHBOARD - NEW SECTION */}
//         {user && (
//           <motion.div 
//             initial={{ y: -30, opacity: 0 }} 
//             animate={{ y: 0, opacity: 1 }} 
//             transition={{ duration: 0.6 }}
//             className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative"
//           >
//             {/* Background Pattern */}
//             <div className="absolute top-0 right-0 opacity-10">
//               <Crop className="w-64 h-64" />
//             </div>

//             {/* Header */}
//             <div className="relative z-10 mb-6">
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                     <User className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-3xl font-bold">Welcome, {user.name}! 🌾</h2>
//                     <p className="text-green-100">Farmer ID: {user.farmerId}</p>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
//                   <span className="text-sm font-medium">Active Account</span>
//                 </div>
//               </div>
//             </div>

//             {/* Farmer Info Grid */}
//             <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6">
//               {/* Location */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <MapPin className="w-5 h-5 text-green-200" />
//                   <span className="text-sm text-green-200">Location</span>
//                 </div>
//                 <p className="font-semibold text-lg">{user.village}</p>
//                 <p className="text-sm text-green-100">{user.district}, {user.state}</p>
//               </div>

//               {/* Mobile */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <Phone className="w-5 h-5 text-green-200" />
//                   <span className="text-sm text-green-200">Contact</span>
//                 </div>
//                 <p className="font-semibold text-lg">{user.mobile}</p>
//                 <p className="text-sm text-green-100">Registered Mobile</p>
//               </div>

//               {/* Land Size */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <Crop className="w-5 h-5 text-green-200" />
//                   <span className="text-sm text-green-200">Land Size</span>
//                 </div>
//                 <p className="font-semibold text-lg">{user.landSize || '0'} acres</p>
//                 <p className="text-sm text-green-100">Total Farmland</p>
//               </div>

//               {/* Member Since */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <User className="w-5 h-5 text-green-200" />
//                   <span className="text-sm text-green-200">Member Since</span>
//                 </div>
//                 <p className="font-semibold text-lg">
//                   {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Recently'}
//                 </p>
//                 <p className="text-sm text-green-100">Registration Date</p>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Header */}
//         <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t.welcomeTitle}</h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.welcomeDesc}</p>
//         </motion.div>

//         {/* Features */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.id}
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -8, scale: 1.02 }}
//               className={`group bg-gradient-to-br ${feature.bgGradient} p-8 rounded-3xl shadow-lg cursor-pointer`}
//               onClick={() => handleFeatureClick(feature.id)}
//             >
//               <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className={`inline-flex w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl mb-6 items-center justify-center`}>
//                 <feature.icon className="w-10 h-10 text-white" />
//               </motion.div>
//               <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
//               <p className="text-gray-600 mb-6">{feature.description}</p>
//               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-xl shadow-lg">
//                 {t.exploreBtn}
//               </motion.button>
//             </motion.div>
//           ))}
//         </div>

        

        
//         {/* <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-16 bg-white/70 rounded-3xl shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.todayOverview}</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
//             <div><div className="text-3xl font-bold text-primary-600 mb-2">28°C</div><div>{t.currentTemp}</div></div>
//             <div><div className="text-3xl font-bold text-secondary-600 mb-2">85%</div><div>{t.soilMoisture}</div></div>
//             <div><div className="text-3xl font-bold text-accent-600 mb-2">₹2,850</div><div>{t.ricePrice}</div></div>
//             <div><div className="text-3xl font-bold text-primary-700 mb-2">12</div><div>{t.activeAlerts}</div></div>
//           </div>
//         </motion.div> */}
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {activeFeature && <FeatureModal feature={activeFeature} onClose={() => setActiveFeature(null)} />}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default HomePage;
 

// src/pages/HomePage.jsx
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { 
//   User,
//   MapPin,
//   Phone,
//   Crop
// } from 'lucide-react';
// import { useTranslation } from '../hooks/useTranslation';
// import { useAuth } from '../context/AuthContext';
// import FeatureCards from '../components/FeatureCards';

// /**
//  * HomePage Component
//  * Main dashboard displaying farmer info and feature cards with GSAP animation
//  */
// function HomePage() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   // ✅ Translation Keys
//   const { t, isLoading } = useTranslation({
//     welcomeTitle: 'Welcome to Your Farm Dashboard',
//     welcomeDesc: 'Access all the tools you need to optimize your farming operations in one place',
//     todayOverview: "Today's Overview",
//     currentTemp: 'Current Temperature',
//     soilMoisture: 'Soil Moisture',
//     ricePrice: 'Rice Price',
//     activeAlerts: 'Active Alerts'
//   });

//   // ✅ Feature Navigation Handler (passed to FeatureCards)
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
//         break;
//     }
//   };

//   // ✅ Main UI
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* ✅ FARMER DASHBOARD SECTION */}
//         {user && (
//           <motion.div 
//             initial={{ y: -30, opacity: 0 }} 
//             animate={{ y: 0, opacity: 1 }} 
//             transition={{ duration: 0.6 }}
//             className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative"
//           >
//             {/* Background Pattern */}
//             <div className="absolute top-0 right-0 opacity-10">
//               <Crop className="w-64 h-64" />
//             </div>

//             {/* Header */}
//             <div className="relative z-10 mb-6">
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                     <User className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-3xl font-bold">Welcome, {user.name}! 🌾</h2>
//                     <p className="text-green-100">Farmer ID: {user.farmerId}</p>
//                   </div>
//                 </div>
//                 <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
//                   <span className="text-sm font-medium">Active Account</span>
//                 </div>
//               </div>
//             </div>

//             {/* Farmer Info Grid */}
//             <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6">
//               {/* Location */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <MapPin className="w-5 h-5 text-green-200" />
//                   <span className="text-sm text-green-200">Location</span>
//                 </div>
//                 <p className="font-semibold text-lg">{user.village}</p>
//                 <p className="text-sm text-green-100">{user.district}, {user.state}</p>
//               </div>

//               {/* Mobile */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <Phone className="w-5 h-5 text-green-200" />
//                   <span className="text-sm text-green-200">Contact</span>
//                 </div>
//                 <p className="font-semibold text-lg">{user.mobile}</p>
//                 <p className="text-sm text-green-100">Registered Mobile</p>
//               </div>

//               {/* Land Size */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <Crop className="w-5 h-5 text-green-200" />
//                   <span className="text-sm text-green-200">Land Size</span>
//                 </div>
//                 <p className="font-semibold text-lg">{user.landSize || '0'} acres</p>
//                 <p className="text-sm text-green-100">Total Farmland</p>
//               </div>

//               {/* Member Since */}
//               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-all">
//                 <div className="flex items-center space-x-3 mb-2">
//                   <User className="w-5 h-5 text-green-200" />
//                   <span className="text-sm text-green-200">Member Since</span>
//                 </div>
//                 <p className="font-semibold text-lg">
//                   {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'Recently'}
//                 </p>
//                 <p className="text-sm text-green-100">Registration Date</p>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* ✅ HEADER SECTION */}
//         <motion.div 
//           initial={{ y: 30, opacity: 0 }} 
//           animate={{ y: 0, opacity: 1 }} 
//           transition={{ duration: 0.6 }} 
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//             {t.welcomeTitle}
//           </h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             {t.welcomeDesc}
//           </p>
//         </motion.div>

//         {/* ✅ FEATURE CARDS WITH GSAP ANIMATION */}
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <FeatureCards onFeatureClick={handleFeatureClick} />
//         </motion.div>

//         {/* ✅ OPTIONAL: Today's Overview Section (Commented out in original) */}
//         {/* 
//         <motion.div 
//           initial={{ y: 50, opacity: 0 }} 
//           animate={{ y: 0, opacity: 1 }} 
//           transition={{ duration: 0.6, delay: 0.4 }} 
//           className="mt-16 bg-white/70 rounded-3xl shadow-lg p-8"
//         >
//           <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//             {t.todayOverview}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
//             <div>
//               <div className="text-3xl font-bold text-primary-600 mb-2">28°C</div>
//               <div>{t.currentTemp}</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-secondary-600 mb-2">85%</div>
//               <div>{t.soilMoisture}</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-accent-600 mb-2">₹2,850</div>
//               <div>{t.ricePrice}</div>
//             </div>
//             <div>
//               <div className="text-3xl font-bold text-primary-700 mb-2">12</div>
//               <div>{t.activeAlerts}</div>
//             </div>
//           </div>
//         </motion.div>
//         */}
//       </div>
//     </div>
//   );
// }

// export default HomePage;

// src/pages/HomePage.jsx
// Updated to use react-i18next

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ⭐ Import i18n
import { 
  User,
  MapPin,
  Phone,
  Crop
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import FeatureCards from '../components/FeatureCards';
import Links from '../components/Links'; // ⭐ Import Links component
import heroBanner from '../assets/heroImg.jpg'; // ⭐ Import hero banner image
import harvesterImg from '../assets/hero.jpg'; // ⭐ Import harvester image

/**
 * HomePage Component
 * Main dashboard displaying farmer info and feature cards
 */
function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // ⭐ Use i18n hook with 'home' namespace
  const { t, i18n } = useTranslation('home');

  // ✅ Feature Navigation Handler
  const handleFeatureClick = (featureId) => {
    switch (featureId) {
      case 'weather': 
        navigate('/weather'); 
        break;
      case 'disease': 
        navigate('/disease-detection'); 
        break;
      case 'chatbot': 
        navigate('/chatbot'); 
        break;
      case 'market': 
        navigate('/market-prices'); 
        break;
      default: 
        break;
    }
  };

  // Helper function to format date based on language
  const formatDate = (dateString) => {
    if (!dateString) return t('dashboard.recently');
    return new Date(dateString).toLocaleDateString(i18n.language, { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* ✅ FULL SCREEN HERO SECTION WITH BACKGROUND */}
      <div 
        className="relative w-full h-screen min-h-[600px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start px-4 sm:px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
              {t('hero.title')}
            </h1>

            {/* Inspirational Quote */}
            <div className="border-l-4 border-amber-400 pl-4 sm:pl-6 mb-6 sm:mb-8">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-light italic leading-relaxed drop-shadow-lg">
                "{t('hero.quote')}"
              </p>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-light max-w-3xl leading-relaxed drop-shadow-md">
              {t('hero.description')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ✅ MAIN CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* ✅ FARMER DASHBOARD SECTION - REDESIGNED WITH HARVESTER IMAGE */}
        {user && (
          <motion.div 
            initial={{ y: -30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6 }}
            className="mb-12 rounded-3xl shadow-2xl overflow-hidden relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 sm:p-8 lg:p-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* LEFT SIDE - Farmer Details & Info */}
              <div className="relative z-10">
                
                {/* Welcome Header */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-3">
                    {/* <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      
                    </div> */}
                    <div>
                      <h2 className="text-hero-title text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                        {t('dashboard.welcomeFarmer', { name: user.name })}
                      </h2>
                      <p className="text-sm sm:text-base text-amber-700 font-medium mt-1">
                        {t('dashboard.farmerId', { id: user.farmerId })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Active Badge */}
                  <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    {t('dashboard.activeAccount')}
                  </div>
                </div>

                {/* Farmer Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Location Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-amber-100 hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        {t('dashboard.location')}
                      </span>
                    </div>
                    <p className="text-hero-subtitle font-bold text-lg text-gray-800">{user.village}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {user.district}, {user.state}
                    </p>
                  </div>

                  {/* Contact Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-amber-100 hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        {t('dashboard.contact')}
                      </span>
                    </div>
                    <p className="text-hero-subtitle font-bold text-lg text-gray-800">{user.mobile}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('dashboard.registeredMobile')}
                    </p>
                  </div>

                  {/* Land Size Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-amber-100 hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Crop className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        {t('dashboard.landSize')}
                      </span>
                    </div>
                    <p className="text-hero-subtitle font-bold text-lg text-gray-800">
                      {user.landSize || '0'} {t('dashboard.acres')}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('dashboard.totalFarmland')}
                    </p>
                  </div>

                  {/* Member Since Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-amber-100 hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        {t('dashboard.memberSince')}
                      </span>
                    </div>
                    <p className="text-hero-subtitle font-bold text-lg text-gray-800">
                      {formatDate(user.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {t('dashboard.registrationDate')}
                    </p>
                  </div>
                </div>

                {/* Decorative Bottom Text */}
                <div className="mt-6 pt-4 border-t border-amber-200">
                  <p className="text-center sm:text-left text-sm text-gray-600 italic">
                    "Modern farming meets tradition"
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE - Harvester Sticker Image */}
              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="w-full max-w-[400px] lg:max-w-[500px]">
                  <img 
                    src={harvesterImg} 
                    alt="Modern Farming Harvester" 
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ✅ SECTION TITLE */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {t('dashboard.welcomeDesc')}
          </h1>
        </motion.div>

        {/* ✅ FEATURE CARDS */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FeatureCards onFeatureClick={handleFeatureClick} />
        </motion.div>

        {/* ✅ OPTIONAL: Today's Overview Section */}
        {/* 
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.6, delay: 0.4 }} 
          className="mt-16 bg-white/70 rounded-3xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t('overview.todayOverview')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">28°C</div>
              <div>{t('overview.currentTemp')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-600 mb-2">85%</div>
              <div>{t('overview.soilMoisture')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-600 mb-2">₹2,850</div>
              <div>{t('overview.ricePrice')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-700 mb-2">12</div>
              <div>{t('overview.activeAlerts')}</div>
            </div>
          </div>
        </motion.div>
        */}
      </div>

      {/* ✅ AGRICULTURAL LINKS SECTION */}
      <Links />
    </div>
  );
}

export default HomePage;
