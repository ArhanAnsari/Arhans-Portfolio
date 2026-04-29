import { useCallback } from 'react';
import { useWindowStore } from '../store/windowStore';
import { useAppStore } from '../store/appStore';

/**
 * Hook to interact with window manager
 * Provides common window operations
 */
export const useWindowManager = () => {
  const windowStore = useWindowStore();
  const appStore = useAppStore();

  const openWindow = useCallback(
    (appId) => {
      const app = appStore.getApp(appId);
      if (!app) {
        console.warn(`App not found: ${appId}`);
        return;
      }

      windowStore.openWindow({
        id: `${appId}-main`,
        app: appId,
        title: app.title,
        icon: app.icon,
      });
    },
    [windowStore, appStore]
  );

  const closeWindow = useCallback(
    (windowId) => {
      windowStore.closeWindow(windowId);
    },
    [windowStore]
  );

  const focusWindow = useCallback(
    (windowId) => {
      windowStore.focusWindow(windowId);
    },
    [windowStore]
  );

  const minimizeWindow = useCallback(
    (windowId) => {
      windowStore.minimizeWindow(windowId);
    },
    [windowStore]
  );

  const maximizeWindow = useCallback(
    (windowId) => {
      windowStore.maximizeWindow(windowId);
    },
    [windowStore]
  );

  const restoreWindow = useCallback(
    (windowId) => {
      windowStore.restoreWindow(windowId);
    },
    [windowStore]
  );

  return {
    // State
    windows: windowStore.windows,
    focusStack: windowStore.focusStack,
    focusedWindowId: windowStore.getFocusedWindowId(),

    // Actions
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,

    // Selectors
    getWindow: windowStore.getWindow,
    getWindowZIndex: windowStore.getWindowZIndex,
    isWindowFocused: windowStore.isWindowFocused,
    getVisibleWindows: windowStore.getVisibleWindows,
  };
};
