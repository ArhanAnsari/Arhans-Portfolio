# ✅ Verification & Testing Guide

## Quick Verification Commands

### 1. Check Vite Config
```bash
# Verify proxy settings
cat vite.config.js | grep -A 10 "proxy"
```

**Expected Output:**
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:3001',
    changeOrigin: true,
    secure: false,
    ws: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  }
}
```

### 2. Check Avatar Component
```bash
# Verify frustumCulled is disabled
grep -n "frustumCulled={false}" src/components/Avatar.jsx | wc -l
```

**Expected Output:** `11` (11 occurrences)

### 3. Check Office Component
```bash
# Verify Office group has frustum culling disabled
grep "frustumCulled={false}" src/components/Office.jsx
```

**Expected Output:**
```
frustumCulled={false}  (in group and mesh)
```

### 4. Check App Canvas Settings
```bash
# Verify camera optimization
grep -A 15 "camera={{" src/App.jsx | grep -E "fov|near|far|dpr"
```

**Expected Output:**
```
fov: window.innerWidth < 768 ? 50 : 42,
near: 0.1,
far: 1000
dpr={window.innerWidth < 768 ? 1 : window.devicePixelRatio}
```

---

## Runtime Testing

### Test 1: Desktop Display
```bash
# 1. Start backend
node ai-twin-server.js

# 2. Start frontend (in another terminal)
npm run dev

# 3. Open browser
# Navigate to http://localhost:5173

# 4. Verify:
✅ Avatar visible in 3D office scene
✅ No console errors
✅ Smooth animations
```

### Test 2: Mobile Display (DevTools)
```bash
# With http://localhost:5173 open:

1. Press F12 (DevTools)
2. Press Ctrl+Shift+M (Mobile view)
3. Select iPhone 12 (or similar)
4. Scroll down the page
5. Verify avatar is STILL VISIBLE after scroll
6. Check FPS: Should be 30+ (Console: Show FPS meter)
```

### Test 3: Real Mobile Device
```bash
# Find your computer's IP
# Windows: ipconfig (look for IPv4)
# Mac/Linux: ifconfig (look for inet)

# e.g., 192.168.1.100

# On mobile:
1. Open http://192.168.1.100:5173
2. Wait for page to load
3. Scroll down
4. Verify avatar visible
5. Tap AI Twin chat
6. Verify chat works
```

### Test 4: API Requests
```bash
# Test API endpoint directly
curl -X POST http://localhost:3001/api/ai-twin \
  -H "Content-Type: application/json" \
  -d '{"message":"Test","conversationHistory":[]}'

# Expected: JSON response with AI message

# Test through proxy
curl -X POST http://localhost:5173/api/ai-twin \
  -H "Content-Type: application/json" \
  -d '{"message":"Test","conversationHistory":[]}'

# Expected: Same response (proxy working)
```

### Test 5: CORS Headers
```bash
# Check CORS headers in response
curl -I -X OPTIONS http://localhost:3001/api/ai-twin

# Expected headers:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, OPTIONS
# Access-Control-Allow-Headers: Content-Type
```

---

## Browser DevTools Testing

### Check for Errors
```
DevTools → Console tab
Expected: No errors (warnings OK)
```

### Check Network
```
DevTools → Network tab
Filter: XHR
1. Send a message in AI Twin
2. Look for POST request to /api/ai-twin
3. Response should be 200 (not 0, not error)
4. Response body should contain AI message
```

### Check Performance
```
DevTools → Performance tab
1. Click Record
2. Scroll page for 5 seconds
3. Click Stop
4. Check FPS chart:
   - Desktop: Should be 50-60 FPS
   - Mobile view: Should be 30-60 FPS
```

### Check Rendering
```
DevTools → Rendering tab
1. Enable "Paint flashing"
2. Scroll page
3. Should see smooth repaints
4. No large red boxes (excessive repainting)
```

---

## Lighthouse Audit

```bash
# Run Lighthouse in Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Generate report"
4. Wait for analysis

Expected scores:
✅ Performance: 50+ (good for 3D)
✅ Accessibility: 80+ 
✅ Best Practices: 80+
✅ SEO: 90+
```

---

## Common Issues & How to Verify Fixes

### Issue: "Avatar Not Visible on Mobile"

**Verification Steps:**
```bash
# 1. Clear cache
Ctrl+Shift+Delete → Clear browsing data

# 2. Hard reload
Ctrl+Shift+R

# 3. Check DevTools
F12 → Elements → Find <canvas>
Look for computed display: block

# 4. Check console
F12 → Console
Look for any WebGL errors

# 5. Verify code
grep -c "frustumCulled={false}" src/components/Avatar.jsx
Should output: 11 (or more)
```

**If still not fixed:**
```bash
# Restart dev server
npm run dev

# Or rebuild
rm -rf node_modules/.vite
npm run dev
```

### Issue: "API Requests Failing"

**Verification Steps:**
```bash
# 1. Check backend is running
curl http://localhost:3001/health
Should get response (or 404, but connection exists)

# 2. Check proxy config
cat vite.config.js | grep -A 5 "'/api'"
Should show '/api' (not '/api/ai-twin')

# 3. Restart Vite
npm run dev

# 4. Test request
In DevTools Console:
fetch('/api/ai-twin', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({message: 'test', conversationHistory: []})
})
.then(r => r.json())
.then(console.log)

