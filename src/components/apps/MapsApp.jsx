import React, { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

/**
 * Maps App - System Maps Application
 */
const MapsApp = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 p-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={20} className="text-red-500" />
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">Maps</h1>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-3 text-neutral-500" />
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
          <div className="text-center">
            <Navigation size={48} className="mx-auto text-white mb-4" />
            <p className="text-white font-semibold">Your Location</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsApp;
