# 🎙️ Adding Missing Indian Language Voices (Bengali, Tamil, Telugu, Marathi)

Your app currently supports **Hindi** and **English (India)** voices natively. To add Bengali, Tamil, Telugu, and Marathi voices, here are your options:

---

## ✅ **Option 1: Google Cloud Text-to-Speech API** (RECOMMENDED)

**Best for:** Production apps, high-quality voices, all Indian languages

### Setup Steps:

1. **Create Google Cloud Account**
   - Go to https://console.cloud.google.com/
   - Enable Text-to-Speech API
   - Create API key or service account

2. **Install Package**
   ```bash
   cd backend
   npm install @google-cloud/text-to-speech
   ```

3. **Create Backend TTS Service** (`backend/services/ttsService.js`):
   ```javascript
   const textToSpeech = require('@google-cloud/text-to-speech');
   const fs = require('fs');
   const util = require('util');

   const client = new textToSpeech.TextToSpeechClient({
     keyFilename: './config/google-cloud-key.json'
   });

   // Voice mapping for Indian languages
   const VOICE_MAP = {
     'hi-IN': { languageCode: 'hi-IN', name: 'hi-IN-Wavenet-A' },
     'bn-IN': { languageCode: 'bn-IN', name: 'bn-IN-Wavenet-A' },
     'ta-IN': { languageCode: 'ta-IN', name: 'ta-IN-Wavenet-A' },
     'te-IN': { languageCode: 'te-IN', name: 'te-IN-Wavenet-A' },
     'mr-IN': { languageCode: 'mr-IN', name: 'mr-IN-Wavenet-A' },
     'en-IN': { languageCode: 'en-IN', name: 'en-IN-Wavenet-D' }
   };

   async function synthesizeSpeech(text, languageCode) {
     const voice = VOICE_MAP[languageCode] || VOICE_MAP['hi-IN'];

     const request = {
       input: { text },
       voice: {
         languageCode: voice.languageCode,
         name: voice.name
       },
       audioConfig: {
         audioEncoding: 'MP3',
         pitch: 0,
         speakingRate: 0.9
       }
     };

     try {
       const [response] = await client.synthesizeSpeech(request);
       return response.audioContent; // Base64 audio
     } catch (error) {
       console.error('TTS Error:', error);
       throw error;
     }
   }

   module.exports = { synthesizeSpeech };
   ```

4. **Create API Route** (`backend/routes/tts.js`):
   ```javascript
   const express = require('express');
   const router = express.Router();
   const { synthesizeSpeech } = require('../services/ttsService');

   router.post('/synthesize', async (req, res) => {
     try {
       const { text, language } = req.body;
       
       if (!text || !language) {
         return res.status(400).json({ error: 'Text and language required' });
       }

       const audioContent = await synthesizeSpeech(text, language);
       
       res.json({
         success: true,
         audio: audioContent.toString('base64')
       });
     } catch (error) {
       console.error('Synthesis error:', error);
       res.status(500).json({ error: 'Speech synthesis failed' });
     }
   });

   module.exports = router;
   ```

5. **Register Route** (`backend/server.js`):
   ```javascript
   const ttsRoutes = require('./routes/tts');
   app.use('/api/tts', ttsRoutes);
   ```

6. **Update Frontend** (`frontend/src/services/ttsService.js`):
   ```javascript
   import axios from 'axios';

   export const ttsAPI = {
     synthesize: async (text, language) => {
       const response = await axios.post('/api/tts/synthesize', {
         text,
         language
       });
       return response.data;
     }
   };
   ```

7. **Update AIChatbot.jsx** - Replace the `speak()` function:
   ```javascript
   const speak = async (text) => {
     try {
       setIsSpeaking(true);
       
       // Try Google Cloud TTS first
       const response = await ttsAPI.synthesize(text, selectedLanguage);
       const audio = new Audio(`data:audio/mp3;base64,${response.audio}`);
       
       audio.onended = () => setIsSpeaking(false);
       audio.onerror = () => {
         setIsSpeaking(false);
         // Fallback to browser TTS
         speakWithBrowserTTS(text);
       };
       
       await audio.play();
     } catch (error) {
       console.error('Google TTS failed, using fallback:', error);
       speakWithBrowserTTS(text);
     }
   };

   // Keep existing browser TTS as fallback
   const speakWithBrowserTTS = (text) => {
     // ... your existing speak() implementation ...
   };
   ```

**Pricing:** Free for first 1 million characters/month, then $4 per million

