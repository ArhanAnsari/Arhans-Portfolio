import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/ai-twin': {
        target: 'http://localhost:3001', // Change to your backend server if using one
        changeOrigin: true,
      }
    }
  }
})
