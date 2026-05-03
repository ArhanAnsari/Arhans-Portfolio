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
import DesktopLayer from '../components/desktop/DesktopLayer';
import ControlCenter from '../components/desktop/ControlCenter';
import MissionControl from '../components/desktop/MissionControl';
import appRegistry from '../components/apps/index';
import { useSystemStore } from '../store/systemStore';
import { useWindowStore } from '../store/windowStore';
import { useUIStore } from '../store/uiStore';

/**
 * Desktop Shell Component
 * Main layout orchestrating premium ArhanOS desktop experience
 * Integrated Phase 3: Menu bar, Welcome hero, Spotlight, notifications
 */
export const DesktopShell = () => {
  const { toggleWindow } = useWindowManager();
  const windows = useWindowStore((state) => state.windows);
  const { snapPreview } = useWindowStore();
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(() => {
    const windowHydrated = useWindowStore.persist?.hasHydrated?.() ?? false;
    const systemHydrated = useSystemStore.persist?.hasHydrated?.() ?? false;
    return windowHydrated && systemHydrated;
  });
  const { wallpapers, activeWallpaperId, setWallpaper, theme, hasEnteredDesktop, markDesktopEntered } = useSystemStore();
  const { showControlCenter, showMissionControl, toggleControlCenter, toggleMissionControl, closeAllPanels } = useUIStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + Space for Spotlight
      if ((e.ctrlKey || e.metaKey) && e.code === 'Space') {
        e.preventDefault();
        setShowSpotlight(!showSpotlight);
      }

        if (e.key === 'F3') {
          e.preventDefault();
          toggleMissionControl();
        }

        if (e.key === 'Escape') {
          closeAllPanels();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSpotlight]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const syncHydration = () => {
      const windowHydrated = useWindowStore.persist?.hasHydrated?.() ?? true;
      const systemHydrated = useSystemStore.persist?.hasHydrated?.() ?? true;
      setHasHydrated(windowHydrated && systemHydrated);
    };

    syncHydration();

    const unsubscribeWindow = useWindowStore.persist?.onFinishHydration?.(syncHydration);
    const unsubscribeSystem = useSystemStore.persist?.onFinishHydration?.(syncHydration);

    return () => {
      unsubscribeWindow?.();
      unsubscribeSystem?.();
    };
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    setShowWelcome(!hasEnteredDesktop && windows.length === 0);
  }, [hasHydrated, hasEnteredDesktop, windows.length]);

  const handleAppOpen = (appId) => {
    markDesktopEntered();
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

  const handleWallpaperCycle = () => {
    const currentIndex = wallpapers.findIndex((w) => w.id === activeWallpaperId);
    const next = wallpapers[(currentIndex + 1) % wallpapers.length];
    if (next) setWallpaper(next.id);
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

      {/* Desktop Layer */}
      {!showWelcome && (
        <DesktopLayer
          onOpenApp={handleAppOpen}
          onOpenExternal={(url) => window.open(url, '_blank')}
          onWallpaperCycle={handleWallpaperCycle}
        />
      )}

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
            onClick={() => {
              markDesktopEntered();
              setShowWelcome(false);
            }}
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
          onAppOpen={handleAppOpen}
          onSpotlightOpen={() => setShowSpotlight(true)}
          onNotificationOpen={() => toggleWindow('notifications')}
        />
      )}

      {/* Windows Container (Push down for menu bar) */}
      <div className={`${!showWelcome ? 'mt-8' : ''}`}>
        <Window appRegistry={appRegistry} onAppSelect={handleAppSelect} />
      </div>

      {/* Snap Preview Overlay */}
      {!showWelcome && snapPreview?.bounds && (
        <motion.div
          className="fixed z-[95] border border-cyan-300/80 bg-cyan-400/15 backdrop-blur-sm pointer-events-none rounded-md"
          style={{
            left: snapPreview.bounds.x,
            top: snapPreview.bounds.y,
            width: snapPreview.bounds.width,
            height: snapPreview.bounds.height,
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        />
      )}

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

      <MissionControl isOpen={showMissionControl} onClose={toggleMissionControl} />
      <ControlCenter isOpen={showControlCenter} onClose={toggleControlCenter} />

      {!hasHydrated && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950 text-neutral-200">
          <div className="text-center">
            <div className="mb-3 text-4xl"></div>
            <div className="text-sm uppercase tracking-[0.3em] text-neutral-500">Restoring session</div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
