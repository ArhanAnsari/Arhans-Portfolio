import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GUIDE_KEY = "portfolio_guide_seen";

const STEPS = [
  {
    id: "ai-twin",
    target: "[data-guide='ai-twin']",
    title: "Meet Arhan AI 🤖",
    message:
      "You can ask me anything about projects, skills, or experience.\nTry asking: \"What AI projects did you build?\"",
    position: "left",
    fallbackScroll: null,
  },
  {
    id: "skills",
    target: "#section-1",
    title: "Explore My Tech Stack ⚡",
    message:
      "Each technology is interactive and shows the tools I use in real projects.",
    position: "bottom",
    fallbackScroll: 1,
  },
  {
    id: "projects",
    target: "#section-2",
    title: "My Best Projects 🚀",
    message:
      "Here are my best projects. Some include live demos you can try directly.",
    position: "bottom",
    fallbackScroll: 2,
  },
  {
    id: "playground",
    target: "[data-guide='playground']",
    title: "AI Playground 🎮",
    message:
      "This is the AI Playground. You can try simplified versions of my projects here.",
    position: "top",
    fallbackScroll: null,
  },
  {
    id: "system-design",
    target: "#section-16",
    title: "System Design Lab 🔬",
    message:
      "Want to see how my systems work? Run a live architecture simulation here.",
    position: "bottom",
    fallbackScroll: 16,
  },
  {
    id: "easter-eggs",
    target: null,
    title: "Hidden Easter Eggs 🥚",
    message:
      "Explore freely and discover 3 hidden Easter Eggs across the portfolio!\nHint: Try the classic game cheat code on your keyboard…",
    position: "center",
    fallbackScroll: null,
  },
];

function getTargetRect(selector) {
  if (!selector) return null;
  const el = document.querySelector(selector);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    top:    rect.top    + window.scrollY,
    left:   rect.left   + window.scrollX,
    width:  rect.width,
    height: rect.height,
  };
}

function Spotlight({ rect }) {
  if (!rect) return null;
  const pad = 14;
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998]"
      initial={false}
      animate={{}}
      style={{ isolation: "isolate" }}
    >
      {/* Dim overlay with cutout */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ position: "fixed", top: 0, left: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="spotlight-mask">
            <rect width="100%" height="100%" fill="white" />
            <motion.rect
              rx={16}
              fill="black"
              initial={false}
              animate={{
                x:      rect.left   - pad,
                y:      rect.top    - pad,
                width:  rect.width  + pad * 2,
                height: rect.height + pad * 2,
              }}
              transition={{ type: "spring", stiffness: 250, damping: 28 }}
            />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.75)" mask="url(#spotlight-mask)" />
        {/* Highlight ring */}
        <motion.rect
          rx={16}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth={2}
          initial={false}
          animate={{
            x:      rect.left   - pad,
            y:      rect.top    - pad,
            width:  rect.width  + pad * 2,
            height: rect.height + pad * 2,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 28 }}
        />
      </svg>
    </motion.div>
  );
}

function TooltipBox({ step, stepIndex, total, rect, onNext, onPrev, onSkip }) {
  const isCenter = step.position === "center" || !rect;
  let style = {};

  if (!isCenter && rect) {
    const pad = 14;
    if (step.position === "bottom") {
      style = {
        top:  rect.top + rect.height + pad + 14,
        left: Math.max(12, rect.left + rect.width / 2 - 160),
      };
    } else if (step.position === "top") {
      style = {
        top:  rect.top - pad - 14 - 180,
        left: Math.max(12, rect.left + rect.width / 2 - 160),
      };
    } else {
      style = {
        top:  Math.max(12, rect.top + rect.height / 2 - 90),
        left: rect.left - 340,
      };
    }
  }

  const boxClass = isCenter
    ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    : "fixed";

  return (
    <motion.div
      className={`${boxClass} z-[9999] w-80 rounded-2xl border border-violet-500/40 bg-neutral-900/95 backdrop-blur-lg shadow-2xl shadow-violet-900/30 p-5 select-none`}
      style={isCenter ? {} : style}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
    >
      {/* Progress dots */}
      <div className="flex gap-1.5 mb-4">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === stepIndex
                ? "bg-violet-500 w-6"
                : i < stepIndex
                ? "bg-violet-700 w-3"
                : "bg-neutral-700 w-3"
            }`}
          />
        ))}
      </div>

      <h3 className="font-bold text-white text-base mb-2">{step.title}</h3>
      <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line mb-5">
        {step.message}
      </p>

      <div className="flex items-center gap-2">
        {stepIndex > 0 && (
          <button
            onClick={onPrev}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-700/60 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 transition-colors"
          >
            ← Back
          </button>
        )}
        <div className="flex-1" />
        <button
          onClick={onSkip}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          Skip
        </button>
        <button
          onClick={onNext}
          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white transition-colors"
        >
          {stepIndex === total - 1 ? "Finish 🎉" : "Next →"}
        </button>
      </div>

      <p className="text-center text-[10px] text-neutral-600 mt-3">
        {stepIndex + 1} / {total}
      </p>
    </motion.div>
  );
}

export function ExplorationGuide({ onSectionChange }) {
  const [active, setActive]       = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [rect, setRect]           = useState(null);

  // Auto-show on first visit
  useEffect(() => {
    const seen = localStorage.getItem(GUIDE_KEY);
    if (!seen) {
      const t = setTimeout(() => {
        setActive(true);
        localStorage.setItem(GUIDE_KEY, "1");
      }, 3500);
      return () => clearTimeout(t);
    }
  }, []);

  // Listen for external "replay" trigger
  useEffect(() => {
    const handler = () => {
      setStepIndex(0);
      setActive(true);
    };
    window.addEventListener("guide:replay", handler);
    return () => window.removeEventListener("guide:replay", handler);
  }, []);

  const resolveRect = useCallback((step) => {
    if (!step.target) { setRect(null); return; }
    const r = getTargetRect(step.target);
    setRect(r);
    if (!r && step.fallbackScroll !== null) {
      const el = document.getElementById(`section-${step.fallbackScroll}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (r) {
      window.scrollTo({ top: r.top - 120, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    const step = STEPS[stepIndex];
    // Small delay to let scroll settle
    const t = setTimeout(() => resolveRect(step), 350);
    return () => clearTimeout(t);
  }, [active, stepIndex, resolveRect]);

  const handleNext = useCallback(() => {
    if (stepIndex >= STEPS.length - 1) {
      setActive(false);
    } else {
      setStepIndex(i => i + 1);
    }
  }, [stepIndex]);

  const handlePrev = useCallback(() => {
    if (stepIndex > 0) setStepIndex(i => i - 1);
  }, [stepIndex]);

  const handleSkip = useCallback(() => {
    setActive(false);
  }, []);

  return (
    <>
      {/* "How to Explore" button — always visible */}
      <motion.button
        onClick={() => { setStepIndex(0); setActive(true); }}
        className="fixed bottom-6 right-20 z-50 flex items-center gap-2 px-3 py-2 rounded-xl glass-morphism-dark border border-violet-500/30 text-violet-300 text-xs font-semibold hover:bg-violet-500/20 transition-all duration-300 shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>🧭</span>
        <span className="hidden sm:inline">How to Explore</span>
      </motion.button>

      <AnimatePresence>
        {active && (
          <>
            <Spotlight rect={rect} />
            <TooltipBox
              key={stepIndex}
              step={STEPS[stepIndex]}
              stepIndex={stepIndex}
              total={STEPS.length}
              rect={rect}
              onNext={handleNext}
              onPrev={handlePrev}
              onSkip={handleSkip}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default ExplorationGuide;
