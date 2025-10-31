import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Minimize2, Maximize2, Loader } from "lucide-react";
import axios from "axios";

const AiTwin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hey there! I'm Arhan's AI Twin — your smart assistant that knows everything about him. Ask me anything about Arhan’s projects, skills, or experience! 💡",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/ai-twin", {
        message: input,
        conversationHistory: messages.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
      });

      const aiMessage = {
        id: messages.length + 2,
        text: response.data.response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "⚠️ Oops! Gemini seems to be taking a break. Try again later or contact Arhan directly!",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
                    Online • Powered by Gemini
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
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/40 scroll-smooth">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none shadow-lg"
                            : "bg-slate-700 text-slate-100 rounded-bl-none shadow-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.text}
                        </p>
                        <span className="text-xs mt-1 block opacity-60 text-right">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {loading && (
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
                <div className="border-t border-slate-700 p-4 bg-slate-900/70 backdrop-blur-sm">
                  <div className="flex gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask something about Arhan..."
                      rows="2"
                      className="flex-1 bg-slate-800 text-white rounded-lg px-4 py-2 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
                      disabled={loading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={loading || !input.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white p-3 rounded-lg transition flex items-center justify-center shadow-lg"
                    >
                      {loading ? (
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