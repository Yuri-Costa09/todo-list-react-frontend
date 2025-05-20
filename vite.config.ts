import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    // Disable generating source maps which can cause issues in some environments
    sourcemap: false,
    rollupOptions: {
      // Explicitly configure Rollup in a way that avoids optional dependencies
      external: [],
      output: {
        manualChunks: undefined
      }
    }
  }
})
