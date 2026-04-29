import { useEffect } from 'react';
import { useWindowStore } from '../store/windowStore';

/**
 * Hook to manage window focus on mouse events
 */
export const useFocusManager = (windowId, ref) => {
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const isFocused = useWindowStore((state) => state.isWindowFocused(windowId));

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const handleMouseDown = () => {
      focusWindow(windowId);
    };

    element.addEventListener('mousedown', handleMouseDown);
    return () => element.removeEventListener('mousedown', handleMouseDown);
  }, [windowId, focusWindow, ref]);

  return { isFocused };
};
