import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      
      // SOLUCIÓN PARA NETLIFY: Se agrega la configuración de Rollup.
      build: {
        rollupOptions: {
          external: ['lucide-react']
        }
      }
    })