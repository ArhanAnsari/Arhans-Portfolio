import { useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, Stars } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// ─── Tech node data ──────────────────────────────────────────────────────────
const techData = [
  {
    id: "react",
    label: "React",
    color: "#61dafb",
    ring: 1,
    speed: 0.35,
    phaseOffset: 0,
    description: "UI library for building interactive interfaces with a component-based architecture.",
    projects: ["This Portfolio", "Task Manager Pro", "Clipgen AI"],
  },
  {
    id: "threejs",
    label: "Three.js",
    color: "#ffffff",
    ring: 1,
    speed: 0.28,
    phaseOffset: Math.PI / 2,
    description: "3D graphics library powering WebGL scenes, animations, and immersive experiences.",
    projects: ["This Portfolio", "3D Car Racing Game"],
  },
  {
    id: "nodejs",
    label: "Node.js",
    color: "#68a063",
    ring: 2,
    speed: 0.22,
    phaseOffset: 0.8,
    description: "Server-side JavaScript runtime for building scalable, high-performance backends.",
    projects: ["Chat to PDF", "InspireGem", "SaaS Platforms"],
  },
  {
    id: "mongodb",
    label: "MongoDB",
    color: "#47a248",
    ring: 2,
    speed: 0.2,
    phaseOffset: 2.1,
    description: "NoSQL document database for flexible, scalable data storage in modern apps.",
    projects: ["Chat to PDF", "InspireGem"],
  },
  {
    id: "reactnative",
    label: "React Native",
    color: "#61dafb",
    ring: 2,
    speed: 0.25,
    phaseOffset: 3.8,
    description: "Cross-platform mobile framework for building iOS & Android apps with React.",
    projects: ["Mobile Apps", "Expo Projects"],
  },
  {
    id: "nextjs",
    label: "Next.js",
    color: "#a0a0a0",
    ring: 2,
    speed: 0.18,
    phaseOffset: 5.2,
    description: "Full-stack React framework with SSR, SSG, and API routes built-in.",
    projects: ["AutoYT", "CanvasCraft", "Clipgen AI"],
  },
  {
    id: "python",
    label: "Python",
    color: "#3776ab",
    ring: 3,
    speed: 0.15,
    phaseOffset: 1.2,
    description: "Versatile language for AI/ML scripting, automation, and backend services.",
    projects: ["AI Tools", "Data Scripts"],
  },
  {
    id: "ai",
    label: "AI / ML",
    color: "#d946ef",
    ring: 3,
    speed: 0.17,
    phaseOffset: 2.8,
    description: "Machine learning integrations using Gemini, OpenAI, and Together AI APIs.",
    projects: ["AutoYT", "InspireGem", "Synthara"],
  },
  {
    id: "tailwind",
    label: "Tailwind",
    color: "#38bdf8",
    ring: 3,
    speed: 0.14,
    phaseOffset: 4.4,
    description: "Utility-first CSS framework for building modern, responsive UIs at speed.",
    projects: ["This Portfolio", "All Web Projects"],
  },
  {
    id: "typescript",
    label: "TypeScript",
    color: "#3178c6",
    ring: 3,
    speed: 0.16,
    phaseOffset: 0.4,
    description: "Typed superset of JavaScript that catches bugs early and improves code quality.",
    projects: ["Modern Projects", "SaaS Platforms"],
  },
  {
    id: "express",
    label: "Express",
    color: "#888888",
    ring: 3,
    speed: 0.13,
    phaseOffset: 3.5,
    description: "Minimalist Node.js web framework for building REST APIs and web servers.",
    projects: ["Backend APIs", "Full-Stack Projects"],
  },
  {
    id: "framer",
    label: "Framer Motion",
    color: "#e879f9",
    ring: 1,
    speed: 0.4,
    phaseOffset: Math.PI,
    description: "Production-ready animation library for React with physics-based motion.",
    projects: ["This Portfolio", "Interactive UIs"],
  },
];

// Ring radii
const RING_RADII = { 1: 3.5, 2: 6, 3: 8.5 };

