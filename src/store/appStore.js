import { create } from 'zustand';

/**
 * App Store
 * Manages app configuration and metadata
 */
export const useAppStore = create((set) => ({
  // App registry with metadata
  apps: {
    about: {
      id: 'about',
      name: 'About',
      title: 'About Arhan',
      icon: '👨‍💻',
      description: 'Learn about me',
    },
    projects: {
      id: 'projects',
      name: 'Projects',
      title: 'Portfolio Projects',
      icon: '🚀',
      description: 'My work and creations',
    },
    skills: {
      id: 'skills',
      name: 'Skills',
      title: 'Technical Skills',
      icon: '⚡',
      description: 'Languages and technologies',
    },
    terminal: {
      id: 'terminal',
      name: 'Terminal',
      title: 'Terminal',
      icon: '💻',
      description: 'Interactive terminal',
    },
    content: {
      id: 'content',
      name: 'Content',
      title: 'Content & Videos',
      icon: '📹',
      description: 'YouTube and media',
    },
    contact: {
      id: 'contact',
      name: 'Contact',
      title: 'Get in Touch',
      icon: '📬',
      description: 'Contact information',
    },
    resume: {
      id: 'resume',
      name: 'Resume',
      title: 'Resume & CV',
      icon: '📄',
      description: 'Interactive resume',
    },
    ai: {
      id: 'ai',
      name: 'AI Twin',
      title: 'Arhan\'s AI Assistant',
      icon: '🤖',
      description: 'AI portfolio assistant',
    },
  },

  /**
   * Get app by ID
   */
  getApp: (appId) => {
    const state = useAppStore.getState();
    return state.apps[appId] || null;
  },

  /**
   * Get all apps as array
   */
  getAllApps: () => {
    const state = useAppStore.getState();
    return Object.values(state.apps);
  },
}));
