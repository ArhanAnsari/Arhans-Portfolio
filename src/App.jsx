import { Canvas } from "@react-three/fiber";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { LoadingScreen } from "./components/LoadingScreen";
import { Menu } from "./components/Menu";
import { ParticleBackground } from "./components/ParticleBackground";
import { framerMotionConfig } from "./config";
import { Analytics } from '@vercel/analytics/react';
import AiTwin from "./components/AiTwin";
import { useAtom } from "jotai";
import { themeAtom } from "./config";
import { Sun, Moon } from "lucide-react";
import { NotFound } from "./components/NotFound";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { BlogDetail } from "./components/BlogDetail";
import Resume from "./components/Resume";

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [theme, setTheme] = useAtom(themeAtom);
  const location = useLocation();
  const isResumePage = location.pathname === "/resume";

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

  // Native scroll listener for section tracking
  useEffect(() => {
    if (location.pathname !== "/") return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.min(Math.floor(scrollY / windowHeight), 9);
      
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
        {/* Fixed Canvas for 3D Scene - Behind Everything */}
        {!isResumePage && (
          <div className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none">
            <Canvas 
              shadows 
              camera={{ 
                position: [0, 3, 10], 
                fov: window.innerWidth < 768 ? 50 : 42,
                near: 0.1,
                far: 1000
              }}
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                logarithmicDepthBuffer: true,
                precision: "mediump"
              }}
              dpr={window.innerWidth < 768 ? 1 : window.devicePixelRatio}
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <color attach="background" args={[theme === "light" ? "#f8fafc" : "#0f172a"]} />
              <fog attach="fog" args={[theme === "light" ? "#f8fafc" : "#0f172a", 20, 50]} />
            
              <Suspense fallback={null}>
                {started && (
                  <Experience section={section} menuOpened={menuOpened} setSection={setSection} />
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
                  <Interface setSection={setSection} />
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

      {!isResumePage && <AiTwin />}
      
      <Leva hidden />
      <Analytics />
    </>
  );
}

export default App;
