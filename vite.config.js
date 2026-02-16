import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'd3': ['d3'],
          'vendor': ['react', 'react-dom'],
          'pdf': ['jspdf']
        }
      }
    }
  }
})
