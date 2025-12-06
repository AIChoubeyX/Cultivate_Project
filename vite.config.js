import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // prevents vite from pre-optimizing lucide-react
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
