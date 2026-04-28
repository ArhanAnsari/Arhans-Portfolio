import { Canvas } from "@react-three/fiber";
import { MotionConfig, motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Leva } from "leva";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { LoadingScreen } from "./components/LoadingScreen";
import { AssetsPreloader } from "./components/AssetsPreloader";
import { Menu } from "./components/Menu";
import { CommandPalette } from "./components/CommandPalette";
import { ParticleBackground } from "./components/ParticleBackground";
import { framerMotionConfig } from "./config";
import { Analytics } from '@vercel/analytics/react';
import AiTwin from "./components/AiTwin";
import { useAtom } from "jotai";
import { themeAtom } from "./config";
import { Sun, Moon } from "lucide-react";
import { NotFound } from "./components/NotFound";
import { Routes, Route, useLocation } from "react-router-dom";
import { BlogDetail } from "./components/BlogDetail";
import Resume from "./components/Resume";
import { ExplorationGuide } from "./components/ExplorationGuide";
import { KonamiEasterEgg } from "./components/EasterEggs";
import { FloatingParticles } from "./components/FloatingParticles";
const SecretLab = lazy(() => import("./components/SecretLab"));

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [theme, setTheme] = useAtom(themeAtom);
  const [secretLabOpen, setSecretLabOpen] = useState(false);
  const location = useLocation();
  const isResumePage = location.pathname === "/resume";

  // Detect low-power / mobile for performance mode (static — computed once)
  const isPerformanceMode = useMemo(
    () =>
      typeof navigator !== "undefined"
        ? (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4) ||
          window.innerWidth < 768 ||
          /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
        : false,
    []
  );

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  // Handle immediate started state for resume page
  useEffect(() => {
    if (isResumePage) {
      setStarted(true);
    }
  }, [isResumePage]);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  // Secret Lab easter egg trigger (via AI Twin command)
  useEffect(() => {
    const handler = () => setSecretLabOpen(true);
    window.addEventListener("easter:secret-lab", handler);
    return () => window.removeEventListener("easter:secret-lab", handler);
  }, []);

  // Native scroll listener for section tracking
  useEffect(() => {
    if (location.pathname !== "/") return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.min(Math.floor(scrollY / windowHeight), 16);
      
      if (newSection !== section) {
        setSection(newSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [section, location.pathname]);

  return (
    <>
      {!isResumePage && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 origin-left z-[100]"
          style={{ scaleX }}
        />
      )}
      {!isResumePage && <ParticleBackground />}
      
      {!isResumePage && <LoadingScreen started={started} setStarted={setStarted} />}
      
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        {/* Fixed Canvas for 3D Scene - Behind Everything, Hidden During Loading */}
        {!isResumePage && (
          <div 
            className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none"
            style={{ display: started ? 'block' : 'none' }}
          >
            <Canvas 
              shadows={!isPerformanceMode}
              camera={{ 
                position: [0, 3, 10], 
                fov: window.innerWidth < 768 ? 50 : 42,
                near: 0.1,
                far: 1000
              }}
              gl={{ 
                antialias: !isPerformanceMode,
                alpha: true,
                powerPreference: isPerformanceMode ? "default" : "high-performance",
                logarithmicDepthBuffer: !isPerformanceMode,
                precision: isPerformanceMode ? "lowp" : "mediump"
              }}
              dpr={[1, isPerformanceMode ? 1 : 1.5]}
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <color attach="background" args={[theme === "light" ? "#f8fafc" : "#0f172a"]} />
              <fog attach="fog" args={[theme === "light" ? "#f8fafc" : "#0f172a", 20, 50]} />
            
              <Suspense fallback={null}>
                {/* ALWAYS preload assets - useProgress needs this mounted to track loading */}
                <AssetsPreloader />
              </Suspense>
              
              <Suspense fallback={null}>
                {/* Experience only renders when started (after all assets loaded) */}
                {started && (
                  <Experience section={section} menuOpened={menuOpened} setSection={setSection} performanceMode={isPerformanceMode} />
                )}
              </Suspense>
            </Canvas>
          </div>
        )}

        <Routes>
          <Route path="/" element={
            <>
              {started && (
                <div className="relative z-10 w-full pointer-events-auto">
                  <Interface setSection={setSection} performanceMode={isPerformanceMode} />
                </div>
              )}
              
              {started && (
                <Menu
                  onSectionChange={setSection}
                  menuOpened={menuOpened}
                  setMenuOpened={setMenuOpened}
                />
              )}
            </>
          } />
          <Route path="/resume" element={
            <div className="relative z-[100] w-full bg-white">
              <Resume />
            </div>
          } />
          <Route path="/blog/:id" element={
            <div className="relative z-10 w-full">
              <BlogDetail />
            </div>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Cursor />
      </MotionConfig>
      
      {!isResumePage && (
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="fixed top-6 left-6 z-50 p-3 glass-morphism-dark rounded-xl w-14 h-14 flex items-center justify-center group hover:bg-primary-500/20 transition-all duration-300 shadow-lg hover:shadow-primary-500/25"
          aria-label="Toggle theme"
        >
          <div className="relative w-6 h-6">
            <motion.div
              initial={false}
              animate={{ 
                scale: theme === "dark" ? 1 : 0, 
                rotate: theme === "dark" ? 0 : 90,
                opacity: theme === "dark" ? 1 : 0
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="text-yellow-400 w-6 h-6" />
            </motion.div>
            <motion.div
              initial={false}
              animate={{ 
                scale: theme === "light" ? 1 : 0, 
                rotate: theme === "light" ? 0 : -90,
                opacity: theme === "light" ? 1 : 0
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="text-primary-600 w-6 h-6" />
            </motion.div>
          </div>
        </button>
      )}

      {/* Command palette hint */}
      {!isResumePage && started && (
        <motion.div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 px-3 py-2 glass-morphism-dark rounded-lg text-neutral-500 text-xs border border-neutral-700/30 select-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <kbd className="bg-neutral-800 border border-neutral-700 rounded px-1.5 py-0.5 text-[10px]">⌘</kbd>
          <kbd className="bg-neutral-800 border border-neutral-700 rounded px-1.5 py-0.5 text-[10px]">K</kbd>
          <span>Command Palette</span>
        </motion.div>
      )}

      {/* Performance mode indicator */}
      {!isResumePage && started && isPerformanceMode && (
        <motion.div
          className="fixed bottom-24 right-6 z-40 flex items-center gap-1.5 px-3 py-1.5 glass-morphism-dark rounded-full text-green-400 text-[10px] font-medium border border-green-500/20 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Performance Mode
        </motion.div>
      )}

      {!isResumePage && <AiTwin section={section} />}
      {!isResumePage && <CommandPalette onSectionChange={setSection} />}
      
      {/* New interactive features */}
      {!isResumePage && started && (
        <ExplorationGuide onSectionChange={setSection} />
      )}
      {!isResumePage && <KonamiEasterEgg />}
      {!isResumePage && started && <FloatingParticles />}

      {/* Easter Egg 2: Secret Lab — Suspense must be outside AnimatePresence so that
          SecretLab's motion.div root is the direct child AnimatePresence tracks for
          exit animations. Having Suspense as the direct child prevents exit from firing. */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {secretLabOpen && (
            <SecretLab onClose={() => setSecretLabOpen(false)} />
          )}
        </AnimatePresence>
      </Suspense>
      
      <Leva hidden />
      <Analytics />
    </>
  );
}

export default App;