// ─── Central core ────────────────────────────────────────────────────────────
const CoreSphere = () => {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.008;
    meshRef.current.rotation.x += 0.003;
    // Pulse
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse * 1.6);
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
      {/* Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#38bdf8"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
      <pointLight color="#38bdf8" intensity={2} distance={8} />
    </group>
  );
};

// ─── Individual tech node ─────────────────────────────────────────────────────
const TechNode = ({ tech, hovered, onClick, onHover }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  const isHovered = hovered?.id === tech.id;
  const radius = RING_RADII[tech.ring];
  const timeRef = useRef(tech.phaseOffset);

  useFrame((state) => {
    timeRef.current += tech.speed * 0.008;
    const t = timeRef.current;

    // Orbit in XZ plane with slight Y oscillation
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 0.7 + tech.phaseOffset) * 0.6;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }

    // Pulse emissive when hovered
    if (meshRef.current) {
      meshRef.current.material.emissiveIntensity = isHovered
        ? 1.5 + Math.sin(state.clock.elapsedTime * 4) * 0.4
        : 0.5;
      meshRef.current.scale.setScalar(isHovered ? 1.4 : 1);
    }
  });

  const color = new THREE.Color(tech.color);

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => { e.stopPropagation(); onHover(tech); }}
        onPointerOut={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onClick(tech); }}
      >
        <sphereGeometry args={[0.28, 14, 14]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      {/* Label */}
      <Billboard>
        <Text
          position={[0, 0.55, 0]}
          fontSize={0.22}
          color={isHovered ? "#ffffff" : "#cccccc"}
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {tech.label}
        </Text>
      </Billboard>
    </group>
  );
};

// ─── Ring guides ─────────────────────────────────────────────────────────────
const OrbitRing = ({ radius }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#38bdf8" opacity={0.08} transparent />
    </line>
  );
};

// ─── Scene ────────────────────────────────────────────────────────────────────
const GalaxyScene = ({ onHover, onNodeClick, hovered, isMobile }) => {
  const nodes = isMobile ? techData.filter((t) => t.ring < 3) : techData;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Starfield background */}
      <Stars radius={40} depth={20} count={isMobile ? 300 : 600} factor={2} saturation={0} fade />

      {/* Core */}
      <CoreSphere />

      {/* Orbit ring guides */}
      {[3.5, 6, ...(isMobile ? [] : [8.5])].map((r) => (
        <OrbitRing key={r} radius={r} />
      ))}

      {/* Tech nodes */}
      {nodes.map((tech) => (
        <TechNode
          key={tech.id}
          tech={tech}
          hovered={hovered}
          onHover={onHover}
          onClick={onNodeClick}
        />
      ))}
    </>
  );
};

// ─── Tech Info Card (HTML overlay) ───────────────────────────────────────────
const TechInfoCard = ({ tech, onClose }) => (
  <AnimatePresence>
    {tech && (
      <motion.div
        key={tech.id}
        className="absolute top-4 left-4 z-10 w-64 rounded-2xl glass-morphism-dark border border-primary-500/30 p-5 pointer-events-auto"
        initial={{ opacity: 0, scale: 0.9, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: -10 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-200 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {/* Color dot + name */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
          />
          <h3 className="font-bold text-neutral-100 text-base">{tech.label}</h3>
        </div>
        <p className="text-neutral-400 text-xs leading-relaxed mb-3">{tech.description}</p>
        {tech.projects?.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-primary-400 uppercase tracking-wider mb-1.5">Used in</p>
            <div className="flex flex-wrap gap-1">
              {tech.projects.map((p) => (
                <span key={p} className="text-[10px] px-2 py-0.5 bg-primary-500/10 border border-primary-500/20 text-primary-300 rounded-full">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Public component ─────────────────────────────────────────────────────────
const TechGalaxy = ({ performanceMode = false }) => {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (performanceMode) {
    // Fallback: simple tech grid
    return (
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 gap-3 py-8">
        {techData.map((tech) => (
          <div
            key={tech.id}
            className="flex flex-col items-center gap-2 p-3 rounded-xl glass-morphism border border-neutral-700/30"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-xs text-neutral-300 font-medium text-center">{tech.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height: isMobile ? "360px" : "520px" }}>
      <Canvas
        camera={{ position: [0, 4, 14], fov: 55 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "default" }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <GalaxyScene
            onHover={setHoveredTech}
            onNodeClick={setSelectedTech}
            hovered={hoveredTech}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>

      {/* Info card overlay */}
      <TechInfoCard
        tech={selectedTech}
        onClose={() => setSelectedTech(null)}
      />

      {/* Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-[10px] text-neutral-600">Click any node to explore</p>
      </div>
    </div>
  );
};

export default TechGalaxy;
