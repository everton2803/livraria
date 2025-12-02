// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Executar Vite na porta 3000 conforme solicitado
    port: 3000,
    // Proxy para backend em 3333 para evitar conflito de portas
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false
      }
    }
  }
})