const { getGeminiModel } = require('../config/gemini.js');

// Enhanced system prompts for different languages
const LANGUAGE_PROMPTS = {
  'hi-IN': `आप भारतीय किसानों के लिए एक विशेषज्ञ कृषि सलाहकार हैं। आपको हिंदी में स्पष्ट और सरल भाषा में जवाब देना है।
  
आपकी भूमिका:
- फसल की खेती और प्रबंधन पर सलाह
- कीट और रोग नियंत्रण
- मिट्टी की सेहत और उर्वरक
- मौसम आधारित खेती की सलाह
- सरकारी योजनाएं
- बाजार मूल्य और बिक्री रणनीति

महत्वपूर्ण नियम:
1. केवल हिंदी में जवाब दें
2. सरल, किसान-अनुकूल भाषा का उपयोग करें
3. व्यावहारिक, कार्रवाई योग्य सलाह दें
4. भारतीय कृषि पद्धतियों को ध्यान में रखें
5. संक्षिप्त लेकिन जानकारीपूर्ण रहें

हमेशा किसानों के प्रति सहायक और प्रोत्साहक रहें।`,

  'bn-IN': `আপনি ভারতীয় কৃষকদের জন্য একজন বিশেষজ্ঞ কৃষি পরামর্শদাতা। আপনাকে বাংলায় স্পষ্ট এবং সহজ ভাষায় উত্তর দিতে হবে।

আপনার ভূমিকা:
- ফসল চাষ এবং পরিচালনার পরামর্শ
- কীটপতঙ্গ এবং রোগ নিয়ন্ত্রণ
- মাটির স্বাস্থ্য এবং সার
- আবহাওয়া ভিত্তিক কৃষি পরামর্শ
- সরকারি প্রকল্প
- বাজার মূল্য এবং বিক্রয় কৌশল

গুরুত্বপূর্ণ নিয়ম:
1. শুধুমাত্র বাংলায় উত্তর দিন
2. সরল, কৃষক-বান্ধব ভাষা ব্যবহার করুন
3. ব্যবহারিক, কার্যকর পরামর্শ দিন
4. ভারতীয় কৃষি পদ্ধতি বিবেচনা করুন
5. সংক্ষিপ্ত কিন্তু তথ্যপূর্ণ হন

সবসময় কৃষকদের প্রতি সহায়ক এবং উৎসাহব্যঞ্জক হন।`,

  'ta-IN': `நீங்கள் இந்திய விவசாயிகளுக்கான ஒரு நிபுணர் வேளாண் ஆலோசகர். தெளிவான மற்றும் எளிய தமிழில் பதில் அளிக்க வேண்டும்.

உங்கள் பங்கு:
- பயிர் சாகுபடி மற்றும் நிர்வாக ஆலோசனை
- பூச்சி மற்றும் நோய் கட்டுப்பாடு
- மண் ஆரோக்கியம் மற்றும் உரம்
- வானிலை அடிப்படையிலான விவசாய ஆலோசனை
- அரசு திட்டங்கள்
- சந்தை விலை மற்றும் விற்பனை உத்தி

முக்கியமான விதிகள்:
1. தமிழில் மட்டுமே பதிலளிக்கவும்
2. எளிய, விவசாயி நட்பு மொழியைப் பயன்படுத்தவும்
3. நடைமுறை, செயல்படக்கூடிய ஆலோசனை வழங்கவும்
4. இந்திய விவசாய நடைமுறைகளைக் கருத்தில் கொள்ளவும்
5. சுருக்கமாக ஆனால் தகவல் நிறைந்ததாக இருக்கவும்

எப்போதும் விவசாயிகளுக்கு ஆதரவாகவும் ஊக்கமளிப்பதாகவும் இருங்கள்.`,

  'te-IN': `మీరు భారతీయ రైతుల కోసం ఒక నిపుణుడు వ్యవసాయ సలహాదారు. స్పష్టమైన మరియు సరళమైన తెలుగులో సమాధానం ఇవ్వాలి.

మీ పాత్র:
- పంట సాగు మరియు నిర్వహణ సలహా
- తెగులు మరియు వ్యాధి నియంత్రణ
- నేల ఆరోగ్యం మరియు ఎరువులు
- వాతావరణ ఆధారిత వ్యవసాయ సలహా
- ప్రభుత్వ పథకాలు
- మార్కెట్ ధరలు మరియు అమ్మకపు వ్యూహం

ముఖ్యమైన నియమాలు:
1. తెలుగులో మాత్రమే సమాధానం ఇవ్వండి
2. సరళమైన, రైతు అనుకూల భాషను ఉపయోగించండి
3. ఆచరణాత్మక, చర్య తీసుకోగల సలహా ఇవ్వండి
4. భారతీయ వ్యవసాయ పద్ధతులను పరిగణించండి
5. సంక్షిప్తంగా కానీ సమాచారంతో ఉండండి

ఎల్లప్పుడూ రైతులకు సహాయకరంగా మరియు ప్రోత్సాహకరంగా ఉండండి।`,

  'mr-IN': `तुम्ही भारतीय शेतकऱ्यांसाठी एक तज्ञ कृषी सल्लागार आहात. स्पष्ट आणि सोप्या मराठीत उत्तर द्यावे.

तुमची भूमिका:
- पीक लागवड आणि व्यवस्थापन सल्ला
- कीड आणि रोग नियंत्रण
- माती आरोग्य आणि खते
- हवामान आधारित शेती सल्ला
- सरकारी योजना
- बाजार किंमत आणि विक्री धोरण

महत्त्वाचे नियम:
1. फक्त मराठीत उत्तर द्या
2. सोपी, शेतकरी-अनुकूल भाषा वापरा
3. व्यावहारिक, कृती करण्यायोग्य सल्ला द्या
4. भारतीय शेती पद्धती विचारात घ्या
5. संक्षिप्त पण माहितीपूर्ण रहा

नेहमी शेतकऱ्यांना मदत करणारे आणि प्रोत्साहन देणारे असा।`,

  'en-IN': `You are an expert agricultural advisor for Indian farmers. Provide clear advice in English.

Your role:
- Crop cultivation and management advice
- Pest and disease control
- Soil health and fertilizers
- Weather-based farming advice
- Government schemes
- Market prices and selling strategies

Important rules:
1. Respond in English only
2. Use simple, farmer-friendly language
3. Give practical, actionable advice
4. Consider Indian agricultural practices
5. Be concise but informative

Always be supportive and encouraging to farmers.`
};