---

## 🆓 **Option 2: Install System Voices** (FREE)

### Windows 10/11:

1. **Open Settings** → Time & Language → Language & region
2. Click "Add a language"
3. Search and add:
   - বাংলা (ভারত) - Bengali (India)
   - தமிழ் (இந்தியா) - Tamil (India)
   - తెలుగు (భారతదేశం) - Telugu (India)
   - मराठी (भारत) - Marathi (India)
4. For each language:
   - Click ⋯ (Options)
   - Download "Speech" pack
   - Restart browser

### macOS:

1. **System Preferences** → Accessibility → Spoken Content
2. Click "System Voice" → Manage Voices
3. Download:
   - Lekha (Hindi)
   - Veena (Indian English)
   - (Tamil, Telugu voices may be limited on Mac)

### Linux (Ubuntu/Debian):

```bash
# Install eSpeak NG for Indian languages
sudo apt-get install espeak-ng espeak-ng-data

# Install language-specific data
sudo apt-get install espeak-ng-data-hi  # Hindi
sudo apt-get install espeak-ng-data-bn  # Bengali
sudo apt-get install espeak-ng-data-ta  # Tamil
sudo apt-get install espeak-ng-data-te  # Telugu
sudo apt-get install espeak-ng-data-mr  # Marathi
```

**After installation:** Restart your browser and the voices will appear automatically!

---

## 🌐 **Option 3: ResponsiveVoice** (Paid Service)

**Best for:** Quick integration, no backend needed

1. **Sign up** at https://responsivevoice.org/
2. **Add to HTML** (`index.html`):
   ```html
   <script src="https://code.responsivevoice.org/responsivevoice.js?key=YOUR_API_KEY"></script>
   ```

3. **Update speak() function**:
   ```javascript
   const speak = (text) => {
     if (window.responsiveVoice) {
       const voiceMap = {
         'hi-IN': 'Hindi Female',
         'bn-IN': 'Bengali Female',
         'ta-IN': 'Tamil Female',
         'te-IN': 'Telugu Female',
         'mr-IN': 'Hindi Female', // Marathi uses Hindi voice
         'en-IN': 'Indian English Female'
       };

       responsiveVoice.speak(text, voiceMap[selectedLanguage] || 'Hindi Female', {
         rate: 0.9,
         pitch: 1,
         volume: 1,
         onstart: () => setIsSpeaking(true),
         onend: () => setIsSpeaking(false)
       });
     }
   };
   ```

**Pricing:** Free for non-commercial (limited), $49-399/year for commercial

---

## 🔄 **Option 4: Web Speech API + Translation Fallback** (Already Implemented)

**Current Status:** Your app already has intelligent fallbacks!

The code now:
- ✅ Uses native voice if available
- ✅ Falls back to English (India) voice for missing languages
- ✅ Shows "(⚠️ Limited)" label for languages without native voices
- ✅ Transliterates text phonetically (coming soon)

---

## 📊 **Comparison Table**

| Solution | Cost | Quality | Setup | Languages |
|----------|------|---------|-------|-----------|
| Google Cloud TTS | $4/1M chars (after free tier) | ⭐⭐⭐⭐⭐ | Medium | All 6 |
| System Voices | Free | ⭐⭐⭐ | Easy | 2-4 (varies) |
| ResponsiveVoice | $49-399/year | ⭐⭐⭐⭐ | Very Easy | All 6 |
| Browser TTS + Fallback | Free | ⭐⭐ | Done ✅ | 2 native + fallback |

---

## 🚀 **Recommended Approach**

**For Development/Testing:**
- Use current browser TTS (already working!)
- Install system voices (Windows language packs)

**For Production:**
- Implement Google Cloud TTS (best quality + reliability)
- Keep browser TTS as fallback
- Show language availability status to users

---

## 🛠️ **Quick Win: Add Visual Indicator**

Already added to your code! Now shows:
- 🇮🇳 हिंदी ✅
- 🇮🇳 বাংলা (⚠️ Limited) 
- 🇮🇳 தமிழ் (⚠️ Limited)
- 🇮🇳 తెలుగు (⚠️ Limited)
- 🇮🇳 मराठी (⚠️ Limited)

---

## 📝 **Next Steps**

1. **Immediate:** Test with Windows language packs (free)
2. **Short-term:** Set up Google Cloud TTS (best quality)
3. **Long-term:** Add user preference for TTS provider

Need help implementing any of these? Let me know! 🚀
