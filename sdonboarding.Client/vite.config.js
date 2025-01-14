import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import { env } from 'process';

// Determine the API base URL based on the environment
// Determine the API base URL based on the environment
const target =
  env.NODE_ENV === 'production'
    ? 'https://onboardingcrudoperation-d7ggg0e9ajagdsbp.australiaeast-01.azurewebsites.net' // Your Azure backend URL
    : 'https://localhost:5001'; // For Production development process

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
      '/api/Customers': {
        target,
        secure: false,
      },
      '/api/Products': {
        target,
        secure: false,
      },
      '/api/Stores': {
        target,
        secure: false,
      },
      '/api/Sales': {
        target,
        secure: false,
      },
    },
    port: 5173,
    https: false,
  },
});
