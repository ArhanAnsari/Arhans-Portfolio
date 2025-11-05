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

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  // Native scroll listener for section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.min(Math.floor(scrollY / windowHeight), 8);
      
      if (newSection !== section) {
        setSection(newSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [section]);

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
            <color attach="background" args={["#0f172a"]} />
            <fog attach="fog" args={["#0f172a", 20, 50]} />
          
            <Suspense fallback={null}>
              {started && (
                <Experience section={section} menuOpened={menuOpened} />
              )}
            </Suspense>
          </Canvas>
        </div>

        {/* Scrollable Content - On Top with transparency */}
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
        <Cursor />
      </MotionConfig>
      
      <AiTwin />
      
      <Leva hidden />
      <Analytics />
    </>
  );
}

export default App;
