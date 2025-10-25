# 🤖 AI Twin Quick Reference

## 🚀 Quick Start (Windows)

```powershell
# 1. Run setup wizard
node ai-twin-interactive-setup.js

# 2. Or run the batch script
.\setup-ai-twin.bat

# 3. Install backend dependencies
npm install express cors dotenv

# 4. Add your API key to .env
# Edit .env and add: ANTHROPIC_API_KEY=your_key_here

# 5. Run backend (Terminal 1)
node ai-twin-server.js

# 6. Run frontend (Terminal 2)
npm run dev
```

## 🚀 Quick Start (Mac/Linux)

```bash
# 1. Run setup wizard
node ai-twin-interactive-setup.js

# 2. Or run the shell script
bash setup-ai-twin.sh

# 3. Install backend dependencies
npm install express cors dotenv

# 4. Add your API key to .env
# Edit .env and add: ANTHROPIC_API_KEY=your_key_here

# 5. Run backend (Terminal 1)
node ai-twin-server.js

# 6. Run frontend (Terminal 2)
npm run dev
```

---

## 📋 Getting Your API Key

**For Claude AI:**
1. Go to https://console.anthropic.com
2. Sign up (free account)
3. Click "API Keys" in left sidebar
4. Click "Create Key"
5. Copy the key and paste in .env

---

## 🎨 Customization Cheat Sheet

### Update AI Twin Information
**File:** `ai-twin-server.js`
**Location:** Find `SYSTEM_PROMPT` variable
```javascript
const SYSTEM_PROMPT = `You are Arhan's AI Twin...
// Edit here to add/update:
// - Skills
// - Projects
// - Experience
// - Contact info
`;
```

### Change Colors
**File:** `src/components/AiTwin.jsx`
```jsx
// Button gradient
from-purple-500 to-blue-600

// Message bubble
bg-blue-600

// Header background
from-purple-600 to-blue-600
```

### Change Behavior
```javascript
max_tokens: 1024           // Response length
rows="2"                   // Input box size
duration: 2                // Animation speed
PORT=3001                  // Server port
```

---

## 🔧 Troubleshooting Quick Fixes

| Issue | Fix |
|-------|-----|
| AI Twin button missing | Check `src/App.jsx` has import for AiTwin |
| Chat not sending messages | Start backend: `node ai-twin-server.js` |
| "ANTHROPIC_API_KEY not set" | Add key to `.env` file |
| Backend won't start | Run: `npm install express cors dotenv` |
| Responses are slow | Use Ollama instead or increase timeout |
| Port 3001 already in use | Change `PORT=3002` in `.env` |

---

## 📁 Important Files

```
ai-twin-server.js              ← Backend server (edit to customize AI)
src/components/AiTwin.jsx      ← Chat UI (edit for styling)
src/App.jsx                    ← Main app (already updated)
vite.config.js                 ← Proxy config (already updated)
.env                           ← Your API key (create this!)
AI_TWIN_SETUP.md               ← Full setup guide
AI_TWIN_SUMMARY.md             ← Complete overview
```

---

## 🎯 What Your AI Twin Can Do

- ✅ Answer questions about your skills
- ✅ Discuss your projects
- ✅ Talk about experience/achievements
- ✅ Check availability for work
- ✅ Suggest how to contact you
- ✅ Have natural conversations
- ✅ Remember context (conversation history)
- ✅ Be friendly and professional

---

## 💡 Pro Tips

1. **Test locally first** - Run on localhost before deploying
2. **Save conversations** - Add database later for analytics
3. **Monitor costs** - Log API usage, consider rate limiting
4. **Customize system prompt** - Add more personality/info
5. **Cache responses** - For common questions
6. **Use Ollama for dev** - Test UI without API costs
7. **Deploy backend separately** - Use Railway/Render
8. **Set up error alerts** - Know when AI Twin fails

---

## 🌐 Deployment Quick Links

- **Vercel** (Frontend): vercel.com
- **Railway** (Backend): railway.app
- **Render** (Backend): render.com
- **Netlify** (Frontend): netlify.com
- **Anthropic Console** (API Keys): console.anthropic.com
- **Ollama** (Local AI): ollama.ai

---

## 🎓 Learning Resources

- Claude API Docs: https://docs.anthropic.com
- Ollama: https://ollama.ai
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Express.js: https://expressjs.com
- Tailwind CSS: https://tailwindcss.com

---

## ❓ FAQ

**Q: Do I need an API key to use AI Twin?**
A: No! Demo mode works without one. But Claude AI requires a key for real AI responses.

**Q: How much will it cost?**
A: ~$0.01-0.05 per conversation with Claude. Use Ollama for free!

**Q: Can I run this locally?**
A: Yes! Use Ollama for free, local AI with no internet needed (for development).

**Q: Can I customize what the AI knows?**
A: Yes! Edit the SYSTEM_PROMPT in ai-twin-server.js to add your info.

**Q: Will this work on my portfolio?**
A: Yes! It's a React component that works everywhere your portfolio runs.

**Q: Is it mobile-friendly?**
A: Yes! Responsive design works on all devices.

---

## 📊 File Sizes

- `AiTwin.jsx` - ~8 KB
- `ai-twin-server.js` - ~4 KB
- Bundle impact - <50 KB gzipped

---

## 🎉 You're All Set!

Your AI Twin is ready to serve visitors 24/7! 

Next: Get your Anthropic API key and start chatting! 🚀

For detailed help, see `AI_TWIN_SETUP.md`
