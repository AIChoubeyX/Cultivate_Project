// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Send, 
//   Mic, 
//   MicOff, 
//   Volume2, 
//   VolumeX, 
//   Bot, 
//   User, 
//   Leaf, 
//   Sun, 
//   Droplets,
//   TrendingUp,
//   Camera,
//   MapPin,
//   Calendar,
//   Lightbulb,
//   BookOpen,
//   Settings
// } from 'lucide-react';

// const quickQuestions = [
//   {
//     icon: Sun,
//     text: "What's the best time to plant rice?",
//     category: "Planting"
//   },
//   {
//     icon: Droplets,
//     text: "How much water does wheat need?",
//     category: "Irrigation"
//   },
//   {
//     icon: Leaf,
//     text: "My tomato leaves are yellowing, what should I do?",
//     category: "Disease"
//   },
//   {
//     icon: TrendingUp,
//     text: "What are today's market prices for cotton?",
//     category: "Market"
//   },
//   {
//     icon: Camera,
//     text: "Can you identify this pest in my crop?",
//     category: "Pest Control"
//   },
//   {
//     icon: MapPin,
//     text: "What crops grow best in my region?",
//     category: "Regional"
//   }
// ];

// const botResponses = {
//   greeting: [
//     "Hello! I'm your AI farming assistant. How can I help you today?",
//     "Welcome! I'm here to help with all your farming questions.",
//     "Hi there! Ready to discuss farming? What would you like to know?"
//   ],
//   planting: [
//     "For rice planting, the ideal time is during the monsoon season (June-July) when there's adequate rainfall. The temperature should be between 20-35°C for optimal growth.",
//     "Rice requires specific conditions for planting. I recommend preparing your fields during May and transplanting seedlings in June when monsoon arrives."
//   ],
//   irrigation: [
//     "Wheat typically needs 450-650mm of water throughout its growing season. During the grain filling stage, it requires about 5-7mm per day.",
//     "For wheat irrigation, maintain soil moisture at 50-70% field capacity. Water stress during flowering can significantly reduce yield."
//   ],
//   disease: [
//     "Yellowing tomato leaves could indicate several issues: nitrogen deficiency, overwatering, or early blight. Check soil drainage and consider a balanced fertilizer application.",
//     "Yellow leaves on tomatoes often suggest nutrient deficiency or disease. I recommend soil testing and ensuring proper spacing for air circulation."
//   ],
//   market: [
//     "Current cotton prices are showing an upward trend at ₹5,640 per quintal, up 8.7% from last week. This is a good time to consider selling if you have quality produce.",
//     "Cotton market is performing well this season. Prices have increased due to good export demand and reduced supply from competing regions."
//   ],
//   pest: [
//     "I'd be happy to help identify pests! Please upload a clear image of the affected plant or pest. Common signs include holes in leaves, discoloration, or visible insects.",
//     "For pest identification, I need a good quality image. Look for signs like chewed leaves, webbing, or small insects on the undersides of leaves."
//   ],
//   regional: [
//     "Your region's climate and soil type determine the best crops. Generally, rice and wheat do well in northern plains, while cotton and sugarcane thrive in western regions.",
//     "Regional crop selection depends on rainfall, temperature, and soil conditions. I can provide specific recommendations if you share your location details."
//   ],
//   default: [
//     "That's an interesting question! Could you provide more details so I can give you the most accurate advice?",
//     "I'd love to help with that. Can you share more context about your specific situation?",
//     "Great question! Let me think about the best way to address this farming concern."
//   ]
// };

