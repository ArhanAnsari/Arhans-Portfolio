import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Menu, X } from 'lucide-react';
import { useWindowStore } from '../store/windowStore';
import { useWindowManager } from '../hooks/useWindowManager';
import Window from '../components/windows/Window';
import { Wallpaper } from '../components/desktop/Wallpaper_Animated';
import SpotlightApp from '../components/apps/SpotlightApp';
import MenuBar from '../components/desktop/MenuBar';
import appRegistry from '../components/apps/index';
import { useSystemStore } from '../store/systemStore';

/**
 * Mobile ArhanOS Shell
 * Adaptive responsive design for mobile/tablet/desktop
 * Implements touch interactions: swipe close, long press menu, tap focus
 */
export const MobileShell = () => {
  const { windows, focusStack } = useWindowStore();
  const { toggleWindow } = useWindowManager();
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [screenSize, setScreenSize] = useState('desktop'); // 'mobile' | 'tablet' | 'desktop'
  const { theme } = useSystemStore();

  React.useEffect(() => {
    // Determine screen size on mount and resize
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setScreenSize('mobile');
      else if (w < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Swipe left: cycle to next app
    if (diff > 50 && focusStack.length > 0) {
      const s = useWindowStore.getState();
      const current = focusStack[focusStack.length - 1];
      if (s && s.focusStack && s.focusStack.length > 1 && s.focusWindow) {
        const next = s.focusStack[s.focusStack.length - 2];
        if (next) s.focusWindow(next);
      }
    }

    // Swipe right: cycle to prev app
    if (diff < -50 && focusStack.length > 0) {
      // Swipe back
      setShowMobileMenu(true);
    }

    setTouchStart(null);
  };

  // Long press context menu
  const handleLongPress = (windowId) => {
    // Show window context menu
    setShowMobileMenu(true);
  };

  const activeWindow = focusStack.length ? windows.find((w) => w.id === focusStack[focusStack.length - 1]) : null;

  return (
    <motion.div
      className={`relative w-screen h-screen overflow-hidden`}
      style={{ background: theme === 'light' ? '#f5f5f5' : '#000' }}
      data-theme={theme}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Wallpaper Background */}
      <Wallpaper />

      {/* Desktop Layout (1024px+) */}
      {screenSize === 'desktop' && (
        <>
          <MenuBar onSpotlightOpen={() => setShowSpotlight(true)} onAppOpen={toggleWindow} />
          <Window appRegistry={appRegistry} onAppSelect={toggleWindow} />
          {showSpotlight && (
            <SpotlightApp
              isOpen={showSpotlight}
              onClose={() => setShowSpotlight(false)}
              onAppSelect={(appId) => {
                toggleWindow(appId);
                setShowSpotlight(false);
              }}
            />
          )}
        </>
      )}

      {/* Tablet Layout (640px - 1024px) */}
      {screenSize === 'tablet' && (
        <>
          {/* Compact top bar */}
          <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-black/40 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-4">
            <h1 className="text-sm font-semibold text-white">ArhanOS</h1>
            <button onClick={() => setShowSpotlight(true)} className="text-white">
              🔍
            </button>
          </div>

          {/* Active window or app */}
          <div className="pt-12 pb-16 h-screen overflow-auto">
            {activeWindow && (
              <Window appRegistry={appRegistry} onAppSelect={toggleWindow} />
            )}
          </div>

          {/* Bottom dock with apps */}
          <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-lg border-t border-white/10 flex items-center justify-around px-4">
            {['finder', 'terminal', 'notes', 'settings', 'contact'].map((appId) => (
              <button
                key={appId}
                onClick={() => toggleWindow(appId)}
                className="w-12 h-12 rounded-lg bg-white/5 hover:bg-white/15 flex items-center justify-center text-xl"
              >
                {appId === 'finder' && '📁'}
                {appId === 'terminal' && '💻'}
                {appId === 'notes' && '📝'}
                {appId === 'settings' && '⚙️'}
                {appId === 'contact' && '👤'}
              </button>
            ))}
          </div>

          {showSpotlight && (
            <SpotlightApp
              isOpen={showSpotlight}
              onClose={() => setShowSpotlight(false)}
              onAppSelect={(appId) => {
                toggleWindow(appId);
                setShowSpotlight(false);
              }}
            />
          )}
        </>
      )}

      {/* Mobile Layout (<640px) */}
      {screenSize === 'mobile' && (
        <>
          {/* Compact top bar */}
          <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-black/60 backdrop-blur-lg flex items-center justify-between px-3">
            <h1 className="text-xs font-bold text-white">ArhanOS</h1>
            <div className="flex gap-2">
              <button onClick={() => setShowSpotlight(true)} className="p-2 text-white text-lg">🔍</button>
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 text-white">
                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Active fullscreen app */}
          <div className="pt-14 pb-20 h-screen overflow-auto">
            {activeWindow && (
              <div className="w-full h-full">
                <Window appRegistry={appRegistry} onAppSelect={toggleWindow} />
              </div>
            )}
            {!activeWindow && (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                <div className="text-center">
                  <div className="text-5xl mb-4">🚀</div>
                  <p>Welcome to ArhanOS Mobile</p>
                  <p className="text-xs mt-2">Tap menu to open apps</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile dock - swipeable app launcher */}
          <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-lg border-t border-white/10 flex items-center justify-around overflow-x-auto px-2">
            {['finder', 'projects', 'terminal', 'notes', 'settings'].map((appId) => (
              <button
                key={appId}
                onClick={() => toggleWindow(appId)}
                onLongPress={() => handleLongPress(appId)}
                className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/15 flex flex-col items-center justify-center text-xs gap-1"
              >
                <span className="text-xl">
                  {appId === 'finder' && '📁'}
                  {appId === 'projects' && '📂'}
                  {appId === 'terminal' && '💻'}
                  {appId === 'notes' && '📝'}
                  {appId === 'settings' && '⚙️'}
                </span>
                <span className="text-[0.6rem] text-neutral-400">{appId}</span>
              </button>
            ))}
          </div>

          {/* Mobile menu overlay */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileMenu(false)}
              >
                <motion.div
                  className="fixed top-14 right-0 w-64 h-full bg-black/90 backdrop-blur-lg border-l border-white/10 p-4 space-y-2"
                  initial={{ x: 300 }}
                  animate={{ x: 0 }}
                  exit={{ x: 300 }}
                >
                  <h3 className="text-sm font-semibold text-white mb-4">Apps</h3>
                  {['about', 'projects', 'skills', 'terminal', 'resume', 'contact', 'ai', 'finder', 'safari', 'settings', 'notes', 'photos', 'trash'].map(
                    (appId) => (
                      <button
                        key={appId}
                        onClick={() => {
                          toggleWindow(appId);
                          setShowMobileMenu(false);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/15 text-white text-left text-sm"
                      >
                        {appId.charAt(0).toUpperCase() + appId.slice(1)}
                      </button>
                    )
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {showSpotlight && (
            <SpotlightApp
              isOpen={showSpotlight}
              onClose={() => setShowSpotlight(false)}
              onAppSelect={(appId) => {
                toggleWindow(appId);
                setShowSpotlight(false);
              }}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default MobileShell;
