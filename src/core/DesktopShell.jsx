import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallpaper } from '../components/desktop/Wallpaper_Animated';
import { Dock } from '../components/desktop/Dock';
import { Window } from '../components/windows/Window';
import { Cursor } from '../components/Cursor';
import { useWindowManager } from '../hooks/useWindowManager';
import MenuBar from '../components/desktop/MenuBar';
import SpotlightApp from '../components/apps/SpotlightApp';
import Welcome from '../components/desktop/Welcome';
import appRegistry from '../components/apps/index';

/**
 * Desktop Shell Component
 * Main layout orchestrating premium ArhanOS desktop experience
 * Integrated Phase 3: Menu bar, Welcome hero, Spotlight, notifications
 */
export const DesktopShell = () => {
  const { toggleWindow } = useWindowManager();
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + Space for Spotlight
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
        e.preventDefault();
        setShowSpotlight(!showSpotlight);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSpotlight]);

  const handleAppOpen = (appId) => {
    setShowWelcome(false);
    toggleWindow(appId);
  };

  const handleAppSelect = (appId) => {
    handleAppOpen(appId);
  };

  const handleSpotlightSelect = (appId) => {
    setShowSpotlight(false);
    handleAppSelect(appId);
  };

  return (
    <motion.div
      className="relative w-screen h-screen overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Custom macOS Cursor */}
      <Cursor />

      {/* Wallpaper */}
      <Wallpaper />

      {/* Welcome Hero Screen (Full Screen Initial) */}
      {showWelcome && (
        <motion.div
          className="absolute inset-0 z-[7000] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Welcome />
          <motion.button
            onClick={() => setShowWelcome(false)}
            className="mt-16 px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter ArhanOS
          </motion.button>
        </motion.div>
      )}

      {/* System MenuBar */}
      {!showWelcome && (
        <MenuBar
          onSpotlightOpen={() => setShowSpotlight(true)}
          onNotificationOpen={() => toggleWindow('notifications')}
        />
      )}

      {/* Windows Container (Push down for menu bar) */}
      <div className={`${!showWelcome ? 'mt-8' : ''}`}>
        <Window appRegistry={appRegistry} />
      </div>

      {/* Spotlight Search */}
      {!showWelcome && (
        <SpotlightApp
          isOpen={showSpotlight}
          onClose={() => setShowSpotlight(false)}
          onAppSelect={handleSpotlightSelect}
        />
      )}

      {/* Dock */}
      {!showWelcome && <Dock onAppOpen={handleAppOpen} />}
    </motion.div>
  );
};
