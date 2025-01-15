import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import plugin from '@vitejs/plugin-react';

// Dynamically load environment variables based on the mode
export default defineConfig(({ mode }) => {
  // Load environment variables from `.env` files
  const env = loadEnv(mode, process.cwd(), '');

  // Use the environment variable for the API base URL
  const apiBaseUrl = env.VITE_API_BASE_URL;

  return {
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
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
        },
        '/api/Products': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
        },
        '/api/Stores': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
        },
        '/api/Sales': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
        },
      },
      port: 5173,
      https: false,
    },
  };
});
