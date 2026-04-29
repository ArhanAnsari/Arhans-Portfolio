import { useEffect, useRef } from 'react';
import { useWindowStore } from '../store/windowStore';
import { constrainWindowPosition } from '../utils/windowUtils';

/**
 * Hook to handle window dragging
 * @param {string} windowId - Window ID to drag
 * @param {React.RefObject} dragHandleRef - Ref to the drag handle element (usually titlebar)
 */
export const useDragWindow = (windowId, dragHandleRef) => {
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startWindowX: 0,
    startWindowY: 0,
  });

  const windowStore = useWindowStore();
  const window = windowStore.getWindow(windowId);

  useEffect(() => {
    const dragHandle = dragHandleRef?.current;
    if (!dragHandle || !window) return;

    const handleMouseDown = (e) => {
      // Only drag from titlebar
      if (e.button !== 0) return; // Left click only

      dragState.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        startWindowX: window.x,
        startWindowY: window.y,
      };

      // Focus window on drag
      windowStore.focusWindow(windowId);

      // Add drag listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!dragState.current.isDragging) return;

      const deltaX = e.clientX - dragState.current.startX;
      const deltaY = e.clientY - dragState.current.startY;

      const newX = dragState.current.startWindowX + deltaX;
      const newY = dragState.current.startWindowY + deltaY;

      // Constrain to viewport
      const { x, y } = constrainWindowPosition(
        newX,
        newY,
        window.width,
        window.height
      );

      windowStore.dragWindow(windowId, x, y);
    };

    const handleMouseUp = () => {
      dragState.current.isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    dragHandle.addEventListener('mousedown', handleMouseDown);

    return () => {
      dragHandle.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [windowId, window, windowStore, dragHandleRef]);
};
