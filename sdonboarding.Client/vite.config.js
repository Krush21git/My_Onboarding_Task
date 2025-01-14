import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import { env } from 'process';
// Use import.meta.env.MODE to get the current mode
const target =
  import.meta.env.MODE === 'production'
    ? 'https://onboardingcrudoperation-d7ggg0e9ajagdsbp.australiaeast-01.azurewebsites.net'
    : 'https://localhost:5001';
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
    https: import.meta.env.MODE === 'production', // Conditionally enable HTTPS
  },
});
