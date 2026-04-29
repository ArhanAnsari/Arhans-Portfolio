import React from 'react';

/**
 * App Registry
 * Maps app IDs to their components with lazy loading
 */

// Lazy load app components
const AboutApp = React.lazy(() => import('./AboutApp'));
const ProjectsApp = React.lazy(() => import('./ProjectsApp'));
const SkillsApp = React.lazy(() => import('./SkillsApp'));
const TerminalApp = React.lazy(() => import('./TerminalApp'));
const ContentApp = React.lazy(() => import('./ContentApp'));
const ContactApp = React.lazy(() => import('./ContactApp'));
const ResumeApp = React.lazy(() => import('./ResumeApp'));
const AITwinApp = React.lazy(() => import('./AITwinApp'));

/**
 * App Registry
 * Central mapping of app IDs to components
 */
export const appRegistry = {
  about: {
    id: 'about',
    name: 'About',
    title: 'About Arhan',
    icon: '👨‍💻',
    component: AboutApp,
  },
  projects: {
    id: 'projects',
    name: 'Projects',
    title: 'Portfolio Projects',
    icon: '🚀',
    component: ProjectsApp,
  },
  skills: {
    id: 'skills',
    name: 'Skills',
    title: 'Technical Skills',
    icon: '⚡',
    component: SkillsApp,
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    title: 'Terminal',
    icon: '💻',
    component: TerminalApp,
  },
  content: {
    id: 'content',
    name: 'Content',
    title: 'Content & Videos',
    icon: '📹',
    component: ContentApp,
  },
  contact: {
    id: 'contact',
    name: 'Contact',
    title: 'Get in Touch',
    icon: '📬',
    component: ContactApp,
  },
  resume: {
    id: 'resume',
    name: 'Resume',
    title: 'Resume & CV',
    icon: '📄',
    component: ResumeApp,
  },
  ai: {
    id: 'ai',
    name: 'AI Twin',
    title: 'Arhan\'s AI Assistant',
    icon: '🤖',
    component: AITwinApp,
  },
};

export default appRegistry;
