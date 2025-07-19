import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@assets/*': '/src/assets/*',
      'assets/*': '/src/assets/*',
      '@utils': '/src/utils',
      '@utils/*': '/src/utils/*',
      '@hooks': '/src/hooks',
      '@hooks/*': '/src/hooks/*',
      '@components': '/src/components',
      '@components/*': '/src/components/*',
      '@constants': '/src/constants',
      '@constants/*': '/src/constants/*',
      '@types': '/src/types',
      '@types/*': '/src/types/*',
      '@layouts': '/src/layouts',
      '@layouts/*': '/src/layouts/*',
      '@store': '/src/store',
      '@store/*': '/src/store/*',
      '@enums': '/src/enums',
      '@enums/*': '/src/enums/*',
    },
  },
});
