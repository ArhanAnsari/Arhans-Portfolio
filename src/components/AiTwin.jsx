import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2, Maximize2, Loader, Mic, MicOff, Volume2, VolumeX, StopCircle } from "lucide-react";

// ─── Quick suggestion prompts ─────────────────────────────────────────────────
const QUICK_PROMPTS = [
  "What projects has Arhan built?",
  "What's Arhan's tech stack?",
  "Is Arhan available for freelance?",
  "Tell me about your AI projects",
  "What React Native apps have you built?",
];

// ─── Portfolio knowledge base ─────────────────────────────────────────────────
const KNOWLEDGE_BASE = {
  projects: "Arhan has 250+ projects on GitHub! 🚀 Key highlights:\n• **AutoYT** — AI YouTube automation (Next.js, Gemini)\n• **CanvasCraft** — AI website builder (React, Three.js)\n• **Clipgen AI** — Creator tool (Next.js 15, Convex)\n• **Chat to PDF** — AI document chat (Next.js, LangChain)\n• **InspireGem** — AI inspiration platform (React, Gemini)\n• **3D Car Racing Game** — WebGL physics game (Three.js)\n• **Figma Clone** — Real-time collaborative design (Next.js, Liveblocks)\n\nVisit the Projects section to explore more!",
  skills: "Arhan's tech stack:\n⚛️ **Frontend**: React, Next.js, Three.js, Framer Motion, Tailwind CSS\n🔧 **Backend**: Node.js, Express, Prisma, Convex\n🗄️ **Databases**: MongoDB, PostgreSQL\n📱 **Mobile**: React Native, Expo\n🤖 **AI/ML**: Google Gemini, OpenAI, Together AI, LangChain\n🎮 **3D**: Three.js, React Three Fiber, WebGL\n☁️ **DevOps**: Vercel, Railway, Docker, Git",
  availability: "Yes! Arhan is currently **open for freelance and collaborative work**. 🟢\n\nAvailable for:\n✅ Full-Stack Web Development\n✅ Mobile App Development (React Native)\n✅ AI Integrations & SaaS\n✅ 3D Web Experiences\n✅ Freelance Projects\n\nHit the **Hire Me** section or email arhanansari2009@gmail.com!",
  experience: "Arhan's journey:\n📅 **2021** — Started with HTML/CSS\n⚡ **2022** — Mastered JavaScript + MERN Stack\n🎮 **2023** — Discovered Three.js & 3D web\n🤖 **2024** — Built AI-powered SaaS tools\n📱 **2024** — Expanded to React Native mobile\n🏆 **2025** — 250+ projects, 1869 GitHub contributions, 3+ years experience",
  achievements: "🏆 Arhan's achievements:\n• 1869+ GitHub contributions\n• 250+ projects completed\n• 🥇 Urjaa Brain Arithmetic Winner\n• 🏅 Math & Science Olympiad Gold Medalist\n• 🎓 Programming Club President\n• 20+ technologies mastered\n• 10/10 client satisfaction rating",
  contact: "📬 Reach Arhan here:\n• Email: arhanansari2009@gmail.com\n• GitHub: github.com/ArhanAnsari\n• LinkedIn: linkedin.com/in/arhan-ansari-687597353\n• Twitter/X: @codewitharhan\n• Discord Community: discord.com/invite/bwjCXVwS8k\n\nOr scroll to the **Contact** section!",
  ai: "Arhan's AI & ML projects:\n• **AutoYT** — AI YouTube content automation\n• **InspireGem** — AI creative inspiration tool\n• **Synthara** — AI music/media generation\n• **Chat to PDF** — Chat with any PDF document\n• **AI Chat Assistant** — OpenAI GPT-powered chat\n• **Clipgen AI** — AI-powered clip generation\n\nArhan integrates Gemini, OpenAI, Together AI & LangChain.",
  mobile: "📱 Arhan's React Native projects:\n• Cross-platform iOS & Android apps\n• Built with **Expo** for rapid development\n• Real-time features with **Convex**\n• Auth with **Clerk**\n• Push notifications & native APIs\n\nScroll to the React Native section to see them!",
  "3d": "🎮 Arhan's 3D projects:\n• **This Portfolio** — Full 3D interactive experience (Three.js + R3F)\n• **3D Car Racing Game** — WebGL physics game\n• **Arhan Guys** — Fall Guys-inspired 3D platformer\n• **Multiplayer Pirate Card Game** — Real-time 3D card game\n• **Tech Stack Galaxy** — Interactive 3D tech explorer\n\nArhan uses Three.js, React Three Fiber, Babylon.js & WebGL.",
};

