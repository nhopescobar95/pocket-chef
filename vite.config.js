import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // FIX CRÍTICO PARA NETLIFY: Asegura que la ruta base sea la raíz (/)
  // Esto soluciona el problema de la pantalla en blanco donde no encuentra los assets.
  base: '/', 
  
  plugins: [react()],
  
  // SOLUCIÓN PARA NETLIFY: Se agrega la configuración de Rollup.
  build: {
    rollupOptions: {
      external: ['lucide-react']
    }
  }
})