// function AIChatbot() {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'bot',
//       message: "Hello! I'm your AI farming assistant. I can help you with crop cultivation, disease identification, weather advice, market prices, and much more. How can I assist you today?",
//       timestamp: new Date()
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isListening, setIsListening] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const getBotResponse = (userMessage) => {
//     const message = userMessage.toLowerCase();
    
//     if (message.includes('plant') || message.includes('sow') || message.includes('seed')) {
//       return botResponses.planting[Math.floor(Math.random() * botResponses.planting.length)];
//     } else if (message.includes('water') || message.includes('irrigation') || message.includes('drought')) {
//       return botResponses.irrigation[Math.floor(Math.random() * botResponses.irrigation.length)];
//     } else if (message.includes('yellow') || message.includes('disease') || message.includes('sick') || message.includes('problem')) {
//       return botResponses.disease[Math.floor(Math.random() * botResponses.disease.length)];
//     } else if (message.includes('price') || message.includes('market') || message.includes('sell') || message.includes('cost')) {
//       return botResponses.market[Math.floor(Math.random() * botResponses.market.length)];
//     } else if (message.includes('pest') || message.includes('insect') || message.includes('bug') || message.includes('identify')) {
//       return botResponses.pest[Math.floor(Math.random() * botResponses.pest.length)];
//     } else if (message.includes('region') || message.includes('area') || message.includes('location') || message.includes('climate')) {
//       return botResponses.regional[Math.floor(Math.random() * botResponses.regional.length)];
//     } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
//       return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
//     } else {
//       return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
//     }
//   };

//   const handleSendMessage = () => {
//     if (!inputMessage.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       message: inputMessage,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');
//     setIsTyping(true);

//     // Simulate bot typing delay
//     setTimeout(() => {
//       const botMessage = {
//         id: Date.now() + 1,
//         type: 'bot',
//         message: getBotResponse(inputMessage),
//         timestamp: new Date()
//       };
      
//       setMessages(prev => [...prev, botMessage]);
//       setIsTyping(false);
//     }, 1500 + Math.random() * 1000);
//   };

//   const handleQuickQuestion = (question) => {
//     setInputMessage(question);
//     inputRef.current?.focus();
//   };

//   const handleVoiceInput = () => {
//     if (!isListening) {
//       setIsListening(true);
//       // Simulate voice recognition
//       setTimeout(() => {
//         setIsListening(false);
//         setInputMessage("What's the best fertilizer for my wheat crop?");
//       }, 3000);
//     } else {
//       setIsListening(false);
//     }
//   };

//   const handleTextToSpeech = (message) => {
//     if (!isSpeaking) {
//       setIsSpeaking(true);
//       // Simulate text-to-speech
//       setTimeout(() => {
//         setIsSpeaking(false);
//       }, 3000);
//     } else {
//       setIsSpeaking(false);
//     }
//   };

//   const formatTime = (timestamp) => {
//     return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col">
//       {/* Header */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 shadow-sm"
//       >
//         <div className="max-w-4xl mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
//               <Bot className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">AI Farming Assistant</h1>
//               <p className="text-gray-600">Your intelligent farming companion</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
//               <Settings className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Quick Questions */}
//       <div className="bg-white/50 border-b border-gray-100 p-4">
//         <div className="max-w-4xl mx-auto">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Questions</h3>
//           <div className="flex space-x-3 overflow-x-auto pb-2">
//             {quickQuestions.map((question, index) => (
//               <motion.button
//                 key={index}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 onClick={() => handleQuickQuestion(question.text)}
//                 className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-sm"
//               >
//                 <question.icon className="w-4 h-4 text-purple-600" />
//                 <span className="text-gray-700 whitespace-nowrap">{question.category}</span>
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-6">
//         <div className="max-w-4xl mx-auto space-y-6">
//           <AnimatePresence>
//             {messages.map((message) => (
//               <motion.div
//                 key={message.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                   {/* Avatar */}
//                   <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
//                     message.type === 'user' 
//                       ? 'bg-gradient-to-r from-green-500 to-green-600' 
//                       : 'bg-gradient-to-r from-purple-500 to-indigo-500'
//                   }`}>
//                     {message.type === 'user' ? (
//                       <User className="w-5 h-5 text-white" />
//                     ) : (
//                       <Bot className="w-5 h-5 text-white" />
//                     )}
//                   </div>

//                   {/* Message Bubble */}
//                   <div className={`relative px-6 py-4 rounded-3xl shadow-sm ${
//                     message.type === 'user'
//                       ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
//                       : 'bg-white border border-gray-200 text-gray-800'
//                   }`}>
//                     <p className="text-sm leading-relaxed">{message.message}</p>
//                     <div className={`flex items-center justify-between mt-2 text-xs ${
//                       message.type === 'user' ? 'text-green-100' : 'text-gray-500'
//                     }`}>
//                       <span>{formatTime(message.timestamp)}</span>
//                       {message.type === 'bot' && (
//                         <button
//                           onClick={() => handleTextToSpeech(message.message)}
//                           className="ml-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                           {isSpeaking ? (
//                             <VolumeX className="w-3 h-3" />
//                           ) : (
//                             <Volume2 className="w-3 h-3" />
//                           )}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {/* Typing Indicator */}
//           <AnimatePresence>
//             {isTyping && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="flex justify-start"
//               >
//                 <div className="flex items-start space-x-3">
//                   <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
//                     <Bot className="w-5 h-5 text-white" />
//                   </div>
//                   <div className="bg-white border border-gray-200 rounded-3xl px-6 py-4">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                       <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Input Area */}
//       <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center space-x-4">
//             <div className="flex-1 relative">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 placeholder="Ask me anything about farming..."
//                 className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-16"
//               />
//               <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
//                 <button
//                   onClick={handleVoiceInput}
//                   className={`p-2 rounded-xl transition-all duration-200 ${
//                     isListening 
//                       ? 'bg-red-500 text-white animate-pulse' 
//                       : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
//                   }`}
//                 >
//                   {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleSendMessage}
//               disabled={!inputMessage.trim()}
//               className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Send className="w-5 h-5" />
//             </motion.button>
//           </div>

//           {/* Voice Status */}
//           <AnimatePresence>
//             {isListening && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="mt-4 flex items-center justify-center space-x-2 text-red-600"
//               >
//                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
//                 <span className="text-sm font-medium">Listening...</span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AIChatbot;/


import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, VolumeX, Trash2, Loader, AlertCircle } from 'lucide-react';
import { chatAPI } from '../services/api';

const AIChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [error, setError] = useState(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const voicesLoadedRef = useRef(false);

  // Language configuration with voice availability status
  const languages = [
    { code: 'hi-IN', name: 'हिंदी', flag: '🇮🇳', sampleText: 'नमस्ते', hasNativeVoice: true },
    { code: 'bn-IN', name: 'বাংলা', flag: '🇮🇳', sampleText: 'নমস্কার', hasNativeVoice: false },
    { code: 'ta-IN', name: 'தமிழ்', flag: '🇮🇳', sampleText: 'வணக்கம்', hasNativeVoice: false },
    { code: 'te-IN', name: 'తెలుగు', flag: '🇮🇳', sampleText: 'నమస్కారం', hasNativeVoice: false },
    { code: 'mr-IN', name: 'मराठी', flag: '🇮🇳', sampleText: 'नमस्कार', hasNativeVoice: false },
    { code: 'en-IN', name: 'English', flag: '🇬🇧', sampleText: 'Hello', hasNativeVoice: true }
  ];

  // Enhanced voice loading with better support for Indian languages
  useEffect(() => {
    if ('speechSynthesis' in window) {
      console.log('🔄 Initializing speech synthesis...');
      
      const loadVoices = () => {
        // Skip if already loaded
        if (voicesLoadedRef.current) return;
        
        const voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
          voicesLoadedRef.current = true;
          setVoicesLoaded(true);
          
          console.log(`✅ Successfully loaded ${voices.length} voices`);
          
          // Log ALL available voices (only once)
          console.log('=== ALL AVAILABLE VOICES ===');
          voices.forEach((v, i) => {
            console.log(`${i + 1}. ${v.name} (${v.lang}) - ${v.localService ? 'Local' : 'Remote'}`);
          });
          
          // Check for Indian language voices and update language config
          const languageChecks = {
            'Hindi': voices.filter(v => v.lang.startsWith('hi')),
            'Bengali': voices.filter(v => v.lang.startsWith('bn')),
            'Tamil': voices.filter(v => v.lang.startsWith('ta')),
            'Telugu': voices.filter(v => v.lang.startsWith('te')),
            'Marathi': voices.filter(v => v.lang.startsWith('mr')),
            'English (India)': voices.filter(v => v.lang === 'en-IN')
          };
          
          console.log('=== INDIAN LANGUAGE VOICES ===');
          Object.entries(languageChecks).forEach(([lang, langVoices]) => {
            if (langVoices.length > 0) {
              console.log(`✅ ${lang}: ${langVoices.length} voice(s)`);
              langVoices.forEach(v => console.log(`   - ${v.name}`));
            } else {
              console.warn(`⚠️ ${lang}: No native voice found - will use transliteration/fallback`);
            }
          });
          
          // Update hasNativeVoice flags dynamically
          languages.forEach(lang => {
            const langPrefix = lang.code.split('-')[0];
            const hasVoice = voices.some(v => v.lang.startsWith(langPrefix));
            lang.hasNativeVoice = hasVoice;
          });
        }
      };

      // Initial load attempt
      loadVoices();

      // Event listener for voice changes (fires when voices become available)
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }

      // Chrome/Edge workaround: trigger voice loading with a silent utterance
      const triggerVoiceLoad = () => {
        if (!voicesLoadedRef.current) {
          const utterance = new SpeechSynthesisUtterance('');
          utterance.volume = 0;
          window.speechSynthesis.speak(utterance);
          window.speechSynthesis.cancel();
        }
      };

      // Try loading voices with increasing delays (stops after first success)
      const delays = [100, 500, 1000, 2000];
      delays.forEach(delay => {
        setTimeout(() => {
          if (!voicesLoadedRef.current) {
            triggerVoiceLoad();
            loadVoices();
          }
        }, delay);
      });

      // Final check after 3 seconds
      const timeoutId = setTimeout(() => {
        if (!voicesLoadedRef.current) {
          console.warn('⚠️ Voices not loaded after 3 seconds');
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            loadVoices();
          } else {
            setError('वॉइस लोड नहीं हो सके। पेज रीलोड करें। (Voices not loaded. Reload page.)');
          }
        }
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      try {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.maxAlternatives = 1;

        recognitionRef.current.onstart = () => {
          console.log('🎤 Speech recognition started');
          setIsListening(true);
          setError(null);
        };

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          const confidence = event.results[0][0].confidence;
          
          console.log('✅ Transcript:', transcript);
          console.log('📊 Confidence:', (confidence * 100).toFixed(1) + '%');
          
          setInputMessage(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('❌ Speech recognition error:', event.error);
          setIsListening(false);
          
          let errorMsg = '';
          let actionMsg = '';
          
          switch(event.error) {
            case 'network':
              errorMsg = 'इंटरनेट कनेक्शन की आवश्यकता है।';
              actionMsg = 'Network connection required for voice input.';
              break;
            case 'not-allowed':
            case 'permission-denied':
              errorMsg = 'माइक्रोफोन की अनुमति दें।';
              actionMsg = 'Please allow microphone access in browser settings.';
              setTimeout(() => {
                alert('माइक्रोफोन एक्सेस:\n\n1. ब्राउज़र के एड्रेस बार में 🔒 आइकन पर क्लिक करें\n2. माइक्रोफोन को "Allow" करें\n3. पेज को रीलोड करें\n\nMicrophone Access:\n1. Click 🔒 icon in address bar\n2. Set Microphone to "Allow"\n3. Reload the page');
              }, 100);
              break;
            case 'no-speech':
              errorMsg = 'कोई आवाज़ नहीं सुनाई दी। फिर से कोशिश करें।';
              actionMsg = 'No speech detected. Please try again and speak clearly.';
              break;
            case 'audio-capture':
              errorMsg = 'माइक्रोफोन नहीं मिला।';
              actionMsg = 'No microphone found. Please connect a microphone.';
              break;
            case 'aborted':
              return;
            default:
              errorMsg = 'वॉइस इनपुट में समस्या।';
              actionMsg = `Voice input error: ${event.error}`;
          }
          
          setError(`${errorMsg}\n${actionMsg}`);
        };

        recognitionRef.current.onend = () => {
          console.log('🛑 Speech recognition ended');
          setIsListening(false);
        };

        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            console.log('✅ Microphone access granted');
            setSpeechSupported(true);
          })
          .catch((error) => {
            console.error('❌ Microphone access denied:', error);
            setSpeechSupported(false);
          });

      } catch (error) {
        console.error('Failed to initialize speech recognition:', error);
        setSpeechSupported(false);
      }
    } else {
      console.warn('Speech recognition not supported');
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced voice selection function
  // Enhanced voice selection with better fallbacks
const selectBestVoice = (targetLang) => {
  const voices = window.speechSynthesis.getVoices();
  
  if (voices.length === 0) {
    console.warn('⚠️ No voices available yet');
    return null;
  }

  console.log(`🔍 Selecting voice for: ${targetLang}`);
  console.log(`📊 Available voices: ${voices.length}`);

  // Enhanced language mapping with multiple fallbacks
  const langMap = {
    'hi-IN': [
      'hi-IN',           // Hindi (India)
      'hi',              // Generic Hindi
      'en-IN'            // English (India) as fallback
    ],
    'bn-IN': [
      'bn-IN',           // Bengali (India)
      'bn-BD',           // Bengali (Bangladesh)
      'bn',              // Generic Bengali
      'en-IN'
    ],
    'ta-IN': [
      'ta-IN',           // Tamil (India)
      'ta',              // Generic Tamil
      'en-IN'
    ],
    'te-IN': [
      'te-IN',           // Telugu (India)
      'te',              // Generic Telugu
      'en-IN'
    ],
    'mr-IN': [
      'mr-IN',           // Marathi (India)
      'mr',              // Generic Marathi
      'en-IN'
    ],
    'en-IN': [
      'en-IN',           // English (India)
      'en-GB',           // British English
      'en-US',           // US English
      'en'               // Generic English
    ]
  };

  const langVariants = langMap[targetLang] || [targetLang, 'en-IN', 'en'];
  let selectedVoice = null;

  // Priority 1: Google voices (best quality for Indian languages)
  for (const lang of langVariants) {
    selectedVoice = voices.find(v => 
      v.lang === lang && 
      v.name.toLowerCase().includes('google')
    );
    if (selectedVoice) {
      console.log(`✅ Found Google voice: ${selectedVoice.name} (${selectedVoice.lang})`);
      return selectedVoice;
    }
  }

  // Priority 2: Microsoft voices (Windows)
  for (const lang of langVariants) {
    selectedVoice = voices.find(v => 
      v.lang === lang && 
      (v.name.toLowerCase().includes('microsoft') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('hemant'))
    );
    if (selectedVoice) {
      console.log(`✅ Found Microsoft voice: ${selectedVoice.name} (${selectedVoice.lang})`);
      return selectedVoice;
    }
  }

  // Priority 3: Any voice with exact language match
  for (const lang of langVariants) {
    selectedVoice = voices.find(v => v.lang === lang);
    if (selectedVoice) {
      console.log(`✅ Found exact match: ${selectedVoice.name} (${selectedVoice.lang})`);
      return selectedVoice;
    }
  }

  // Priority 4: Language prefix match
  const langPrefix = targetLang.split('-')[0];
  selectedVoice = voices.find(v => v.lang.startsWith(langPrefix));
  if (selectedVoice) {
    console.log(`✅ Found prefix match: ${selectedVoice.name} (${selectedVoice.lang})`);
    return selectedVoice;
  }

  // Priority 5: Any English voice
  selectedVoice = voices.find(v => v.lang.startsWith('en'));
  if (selectedVoice) {
    console.log(`⚠️ Using fallback English voice: ${selectedVoice.name} (${selectedVoice.lang})`);
    return selectedVoice;
  }

  // Priority 6: First available voice
  console.warn('⚠️ No suitable voice found, using system default');
  return voices[0] || null;
};

// Text-to-Speech function (single, chunked implementation)
const speak = (text) => {
  if (!('speechSynthesis' in window)) {
    console.error('❌ Speech synthesis not supported');
    setError('आपके ब्राउज़र में वॉइस आउटपुट उपलब्ध नहीं है। (Voice output not supported in your browser)');
    return;
  }

  // Cancel any ongoing speech and reset state
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    /* ignore */
  }
  setIsSpeaking(false);

  console.log('🔊 Preparing to speak:', text?.length ?? 0, 'characters');

  // For very long text, chunk it (browser limitation ~200 chars)
  const chunkText = (t, maxLength = 200) => {
    if (!t) return [];
    if (t.length <= maxLength) return [t];

    const chunks = [];
    let currentChunk = '';

    // Split by sentence-like delimiters, keep delimiters
    const parts = t.split(/([।.!?]\s+)/);
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if ((currentChunk + part).length <= maxLength) {
        currentChunk += part;
      } else {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = part;
      }
    }
    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  };

  const chunks = chunkText(text, 200);
  let cancelled = false;

  const speakChunk = (index) => {
    if (cancelled) {
      setIsSpeaking(false);
      return;
    }
    if (index >= chunks.length) {
      setIsSpeaking(false);
      return;
    }

    const chunk = chunks[index];
    console.log(`🔊 Speaking chunk ${index + 1}/${chunks.length}:`, chunk.substring(0, 50) + '...');

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = selectedLanguage;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = selectBestVoice(selectedLanguage);
    if (voice) {
      utterance.voice = voice;
      console.log(`🎵 Using voice: ${voice.name} (${voice.lang})`);
    }

    utterance.onstart = () => {
      if (index === 0) setIsSpeaking(true);
    };

    utterance.onend = () => {
      // small delay between chunks
      setTimeout(() => speakChunk(index + 1), 80);
    };

    utterance.onerror = (err) => {
      console.error('❌ Speech error on chunk', index, ':', err);
      if (err?.error === 'interrupted' || err?.error === 'canceled') {
        cancelled = true;
        setIsSpeaking(false);
        return;
      }
      // continue to next chunk on error
      setTimeout(() => speakChunk(index + 1), 80);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('❌ Failed to speak chunk:', e);
      setIsSpeaking(false);
    }
  };

  if (chunks.length > 0) {
    speakChunk(0);
  }
};

