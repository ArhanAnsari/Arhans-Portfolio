import React from 'react';
import { motion } from 'framer-motion';
import { Wallpaper } from '../components/desktop/Wallpaper';
import { Dock } from '../components/desktop/Dock';
import { Window } from '../components/windows/Window';
import { Cursor } from '../components/Cursor';
import { useWindowManager } from '../hooks/useWindowManager';
import appRegistry from '../components/apps/index';

/**
 * Desktop Shell Component
 * Main layout orchestrating desktop experience
 * Renders: Wallpaper, Dock, Windows, Cursor
 */
export const DesktopShell = () => {
  const { openWindow } = useWindowManager();

  const handleAppOpen = (appId) => {
    openWindow(appId);
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

      {/* Windows Container */}
      <Window appRegistry={appRegistry} />

      {/* Dock */}
      <Dock onAppOpen={handleAppOpen} />
    </motion.div>
  );
};
