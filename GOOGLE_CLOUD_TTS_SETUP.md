# 🎙️ Google Cloud Text-to-Speech Setup Guide

Complete step-by-step guide to enable ALL Indian language voices (Hindi, Bengali, Tamil, Telugu, Marathi, English).

---

## 📋 Prerequisites

- Google account
- Credit card (for verification - won't be charged unless you exceed free tier)
- Node.js project (already have ✅)

---

## 🚀 Step 1: Google Cloud Setup

### 1.1 Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"New Project"**
3. Project name: `Cultivate-TTS`
4. Click **"Create"**

### 1.2 Enable Text-to-Speech API

1. In the Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for **"Cloud Text-to-Speech API"**
3. Click on it
4. Click **"Enable"**
5. Wait for confirmation (takes 30 seconds)

### 1.3 Create API Key (Easiest Method)

1. Go to **APIs & Services** → **Credentials**
2. Click **"+ CREATE CREDENTIALS"**
3. Select **"API Key"**
4. Copy the API key (looks like: `AIzaSyC...`)
5. Click **"Restrict Key"** (recommended for security):
   - Application restrictions: None (for now)
   - API restrictions: Select "Cloud Text-to-Speech API"
6. Save

**IMPORTANT:** Copy your API key immediately! You'll need it.

---

## 💻 Step 2: Backend Setup

### 2.1 Install Required Package

```bash
cd backend
npm install @google-cloud/text-to-speech
```

### 2.2 Add Environment Variable

Create or update `backend/.env`:

```env
# Google Cloud Text-to-Speech API Key
GOOGLE_CLOUD_API_KEY=YOUR_API_KEY_HERE

# Example:
# GOOGLE_CLOUD_API_KEY=AIzaSyC_xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Security Note:** Never commit `.env` file to Git!

### 2.3 Update server.js

Add this line to your `backend/server.js`:

```javascript
// Add after other routes
const ttsRoutes = require('./routes/tts');
app.use('/api/tts', ttsRoutes);
```

Full example:
```javascript
// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chatRoutes');
const weatherRoutes = require('./routes/weather');
const ttsRoutes = require('./routes/tts'); // ← ADD THIS

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/tts', ttsRoutes); // ← ADD THIS

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🌐 Step 3: Frontend Integration

### 3.1 Update AIChatbot.jsx

Replace the `speak()` function in `frontend/src/components/AIChatbot.jsx`:

```javascript
// Add import at top
import { ttsAPI } from '../services/ttsService';

// Replace the existing speak() function with this:
const speak = async (text) => {
  if (!text || !text.trim()) return;

  console.log('🔊 Attempting to speak:', text.substring(0, 50) + '...');

  // Stop any ongoing speech
  stopSpeaking();

  try {
    setIsSpeaking(true);

    // Try Google Cloud TTS first
    console.log('📡 Requesting Google Cloud TTS...');
    const response = await ttsAPI.synthesize(text, selectedLanguage, {
      rate: 0.9,
      pitch: 0,
      volume: 0
    });

    // Create audio element from base64 MP3
    const audio = new Audio(`data:audio/mp3;base64,${response.audio}`);

    audio.onended = () => {
      console.log('✅ Speech completed');
      setIsSpeaking(false);
    };

    audio.onerror = (error) => {
      console.error('❌ Audio playback error:', error);
      setIsSpeaking(false);
      // Fallback to browser TTS
      speakWithBrowserTTS(text);
    };

    await audio.play();
    console.log('▶️ Playing Google Cloud TTS audio');

  } catch (error) {
    console.error('❌ Google Cloud TTS failed:', error);
    console.log('🔄 Falling back to browser TTS');
    
    // Fallback to browser TTS
    speakWithBrowserTTS(text);
  }
};

// Rename existing speak function to speakWithBrowserTTS
const speakWithBrowserTTS = (text) => {
  if (!('speechSynthesis' in window)) {
    console.error('❌ Speech synthesis not supported');
    setError('आपके ब्राउज़र में वॉइस आउटपुट उपलब्ध नहीं है। (Voice output not supported in your browser)');
    return;
  }

  // ... rest of your existing speak() implementation (the chunking code) ...
  // Just rename it to speakWithBrowserTTS
};
```

### 3.2 Add TTS Status Check (Optional)

Add this to check if Google TTS is working:

```javascript
// In AIChatbot component, add useEffect to check TTS status
useEffect(() => {
  const checkTTSStatus = async () => {
    try {
      const status = await ttsAPI.checkStatus();
      if (status.configured) {
        console.log('✅ Google Cloud TTS is configured and ready');
      } else {
        console.warn('⚠️ Google Cloud TTS not configured, using browser fallback');
      }
    } catch (error) {
      console.warn('⚠️ Could not check TTS status');
    }
  };

  checkTTSStatus();
}, []);
```

---

## 🧪 Step 4: Testing

### 4.1 Start Backend

```bash
cd backend
node server.js
```

Expected output:
```
Server running on port 5001
```

### 4.2 Test TTS Endpoint (Optional)

Test with curl or Postman:

```bash
curl -X POST http://localhost:5001/api/tts/synthesize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "नमस्ते! मैं आपका कृषि सहायक हूं।",
    "language": "hi-IN"
  }'
```

Expected: JSON response with base64 audio

### 4.3 Test in Browser

1. Start frontend: `npm run dev`
2. Open chatbot
3. Select different languages (हिंदी, বাংলা, தமிழ், తెలుగు, मराठी)
4. Send a message
5. Click voice button to hear response

---

## ✅ Verification Checklist

- [ ] Google Cloud project created
- [ ] Text-to-Speech API enabled
- [ ] API key created and copied
- [ ] `@google-cloud/text-to-speech` package installed
- [ ] `.env` file created with API key
- [ ] TTS routes added to server.js
- [ ] Frontend updated with ttsAPI
- [ ] Backend starts without errors
- [ ] Can test TTS endpoint
- [ ] Voice works for all languages in browser

---

## 🎉 Expected Results

After setup, you should have:

✅ **Hindi (हिंदी)** - Native Google voice
✅ **Bengali (বাংলা)** - Native Google voice
✅ **Tamil (தமிழ்)** - Native Google voice
✅ **Telugu (తెలుగు)** - Native Google voice
✅ **Marathi (मराठी)** - Native Google voice
✅ **English (India)** - Native Google voice

All with **high-quality, natural-sounding voices**!

---

## 💰 Pricing & Free Tier

**Free Tier:**
- 1 million characters per month FREE
- Standard voices: $4 per million characters after free tier
- WaveNet voices: $16 per million characters after free tier

**Example Usage:**
- 1 message = ~100 characters
- 1 million characters = ~10,000 messages
- **You can serve 10,000+ conversations per month FREE!**

---

## 🔒 Security Best Practices

1. **Never commit `.env` file**
   ```bash
   # Add to .gitignore
   echo ".env" >> .gitignore
   ```

2. **Restrict API Key** (in Google Cloud Console):
   - Set HTTP referrer restrictions (production)
   - Limit to specific API (Text-to-Speech only)
   - Rotate keys periodically

3. **Add Rate Limiting** (backend):
   ```javascript
   const rateLimit = require('express-rate-limit');

   const ttsLimiter = rateLimit({
     windowMs: 60 * 1000, // 1 minute
     max: 10 // 10 requests per minute
   });

   app.use('/api/tts', ttsLimiter, ttsRoutes);
   ```

---

## 🐛 Troubleshooting

### Problem: "API key not valid"
**Solution:** 
1. Check if API is enabled in Google Cloud Console
2. Verify API key is correct in `.env`
3. Make sure there are no extra spaces in API key

### Problem: "Billing not enabled"
**Solution:**
1. Go to Billing in Google Cloud Console
2. Add payment method (won't be charged in free tier)
3. Link billing account to project

### Problem: Backend can't find API key
**Solution:**
```javascript
// In ttsService.js, add this check:
if (!process.env.GOOGLE_CLOUD_API_KEY) {
  console.error('❌ GOOGLE_CLOUD_API_KEY not found in environment variables');
  throw new Error('TTS not configured');
}
```

### Problem: "Audio won't play in browser"
**Solution:**
- Check browser console for errors
- Verify audio format is MP3
- Test with different browser
- Check if browser auto-play is blocked

---

## 📞 Need Help?

If you encounter issues:

1. **Check logs:** Backend console and browser console
2. **Test endpoint:** Use curl/Postman to test `/api/tts/synthesize`
3. **Verify API key:** Log into Google Cloud Console
4. **Check quota:** Cloud Console → APIs & Services → Dashboard

---

## 🎯 Alternative: Service Account (More Secure)

Instead of API key, use service account (recommended for production):

1. **Create Service Account:**
   - Console → IAM & Admin → Service Accounts
   - Create service account
   - Grant role: "Cloud Text-to-Speech User"

2. **Download Key:**
   - Create JSON key
   - Save as `backend/config/google-cloud-key.json`

3. **Update ttsService.js:**
   ```javascript
   const client = new textToSpeech.TextToSpeechClient({
     keyFilename: './config/google-cloud-key.json'
   });
   ```

4. **Add to .gitignore:**
   ```
   config/google-cloud-key.json
   ```

---

**You're all set! 🚀 All Indian language voices will now work beautifully in your app!**
