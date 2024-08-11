import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { 
        transformAssetUrls,
        // custom elements start with uppercase letter
        compilerOptions: { isCustomElement: tag => tag[0] === tag[0].toUpperCase() }
      }
    }),
    vuetify({ autoImport: true })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  },
  esbuild: {
    target: 'esnext',
    platform: 'linux'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