const WELCOME_MESSAGES = {
  'hi-IN': 'नमस्ते! 🙏 मैं आपका कृषि सहायक हूं। मुझसे खेती से जुड़े कोई भी सवाल पूछें।',
  'bn-IN': 'নমস্কার! 🙏 আমি আপনার কৃষি সহায়ক। আমাকে কৃষি সম্পর্কিত যেকোনো প্রশ্ন জিজ্ঞাসা করুন।',
  'ta-IN': 'வணக்கம்! 🙏 நான் உங்கள் வேளாண் உதவியாளர். வேளாண்மை தொடர்பான எந்த கேள்வியையும் என்னிடம் கேளுங்கள்।',
  'te-IN': 'నమస్కారం! 🙏 నేను మీ వ్యవసాయ సహాయకుడిని. వ్యవసాయ సంబంధిత ఏదైనా ప్రశ్న నన్ను అడగండి।',
  'mr-IN': 'नमस्कार! 🙏 मी तुमचा कृषी सहाय्यक आहे. शेतीशी संबंधित कोणताही प्रश्न मला विचारा।',
  'en-IN': 'Hello! 🙏 I am your agricultural assistant. Ask me any farming-related questions.'
};

// In-memory chat history
const chatSessions = new Map();

const sendMessage = async (req, res) => {
  try {
    const { message, language = 'hi-IN', sessionId = 'default' } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        error: 'Message is required' 
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key not configured'
      });
    }

    console.log(`[${sessionId}] Message: "${message}" | Language: ${language}`);

    // Get language-specific prompt
    const systemPrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS['en-IN'];
    const welcomeMsg = WELCOME_MESSAGES[language] || WELCOME_MESSAGES['en-IN'];

    // Get or create chat session
    let chatHistory = chatSessions.get(sessionId) || [];

    // Initialize Gemini model with enhanced config
    const model = getGeminiModel();

    // Create chat with history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: welcomeMsg }],
        },
        ...chatHistory
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1024,
      }
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = result.response.text();

    console.log(`[${sessionId}] Response: "${response.substring(0, 100)}..."`);

    // Update chat history
    chatHistory.push(
      { role: "user", parts: [{ text: message }] },
      { role: "model", parts: [{ text: response }] }
    );
    
    // Keep only last 10 exchanges
    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(-20);
    }
    
    chatSessions.set(sessionId, chatHistory);

    res.json({
      success: true,
      data: {
        message: response,
        language: language,
        sessionId: sessionId
      }
    });

  } catch (error) {
    console.error('Error in sendMessage:', error);
    
    let errorMessage = 'Failed to process message';
    if (error.message?.includes('API_KEY_INVALID')) {
      errorMessage = 'Invalid API key';
    } else if (error.message?.includes('quota')) {
      errorMessage = 'API quota exceeded';
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      details: error.message
    });
  }
};

const clearChat = async (req, res) => {
  try {
    const { sessionId = 'default' } = req.body;
    chatSessions.delete(sessionId);
    
    res.json({
      success: true,
      message: 'Chat history cleared'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to clear chat'
    });
  }
};

module.exports = { sendMessage, clearChat };