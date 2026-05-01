import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Trash2 } from 'lucide-react';

/**
 * Notification Center App
 * System notifications and recent updates
 */
const NotificationCenterApp = ({ windowId, windowData }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'achievement',
      title: '🏆 Milestone Reached!',
      description: '750 followers on YouTube',
      time: '2 hours ago',
      icon: '🎉',
    },
    {
      id: 2,
      type: 'github',
      title: '💻 GitHub Activity',
      description: '12 commits pushed today',
      time: '1 hour ago',
      icon: '📝',
    },
    {
      id: 3,
      type: 'project',
      title: '🚀 Project Published',
      description: 'AutoYT v2.0 launched',
      time: '30 mins ago',
      icon: '✨',
    },
    {
      id: 4,
      type: 'content',
      title: '📹 New Upload',
      description: 'Latest YouTube short published',
      time: '15 mins ago',
      icon: '📺',
    },
    {
      id: 5,
      type: 'streak',
      title: '🔥 Coding Streak',
      description: '47 days in a row!',
      time: '5 mins ago',
      icon: '⚡',
    },
  ]);

  const [stats, setStats] = useState({
    githubCommits: '2000+',
    YouTubeSubscribers: '762',
    ProjectsCompleted: '70+',
    CodingStreak: '100 days',
  });

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-neutral-900 to-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 p-4 bg-black/20 backdrop-blur flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Bell size={20} className="text-primary-400" />
          Notifications
        </h2>
        <motion.button
          onClick={clearAll}
          className="text-xs px-3 py-1 bg-white/5 hover:bg-white/10 rounded transition-colors text-neutral-400 hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 size={14} />
        </motion.button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-2 p-3 bg-black/30 border-b border-white/10">
        <div className="text-center">
          <div className="text-lg font-bold text-primary-400">{stats.githubCommits}</div>
          <div className="text-xs text-neutral-500">GitHub</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-accent-400">{stats.YouTubeSubscribers}</div>
          <div className="text-xs text-neutral-500">YouTube</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">{stats.ProjectsCompleted}</div>
          <div className="text-xs text-neutral-500">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-400">{stats.CodingStreak}</div>
          <div className="text-xs text-neutral-500">Streak</div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Bell size={48} className="text-neutral-600 mb-4" />
            <p className="text-neutral-500 text-sm">No notifications</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            <AnimatePresence mode="popLayout">
              {notifications.map((notification, idx) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div className="text-2xl flex-shrink-0">{notification.icon}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm">
                        {notification.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-neutral-600 mt-2">
                        {notification.time}
                      </p>
                    </div>

                    {/* Close Button */}
                    <motion.button
                      onClick={() => removeNotification(notification.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={14} className="text-red-400" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="border-t border-white/10 p-4 bg-black/20 backdrop-blur">
        <p className="text-xs text-neutral-500 text-center">
          Keep crushing it! You're on fire 🔥
        </p>
      </div>
    </div>
  );
};

export default NotificationCenterApp;
