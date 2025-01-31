import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.jsonserve.com', // Target API server
        changeOrigin: true,
        secure: false, // Set to true if the API uses HTTPS
        rewrite: (path) => path.replace(/^\/api/, '') // Removes '/api' prefix
      }
    }
  },
})