// ─── Navigation commands (keyword → section index) ────────────────────────────
const NAV_COMMANDS = {
  projects: 2,
  "react native": 3,
  skills: 1,
  contact: 13,
  "hire me": 12,
  services: 7,
  achievements: 5,
  "currently building": 6,
  journey: 10,
  recognitions: 11,
  blog: 9,
  galaxy: 14,
  github: 15,
};

// Section index → human-readable name (mirrors NAV_COMMANDS values)
const SECTION_NAMES = [
  "Hero", "Skills", "Projects", "ReactNative", "Education",
  "Achievements", "CurrentlyBuilding", "Services", "Testimonials",
  "Blog", "Journey", "Recognitions", "HireMe", "Contact",
  "TechGalaxy", "GitHubActivity",
];

// ─── Thinking phase cycling messages ──────────────────────────────────────────
const THINKING_PHASES = [
  "⚡ Arhan AI is thinking…",
  "⚡ Analyzing portfolio data…",
  "⚡ Generating response…",
];

// ─── Follow-up suggestion chips per topic ─────────────────────────────────────
const FOLLOW_UP_MAP = {
  projects:     ["Tell me about Clipgen AI", "What's your most complex project?", "Show me your GitHub"],
  skills:       ["Which skill do you use most?", "Tell me about your AI experience", "What are you currently learning?"],
  availability: ["How do I contact you?", "What services do you offer?", "Show me the Hire Me section"],
  experience:   ["What was your first project?", "What's your biggest achievement?", "Are you open to work?"],
  achievements: ["Tell me about your GitHub contributions", "What competitions have you won?", "Are you available for hire?"],
  ai:           ["Tell me more about AutoYT", "How does Clipgen AI work?", "What AI models do you use?"],
  mobile:       ["Tell me about your React Native setup", "Do you publish to app stores?", "What's your mobile tech stack?"],
  "3d":         ["How did you build this portfolio?", "Tell me about the car racing game", "What 3D libraries do you use?"],
  default:      ["What projects have you built?", "Tell me about your tech stack", "Are you available for freelance?"],
};

