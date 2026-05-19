import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useDesktopStore } from "./desktopStore";

export const useTrashStore = create(
  persist(
    (set, get) => ({
      deleted: [],
      deleteItem: (item) =>
        set((state) => ({
          deleted: [{ ...item, deletedAt: Date.now() }, ...state.deleted],
        })),

      // Restore an item by id. Restores original to desktop icons at saved coordinates.
      restoreItem: (id) =>
        set((state) => {
          const found = state.deleted.find((d) => d.id === id);
          if (!found) return state;

          // Add back to desktop store if not present
          const desktop = useDesktopStore.getState();
          const exists = desktop.icons.some((i) => i.id === found.id);
          if (!exists) {
            // sanitize position within current viewport bounds
            const x = Math.max(
              20,
              Math.min(found.original?.x ?? 60, window.innerWidth - 100),
            );
            const y = Math.max(
              48,
              Math.min(found.original?.y ?? 80, window.innerHeight - 140),
            );
            useDesktopStore.setState((s) => ({
              icons: [...s.icons, { ...(found.original || {}), x, y }],
            }));
          }

          return { deleted: state.deleted.filter((d) => d.id !== id) };
        }),

      emptyTrash: () => set({ deleted: [] }),
    }),
    {
      name: "arhanos-trash-store",
    },
  ),
);

export default useTrashStore;
