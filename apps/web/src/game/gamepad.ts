import type { Point } from './systems/navigation';
import { usePreferences } from './preferences';

export const gamepadMovement: Point = { x: 0, y: 0 };
// Mantido para compatibilidade com abas em recarregamento automático do Vite.
export const gamepadStatus = { connected: false, cursorEnabled: false };

export function connectedGamepad(): Gamepad | undefined {
  if (!usePreferences.getState().gamepadEnabled) return undefined;
  try {
    return Array.from(navigator.getGamepads?.() ?? []).find(pad => pad?.connected && pad.mapping === 'standard')
      ?? Array.from(navigator.getGamepads?.() ?? []).find(pad => pad?.connected)
      ?? undefined;
  } catch { return undefined; }
}

export function movementFromGamepad(pad: Gamepad): Point {
  const axis = (value: number) => Math.abs(value) < .2 ? 0 : value;
  const x = Number(pad.buttons[15]?.pressed) - Number(pad.buttons[14]?.pressed);
  const y = Number(pad.buttons[13]?.pressed) - Number(pad.buttons[12]?.pressed);
  return { x: x || axis(pad.axes[0] ?? 0), y: y || axis(pad.axes[1] ?? 0) };
}
