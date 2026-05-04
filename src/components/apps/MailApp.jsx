import React, { useState } from 'react';
import { Mail, Inbox, Send, Archive } from 'lucide-react';

/**
 * Mail App - System Mail Application
 */
const MailApp = () => {
  const [selectedTab, setSelectedTab] = useState('inbox');

  return (
    <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 p-4">
        <div className="flex items-center gap-2">
          <Mail size={20} className="text-red-500" />
          <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">Mail</h1>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 p-4 overflow-y-auto">
          <div className="space-y-2">
            {[
              { id: 'inbox', label: 'Inbox', icon: Inbox },
              { id: 'sent', label: 'Sent', icon: Send },
              { id: 'archive', label: 'Archive', icon: Archive },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  selectedTab === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <item.icon size={16} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center">
            <Mail size={48} className="mx-auto text-neutral-400 mb-4" />
            <p className="text-neutral-600 dark:text-neutral-400 mb-2">No emails to display</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500">
              This is a preview of the Mail application
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailApp;
