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
            const parts = id.toString().split('node_modules/');
            if (parts[1]) {
              return parts[1].split('/')[0].toString();
            }
          }
          // Default fallback: return nothing so Rollup handles local files normally
        }
      }
    }
  }
})