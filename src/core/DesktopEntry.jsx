import React from 'react';
import { DesktopShell } from './DesktopShell';

/**
 * Desktop Entry Point
 * Wraps desktop shell with any necessary providers and initialization
 * In Phase 2, this is minimal - stores handle their own state
 * In future phases, could add: theme provider, analytics, etc
 */
export const DesktopEntry = () => {
  return <DesktopShell />;
};
