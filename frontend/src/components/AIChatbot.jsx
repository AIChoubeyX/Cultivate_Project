import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  Leaf, 
  Sun, 
  Droplets,
  TrendingUp,
  Camera,
  MapPin,
  Calendar,
  Lightbulb,
  BookOpen,
  Settings
} from 'lucide-react';

const quickQuestions = [
  {
    icon: Sun,
    text: "What's the best time to plant rice?",
    category: "Planting"
  },
  {
    icon: Droplets,
    text: "How much water does wheat need?",
    category: "Irrigation"
  },
  {
    icon: Leaf,
    text: "My tomato leaves are yellowing, what should I do?",
    category: "Disease"
  },
  {
    icon: TrendingUp,
    text: "What are today's market prices for cotton?",
    category: "Market"
  },
  {
    icon: Camera,
    text: "Can you identify this pest in my crop?",
    category: "Pest Control"
  },
  {
    icon: MapPin,
    text: "What crops grow best in my region?",
    category: "Regional"
  }
];

const botResponses = {
  greeting: [
    "Hello! I'm your AI farming assistant. How can I help you today?",
    "Welcome! I'm here to help with all your farming questions.",
    "Hi there! Ready to discuss farming? What would you like to know?"
  ],
  planting: [
    "For rice planting, the ideal time is during the monsoon season (June-July) when there's adequate rainfall. The temperature should be between 20-35°C for optimal growth.",
    "Rice requires specific conditions for planting. I recommend preparing your fields during May and transplanting seedlings in June when monsoon arrives."
  ],
  irrigation: [
    "Wheat typically needs 450-650mm of water throughout its growing season. During the grain filling stage, it requires about 5-7mm per day.",
    "For wheat irrigation, maintain soil moisture at 50-70% field capacity. Water stress during flowering can significantly reduce yield."
  ],
  disease: [
    "Yellowing tomato leaves could indicate several issues: nitrogen deficiency, overwatering, or early blight. Check soil drainage and consider a balanced fertilizer application.",
    "Yellow leaves on tomatoes often suggest nutrient deficiency or disease. I recommend soil testing and ensuring proper spacing for air circulation."
  ],
  market: [
    "Current cotton prices are showing an upward trend at ₹5,640 per quintal, up 8.7% from last week. This is a good time to consider selling if you have quality produce.",
    "Cotton market is performing well this season. Prices have increased due to good export demand and reduced supply from competing regions."
  ],
  pest: [
    "I'd be happy to help identify pests! Please upload a clear image of the affected plant or pest. Common signs include holes in leaves, discoloration, or visible insects.",
    "For pest identification, I need a good quality image. Look for signs like chewed leaves, webbing, or small insects on the undersides of leaves."
  ],
  regional: [
    "Your region's climate and soil type determine the best crops. Generally, rice and wheat do well in northern plains, while cotton and sugarcane thrive in western regions.",
    "Regional crop selection depends on rainfall, temperature, and soil conditions. I can provide specific recommendations if you share your location details."
  ],
  default: [
    "That's an interesting question! Could you provide more details so I can give you the most accurate advice?",
    "I'd love to help with that. Can you share more context about your specific situation?",
    "Great question! Let me think about the best way to address this farming concern."
  ]
};

function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hello! I'm your AI farming assistant. I can help you with crop cultivation, disease identification, weather advice, market prices, and much more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('plant') || message.includes('sow') || message.includes('seed')) {
      return botResponses.planting[Math.floor(Math.random() * botResponses.planting.length)];
    } else if (message.includes('water') || message.includes('irrigation') || message.includes('drought')) {
      return botResponses.irrigation[Math.floor(Math.random() * botResponses.irrigation.length)];
    } else if (message.includes('yellow') || message.includes('disease') || message.includes('sick') || message.includes('problem')) {
      return botResponses.disease[Math.floor(Math.random() * botResponses.disease.length)];
    } else if (message.includes('price') || message.includes('market') || message.includes('sell') || message.includes('cost')) {
      return botResponses.market[Math.floor(Math.random() * botResponses.market.length)];
    } else if (message.includes('pest') || message.includes('insect') || message.includes('bug') || message.includes('identify')) {
      return botResponses.pest[Math.floor(Math.random() * botResponses.pest.length)];
    } else if (message.includes('region') || message.includes('area') || message.includes('location') || message.includes('climate')) {
      return botResponses.regional[Math.floor(Math.random() * botResponses.regional.length)];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    } else {
      return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        setInputMessage("What's the best fertilizer for my wheat crop?");
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const handleTextToSpeech = (message) => {
    if (!isSpeaking) {
      setIsSpeaking(true);
      // Simulate text-to-speech
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    } else {
      setIsSpeaking(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-100 p-6 shadow-sm"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AI Farming Assistant</h1>
              <p className="text-gray-600">Your intelligent farming companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Questions */}
      <div className="bg-white/50 border-b border-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Questions</h3>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleQuickQuestion(question.text)}
                className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-sm"
              >
                <question.icon className="w-4 h-4 text-purple-600" />
                <span className="text-gray-700 whitespace-nowrap">{question.category}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600' 
                      : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`relative px-6 py-4 rounded-3xl shadow-sm ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.message}</p>
                    <div className={`flex items-center justify-between mt-2 text-xs ${
                      message.type === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.type === 'bot' && (
                        <button
                          onClick={() => handleTextToSpeech(message.message)}
                          className="ml-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-3xl px-6 py-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about farming..."
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-16"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-xl transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Voice Status */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 flex items-center justify-center space-x-2 text-red-600"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Listening...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AIChatbot;