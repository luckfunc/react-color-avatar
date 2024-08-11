import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@components': '/src/components',
      '@constants': '/src/constants',
      '@types': '/src/types',
      '@layouts': '/src/layouts',
    }
  }
})