Should log response
```

### Issue: "Poor Performance on Mobile"

**Verification Steps:**
```bash
# 1. Check DPR is optimized
Open DevTools
window.innerWidth < 768 ? 1 : window.devicePixelRatio
Should return 1 on mobile view

# 2. Check canvas size
document.querySelector('canvas').style.width
Compare to window.innerWidth

# 3. Monitor FPS
DevTools → More Tools → Rendering
Check FPS counter
Should be 30+ fps on mobile

# 4. Check paint performance
F12 → Rendering → Enable "Paint flashing"
Scroll page
Look for excessive red areas (repainting)
```

---

## Device Testing Matrix

| Device | Expected | ✅/❌ |
|--------|----------|-------|
| Desktop 1920x1080 | Avatar visible, 60 FPS, smooth | ☐ |
| Laptop 1366x768 | Avatar visible, 50-60 FPS | ☐ |
| iPad 768x1024 | Avatar visible, 40-60 FPS | ☐ |
| iPhone 12 (390x844) | Avatar visible, 30-50 FPS | ☐ |
| iPhone 8 (375x667) | Avatar visible, 30+ FPS | ☐ |
| Samsung S20 (1440x3200) | Avatar visible, 30-50 FPS | ☐ |
| OnePlus 9 (1080x2340) | Avatar visible, 30-50 FPS | ☐ |

---

## File Integrity Check

```bash
# Verify all files exist
ls -la src/components/Avatar.jsx        # Should exist
ls -la src/components/Office.jsx        # Should exist
ls -la src/App.jsx                      # Should exist
ls -la vite.config.js                   # Should exist
ls -la ai-twin-server.js                # Should exist

# Verify sizes (rough)
wc -l src/components/Avatar.jsx         # ~169 lines
wc -l src/components/Office.jsx         # ~351 lines
wc -l src/App.jsx                       # ~100 lines
wc -l vite.config.js                    # ~16 lines
```

---

## Production Readiness Checklist

```
Pre-Deployment:
☐ All tests passing
☐ No console errors
☐ Mobile rendering verified
☐ API endpoints working
☐ Performance acceptable
☐ CORS headers correct

Deployment:
☐ Backend deployed (Railway/Render)
☐ Frontend deployed (Vercel/Netlify)
☐ Environment variables set
☐ Domain SSL certificate valid
☐ CORS origins configured

Post-Deployment:
☐ Test on production URL
☐ Verify on real mobile device
☐ Monitor error logs
☐ Check API latency
☐ Monitor user sessions
```

---

## Debug Mode

### Enable Debug Logging

**Frontend (App.jsx):**
```javascript
useEffect(() => {
  console.log('Camera position:', camera.position);
  console.log('Viewport:', viewport);
  console.log('Is mobile:', window.innerWidth < 768);
}, [])
```

**Backend (ai-twin-server.js):**
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});
```

### Check Three.js Debug Info

```javascript
// In DevTools Console:
// Get renderer info
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');
console.log('WebGL Version:', gl.getParameter(gl.VERSION));
console.log('Max Texture Size:', gl.getParameter(gl.MAX_TEXTURE_SIZE));
console.log('Extensions:', gl.getSupportedExtensions());
```

---

## Monitoring & Logging

### API Request Logging

```javascript
// In browser console
performance.measure('api-call-start');
// Make API call
performance.measure('api-call-end', 'api-call-start', 'api-call-end');
console.log(performance.getEntriesByName('api-call-end')[0].duration, 'ms');
```

### Memory Usage

```javascript
// Check memory (Chrome only)
console.memory
// or
performance.memory
```

### Real-time FPS Counter

```javascript
// Add to React component
useEffect(() => {
  let lastTime = performance.now();
  let frames = 0;
  
  const countFrame = () => {
    frames++;
    const currentTime = performance.now();
    if (currentTime - lastTime >= 1000) {
      console.log('FPS:', frames);
      frames = 0;
      lastTime = currentTime;
    }
    requestAnimationFrame(countFrame);
  };
  
  countFrame();
}, []);
```

---

## Summary: What to Verify

✅ **Desktop:**
- [ ] Avatar visible
- [ ] Animations smooth
- [ ] No errors in console

✅ **Mobile (DevTools):**
- [ ] Avatar visible
- [ ] Avatar visible after scroll
- [ ] No lag or stuttering
- [ ] FPS 30+

✅ **Real Mobile:**
- [ ] Loads properly
- [ ] Avatar visible
- [ ] Chat works
- [ ] No crashes

✅ **API:**
- [ ] All /api/* routes work
- [ ] CORS headers present
- [ ] Responses correct
- [ ] No timeouts

✅ **Performance:**
- [ ] FPS 30+ on mobile
- [ ] FPS 60 on desktop
- [ ] Load time < 5s
- [ ] Memory usage reasonable

---

## Getting Help

If something's not working:

1. **Check the Logs**
   - Browser Console (F12)
   - Backend Terminal
   - Network tab

2. **Verify the Files**
   - vite.config.js proxy settings
   - Avatar.jsx frustumCulled values
   - App.jsx camera settings

3. **Restart Everything**
   - Kill all terminals (Ctrl+C)
   - `npm run dev`
   - Open fresh browser tab

4. **Clear Cache**
   - Hard reload: Ctrl+Shift+R
   - Clear DevTools cache: F12 → Network → "Disable cache"

5. **Test Isolation**
   - Test backend alone: `curl` command
   - Test frontend alone: comment out API calls
   - Test 3D scene alone: comment out interface

---

You're all set! Your portfolio is now fully fixed and optimized! 🎉
