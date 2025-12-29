import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
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

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [theme, setTheme] = useAtom(themeAtom);
  const location = useLocation();

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

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
      <ParticleBackground />
      
      <LoadingScreen started={started} setStarted={setStarted} />
      
      <MotionConfig
        transition={{
          ...framerMotionConfig,
        }}
      >
        {/* Fixed Canvas for 3D Scene - Behind Everything */}
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
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Cursor />
      </MotionConfig>
      
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-6 left-6 z-50 p-3 glass-morphism-dark rounded-xl w-14 h-14 flex items-center justify-center group hover:bg-primary-500/20 transition-all duration-300"
      >
        {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-slate-900" />}
      </button>

      <AiTwin />
      
      <Leva hidden />
      <Analytics />
    </>
  );
}

export default App;
