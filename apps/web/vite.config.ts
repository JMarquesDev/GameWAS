import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react(), {
  name: 'reload-stateful-game',
  handleHotUpdate({ server }) {
    // Phaser scenes and Zustand must share one module graph after edits.
    server.ws.send({ type: 'full-reload' });
    return [];
  },
}] });
