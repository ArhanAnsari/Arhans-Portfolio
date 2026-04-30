import React from 'react';

/**
 * App Registry
 * Maps app IDs to their components with lazy loading
 */

// Lazy load existing app components
const AboutApp = React.lazy(() => import('./AboutApp'));
const ProjectsApp = React.lazy(() => import('./ProjectsApp_Enhanced'));
const SkillsApp = React.lazy(() => import('./SkillsApp'));
const TerminalApp = React.lazy(() => import('./TerminalApp'));
const ContentApp = React.lazy(() => import('./ContentApp'));
const ContactApp = React.lazy(() => import('./ContactApp'));
const ResumeApp = React.lazy(() => import('./ResumeApp'));
const AITwinApp = React.lazy(() => import('./AITwinApp_Enhanced'));

// Lazy load Phase 3 apps
const FinderApp = React.lazy(() => import('./FinderApp'));
const SafariApp = React.lazy(() => import('./SafariApp'));
const LaunchpadApp = React.lazy(() => import('./LaunchpadApp'));
const NotificationCenterApp = React.lazy(() => import('./NotificationCenterApp'));
const CodeWithArhanStudio = React.lazy(() => import('./CodeWithArhanStudio'));
const SaaSDashboard = React.lazy(() => import('./SaaSDashboard'));
const DevTimeline = React.lazy(() => import('./DevTimeline'));

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
    icon: '/images/terminal.png',
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
  // Phase 3 Apps
  finder: {
    id: 'finder',
    name: 'Finder',
    title: 'Finder',
    icon: '/images/finder.png',
    component: FinderApp,
  },
  safari: {
    id: 'safari',
    name: 'Safari',
    title: 'Safari Browser',
    icon: '/images/safari.png',
    component: SafariApp,
  },
  launchpad: {
    id: 'launchpad',
    name: 'Launchpad',
    title: 'Launchpad',
    icon: '🎯',
    component: LaunchpadApp,
  },
  notifications: {
    id: 'notifications',
    name: 'Notifications',
    title: 'Notification Center',
    icon: '🔔',
    component: NotificationCenterApp,
  },
  codewitharhan: {
    id: 'codewitharhan',
    name: 'CodeWithArhan',
    title: 'CodeWithArhan Studio',
    icon: '📺',
    component: CodeWithArhanStudio,
  },
  saas: {
    id: 'saas',
    name: 'SaaS Dashboard',
    title: 'SaaS Dashboard',
    icon: '📊',
    component: SaaSDashboard,
  },
  devtimeline: {
    id: 'devtimeline',
    name: 'Dev Timeline',
    title: 'Development Journey',
    icon: '📅',
    component: DevTimeline,
  },
};

export default appRegistry;
