import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ─── Walk up the DOM tree to classify the interactive element type ─────────────
const resolveType = (el) => {
  let node = el;
  for (let i = 0; i < 7; i++) {
    if (!node || node === document.documentElement) break;
    const tag  = node.tagName?.toLowerCase() ?? "";
    const dc   = node.dataset?.cursor; // explicit override via data-cursor="..."
    if (dc) return dc;
    if (tag === "button" || node.getAttribute("role") === "button" || node.classList.contains("cursor-pointer")) return "button";
    if (tag === "a") return "link";
    if (tag === "input" || tag === "textarea" || node.contentEditable === "true") return "text";
    if (tag === "img" || tag === "video") return "media";
    if (tag === "canvas") return "canvas";
    node = node.parentElement;
  }
  return "default";
};

// ─── Per-state visual config ──────────────────────────────────────────────────
const STATES = {
  default: { ring: 32, dot: 8,  ringColor: "rgba(56,189,248,0.55)",   ringFill: "transparent",             label: null  },
  button:  { ring: 58, dot: 0,  ringColor: "rgba(167,139,250,0.85)",  ringFill: "rgba(167,139,250,0.10)",  label: null  },
  link:    { ring: 46, dot: 4,  ringColor: "rgba(56,189,248,0.90)",   ringFill: "rgba(56,189,248,0.06)",   label: null  },
  text:    { ring: 3,  dot: 18, ringColor: "rgba(148,163,184,0.5)",   ringFill: "transparent",             label: null  },
  media:   { ring: 70, dot: 0,  ringColor: "rgba(244,114,182,0.85)",  ringFill: "rgba(244,114,182,0.09)",  label: "View"},
  canvas:  { ring: 44, dot: 5,  ringColor: "rgba(52,211,153,0.70)",   ringFill: "rgba(52,211,153,0.06)",   label: null  },
};

let uid = 0;

export const Cursor = () => {
  // Skip entirely on touch / pointer-coarse devices
  const [isTouch] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches
  );

  // Shared motion values — source of truth for cursor position
  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  // Fast dot: very stiff spring — nearly instant
  const dotX = useSpring(mx, { stiffness: 2800, damping: 70, mass: 0.08 });
  const dotY = useSpring(my, { stiffness: 2800, damping: 70, mass: 0.08 });

  // Slow ring: loose spring — soft lag for trailing effect
  const ringX = useSpring(mx, { stiffness: 175, damping: 22, mass: 0.55 });
  const ringY = useSpring(my, { stiffness: 175, damping: 22, mass: 0.55 });

  const [type,    setType]    = useState("default");
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if (isTouch) return;

    const move  = (e) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true); };
    const over  = (e) => setType(resolveType(e.target));
    const leave = ()  => setVisible(false);
    const down  = (e) => {
      setPressed(true);
      const id = ++uid;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 750);
    };
    const up = () => setPressed(false);

    window.addEventListener  ("mousemove",  move);
    document.addEventListener("mouseover",  over);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mousedown",  down);
    document.addEventListener("mouseup",    up);
    return () => {
      window.removeEventListener  ("mousemove",  move);
      document.removeEventListener("mouseover",  over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mousedown",  down);
      document.removeEventListener("mouseup",    up);
    };
  }, [mx, my, isTouch]);

  if (isTouch) return null;

  const s = STATES[type] ?? STATES.default;

  return (
    <>
      {/* ── Click-burst ripples ──────────────────────────────────────────── */}
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="fixed pointer-events-none z-[9995] rounded-full"
          style={{
            left: r.x,
            top:  r.y,
            translateX: "-50%",
            translateY: "-50%",
            borderStyle: "solid",
            borderWidth: "1.5px",
            borderColor: s.ringColor,
          }}
          initial={{ width: 6,  height: 6,  opacity: 0.9 }}
          animate={{ width: 84, height: 84, opacity: 0   }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* ── Secondary ripple (smaller, faster, offset) ──────────────────── */}
      {ripples.map((r) => (
        <motion.div
          key={`s${r.id}`}
          className="fixed pointer-events-none z-[9994] rounded-full"
          style={{
            left: r.x,
            top:  r.y,
            translateX: "-50%",
            translateY: "-50%",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "rgba(255,255,255,0.25)",
          }}
          initial={{ width: 4,  height: 4,  opacity: 0.6 }}
          animate={{ width: 52, height: 52, opacity: 0   }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* ── Outer trailing ring ──────────────────────────────────────────── */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full"
        style={{
          left:        ringX,
          top:         ringY,
          translateX:  "-50%",
          translateY:  "-50%",
          borderStyle: "solid",
          borderWidth: "1.5px",
        }}
        animate={{
          width:           s.ring,
          height:          s.ring,
          borderColor:     s.ringColor,
          backgroundColor: s.ringFill,
          opacity:         visible ? 1 : 0,
          scale:           pressed ? 0.75 : 1,
        }}
        transition={{
          width:           { type: "spring", stiffness: 310, damping: 28 },
          height:          { type: "spring", stiffness: 310, damping: 28 },
          borderColor:     { duration: 0.22 },
          backgroundColor: { duration: 0.22 },
          scale:           { type: "spring", stiffness: 550, damping: 22 },
          opacity:         { duration: 0.12 },
        }}
      >
        {/* Contextual label (e.g. "View" on images) */}
        {s.label && (
          <motion.span
            key={`lbl-${type}`}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1   }}
            exit={   { opacity: 0, scale: 0.4 }}
            style={{
              position:      "absolute",
              inset:         0,
              display:       "flex",
              alignItems:    "center",
              justifyContent:"center",
              fontSize:      "9px",
              fontWeight:    900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:          s.ringColor,
            }}
          >
            {s.label}
          </motion.span>
        )}
      </motion.div>

      {/* ── Inner fast dot ──────────────────────────────────────────────── */}
      {s.dot > 0 && (
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full mix-blend-difference"
          style={{
            left:             dotX,
            top:              dotY,
            translateX:       "-50%",
            translateY:       "-50%",
            backgroundColor:  "#ffffff",
          }}
          animate={{
            width:   s.dot,
            height:  s.dot,
            opacity: visible ? 1 : 0,
            scale:   pressed ? 0.35 : 1,
          }}
          transition={{
            width:   { type: "spring", stiffness: 500, damping: 28 },
            height:  { type: "spring", stiffness: 500, damping: 28 },
            scale:   { type: "spring", stiffness: 700, damping: 20 },
            opacity: { duration: 0.1 },
          }}
        />
      )}
    </>
  );
};