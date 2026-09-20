import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/config/cms.json'],
    },
    proxy: {
      '/api': 'http://127.0.0.1:4174',
      '/uploads': 'http://127.0.0.1:4174',
    },
  },
})
