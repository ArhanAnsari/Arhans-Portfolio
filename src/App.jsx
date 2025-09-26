import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MotionConfig } from "framer-motion";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import { Cursor } from "./components/Cursor";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { LoadingScreen } from "./components/LoadingScreen";
import { Menu } from "./components/Menu";
import { ScrollManager } from "./components/ScrollManager";
import { ParticleBackground } from "./components/ParticleBackground";
import { framerMotionConfig } from "./config";
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
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
        <div className="canvas-container">
          <Canvas 
            shadows 
            camera={{ position: [0, 3, 10], fov: 42 }}
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: "high-performance"
            }}
          >
            <color attach="background" args={["transparent"]} />
            <fog attach="fog" args={["#0f172a", 10, 50]} />
          
            <ScrollControls pages={13} damping={0.1}>
              <ScrollManager section={section} onSectionChange={setSection} />
              <Scroll>
                <Suspense fallback={null}>
                  {started && (
                    <Experience section={section} menuOpened={menuOpened} />
                  )}
                </Suspense>
              </Scroll>
              <Scroll html>
                {started && (
                  <div className="content-overlay">
                    <Interface setSection={setSection} />
                  </div>
                )}
              </Scroll>
            </ScrollControls>
          </Canvas>
        </div>
        
        {started && (
          <Menu
            onSectionChange={setSection}
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
          />
        )}
        <Cursor />
      </MotionConfig>
      
      <Leva hidden />
      <Analytics />
    </>
  );
}

export default App;
