import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTrashStore = create(
  persist(
    (set, get) => ({
      deleted: [],
      deleteItem: (item) =>
        set((state) => ({ deleted: [{ ...item, deletedAt: Date.now() }, ...state.deleted] })),
      restoreItem: (id) =>
        set((state) => ({ deleted: state.deleted.filter((d) => d.id !== id) })),
      emptyTrash: () => set({ deleted: [] }),
    }),
    {
      name: 'arhanos-trash-store',
    }
  )
);

export default useTrashStore;
