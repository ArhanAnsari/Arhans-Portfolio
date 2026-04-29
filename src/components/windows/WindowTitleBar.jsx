import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

/**
 * Window Title Bar Component
 * Draggable title bar with control buttons
 */
export const WindowTitleBar = React.forwardRef(
  (
    {
      title,
      icon,
      onClose,
      onMinimize,
      onMaximize,
      isMaximized = false,
      className = '',
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`
          flex items-center justify-between
          h-8 px-4 bg-gradient-to-r from-neutral-800 to-neutral-900
          border-b border-neutral-700/50
          select-none cursor-move
          ${className}
        `}
      >
        {/* Title */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {icon && <span className="text-sm">{icon}</span>}
          <span className="text-sm font-medium text-neutral-200 truncate">
            {title}
          </span>
        </div>

        {/* Control buttons */}
        <div className="flex items-center gap-1">
          {onMinimize && (
            <motion.button
              className="flex items-center justify-center w-6 h-6 hover:bg-neutral-700/50 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              title="Minimize"
            >
              <Minus size={14} className="text-neutral-400" />
            </motion.button>
          )}

          {onMaximize && (
            <motion.button
              className="flex items-center justify-center w-6 h-6 hover:bg-neutral-700/50 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onMaximize();
              }}
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              <Square size={14} className="text-neutral-400" />
            </motion.button>
          )}

          {onClose && (
            <motion.button
              className="flex items-center justify-center w-6 h-6 hover:bg-red-500/20 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              title="Close"
            >
              <X size={14} className="text-red-400" />
            </motion.button>
          )}
        </div>
      </div>
    );
  }
);

WindowTitleBar.displayName = 'WindowTitleBar';
