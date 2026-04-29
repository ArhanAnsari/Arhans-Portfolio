/**
 * Application Constants
 * Static app configurations and defaults
 */

// Dock configuration
export const DOCK_APPS = [
  { id: 'about', name: 'About', icon: '👨‍💻' },
  { id: 'projects', name: 'Projects', icon: '🚀' },
  { id: 'skills', name: 'Skills', icon: '⚡' },
  { id: 'terminal', name: 'Terminal', icon: '💻' },
  { id: 'content', name: 'Content', icon: '📹' },
  { id: 'contact', name: 'Contact', icon: '📬' },
  { id: 'resume', name: 'Resume', icon: '📄' },
  { id: 'ai', name: 'AI Twin', icon: '🤖' },
];

// Window defaults
export const WINDOW_DEFAULTS = {
  width: 800,
  height: 600,
  minWidth: 400,
  minHeight: 300,
  maxWidth: 1200,
  maxHeight: 900,
};

// Desktop constants
export const DESKTOP = {
  gridSize: 20,
  dockHeight: 80,
  dockPadding: 16,
  dockItemSize: 48,
  titleBarHeight: 32,
};

// Z-index layers
export const Z_INDEX = {
  wallpaper: 0,
  desktop: 10,
  window: 100,
  modal: 200,
  tooltip: 300,
};

// Animations
export const ANIMATION_TIMING = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};
