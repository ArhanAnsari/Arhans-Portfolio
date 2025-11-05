import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2, Maximize2, Loader } from "lucide-react";

const AiTwin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(scrollToBottom, [messages]);

  // Demo responses when API key is not available
  const getDemoResponse = (msg) => {
    const lower = msg.toLowerCase();
    const responses = {
      skills:
        "Arhan is skilled in React, Three.js, Node.js, and full-stack development! He's also great with Tailwind, Prisma, and Framer Motion.",
      projects:
        "Arhan has completed 250+ projects, including a 3D interactive portfolio and enterprise web apps for clients like Clystra Networks!",
      availability:
        "Yes! Arhan is currently open for freelance and collaborative opportunities. You can reach him via the contact page on his portfolio.",
      experience:
        "Arhan has 3+ years of development experience with 1869 GitHub contributions and 10/10 client satisfaction rating!",
      default:
        "Hi there! I'm Arhan's AI Twin 👋. I know everything about Arhan's skills, projects, and achievements. What would you like to know?",
    };

    for (const [key, resp] of Object.entries(responses)) {
      if (lower.includes(key)) return resp;
    }
    return responses.default;
  };

  // System prompt for Arhan
  const SYSTEM_PROMPT = `You are Arhan's AI Twin, a sophisticated AI assistant with deep knowledge of Arhan Ansari. You are available 24/7 to answer questions about Arhan's skills, projects, experience, and availability.

About Arhan:
- Full Stack Developer with expertise in modern web technologies
- Passionate about 3D web experiences and interactive design
- Strong background in React, Node.js, Three.js, and AI integration

Key Skills:
- Frontend: React, Three.js, Framer Motion, Tailwind CSS, Next.js, Vite
- Backend: Node.js, Express, Prisma, MongoDB, PostgreSQL
- 3D/Graphics: Three.js, Babylon.js, WebGL, React Three Fiber
- AI/ML: LLM integration, Gemini, Claude, prompt engineering
- DevOps: Docker, Git, Vercel, Railway, serverless functions

Notable Achievements:
- 250+ projects completed
- 1869 GitHub contributions
- 3+ years of development experience
- 10/10 client satisfaction
- 20+ technologies mastered
- Gold medalist in Math & Science Olympiads

Current Status:
- Open for new opportunities
- Available for freelance work
- Interested in 3D web and scalable applications
- Always learning new technologies

Personality:
- Friendly and professional
- Detail-oriented with focus on UX
- Quick learner and adaptable
- Passionate about web development

When answering:
1. Be friendly and professional
2. Keep answers concise and informative
3. For inquiries, suggest contacting via portfolio
4. Be helpful and human-like
5. Show genuine interest in helping`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);

    const aiMessage = {
      id: Date.now() + 1,
      text: "",
      sender: "ai",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      // If no API key, use demo mode
      if (!apiKey) {
        const demoResponse = getDemoResponse(userMessage.text);
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.sender === "ai") {
            last.text = demoResponse;
          }
          return updated;
        });
        setIsStreaming(false);
        return;
      }

      // Call Google Gemini API directly from frontend
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=" +
          apiKey,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents: [
              ...messages
                .filter((m) => m.sender !== undefined)
                .map((m) => ({
                  role: m.sender === "user" ? "user" : "model",
                  parts: [{ text: m.text }],
                })),
              {
                role: "user",
                parts: [{ text: userMessage.text }],
              },
            ],
            generationConfig: {
              temperature: 0.8,
              maxOutputTokens: 1000,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (
                data.candidates &&
                data.candidates[0] &&
                data.candidates[0].content
              ) {
                const text =
                  data.candidates[0].content.parts[0]?.text || "";
                if (text) {
                  setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last.sender === "ai") {
                      last.text += text;
                    }
                    return [...updated];
                  });
                }
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }

      setIsStreaming(false);
    } catch (error) {
      console.error("AI Twin Error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.sender === "ai") {
          last.text =
            "⚠️ Sorry! I couldn't connect to Gemini. Running in demo mode.\n\n" +
            getDemoResponse(userMessage.text);
        }
        return updated;
      });
      setIsStreaming(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
          >
            🤖
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
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-2xl">🤖</div>
                <div>
                  <h3 className="text-white font-bold">Arhan’s AI Twin</h3>
                  <p className="text-xs text-purple-200">
                    {isStreaming ? "Typing..." : "Online • Gemini 2.5"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-2 rounded"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/40">
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        m.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl whitespace-pre-line ${
                          m.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none shadow-lg"
                            : "bg-slate-700 text-slate-100 rounded-bl-none shadow-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{m.text}</p>
                        <span className="text-xs mt-1 block opacity-60 text-right">
                          {m.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {isStreaming && (
                    <div className="flex justify-start">
                      <div className="bg-slate-700 text-slate-100 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2 animate-pulse">
                        <Loader size={16} className="animate-spin" />
                        <span className="text-sm">Gemini is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-slate-700 p-4 bg-slate-900/70">
                  <div className="flex gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask something about Arhan..."
                      rows="2"
                      className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                      disabled={isStreaming}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isStreaming || !input.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white p-3 rounded-lg transition flex items-center justify-center shadow-lg"
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