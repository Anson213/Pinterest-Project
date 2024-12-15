import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic'
  })],
  resolve: {
    alias: {
      '@high-component': fileURLToPath(new URL('./src/auth-pages/high-order-components', import.meta.url)),
      '@page-component': fileURLToPath(new URL('./src/auth-pages/page-components', import.meta.url)),
      '#page': fileURLToPath(new URL('./src/auth-pages/pages', import.meta.url))
    }
  },
})
