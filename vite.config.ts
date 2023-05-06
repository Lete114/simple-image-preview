import { resolve } from 'path'
import { defineConfig } from 'vite'
import VitePluginStyleInject from './vite-plugin-style-inject'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'simpleImagePreview',
      fileName: (format) => `simple-image-preview.${format}.js`
    }
  },
  plugins: [VitePluginStyleInject()]
})
