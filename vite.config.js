import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//import { fileURLToPath, URL } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic'
  })],
  resolve: {
    alias: {
      '@high-component': '.src/auth-pages/high-order-components',
      '@page-component': './src/auth-pages/page-components',
      '#page': './src/auth-pages/pages',
    }
  },
})
