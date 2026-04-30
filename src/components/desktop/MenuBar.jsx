import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import { Bell, Wifi, Battery, Settings, Search, RotateCcw, Power } from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';

/**
 * ArhanOS MenuBar
 * Premium system menu bar with dropdowns, system stats, and notifications
 */
const MenuBar = ({ onSpotlightOpen, onNotificationOpen }) => {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [activeMenu, setActiveMenu] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(92);
  const [wifiStrength, setWifiStrength] = useState(4);
  const { windows, focusStack } = useWindowStore();
  const menuRef = useRef(null);

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Get active app name
  const getActiveAppName = () => {
    if (focusStack.length === 0) return 'Finder';
    const activeWindowId = focusStack[focusStack.length - 1];
    const activeWindow = windows.find(w => w.id === activeWindowId);
    return activeWindow?.title || 'Finder';
  };

  // Menu actions
  const handleAboutArhanOS = () => {
    alert('ArhanOS v1.0 - Premium Desktop Experience\nBuilt with React, Framer Motion & Tailwind CSS');
  };

  const handleSystemPreferences = () => {
    alert('System Preferences\n\n📊 Display: Retina\n🔊 Sound: Enabled\n🔋 Battery Saver: Off\n🌙 Dark Mode: On');
  };

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart?')) {
      window.location.reload();
    }
  };

  const handleShutdown = () => {
    if (confirm('Are you sure you want to shutdown?')) {
      window.location.href = '/';
    }
  };

  const menus = [
    {
      id: 'arhan',
      label: '/images/logo.svg',
      items: [
        { label: 'About ArhanOS', action: handleAboutArhanOS },
        { label: 'System Preferences', action: handleSystemPreferences },
        { label: 'Restart', action: handleRestart },
        { label: 'Shutdown', action: handleShutdown },
      ],
    },
    {
      id: 'file',
      label: 'File',
      items: [
        { label: 'New Window', action: () => alert('Opening new window...') },
        { label: 'New Tab', action: () => alert('Opening new tab...') },
        { label: 'Close Window', action: () => alert('Closing window...') },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        { label: 'Undo (⌘Z)', action: () => alert('Undo') },
        { label: 'Redo (⌘Y)', action: () => alert('Redo') },
        { label: 'Cut (⌘X)', action: () => alert('Cut') },
        { label: 'Copy (⌘C)', action: () => alert('Copy') },
        { label: 'Paste (⌘V)', action: () => alert('Paste') },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        { label: 'Zoom In (⌘+)', action: () => alert('Zooming in...') },
        { label: 'Zoom Out (⌘-)', action: () => alert('Zooming out...') },
        { label: 'Reset Zoom (⌘0)', action: () => alert('Zoom reset') },
      ],
    },
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  return (
    <>
      {/* MenuBar Background */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-8 bg-black/40 backdrop-blur-md border-b border-white/10 z-[9999] flex items-center px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Left Section - Menus */}
        <div className="flex items-center gap-6 flex-1" ref={menuRef}>
          {/* Apple Logo + Arhan's Portfolio (Same Line) */}
          <motion.button
            onClick={() => handleMenuClick('arhan')}
            className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded transition-colors relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg"><img src="/images/logo.svg" alt="Apple Logo" className="w-5 h-5" /></span>
            <span className="text-xs font-bold text-neutral-200">Arhan's Portfolio</span>
            <AnimatePresence>
              {activeMenu === 'arhan' && (
                <motion.div
                  className="absolute top-full left-0 mt-2 bg-neutral-900/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl w-56 py-2 z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {menus[0].items.map((item, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        item.action();
                        setActiveMenu(null);
                      }}
                      className="block w-full text-left px-4 py-2 text-xs text-neutral-200 hover:bg-primary-500/30 transition-colors"
                      whileHover={{ paddingLeft: '1.25rem' }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Active App Name */}
          <div className="text-xs text-neutral-300 font-medium">
            {getActiveAppName()}
          </div>

          {/* File, Edit, View Menus */}
          {menus.slice(1, 4).map((menu) => (
            <motion.button
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              className="text-xs hover:bg-white/10 px-2 py-1 rounded transition-colors relative text-neutral-200 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {menu.label}
              <AnimatePresence>
                {activeMenu === menu.id && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 bg-neutral-900/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl w-48 py-2 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {menu.items.map((item, idx) => (
                      <motion.button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action();
                          setActiveMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-xs text-neutral-200 hover:bg-primary-500/30 transition-colors"
                        whileHover={{ paddingLeft: '1.25rem' }}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        {/* Right Section - System Stats & Clock */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Spotlight Search */}
          <motion.button
            onClick={onSpotlightOpen}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Spotlight (Cmd+Space)"
          >
            <Search size={12} className="text-neutral-400" />
          </motion.button>

          {/* WiFi */}
          <motion.div
            className="flex items-center text-neutral-400 text-xs"
            whileHover={{ color: '#fff' }}
            title={`WiFi: ${wifiStrength}/5`}
          >
            <Wifi size={12} />
          </motion.div>

          {/* Battery */}
          <motion.div
            className="flex items-center gap-1 text-neutral-400 text-xs"
            whileHover={{ color: '#fff' }}
            title={`Battery: ${batteryLevel}%`}
          >
            <Battery
              size={12}
              className={`${
                batteryLevel < 20
                  ? 'text-red-400'
                  : batteryLevel < 50
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}
            />
            <span className={`w-6 text-right ${batteryLevel < 20 ? 'text-red-400' : ''}`}>
              {batteryLevel}%
            </span>
          </motion.div>

          {/* Notifications */}
          <motion.button
            onClick={onNotificationOpen}
            className="relative text-neutral-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={12} />
            <motion.span
              className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>

          {/* Clock */}
          <div className="text-neutral-300 text-xs font-mono ml-2 w-12 text-right">
            {currentTime.format('h:mm A')}
          </div>
        </div>
      </motion.div>

      {/* Click outside to close menus */}
      {activeMenu && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setActiveMenu(null)}
        />
      )}
    </>
  );
};

export default MenuBar;
