import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@api': '/src/api',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@data': '/src/data',
      '@helpers': '/src/helpers',
      '@types': '/src/types',
      '@views': '/src/views',
      '@context': './src/context',
      '@constants': './src/constants',
      '@hooks': './src/hooks',
      '@pages': './src/pages'
    }
  }
})
