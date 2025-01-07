import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import { env } from 'process';

// Determine the API base URL based on the environment
const target =
  env.NODE_ENV === 'production'
    ? 'https://agreeable-cliff-0b0f20100.4.azurestaticapps.net'
    : env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(';')[0]
    : 'https://localhost:5001';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist', // Default output directory
  },
  server: {
    proxy: {
      '/api/customers': {
        target,
        secure: false,
      },
      '/api/products': {
        target,
        secure: false,
      },
      '/api/stores': {
        target,
        secure: false,
      },
      '/api/sales': {
        target,
        secure: false,
      },
    },
    port: 5173,
    https: false,
  },
});
