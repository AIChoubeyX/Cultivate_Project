


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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-0 md:p-5 font-sans">
      <div className="w-full max-w-4xl h-screen md:h-[90vh] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 md:p-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white flex justify-between items-center flex-wrap gap-3">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold m-0">🌾 किसान सहायक</h2>
            <p className="text-xs md:text-sm opacity-90 mt-1">Farmer Assistant</p>
          </div>
          <div className="flex gap-2 md:gap-3 items-center">
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setError(null);
              }}
              className="px-3 py-2 md:px-4 md:py-2.5 rounded-lg border-none bg-white text-gray-800 text-sm md:text-base font-medium cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name} {!lang.hasNativeVoice ? '(⚠️ Limited)' : ''}
                </option>
              ))}
            </select>
            <button
              onClick={testVoice}
              className="bg-white/20 border-none text-white p-2 md:p-2.5 rounded-lg cursor-pointer flex items-center justify-center transition-all hover:bg-white/30 active:scale-95 text-base md:text-lg"
              title="Test voice output"
            >
              🔊
            </button>
            <button
              onClick={() => setAutoSpeak(!autoSpeak)}
              className="bg-white/20 border-none text-white p-2 md:p-2.5 rounded-lg cursor-pointer flex items-center justify-center transition-all hover:bg-white/30 active:scale-95"
              title={autoSpeak ? 'Disable auto-speak' : 'Enable auto-speak'}
            >
              {autoSpeak ? <Volume2 size={18} className="md:w-5 md:h-5" /> : <VolumeX size={18} className="md:w-5 md:h-5" />}
            </button>
            <button
              onClick={handleClearChat}
              className="bg-white/20 border-none text-white p-2 md:p-2.5 rounded-lg cursor-pointer flex items-center justify-center transition-all hover:bg-white/30 active:scale-95"
              title="Clear chat"
            >
              <Trash2 size={18} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="px-5 py-3 bg-red-50 text-red-800 flex items-center gap-3 text-sm border-b border-red-200">
            <AlertCircle size={16} />
            <span className="whitespace-pre-line flex-1">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto bg-transparent border-none text-red-800 text-2xl cursor-pointer p-0 px-2 leading-none hover:opacity-70">×</button>
          </div>
        )}

        {/* Voice Status */}
        {!voicesLoaded && (
          <div className="px-5 py-3 bg-amber-50 text-amber-800 flex items-center gap-3 text-sm border-b border-amber-200">
            <Loader size={16} className="animate-spin" />
            <span>वॉइस लोड हो रहे हैं... (Loading voices...)</span>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 flex flex-col gap-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="text-center text-slate-600 py-10 md:py-16 px-4 max-w-2xl mx-auto">
              <p className="text-3xl md:text-5xl mb-4">🙏</p>
              <p className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                {languages.find(l => l.code === selectedLanguage)?.sampleText || 'नमस्ते'}!
              </p>
              <p className="text-base md:text-lg leading-relaxed mb-2 text-slate-700">
                मैं आपका कृषि सहायक हूं। मुझसे खेती से जुड़े कोई भी सवाल पूछें।
              </p>
              <p className="text-sm md:text-base text-slate-500 italic">
                I'm your agricultural assistant. Ask me any farming questions.
              </p>
              
              {!speechSupported && (
                <div className="mt-6 p-4 bg-amber-50 text-amber-900 rounded-lg text-sm md:text-base leading-relaxed">
                  ⚠️ वॉइस इनपुट उपलब्ध नहीं है। कृपया टाइप करें।<br/>
                  (Voice input not available. Please type.)
                </div>
              )}
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] px-3 py-2.5 md:px-4 md:py-3.5 rounded-2xl leading-relaxed break-words text-sm md:text-base shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-br-sm' 
                    : msg.isError 
                    ? 'bg-red-50 text-red-800 border border-red-200 rounded-bl-sm'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="max-w-[85%] md:max-w-[75%] px-3 py-2.5 md:px-4 md:py-3.5 rounded-2xl bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm text-sm md:text-base">
                <Loader size={16} className="inline-block animate-spin mr-2" />
                सोच रहा हूं... (Thinking...)
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 md:px-6 py-3 md:py-5 border-t border-slate-200 flex gap-2 md:gap-3 items-center bg-white">
          {speechSupported && (
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-2.5 md:p-3.5 rounded-full border-2 cursor-pointer flex items-center justify-center transition-all flex-shrink-0 ${
                isListening 
                  ? 'bg-red-500 border-red-500 text-white animate-pulse shadow-lg shadow-red-500/40'
                  : 'bg-white border-green-600 text-green-600 shadow-md shadow-green-600/20 hover:bg-green-50'
              }`}
              disabled={isLoading}
              title={isListening ? 'बोलना बंद करें (Stop listening)' : 'बोलना शुरू करें (Start speaking)'}
            >
              {isListening ? <MicOff size={20} className="md:w-6 md:h-6" /> : <Mic size={20} className="md:w-6 md:h-6" />}
            </button>
          )}

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`${languages.find(l => l.code === selectedLanguage)?.sampleText}... अपना सवाल टाइप करें (Type your question)`}
            className="flex-1 px-3 py-2.5 md:px-5 md:py-3.5 rounded-3xl border-2 border-slate-200 text-base outline-none transition-all focus:border-green-600 focus:ring-4 focus:ring-green-600/10 disabled:bg-slate-100 disabled:cursor-not-allowed"
            disabled={isLoading || isListening}
          />

          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="p-2.5 md:p-3.5 rounded-full border-none bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-pointer flex items-center justify-center transition-all flex-shrink-0 shadow-lg shadow-green-600/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            title="भेजें (Send)"
          >
            <Send size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        {/* Status Indicators */}
        {isSpeaking && (
          <div className="px-6 py-3.5 bg-blue-100 text-blue-900 flex items-center gap-3 text-sm font-medium border-t border-blue-200">
            <Volume2 size={16} className="animate-pulse" />
            <span>बोल रहा हूं... (Speaking...)</span>
            <button onClick={stopSpeaking} className="ml-auto px-4 py-1.5 rounded-md border-none bg-blue-900 text-white cursor-pointer text-sm font-semibold transition-all hover:bg-blue-800 active:scale-95">
              रोकें (Stop)
            </button>
          </div>
        )}

        {isListening && (
          <div className="px-6 py-3.5 bg-red-100 text-red-900 flex items-center gap-3 text-sm font-medium border-t border-red-200">
            <Mic size={16} className="animate-pulse" />
            <span>सुन रहा हूं... बोलिए (Listening... Speak now)</span>
            <button onClick={stopListening} className="ml-auto px-4 py-1.5 rounded-md border-none bg-red-900 text-white cursor-pointer text-sm font-semibold transition-all hover:bg-red-800 active:scale-95">
              रोकें (Stop)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatBot;