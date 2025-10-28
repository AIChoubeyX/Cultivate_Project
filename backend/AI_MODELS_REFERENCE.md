# 🤖 OpenRouter AI Models Reference

## Current Implementation
Your app now tries **5 different free models** in order until one succeeds:

1. ✅ **google/gemini-flash-1.5:free** (PRIMARY - Best reliability)
2. ✅ **google/gemini-2.0-flash-exp:free** (Latest experimental)
3. ✅ **meta-llama/llama-3.1-8b-instruct:free** (Larger Llama model)
4. ✅ **meta-llama/llama-3.2-3b-instruct:free** (Original choice)
5. ✅ **mistralai/mistral-7b-instruct:free** (Alternative)

If ALL fail → Uses your comprehensive **fallback suggestions** (which work great!)

---

## 🆓 All Available FREE Models on OpenRouter

### Google Gemini (RECOMMENDED)
- `google/gemini-flash-1.5:free` ⭐⭐⭐⭐⭐
- `google/gemini-2.0-flash-exp:free` ⭐⭐⭐⭐⭐
- `google/gemini-pro-1.5:free` ⭐⭐⭐⭐

**Pros:** Fast, reliable, good rate limits, excellent quality  
**Best for:** Production apps like yours

### Meta Llama
- `meta-llama/llama-3.1-405b-instruct:free` ⭐⭐⭐⭐⭐ (Huge model)
- `meta-llama/llama-3.1-70b-instruct:free` ⭐⭐⭐⭐
- `meta-llama/llama-3.1-8b-instruct:free` ⭐⭐⭐⭐
- `meta-llama/llama-3.2-3b-instruct:free` ⭐⭐⭐
- `meta-llama/llama-3.2-1b-instruct:free` ⭐⭐

**Pros:** Open source, good quality  
**Cons:** Stricter rate limits (prone to 429 errors)

### Mistral AI
- `mistralai/mistral-7b-instruct:free` ⭐⭐⭐⭐
- `mistralai/mixtral-8x7b-instruct:free` ⭐⭐⭐⭐

**Pros:** Fast, efficient, good alternative  
**Best for:** Backup when others fail

### Microsoft Phi
- `microsoft/phi-3-medium-128k-instruct:free` ⭐⭐⭐
- `microsoft/phi-3-mini-128k-instruct:free` ⭐⭐

**Pros:** Small, fast, long context (128k tokens)  
**Best for:** Simple tasks

---

## 💰 Paid Models (Better Performance)

### Ultra-Low Cost (Recommended for Production)
```javascript
// Only ~$0.01 per 1000 requests!
"google/gemini-flash-1.5"        // $0.075 per 1M tokens
"openai/gpt-4o-mini"             // $0.15 per 1M tokens  
"anthropic/claude-3-haiku"       // $0.25 per 1M tokens
```

### Premium Models (Best Quality)
```javascript
"openai/gpt-4o"                  // $2.50 per 1M tokens
"anthropic/claude-3.5-sonnet"    // $3.00 per 1M tokens
"google/gemini-pro-1.5"          // $1.25 per 1M tokens
```

---

## 🔧 How to Switch Models

### Option 1: Change Primary Model in Code
Edit `weatherController.js` line 211:
```javascript
const freeModels = [
  "your-preferred-model-here",  // Change this
  // ... rest of fallbacks
];
```

### Option 2: Use Environment Variable (BEST)
Add to your `.env` file:
```env
OPENROUTER_MODEL=google/gemini-flash-1.5:free
```

Then update code:
```javascript
const primaryModel = process.env.OPENROUTER_MODEL || "google/gemini-flash-1.5:free";
```

### Option 3: Upgrade to Paid Model
1. Add credits to OpenRouter account
2. Change to paid model:
```javascript
model: "google/gemini-flash-1.5"  // Remove ":free"
```

---

## 🚀 Alternative: Direct Google Gemini API

Instead of OpenRouter, use Google's API directly:

**Benefits:**
- 🆓 Free tier: 15 requests/min, 1500 requests/day
- 🚀 Faster (no middleman)
- 🔒 More reliable

**Setup:**
1. Get free API key: https://makersuite.google.com/app/apikey
2. Install: `npm install @google/generative-ai`
3. Use Gemini directly (I can help you implement this)

---

## 📊 Rate Limits (Free Tier)

| Model | Requests/Min | Requests/Day |
|-------|--------------|--------------|
| Google Gemini | ~20 | Unlimited* |
| Meta Llama | ~5-10 | ~200 |
| Mistral | ~10 | ~500 |

*Subject to fair use

---

## 🔍 Testing Different Models

Want to test which model works best? Run:
```bash
curl https://openrouter.ai/api/v1/models
```

Or check live status:
https://openrouter.ai/models

---

## 💡 Recommendations

### For Your Farming App:

1. **Best Setup (Current):** Multiple free model fallbacks ✅
2. **If you get revenue:** Upgrade to `google/gemini-flash-1.5` ($0.075/1M tokens)
3. **For maximum reliability:** Use direct Google Gemini API
4. **Emergency backup:** Your fallback suggestions work perfectly!

### Cost Estimate:
- 1000 AI suggestions = ~600k tokens = **$0.045** (4.5 cents!)
- Very affordable for production use

---

## 🐛 Troubleshooting

### "Rate Limited" Error (429)
✅ **Your app now handles this automatically** by trying multiple models!

### All Models Failing
- Check OpenRouter status: https://status.openrouter.ai/
- Verify API key is correct
- Your fallback suggestions will work

### Slow Response
- Try smaller models: `llama-3.2-1b` or `phi-3-mini`
- Or use Gemini (faster)

---

## 📞 Need Help?

- OpenRouter Docs: https://openrouter.ai/docs
- Discord: https://discord.gg/openrouter
- API Status: https://status.openrouter.ai/

---

**Last Updated:** October 2025  
**Your Implementation:** Multi-model fallback with 5 free models ✅