// Stop any ongoing speech
const stopSpeaking = () => {
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    /* ignore */
  }
  setIsSpeaking(false);
};

  const startListening = () => {
    if (!speechSupported) {
      setError('इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। कृपया Chrome या Edge का उपयोग करें।\n(Voice input not available. Please use Chrome or Edge.)');
      return;
    }

    if (recognitionRef.current && !isListening) {
      try {
        setError(null);
        setInputMessage('');
        recognitionRef.current.lang = selectedLanguage;
        console.log('🎤 Starting recognition with language:', selectedLanguage);
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        
        if (error.name === 'InvalidStateError') {
          recognitionRef.current.stop();
          setTimeout(() => {
            try {
              recognitionRef.current.start();
            } catch (e) {
              setError('वॉइस इनपुट शुरू नहीं हो सका। पेज रीलोड करें। (Could not start voice input. Reload page.)');
            }
          }, 100);
        } else {
          setError('वॉइस इनपुट शुरू नहीं हो सका। (Could not start voice input.)');
        }
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    const questionText = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      console.log('📤 Sending message:', questionText);
      
      const response = await chatAPI.sendMessage(
        questionText,
        selectedLanguage,
        sessionId
      );

      console.log('📥 Received response');

      const aiMessage = {
        role: 'assistant',
        content: response.data.message,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Auto-speak with delay
      if (autoSpeak) {
        console.log('🔊 Auto-speak enabled, will speak in 400ms');
        setTimeout(() => {
          speak(response.data.message);
        }, 400);
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      
      let errorMsg = 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।\n(Sorry, something went wrong. Please try again.)';
      
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        errorMsg = 'इंटरनेट कनेक्शन की समस्या है। कृपया अपना कनेक्शन जांचें।\n(Network error. Please check your internet connection.)';
      } else if (error.response?.status === 500) {
        errorMsg = 'सर्वर में समस्या है। कृपया कुछ देर बाद प्रयास करें।\n(Server error. Please try again later.)';
      }
      
      const errorMessage = {
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (window.confirm('क्या आप चैट इतिहास साफ़ करना चाहते हैं?\n(Do you want to clear chat history?)')) {
      try {
        await chatAPI.clearChat(sessionId);
        setMessages([]);
        setError(null);
        stopSpeaking();
      } catch (error) {
        console.error('Error clearing chat:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Test voice button handler
  const testVoice = () => {
    const testTexts = {
      'hi-IN': 'नमस्ते! मैं आपका कृषि सहायक हूं। धान की खेती के बारे में पूछें।',
      'bn-IN': 'নমস্কার! আমি আপনার কৃষি সহায়ক। ধান চাষ সম্পর্কে জিজ্ঞাসা করুন।',
      'ta-IN': 'வணக்கம்! நான் உங்கள் வேளாண் உதவியாளர். நெல் சாகுபடி பற்றி கேளுங்கள்।',
      'te-IN': 'నమస్కారం! నేను మీ వ్యవసాయ సహాయకుడిని। వరి సాగు గురించి అడగండి।',
      'mr-IN': 'नमस्कार! मी तुमचा कृषी सहाय्यक आहे. भात लागवड बद्दल विचारा।',
      'en-IN': 'Hello! I am your agricultural assistant. Ask me about rice cultivation.'
    };
    
    speak(testTexts[selectedLanguage] || testTexts['hi-IN']);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>🌾 किसान सहायक</h2>
            <p style={styles.subtitle}>Farmer Assistant</p>
          </div>
          <div style={styles.controls}>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setError(null);
              }}
              style={styles.languageSelect}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name} {!lang.hasNativeVoice ? '(⚠️ Limited)' : ''}
                </option>
              ))}
            </select>
            <button
              onClick={testVoice}
              style={styles.iconButton}
              title="Test voice output"
            >
              🔊
            </button>
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              style={styles.iconButton}
              title={autoSpeak ? 'Disable auto-speak' : 'Enable auto-speak'}
            >
              {autoSpeak ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button
              onClick={handleClearChat}
              style={styles.iconButton}
              title="Clear chat"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={styles.errorBanner}>
            <AlertCircle size={16} />
            <span style={{whiteSpace: 'pre-line'}}>{error}</span>
            <button onClick={() => setError(null)} style={styles.closeError}>×</button>
          </div>
        )}

        {/* Voice Status */}
        {!voicesLoaded && (
          <div style={{...styles.errorBanner, backgroundColor: '#fef3c7', color: '#92400e'}}>
            <Loader size={16} style={styles.spinner} />
            <span>वॉइस लोड हो रहे हैं... (Loading voices...)</span>
          </div>
        )}

        {/* Messages */}
        <div style={styles.messagesContainer}>
          {messages.length === 0 && (
            <div style={styles.welcomeMessage}>
              <p style={styles.welcomeEmoji}>🙏</p>
              <p style={styles.welcomeText}>
                {languages.find(l => l.code === selectedLanguage)?.sampleText || 'नमस्ते'}!
              </p>
              <p style={styles.welcomeDesc}>
                मैं आपका कृषि सहायक हूं। मुझसे खेती से जुड़े कोई भी सवाल पूछें।
              </p>
              <p style={styles.welcomeDescEn}>
                I'm your agricultural assistant. Ask me any farming questions.
              </p>
              
              {!speechSupported && (
                <div style={styles.voiceWarning}>
                  ⚠️ वॉइस इनपुट उपलब्ध नहीं है। कृपया टाइप करें।<br/>
                  (Voice input not available. Please type.)
                </div>
              )}
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageWrapper,
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  ...styles.message,
                  ...(msg.role === 'user' ? styles.userMessage : styles.aiMessage),
                  ...(msg.isError ? styles.errorMessage : {})
                }}
              >
                <div style={styles.messageContent}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={styles.messageWrapper}>
              <div style={{...styles.message, ...styles.aiMessage}}>
                <Loader size={16} style={styles.spinner} />
                सोच रहा हूं... (Thinking...)
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={styles.inputContainer}>
          {speechSupported && (
            <button
              onClick={isListening ? stopListening : startListening}
              style={{
                ...styles.micButton,
                ...(isListening ? styles.micButtonActive : {})
              }}
              disabled={isLoading}
              title={isListening ? 'बोलना बंद करें (Stop listening)' : 'बोलना शुरू करें (Start speaking)'}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
          )}

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`${languages.find(l => l.code === selectedLanguage)?.sampleText}... अपना सवाल टाइप करें (Type your question)`}
            style={styles.input}
            disabled={isLoading || isListening}
          />

          <button
            onClick={handleSendMessage}
            style={{
              ...styles.sendButton,
              opacity: (!inputMessage.trim() || isLoading) ? 0.5 : 1,
              cursor: (!inputMessage.trim() || isLoading) ? 'not-allowed' : 'pointer'
            }}
            disabled={!inputMessage.trim() || isLoading}
            title="भेजें (Send)"
          >
            <Send size={24} />
          </button>
        </div>

        {/* Status Indicators */}
        {isSpeaking && (
          <div style={styles.statusBar}>
            <Volume2 size={16} className="pulse-animation" />
            <span>बोल रहा हूं... (Speaking...)</span>
            <button onClick={stopSpeaking} style={styles.stopButton}>
              रोकें (Stop)
            </button>
          </div>
        )}

        {isListening && (
          <div style={{...styles.statusBar, backgroundColor: '#fee2e2', color: '#991b1b'}}>
            <Mic size={16} className="pulse-animation" />
            <span>सुन रहा हूं... बोलिए (Listening... Speak now)</span>
            <button onClick={stopListening} style={{...styles.stopButton, backgroundColor: '#991b1b'}}>
              रोकें (Stop)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", "Noto Sans Devanagari", sans-serif'
  },
  chatBox: {
    width: '100%',
    maxWidth: '900px',
    height: '90vh',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    padding: '24px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px'
  },
  title: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: 'bold',
    letterSpacing: '-0.5px'
  },
  subtitle: {
    margin: '4px 0 0 0',
    fontSize: '0.875rem',
    opacity: 0.9,
    fontWeight: 'normal'
  },
  controls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  languageSelect: {
    padding: '10px 14px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'white',
    color: '#333',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  iconButton: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    color: 'white',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontSize: '18px'
  },
  errorBanner: {
    padding: '12px 20px',
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    borderBottom: '1px solid #fecaca'
  },
  closeError: {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    color: '#991b1b',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0 8px',
    lineHeight: '1'
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    backgroundColor: '#fafafa'
  },
  welcomeMessage: {
    textAlign: 'center',
    color: '#64748b',
    padding: '60px 20px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  welcomeEmoji: {
    fontSize: '3rem',
    margin: '0 0 16px 0'
  },
  welcomeText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 12px 0'
  },
  welcomeDesc: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    margin: '0 0 8px 0',
    color: '#475569'
  },
  welcomeDescEn: {
    fontSize: '0.95rem',
    color: '#94a3b8',
    fontStyle: 'italic',
    margin: '0'
  },
  voiceWarning: {
    marginTop: '24px',
    padding: '16px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderRadius: '8px',
    fontSize: '0.9rem',
    lineHeight: '1.5'
  },
  messageWrapper: {
    display: 'flex',
    width: '100%',
    animation: 'fadeIn 0.3s ease-in'
  },
  message: {
    maxWidth: '75%',
    padding: '14px 18px',
    borderRadius: '16px',
    lineHeight: '1.6',
    wordWrap: 'break-word',
    fontSize: '15px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  messageContent: {
    whiteSpace: 'pre-wrap'
  },
  userMessage: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    borderBottomRightRadius: '4px'
  },
  aiMessage: {
    backgroundColor: 'white',
    color: '#1e293b',
    borderBottomLeftRadius: '4px',
    border: '1px solid #e2e8f0'
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fecaca'
  },
  inputContainer: {
    padding: '20px 24px',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  micButton: {
    padding: '14px',
    borderRadius: '50%',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#10b981',
    backgroundColor: 'white',
    color: '#10b981',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)'
  },
  micButtonActive: {
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
    color: 'white',
    animation: 'pulse 1.5s infinite',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    borderRadius: '24px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },
  sendButton: {
    padding: '14px',
    borderRadius: '50%',
    border: 'none',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    flexShrink: 0,
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
  },
  statusBar: {
    padding: '14px 24px',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '14px',
    fontWeight: '500',
    borderTop: '1px solid #bfdbfe'
  },
  stopButton: {
    marginLeft: 'auto',
    padding: '6px 16px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#1e40af',
    color: 'white',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    marginRight: '8px',
    display: 'inline-block'
  }
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { 
      opacity: 1;
      transform: scale(1);
    }
    50% { 
      opacity: 0.8;
      transform: scale(1.05);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .pulse-animation {
    animation: pulse 1.5s ease-in-out infinite;
  }

  *::-webkit-scrollbar {
    width: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  *::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  input:focus {
    border-color: #10b981 !important;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
  }

  button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
  }

  button:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .chatBox {
      height: 100vh !important;
      border-radius: 0 !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default AIChatBot;