import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, ChevronLeft, ChevronRight } from 'lucide-react';
import { useWindowStore } from '../../store/windowStore';
import { useUIStore } from '../../store/uiStore';

const MissionControl = ({ isOpen, onClose }) => {
  const { windows, focusWindow } = useWindowStore();
  const { activeSpace, setActiveSpace, nextSpace, previousSpace } = useUIStore();

  const grouped = [1, 2, 3].map((spaceId) => ({
    spaceId,
    windows: windows.filter((window) => (window.spaceId || 1) === spaceId),
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-[8400] bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div className="fixed inset-0 z-[8401] flex items-start justify-center p-6 pt-16" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.01 }} transition={{ duration: 0.22 }}>
            <div className="w-[min(96vw,1200px)] rounded-[32px] border border-white/10 bg-neutral-950/90 p-5 shadow-2xl backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-white">
                    <Monitor size={18} className="text-cyan-300" />
                    Mission Control
                  </div>
                  <div className="text-xs text-neutral-500">Desktop overview and spaces</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={previousSpace} className="rounded-full border border-white/10 bg-white/5 p-2 text-neutral-300 hover:bg-white/10"><ChevronLeft size={14} /></button>
                  <button onClick={nextSpace} className="rounded-full border border-white/10 bg-white/5 p-2 text-neutral-300 hover:bg-white/10"><ChevronRight size={14} /></button>
                  <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-neutral-200 hover:bg-white/10">Close</button>
                </div>
              </div>

              <div className="mb-4 flex gap-2 overflow-x-auto">
                {[1, 2, 3].map((spaceId) => (
                  <button
                    key={spaceId}
                    onClick={() => setActiveSpace(spaceId)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${activeSpace === spaceId ? 'border-cyan-300/60 bg-cyan-400/15 text-cyan-100' : 'border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10'}`}
                  >
                    Desktop {spaceId}
                  </button>
                ))}
              </div>

              <div className="grid max-h-[70vh] gap-4 overflow-auto md:grid-cols-3">
                {grouped.map((space) => (
                  <div key={space.spaceId} className={`rounded-3xl border p-3 ${activeSpace === space.spaceId ? 'border-cyan-300/40 bg-cyan-400/10' : 'border-white/10 bg-white/[0.03]'}`}>
                    <div className="mb-3 flex items-center justify-between text-sm text-white">
                      <span>Desktop {space.spaceId}</span>
                      <span className="text-xs text-neutral-500">{space.windows.length} windows</span>
                    </div>
                    <div className="space-y-2">
                      {space.windows.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-neutral-500">No windows open</div>
                      ) : (
                        space.windows.map((window) => (
                          <button
                            key={window.id}
                            onClick={() => {
                              setActiveSpace(space.spaceId);
                              focusWindow(window.id);
                              onClose?.();
                            }}
                            className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 text-left hover:bg-white/10"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">{window.icon || '◻︎'}</div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium text-white">{window.title}</div>
                              <div className="text-xs text-neutral-500">{window.app}</div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MissionControl;
