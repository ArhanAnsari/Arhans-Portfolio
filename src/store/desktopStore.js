import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_DESKTOP_ICONS = [
  { id: 'resume', name: 'Resume.pdf', appId: 'resume', type: 'file', icon: '/images/pdf.png', x: 40, y: 72 },
  { id: 'projects', name: 'Projects', appId: 'projects', type: 'folder', icon: '/icons/work.svg', x: 40, y: 168 },
  { id: 'github', name: 'GitHub', url: 'https://github.com/ArhanAnsari', type: 'link', icon: '/icons/github.svg', x: 40, y: 264 },
  { id: 'youtube', name: 'YouTube', url: 'https://youtube.com/@codewitharhanofficial', type: 'link', icon: '/icons/twitter.svg', x: 40, y: 360 },
  { id: 'contact', name: 'Contact', appId: 'contact', type: 'app', icon: '/images/contact.png', x: 40, y: 456 },
  { id: 'ai', name: 'AI Twin', appId: 'ai', type: 'app', icon: '/icons/info.svg', x: 160, y: 72 },
  { id: 'saas', name: 'SaaS Dashboard', appId: 'saas', type: 'app', icon: '/icons/work.svg', x: 160, y: 168 },
  { id: 'devtimeline', name: 'Dev Timeline', appId: 'devtimeline', type: 'app', icon: '/icons/info.svg', x: 160, y: 264 },
  { id: 'trash', name: 'Trash', appId: 'trash', type: 'system', icon: '/images/trash.png', x: 20, y: 640 },
];

export const useDesktopStore = create(
  persist(
    (set, get) => ({
      icons: DEFAULT_DESKTOP_ICONS,
      selectedIconIds: [],
      contextMenu: { visible: false, x: 0, y: 0 },

      selectIcon: (iconId, additive = false) => {
        set((state) => ({
          selectedIconIds: additive
            ? Array.from(new Set([...state.selectedIconIds, iconId]))
            : [iconId],
        }));
      },

      selectIconsByRect: (rect) => {
        const { icons } = get();
        const selected = icons
          .filter((icon) => {
            const iconRect = { x: icon.x, y: icon.y, width: 84, height: 92 };
            return !(
              rect.x + rect.width < iconRect.x ||
              iconRect.x + iconRect.width < rect.x ||
              rect.y + rect.height < iconRect.y ||
              iconRect.y + iconRect.height < rect.y
            );
          })
          .map((icon) => icon.id);

        set({ selectedIconIds: selected });
      },

      clearSelection: () => set({ selectedIconIds: [] }),

      moveIcon: (iconId, x, y) =>
        set((state) => ({
          icons: state.icons.map((icon) =>
            icon.id === iconId
              ? {
                  ...icon,
                  x: Math.max(20, Math.min(x, window.innerWidth - 100)),
                  y: Math.max(48, Math.min(y, window.innerHeight - 140)),
                }
              : icon
          ),
        })),

      resetIconPositions: () => set({ icons: DEFAULT_DESKTOP_ICONS }),

      deleteIcon: (iconId) => set((state) => ({ icons: state.icons.filter((i) => i.id !== iconId) })),

      showContextMenu: (x, y) => set({ contextMenu: { visible: true, x, y } }),
      hideContextMenu: () => set({ contextMenu: { visible: false, x: 0, y: 0 } }),
    }),
    {
      name: 'arhanos-desktop-store',
      partialize: (state) => ({ icons: state.icons }),
    }
  )
);

export default useDesktopStore;
