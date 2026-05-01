/**
 * Icon Mapper Utility
 * Maps app IDs to their corresponding image paths and fallback emojis
 */

export const APP_ICONS = {
  // Phase 2 Apps
  about: { image: '/icons/info.svg', emoji: '👨‍💻' },
  projects: { image: '/icons/work.svg', emoji: '🚀' },
  skills: { image: '/icons/atom.svg', emoji: '⚡' },
  terminal: { image: '/images/terminal.png', emoji: '💻' },
  content: { image: '/images/notes.png', emoji: '📹' },
  contact: { image: '/icons/user.svg', emoji: '📬' },
  resume: { image: '/images/pdf.png', emoji: '📄' },
  ai: { image: '/icons/info.svg', emoji: '🤖' },

  // Phase 3 Apps
  finder: { image: '/images/finder.png', emoji: '📁' },
  safari: { image: '/images/safari.png', emoji: '🧭' },
  launchpad: { image: '/images/pages.png', emoji: '🎯' },
  notifications: { image: '/images/notes.png', emoji: '🔔' },
  codewitharhan: { image: '/images/notes.png', emoji: '📺' },
  saas: { image: '/icons/work.svg', emoji: '📊' },
  devtimeline: { image: '/icons/info.svg', emoji: '📅' },
};

/**
 * Get icon configuration for an app
 * @param {string} appId - The app ID
 * @returns {Object} - { image, emoji }
 */
export const getAppIcon = (appId) => {
  return APP_ICONS[appId] || { image: null, emoji: '📦' };
};

/**
 * Get icon element (either img or emoji)
 * @param {string} appId - The app ID
 * @param {string} source - 'image' or 'emoji' (default: 'image')
 * @returns {string} - Path or emoji string
 */
export const getIconElement = (appId, source = 'image') => {
  const icon = getAppIcon(appId);
  return source === 'image' ? icon.image : icon.emoji;
};

export default APP_ICONS;
