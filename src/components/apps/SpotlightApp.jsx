import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

/**
 * Spotlight App
 * Keyboard-accessible search and quick access overlay
 */
const SpotlightApp = ({ isOpen, onClose, onAppSelect }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const searchItems = [
    // Apps - Phase 2
    { type: 'app', name: 'About', emoji: '👨‍💻', action: 'about' },
    { type: 'app', name: 'Projects', emoji: '🚀', action: 'projects' },
    { type: 'app', name: 'Skills', emoji: '⚡', action: 'skills' },
    { type: 'app', name: 'Terminal', emoji: '💻', action: 'terminal' },
    { type: 'app', name: 'Resume', emoji: '📄', action: 'resume' },
    { type: 'app', name: 'AI Twin', emoji: '🤖', action: 'ai' },
    
    // Apps - Phase 3
    { type: 'app', name: 'Finder', emoji: '📁', action: 'finder' },
    { type: 'app', name: 'Safari', emoji: '🧭', action: 'safari' },
    { type: 'app', name: 'Launchpad', emoji: '🎯', action: 'launchpad' },
    { type: 'app', name: 'Notifications', emoji: '🔔', action: 'notifications' },
    { type: 'app', name: 'CodeWithArhan Studio', emoji: '📺', action: 'codewitharhan' },
    { type: 'app', name: 'SaaS Dashboard', emoji: '📊', action: 'saas' },
    { type: 'app', name: 'Dev Timeline', emoji: '📅', action: 'devtimeline' },
    
    // Quick Actions
    { type: 'action', name: 'Dark Mode', emoji: '🌙', action: 'toggle-theme' },
    { type: 'action', name: 'System Preferences', emoji: '⚙️', action: 'settings' },
    { type: 'action', name: 'Lock Screen', emoji: '🔒', action: 'lock' },
    { type: 'action', name: 'Restart', emoji: '🔄', action: 'restart' },
    
    // Projects Quick Search
    { type: 'project', name: 'AI Products', emoji: '🤖', action: 'projects' },
    { type: 'project', name: 'Full Stack Apps', emoji: '💻', action: 'projects' },
    { type: 'project', name: 'Game Development', emoji: '🎮', action: 'projects' },
    { type: 'project', name: '3D Experiences', emoji: '🌐', action: 'projects' },
    
    // External Links
    { type: 'link', name: 'GitHub', emoji: '🐙', action: 'https://github.com' },
    { type: 'link', name: 'YouTube', emoji: '📺', action: 'https://youtube.com' },
    { type: 'link', name: 'LinkedIn', emoji: '💼', action: 'https://linkedin.com' },
  ];

  const filteredItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredItems.length - 1 : prev - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      default:
        break;
    }
  };

  const handleSelect = (item) => {
    if (item.type === 'app') {
      onAppSelect(item.action);
    } else if (item.type === 'link') {
      window.open(item.action, '_blank');
    } else if (item.type === 'action') {
      console.log('Action:', item.action);
    } else if (item.type === 'project') {
      onAppSelect('projects');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[8000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Spotlight Panel */}
          <motion.div
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 z-[8001]"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Search Input */}
            <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <Search size={20} className="text-neutral-500" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search apps, actions, and more..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm"
                />
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {filteredItems.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 text-sm">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="py-2">
                    {/* Apps Section */}
                    {filteredItems.some((item) => item.type === 'app') && (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase">
                          Apps
                        </div>
                        {filteredItems
                          .filter((item) => item.type === 'app')
                          .map((item, idx) => (
                            <SpotlightResult
                              key={item.name}
                              item={item}
                              isSelected={
                                selectedIndex === filteredItems.indexOf(item)
                              }
                              onClick={() => handleSelect(item)}
                            />
                          ))}
                      </>
                    )}

                    {/* Actions Section */}
                    {filteredItems.some((item) => item.type === 'action') && (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase mt-2">
                          Actions
                        </div>
                        {filteredItems
                          .filter((item) => item.type === 'action')
                          .map((item, idx) => (
                            <SpotlightResult
                              key={item.name}
                              item={item}
                              isSelected={
                                selectedIndex === filteredItems.indexOf(item)
                              }
                              onClick={() => handleSelect(item)}
                            />
                          ))}
                      </>
                    )}

                    {/* Projects Section */}
                    {filteredItems.some((item) => item.type === 'project') && (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase mt-2">
                          Projects
                        </div>
                        {filteredItems
                          .filter((item) => item.type === 'project')
                          .map((item, idx) => (
                            <SpotlightResult
                              key={item.name}
                              item={item}
                              isSelected={
                                selectedIndex === filteredItems.indexOf(item)
                              }
                              onClick={() => handleSelect(item)}
                            />
                          ))}
                      </>
                    )}

                    {/* Links Section */}
                    {filteredItems.some((item) => item.type === 'link') && (
                      <>
                        <div className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase mt-2">
                          External Links
                        </div>
                        {filteredItems
                          .filter((item) => item.type === 'link')
                          .map((item, idx) => (
                            <SpotlightResult
                              key={item.name}
                              item={item}
                              isSelected={
                                selectedIndex === filteredItems.indexOf(item)
                              }
                              onClick={() => handleSelect(item)}
                            />
                          ))}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-3 text-xs text-neutral-500 flex justify-between">
                <div className="flex gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded">↑↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded">Enter</kbd>
                  <span>Select</span>
                </div>
                <div className="flex gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SpotlightResult = ({ item, isSelected, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 transition-colors ${
        isSelected
          ? 'bg-primary-500/20 border-l-2 border-primary-500'
          : 'hover:bg-white/5'
      }`}
      whileHover={{ paddingLeft: '1.25rem' }}
    >
      <span className="text-lg">{item.emoji}</span>
      <div className="text-left flex-1">
        <div className="text-sm text-white font-medium">{item.name}</div>
      </div>
      <div className="text-xs text-neutral-500 uppercase">{item.type}</div>
    </motion.button>
  );
};

export default SpotlightApp;