// ─── Build Gemini system prompt with full portfolio context ───────────────────
const buildSystemPrompt = ({ sessionCtx = null, activeProject = null } = {}) => {
  const sessionLines = [];
  if (activeProject) {
    sessionLines.push(`CURRENT VIEW: The user is currently viewing the "${activeProject}" project. If asked about it, provide detail.`);
  }
  if (sessionCtx?.lastMentionedProject) {
    sessionLines.push(`LAST DISCUSSED PROJECT: "${sessionCtx.lastMentionedProject}". If the user says "the first one", "that project", or "tell me more", refer to this.`);
  }
  if (sessionCtx?.lastTopic) {
    sessionLines.push(`LAST TOPIC: ${sessionCtx.lastTopic}`);
  }
  if (sessionCtx?.lastSectionVisited) {
    sessionLines.push(`USER'S CURRENT PORTFOLIO SECTION: ${sessionCtx.lastSectionVisited}`);
  }

  return `You are Arhan Ansari's AI Twin — a conversational AI assistant and digital representation of Arhan, a full stack developer who builds modern web apps, mobile apps, AI tools, and interactive 3D experiences.

Speak in FIRST PERSON as Arhan. Say "I", "my projects", "I built this", etc. Be knowledgeable, confident, friendly, and enthusiastic about technology. Format responses with **bold** for project names and key terms. Keep answers concise (under 200 words) unless detail is specifically requested.

=== PORTFOLIO KNOWLEDGE ===

PROJECTS:
${KNOWLEDGE_BASE.projects}

SKILLS & TECH STACK:
${KNOWLEDGE_BASE.skills}

EXPERIENCE & JOURNEY:
${KNOWLEDGE_BASE.experience}

ACHIEVEMENTS:
${KNOWLEDGE_BASE.achievements}

AI PROJECTS:
${KNOWLEDGE_BASE.ai}

MOBILE DEVELOPMENT:
${KNOWLEDGE_BASE.mobile}

3D DEVELOPMENT:
${KNOWLEDGE_BASE["3d"]}

AVAILABILITY:
${KNOWLEDGE_BASE.availability}

CONTACT:
${KNOWLEDGE_BASE.contact}

=== BEHAVIOR RULES ===
1. Answer using the portfolio information above — never invent projects or facts not listed
2. Speak as Arhan: "I built X to solve Y" rather than "Arhan built X"
3. If a user asks to navigate (e.g., "show projects", "open skills"), respond naturally and confirm
4. Keep responses focused and professional but warm
5. Use bullet points for lists and **bold** for emphasis${sessionLines.length ? "\n\n=== SESSION CONTEXT ===\n" + sessionLines.join("\n") : ""}`;
};

// ─── Parse basic markdown (bold, newlines) ────────────────────────────────────
const parseMarkdown = (text) => {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} className="text-purple-300 font-semibold">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
};
// ─── Gemini generation config constants ───────────────────────────────────────
const GEMINI_TEMPERATURE = 0.8;
const GEMINI_MAX_OUTPUT_TOKENS = 800;


