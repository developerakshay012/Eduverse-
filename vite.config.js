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
    chunkSizeWarningLimit: 1600, // Chunk size ki warning limit ko badhane ke liye
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Ye line saari badi external libraries (react-icons, redux etc.) ko alag-alag chhote chunks me tod degi
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})