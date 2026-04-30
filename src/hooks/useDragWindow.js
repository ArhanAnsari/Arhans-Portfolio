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
  const storeRef = useRef(windowStore);
  storeRef.current = windowStore;

  useEffect(() => {
    const dragHandle = dragHandleRef?.current;
    if (!dragHandle) return;

    const handleMouseDown = (e) => {
      // Only drag from titlebar
      if (e.button !== 0) return; // Left click only

      const currentWindow = storeRef.current.getWindow(windowId);
      if (!currentWindow) return;

      dragState.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        startWindowX: currentWindow.x,
        startWindowY: currentWindow.y,
      };

      // Focus window on drag
      storeRef.current.focusWindow(windowId);

      // Add drag listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!dragState.current.isDragging) return;

      const currentWindow = storeRef.current.getWindow(windowId);
      if (!currentWindow) return;

      const deltaX = e.clientX - dragState.current.startX;
      const deltaY = e.clientY - dragState.current.startY;

      const newX = dragState.current.startWindowX + deltaX;
      const newY = dragState.current.startWindowY + deltaY;

      // Constrain to viewport
      const { x, y } = constrainWindowPosition(
        newX,
        newY,
        currentWindow.width,
        currentWindow.height
      );

      storeRef.current.dragWindow(windowId, x, y);
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
  }, [windowId, dragHandleRef]);
};
