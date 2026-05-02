import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

/**
 * Launchpad App
 * Fullscreen app grid with search
 */
const LaunchpadApp = ({ windowId, onAppSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const apps = [
    { id: 'about', name: 'About', icon: '/icons/info.svg', category: 'system' },
    { id: 'projects', name: 'Projects', icon: '/icons/work.svg', category: 'system' },
    { id: 'skills', name: 'Skills', icon: '/icons/atom.svg', category: 'system' },
    { id: 'terminal', name: 'Terminal', icon: '/images/terminal.png', category: 'system' },
    { id: 'resume', name: 'Resume', icon: '/images/pdf.png', category: 'system' },
    { id: 'content', name: 'Content', icon: '/images/notes.png', category: 'system' },
    { id: 'contact', name: 'Contact', icon: '/images/contact.png', category: 'system' },
    { id: 'ai', name: 'AI Twin', icon: '/icons/info.svg', category: 'system' },
    { id: 'finder', name: 'Finder', icon: '/images/finder.png', category: 'system' },
    { id: 'safari', name: 'Safari', icon: '/images/safari.png', category: 'system' },
    { id: 'launchpad', name: 'Launchpad', icon: '/images/pages.png', category: 'system' },
    { id: 'settings', name: 'Settings', icon: '/images/settings.png', category: 'system' },
    { id: 'notifications', name: 'Notifications', icon: '/images/notes.png', category: 'apps' },
    { id: 'codewitharhan', name: 'CodeWithArhan', icon: '/images/notes.png', category: 'apps' },
    { id: 'saas', name: 'SaaS Dashboard', icon: '/icons/work.svg', category: 'apps' },
    { id: 'devtimeline', name: 'Dev Timeline', icon: '/icons/info.svg', category: 'apps' },
    { id: 'notes', name: 'Notes', icon: '/images/notes.png', category: 'apps' },
    { id: 'photos', name: 'Photos', icon: '/images/photos.png', category: 'apps' },
    { id: 'trash', name: 'Trash', icon: '/images/trash.png', category: 'apps' },
  ];

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppClick = (appId) => {
    if (onAppSelect) {
      onAppSelect(appId);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-950 overflow-auto">
      {/* Header */}
      <motion.div
        className="sticky top-0 p-6 bg-black/40 backdrop-blur-lg border-b border-white/10 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Launchpad</h1>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-neutral-500" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500/50"
            />
          </div>
        </div>
      </motion.div>

      {/* Apps Grid */}
      <div className="p-6 max-w-6xl mx-auto">
        {filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <X size={48} className="mx-auto text-neutral-600 mb-4" />
            <p className="text-neutral-400">No apps found for "{searchQuery}"</p>
          </div>
        ) : (
          <>
            {/* System Apps */}
            {filteredApps.some((app) => app.category === 'system') && (
              <>
                <h2 className="text-xl font-semibold text-white mb-4 ml-2">
                  System Apps
                </h2>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8"
                  layout
                >
                  {filteredApps
                    .filter((app) => app.category === 'system')
                    .map((app, idx) => (
                      <LaunchpadIcon
                        key={app.id}
                        app={app}
                        index={idx}
                        onClick={() => handleAppClick(app.id)}
                      />
                    ))}
                </motion.div>
              </>
            )}

            {/* Other Apps */}
            {filteredApps.some((app) => app.category !== 'system') && (
              <>
                <h2 className="text-xl font-semibold text-white mb-4 ml-2">
                  Applications
                </h2>
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                  layout
                >
                  {filteredApps
                    .filter((app) => app.category !== 'system')
                    .map((app, idx) => (
                      <LaunchpadIcon
                        key={app.id}
                        app={app}
                        index={idx}
                        onClick={() => handleAppClick(app.id)}
                      />
                    ))}
                </motion.div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const LaunchpadIcon = ({ app, index, onClick }) => {
  const [imageError, setImageError] = useState(false);

  // Logic to detect if the icon is an image path
  const isImagePath =
    typeof app.icon === 'string' &&
    (app.icon.startsWith('/') || app.icon.includes('.')) &&
    !imageError;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.03, type: 'spring', damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-3 p-4 group"
    >
      {/* Icon Container */}
      <motion.div
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex items-center justify-center text-4xl group-hover:border-primary-500/50 transition-all shadow-lg overflow-hidden"
        whileHover={{
          boxShadow: '0 0 20px rgba(139, 220, 255, 0.3)',
        }}
      >
        {isImagePath ? (
          <img 
            src={app.icon} 
            alt={app.name} 
            className="w-10 h-10 object-contain" 
            onError={() => setImageError(true)}
          />
        ) : (
          app.icon
        )}
      </motion.div>

      {/* App Name */}
      <div className="text-center">
        <p className="text-xs text-neutral-300 line-clamp-2 max-w-16">
          {app.name}
        </p>
      </div>
    </motion.button>
  );
};

export default LaunchpadApp;
