import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Folder, FileText, Link2, Trophy, Music } from 'lucide-react';

/**
 * Finder App
 * Portfolio file system explorer
 */
const FinderApp = ({ windowId, windowData }) => {
  const [currentPath, setCurrentPath] = useState('Desktop');
  const [selectedItem, setSelectedItem] = useState(null);

  const fileSystem = {
    Desktop: {
      items: [
        { id: 1, name: 'Projects', type: 'folder', icon: '📁' },
        { id: 2, name: 'Resume.pdf', type: 'file', icon: '📄' },
        { id: 3, name: 'GitHub', type: 'link', icon: '🔗', url: 'https://github.com' },
        { id: 4, name: 'YouTube', type: 'link', icon: '📺', url: 'https://youtube.com' },
      ],
    },
    Projects: {
      items: [
        { id: 1, name: 'AI Products', type: 'folder', icon: '🤖' },
        { id: 2, name: 'Full Stack Apps', type: 'folder', icon: '💻' },
        { id: 3, name: 'Game Development', type: 'folder', icon: '🎮' },
        { id: 4, name: '3D Experiences', type: 'folder', icon: '🌐' },
      ],
    },
    Skills: {
      items: [
        { id: 1, name: 'Frontend', type: 'folder', icon: '⚛️' },
        { id: 2, name: 'Backend', type: 'folder', icon: '🔧' },
        { id: 3, name: '3D & Graphics', type: 'folder', icon: '🎨' },
        { id: 4, name: 'AI & ML', type: 'folder', icon: '🧠' },
      ],
    },
    Achievements: {
      items: [
        { id: 1, name: 'Awards', type: 'folder', icon: '🏆' },
        { id: 2, name: 'Certifications', type: 'file', icon: '🎖️' },
        { id: 3, name: 'Publications', type: 'folder', icon: '📰' },
      ],
    },
  };

  const currentItems = fileSystem[currentPath] || fileSystem.Desktop;
  const breadcrumbs = currentPath.split('/').filter(Boolean);

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setCurrentPath(item.name);
      setSelectedItem(null);
    } else if (item.type === 'link') {
      window.open(item.url, '_blank');
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      {/* Toolbar */}
      <div className="border-b border-white/10 p-4 bg-black/20 backdrop-blur">
        <div className="flex items-center gap-2 mb-3">
          {/* Breadcrumb Navigation */}
          <motion.button
            onClick={() => setCurrentPath('Desktop')}
            className="text-sm text-primary-400 hover:text-primary-300"
            whileHover={{ scale: 1.05 }}
          >
            Finder
          </motion.button>
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-neutral-500" />
              <motion.button
                onClick={() => setCurrentPath(crumb)}
                className="text-sm text-neutral-400 hover:text-neutral-300"
                whileHover={{ scale: 1.05 }}
              >
                {crumb}
              </motion.button>
            </div>
          ))}
        </div>

        {/* Quick Access Buttons */}
        <div className="flex gap-2">
          {['Desktop', 'Projects', 'Skills', 'Achievements'].map((location) => (
            <motion.button
              key={location}
              onClick={() => setCurrentPath(location)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                currentPath === location
                  ? 'bg-primary-500/30 text-primary-300 border border-primary-500/50'
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {location}
            </motion.button>
          ))}
        </div>
      </div>

      {/* File Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-4 gap-4">
          {currentItems.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleItemClick(item)}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer transition-all ${
                selectedItem?.id === item.id
                  ? 'bg-primary-500/20 border border-primary-500/50'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl">{item.icon}</div>
              <div className="text-xs text-center text-neutral-300 line-clamp-2">
                {item.name}
              </div>
              {item.type === 'link' && (
                <div className="text-xs text-primary-400">Link</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      {selectedItem && (
        <div className="border-t border-white/10 p-4 bg-black/20 backdrop-blur">
          <div className="text-xs text-neutral-400">
            <p className="font-semibold text-neutral-200 mb-2">{selectedItem.name}</p>
            <p>Type: {selectedItem.type}</p>
            <p>Size: --</p>
            <p>Modified: --</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinderApp;
