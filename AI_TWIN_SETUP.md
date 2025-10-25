# AI Twin Setup Guide

## Overview
The AI Twin is a 24/7 intelligent assistant that knows everything about you and can answer visitors' questions about your skills, projects, and availability.

## Architecture

```
Frontend (React)
    ↓
AI Twin Component (Beautiful Chat UI)
    ↓
Vite Dev Server / Proxy
    ↓
Backend Server (Express)
    ↓
Claude API (Anthropic)
```

## Quick Setup

### Option 1: Using Claude AI (Recommended - Production)

#### Step 1: Get an API Key
1. Go to https://console.anthropic.com
2. Sign up and create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key

#### Step 2: Configure Backend Server
```bash
# Install dependencies
npm install express cors dotenv

# Create .env file in project root
echo "ANTHROPIC_API_KEY=your_api_key_here" > .env

# Run the backend server
node ai-twin-server.js
```

#### Step 3: Run Vite Dev Server
In a new terminal:
```bash
npm run dev
```

The AI Twin will now be available on your portfolio!

---

### Option 2: Using Ollama (Local - Free, No API Costs)

Ollama lets you run AI models locally without any API costs.

#### Step 1: Install Ollama
- Download from https://ollama.ai
- Install and run the application
- It will run on `localhost:11434`

#### Step 2: Pull a Model
```bash
ollama pull mistral
# or
ollama pull llama2
```

#### Step 3: Modify AI Twin Component
In `src/components/AiTwin.jsx`, change the API endpoint:
```javascript
// Change from:
const response = await axios.post("/api/ai-twin", { ... })

// To local Ollama:
const response = await fetch("http://localhost:11434/api/chat", {
  method: "POST",
  body: JSON.stringify({
    model: "mistral",
    messages: [...],
    stream: false,
  })
})
```

#### Step 4: Run
```bash
npm run dev
```

---

### Option 3: Demo Mode (Development)
The AI Twin works in demo mode without any API key! It provides intelligent sample responses based on keywords.

Just run `npm run dev` and the chat will work with predefined smart responses.

---

## Features

✨ **Beautiful UI**
- Modern gradient design matching your portfolio
- Smooth animations and transitions
- Minimize/Maximize functionality
- Responsive on all devices

🤖 **Smart AI**
- Knows about your skills, projects, and experience
- Maintains conversation context
- Professional yet friendly tone
- Answers 24/7

⚡ **Performance**
- Lightweight component
- Optimized API calls
- Smooth scrolling through messages
- No blocking UI

🎯 **Customization**
- Easy to modify the system prompt
- Add more information about yourself
- Change styling/colors
- Adjust behavior

---

## Customizing Your AI Twin

### Update Information
Edit the `SYSTEM_PROMPT` in `ai-twin-server.js` to add:
- New skills or technologies you've learned
- Recent projects or achievements
- Updated availability status
- Personal information
- Links or contact details

### Styling
Modify colors and appearance in `src/components/AiTwin.jsx`:
```jsx
// Change gradient colors
className="bg-gradient-to-br from-purple-500 to-blue-600"

// Change message bubble colors
className="bg-blue-600 text-white"
```

### Behavior
Adjust in the component:
- Message history size
- Response timeout
- Text input size
- Animation speeds

---

## Deployment

### Vercel / Netlify (Frontend Only)
If using demo mode or want to add backend later:
```bash
npm run build
# Deploy the dist folder
```

### Full Stack Deployment
For Claude API integration:

**Option A: Vercel Functions**
```bash
# Deploy ai-twin-server.js as a Vercel Function
# Set ANTHROPIC_API_KEY environment variable in Vercel dashboard
```

**Option B: Railway / Render**
```bash
# Push to GitHub
# Connect to Railway/Render
# Add ANTHROPIC_API_KEY environment variable
# Deploy!
```

**Option C: Self-hosted**
```bash
# Deploy ai-twin-server.js to your own server
# Ensure Node.js and dependencies are installed
# Set ANTHROPIC_API_KEY environment variable
```

---

## Troubleshooting

**Q: AI Twin not responding?**
- Check if backend server is running
- Verify ANTHROPIC_API_KEY is set (if using Claude)
- Check browser console for errors
- Verify API endpoint in vite.config.js proxy

**Q: High API costs?**
- Switch to Ollama (free, local)
- Use demo mode for development
- Cache common responses
- Rate limit messages

**Q: Responses not relevant?**
- Update SYSTEM_PROMPT with your information
- Add more context about yourself
- Provide specific examples

**Q: Slow responses?**
- Increase max_tokens in system prompt
- Use faster model (mistral vs claude)
- Check network connection
- Optimize backend server

---

## Next Steps

1. ✅ Choose your AI provider (Claude, Ollama, or Demo)
2. ✅ Configure backend server
3. ✅ Customize system prompt with your info
4. ✅ Test on localhost
5. ✅ Deploy frontend and backend
6. ✅ Monitor conversations and refine AI responses

Enjoy your 24/7 AI Twin! 🤖✨
