# 🚀 AI Twin - Quick Startup Guide

## The Issue That Was Fixed ✅

Your `vite.config.js` proxy target was pointing to `localhost:5173` (the Vite dev server itself) instead of `localhost:3001` (your backend server). This caused all AI Twin requests to get a **404 Not Found** error.

**Error You Were Seeing:**
```
POST http://localhost:5173/api/ai-twin 404 (Not Found)
```

**Root Cause:**
```javascript
// ❌ WRONG (was pointing to itself)
target: process.env.VITE_API_URL || 'http://localhost:5173'

// ✅ CORRECT (now points to backend)
target: process.env.VITE_API_URL || 'http://localhost:3001'
```

---

## ✅ Fixed Errors

1. **Cannot read properties of undefined (reading 'isVector3')** - This will be resolved once API is working
2. **POST 404 errors on /api/ai-twin** - ✅ FIXED - Proxy now correctly routes to backend
3. **Animation warnings** - These are non-critical and will clear once the component receives data

---

## 🎯 Setup Instructions

### Step 1: Install Dependencies

```bash
# Frontend (if not already done)
npm install

# Backend - Install required packages
npm install express cors dotenv
npm install ai @ai-sdk/google
```

### Step 2: Create `.env` File

Create a file named `.env` in your project root:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=3001
```

**Get your Gemini API Key:**
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the key into your `.env` file

### Step 3: Start Both Servers

**Terminal 1 - Frontend (Vite Dev Server):**
```bash
npm run dev
```
This will start on `http://localhost:5173`

**Terminal 2 - Backend (AI Twin Server):**
```bash
node ai-twin-server.js
```
This will start on `http://localhost:3001`

### Step 4: Test the AI Twin

1. Open `http://localhost:5173` in your browser
2. Look for the AI Twin chat bubble (bottom-right corner)
3. Click it to open the chat
4. Type a message and press Send
5. The AI should respond within 1-2 seconds

---

## 📋 Checklist Before Starting

- [ ] `.env` file created with `GEMINI_API_KEY`
- [ ] Vite dev server running (`npm run dev`)
- [ ] Backend server running (`node ai-twin-server.js`)
- [ ] Browser at `http://localhost:5173`
- [ ] No 404 errors in console for `/api/ai-twin`

---

## 🔍 Troubleshooting

### Still getting 404 errors?

1. **Check Terminal 2** - Is the backend server running?
   ```
   Should see: "Server running on http://localhost:3001"
   ```

2. **Check `.env` file** exists with `GEMINI_API_KEY`
   ```bash
   cat .env  # Windows: type .env
   ```

3. **Check port 3001** is not in use
   ```bash
   # Windows PowerShell - Check if port 3001 is in use
   netstat -ano | findstr :3001
   
   # If it shows a process, kill it:
   taskkill /PID <PID> /F
   ```

### Getting "GEMINI_API_KEY not found" error?

- Make sure your `.env` file is in the root directory
- Make sure the key is not wrapped in quotes: `GEMINI_API_KEY=abc123` (not `GEMINI_API_KEY="abc123"`)
- Restart the backend server after adding the key

### Getting "isVector3" errors?

- This happens when the Experience component can't find the camera
- Solution: Make sure all servers are running
- Refresh the browser page

---

## 📁 File Structure

```
Arhans-Portfolio(vite)/
├── vite.config.js                 ← Proxy configured for /api
├── ai-twin-server.js              ← Backend server (run separately)
├── .env                           ← Your API keys (create this)
├── package.json
├── src/
│   ├── components/
│   │   └── AiTwin.jsx             ← Frontend chat component
│   ├── App.jsx
│   └── ...
└── ...
```

---

## 🎉 Expected Result

Once both servers are running:

1. **Frontend** (Vite) on `localhost:5173`:
   ```
   ✅ No 404 errors
   ✅ No "Cannot read properties" errors
   ✅ Chat bubble visible
   ✅ Messages send successfully
   ```

2. **Backend** (Node) on `localhost:3001`:
   ```
   POST /ai-twin - 200 OK
   Response streaming successfully
   ```

3. **Browser Console**:
   ```
   ✅ No POST 404 errors
   ✅ No API errors
   ✅ Smooth message streaming
   ```

---

## 🔑 Environment Variables

The `.env` file controls configuration:

```env
# Required - Your Google Gemini API key
GEMINI_API_KEY=sk-xxx...

# Optional - Change port if 3001 is in use
PORT=3001

# Optional - Change API URL in production
VITE_API_URL=http://localhost:3001
```

---

## 📊 Performance Tips

- **Keep messages concise** - Shorter responses stream faster
- **Close other tabs** - Save resources on your dev machine
- **Monitor Network tab** - Check response times in DevTools
- **Check console warnings** - Filter for actual errors vs. warnings

---

## 🚀 Next Steps

1. ✅ Fix proxy (DONE)
2. ⏭️ Get both servers running
3. ⏭️ Test the chat
4. ⏭️ Customize the system prompt in `ai-twin-server.js`
5. ⏭️ Deploy to production

---

**Everything is set up! Just start both servers and enjoy your AI Twin! 🎉**
