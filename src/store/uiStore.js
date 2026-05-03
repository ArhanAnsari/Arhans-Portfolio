import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set) => ({
      activeSpace: 1,
      showControlCenter: false,
      showMissionControl: false,
      displayBrightness: 0.85,
      volumeLevel: 0.72,
      wifiEnabled: true,
      bluetoothEnabled: true,
      doNotDisturb: false,
      setActiveSpace: (spaceId) => set({ activeSpace: spaceId }),
      nextSpace: () => set((state) => ({ activeSpace: state.activeSpace >= 3 ? 1 : state.activeSpace + 1 })),
      previousSpace: () => set((state) => ({ activeSpace: state.activeSpace <= 1 ? 3 : state.activeSpace - 1 })),
      toggleControlCenter: () => set((state) => ({ showControlCenter: !state.showControlCenter })),
      toggleMissionControl: () => set((state) => ({ showMissionControl: !state.showMissionControl })),
      setDisplayBrightness: (value) => set({ displayBrightness: value }),
      setVolumeLevel: (value) => set({ volumeLevel: value }),
      toggleWifi: () => set((state) => ({ wifiEnabled: !state.wifiEnabled })),
      toggleBluetooth: () => set((state) => ({ bluetoothEnabled: !state.bluetoothEnabled })),
      toggleDoNotDisturb: () => set((state) => ({ doNotDisturb: !state.doNotDisturb })),
      closeAllPanels: () => set({ showControlCenter: false, showMissionControl: false }),
    }),
    {
      name: 'arhanos-ui-store',
      partialize: (state) => ({
        activeSpace: state.activeSpace,
        displayBrightness: state.displayBrightness,
        volumeLevel: state.volumeLevel,
        wifiEnabled: state.wifiEnabled,
        bluetoothEnabled: state.bluetoothEnabled,
        doNotDisturb: state.doNotDisturb,
      }),
    }
  )
);

export default useUIStore;
