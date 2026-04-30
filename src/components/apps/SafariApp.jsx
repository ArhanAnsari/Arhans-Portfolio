import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Plus, X } from 'lucide-react';

/**
 * Safari App
 * Internal browser for portfolio links and external sites
 */
const SafariApp = ({ windowId, windowData }) => {
  const [currentUrl, setCurrentUrl] = useState('about:home');
  const [urlInput, setUrlInput] = useState('');
  const [tabs, setTabs] = useState([{ id: 1, url: 'about:home', active: true }]);
  const [history, setHistory] = useState(['about:home']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const bookmarks = [
    { name: 'Portfolio', url: 'about:portfolio', icon: '🌐' },
    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
    { name: 'YouTube', url: 'https://youtube.com/@codewitharhanofficial', icon: '📺' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { name: 'Email', url: 'mailto:arhanansari2009@gmail.com', icon: '✉️' },
    { name: 'Resume', url: '/resume.pdf', icon: '📄' },
  ];

  const pages = {
    'about:home': {
      title: 'Safari Start',
      content: (
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <h1 className="text-4xl font-bold text-white">Safari</h1>
          <p className="text-neutral-400">ArhanOS Portfolio Browser</p>
          <div className="grid grid-cols-3 gap-4">
            {bookmarks.map((bookmark) => (
              <motion.button
                key={bookmark.url}
                onClick={() => navigate(bookmark.url)}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl">{bookmark.icon}</div>
                <div className="text-xs text-neutral-300 text-center">{bookmark.name}</div>
              </motion.button>
            ))}
          </div>
        </div>
      ),
    },
    'about:portfolio': {
      title: 'Arhan Ansari - Portfolio',
      content: (
        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-white">Welcome to ArhanOS</h1>
          <p className="text-neutral-300">Full Stack Developer & 3D Artist</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-500/10 border border-primary-500/30 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Specializations</h3>
              <ul className="text-sm text-neutral-300 space-y-1">
                <li>• React & Next.js</li>
                <li>• Three.js & 3D</li>
                <li>• AI/ML Integration</li>
                <li>• Full Stack MERN</li>
              </ul>
            </div>
            <div className="bg-accent-500/10 border border-accent-500/30 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">Experience</h3>
              <ul className="text-sm text-neutral-300 space-y-1">
                <li>• 4+ Years Development</li>
                <li>• 50+ Projects Completed</li>
                <li>• AI Products Built</li>
                <li>• 100K+ Followers</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  };

  const navigate = (url) => {
    setCurrentUrl(url);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(url);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setUrlInput(url);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentUrl(history[historyIndex + 1]);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim()) {
      navigate(urlInput);
    }
  };

  const currentPage = pages[currentUrl] || { title: currentUrl, content: <div /> };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-neutral-900 to-neutral-800">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 pt-2 bg-black/30 border-b border-white/10">
        <div className="flex gap-1 flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-lg text-xs font-medium transition-colors ${
                tab.active
                  ? 'bg-neutral-700 border-t border-white/20 text-white'
                  : 'bg-neutral-800 border-t border-transparent text-neutral-400 hover:bg-neutral-750'
              }`}
            >
              <span className="line-clamp-1">{tab.url}</span>
              <motion.button
                onClick={() => setTabs(tabs.filter((t) => t.id !== tab.id))}
                whileHover={{ scale: 1.1 }}
                className="p-0.5 hover:bg-white/10 rounded"
              >
                <X size={12} />
              </motion.button>
            </motion.div>
          ))}
        </div>
        <motion.button
          onClick={() =>
            setTabs([...tabs, { id: Date.now(), url: 'about:home', active: true }])
          }
          className="p-1 hover:bg-white/10 rounded text-neutral-400"
          whileHover={{ scale: 1.1 }}
        >
          <Plus size={16} />
        </motion.button>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 p-3 bg-black/30 border-b border-white/10">
        <motion.button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
        >
          <ChevronLeft size={16} />
        </motion.button>
        <motion.button
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          className="p-1 hover:bg-white/10 rounded disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
        >
          <ChevronRight size={16} />
        </motion.button>
        <motion.button
          onClick={() => setCurrentUrl(currentUrl)}
          className="p-1 hover:bg-white/10 rounded"
          whileHover={{ scale: 1.05 }}
        >
          <RotateCcw size={16} />
        </motion.button>

        {/* URL Input */}
        <form onSubmit={handleUrlSubmit} className="flex-1">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onFocus={() => setUrlInput(currentUrl)}
            className="w-full px-3 py-1 bg-neutral-700/50 border border-white/20 rounded text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-primary-500/50"
            placeholder="Enter URL..."
          />
        </form>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {currentPage.content}
      </div>
    </div>
  );
};

export default SafariApp;