const AiTwin = ({ section = 0, activeProject = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isSpeakingActive, setIsSpeakingActive] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState(0);
  const [followUpSuggestions, setFollowUpSuggestions] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hey there! I'm Arhan's AI Twin — your smart assistant who knows all about him. Ask me anything!",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  // Ref so that speak() always reads the latest isSpeaking value even inside async closures
  const isSpeakingRef = useRef(true);
  // Cache loaded TTS voices to avoid race condition with getVoices() returning []
  const voicesRef = useRef([]);
  // Session context memory — persists across messages; section synced via useEffect
  const sessionContextRef = useRef({
    lastMentionedProject: null,
    lastTopic: null,
    lastSectionVisited: SECTION_NAMES[section] ?? SECTION_NAMES[0],
  });

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  // ─── Track current portfolio section in session context ──────────────────────
  useEffect(() => {
    sessionContextRef.current.lastSectionVisited = SECTION_NAMES[section] ?? "Hero";
  }, [section]);

  // ─── Cycling thinking-phase indicator ─────────────────────────────────────────
  useEffect(() => {
    if (!isStreaming) {
      setThinkingPhase(0);
      return;
    }
    const interval = setInterval(() => {
      setThinkingPhase((p) => (p + 1) % THINKING_PHASES.length);
    }, 700);
    return () => clearInterval(interval);
  }, [isStreaming]);

  // ─── Pre-load TTS voices (some browsers load them asynchronously) ─────────────
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // ─── Voice Recognition Setup ─────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setInput("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  }, [isListening]);

  // ─── TTS with male voice preference ─────────────────────────────────────────
  const speak = useCallback((text) => {
    if (!isSpeakingRef.current || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    // Strip markdown and limit length for TTS
    const cleanText = text.replace(/\*\*/g, "").replace(/[#*`]/g, "").slice(0, 500);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1;
    utterance.pitch = 0.9;

    // Prefer a male voice — use cached voices (populated via onvoiceschanged)
    const voices = voicesRef.current.length ? voicesRef.current : synth.getVoices();
    const maleVoice =
      voices.find((v) => /google uk english male/i.test(v.name)) ||
      voices.find((v) => /male/i.test(v.name)) ||
      voices.find((v) => /alex|daniel|fred/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith("en") && !/female/i.test(v.name));
    if (maleVoice) utterance.voice = maleVoice;

    utterance.onstart = () => setIsSpeakingActive(true);
    utterance.onend = () => setIsSpeakingActive(false);
    utterance.onerror = () => setIsSpeakingActive(false);
    synth.speak(utterance);
  }, []);

  // Stop active speech immediately
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeakingActive(false);
    }
  }, []);

  // Toggle mute — cancel active speech when muting
  const toggleMute = useCallback(() => {
    if (isSpeaking) stopSpeaking();
    setIsSpeaking((prev) => !prev);
  }, [isSpeaking, stopSpeaking]);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);

  // ─── Update session context after each exchange ───────────────────────────────
  const updateSessionContext = useCallback((userText, aiResponse) => {
    const ctx = sessionContextRef.current;
    const lower = userText.toLowerCase();

    // Detect topic from user message
    const topicMap = [
      [["ai project", "llm", "gemini", "openai", "autoyt", "clipgen", "synthara"], "ai"],
      [["react native", "mobile", "expo", "ios", "android"], "mobile"],
      [["3d", "three.js", "webgl", "r3f", "racing", "galaxy"], "3d"],
      [["project", "built", "made", "github"], "projects"],
      [["skill", "tech", "stack", "language", "framework", "tailwind"], "skills"],
      [["availab", "freelanc", "hire", "open for"], "availability"],
      [["experienc", "journey", "background", "started"], "experience"],
      [["achiev", "award", "accomplishment", "olympiad"], "achievements"],
      [["contact", "email", "reach", "linkedin"], "contact"],
    ];
    for (const [keys, topic] of topicMap) {
      if (keys.some((k) => lower.includes(k))) {
        ctx.lastTopic = topic;
        break;
      }
    }

    // Extract the first mentioned project name from the AI response
    const knownProjects = [
      "AutoYT", "CanvasCraft", "Clipgen AI", "Chat to PDF", "InspireGem",
      "Synthara", "Figma Clone", "Arhan Guys",
    ];
    for (const proj of knownProjects) {
      if (aiResponse.includes(proj)) {
        ctx.lastMentionedProject = proj;
        break;
      }
    }
  }, []);

  // ─── Derive follow-up suggestions from last topic ─────────────────────────────
  const computeFollowUpSuggestions = useCallback(() => {
    const topic = sessionContextRef.current.lastTopic;
    return (FOLLOW_UP_MAP[topic] ?? FOLLOW_UP_MAP.default).slice(0, 3);
  }, []);

  // ─── Demo mode fallback (uses KNOWLEDGE_BASE directly) ───────────────────────
  const getDemoResponse = useCallback((msg) => {
    const lower = msg.toLowerCase();
    const keyMap = [
      [["project", "built", "made"], KNOWLEDGE_BASE.projects],
      [["skill", "tech", "stack", "language", "framework"], KNOWLEDGE_BASE.skills],
      [["availab", "freelanc", "hire", "work with", "open for"], KNOWLEDGE_BASE.availability],
      [["experienc", "journey", "started", "background"], KNOWLEDGE_BASE.experience],
      [["achiev", "award", "accomplishment"], KNOWLEDGE_BASE.achievements],
      [["contact", "email", "reach", "linkedin", "twitter"], KNOWLEDGE_BASE.contact],
      [["ai project", "machine learning", "llm", "gemini", "openai"], KNOWLEDGE_BASE.ai],
      [["mobile", "react native", "expo", "ios", "android"], KNOWLEDGE_BASE.mobile],
      [["3d", "three.js", "webgl", "r3f"], KNOWLEDGE_BASE["3d"]],
    ];
    for (const [keys, resp] of keyMap) {
      if (keys.some((k) => lower.includes(k))) return resp;
    }
    return "👋 Hey! I'm Arhan's AI Twin. Ask me about his **projects**, **skills**, **experience**, availability, or anything else!\n\n_(Demo mode — set VITE_GEMINI_API_KEY for full AI responses)_";
  }, []);

  // ─── Detect navigation intent and scroll to section ──────────────────────────
  const handleNavigation = useCallback((text) => {
    const lower = text.toLowerCase();
    for (const [keyword, section] of Object.entries(NAV_COMMANDS)) {
      if (lower.includes(keyword)) {
        setTimeout(() => {
          document.getElementById(`section-${section}`)?.scrollIntoView({ behavior: "smooth" });
        }, 600);
        return section;
      }
    }
    return null;
  }, []);

  // ─── Main send handler — accepts optional override text for chip auto-submit ──
  const sendMessage = useCallback(async (overrideText = null) => {
    const userText = (overrideText ?? input).trim();
    if (!userText || isStreaming) return;

    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // always clear input after sending
    setIsStreaming(true);

    // Detect navigation commands in the user message
    handleNavigation(userText);

    const aiMessage = {
      id: Date.now() + 1,
      text: "",
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        // Demo mode
        const demoResponse = getDemoResponse(userText);
        await new Promise((r) => setTimeout(r, 400));
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.sender === "ai") last.text = demoResponse;
          return updated;
        });
        updateSessionContext(userText, demoResponse);
        setFollowUpSuggestions(computeFollowUpSuggestions());
        setIsStreaming(false);
        speak(demoResponse);
        return;
      }

      // Build conversation history — limit to last 10 messages, skip empty texts
      const historyMessages = messages
        .filter((m) => m.text && m.text.trim())
        .slice(-10)
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: buildSystemPrompt({ sessionCtx: sessionContextRef.current, activeProject }) }],
            },
            contents: [
              ...historyMessages,
              { role: "user", parts: [{ text: userText }] },
            ],
            generationConfig: { temperature: GEMINI_TEMPERATURE, maxOutputTokens: GEMINI_MAX_OUTPUT_TOKENS },
          }),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.candidates?.[0]?.content) {
                const text = data.candidates[0].content.parts[0]?.text || "";
                if (text) {
                  fullResponse += text;
                  setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last.sender === "ai") last.text += text;
                    return [...updated];
                  });
                }
              }
            } catch {
              // Ignore JSON parse errors in SSE stream
            }
          }
        }
      }

      updateSessionContext(userText, fullResponse);
      setFollowUpSuggestions(computeFollowUpSuggestions());
      setIsStreaming(false);
      speak(fullResponse);
    } catch (error) {
      console.error("AI Twin Error:", error);
      const errorMsg =
        "⚠️ AI temporarily unavailable. Please try again in a moment.\n\n" +
        getDemoResponse(userText);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.sender === "ai") last.text = errorMsg;
        return updated;
      });
      setIsStreaming(false);
    }
  }, [input, isStreaming, messages, activeProject, getDemoResponse, handleNavigation, speak, updateSessionContext, computeFollowUpSuggestions]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Show quick prompts only when only the greeting message is present
  const showQuickPrompts = messages.length === 1;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg flex items-center justify-center hover:shadow-[0_0_15px_rgba(124,58,237,0.6)] transition-shadow"
            aria-label="Open AI Twin chat"
          >
            <img
              src="/AI%20Twin%20PP.jpg"
              alt="Arhan AI Twin"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30 shadow-md"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-50 ${
              isMinimized
                ? "bottom-6 right-6 w-80"
                : "bottom-6 right-6 w-96 max-h-[600px]"
            } rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.2)] bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 overflow-hidden flex flex-col backdrop-blur-xl`}
            role="dialog"
            aria-label="Arhan AI Twin chat"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/AI%20Twin%20PP.jpg"
                  alt="Arhan AI Twin"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30 shadow-md"
                />
                <div>
                  <h3 className="text-white font-bold">Arhan's AI Twin</h3>
                  <p className="text-xs text-purple-200">
                    {isStreaming ? "Thinking…" : "Online • Gemini 2.5"}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                {/* Stop Speaking — visible only while TTS is active */}
                {isSpeakingActive && (
                  <button
                    onClick={stopSpeaking}
                    className="text-white hover:bg-white/20 p-2 rounded"
                    title="Stop Speaking"
                    aria-label="Stop speaking"
                  >
                    <StopCircle size={18} />
                  </button>
                )}
                <button
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20 p-2 rounded"
                  title={isSpeaking ? "Mute AI voice" : "Unmute AI voice"}
                  aria-label={isSpeaking ? "Mute AI voice" : "Unmute AI voice"}
                >
                  {isSpeaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-2 rounded"
                  aria-label={isMinimized ? "Expand chat" : "Minimise chat"}
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/40">
                  {messages.map((m, index) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        m.sender === "user" ? "justify-end" : "justify-start gap-2"
                      }`}
                    >
                      {m.sender === "ai" && (
                        <img
                          src="/AI%20Twin%20PP.jpg"
                          alt="AI Twin"
                          className="w-8 h-8 rounded-full object-cover border border-slate-600 flex-shrink-0 self-end"
                        />
                      )}
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                          m.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none shadow-lg"
                            : "bg-slate-700 text-slate-100 rounded-bl-none shadow-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {parseMarkdown(m.text)}
                          {/* Blinking cursor on the last AI message while streaming */}
                          {isStreaming &&
                            m.sender === "ai" &&
                            index === messages.length - 1 && (
                              <span
                                className="inline-block w-0.5 h-4 bg-blue-400 ml-0.5 animate-pulse align-middle"
                                aria-hidden="true"
                              />
                            )}
                        </p>
                        <span className="text-xs mt-1 block opacity-60 text-right">
                          {m.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Thinking indicator — cycling phases before first token arrives */}
                  {isStreaming &&
                    messages[messages.length - 1]?.sender === "ai" &&
                    !messages[messages.length - 1]?.text && (
                      <motion.div
                        key={thinkingPhase}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start gap-2"
                      >
                        <div className="bg-slate-700/80 border border-purple-500/20 text-slate-200 px-4 py-2.5 rounded-lg rounded-bl-none flex items-center gap-2 text-sm">
                          <span className="text-purple-400 text-base">⚡</span>
                          <span>{THINKING_PHASES[thinkingPhase]}</span>
                        </div>
                      </motion.div>
                    )}

                  {/* Follow-up suggestion chips — shown after last AI response */}
                  {!isStreaming && followUpSuggestions.length > 0 && messages.length > 1 && (
                    <div className="space-y-1 ml-10">
                      <p className="text-xs text-slate-500">You might also ask:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {followUpSuggestions.map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => sendMessage(suggestion)}
                            className="text-xs px-3 py-1.5 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/50 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-200 transition-all duration-200"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick prompt chips — visible only when chat is fresh */}
                  {showQuickPrompts && (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs text-slate-500 text-center">Try asking:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {QUICK_PROMPTS.map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => sendMessage(prompt)}
                            className="text-xs px-3 py-1.5 rounded-full bg-slate-700/60 text-slate-300 border border-slate-600/50 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-200 transition-all duration-200"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-slate-700 p-4 bg-slate-900/70">
                  <div className="flex gap-2">
                    <button
                      onClick={toggleListening}
                      className={`p-3 rounded-lg transition flex items-center justify-center shadow-lg ${
                        isListening
                          ? "bg-red-500 animate-pulse"
                          : "bg-slate-700 hover:bg-slate-600"
                      }`}
                      title={isListening ? "Stop Listening" : "Voice Input"}
                      aria-label={isListening ? "Stop voice input" : "Start voice input"}
                    >
                      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask me anything about Arhan…"
                      rows="2"
                      className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                      disabled={isStreaming}
                      aria-label="Message input"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isStreaming || !input.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white p-3 rounded-lg transition flex items-center justify-center shadow-lg"
                      aria-label="Send message"
                    >
                      {isStreaming ? (
                        <Loader size={20} className="animate-spin" />
                      ) : (
                        <Send size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiTwin;
