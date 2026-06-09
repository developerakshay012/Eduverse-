import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      usePolling: true
    }
  },
  build: {
    chunkSizeWarningLimit: 4000 // Yeh warning limit ko 4MB kar dega (jo 500kb par aa rahi thi)
  }
})