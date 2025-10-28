# 🎤 Install Indian Language Voices on Windows (FREE)

Quick guide to install Bengali, Tamil, Telugu, and Marathi voices on Windows 10/11.

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Open Language Settings

**Method 1:** Windows 11
1. Press `Win + I` to open Settings
2. Go to **Time & Language** → **Language & region**

**Method 2:** Windows 10
1. Press `Win + I` to open Settings  
2. Go to **Time & Language** → **Language**

**Method 3:** Direct
- Press `Win + R`
- Type: `ms-settings:regionlanguage`
- Press Enter

---

### Step 2: Add Indian Languages

Click **"Add a language"** or **"+ Add a language"** and search for each:

#### 1. Bengali (বাংলা)
- Search: `Bengali` or `বাংলা`
- Select: **বাংলা (ভারত)** - Bengali (India)
- Click **"Next"** → **"Install"**

#### 2. Tamil (தமிழ்)
- Search: `Tamil` or `தமிழ்`
- Select: **தமிழ் (இந்தியா)** - Tamil (India)
- Click **"Next"** → **"Install"**

#### 3. Telugu (తెలుగు)
- Search: `Telugu` or `తెలుగు`
- Select: **తెలుగు (భారతదేశం)** - Telugu (India)
- Click **"Next"** → **"Install"**

#### 4. Marathi (मराठी)
- Search: `Marathi` or `मराठी`
- Select: **मराठी (भारत)** - Marathi (India)
- Click **"Next"** → **"Install"**

---

### Step 3: Download Speech Packs

For **each language** you added:

1. Find the language in your list
2. Click the **⋯** (three dots) next to the language name
3. Click **"Language options"**
4. Scroll down to **"Speech"** section
5. Click **"Download"** button
6. Wait for download to complete (usually 50-200 MB per language)

#### Example Screenshots:
```
Language: বাংলা (ভারত)
  → Language options
    → Speech ✓ Download (or "Downloaded" if done)
    → Basic typing
    → Handwriting
```

---

### Step 4: Restart Browser

**Important:** After all speech packs are downloaded:

1. Close **all browser windows** completely
2. Reopen your browser
3. Go back to your Cultivate app
4. Test voice output

---

## ✅ Verification

After setup, test in browser console:

```javascript
// Open browser console (F12)
// Run this command:
window.speechSynthesis.getVoices().filter(v => 
  v.lang.startsWith('hi') || 
  v.lang.startsWith('bn') || 
  v.lang.startsWith('ta') || 
  v.lang.startsWith('te') || 
  v.lang.startsWith('mr')
).forEach(v => console.log(v.name, v.lang));
```

**Expected output:**
```
Microsoft Hemant - Hindi (India) hi-IN
Microsoft Swara - Bengali (India) bn-IN
Microsoft Valluvar - Tamil (India) ta-IN
Microsoft Chitra - Telugu (India) te-IN
Microsoft Abhishek - Marathi (India) mr-IN
```

---

## 🎯 What You Get

| Language | Voice Name | Gender | Quality |
|----------|-----------|---------|---------|
| Hindi | Microsoft Hemant | Male | Good |
| Bengali | Microsoft Swara | Female | Good |
| Tamil | Microsoft Valluvar | Male | Good |
| Telugu | Microsoft Chitra | Female | Good |
| Marathi | Microsoft Abhishek | Male | Good |

**Note:** Microsoft voices are decent quality but not as natural as Google Cloud voices. For best quality, use Google Cloud TTS (see `GOOGLE_CLOUD_TTS_SETUP.md`).

---

## 💾 Storage Requirements

- Bengali: ~100 MB
- Tamil: ~80 MB
- Telugu: ~85 MB
- Marathi: ~90 MB
- **Total:** ~355 MB

---

## 🔧 Troubleshooting

### Problem: "Download" button is grayed out

**Solution:**
1. Make sure you have internet connection
2. Restart Windows Settings app
3. Try again

### Problem: Voice still not showing in browser

**Solution:**
1. Make sure download shows "✓ Downloaded"
2. Close **ALL** browser windows (not just tabs)
3. Restart browser completely
4. Clear browser cache (Ctrl+Shift+Delete)
5. Try again

### Problem: Download stuck at 0%

**Solution:**
1. Cancel download
2. Restart computer
3. Go to Settings → Update & Security → Troubleshoot
4. Run Windows Update troubleshooter
5. Try downloading again

### Problem: Language options not showing

**Solution:**
1. Make sure you selected the **India** variant:
   - ✅ বাংলা (ভারত) - Bengali (India)
   - ❌ বাংলা (বাংলাদেশ) - Bengali (Bangladesh)
2. Remove language and add again
3. Restart Windows Settings app

---

## 🌐 Alternative: Chrome Remote Voices

If Windows voices don't work, Chrome/Edge have **remote Google voices** that work without installation:

### How to Use:

1. **Enable internet connection** (required)
2. Open your Cultivate app
3. Chrome will automatically use:
   - `Google हिन्दी` (Hindi)
   - Other languages may use English fallback

**Pros:**
- No installation needed
- Works immediately
- Good quality

**Cons:**
- Requires internet connection
- Limited language coverage
- May have latency

---

## 📱 Bonus: Enable on Mobile

### Android:
1. Settings → System → Languages & input
2. Text-to-speech output → Preferred engine
3. Select "Google Text-to-speech Engine"
4. Settings → Install voice data
5. Download Indian languages

### iOS:
1. Settings → Accessibility → Spoken Content
2. Voices → Add New Language
3. Download Hindi, English (India)
4. (Tamil, Telugu, Bengali may be limited)

---

## 🎉 Success Indicator

After completing setup, your Cultivate app will show:

- 🇮🇳 हिंदी ✅ (was already working)
- 🇮🇳 বাংলা ✅ (NOW WORKING!)
- 🇮🇳 தமிழ் ✅ (NOW WORKING!)
- 🇮🇳 తెలుగు ✅ (NOW WORKING!)
- 🇮🇳 मराठी ✅ (NOW WORKING!)
- 🇬🇧 English ✅ (was already working)

The "(⚠️ Limited)" label will disappear once voices are detected!

---

## ⏱️ Estimated Time

- Language installation: 2 minutes
- Speech pack downloads: 5-10 minutes (depending on internet speed)
- Browser restart: 30 seconds
- **Total:** ~10-15 minutes

---

## 🚀 Next Steps

After installing Windows voices:

1. **Test each language** in your Cultivate app
2. **Compare quality** with Google Cloud TTS demo
3. **Decide:** Keep free Windows voices OR upgrade to Google Cloud TTS for better quality
4. **Optional:** Set up Google Cloud TTS for production (see `GOOGLE_CLOUD_TTS_SETUP.md`)

---

**Free Windows voices are a great starting point! For production apps with thousands of users, consider Google Cloud TTS for premium quality. 🎯**
